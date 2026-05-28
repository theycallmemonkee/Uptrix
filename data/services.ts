export type ServiceSlug = "seo" | "social-media" | "ppc" | "branding";

export type ServiceFeature = {
  title: string;
  description: string;
  image: string;
};

export type ServiceConfig = {
  slug: ServiceSlug;
  name: string;
  shortLabel: string;
  href: `/services/${ServiceSlug}`;
  headline: string;
  highlightedKeyword: string;
  heroDescription: string;
  ctaLabel: string;
  whyTitle: string;
  whyDescription: string;
  whyBullets: string[];
  heroVisuals: {
    dashboardImage: string;
    chartImage: string;
    workspaceImage: string;
  };
  whyVisuals: {
    mainImage: string;
    analyticsImage: string;
  };
  featureCards: ServiceFeature[];
  finalCtaTitle: string;
  finalCtaDescription: string;
};

export const SERVICE_MENU_ITEMS: Array<Pick<ServiceConfig, "name" | "shortLabel" | "href">> = [
  { name: "SEO Services", shortLabel: "SEO", href: "/services/seo" },
  { name: "Social Media Services", shortLabel: "Social Media", href: "/services/social-media" },
  { name: "PPC Services", shortLabel: "PPC", href: "/services/ppc" },
  { name: "Branding Services", shortLabel: "Branding", href: "/services/branding" },
];

export const SERVICES: ServiceConfig[] = [
  {
    slug: "seo",
    name: "SEO Services",
    shortLabel: "SEO",
    href: "/services/seo",
    headline: "Struggling To Rank Higher Or Generate Leads? It's Time To Partner With The Best SEO Company",
    highlightedKeyword: "Best SEO Company",
    heroDescription:
      "We build measurable organic growth systems that connect technical SEO, content strategy, and conversion intelligence into one scalable engine.",
    ctaLabel: "Get SEO Growth Plan",
    whyTitle: "Why high-growth brands trust Uptrix for SEO",
    whyDescription:
      "From audits to execution, we align every optimization with revenue goals so rankings become qualified traffic and qualified traffic becomes pipeline.",
    whyBullets: ["Search intent-first strategy", "Technical SEO at enterprise depth", "Weekly growth sprints"],
    heroVisuals: {
      dashboardImage: "/services/seo.svg",
      chartImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      workspaceImage:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
    },
    whyVisuals: {
      mainImage:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
      analyticsImage:
        "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80",
    },
    featureCards: [
      {
        title: "Tailored SEO Strategies",
        description: "Custom playbooks aligned with your market, funnel, and sales cycle.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Transparent Reporting",
        description: "Real-time visibility into rankings, traffic quality, and conversion impact.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "End-To-End Optimization",
        description: "Content, technical fixes, internal linking, and CRO in one coordinated workflow.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Proven Expertise",
        description: "Experienced specialists scaling SEO for startups, B2B, and enterprise teams.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    finalCtaTitle: "Ready to own search in your category?",
    finalCtaDescription: "Launch a precision SEO roadmap tailored to your growth stage.",
  },
  {
    slug: "social-media",
    name: "Social Media Services",
    shortLabel: "Social Media",
    href: "/services/social-media",
    headline: "Your Brand Deserves More Than Just Likes — Partner With The Best Social Media Agency",
    highlightedKeyword: "Best Social Media Agency",
    heroDescription:
      "We combine strategy, creative velocity, and audience intelligence to turn social channels into compounding brand and demand assets.",
    ctaLabel: "Scale Social Growth",
    whyTitle: "A social media system built for consistent outcomes",
    whyDescription:
      "Our team blends audience insights, platform behavior, and creative testing to grow meaningful engagement and commercial impact.",
    whyBullets: ["Creator-grade content loops", "Audience + sentiment intelligence", "Rapid campaign experimentation"],
    heroVisuals: {
      dashboardImage:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1400&q=80",
      chartImage:
        "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1200&q=80",
      workspaceImage:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    },
    whyVisuals: {
      mainImage:
        "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1400&q=80",
      analyticsImage:
        "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
    },
    featureCards: [
      {
        title: "Predictive Optimization",
        description: "Forecast high-performing themes using historical engagement and channel patterns.",
        image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Content Intelligence",
        description: "Build smarter content calendars from audience signals and trend clusters.",
        image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Automated Audits",
        description: "Continuously track brand consistency and platform-specific optimization gaps.",
        image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Smarter Link Building",
        description: "Strengthen authority through social amplification and strategic collaboration ecosystems.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    finalCtaTitle: "Turn attention into attributable growth",
    finalCtaDescription: "Deploy a premium social strategy that converts beyond vanity metrics.",
  },
  {
    slug: "ppc",
    name: "PPC Services",
    shortLabel: "PPC",
    href: "/services/ppc",
    headline: "Stop Wasting Money On Ads. Partner With The PPC Marketing Company That Delivers Results.",
    highlightedKeyword: "PPC Marketing Company",
    heroDescription:
      "We engineer performance media systems that reduce waste, accelerate qualified leads, and maximize ROAS across your highest-value channels.",
    ctaLabel: "Launch PPC Engine",
    whyTitle: "High-precision media buying with full-funnel accountability",
    whyDescription:
      "Our PPC team continuously tests audience, creative, and bidding strategies to unlock efficient growth at every stage of your funnel.",
    whyBullets: ["Budget-aware experimentation", "Creative and funnel alignment", "Conversion quality optimization"],
    heroVisuals: {
      dashboardImage:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80",
      chartImage:
        "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=80",
      workspaceImage:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    },
    whyVisuals: {
      mainImage:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
      analyticsImage:
        "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=1200&q=80",
    },
    featureCards: [
      {
        title: "Google Ads Management",
        description: "Intent-driven search and shopping campaigns built for measurable conversion lift.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Meta Ads",
        description: "Creative-first social ads optimized for lead quality, not just click volume.",
        image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "LinkedIn Ads",
        description: "Account-focused B2B campaigns designed for pipeline acceleration.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "YouTube Video Ads",
        description: "Story-led video funnels that build recall and drive high-intent actions.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    finalCtaTitle: "Scale paid media with confidence",
    finalCtaDescription: "Build a performance ad stack engineered for efficient growth.",
  },
  {
    slug: "branding",
    name: "Branding Services",
    shortLabel: "Branding",
    href: "/services/branding",
    headline: "Stop Wasting Ad Spend. Partner With The Branding Company That Builds Long-Term Growth.",
    highlightedKeyword: "Branding Company",
    heroDescription:
      "We shape distinctive positioning, visual systems, and narrative architecture so your brand commands trust before any sales conversation starts.",
    ctaLabel: "Build Brand Authority",
    whyTitle: "Brand strategy that compounds over time",
    whyDescription:
      "From positioning to identity rollout, we design brand systems that keep messaging clear, premium, and scalable across channels.",
    whyBullets: ["Category-defining positioning", "Memorable visual identity systems", "Consistent brand execution playbooks"],
    heroVisuals: {
      dashboardImage:
        "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80",
      chartImage:
        "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1200&q=80",
      workspaceImage:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
    },
    whyVisuals: {
      mainImage:
        "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1400&q=80",
      analyticsImage:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    },
    featureCards: [
      {
        title: "Brand Strategy",
        description: "Sharp market positioning and value architecture built to differentiate.",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Brand Identity",
        description: "Premium visual language tailored for recall, trust, and consistency.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Brand Communication",
        description: "Unified messaging frameworks for web, campaigns, and sales touchpoints.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Brand Growth",
        description: "Operational brand systems that scale with product and market expansion.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    finalCtaTitle: "Build a brand people remember and trust",
    finalCtaDescription: "Create a long-term growth foundation with strategic brand design.",
  },
];

export const SERVICES_BY_SLUG: Record<ServiceSlug, ServiceConfig> = Object.fromEntries(
  SERVICES.map((service) => [service.slug, service]),
) as Record<ServiceSlug, ServiceConfig>;
