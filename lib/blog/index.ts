import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogFrontmatter, BlogPost } from "@/lib/blog/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function assertFrontmatter(data: Record<string, unknown>, fileName: string): BlogFrontmatter {
  const required = ["title", "description", "date", "author", "coverImage"] as const;
  for (const key of required) {
    if (typeof data[key] !== "string" || !data[key]) {
      throw new Error(`Missing/invalid frontmatter '${key}' in ${fileName}`);
    }
  }

  const tags = Array.isArray(data.tags) ? data.tags.filter((t) => typeof t === "string") : undefined;

  return {
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    author: data.author as string,
    coverImage: data.coverImage as string,
    tags,
    seoTitle: typeof data.seoTitle === "string" ? (data.seoTitle as string) : undefined,
    seoDescription: typeof data.seoDescription === "string" ? (data.seoDescription as string) : undefined,
    ogImage: typeof data.ogImage === "string" ? (data.ogImage as string) : undefined,
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .sort();
}

export function getPostRawBySlug(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const file = fs.readFileSync(filePath, "utf8");
  const parsed = matter(file);
  const frontmatter = assertFrontmatter(parsed.data as Record<string, unknown>, `${slug}.mdx`);
  const rt = readingTime(parsed.content);

  return {
    slug,
    frontmatter,
    content: parsed.content,
    readingTimeText: rt.text,
  };
}

export function getAllPosts(): BlogPost[] {
  return getAllPostSlugs()
    .map((slug) => {
      const { frontmatter, readingTimeText } = getPostRawBySlug(slug);
      return { slug, frontmatter, readingTimeText };
    })
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

