import { NextRequest, NextResponse } from "next/server";
import { getWebsiteEntries } from "@/lib/seo/sitemap-data";
import { buildUrlsetXml, chunkArray, xmlResponse, SITEMAP_URL_LIMIT } from "@/lib/seo/sitemap-utils";

export const revalidate = 3600;

// Sitemap protocol caps a single file at 50,000 URLs. Well under that today,
// but if it's ever exceeded, overflow is served from the same fixed
// filename via ?page=2, ?page=3, ... (see sitemap_index.xml, which only
// lists those extra pages once the data actually needs them) — this avoids
// needing extra route files that Next.js's router can't express as a
// literal "prefix-[param].xml" segment.
export async function GET(request: NextRequest) {
  const chunks = chunkArray(getWebsiteEntries(), SITEMAP_URL_LIMIT);
  const pageParam = request.nextUrl.searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;

  if (!Number.isInteger(page) || page < 1) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }

  const chunk = chunks[page - 1];
  if (!chunk) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return xmlResponse(buildUrlsetXml(chunk));
}
