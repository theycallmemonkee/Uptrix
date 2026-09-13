// ─────────────────────────────────────────────────────────────────────────────
// Sitemap data aggregation — the single place that decides which URLs are
// indexable, sourced from the app's existing route/content data instead of
// a hand-maintained list. Add a new page/case-study/solution to its normal
// data source and it appears here automatically.
// ─────────────────────────────────────────────────────────────────────────────

import { SOLUTIONS } from "@/data/solutions-data";
import { ALL_CASE_STUDIES } from "@/data/case-studies-data";
import { getAllPosts } from "@/lib/posts";
import type { SitemapEntry } from "@/lib/seo/sitemap-utils";

export const BASE_URL = "https://uptrixtechnologies.com";

/**
 * Static, non-data-driven pages. These live as plain `page.tsx` files with no
 * backing array (unlike solutions/case-studies), so a small maintained list
 * is the correct source of truth here — mirrors the routes under app/.
 *
 * Deliberately excluded:
 * - "/contact": self-canonicalizes to "/contact-us" (see app/contact/page.tsx),
 *   so it is a non-canonical duplicate and must not be listed.
 * - "/studio/**": Sanity Studio — CMS admin, not a public page.
 * - "/api/**": API routes, not pages.
 */
const STATIC_PAGES: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1.0 },
  { path: "/about", priority: 0.8 },
  { path: "/contact-us", priority: 0.8 },
  { path: "/portfolio", priority: 0.7 },
  { path: "/portfolio/websites", priority: 0.7 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms-and-condition", priority: 0.3 },
  { path: "/services", priority: 0.7 },
  { path: "/services/seo", priority: 0.7 },
  { path: "/services/social-media", priority: 0.7 },
  { path: "/services/ppc", priority: 0.7 },
  { path: "/services/branding", priority: 0.7 },
  { path: "/services/ai-ugc-video-ads", priority: 0.7 },
  { path: "/services/business-automation", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
];

/**
 * Mirrors the fixed generateStaticParams() in
 * app/portfolio/[category]/[slug]/page.tsx — that route only ever renders
 * "case-study-1" under each of these five categories today, so this list is
 * the actual set of valid, canonical portfolio detail URLs.
 */
const PORTFOLIO_DETAIL_PATHS: string[] = [
  "/portfolio/ai-seo/case-study-1",
  "/portfolio/google-ads/case-study-1",
  "/portfolio/meta-ads/case-study-1",
  "/portfolio/social/case-study-1",
  "/portfolio/websites/case-study-1",
];

/** All indexable non-blog website pages. */
export function getWebsiteEntries(): SitemapEntry[] {
  const staticEntries: SitemapEntry[] = STATIC_PAGES.map(({ path, priority }) => ({
    loc: `${BASE_URL}${path}`,
    changefreq: "weekly",
    priority,
  }));

  const solutionEntries: SitemapEntry[] = SOLUTIONS.map((solution) => ({
    loc: `${BASE_URL}/solutions/${solution.slug}`,
    changefreq: "weekly",
    priority: 0.7,
  }));

  const caseStudyEntries: SitemapEntry[] = ALL_CASE_STUDIES.map((study) => ({
    loc: `${BASE_URL}/case-studies/${study.slug}`,
    // No updatedAt/publishedAt field on case studies — omit lastmod rather
    // than fabricate one (protocol treats a missing <lastmod> as fine).
    changefreq: "monthly",
    priority: 0.6,
  }));

  const portfolioEntries: SitemapEntry[] = PORTFOLIO_DETAIL_PATHS.map((path) => ({
    loc: `${BASE_URL}${path}`,
    changefreq: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...solutionEntries, ...caseStudyEntries, ...portfolioEntries];
}

/** All published, indexable blog post URLs. */
export function getBlogEntries(): SitemapEntry[] {
  return getAllPosts().map((post) => ({
    loc: `${BASE_URL}/blog/${post.slug}`,
    lastmod: new Date(post.date).toISOString(),
    changefreq: "monthly",
    priority: 0.6,
  }));
}
