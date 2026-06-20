export interface StatItem {
  prefix?: string;
  end: number;
  decimals?: number;
  suffix: string;
  label: string;
  accent?: string;
  glow?: string;
}

export interface TimelineItem {
  phase?: string;
  year?: string;
  title: string;
  description: string;
  desc?: string;
}

export const ABOUT_STATS = [
  { label: "Returning Clients", value: 99, suffix: "%" },
  { label: "Successful Projects", value: 150, suffix: "+" },
  { label: "Work Transparency", value: 100, suffix: "%" },
  { label: "Years of Expertise", value: 15, suffix: "+" },
] as const;

export const ABOUT_TIMELINE: TimelineItem[] = [
  { year: "2009", title: "Founded", description: "Uptrix was born with a mission to bridge technology and marketing." },
  { year: "2014", title: "Going Digital", description: "Expanded into AI SEO & PPC as digital channels exploded globally." },
  { year: "2018", title: "AI Integration", description: "First-mover on AI-powered campaign optimization infrastructure." },
  { year: "2022", title: "Enterprise Scale", description: "Serving 100+ enterprise brands across 12+ industries worldwide." },
  { year: "2026", title: "Growth OS", description: "Launched full-stack AI Growth OS for ambitious brands." },
];

export const ABOUT_VALUES = [
  { title: "Precision", desc: "Every decision backed by data, not guesswork.", iconName: "Target" },
  { title: "Velocity", desc: "Speed to market with zero compromise on quality.", iconName: "Zap" },
  { title: "Global Reach", desc: "Cross-border growth systems built for scale.", iconName: "Globe" },
  { title: "Outcomes", desc: "We measure everything that moves the needle.", iconName: "TrendingUp" },
];

export const TRUSTED_COMPANIES_STATS: StatItem[] = [
  { prefix: "$", end: 2.5, decimals: 1, suffix: "M+", label: "Ad Spend Managed" },
  { end: 3.21, decimals: 2, suffix: "x", label: "Average ROAS" },
  { end: 955, suffix: "%", label: "Growth Generated" },
  { end: 50, suffix: "+", label: "Brands Served" },
];

