import { getServerEnvAudit } from "@/lib/env/server-env";
import { verifyAdminRequest } from "@/lib/security/admin-auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Diagnostics: reports whether each env var is set (true/false only).
 * GET https://your-domain.com/api/env-check
 * Requires: Authorization: Bearer <admin_token> — infra details shouldn't be public.
 */
export async function GET(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  const audit = getServerEnvAudit();

  console.info("[env-check] Audit requested", {
    present: audit.present,
    missingRequired: audit.required.missing,
    vercelEnv: audit.meta.vercelEnv,
  });

  return NextResponse.json({
    ok: audit.required.ready,
    route: "app/api/env-check/route.ts",
    ...audit,
  });
}
