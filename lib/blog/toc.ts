import { slugifyHeading } from "@/lib/blog/slugify";
import type { TocItem } from "@/lib/blog/types";

const HEADING_RE = /^(#{2,3})\s+(.+?)\s*$/gm;

export function extractToc(rawMdx: string): TocItem[] {
  const items: TocItem[] = [];
  const seen = new Map<string, number>();

  for (const match of rawMdx.matchAll(HEADING_RE)) {
    const hashes = match[1] ?? "";
    const text = (match[2] ?? "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
    const level = hashes.length === 2 ? 2 : 3;
    if (!text) continue;

    const base = slugifyHeading(text);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    const id = count === 1 ? base : `${base}-${count}`;

    items.push({ id, text, level: level as 2 | 3 });
  }

  return items;
}

