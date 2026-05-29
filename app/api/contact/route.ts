import { contactSubmissionSchema } from "@/lib/contact/schema";
import { sendContactNotificationEmail } from "@/lib/email/resend";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

const API_ROUTE = "app/api/contact/route.ts";
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const CONTACT_TABLE = "contact_messages";
const requestTracker = new Map<string, number[]>();

export async function POST(request: Request) {
  try {
    console.info("[contact/api] Request received", { route: API_ROUTE });

    const missingEnv = getMissingEnvVars();
    if (missingEnv.length > 0) {
      console.error("[contact/api] Missing configuration", { missingEnv, route: API_ROUTE });
      return NextResponse.json(
        {
          ok: false,
          error: `Server configuration error: missing ${missingEnv.join(", ")}`,
          code: "ENV_MISSING",
          missingEnv,
        },
        { status: 500 },
      );
    }

    const ip = getClientIp(request);
    if (!isRateLimitAllowed(ip)) {
      console.warn("[contact/api] Rate limited", { ip });
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again shortly.", code: "RATE_LIMITED" },
        { status: 429 },
      );
    }

    const body = await request.json();
    console.info("[contact/api] Body parsed", {
      hasName: Boolean(body?.name),
      hasEmail: Boolean(body?.email),
      hasMessage: Boolean(body?.message),
    });

    const parsed = contactSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      console.warn("[contact/api] Validation failed", parsed.error.flatten().fieldErrors);
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed",
          code: "VALIDATION_FAILED",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const input = parsed.data;
    if (input.honey.trim() !== "") {
      console.info("[contact/api] Honeypot triggered — silent success");
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    console.info("[contact/api] Incoming form data", {
      name: input.name,
      email: input.email,
      message: input.message,
    });

    const timestampIso = new Date().toISOString();

    // Email first — do not block on Supabase (common production failure: table not migrated)
    const emailResult = await sendContactNotificationEmail({
      name: input.name,
      email: input.email,
      message: input.message,
      timestampIso,
    });

    if (!emailResult.ok) {
      const resendMessage = emailResult.error.message ?? "Email send failed";
      const statusCode =
        "statusCode" in emailResult.error && typeof emailResult.error.statusCode === "number"
          ? emailResult.error.statusCode
          : undefined;

      console.error("[contact/api] Resend failed — returning error to client", {
        message: resendMessage,
        name: emailResult.error.name,
        statusCode,
      });

      return NextResponse.json(
        {
          ok: false,
          error: `Email send failed: ${resendMessage}`,
          code: "EMAIL_SEND_FAILED",
          resend: {
            name: emailResult.error.name,
            message: emailResult.error.message,
            statusCode,
          },
        },
        { status: statusCode === 401 || statusCode === 403 ? 502 : 502 },
      );
    }

    console.info("[contact/api] Resend accepted", { emailId: emailResult.data?.id });

    let dbWarning: string | undefined;
    try {
      const supabase = createSupabaseAdminClient();
      const { error: dbError } = await supabase.from(CONTACT_TABLE).insert({
        name: input.name,
        email: input.email,
        message: input.message,
        created_at: timestampIso,
      });

      if (dbError) {
        dbWarning = dbError.message;
        console.error("[contact/api] Database insert failed (email already sent)", {
          code: dbError.code,
          message: dbError.message,
          details: dbError.details,
          hint: dbError.hint,
          table: CONTACT_TABLE,
        });
      } else {
        console.info("[contact/api] Database insert succeeded", { table: CONTACT_TABLE });
      }
    } catch (dbUnexpected) {
      dbWarning = dbUnexpected instanceof Error ? dbUnexpected.message : "Database error";
      console.error("[contact/api] Database unexpected error (email already sent)", dbUnexpected);
    }

    return NextResponse.json(
      {
        ok: true,
        emailId: emailResult.data?.id ?? null,
        ...(dbWarning ? { warning: `Message delivered but storage failed: ${dbWarning}` } : {}),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[contact/api] Unexpected error", { route: API_ROUTE, error });
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unexpected server error. Please try again.",
        code: "UNEXPECTED_SERVER_ERROR",
      },
      { status: 500 },
    );
  }
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimitAllowed(ip: string) {
  const now = Date.now();
  const existing = requestTracker.get(ip) ?? [];
  const fresh = existing.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (fresh.length >= RATE_LIMIT_MAX) {
    requestTracker.set(ip, fresh);
    return false;
  }

  fresh.push(now);
  requestTracker.set(ip, fresh);
  return true;
}

function getMissingEnvVars() {
  const required = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "RESEND_API_KEY",
  ] as const;
  return required.filter((key) => !process.env[key]);
}
