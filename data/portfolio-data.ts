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
  category: "AI SEO" | "Google Ads" | "Meta Ads" | "Social Media";
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

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "ai-seo",
    category: "AI SEO",
    title: "Technical SEO Engine & Semantic Traffic Scaler",
    subtitle: "Scaling enterprise search traffic and pipeline values through intent clustering and automated markup architectures.",
    client: "Moderna Health Technologies",
    challenge: "The brand's organic search acquisition stalled. Programmatic landing pages lacked semantic depth, and duplicate content issues were preventing high-priority medical search phrases from ranking above page two.",
    strategy: "Implemented our proprietary AI-powered semantic modeler to scan search spaces and cluster 15,000+ keywords by buyer intent. Designed a centralized hub-and-spoke content architecture optimized for structured schema engines.",
    execution: "Developed automated schema injection code to deploy structured data across 2,000 landing pages. Crafted deep-topic resource hubs, refined indexation rules, and executed weekly AI-guided internal linking runs.",
    results: "Organic rankings for core transactional keywords increased by 140%. Reached page-one positioning for 800+ target search phrases, driving high-intent organic growth with compound conversion values.",
    takeaways: [
      "Technical schema automated injection cuts manual search audit times by over 80%.",
      "Intent-first topic hubs establish categorical authority much faster than broad keyword targeting.",
      "Structured internal linking spreads PageRank equity proportionally to priority transactional pages."
    ],
    metrics: [
      { label: "Organic Traffic", value: "+342%" },
      { label: "Ranked Keywords", value: "45K" },
      { label: "Pipeline ROI Lift", value: "12X" }
    ],
    images: [
      { src: "/portfolio/ai-seo/5.png", alt: "Organic performance dashboard", type: "report" },
      { src: "/portfolio/ai-seo/6.png", alt: "Keyword acquisition matrix", type: "report" },
      { src: "/portfolio/ai-seo/7.png", alt: "Search query indexing stats", type: "masonry" },
      { src: "/portfolio/ai-seo/8.png", alt: "Organic conversion growth funnel", type: "report" },
      { src: "/portfolio/ai-seo/9.png", alt: "Technical site crawl health", type: "masonry" },
      { src: "/portfolio/ai-seo/10.png", alt: "AI content semantic performance", type: "masonry" }
    ],
    featuredImage: "/portfolio/ai-seo/5.png"
  },
  {
    id: "google-ads",
    category: "Google Ads",
    title: "Precision PPC & High-Efficiency Search Systems",
    subtitle: "Rebuilding account bidding logic and automated scripts to maximize ROAS for a competitive fintech portfolio.",
    client: "Creda Global FinTech",
    challenge: "Excessive ad budget leakage and broad-match inflation drove the client's search acquisition costs to unsustainable peaks. Bidding was manual, slow, and completely disconnected from actual lifetime lead value.",
    strategy: "Restructured the bidding funnel from the ground up. Implemented server-side conversion mapping to track closed-won revenue value, feeding deep signal parameters back into Google Ads machine learning models.",
    execution: "Consolidated redundant campaigns into a smart Search + Performance Max model. Wrote custom negative keyword exclusion scripts running hourly, and deployed landing pages with real-time dynamic text replacement.",
    results: "Dramatically increased campaign efficiency, cutting CPA by more than a third while scaling daily conversions to record highs. Ad budget waste decreased to near zero within the first 30 days.",
    takeaways: [
      "Passing closed-won deal values server-side feeds Google's smart bidding precise signal filters.",
      "Campaign consolidation decreases search bid dilution and accelerates algorithmic learning.",
      "Dynamic text replacement on landing pages maps ad context, improving quality scores and conversion rates."
    ],
    metrics: [
      { label: "Purchase ROAS", value: "4.8X" },
      { label: "Cost Per Lead", value: "-38%" },
      { label: "Direct Ad Revenue", value: "$2.4M" }
    ],
    images: [
      { src: "/portfolio/google-ads/4.jpg", alt: "Google Ads performance overview", type: "dashboard" },
      { src: "/portfolio/google-ads/6.jpg", alt: "FinTech bidding automation analytics", type: "dashboard" },
      { src: "/portfolio/google-ads/8.jpg", alt: "Conversion tracking interface", type: "dashboard" },
      { src: "/portfolio/google-ads/10.jpg", alt: "Campaign scaling velocity graph", type: "dashboard" },
      { src: "/portfolio/google-ads/12.jpg", alt: "Search query efficiency chart", type: "dashboard" },
      { src: "/portfolio/google-ads/5.jpg", alt: "Landing page conversion audit", type: "report" },
      { src: "/portfolio/google-ads/7.jpg", alt: "Ad copy performance analytics", type: "report" },
      { src: "/portfolio/google-ads/9.jpg", alt: "PPC search volume capture reports", type: "report" },
      { src: "/portfolio/google-ads/11.jpg", alt: "Audience segment conversion map", type: "report" },
      { src: "/portfolio/google-ads/13.jpg", alt: "Attribution model comparisons", type: "report" }
    ],
    featuredImage: "/portfolio/google-ads/4.jpg"
  },
  {
    id: "meta-ads",
    category: "Meta Ads",
    title: "DTC Scale & Automated Creative Optimization",
    subtitle: "Scaling high-growth brand funnels using dynamic video variations and automated lookalike testing systems.",
    client: "LuxeWear Premium Retail",
    challenge: "Creative fatigue was eroding ad efficiency. Purchase ROAS would crash every time the client attempted to scale budget beyond $50k/month, requiring constant manual interventions and costly creative re-shoots.",
    strategy: "Engineered a rapid creative-testing engine focusing on high-retention video variations and dynamic catalog placements. Deployed audience aggregation pipelines to capture and pool custom pixel signals.",
    execution: "Created and launched over 30 video ad variations per week. Leveraged Meta's Advantage+ framework backed by strict custom budget rules, and structured campaigns to bypass standard overlap bidding constraints.",
    results: "Successfully scaled monthly ad spend by 5x while maintaining a robust, profitable purchase return on ad spend. Campaign stability reached an all-time high with minimal fatigue issues.",
    takeaways: [
      "High creative variation testing velocity prevents audience weariness and keeps CPMs stable at high budgets.",
      "Advantage+ automation performs best when backed by clear exclusions and consolidated audience parameters.",
      "Video hook variations (first 3 seconds) account for over 70% of paid conversion variance."
    ],
    metrics: [
      { label: "Purchase ROAS Lift", value: "+217%" },
      { label: "Total Social Reach", value: "1.6M" },
      { label: "Average Campaign ROAS", value: "4.2X" }
    ],
    images: [
      { src: "/portfolio/meta-ads/3.jpg", alt: "Instagram feed creative layout", type: "phone" },
      { src: "/portfolio/meta-ads/5.jpg", alt: "Mobile video ad mockups", type: "phone" },
      { src: "/portfolio/meta-ads/3-dashboard.jpg", alt: "Meta Ads business manager overview", type: "dashboard" },
      { src: "/portfolio/meta-ads/4-dashboard.jpg", alt: "Creative performance breakdown", type: "dashboard" },
      { src: "/portfolio/meta-ads/4-dashboard1.jpg", alt: "ROAS scale stats dashboard", type: "dashboard" },
      { src: "/portfolio/meta-ads/4-dashboard2.jpg", alt: "Custom audience acquisition reports", type: "dashboard" },
      { src: "/portfolio/meta-ads/4-dashboard3.jpg", alt: "Budget utilization charts", type: "dashboard" },
      { src: "/portfolio/meta-ads/4-dashboard4.jpg", alt: "Attribution performance comparison", type: "dashboard" }
    ],
    featuredImage: "/portfolio/meta-ads/4-dashboard.jpg"
  },
  {
    id: "social-media",
    category: "Social Media",
    title: "Viral Creator Loops & Community Growth Engine",
    subtitle: "Orchestrating high-retention short-form video flows and user-generated content strategies for rapid social growth.",
    client: "Apex Fitness Platforms",
    challenge: "Vanity metrics were high, but actual brand engagement and application installs were declining. Paid user acquisition costs were rising, prompting a critical need for low-cost organic discovery loops.",
    strategy: "Launched a performance-oriented creator network to seed viral video formats on TikTok and Instagram. Designed interactive content structures based on high-retention audio and hook templates.",
    execution: "Produced daily, platform-optimized vertical videos. Deployed automated comment-to-DM growth pathways to capture leads immediately, and ran targeted micro-influencer seed campaigns.",
    results: "Organic reach skyrocketed, driving hundreds of thousands of active engagements and a substantial increase in direct app store downloads without adding extra paid media budgets.",
    takeaways: [
      "Vertical video loops leveraging trending audio templates drive organic engagement exponentially.",
      "Interactive comment-to-DM triggers turn viral attention into measurable leads and app installs instantly.",
      "Micro-influencer content seeding generates authentic ad creative assets at a fraction of production costs."
    ],
    metrics: [
      { label: "Organic Views", value: "1.9M" },
      { label: "Community Reach", value: "747K" },
      { label: "Engagement Actions", value: "206K" }
    ],
    images: [
      { src: "/portfolio/social/4.jpg", alt: "TikTok content layout screenshot", type: "phone" },
      { src: "/portfolio/social/6.jpg", alt: "Instagram reels creative layout", type: "phone" },
      { src: "/portfolio/social/7.jpg", alt: "Community response and stories layout", type: "phone" },
      { src: "/portfolio/social/8.jpg", alt: "Brand engagement showcase", type: "phone" },
      { src: "/portfolio/social/9.jpg", alt: "User UGC compilation layout", type: "phone" },
      { src: "/portfolio/social/10.jpg", alt: "Social-first product placement", type: "phone" },
      { src: "/portfolio/social/4-dashboard.jpg", alt: "Social engagement dashboard analytics", type: "dashboard" }
    ],
    featuredImage: "/portfolio/social/4.jpg"
  }
];
