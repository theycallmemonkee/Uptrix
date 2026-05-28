export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO
  author: string;
  coverImage: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  readingTimeText: string;
};

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

