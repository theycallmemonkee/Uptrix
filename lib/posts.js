import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import html from "remark-html";

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");

function ensureBlogsDirectory() {
  if (!fs.existsSync(BLOGS_DIR)) {
    fs.mkdirSync(BLOGS_DIR, { recursive: true });
  }
}

function normalizeSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\.md$/, "")
    .replace(/\s+/g, "-");
}

function withDefaults(frontmatter, slug) {
  return {
    slug,
    title: frontmatter.title || "Untitled Post",
    date: frontmatter.date || "2026-01-01",
    excerpt: frontmatter.excerpt || "",
    cover: frontmatter.cover || "/blogs/future-of-ai.svg",
    author: frontmatter.author || "Uptrix Editorial",
    category: frontmatter.category || "Insights",
  };
}

function slugifyHeading(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()+=[\]{}|\\:;"'<>,.?/]/g, "")
    .replace(/\s+/g, "-");
}

function extractHeadings(markdown) {
  return String(markdown || "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^###?\s+/, "").trim();
      return { id: slugifyHeading(text), text, level };
    });
}

export function getAllPosts() {
  ensureBlogsDirectory();

  const files = fs
    .readdirSync(BLOGS_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOGS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const slug = normalizeSlug(file);
    const base = withDefaults(data, slug);
    const stats = readingTime(content || "");

    return {
      ...base,
      content,
      readingTime: stats.text || "1 min read",
    };
  });

  return posts.sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

export async function getPostBySlug(slug) {
  const post = getAllPosts().find((item) => item.slug === normalizeSlug(slug));
  if (!post) return null;

  const processed = await remark().use(html).process(post.content);
  const headings = extractHeadings(post.content);
  let headingIndex = 0;
  const contentHtml = processed
    .toString()
    .replace(/<h([23])>(.*?)<\/h\1>/g, (_match, level, inner) => {
      const fallbackId = slugifyHeading(String(inner).replace(/<[^>]*>/g, ""));
      const id = headings[headingIndex]?.id || fallbackId;
      headingIndex += 1;
      return `<h${level} id="${id}">${inner}</h${level}>`;
    });

  return {
    ...post,
    headings,
    contentHtml,
  };
}

export function getRelatedPosts(slug, limit = 3) {
  return getAllPosts()
    .filter((post) => post.slug !== normalizeSlug(slug))
    .slice(0, limit);
}
