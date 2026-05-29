import { getServerEnvAudit } from "@/lib/env/server-env";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Safe diagnostics: reports whether each env var is set (true/false only).
 * GET https://your-domain.com/api/env-check
 */
export async function GET() {
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
