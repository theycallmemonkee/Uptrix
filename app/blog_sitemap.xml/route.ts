import { NextRequest, NextResponse } from "next/server";
import { getBlogEntries } from "@/lib/seo/sitemap-data";
import { buildUrlsetXml, chunkArray, xmlResponse, SITEMAP_URL_LIMIT } from "@/lib/seo/sitemap-utils";

export const revalidate = 3600;

// Same overflow scheme as website_sitemap.xml — see the comment there.
export async function GET(request: NextRequest) {
  const chunks = chunkArray(getBlogEntries(), SITEMAP_URL_LIMIT);
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
