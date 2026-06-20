export type CategoryId =
  | "AI SEO"
  | "Google Ads"
  | "Meta Ads"
  | "Social Media"
  | "Website Development";

export interface CSStat {
  value: string;
  label: string;
}

export interface CSTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CSTech {
  label: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: CategoryId;
  industry: string;
  location: string;
  services: string[];
  description: string;
  heroImage: string;
  images: { src: string; alt: string }[];
  stats: CSStat[];
  challenge: string;
  strategy: string;
  execution: string;
  results: string;
  beforeAfter?: { before: string; after: string; label: string }[];
  technologies: CSTech[];
  testimonial?: CSTestimonial;
  related: string[];
}
