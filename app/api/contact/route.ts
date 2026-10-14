import { contactSubmissionSchema } from "@/lib/contact/schema";
import { getMissingRequiredForContact, getServerEnvAudit, hasSupabaseServerEnv, isEnvSet } from "@/lib/env/server-env";
import { sendContactNotificationEmail } from "@/lib/email/resend";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { verifyCsrf, sanitizeInput, isGibberish, validatePhone } from "@/lib/security/utils";
import { checkRateLimit } from "@/lib/security/limiter";
import { isDisposableEmail } from "@/lib/security/disposable-emails";
import { logSecurityEvent } from "@/lib/security/logger";
import { verifyAdminRequest } from "@/lib/security/admin-auth";
import { NextResponse } from "next/server";

const API_ROUTE = "app/api/contact/route.ts";
const CONTACT_TABLE = "contact_messages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET diagnostics endpoint (admin only — env details shouldn't be public).
 */
export async function GET(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

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

/**
 * POST lead capture form handler.
 */
export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const url = request.url;
  const host = request.headers.get("host");
  const vercelEnv = process.env.VERCEL_ENV ?? "local";
  const ip = getClientIp(request);

  try {
    console.info("[contact/api] Request received", {
      requestId,
      route: API_ROUTE,
      method: "POST",
      url,
      host,
      vercelEnv,
    });

    // 1. CSRF Protection Check
    if (!verifyCsrf(request)) {
      logSecurityEvent({
        type: "BLOCKED_REQUEST",
        ip,
        details: { reason: "CSRF verification failed or missing headers" },
        path: "/api/contact",
        requestId,
      });
      return NextResponse.json(
        { ok: false, error: "CSRF security verification failed.", code: "CSRF_FAILED" },
        { status: 403 }
      );
    }

    // 2. Parse JSON body
    let body: unknown;
    try {
      body = await request.json();
      // Don't log the body itself — it's visitor PII (name, email, phone, message).
      console.info("[contact/api] Request body parsed", {
        requestId,
        fields: body && typeof body === "object" ? Object.keys(body) : [],
      });
    } catch {
      console.error("[contact/api] Invalid JSON body parsed", { requestId });
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body.", code: "BAD_REQUEST" },
        { status: 400 }
      );
    }

    const rawEmail =
      body && typeof body === "object" && "email" in body ? (body as { email?: unknown }).email : undefined;
    const email = typeof rawEmail === "string" ? rawEmail.trim() : "";

    // 3. Server-side Rate Limiting (IP & Email based)
    const rateLimit = checkRateLimit(ip, email);
    if (!rateLimit.allowed) {
      logSecurityEvent({
        type: "RATE_LIMIT_VIOLATION",
        ip,
        email,
        details: { reason: rateLimit.reason },
        path: "/api/contact",
        requestId,
      });
      return NextResponse.json(
        { ok: false, error: rateLimit.reason, code: "RATE_LIMITED" },
        { status: 429 }
      );
    }

    // 4. Server configuration check
    const missingEnv = getMissingRequiredForContact();
    if (missingEnv.length > 0) {
      console.warn("[contact/api] Server configuration warning: missing email delivery env variables", {
        requestId,
        missingEnv,
      });
    }

    // 5. Input validation against Schema (Zod)
    const parsed = contactSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      console.error("[contact/api] Zod schema validation failed", {
        requestId,
        errors: parsed.error.flatten().fieldErrors,
      });
      logSecurityEvent({
        type: "BLOCKED_REQUEST",
        ip,
        email,
        details: { reason: "Zod Schema validation failed", errors: parsed.error.flatten().fieldErrors },
        path: "/api/contact",
        requestId,
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

    // 6. Hidden Honeypot Check
    if (input.honey && input.honey.trim() !== "") {
      logSecurityEvent({
        type: "SPAM_ATTEMPT",
        ip,
        email: input.email,
        details: { reason: "Honeypot trigger filled", honeyValue: input.honey },
        path: "/api/contact",
        requestId,
      });
      return NextResponse.json(
        { ok: false, error: "Bot-like behavior detected.", code: "BOT_DETECTED" },
        { status: 400 }
      );
    }

    // 7. reCAPTCHA/Turnstile invisible token verification
    const isCaptchaValid = await verifyTurnstileToken(input.turnstileToken, ip);
    if (!isCaptchaValid) {
      logSecurityEvent({
        type: "INVALID_CAPTCHA",
        ip,
        email: input.email,
        details: { reason: "Turnstile captcha token failed validation", token: input.turnstileToken },
        path: "/api/contact",
        requestId,
      });
      return NextResponse.json(
        { ok: false, error: "Security captcha check failed. Please refresh and try again.", code: "INVALID_CAPTCHA" },
        { status: 400 }
      );
    }

    // 8. Request Sanitization (Prevent XSS and script injections)
    const sanitizedName = sanitizeInput(input.name);
    const sanitizedMessage = sanitizeInput(input.message);
    const sanitizedWebsite = input.website ? sanitizeInput(input.website) : undefined;
    const sanitizedHearAboutUs = input.hearAboutUs ? sanitizeInput(input.hearAboutUs) : undefined;
    const sanitizedSourcePage = input.source_page ? sanitizeInput(input.source_page) : undefined;
    const sanitizedPhone = input.phone ? sanitizeInput(input.phone) : undefined;

    // 9. Validate optional phone format
    if (sanitizedPhone && !validatePhone(sanitizedPhone)) {
      logSecurityEvent({
        type: "BLOCKED_REQUEST",
        ip,
        email: input.email,
        details: { reason: "Phone format validation failed", phone: sanitizedPhone },
        path: "/api/contact",
        requestId,
      });
      return NextResponse.json(
        { ok: false, error: "Invalid phone number format.", code: "INVALID_PHONE" },
        { status: 400 }
      );
    }

    // 10. Lead Quality Filtering (Suspicious Lead detection)
    const suspiciousReasons: string[] = [];

    // Check disposable email
    if (isDisposableEmail(input.email)) {
      suspiciousReasons.push("Disposable/Temporary email domain");
    }

    // Check gibberish characters
    if (isGibberish(sanitizedName)) {
      suspiciousReasons.push("Gibberish keysmash in Name");
    }
    if (isGibberish(sanitizedMessage)) {
      suspiciousReasons.push("Gibberish keysmash in Message");
    }

    const isSuspicious = suspiciousReasons.length > 0;
    if (isSuspicious) {
      logSecurityEvent({
        type: "SUSPICIOUS_LEAD",
        ip,
        email: input.email,
        details: { reasons: suspiciousReasons, name: sanitizedName, message: sanitizedMessage },
        path: "/api/contact",
        requestId,
      });
    }

    console.info("[contact/api] Incoming form data (sanitized)", {
      requestId,
      name: sanitizedName,
      email: input.email,
      suspicious: isSuspicious,
    });

    const timestampIso = new Date().toISOString();

    // If suspicious, prefix the notification content with lead quality details
    let finalMessage = sanitizedMessage;
    if (isSuspicious) {
      finalMessage = `[SUSPICIOUS LEAD ALERT: ${suspiciousReasons.join(", ")}]\n\n` + finalMessage;
    }

    // 11. Insert lead into Database FIRST
    let dbStatus: "saved" | "skipped" | "failed" = "skipped";
    let dbWarning: string | undefined;
    if (hasSupabaseServerEnv()) {
      try {
        const supabase = createSupabaseAdminClient();
        let formattedMessage = finalMessage;
        if (sanitizedWebsite || sanitizedHearAboutUs || sanitizedSourcePage) {
          formattedMessage += "\n";
          if (sanitizedWebsite) formattedMessage += `\nWebsite: ${sanitizedWebsite}`;
          if (sanitizedHearAboutUs) formattedMessage += `\nHeard About Us Via: ${sanitizedHearAboutUs}`;
          if (sanitizedSourcePage) formattedMessage += `\nSource Page: ${sanitizedSourcePage}`;
        }

        const { error: dbError } = await supabase.from(CONTACT_TABLE).insert({
          name: sanitizedName,
          email: input.email,
          message: formattedMessage,
          created_at: timestampIso,
          // If table has support for status, store it. Otherwise, fallback is handled.
          status: isSuspicious ? "Suspicious Lead" : "New",
        });

        if (dbError) {
          // If status column is missing, insert again without status
          if (dbError.message.includes("column") || dbError.code === "42703") {
            const { error: retryError } = await supabase.from(CONTACT_TABLE).insert({
              name: sanitizedName,
              email: input.email,
              message: formattedMessage,
              created_at: timestampIso,
            });
            if (retryError) {
              dbStatus = "failed";
              dbWarning = retryError.message;
              console.error("[contact/api] Database retry insert failed", {
                requestId,
                error: retryError,
              });
            } else {
              dbStatus = "saved";
            }
          } else {
            dbStatus = "failed";
            dbWarning = dbError.message;
            console.error("[contact/api] Database insert failed", {
              requestId,
              error: dbError,
            });
          }
        } else {
          dbStatus = "saved";
        }
      } catch (dbUnexpected) {
        dbStatus = "failed";
        dbWarning = dbUnexpected instanceof Error ? dbUnexpected.message : "Database error";
        console.error("[contact/api] Database unexpected error", {
          requestId,
          error: dbUnexpected,
        });
      }
    } else {
      console.warn("[contact/api] Database lead storage skipped: Supabase environment variables not fully configured.");
    }

    // 12. Send notification email SECOND
    let emailStatus: "sent" | "skipped" | "failed" = "skipped";
    let emailWarning: string | undefined;
    let emailId: string | null = null;
    if (isEnvSet("RESEND_API_KEY")) {
      try {
        const emailResult = await sendContactNotificationEmail({
          name: sanitizedName,
          email: input.email,
          message: finalMessage,
          timestampIso,
          website: sanitizedWebsite,
          hearAboutUs: sanitizedHearAboutUs,
          source_page: sanitizedSourcePage,
          phone: sanitizedPhone,
        });

        if (!emailResult.ok) {
          const resendMessage = emailResult.error.message ?? "Email send failed";
          emailStatus = "failed";
          emailWarning = resendMessage;
          console.error("[contact/api] Resend send failed", {
            requestId,
            message: resendMessage,
            error: emailResult.error,
          });
        } else {
          emailStatus = "sent";
          emailId = emailResult.data?.id ?? null;
        }
      } catch (emailUnexpected) {
        emailStatus = "failed";
        emailWarning = emailUnexpected instanceof Error ? emailUnexpected.message : "Email error";
        console.error("[contact/api] Resend unexpected error", {
          requestId,
          error: emailUnexpected,
        });
      }
    } else {
      console.warn("[contact/api] Email notification skipped: RESEND_API_KEY environment variable not configured.");
    }

    // Internal details (DB/email errors, spam-filter reasons) go to logs only —
    // returning them would show attackers how to tune around the filters.
    console.info("[contact/api] Request processing finished", {
      requestId,
      emailId,
      dbStatus,
      emailStatus,
      ...(isSuspicious ? { suspicious: true, reasons: suspiciousReasons } : {}),
      ...(dbWarning ? { dbError: dbWarning } : {}),
      ...(emailWarning ? { emailError: emailWarning } : {}),
    });

    const responseBody = { ok: true };

    return NextResponse.json(responseBody, { status: 200 });
  } catch (error) {
    console.error("[contact/api] Unexpected error", { requestId, route: API_ROUTE, error });
    return NextResponse.json(
      {
        ok: false,
        error: "Unexpected server error. Please try again.",
        code: "UNEXPECTED_SERVER_ERROR",
      },
      { status: 500 },
    );
  }
}

/**
 * Retrieves client IP from headers.
 */
function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

/**
 * Validates Turnstile captcha token.
 */
async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  // Without a real secret we fall back to Cloudflare's always-pass test secret,
  // which means the captcha is effectively off.
  if (!process.env.TURNSTILE_SECRET_KEY && process.env.NODE_ENV === "production") {
    console.warn("[contact/api] TURNSTILE_SECRET_KEY is not set — captcha is not enforced");
  }
  const secretKey = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
    });

    const data = await response.json();
    return !!data.success;
  } catch (err) {
    console.error("[contact/api] Turnstile validation network error", err);
    return false;
  }
}
