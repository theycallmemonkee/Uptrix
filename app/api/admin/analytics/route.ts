import { verifyAdminRequest } from "@/lib/security/admin-auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/analytics
 * Retrieves marketing engine and pipeline conversion analytics.
 * Requires: Authorization: Bearer <admin_token>
 */
export async function GET(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  const mockAnalytics = {
    totalLeads: 148,
    conversionRate: "3.4%",
    averageCpl: "$2.27",
    pipelineValue: "$184,200",
    trafficBreakdown: {
      seo: "42%",
      paid: "38%",
      direct: "20%",
    },
    weeklyGrowth: "+24%",
  };

  return NextResponse.json({ ok: true, analytics: mockAnalytics });
}
