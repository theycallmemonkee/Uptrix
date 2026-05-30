export type ServiceSlug = "seo" | "social-media" | "ppc" | "branding" | "ai-ugc-video-ads" | "business-automation";

export type ServiceFeature = {
  title: string;
  description: string;
  image: string;
};

export type ServiceProblem = {
  title: string;
  description: string;
};

export type ServiceSolution = {
  title: string;
  description: string;
};

export type ServiceProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type ServiceBenefit = {
  title: string;
  description: string;
};

export type ServiceCaseStudy = {
  title: string;
  subtitle: string;
  overview: string;
  image: string;
  client: string;
  quote: string;
  metrics: { label: string; value: string }[];
};

export type ServiceFaqItem = {
  id: string;
  question: string;
  answer: string;
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
  sectionVisuals?: {
    problemImage?: string;
    timelineImage?: string;
    benefitsImage?: string;
    faqImage?: string;
  };
  featureCards: ServiceFeature[];
  finalCtaTitle: string;
  finalCtaDescription: string;
  cardTitle: string;
  cardCategory: string;
  cardDescription: string;
  cardImage: string;
  dropdownDescription: string;
  dropdownColor: string;
  problems?: ServiceProblem[];
  solutions?: ServiceSolution[];
  processSteps?: ServiceProcessStep[];
  benefits?: ServiceBenefit[];
  caseStudy?: ServiceCaseStudy;
  faqItems?: ServiceFaqItem[];
};

export const SERVICE_MENU_ITEMS: Array<Pick<ServiceConfig, "name" | "shortLabel" | "href">> = [
  { name: "SEO Services", shortLabel: "SEO", href: "/services/seo" },
  { name: "Social Media Services", shortLabel: "Social Media", href: "/services/social-media" },
  { name: "PPC Services", shortLabel: "PPC", href: "/services/ppc" },
  { name: "Branding Services", shortLabel: "Branding", href: "/services/branding" },
  { name: "AI UGC Video Ads", shortLabel: "UGC Ads", href: "/services/ai-ugc-video-ads" },
  { name: "Business Automation Solutions", shortLabel: "Automation", href: "/services/business-automation" },
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
    cardTitle: "Search Engine Optimization",
    cardCategory: "SEO",
    cardDescription: "Build sustainable organic growth through technical SEO, content architecture, and AI-led search insights.",
    cardImage: "/services/seo.svg",
    dropdownDescription: "Organic growth & technical SEO",
    dropdownColor: "rgba(0,102,255,0.2)",
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
    cardTitle: "Social Media Marketing",
    cardCategory: "Social",
    cardDescription: "Scale audience engagement with data-backed creative systems across social channels and community touchpoints.",
    cardImage: "/services/social.svg",
    dropdownDescription: "Community & content strategy",
    dropdownColor: "rgba(100,150,255,0.2)",
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
    cardTitle: "Paid Marketing",
    cardCategory: "PPC",
    cardDescription: "Drive profitable CAC and conversion velocity through predictive PPC frameworks and automated bidding precision.",
    cardImage: "/services/paid.svg",
    dropdownDescription: "Performance ads & ROAS",
    dropdownColor: "rgba(80,130,255,0.2)",
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
    cardTitle: "Branding",
    cardCategory: "Brand",
    cardDescription: "Craft positioning, voice, and visual systems that communicate trust and premium differentiation at enterprise scale.",
    cardImage: "/services/branding.svg",
    dropdownDescription: "Identity & brand architecture",
    dropdownColor: "rgba(120,170,255,0.2)",
  },
  {
    slug: "ai-ugc-video-ads",
    name: "AI UGC Video Ads",
    shortLabel: "UGC Ads",
    href: "/services/ai-ugc-video-ads",
    headline: "AI-Powered UGC Ads That Scale Creative Production",
    highlightedKeyword: "UGC Ads",
    heroDescription:
      "Generate unlimited ad creatives using AI avatars, AI voices, performance-tested hooks, and platform-optimized video systems.",
    ctaLabel: "Get UGC Ad Strategy",
    whyTitle: "Why brands choose AI-powered UGC video ads",
    whyDescription:
      "We turn product stories into scroll-stopping video creatives with AI avatars, voice cloning, and platform-specific systems that keep ads converting.",
    whyBullets: ["AI avatar videos", "Platform-optimized ad variations", "Creative systems for velocity"],
    heroVisuals: {
      dashboardImage: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1400&q=80",
      chartImage: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1200&q=80",
      workspaceImage: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=80",
    },
    whyVisuals: {
      mainImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
      analyticsImage: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1200&q=80",
    },
    sectionVisuals: {
      problemImage: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
      timelineImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
      benefitsImage: "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?auto=format&fit=crop&w=1400&q=80",
      faqImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    },
    featureCards: [
      {
        title: "AI avatar videos",
        description: "Create scalable, branded avatar creatives that speak like your best spokespeople.",
        image: "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "AI voice cloning",
        description: "Produce authentic voiceovers in brand-safe tones across multiple languages.",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "UGC style testimonials",
        description: "Launch social-first testimonial ads that feel native and credible in feeds.",
        image: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Multi-platform delivery",
        description: "Deploy TikTok, Reels, Shorts and story formats from one AI production pipeline.",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    finalCtaTitle: "Start scaling creative production with AI.",
    finalCtaDescription:
      "Turn your ad strategy into a high-velocity video system that delivers more tested creatives and clearer performance insights.",
    cardTitle: "AI UGC Video Ads",
    cardCategory: "UGC Ads",
    cardDescription:
      "Create high-converting UGC-style video ads with AI avatars, voice cloning, scripted hooks, and platform-specific ad variations.",
    cardImage: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
    dropdownDescription: "AI creative video ads",
    dropdownColor: "rgba(87,148,255,0.2)",
    problems: [
      {
        title: "Creative production feels too slow",
        description:
          "Manual video shoots, editing, and testing stretch timelines while ad performance changes week to week.",
      },
      {
        title: "Platform-specific formats are hard to scale",
        description:
          "Replicating UGC energy across TikTok, Reels, and Shorts takes too much time and inconsistent results.",
      },
    ],
    solutions: [
      {
        title: "AI-driven creative engine",
        description:
          "We automate avatar videos, voiceovers, and hook scripts so every campaign launches with a library of test-ready ads.",
      },
      {
        title: "Performance-tested content workflows",
        description:
          "Variation logic and ad templates keep every new asset aligned with the highest-converting themes.",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Audience & hook discovery",
        description: "Identify the messages and visual formats that perform best for your product category.",
      },
      {
        step: "02",
        title: "AI creative generation",
        description: "Produce avatar videos, voice clones, and testimonial variations with platform-native formatting.",
      },
      {
        step: "03",
        title: "Launch and optimize",
        description: "Deploy ad sets across TikTok, Reels, and Shorts with real-time creative testing.",
      },
      {
        step: "04",
        title: "Scale creative velocity",
        description: "Refresh campaigns automatically and turn winning concepts into new production streams.",
      },
    ],
    benefits: [
      {
        title: "Creative velocity",
        description: "Produce more high-quality ad variations in hours instead of weeks.",
      },
      {
        title: "Cross-platform scale",
        description: "Launch native formats for TikTok, Reels, Shorts, and feed placements from one system.",
      },
      {
        title: "Authentic conversion copy",
        description: "Use AI-first scripts and testimonial formats built for social discovery and trust.",
      },
      {
        title: "Localized variation",
        description: "Deploy multi-language creative assets without rebuilding your workflow each time.",
      },
    ],
    caseStudy: {
      title: "A D2C brand scaled UGC production by 4x.",
      subtitle: "We built an AI creative engine that delivered more qualified traffic with faster creative testing.",
      overview:
        "From first ideation to campaign launch, the system produced fresh UGC ad sets for every weekly test budget.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
      client: "Growth-driven D2C brand",
      quote:
        "Uptrix created high-performing UGC ads faster than our in-house team could iterate. The AI workflow keeps our campaigns fresh and consistent.",
      metrics: [
        { label: "Creative velocity", value: "4x" },
        { label: "Lower CPA", value: "27%" },
        { label: "Video views", value: "3.8M" },
      ],
    },
    faqItems: [
      {
        id: "ugc-production",
        question: "How fast can you launch UGC video campaigns?",
        answer:
          "We can produce and launch the first library of AI-generated UGC assets within days, then optimize performance each week across social platforms.",
      },
      {
        id: "voice-cloning",
        question: "Can you create custom voiceovers for our brand?",
        answer:
          "Yes. We use secure AI voice models to generate brand-safe voiceovers that match your tone and script across languages.",
      },
      {
        id: "ad-formats",
        question: "Will the ads work on TikTok, Reels, and Shorts?",
        answer:
          "Absolutely. Every creative is formatted for native placement and optimized for each platform’s best-performing video structure.",
      },
      {
        id: "testimonial-ads",
        question: "Do you support testimonial-style UGC creatives?",
        answer:
          "We design authentic testimonial scripts and anchor them with AI video cuts so the ads feel native, credible, and highly clickable.",
      },
    ],
  },
  {
    slug: "business-automation",
    name: "Business Automation Solutions",
    shortLabel: "Automation",
    href: "/services/business-automation",
    headline: "Automate Operations. Eliminate Bottlenecks.",
    highlightedKeyword: "Automate Operations",
    heroDescription:
      "Build intelligent workflows that automate lead management, reporting, customer support, and operational processes.",
    ctaLabel: "Start Automation",
    whyTitle: "Why modern teams choose automation over manual handoffs",
    whyDescription:
      "We connect AI agents, CRM workflows, and reporting pipelines so teams move faster, reduce errors, and keep growth systems aligned.",
    whyBullets: ["CRM automation", "AI agent workflows", "Operational reporting dashboards"],
    heroVisuals: {
      dashboardImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
      chartImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
      workspaceImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80",
    },
    whyVisuals: {
      mainImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
      analyticsImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    },
    sectionVisuals: {
      problemImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
      timelineImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
      benefitsImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
      faqImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    },
    featureCards: [
      {
        title: "CRM automation",
        description: "Connect lead capture, follow-up, and pipeline updates through smart workflow triggers.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Lead nurturing",
        description: "Use AI agents to qualify leads, book meetings, and route high-intent prospects automatically.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Reporting dashboards",
        description: "Build live operational visibility into conversion, response time, and campaign velocity.",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Process optimization",
        description: "Eliminate repetitive tasks with AI workflows that keep operations moving without manual handoffs.",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    finalCtaTitle: "Replace manual bottlenecks with intelligent workflows.",
    finalCtaDescription:
      "Deploy automation systems that improve lead quality, speed up customer response, and unlock faster decision cycles.",
    cardTitle: "Business Automation Solutions",
    cardCategory: "Automation",
    cardDescription: "Automate repetitive workflows with AI agents, CRM integration, support bots, reporting pipelines, and operational logic.",
    cardImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    dropdownDescription: "Workflow automation & AI systems",
    dropdownColor: "rgba(96,166,255,0.2)",
    problems: [
      {
        title: "Manual workflows drain team capacity",
        description:
          "Sales, support, and operations are held back by repetitive handoffs and fragmented CRM processes.",
      },
      {
        title: "Data and reporting are too slow",
        description:
          "Slow manual reporting makes it hard to act on pipeline, lead quality, and customer support signals in time.",
      },
    ],
    solutions: [
      {
        title: "AI-enabled workflow orchestration",
        description:
          "We connect CRM, chat, lead scoring, and reporting into a single automation layer that acts on intent.",
      },
      {
        title: "Operational visibility built in",
        description:
          "Dashboards and alerts keep your team aligned while the system routes work and escalates the highest-value actions.",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Audit current handoffs",
        description: "Map every lead, support, and operations touchpoint to find wasted time and automation opportunities.",
      },
      {
        step: "02",
        title: "Design the workflow",
        description: "Build AI agent paths, CRM triggers, and escalation rules that mirror how your team actually works.",
      },
      {
        step: "03",
        title: "Integrate systems",
        description: "Connect your CRM, chat, reporting, and task stacks with reliable automation pipelines.",
      },
      {
        step: "04",
        title: "Optimize with data",
        description: "Measure automation impact, refine rules, and expand the system to new use cases.",
      },
    ],
    benefits: [
      {
        title: "Faster lead response",
        description: "Automate qualification and engagement so every good opportunity moves forward immediately.",
      },
      {
        title: "Reduced manual work",
        description: "Eliminate repetitive CRM updates, reporting rounds, and support escalations with AI-driven flows.",
      },
      {
        title: "Clear performance visibility",
        description: "Track pipeline, response time, and delivery through dashboards built for decision-makers.",
      },
      {
        title: "Scalable operational systems",
        description: "Turn one high-value workflow into a repeatable automation model across teams.",
      },
    ],
    caseStudy: {
      title: "A services team cut response time by 40%.",
      subtitle: "We automated lead routing, support touchpoints, and reporting so the team could focus on closing.",
      overview:
        "The automation stack connected CRM signals with AI routing, reducing manual work and improving pipeline clarity.",
      image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1400&q=80",
      client: "Scale-focused B2B operator",
      quote:
        "The workflow automation system removed the friction that used to slow our sales and support teams. Everything now flows faster.",
      metrics: [
        { label: "Faster lead response", value: "40%" },
        { label: "Reduced manual tasks", value: "52%" },
        { label: "Pipeline visibility", value: "2x" },
      ],
    },
    faqItems: [
      {
        id: "crm-integration",
        question: "Which CRM systems do you integrate with?",
        answer:
          "We connect with major CRM platforms and can build custom integrations for platforms that support modern APIs and workflow automation.",
      },
      {
        id: "support-automation",
        question: "Can this automate customer support handoffs?",
        answer:
          "Yes. We automate support triage, self-serve routing, and escalation workflows so your team only handles the highest-value cases.",
      },
      {
        id: "reporting",
        question: "What kind of reports can you automate?",
        answer:
          "We automate pipeline reporting, lead conversion dashboards, support metrics, and operational health summaries for stakeholders.",
      },
      {
        id: "process-optimization",
        question: "How do you improve existing workflows?",
        answer:
          "We audit current processes, identify automation gaps, and design AI-triggered workflows that reduce manual handoffs and maintain accountability.",
      },
    ],
  },
];

export const SERVICES_BY_SLUG: Record<ServiceSlug, ServiceConfig> = Object.fromEntries(
  SERVICES.map((service) => [service.slug, service]),
) as Record<ServiceSlug, ServiceConfig>;
