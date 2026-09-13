// ─────────────────────────────────────────────────────────────────────────────
// Sitemap XML helpers — shared by every sitemap route handler.
//
// Kept dependency-free (no xml-building library) since the sitemap protocol
// is a handful of fixed tags; a hand-rolled builder is easier to audit for
// correct escaping than pulling in a new package for it.
// ─────────────────────────────────────────────────────────────────────────────

export type SitemapEntry = {
  loc: string;
  lastmod?: string; // ISO 8601 date
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number; // 0.0–1.0
};

/**
 * Sitemap protocol hard limits: 50,000 URLs and 50MB (uncompressed) per file.
 * We chunk well under the URL cap so we never need to think about the byte
 * cap for this site's content types (plain <loc>/<lastmod> entries).
 */
export const SITEMAP_URL_LIMIT = 45_000;

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function chunkArray<T>(items: T[], size: number): T[][] {
  if (items.length === 0) return [];
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export function buildUrlsetXml(entries: SitemapEntry[]): string {
  const body = entries
    .map((entry) => {
      const parts = [`    <loc>${escapeXml(entry.loc)}</loc>`];
      if (entry.lastmod) parts.push(`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
      if (entry.changefreq) parts.push(`    <changefreq>${entry.changefreq}</changefreq>`);
      if (entry.priority !== undefined) parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function buildSitemapIndexXml(sitemaps: { loc: string; lastmod?: string }[]): string {
  const body = sitemaps
    .map((sm) => {
      const parts = [`    <loc>${escapeXml(sm.loc)}</loc>`];
      if (sm.lastmod) parts.push(`    <lastmod>${escapeXml(sm.lastmod)}</lastmod>`);
      return `  <sitemap>\n${parts.join("\n")}\n  </sitemap>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

/** Wraps an XML string in a Response with the correct content type + cache headers. */
export function xmlResponse(xml: string): Response {
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Regenerated hourly via each route's `revalidate` export; these headers
      // just let any CDN/browser in front of Next reuse that same response
      // instead of re-requesting on every hit.
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
