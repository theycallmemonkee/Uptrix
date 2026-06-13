import { contactSubmissionSchema } from "@/lib/contact/schema";
import { getMissingRequiredForContact, getServerEnvAudit, hasSupabaseServerEnv } from "@/lib/env/server-env";
import { sendContactNotificationEmail } from "@/lib/email/resend";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

const API_ROUTE = "app/api/contact/route.ts";
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const CONTACT_TABLE = "contact_messages";
const requestTracker = new Map<string, number[]>();

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const audit = getServerEnvAudit();

  return NextResponse.json({
    route: API_ROUTE,
    ok: audit.required.ready,
    runtime: "nodejs",
    ...audit,
    hint:
      audit.required.missing.length > 0
        ? `Add ${audit.required.missing.join(", ")} in Vercel Project Settings → Environment Variables, then redeploy.`
        : "Contact API is ready.",
  });
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const url = request.url;
  const host = request.headers.get("host");
  const vercelEnv = process.env.VERCEL_ENV ?? "local";

  try {
    console.info("[contact/api] Request received", {
      requestId,
      route: API_ROUTE,
      method: "POST",
      url,
      host,
      vercelEnv,
    });

    const missingEnv = getMissingRequiredForContact();
    if (missingEnv.length > 0) {
      const audit = getServerEnvAudit();
      console.error("[contact/api] Missing configuration", {
        requestId,
        missingEnv,
        present: audit.present,
        vercelEnv: audit.meta.vercelEnv,
      });
      return NextResponse.json(
        {
          ok: false,
          error: `Server configuration error: missing ${missingEnv.join(", ")}`,
          code: "ENV_MISSING",
          missingEnv,
          present: audit.present,
          hint: audit.guidance.afterChange,
        },
        { status: 500 },
      );
    }

    const ip = getClientIp(request);
    if (!isRateLimitAllowed(ip)) {
      console.warn("[contact/api] Rate limited", { requestId, ip });
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again shortly.", code: "RATE_LIMITED" },
        { status: 429 },
      );
    }

    const body = await request.json();
    console.info("[contact/api] Raw body received", {
      requestId,
      body,
    });

    const parsed = contactSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      console.warn("[contact/api] Validation failed", {
        requestId,
        fieldErrors: parsed.error.flatten().fieldErrors,
      });
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
      console.info("[contact/api] Honeypot triggered — silent success", { requestId });
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    console.info("[contact/api] Incoming form data", {
      requestId,
      name: input.name,
      email: input.email,
      message: input.message,
    });

        const timestampIso = new Date().toISOString();

    const emailResult = await sendContactNotificationEmail({
      name: input.name,
      email: input.email,
      message: input.message,
      timestampIso,
      website: input.website,
      budget: input.budget,
      source_page: input.source_page,
    });

    if (!emailResult.ok) {
      const resendMessage = emailResult.error.message ?? "Email send failed";
      const statusCode =
        "statusCode" in emailResult.error && typeof emailResult.error.statusCode === "number"
          ? emailResult.error.statusCode
          : undefined;

      console.error("[contact/api] Resend failed", {
        requestId,
        message: resendMessage,
        name: emailResult.error.name,
        statusCode,
        error: emailResult.error,
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
        { status: 502 },
      );
    }

    console.info("[contact/api] Resend accepted", { requestId, emailId: emailResult.data?.id });

    let dbWarning: string | undefined;
    if (hasSupabaseServerEnv()) {
      try {
        const supabase = createSupabaseAdminClient();
        let formattedMessage = input.message;
        if (input.website || input.budget || input.source_page) {
          formattedMessage += "\n";
          if (input.website) formattedMessage += `\nWebsite: ${input.website}`;
          if (input.budget) formattedMessage += `\nBudget: ${input.budget}`;
          if (input.source_page) formattedMessage += `\nSource Page: ${input.source_page}`;
        }

        const { error: dbError } = await supabase.from(CONTACT_TABLE).insert({
          name: input.name,
          email: input.email,
          message: formattedMessage,
          created_at: timestampIso,
        });

        if (dbError) {
          dbWarning = dbError.message;
          console.error("[contact/api] Database insert failed (email already sent)", {
            requestId,
            code: dbError.code,
            message: dbError.message,
          });
        } else {
          console.info("[contact/api] Database insert succeeded", { requestId, table: CONTACT_TABLE });
        }
      } catch (dbUnexpected) {
        dbWarning = dbUnexpected instanceof Error ? dbUnexpected.message : "Database error";
        console.error("[contact/api] Database unexpected error (email already sent)", {
          requestId,
          error: dbUnexpected,
        });
      }
    } else {
      console.warn("[contact/api] Supabase not configured — skipping database insert", { requestId });
    }

    const responseBody = {
      ok: true,
      emailId: emailResult.data?.id ?? null,
      ...(dbWarning ? { warning: `Message delivered but storage failed: ${dbWarning}` } : {}),
    };

    console.info("[contact/api] Success response", { requestId, responseBody });

    return NextResponse.json(responseBody, { status: 200 });
  } catch (error) {
    console.error("[contact/api] Unexpected error", { requestId, route: API_ROUTE, error });
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
