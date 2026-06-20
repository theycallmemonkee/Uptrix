export interface Stat {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  badge: string;
  client: string;
  description: string;
  image: string;
  imageStyle?: "contain" | "cover";
  stats: Stat[];
  achievements?: string[];
  ctaHref: string;
}

export interface PortfolioMetric {
  label: string;
  value: string;
}

export interface PortfolioImage {
  src: string;
  alt: string;
  type: "dashboard" | "phone" | "report" | "masonry";
}

export interface PortfolioItem {
  id: string;
  category: "AI SEO" | "Google Ads" | "Meta Ads" | "Social Media" | "Website Development";
  title: string;
  subtitle: string;
  client: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: string;
  takeaways: string[];
  metrics: PortfolioMetric[];
  images: PortfolioImage[];
  featuredImage: string;
}
