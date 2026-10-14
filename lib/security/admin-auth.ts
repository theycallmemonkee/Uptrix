import { timingSafeEqual } from "node:crypto";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { logSecurityEvent } from "./logger";

export interface AdminAuthResult {
  authorized: boolean;
  role?: string;
  error?: string;
  status?: number;
}

/**
 * Validates whether the incoming request is authorized for admin actions.
 * Checks for:
 * 1. Authorization header: "Bearer <token>"
 * 2. If token matches ADMIN_API_SECRET (only when set, 32+ chars).
 * 3. Real Supabase user session check and app_metadata role check ("admin").
 */
export async function verifyAdminRequest(request: Request): Promise<AdminAuthResult> {
  const authHeader = request.headers.get("authorization");
  const path = new URL(request.url).pathname;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    logSecurityEvent({
      type: "UNAUTHORIZED_ACCESS",
      path,
      details: { reason: "Missing or malformed Authorization header" },
    });
    return {
      authorized: false,
      error: "Authentication Bearer token is required.",
      status: 401,
    };
  }

  const token = authHeader.substring(7).trim();
  // No fallback: the repo is public, so any hardcoded default would be a working password.
  const adminSecret = process.env.ADMIN_API_SECRET;

  // Check shared secret key (only when one is explicitly configured)
  if (adminSecret && adminSecret.length >= 32 && safeEqual(token, adminSecret)) {
    return { authorized: true, role: "admin" };
  }

  // Otherwise, verify token with Supabase Auth
  try {
    const supabase = createSupabaseAdminClient();
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      logSecurityEvent({
        type: "UNAUTHORIZED_ACCESS",
        path,
        details: { reason: "Invalid token from auth provider", error: error?.message },
      });
      return {
        authorized: false,
        error: "Invalid or expired authorization token.",
        status: 401,
      };
    }

    // app_metadata only — user_metadata is writable by the user themselves.
    const role = user.app_metadata?.role || "user";
    if (role !== "admin") {
      logSecurityEvent({
        type: "UNAUTHORIZED_ACCESS",
        path,
        details: { reason: "User does not have admin permissions", userEmail: user.email, role },
      });
      return {
        authorized: false,
        error: "Forbidden. Admin access required.",
        status: 403,
      };
    }

    return { authorized: true, role };
  } catch (err) {
    logSecurityEvent({
      type: "UNAUTHORIZED_ACCESS",
      path,
      details: { reason: "Unexpected error during auth check", error: err instanceof Error ? err.message : String(err) },
    });
    return {
      authorized: false,
      error: "Authorization system error.",
      status: 500,
    };
  }
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}
