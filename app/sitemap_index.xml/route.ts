import { getWebsiteEntries, getBlogEntries, BASE_URL } from "@/lib/seo/sitemap-data";
import { buildSitemapIndexXml, chunkArray, xmlResponse, SITEMAP_URL_LIMIT } from "@/lib/seo/sitemap-utils";

// Regenerate at most once an hour — this only aggregates static/local data,
// so there is no database to spare, but this keeps every request from
// re-reading the filesystem and re-serializing XML from scratch.
export const revalidate = 3600;

export async function GET() {
  const websiteChunks = chunkArray(getWebsiteEntries(), SITEMAP_URL_LIMIT);
  const blogChunks = chunkArray(getBlogEntries(), SITEMAP_URL_LIMIT);
  const now = new Date().toISOString();

  // Chunk 1 of each is always the plain filename; any further chunk (only
  // possible once a section exceeds SITEMAP_URL_LIMIT URLs) is addressed as
  // ?page=2, ?page=3, ... on that same file — see website_sitemap.xml and
  // blog_sitemap.xml for why a literal "-2.xml" file isn't used instead.
  const sitemaps = [
    ...websiteChunks.map((_, i) => ({
      loc: i === 0 ? `${BASE_URL}/website_sitemap.xml` : `${BASE_URL}/website_sitemap.xml?page=${i + 1}`,
      lastmod: now,
    })),
    ...blogChunks.map((_, i) => ({
      loc: i === 0 ? `${BASE_URL}/blog_sitemap.xml` : `${BASE_URL}/blog_sitemap.xml?page=${i + 1}`,
      lastmod: now,
    })),
  ];

  return xmlResponse(buildSitemapIndexXml(sitemaps));
}
