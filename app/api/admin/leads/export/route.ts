import { verifyAdminRequest } from "@/lib/security/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { hasSupabaseServerEnv } from "@/lib/env/server-env";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/leads/export
 * Exports all contact submission leads.
 * Requires: Authorization: Bearer <admin_token>
 */
export async function GET(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  try {
    if (hasSupabaseServerEnv()) {
      const supabase = createSupabaseAdminClient();
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return NextResponse.json({ ok: true, leads: data });
    } else {
      // Supabase is not configured locally, return mock data for testing
      const mockLeads = [
        {
          id: "mock-1",
          name: "Alice Enterprise",
          email: "alice@enterprise.com",
          message: "Interested in the complete Growth Engine system.",
          created_at: new Date().toISOString(),
        },
        {
          id: "mock-2",
          name: "Bob Startup",
          email: "bob@saaslift.io",
          message: "Requesting a Growth Roadmap audit.",
          created_at: new Date(Date.now() - 7200000).toISOString(),
        },
      ];
      return NextResponse.json({
        ok: true,
        leads: mockLeads,
        warning: "Supabase environment variables not configured. Showing mock development data.",
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: `Failed to export leads: ${err.message}` },
      { status: 500 }
    );
  }
}
