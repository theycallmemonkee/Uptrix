import { getAllPosts } from "@/lib/posts";

export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uptrixtechnologies.com";
  const posts = getAllPosts();

  const baseRoutes = ["", "/blog", "/about", "/contact", "/services", "/services/seo", "/services/social-media", "/services/ppc", "/services/branding", "/services/ai-ugc-video-ads", "/services/business-automation"];

  const staticEntries = baseRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: "2026-05-28",
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const blogEntries = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries];
}
