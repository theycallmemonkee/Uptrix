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

function formatDisplayDate(dateStr) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

function extractTakeaways(content) {
  if (!content) return [];
  const lines = content.split("\n").map(l => l.trim());
  const list = [];
  
  // 1. Look for takeaways or insights
  for (const line of lines) {
    if (/^(takeaway|insight):\s*/i.test(line)) {
      const cleanLine = line.replace(/^(takeaway|insight):\s*/i, "").replace(/^💡\s*/, "").trim();
      if (cleanLine && !list.includes(cleanLine)) {
        list.push(cleanLine);
      }
    }
  }
  
  // 2. Look for blockquotes
  if (list.length < 4) {
    for (const line of lines) {
      if (line.startsWith("> ")) {
        const cleanQuote = line.replace(/^>\s*/, "").trim();
        if (cleanQuote && !list.includes(cleanQuote)) {
          list.push(cleanQuote);
        }
      }
    }
  }

  // 3. Fallbacks to guarantee 4-5 high-signal takeaways
  const fallbacks = [
    "Treat AI as repeatable operational infrastructure with clear QA review gates.",
    "Define conversion event taxonomies and quality scoring before writing prompts.",
    "Separate drafting speed from editorial quality control to preserve brand authority.",
    "Combine execution velocity with high-signal human strategy for compounding revenue.",
    "Implement real-time predictive lead scoring to accelerate opportunity health."
  ];

  while (list.length < 4) {
    const nextFallback = fallbacks.find(f => !list.includes(f));
    if (nextFallback) {
      list.push(nextFallback);
    } else {
      break;
    }
  }

  return list.slice(0, 5);
}

function withDefaults(frontmatter, slug) {
  const date = frontmatter.date || "2026-01-01";
  return {
    slug,
    title: frontmatter.title || "Untitled Post",
    date,
    displayDate: frontmatter.displayDate || formatDisplayDate(date),
    excerpt: frontmatter.excerpt || "",
    cover: frontmatter.cover || "/blogs/future-of-ai-cover.png",
    author: frontmatter.author || "Uptrix Editorial",
    authorImage: frontmatter.authorImage || "",
    category: frontmatter.category || "Insights",
    takeaways: frontmatter.takeaways || null,
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
    const takeaways = base.takeaways || extractTakeaways(content);

    return {
      ...base,
      takeaways,
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
