import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/blog";

const BASE_URL = "https://uptrixtechnologies.com";
const now = new Date();

const staticPages: MetadataRoute.Sitemap = [
  { url: BASE_URL, priority: 1.0 },
  { url: `${BASE_URL}/about`, priority: 0.8 },
  { url: `${BASE_URL}/contact`, priority: 0.8 },
  { url: `${BASE_URL}/contact-us`, priority: 0.8 },
  { url: `${BASE_URL}/portfolio`, priority: 0.8 },
  { url: `${BASE_URL}/portfolio/websites`, priority: 0.8 },
  { url: `${BASE_URL}/privacy-policy`, priority: 0.8 },
  { url: `${BASE_URL}/terms-and-condition`, priority: 0.8 },
].map((entry) => ({
  ...entry,
  lastModified: now,
  changeFrequency: "weekly" as const,
}));

const servicePages: MetadataRoute.Sitemap = [
  "/services",
  "/services/seo",
  "/services/social-media",
  "/services/ppc",
  "/services/branding",
  "/services/ai-ugc-video-ads",
  "/services/business-automation",
].map((path) => ({
  url: `${BASE_URL}${path}`,
  lastModified: now,
  changeFrequency: "weekly" as const,
  priority: 0.8,
}));

const solutionPages: MetadataRoute.Sitemap = [
  "/solutions/demand-generation-system",
  // Add new solution slugs here as they are created
].map((path) => ({
  url: `${BASE_URL}${path}`,
  lastModified: now,
  changeFrequency: "weekly" as const,
  priority: 0.8,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getAllPostSlugs();

  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    // Blog post entries — auto-populated from content/blog/*.mdx
    ...blogSlugs.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return [
    ...staticPages,
    ...servicePages,
    ...solutionPages,
    ...blogPages,
  ];
}
