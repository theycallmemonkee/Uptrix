import { contactSubmissionSchema } from "@/lib/contact/schema";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const CONTACT_TABLE = "contact_messages";
const requestTracker = new Map<string, number[]>();

export async function POST(request: Request) {
  try {
    console.info("Contact API request received");

    const missingEnv = getMissingEnvVars();
    if (missingEnv.length > 0) {
      console.error("Contact API env misconfiguration", { missingEnv });
      return NextResponse.json(
        {
          error: `Server configuration error: missing ${missingEnv.join(", ")}`,
          code: "ENV_MISSING",
        },
        { status: 500 },
      );
    }

    const ip = getClientIp(request);
    if (!isRateLimitAllowed(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
    }

    const body = await request.json();
    const parsed = contactSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const input = parsed.data;
    if (input.honey.trim() !== "") {
      // Honeypot caught a likely bot; reply success to avoid training attacks.
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const supabase = createSupabaseAdminClient();
    const timestampIso = new Date().toISOString();

    const { error: dbError } = await supabase.from(CONTACT_TABLE).insert({
      name: input.name,
      email: input.email,
      message: input.message,
      created_at: timestampIso,
    });

    if (dbError) {
      console.error("Contact insert error", dbError);
      return NextResponse.json(
        {
          error: `Database insert failed: ${dbError.message}`,
          code: dbError.code ?? "DB_INSERT_FAILED",
          details: dbError.details,
          hint: dbError.hint,
        },
        { status: 500 },
      );
    }
    console.info("Contact insert succeeded", { table: CONTACT_TABLE });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error: emailError } = await resend.emails.send({
      from: "Uptrix <onboarding@resend.dev>",
      to: ["mehtay393@gmail.com"],
      subject: "New Uptrix Contact Form Submission",
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
        <p><strong>Message:</strong> ${escapeHtml(input.message)}</p>
        <p><strong>Timestamp:</strong> ${escapeHtml(timestampIso)}</p>
      `,
    });

    if (emailError) {
      console.error("Contact email error", emailError);
      return NextResponse.json(
        {
          error: `Email send failed: ${emailError.message}`,
          code: "EMAIL_SEND_FAILED",
        },
        { status: 502 },
      );
    }
    console.info("Contact email sent successfully", { recipients: 1 });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API unexpected error", error);
    return NextResponse.json(
      {
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
  const required = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY", "RESEND_API_KEY"] as const;
  return required.filter((key) => !process.env[key]);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
