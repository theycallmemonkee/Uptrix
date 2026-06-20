// ─────────────────────────────────────────────────────────────────────────────
// Case Study Data — one entry per portfolio project
// Route: /case-studies/[slug]
// ─────────────────────────────────────────────────────────────────────────────

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
  /** Path to the hero / featured image */
  heroImage: string;
  /** All gallery images */
  images: { src: string; alt: string }[];
  stats: CSStat[];
  challenge: string;
  strategy: string;
  execution: string;
  results: string;
  beforeAfter?: { before: string; after: string; label: string }[];
  technologies: CSTech[];
  testimonial?: CSTestimonial;
  /** Slugs of up to 3 related projects */
  related: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// SEO Projects
// ─────────────────────────────────────────────────────────────────────────────

const toplimo: CaseStudy = {
  slug: "toplimo",
  title: "Toplimo — Local SEO Domination",
  client: "Toplimo",
  category: "AI SEO",
  industry: "Luxury Transportation",
  location: "United States",
  services: ["Technical SEO", "Local SEO", "Content Strategy", "UX Optimisation"],
  description:
    "AI-driven SEO strategy that transformed Toplimo's local search presence, boosting content quality, UX, and organic rankings across competitive local queries.",
  heroImage: "/portfolio/ai-seo/5.png",
  images: [
    { src: "/portfolio/ai-seo/5.png", alt: "Toplimo organic performance dashboard" },
    { src: "/portfolio/ai-seo/6.png", alt: "Keyword ranking matrix" },
    { src: "/portfolio/ai-seo/7.png", alt: "Local search visibility report" },
    { src: "/portfolio/ai-seo/8.png", alt: "Content engagement analytics" },
    { src: "/portfolio/ai-seo/9.png", alt: "Technical crawl health" },
  ],
  stats: [
    { value: "+200%", label: "Organic Traffic" },
    { value: "Top 3", label: "Local Rankings" },
    { value: "4×", label: "ROI Increase" },
  ],
  challenge:
    "Toplimo faced an invisible online presence despite operating in a high-demand local luxury-transport market. Their site had thin content, zero structured data, and no local schema signals — making them virtually invisible to local intent searches.",
  strategy:
    "We deployed an AI-powered local keyword cluster model to map every geo-intent query Toplimo was missing. This fed a hub-and-spoke content architecture, supplemented by a full technical audit that surfaced 140+ indexation and crawl-budget issues.",
  execution:
    "Rebuilt all service and location pages with semantically deep copy. Injected LocalBusiness + Vehicle schema on every relevant page. Ran a 6-week backlink acquisition sprint targeting local automotive and luxury directories. Resolved all Core Web Vitals failures.",
  results:
    "Within 90 days, Toplimo climbed to top-3 local positions for over 80 high-intent queries. Organic traffic doubled and continued compounding. Direct booking inquiries increased 4× month-over-month.",
  technologies: [
    { label: "AI Keyword Clustering" },
    { label: "Schema Markup" },
    { label: "Core Web Vitals" },
    { label: "Local SEO" },
    { label: "Content Hub Architecture" },
  ],
  testimonial: {
    quote:
      "Uptrix didn't just improve our rankings — they made us the obvious local choice. Organic leads went through the roof within three months.",
    author: "Operations Director",
    role: "Toplimo",
  },
  related: ["msg-canada", "affinoz", "avant-pharmacy"],
};

const msgCanada: CaseStudy = {
  slug: "msg-canada",
  title: "MSG Canada — Insurance SEO in 6 Months",
  client: "MSG Canada Insurance",
  category: "AI SEO",
  industry: "Insurance",
  location: "Canada",
  services: ["Full-Stack SEO", "Content Overhaul", "Meta Optimisation", "Link Building"],
  description:
    "Full-stack SEO and content overhaul that secured top-3 Google positions for high-competition insurance keywords — delivered in just 6 months.",
  heroImage: "/portfolio/ai-seo/6.png",
  images: [
    { src: "/portfolio/ai-seo/6.png", alt: "MSG Canada search rankings overview" },
    { src: "/portfolio/ai-seo/5.png", alt: "Organic traffic growth chart" },
    { src: "/portfolio/ai-seo/7.png", alt: "Content performance breakdown" },
    { src: "/portfolio/ai-seo/8.png", alt: "Backlink acquisition report" },
  ],
  stats: [
    { value: "Top 3", label: "Google Rankings" },
    { value: "6 Months", label: "Delivery Timeline" },
    { value: "+150%", label: "Organic Traffic" },
  ],
  challenge:
    "The Canadian insurance vertical is among the most competitive in organic search. MSG Canada had new service pages that were failing to rank despite strong business fundamentals, primarily due to weak on-page authority and no structured meta strategy.",
  strategy:
    "Executed an end-to-end SEO reset: AI-assisted content gap analysis, targeted page rebuilds for high-CPC insurance search terms, and a precision outreach campaign for editorial links from Canadian finance publications.",
  execution:
    "Rebuilt all 12 core service pages with intent-matched copy. Optimised every meta tag, title, and canonical signal. Secured 38 high-authority editorial backlinks within the campaign window. Resolved 60+ duplicate content and canonical conflicts.",
  results:
    "MSG Canada hit page-one positions for 35 primary insurance keywords within 6 months. Organic traffic grew 150%, and call-based inquiries from search increased by 2.3×.",
  technologies: [
    { label: "AI Content Gap Analysis" },
    { label: "Editorial Link Building" },
    { label: "On-Page SEO" },
    { label: "Canonical Architecture" },
    { label: "Meta Optimisation" },
  ],
  testimonial: {
    quote:
      "In a market this competitive, we never expected page-one results this fast. Uptrix delivered exactly what they promised — and then some.",
    author: "CEO",
    role: "MSG Canada Insurance",
  },
  related: ["toplimo", "affinoz", "dotnet-tricks"],
};

const affinoz: CaseStudy = {
  slug: "affinoz",
  title: "Affinoz — 1K to 100K Monthly Organic Users",
  client: "Affinoz",
  category: "AI SEO",
  industry: "E-Commerce / Lifestyle",
  location: "India",
  services: ["Technical SEO", "Content Strategy", "Conversion Optimisation", "Backlink Strategy"],
  description:
    "Complete SEO transformation scaling from 1K to 100K monthly organic users through technical excellence, content strategy, and sustained inbound growth.",
  heroImage: "/portfolio/ai-seo/7.png",
  images: [
    { src: "/portfolio/ai-seo/7.png", alt: "Affinoz traffic scaling dashboard" },
    { src: "/portfolio/ai-seo/8.png", alt: "Keyword growth trajectory" },
    { src: "/portfolio/ai-seo/9.png", alt: "Conversion funnel analytics" },
    { src: "/portfolio/ai-seo/10.png", alt: "Content performance by category" },
  ],
  stats: [
    { value: "100K", label: "Monthly Users" },
    { value: "100×", label: "Traffic Growth" },
    { value: "+65%", label: "Conversion Rate" },
  ],
  challenge:
    "Affinoz was stuck at 1,000 monthly organic visitors with minimal SEO infrastructure. Crawl depth issues, thin product descriptions, and no topic authority in any category meant Google largely ignored the domain.",
  strategy:
    "Established full category-level topical authority through a 200-article content calendar. Built a technical foundation — sitemap restructure, crawl budget rules, image compression — to enable rapid indexation of new content.",
  execution:
    "Produced and published 200+ SEO-optimised articles, 40 long-form pillar pages, and 120 product-category landing pages over 9 months. Simultaneously ran a white-hat link-building campaign generating 300+ dofollow links.",
  results:
    "Monthly organic users scaled from 1,000 to 100,000 — a 100× increase — within 12 months. Conversion rate improved 65% through landing page A/B testing and call-to-action restructuring.",
  technologies: [
    { label: "Topical Authority Building" },
    { label: "Pillar & Cluster Content" },
    { label: "White-Hat Link Building" },
    { label: "Technical SEO Audit" },
    { label: "A/B Conversion Testing" },
  ],
  testimonial: {
    quote:
      "The organic growth Uptrix generated changed our entire business model. We went from paying for every click to being flooded with free, high-quality traffic.",
    author: "Founder",
    role: "Affinoz",
  },
  related: ["toplimo", "avant-pharmacy", "dotnet-tricks"],
};

const avantPharmacy: CaseStudy = {
  slug: "avant-pharmacy",
  title: "Avant Pharmacy — Health SEO Leadership",
  client: "Avant Pharmacy",
  category: "AI SEO",
  industry: "Healthcare / Pharmacy",
  location: "United Kingdom",
  services: ["Healthcare SEO", "UX Enhancement", "Local Schema", "Content Strategy"],
  description:
    "Custom pharmacy SEO strategy tailored for competitive health keywords, delivering measurable improvements in search visibility and patient engagement.",
  heroImage: "/portfolio/ai-seo/8.png",
  images: [
    { src: "/portfolio/ai-seo/8.png", alt: "Avant Pharmacy search performance" },
    { src: "/portfolio/ai-seo/9.png", alt: "Local ranking improvements" },
    { src: "/portfolio/ai-seo/5.png", alt: "User engagement metrics" },
    { src: "/portfolio/ai-seo/6.png", alt: "Health content performance" },
  ],
  stats: [
    { value: "+300%", label: "SEO Score" },
    { value: "Top 5", label: "Search Rankings" },
    { value: "2×", label: "Conversions" },
  ],
  challenge:
    "Avant Pharmacy's website had strong brand recognition locally but virtually no search engine visibility. Health-sector YMYL content standards meant Google's quality signals were particularly strict, and generic content was being filtered out.",
  strategy:
    "Designed a pharmacy-specific YMYL content framework with medically accurate, author-attributed pages. Combined this with a deep local SEO play — each pharmacy branch received its own optimised page with full LocalBusiness schema.",
  execution:
    "Rewrote all service and condition pages to meet E-E-A-T standards. Assigned qualified authorship. Deployed Google Business Profile optimisation for 8 branches. Resolved Core Web Vitals across the entire domain.",
  results:
    "SEO health score improved 300%. All primary health-service queries reached top-5 positions. Pharmacy inquiries and prescription bookings doubled within 4 months of launch.",
  technologies: [
    { label: "YMYL Content Standards" },
    { label: "E-E-A-T Optimisation" },
    { label: "LocalBusiness Schema" },
    { label: "Google Business Profile" },
    { label: "Core Web Vitals" },
  ],
  testimonial: {
    quote:
      "Our patient inquiry volume doubled in 4 months. Uptrix truly understands the complexity of healthcare SEO.",
    author: "Marketing Manager",
    role: "Avant Pharmacy",
  },
  related: ["toplimo", "affinoz", "dotnet-tricks"],
};

const dotnetTricks: CaseStudy = {
  slug: "dotnet-tricks",
  title: "DotNetTricks — 200+ Leads/Month from Organic Search",
  client: "DotNetTricks",
  category: "AI SEO",
  industry: "Online Education / Tech",
  location: "India",
  services: ["Technical SEO", "Content SEO", "Backlink Acquisition", "Lead Generation SEO"],
  description:
    "Technical and content SEO execution that doubled organic traffic to 11K monthly visitors and generated 200+ qualified leads every single month.",
  heroImage: "/portfolio/ai-seo/9.png",
  images: [
    { src: "/portfolio/ai-seo/9.png", alt: "DotNetTricks organic traffic growth" },
    { src: "/portfolio/ai-seo/10.png", alt: "Keyword rankings progress" },
    { src: "/portfolio/ai-seo/5.png", alt: "Lead generation analytics" },
    { src: "/portfolio/ai-seo/6.png", alt: "Backlink profile health" },
  ],
  stats: [
    { value: "11K", label: "Monthly Traffic" },
    { value: "200+", label: "Monthly Leads" },
    { value: "+120%", label: "Backlink Growth" },
  ],
  challenge:
    "DotNetTricks had good brand recognition in the .NET developer community but was losing course-enrollment traffic to newer competitors with stronger SEO infrastructure. Organic lead generation was sporadic and unreliable.",
  strategy:
    "Built a course-content SEO funnel targeting high-commercial-intent queries like 'learn .NET online' and 'microservices certification'. Paired this with a competitive backlink strategy targeting developer blogs, GitHub repos, and education directories.",
  execution:
    "Published 80 SEO-optimised course-landing and tutorial pages. Ran a 3-month developer community link-building sprint earning 150+ dofollow links. Optimised site speed to sub-1.5s and fixed 30+ technical crawl errors.",
  results:
    "Monthly organic visitors grew from 5,500 to 11,000 within 6 months. More importantly, organic lead quality improved dramatically — 200+ course inquiries per month with high purchase-intent signal.",
  technologies: [
    { label: "Course Landing Page SEO" },
    { label: "Developer Community Outreach" },
    { label: "Technical Audit" },
    { label: "Educational Schema" },
    { label: "Backlink Acquisition" },
  ],
  testimonial: {
    quote:
      "Our course inquiries from Google doubled in 6 months. The SEO investment paid for itself within the first campaign month.",
    author: "Founder",
    role: "DotNetTricks",
  },
  related: ["affinoz", "msg-canada", "knovatek"],
};

// ─────────────────────────────────────────────────────────────────────────────
// Google Ads Projects
// ─────────────────────────────────────────────────────────────────────────────

const hearingCentre: CaseStudy = {
  slug: "hearing-centre",
  title: "Hearing Centre — Local PPC Lead Machine",
  client: "Hearing Centre",
  category: "Google Ads",
  industry: "Healthcare / Audiology",
  location: "Canada",
  services: ["Google Search Ads", "Local Campaigns", "Negative Keyword Management", "Landing Page CRO"],
  description:
    "Designed and launched targeted local search campaigns to capture high-intent audiology service queries, driving 142% more leads at 28% lower cost.",
  heroImage: "/portfolio/google-ads/4.jpg",
  images: [
    { src: "/portfolio/google-ads/4.jpg", alt: "Hearing Centre Google Ads performance overview" },
    { src: "/portfolio/google-ads/5.jpg", alt: "Search query report" },
    { src: "/portfolio/google-ads/6.jpg", alt: "Lead volume growth chart" },
    { src: "/portfolio/google-ads/7.jpg", alt: "Cost per lead reduction" },
    { src: "/portfolio/google-ads/8.jpg", alt: "Campaign ROAS breakdown" },
  ],
  stats: [
    { value: "+142%", label: "Lead Volume" },
    { value: "-28%", label: "Cost Per Lead" },
    { value: "4.2×", label: "Campaign ROAS" },
  ],
  challenge:
    "Hearing Centre's existing Google Ads campaigns were generating clicks but minimal qualified leads. Broad-match keywords were attracting irrelevant searches, and landing pages had no conversion optimisation — resulting in wasted budget and high CPLs.",
  strategy:
    "Restructured campaigns around exact and phrase-match high-intent audiology terms. Built a granular negative keyword list of 400+ exclusions. Redesigned landing pages with single focused CTAs and local trust signals.",
  execution:
    "Launched 4 tightly themed ad groups targeting distinct services (hearing aids, tinnitus treatment, hearing tests, children's audiology). Implemented call tracking via Google forwarding numbers. Weekly search term audits to continuously feed negatives.",
  results:
    "Lead volume increased 142% while cost per lead dropped 28% — all within the same monthly budget. Campaign ROAS reached 4.2× within 60 days of launch.",
  technologies: [
    { label: "Google Search Ads" },
    { label: "Call Tracking" },
    { label: "Negative Keyword Engineering" },
    { label: "Landing Page CRO" },
    { label: "Local Ad Extensions" },
  ],
  testimonial: {
    quote:
      "We went from paying $120 per lead to under $85, and the volume more than doubled. Uptrix fundamentally changed our acquisition economics.",
    author: "Practice Manager",
    role: "Hearing Centre",
  },
  related: ["knovatek", "toezone-uk", "ikare-home"],
};

const knovatek: CaseStudy = {
  slug: "knovatek",
  title: "Knovatek Inc. — $2.4M Pipeline from Google Ads",
  client: "Knovatek Inc.",
  category: "Google Ads",
  industry: "B2B SaaS / Technology",
  location: "Canada",
  services: ["Performance Max", "B2B Search Ads", "Landing Page CRO", "Pipeline Attribution"],
  description:
    "Engineered scalable Performance Max and B2B search ads to drive global demo bookings, generating a $2.4M pipeline and 3.8× more qualified signups.",
  heroImage: "/portfolio/google-ads/6.jpg",
  images: [
    { src: "/portfolio/google-ads/6.jpg", alt: "Knovatek campaign performance overview" },
    { src: "/portfolio/google-ads/7.jpg", alt: "Demo booking conversion data" },
    { src: "/portfolio/google-ads/8.jpg", alt: "Performance Max asset group results" },
    { src: "/portfolio/google-ads/9.jpg", alt: "Pipeline attribution dashboard" },
    { src: "/portfolio/google-ads/10.jpg", alt: "SQL conversion tracking" },
  ],
  stats: [
    { value: "3.8×", label: "Demo Signups" },
    { value: "$2.4M", label: "Pipeline Value" },
    { value: "+88%", label: "SQL Conversion" },
  ],
  challenge:
    "Knovatek needed a predictable, scalable channel for qualified B2B demo bookings globally. Their previous agency's campaigns drove traffic but failed to generate sales-qualified leads — the gap between MQL and SQL was costing them deals.",
  strategy:
    "Implemented offline conversion import to feed closed-won deal values back into Google's smart bidding. Built a Performance Max campaign layered with strong audience signals from CRM data and retargeting lists.",
  execution:
    "Designed 6 landing page variants with localised copy for North America, UK, and ANZ. Ran A/B tests weekly. Set up automated Slack alerts for lead quality scoring. Deployed remarketing ads targeting demo-abandoners within 24 hours.",
  results:
    "Demo signups grew 3.8× and SQL conversion improved 88%. Google Ads directly attributed $2.4M in closed pipeline within the 6-month campaign window.",
  technologies: [
    { label: "Performance Max" },
    { label: "Offline Conversion Import" },
    { label: "CRM Audience Signals" },
    { label: "Multi-Region Landing Pages" },
    { label: "Pipeline Attribution" },
  ],
  testimonial: {
    quote:
      "Uptrix turned our Google Ads into a genuine revenue engine. $2.4M in attributed pipeline is a number our board has never seen from a single channel.",
    author: "VP of Growth",
    role: "Knovatek Inc.",
  },
  related: ["hearing-centre", "sers-australia", "toezone-uk"],
};

const toeZoneUk: CaseStudy = {
  slug: "toezone-uk",
  title: "ToeZone UK — 6.4× Shopping ROAS at Scale",
  client: "ToeZone UK",
  category: "Google Ads",
  industry: "Retail / Footwear",
  location: "United Kingdom",
  services: ["Google Shopping", "Smart Bidding", "Retargeting", "Product Feed Optimisation"],
  description:
    "Scaled shopping campaigns and search ads for UK footwear brand, driving 6.4× shopping ROAS and 210% more online sales.",
  heroImage: "/portfolio/google-ads/8.jpg",
  images: [
    { src: "/portfolio/google-ads/8.jpg", alt: "ToeZone UK Shopping campaign overview" },
    { src: "/portfolio/google-ads/9.jpg", alt: "Product performance breakdown" },
    { src: "/portfolio/google-ads/10.jpg", alt: "ROAS scaling chart" },
    { src: "/portfolio/google-ads/11.jpg", alt: "Retargeting performance data" },
    { src: "/portfolio/google-ads/12.jpg", alt: "Impression share analysis" },
  ],
  stats: [
    { value: "6.4×", label: "Shopping ROAS" },
    { value: "+210%", label: "Online Sales" },
    { value: "5.1M", label: "Impressions" },
  ],
  challenge:
    "ToeZone UK's Google Shopping campaigns were profitable but severely under-scaled. Their product feed had poor titles, missing GTINs, and no structured segments — limiting Google's ability to match products to high-intent buyers.",
  strategy:
    "Rebuilt the Merchant Center feed with optimised product titles, full GTIN coverage, and detailed attribute mapping. Restructured Shopping campaigns into brand/non-brand and price-tier segments with dedicated bidding strategies.",
  execution:
    "Launched Standard Shopping + Performance Max hybrid. Optimised product titles with competitor keyword analysis. Deployed seasonal budget rules for bank holidays and peak retail weeks. Built RLSA retargeting layers for cart abandoners.",
  results:
    "Shopping ROAS reached 6.4× at sustained budget levels. Online sales grew 210% YoY. Total impression share expanded to 5.1M monthly, establishing ToeZone as a top-of-market presence in UK footwear search.",
  technologies: [
    { label: "Google Shopping" },
    { label: "Merchant Center Optimisation" },
    { label: "Performance Max" },
    { label: "RLSA Retargeting" },
    { label: "Smart Bidding" },
  ],
  testimonial: {
    quote:
      "Our Google Shopping revenue tripled. Uptrix's feed optimisation alone was worth the entire engagement fee.",
    author: "E-Commerce Director",
    role: "ToeZone UK",
  },
  related: ["knovatek", "ikare-home", "sers-australia"],
};

const ikareHome: CaseStudy = {
  slug: "ikare-home",
  title: "iKare Home — 180% More Elderly Care Bookings",
  client: "iKare Home",
  category: "Google Ads",
  industry: "Home Healthcare",
  location: "Canada",
  services: ["Local Search Ads", "Call Tracking", "Conversion Mapping", "Landing Page Rebuild"],
  description:
    "Rebuilt local lead generation funnel for home care services, achieving 180% more inquiries and 3.6× booking rate at lower cost per call.",
  heroImage: "/portfolio/google-ads/10.jpg",
  images: [
    { src: "/portfolio/google-ads/10.jpg", alt: "iKare Home Ads performance overview" },
    { src: "/portfolio/google-ads/11.jpg", alt: "Call tracking attribution data" },
    { src: "/portfolio/google-ads/12.jpg", alt: "Lead quality scoring dashboard" },
    { src: "/portfolio/google-ads/13.jpg", alt: "Cost per call trend analysis" },
  ],
  stats: [
    { value: "+180%", label: "Inquiries" },
    { value: "3.6×", label: "Booking Rates" },
    { value: "-22%", label: "Cost Per Call" },
  ],
  challenge:
    "iKare Home served a sensitive eldercare audience where generic ad language failed to convert. High CPCs from competitive healthcare terms were draining budget on low-intent clicks, and call tracking was non-existent — making attribution impossible.",
  strategy:
    "Built compassion-focused ad copy frameworks that spoke directly to family decision-makers. Implemented dynamic call tracking with service-type attribution and set up lead quality scoring to filter out non-eligible inquiries.",
  execution:
    "Launched 3 geo-targeted campaigns for Greater Toronto, Ottawa, and Calgary. Deployed call-only ads for mobile users. Built a trust-first landing page with family testimonials, certifications, and a simple 2-field inquiry form.",
  results:
    "Inquiries grew 180%, booking rate increased 3.6×, and cost per qualified call dropped 22% — all within a maintained monthly budget. Attribution clarity improved lead-to-intake conversion by 40%.",
  technologies: [
    { label: "Call-Only Ads" },
    { label: "Dynamic Call Tracking" },
    { label: "Geo-Targeted Campaigns" },
    { label: "Lead Quality Scoring" },
    { label: "Healthcare-Compliant Copy" },
  ],
  testimonial: {
    quote:
      "Uptrix helped us reach the families who genuinely need our services. The inquiry quality improvement was just as important as the volume.",
    author: "Director of Operations",
    role: "iKare Home",
  },
  related: ["hearing-centre", "knovatek", "sers-australia"],
};

const sersAustralia: CaseStudy = {
  slug: "sers-australia",
  title: "SERS Australia — $4.1M Engineering Contract Pipeline",
  client: "SERS Australia",
  category: "Google Ads",
  industry: "Engineering / B2B Services",
  location: "Australia",
  services: ["Enterprise Search Ads", "Geographic Bidding", "B2B Lead Generation", "Ad Scheduling"],
  description:
    "Structured complex commercial search campaigns to capture high-value enterprise engineering contract opportunities, generating $4.1M in pipeline.",
  heroImage: "/portfolio/google-ads/12.jpg",
  images: [
    { src: "/portfolio/google-ads/12.jpg", alt: "SERS Australia enterprise campaign overview" },
    { src: "/portfolio/google-ads/13.jpg", alt: "Geographic bid adjustment analysis" },
    { src: "/portfolio/google-ads/4.jpg", alt: "B2B lead volume chart" },
    { src: "/portfolio/google-ads/5.jpg", alt: "Ad schedule performance heatmap" },
  ],
  stats: [
    { value: "+94%", label: "Enterprise Leads" },
    { value: "5.8×", label: "ROAS Realized" },
    { value: "$4.1M", label: "Contract Pipeline" },
  ],
  challenge:
    "SERS Australia operated in a niche engineering services market where standard broad keyword approaches failed to attract decision-makers. Long sales cycles meant attribution was complex and standard PPC metrics were misleading.",
  strategy:
    "Built a specialist B2B intent keyword map covering engineering procurement, contractor sourcing, and compliance certification queries. Implemented multi-touch attribution aligned to the 60–90 day sales cycle with offline conversion tracking.",
  execution:
    "Structured 5 campaigns by engineering discipline: civil, structural, mechanical, electrical, and compliance. Deployed aggressive geographic bidding modifiers for NSW and VIC commercial hubs. Ran A/B tests on 3 landing page variants with industry-specific copy.",
  results:
    "Enterprise qualified leads increased 94%. The $4.1M pipeline generated within 8 months delivered a 5.8× return on the total ad investment, validated through closed-contract attribution.",
  technologies: [
    { label: "Multi-Touch Attribution" },
    { label: "Offline Conversion Tracking" },
    { label: "Geographic Bid Modifiers" },
    { label: "B2B Intent Keyword Mapping" },
    { label: "Ad Schedule Optimisation" },
  ],
  testimonial: {
    quote:
      "The pipeline SERS generated through Google Ads in 8 months exceeded our entire previous year of business development spend. Remarkable result.",
    author: "Managing Director",
    role: "SERS Australia",
  },
  related: ["knovatek", "hearing-centre", "ikare-home"],
};

// ─────────────────────────────────────────────────────────────────────────────
// Meta Ads Projects
// ─────────────────────────────────────────────────────────────────────────────

const metaBeauty: CaseStudy = {
  slug: "meta-beauty",
  title: "D2C Beauty Brand — 44M+ Impressions at Scale",
  client: "D2C Beauty & Personal Care Brand",
  category: "Meta Ads",
  industry: "Beauty / Personal Care",
  location: "India",
  services: ["Meta Dynamic Catalog Ads", "Video Creative Strategy", "Lookalike Scaling", "Retargeting"],
  description:
    "Scaled dynamic catalog ads and video hooks to drive 44M+ impressions, 22M+ engagements, and 2.5M+ landing page views for a DTC beauty brand.",
  heroImage: "/portfolio/meta-ads/3.jpg",
  images: [
    { src: "/portfolio/meta-ads/3.jpg", alt: "Beauty brand creative showcase" },
    { src: "/portfolio/meta-ads/3-dashboard.jpg", alt: "Campaign performance overview" },
    { src: "/portfolio/meta-ads/4-dashboard.jpg", alt: "Audience engagement breakdown" },
    { src: "/portfolio/meta-ads/4-dashboard1.jpg", alt: "ROAS scaling data" },
  ],
  stats: [
    { value: "44M+", label: "Impressions" },
    { value: "22M+", label: "Engagements" },
    { value: "2.5M+", label: "Landing Page Views" },
  ],
  challenge:
    "The brand was struggling to scale beyond ₹5L/month in Meta spend without ROAS collapse. Creative fatigue was the primary culprit — the same 3–4 ads running for months had exhausted their audience pools.",
  strategy:
    "Deployed a rapid creative iteration engine: 20+ new video variations per week with distinct first-3-second hooks. Built a full-funnel architecture from awareness (video views) through consideration (catalog) to conversion (retargeting).",
  execution:
    "Launched Advantage+ catalog campaigns with custom product sets. Produced lifestyle UGC videos for top-of-funnel. Built lookalike audiences from high-LTV purchasers. Implemented 7-day view, 1-day click attribution windows.",
  results:
    "44M+ impressions, 22M+ engagements, and 2.5M+ landing page views across a 90-day campaign. ROAS stabilised at 3.8× at 5× the previous spend level.",
  technologies: [
    { label: "Meta Advantage+" },
    { label: "Dynamic Catalog Ads" },
    { label: "UGC Creative Production" },
    { label: "Lookalike Audience Scaling" },
    { label: "Multi-Touch Attribution" },
  ],
  testimonial: {
    quote:
      "Uptrix cracked the creative fatigue problem we'd been fighting for 8 months. The volume and quality of our Meta results are unrecognisable from before.",
    author: "Marketing Director",
    role: "D2C Beauty Brand",
  },
  related: ["meta-real-estate-canada", "meta-education", "meta-lead-gen-intl"],
};

const metaRealEstateCanada: CaseStudy = {
  slug: "meta-real-estate-canada",
  title: "Canadian Real Estate — 588 Leads at $17 CPL",
  client: "Canadian Real Estate Lead Generation",
  category: "Meta Ads",
  industry: "Real Estate",
  location: "Canada",
  services: ["Meta Lead Forms", "Hyper-Local Targeting", "Audience Segmentation", "Lead Nurturing"],
  description:
    "Designed hyper-local Meta lead form campaigns targeting prospective homebuyers and property investors, generating 588 qualified leads at just $17 CPL.",
  heroImage: "/portfolio/meta-ads/3-dashboard.jpg",
  images: [
    { src: "/portfolio/meta-ads/3-dashboard.jpg", alt: "Real estate lead campaign dashboard" },
    { src: "/portfolio/meta-ads/4-dashboard.jpg", alt: "Audience targeting breakdown" },
    { src: "/portfolio/meta-ads/4-dashboard1.jpg", alt: "Lead form performance data" },
    { src: "/portfolio/meta-ads/5.jpg", alt: "Creative performance split results" },
  ],
  stats: [
    { value: "588", label: "Leads Generated" },
    { value: "$17", label: "Cost Per Lead" },
    { value: "$10K", label: "Ad Spend" },
  ],
  challenge:
    "The real estate market in Canada had seen CPLs balloon to $60–$80 from generic demographic targeting. The client needed high-volume, qualified homebuyer leads within a fixed $10K monthly budget.",
  strategy:
    "Replaced broad demographic targeting with a hyper-local interest + behaviour matrix — targeting users who had recently searched property sites, engaged with mortgage content, or lived within 15km of target listings.",
  execution:
    "Built native Meta instant lead forms with 4-field qualification (location, budget, timeline, property type). Ran 8 creative variants with property photography and lifestyle imagery. Optimised daily based on lead-to-appointment rate from CRM data.",
  results:
    "588 qualified leads generated at a $17 CPL average — 65–75% below the market benchmark — from a $10K spend window.",
  technologies: [
    { label: "Meta Instant Lead Forms" },
    { label: "Hyper-Local Audience Targeting" },
    { label: "CRM Lead Sync" },
    { label: "Creative A/B Testing" },
    { label: "Interest-Behaviour Matrix" },
  ],
  testimonial: {
    quote:
      "We were paying $65 a lead before Uptrix. Getting qualified buyer inquiries at $17 in a market like Toronto felt impossible until it happened.",
    author: "Brokerage Owner",
    role: "Canadian Real Estate",
  },
  related: ["meta-beauty", "meta-education", "meta-lead-gen-intl"],
};

const metaEducation: CaseStudy = {
  slug: "meta-education",
  title: "Education Lead Gen — 448 Registrations at $2.27 CPA",
  client: "Education Lead Generation",
  category: "Meta Ads",
  industry: "Professional Education",
  location: "India",
  services: ["Meta Video Ads", "Demographic Targeting", "Retargeting", "Lead Form Optimisation"],
  description:
    "Launched targeted demographic campaigns and video ads promoting professional education program registrations, achieving 448 sign-ups at just $2.27 CPA.",
  heroImage: "/portfolio/meta-ads/4-dashboard.jpg",
  images: [
    { src: "/portfolio/meta-ads/4-dashboard.jpg", alt: "Education campaign performance overview" },
    { src: "/portfolio/meta-ads/4-dashboard1.jpg", alt: "Registration funnel analytics" },
    { src: "/portfolio/meta-ads/4-dashboard2.jpg", alt: "Cost per registration trend" },
    { src: "/portfolio/meta-ads/3-dashboard.jpg", alt: "Video ad engagement data" },
  ],
  stats: [
    { value: "448", label: "Registrations" },
    { value: "$2.27", label: "Cost Per Registration" },
    { value: "$1,015", label: "Total Ad Spend" },
  ],
  challenge:
    "The education client needed high registration volume for a professional certification program at the lowest possible CPA. Previous attempts at lead generation via Google had produced CPLs of $12–$18 — too expensive for their programme economics.",
  strategy:
    "Meta's education-seeker audience clusters offered a far more efficient path. Built video-first campaigns showing real student outcomes, followed by retargeting sequences for video viewers who hadn't yet registered.",
  execution:
    "Produced 3 short-form testimonial videos (30–60 seconds). Built a 2-step funnel: interest video → registration landing page. Ran 6 audience segments including interest-based, lookalike, and retargeting. Optimised for completed-registration conversion event.",
  results:
    "448 registrations generated from $1,015 total spend — a $2.27 CPA, 80% below the Google benchmark. Retargeting audiences alone contributed 38% of all conversions.",
  technologies: [
    { label: "Meta Video Ads" },
    { label: "Student Testimonial Creative" },
    { label: "2-Step Conversion Funnel" },
    { label: "Lookalike Audiences" },
    { label: "Retargeting Sequences" },
  ],
  testimonial: {
    quote:
      "We enrolled more students at $2 a lead than we ever could with our previous $15 CPL campaigns. The Meta strategy was a complete game-changer.",
    author: "Programme Director",
    role: "Professional Education Institute",
  },
  related: ["meta-beauty", "meta-real-estate-canada", "meta-lead-gen-intl"],
};

const metaLeadGenIntl: CaseStudy = {
  slug: "meta-lead-gen-intl",
  title: "International Lead Generation — 612K Reach, Multi-Country",
  client: "International Lead Generation",
  category: "Meta Ads",
  industry: "B2B Services",
  location: "Global",
  services: ["Multi-Country Meta Campaigns", "Lookalike Scaling", "Automated Lead Routing", "Creative Localisation"],
  description:
    "Scaled multi-country lead capture campaigns with lookalike targeting and custom automated lead routing — reaching 612K users across 5 countries.",
  heroImage: "/portfolio/meta-ads/4-dashboard4.jpg",
  images: [
    { src: "/portfolio/meta-ads/4-dashboard4.jpg", alt: "International campaign reach dashboard" },
    { src: "/portfolio/meta-ads/4-dashboard3.jpg", alt: "Multi-country performance breakdown" },
    { src: "/portfolio/meta-ads/4-dashboard2.jpg", alt: "Lookalike audience scaling results" },
    { src: "/portfolio/meta-ads/3-dashboard.jpg", alt: "Lead routing automation overview" },
  ],
  stats: [
    { value: "612K", label: "Reach" },
    { value: "998K", label: "Impressions" },
    { value: "$2,612", label: "Total Spend" },
  ],
  challenge:
    "The client needed to generate qualified B2B leads across 5 international markets from a single unified campaign infrastructure — without duplicating creative production costs or management overhead across regions.",
  strategy:
    "Built a single campaign template framework with dynamic localisation layers — geo-targeted ad sets with region-specific copy variations, all feeding into a centralised lead management system with automated regional routing.",
  execution:
    "Launched campaigns across US, UK, India, UAE, and Australia. Used 1% lookalike audiences built from high-LTV customers in each market. Integrated Zapier routing to send leads directly to regional sales CRMs within 60 seconds of form submission.",
  results:
    "612K total reach and 998K impressions at an efficient $2,612 total spend — an effective CPM of $2.62. Lead-to-appointment rates averaged 18% across all markets.",
  technologies: [
    { label: "Multi-Country Meta Campaigns" },
    { label: "Dynamic Creative Localisation" },
    { label: "1% Lookalike Audiences" },
    { label: "Zapier Lead Routing" },
    { label: "Multi-CRM Integration" },
  ],
  testimonial: {
    quote:
      "Managing 5 international markets from one campaign framework was something we thought was impossible. Uptrix made it simple and incredibly cost-efficient.",
    author: "Head of International Sales",
    role: "B2B Services Group",
  },
  related: ["meta-beauty", "meta-real-estate-canada", "meta-education"],
};

// ─────────────────────────────────────────────────────────────────────────────
// Social Media
// ─────────────────────────────────────────────────────────────────────────────

const apexFitness: CaseStudy = {
  slug: "apex-fitness",
  title: "Apex Fitness — 1.9M Organic Views & Community Engine",
  client: "Apex Fitness Platforms",
  category: "Social Media",
  industry: "Fitness / Health Tech",
  location: "United States",
  services: ["Organic Social Strategy", "UGC Creator Network", "Short-Form Video Production", "Community Growth"],
  description:
    "Viral creator loop strategy that generated 1.9M organic views, built a 747K community, and drove app installs without additional paid media spend.",
  heroImage: "/portfolio/social/4-dashboard.jpg",
  images: [
    { src: "/portfolio/social/4-dashboard.jpg", alt: "Apex Fitness social analytics dashboard" },
    { src: "/portfolio/social/4.jpg", alt: "TikTok content performance" },
    { src: "/portfolio/social/6.jpg", alt: "Instagram reels engagement" },
    { src: "/portfolio/social/7.jpg", alt: "Creator network content" },
    { src: "/portfolio/social/8.jpg", alt: "Community engagement metrics" },
    { src: "/portfolio/social/9.jpg", alt: "App install attribution" },
  ],
  stats: [
    { value: "1.9M", label: "Organic Views" },
    { value: "747K", label: "Community Reach" },
    { value: "206K", label: "Total Engagements" },
  ],
  challenge:
    "Apex Fitness was spending heavily on paid social to drive app installs but seeing diminishing returns. Organic content was inconsistent, engagement was declining, and the brand had no community identity that users wanted to be part of.",
  strategy:
    "Built a performance-oriented creator network: 12 micro-influencers in the fitness space producing 3 videos per week each. Designed a content system based on trending audio hooks, challenge formats, and community call-to-action loops.",
  execution:
    "Launched a 90-day creator programme with templated brief structures and rapid posting schedules. Deployed automated comment-to-DM flows to capture warm leads immediately after viral moments. Ran weekly performance reviews to double down on winning formats.",
  results:
    "1.9M organic views, 747K community reach, and 206K engagements — all without a single dollar of paid media. App install velocity increased 3.2× from organic alone during the campaign period.",
  technologies: [
    { label: "TikTok Creator Programme" },
    { label: "Instagram Reels Strategy" },
    { label: "Comment-to-DM Automation" },
    { label: "Trend-Led Hook Templates" },
    { label: "Community Growth Loops" },
  ],
  testimonial: {
    quote:
      "We stopped paying for installs because organic was delivering more — and better quality users — than anything we'd ever paid for. This changed how we think about growth.",
    author: "CMO",
    role: "Apex Fitness Platforms",
  },
  related: ["meta-beauty", "meta-education", "knovatek"],
};

// ─────────────────────────────────────────────────────────────────────────────
// Website Projects
// ─────────────────────────────────────────────────────────────────────────────

const jazzo: CaseStudy = {
  slug: "jazzo",
  title: "Jazzo Store — High-Performance Streetwear Commerce",
  client: "Jazzo Store",
  category: "Website Development",
  industry: "Fashion / E-Commerce",
  location: "India",
  services: ["Next.js Development", "Headless Commerce", "CDN Image Pipeline", "Mobile-First UX"],
  description:
    "High-end designer streetwear store with custom product matrices, dynamic category filtering, CDN image pipelines, and mobile-first layouts achieving 99+ Lighthouse.",
  heroImage: "/portfolio/websites/jazzo.jpg",
  images: [
    { src: "/portfolio/websites/jazzo.jpg", alt: "Jazzo Store homepage showcase" },
    { src: "/portfolio/websites/vastra.jpg", alt: "Product grid layout" },
    { src: "/portfolio/websites/lebodee.jpg", alt: "Mobile category browsing" },
  ],
  stats: [
    { value: "0.4s", label: "Page Load Speed" },
    { value: "99+", label: "Lighthouse Score" },
    { value: "3×", label: "Conversion Lift" },
  ],
  challenge:
    "Jazzo Store needed a premium streetwear e-commerce experience that could compete with global fashion brands. Their existing WooCommerce site was slow (8s load), had poor mobile UX, and no filtering — resulting in a 78% bounce rate on mobile.",
  strategy:
    "Migrated to a headless Next.js 14 architecture with edge rendering. Built a custom product matrix system allowing multi-attribute filtering (size, colour, category, price) without full-page reloads. Implemented CDN-first image delivery via Cloudinary.",
  execution:
    "Designed and built the full frontend in 6 weeks. Implemented infinite scroll product grids with Intersection Observer. Built custom size guide overlays, wishlist functionality, and cart persistence via localStorage with Zustand state management.",
  results:
    "Page load speed dropped to 0.4s. Lighthouse score hit 99+. Mobile bounce rate fell from 78% to 31%. Conversion rate increased 3× within the first month of launch.",
  technologies: [
    { label: "Next.js 14" },
    { label: "Tailwind CSS" },
    { label: "Cloudinary CDN" },
    { label: "Zustand State Management" },
    { label: "Headless Commerce" },
    { label: "Vercel Edge Rendering" },
  ],
  testimonial: {
    quote:
      "The site Uptrix built for us makes our brand look world-class. Sales have tripled and our customers spend more time than ever on the product pages.",
    author: "Founder",
    role: "Jazzo Store",
  },
  related: ["vastra", "lebodee", "bigblare"],
};

const bigblare: CaseStudy = {
  slug: "bigblare",
  title: "Big Blare Innovations — Agency Site with Glass UI",
  client: "Big Blare Innovations",
  category: "Website Development",
  industry: "Digital Agency",
  location: "India",
  services: ["Next.js 15", "Glassmorphic UI System", "Framer Motion Animations", "Lead Intake Automation"],
  description:
    "Sleek agency hub with dynamic page-reveal transitions, glassmorphic UI components, interactive service grids, and optimised client intake workflows.",
  heroImage: "/portfolio/websites/bigblare.jpg",
  images: [
    { src: "/portfolio/websites/bigblare.jpg", alt: "Big Blare homepage design" },
    { src: "/portfolio/websites/uptrix.jpg", alt: "Services section design" },
    { src: "/portfolio/websites/vodaiq.jpg", alt: "Case study showcase section" },
  ],
  stats: [
    { value: "Next.js 15", label: "Modern Stack" },
    { value: "99+", label: "Performance Score" },
    { value: "2×", label: "Lead Generation" },
  ],
  challenge:
    "Big Blare needed a website that matched their positioning as a premium creative agency — but their existing site was a basic WordPress theme with no brand personality, slow animations, and a contact form that went nowhere.",
  strategy:
    "Built a fully custom design system using glassmorphism, micro-animations, and scroll-trigger reveals that matched the agency's creative identity. Integrated a multi-step intake form routed directly to HubSpot CRM.",
  execution:
    "Designed and developed a 7-page custom Next.js 15 website. Built a reusable glassmorphic component library. Implemented 20+ Framer Motion scroll-triggered animations. Integrated HubSpot form API with automated welcome email sequences.",
  results:
    "Lead generation doubled within 60 days of launch. Average session duration increased 2.8× as visitors engaged with interactive service grids and case study carousels.",
  technologies: [
    { label: "Next.js 15" },
    { label: "Framer Motion" },
    { label: "HubSpot CRM Integration" },
    { label: "Glassmorphic Design System" },
    { label: "TypeScript" },
    { label: "Tailwind CSS v4" },
  ],
  testimonial: {
    quote:
      "Our website now converts like a sales tool rather than a brochure. Uptrix delivered a premium product that's already generating consistent inbound leads.",
    author: "Creative Director",
    role: "Big Blare Innovations",
  },
  related: ["jazzo", "vodaiq", "uptrix-site"],
};

const vastra: CaseStudy = {
  slug: "vastra",
  title: "Vastra Store — Headless Shopify Ethnic Fashion",
  client: "Vastra Store",
  category: "Website Development",
  industry: "Fashion / Ethnic Wear",
  location: "India",
  services: ["Headless Shopify", "Next.js Frontend", "Product Recommendation Engine", "Mobile-First Performance"],
  description:
    "Premium ethnic fashion store built on headless Shopify with high-speed catalogs, dynamic banners, and personalised product recommendation engines.",
  heroImage: "/portfolio/websites/vastra.jpg",
  images: [
    { src: "/portfolio/websites/vastra.jpg", alt: "Vastra Store homepage" },
    { src: "/portfolio/websites/jazzo.jpg", alt: "Collection landing page design" },
    { src: "/portfolio/websites/lebodee.jpg", alt: "Product detail page" },
  ],
  stats: [
    { value: "Shopify", label: "Headless Commerce" },
    { value: "0.5s", label: "Load Time" },
    { value: "+45%", label: "Add-to-Cart Rate" },
  ],
  challenge:
    "Vastra's standard Shopify theme was limiting their ability to differentiate in a crowded ethnic wear market. Slow page loads (4.2s), basic search, and no personalisation meant high cart abandonment.",
  strategy:
    "Decoupled the Shopify storefront with a custom Next.js frontend connected via Storefront API. Built a personalisation layer using browsing history and purchase data to surface contextually relevant recommendations.",
  execution:
    "Built a fully custom headless Shopify storefront with a Next.js 14 frontend. Implemented Algolia search with faceted filtering, dynamic collection banners, and an ML-based product recommendation carousel. Image delivery via Shopify CDN with automatic format optimisation.",
  results:
    "Page load time dropped to 0.5s. Add-to-cart rate improved 45% from personalised recommendations. Session duration increased 60% due to the improved browsing experience.",
  technologies: [
    { label: "Headless Shopify" },
    { label: "Shopify Storefront API" },
    { label: "Algolia Search" },
    { label: "Next.js 14" },
    { label: "ML Recommendation Engine" },
    { label: "Shopify CDN" },
  ],
  testimonial: {
    quote:
      "Our conversion rate improved dramatically and customers are spending much more time discovering products. The personalisation engine alone was worth the investment.",
    author: "CEO",
    role: "Vastra Store",
  },
  related: ["jazzo", "lebodee", "ecofitz"],
};

const vodaiq: CaseStudy = {
  slug: "vodaiq",
  title: "Vodaiq — SaaS Landing Page with 60% More Trial Signups",
  client: "Vodaiq",
  category: "Website Development",
  industry: "Data Analytics / SaaS",
  location: "India",
  services: ["SaaS Landing Page", "Dark-Mode UI", "Interactive Pricing", "Trial Signup Funnel"],
  description:
    "Data-analytics SaaS landing page with custom dark-mode dashboards, interactive pricing, SVG chart animations, and automated sales funnels — driving 60% more trial signups.",
  heroImage: "/portfolio/websites/vodaiq.jpg",
  images: [
    { src: "/portfolio/websites/vodaiq.jpg", alt: "Vodaiq SaaS landing page" },
    { src: "/portfolio/websites/bigblare.jpg", alt: "Dashboard UI component preview" },
    { src: "/portfolio/websites/uptrix.jpg", alt: "Pricing section design" },
  ],
  stats: [
    { value: "Tailwind v4", label: "Tech Stack" },
    { value: "98+", label: "Lighthouse Score" },
    { value: "+60%", label: "Trial Signups" },
  ],
  challenge:
    "Vodaiq's existing landing page failed to communicate the product's complexity in an accessible way. Dense feature lists were turning away potential users and the free trial CTA had a 2.1% click-through rate.",
  strategy:
    "Rebuilt the page around demo-first storytelling: animated dashboard components that showed real product value before the user scrolled past the fold. Replaced feature lists with outcome-focused copy sections.",
  execution:
    "Built animated SVG chart components that play on scroll. Created an interactive pricing toggle between monthly/annual plans with live savings calculations. Implemented a 3-step trial signup modal with email validation and CRM auto-enrolment.",
  results:
    "Trial signup rate improved 60% within 30 days of launch. Average time-on-page increased from 42 seconds to 3.1 minutes. Lighthouse score hit 98+.",
  technologies: [
    { label: "Next.js 14" },
    { label: "Tailwind CSS v4" },
    { label: "SVG Animation" },
    { label: "Framer Motion" },
    { label: "CRM Auto-Enrolment" },
    { label: "Interactive Pricing Engine" },
  ],
  testimonial: {
    quote:
      "Our trial-to-paid conversion starts with a great first impression. Uptrix delivered a landing page that genuinely makes people want to try our product.",
    author: "Product Marketing Lead",
    role: "Vodaiq",
  },
  related: ["bigblare", "uptrix-site", "klevrax"],
};

const klevrax: CaseStudy = {
  slug: "klevrax",
  title: "Klevrax — Award-Winning Studio Site with WebGL",
  client: "Klevrax",
  category: "Website Development",
  industry: "Creative Agency",
  location: "United Kingdom",
  services: ["WebGL 3D Graphics", "Scroll-Trigger Animation", "Fluid Grid Navigation", "Performance Engineering"],
  description:
    "Award-winning design studio site with immersive scroll-triggered layouts, custom WebGL graphics, and fluid grid-based navigation — 5× session dwell time improvement.",
  heroImage: "/portfolio/websites/klevrax.jpg",
  images: [
    { src: "/portfolio/websites/klevrax.jpg", alt: "Klevrax studio site homepage" },
    { src: "/portfolio/websites/bigblare.jpg", alt: "Scroll animation showcase" },
    { src: "/portfolio/websites/uptrix.jpg", alt: "3D WebGL scene" },
  ],
  stats: [
    { value: "WebGL", label: "3D Graphics Engine" },
    { value: "100ms", label: "Interaction Speed" },
    { value: "5×", label: "Session Dwell Time" },
  ],
  challenge:
    "Klevrax needed a digital portfolio that positioned them as a world-class creative studio — not just another agency with a template site. Standard web frameworks couldn't deliver the immersive 3D experience they envisioned.",
  strategy:
    "Built an experimental creative site using Three.js WebGL for the hero section with GPU-accelerated particle systems, combined with GSAP ScrollTrigger for section reveal choreography. Performance was engineered from the ground up.",
  execution:
    "Developed a custom WebGL canvas particle system for the hero. Implemented GSAP-driven scroll timelines with 0-lag transforms. Built a CSS Grid-based fluid portfolio gallery with magnetic hover interactions. All animations GPU-offloaded via `will-change`.",
  results:
    "Session dwell time increased 5× compared to the previous site. Interaction speed maintained at sub-100ms throughout. The site was shortlisted for two web awards within 3 months of launch.",
  technologies: [
    { label: "Three.js / WebGL" },
    { label: "GSAP ScrollTrigger" },
    { label: "GPU Animation Optimisation" },
    { label: "CSS Grid Fluid Layout" },
    { label: "Magnetic Hover Interactions" },
    { label: "Next.js" },
  ],
  testimonial: {
    quote:
      "Clients regularly tell us our website is the reason they chose Klevrax over larger agencies. Uptrix built something genuinely world-class.",
    author: "Creative Director",
    role: "Klevrax",
  },
  related: ["bigblare", "vodaiq", "uptrix-site"],
};

const uptrixSite: CaseStudy = {
  slug: "uptrix-site",
  title: "Uptrix Technologies — Enterprise Agency Website",
  client: "Uptrix Technologies",
  category: "Website Development",
  industry: "Digital Marketing Agency",
  location: "Global",
  services: ["Next.js 14", "Edge Rendering", "Framer Motion", "Business Automation"],
  description:
    "Enterprise AI marketing agency site built with Next.js, custom Framer Motion timelines, edge rendering, and automated business intake paths — 4× lead conversion.",
  heroImage: "/portfolio/websites/uptrix.jpg",
  images: [
    { src: "/portfolio/websites/uptrix.jpg", alt: "Uptrix Technologies homepage" },
    { src: "/portfolio/websites/bigblare.jpg", alt: "Services section" },
    { src: "/portfolio/websites/klevrax.jpg", alt: "Portfolio showcase section" },
  ],
  stats: [
    { value: "Enterprise", label: "Scale & Security" },
    { value: "99+", label: "Lighthouse Score" },
    { value: "4×", label: "Lead Conversion" },
  ],
  challenge:
    "Uptrix needed a flagship website that reflected their enterprise-grade AI marketing capabilities — not a generic agency template. The site needed to drive qualified inbound leads while performing at production scale.",
  strategy:
    "Built an entirely custom Next.js 14 site with App Router, server components, and Vercel Edge Network delivery. Designed a premium dark-mode design system with glassmorphism, blue ambient glows, and scroll-driven micro-animations.",
  execution:
    "Developed 12 custom page templates. Built an automated multi-step contact intake system with Supabase persistence and email notification via Resend. Implemented dynamic blog with Sanity CMS, schema markup, and automated sitemap generation.",
  results:
    "Lighthouse performance score of 99+. Lead conversion rate increased 4× compared to the previous site. Average session duration improved 2.4× from interactive service exploration flows.",
  technologies: [
    { label: "Next.js 14 App Router" },
    { label: "Vercel Edge Network" },
    { label: "Framer Motion" },
    { label: "Sanity CMS" },
    { label: "Supabase" },
    { label: "Tailwind CSS v4" },
  ],
  testimonial: {
    quote:
      "This site is our best sales tool. Prospects comment on it in discovery calls before we even pitch — that's the mark of truly great web design.",
    author: "CEO",
    role: "Uptrix Technologies",
  },
  related: ["klevrax", "bigblare", "vodaiq"],
};

const ecofitz: CaseStudy = {
  slug: "ecofitz",
  title: "Ecofitz — 99/100 Lighthouse Eco-Commerce Store",
  client: "Ecofitz",
  category: "Website Development",
  industry: "Sustainable Retail",
  location: "India",
  services: ["Edge-Optimised E-Commerce", "Green Storytelling Design", "Product Search", "SEO Architecture"],
  description:
    "Eco-friendly consumer store with green-first storytelling, robust search, minimal load latency, and a 99/100 Lighthouse performance score driving 70% more organic traffic.",
  heroImage: "/portfolio/websites/ecofitz.jpg",
  images: [
    { src: "/portfolio/websites/ecofitz.jpg", alt: "Ecofitz homepage design" },
    { src: "/portfolio/websites/vastra.jpg", alt: "Product category browsing" },
    { src: "/portfolio/websites/jazzo.jpg", alt: "Mobile-first product grid" },
  ],
  stats: [
    { value: "99/100", label: "Lighthouse Score" },
    { value: "0.3s", label: "Time to Interactive" },
    { value: "+70%", label: "Organic Traffic" },
  ],
  challenge:
    "Ecofitz's brand story — sustainability first — wasn't translating into their digital experience. A heavy WooCommerce site with 6.2s load times and no SEO foundation was contradicting their eco-conscious brand message.",
  strategy:
    "Built a carbon-conscious web experience: minimal JavaScript, edge-cached assets, aggressive image compression, and an SEO architecture that generated 300+ indexable product + category pages from day one.",
  execution:
    "Migrated to Next.js with static generation for all product pages. Implemented Algolia search with real-time typo tolerance. Built a green-palette design system with sustainable storytelling sections and certification display components.",
  results:
    "Time to Interactive reached 0.3s — 95% faster than the previous site. Lighthouse score hit 99/100. Organic traffic grew 70% within 4 months from improved Core Web Vitals and new SEO-rich category pages.",
  technologies: [
    { label: "Next.js Static Generation" },
    { label: "Algolia Search" },
    { label: "Edge CDN Delivery" },
    { label: "Core Web Vitals Engineering" },
    { label: "Green Design System" },
    { label: "Headless CMS" },
  ],
  testimonial: {
    quote:
      "A fast, beautiful website that actually reflects what our brand stands for. Uptrix delivered both performance and purpose in one product.",
    author: "Co-Founder",
    role: "Ecofitz",
  },
  related: ["vastra", "jazzo", "lebodee"],
};

const lebodee: CaseStudy = {
  slug: "lebodee",
  title: "Lebodee — Luxury Apparel with 55% Cart Conversion",
  client: "Lebodee",
  category: "Website Development",
  industry: "Luxury Fashion",
  location: "India",
  services: ["Luxury UX Design", "HD Media Pipeline", "Checkout Optimisation", "Payment Integration"],
  description:
    "Luxury apparel storefront with high-definition media displays, modular catalog cards, and frictionless cart-to-order checkout pipelines driving 55% cart conversion.",
  heroImage: "/portfolio/websites/lebodee.jpg",
  images: [
    { src: "/portfolio/websites/lebodee.jpg", alt: "Lebodee luxury storefront" },
    { src: "/portfolio/websites/jazzo.jpg", alt: "Product showcase layout" },
    { src: "/portfolio/websites/vastra.jpg", alt: "Checkout flow design" },
  ],
  stats: [
    { value: "Frictionless", label: "Checkout UX" },
    { value: "+55%", label: "Cart Conversion" },
    { value: "4.9★", label: "Client Rating" },
  ],
  challenge:
    "Lebodee's luxury positioning required a digital experience that matched the in-store feel. Their existing site felt cheap — low-resolution images, a clunky cart, and a 6-step checkout were causing 72% cart abandonment.",
  strategy:
    "Designed a luxury-tier product experience: full-bleed HD imagery, 360° product previews, and a single-page checkout with Apple Pay and UPI one-click integration. Every interaction was designed to feel premium and effortless.",
  execution:
    "Built a custom Next.js storefront with Cloudinary-powered HD product images (automatic format + quality optimisation). Implemented a 2-step checkout with guest purchase option. Integrated Razorpay with saved payment methods and order tracking.",
  results:
    "Cart-to-order conversion rate improved 55%. Average order value increased 28% from better product presentation. Client gave a 4.9★ rating — the highest on their agency review record.",
  technologies: [
    { label: "Next.js" },
    { label: "Cloudinary HD Pipeline" },
    { label: "Razorpay Integration" },
    { label: "1-Click Checkout" },
    { label: "Apple Pay / UPI" },
    { label: "360° Product Viewer" },
  ],
  testimonial: {
    quote:
      "Our website finally feels as premium as the clothes we sell. Cart conversion went up 55% and customers comment on how easy it is to shop. Perfect execution.",
    author: "Founder",
    role: "Lebodee",
  },
  related: ["jazzo", "vastra", "ecofitz"],
};

const tAdda: CaseStudy = {
  slug: "t-adda",
  title: "T-Adda — Real-Time Print-on-Demand Design Engine",
  client: "T-Adda",
  category: "Website Development",
  industry: "Print-on-Demand / Custom Apparel",
  location: "India",
  services: ["Canvas Design Engine", "Print-on-Demand Integration", "Bulk Order Management", "Fulfilment Automation"],
  description:
    "Custom print-on-demand store with a real-time canvas design engine, automated fulfilment integrations, and bulk ordering management — 500+ products live at launch.",
  heroImage: "/portfolio/websites/t-adda.jpg",
  images: [
    { src: "/portfolio/websites/t-adda.jpg", alt: "T-Adda print-on-demand platform" },
    { src: "/portfolio/websites/jazzo.jpg", alt: "Product customiser interface" },
    { src: "/portfolio/websites/bigblare.jpg", alt: "Bulk order management dashboard" },
  ],
  stats: [
    { value: "Canvas", label: "Design Engine" },
    { value: "Real-time", label: "Product Customiser" },
    { value: "500+", label: "Products Live" },
  ],
  challenge:
    "T-Adda needed a platform where customers could design their own custom t-shirts in real time, place bulk orders with size breakdowns, and have orders automatically routed to the printing partner — with zero manual intervention.",
  strategy:
    "Built a custom product design engine on top of HTML5 Canvas API, supporting text, image upload, and template overlays. Integrated with a print fulfilment API for automatic order routing and status tracking.",
  execution:
    "Developed the Canvas design tool with real-time preview rendering. Built a bulk order calculator supporting 6 size variants with dynamic pricing. Integrated with Printful API for automatic print routing. Deployed 500+ base product templates at launch.",
  results:
    "Platform launched with 500+ products live. Automated fulfilment eliminated all manual order processing. First-month orders exceeded projections by 3×.",
  technologies: [
    { label: "HTML5 Canvas API" },
    { label: "Real-Time Design Preview" },
    { label: "Printful API Integration" },
    { label: "Bulk Order Calculator" },
    { label: "Next.js" },
    { label: "Razorpay Payments" },
  ],
  testimonial: {
    quote:
      "The design tool is so good that customers spend 10+ minutes customising products. Our average order value tripled because they add more items while designing.",
    author: "Founder",
    role: "T-Adda",
  },
  related: ["jazzo", "vastra", "lebodee"],
};

// ─────────────────────────────────────────────────────────────────────────────
// Additional Website Projects
// ─────────────────────────────────────────────────────────────────────────────

const myGlobalSteps: CaseStudy = {
  slug: "my-global-steps",
  title: "My Global Steps — Travel & Immigration Portal",
  client: "My Global Steps",
  category: "Website Development",
  industry: "Travel / Immigration Consulting",
  location: "Canada",
  services: ["Next.js Development", "Multi-Step Form UX", "SEO Architecture", "CRM Integration"],
  description:
    "Full-stack immigration and travel consulting portal with multi-step visa application flows, appointment booking, and document management — reducing inquiry-to-intake time by 60%.",
  heroImage: "/portfolio/websites/uptrix.jpg",
  images: [
    { src: "/portfolio/websites/uptrix.jpg", alt: "My Global Steps portal homepage" },
    { src: "/portfolio/websites/vodaiq.jpg", alt: "Visa application multi-step flow" },
    { src: "/portfolio/websites/bigblare.jpg", alt: "Appointment booking dashboard" },
  ],
  stats: [
    { value: "-60%", label: "Inquiry-to-Intake Time" },
    { value: "99+", label: "Lighthouse Score" },
    { value: "3×", label: "Client Conversions" },
  ],
  challenge:
    "My Global Steps managed complex visa and immigration queries through email and phone — resulting in slow response times, lost leads, and no clear intake funnel. Clients had no self-serve way to start their application or book consultations.",
  strategy:
    "Designed a structured consultation-first portal: multi-step intake forms that pre-qualify clients by visa category, followed by a real-time appointment booking system synced to consultant calendars and automated email confirmations.",
  execution:
    "Built a Next.js portal with 6 visa-category landing pages, each with a tailored 5-step intake form. Integrated Calendly API for appointment scheduling. Built a document upload flow with file validation. Connected form submissions to HubSpot CRM with automated lead-routing rules.",
  results:
    "Inquiry-to-consultation booking time reduced by 60%. Client conversion rate tripled as self-serve intake replaced manual email triage. Lighthouse score hit 99+ on all pages.",
  technologies: [
    { label: "Next.js App Router" },
    { label: "Multi-Step Form Engine" },
    { label: "Calendly API" },
    { label: "HubSpot CRM" },
    { label: "Document Upload Pipeline" },
    { label: "Tailwind CSS v4" },
  ],
  testimonial: {
    quote:
      "Our consultants used to spend half their day on admin emails. Now clients book and pre-qualify themselves — we just show up to the consultation ready to help.",
    author: "Director",
    role: "My Global Steps",
  },
  related: ["bigblare", "vodaiq", "uptrix-site"],
};

const calgaryFlorist: CaseStudy = {
  slug: "calgary-florist",
  title: "Calgary Florist — Local E-Commerce with Same-Day Delivery",
  client: "Calgary Florist",
  category: "Website Development",
  industry: "Retail / Floristry",
  location: "Canada",
  services: ["E-Commerce Development", "Local SEO", "Same-Day Delivery Logic", "Google Shopping"],
  description:
    "High-conversion florist e-commerce store with same-day delivery zone logic, occasion-based product bundling, and local SEO — driving 180% more online orders.",
  heroImage: "/portfolio/websites/ecofitz.jpg",
  images: [
    { src: "/portfolio/websites/ecofitz.jpg", alt: "Calgary Florist storefront" },
    { src: "/portfolio/websites/lebodee.jpg", alt: "Product collection page" },
    { src: "/portfolio/websites/jazzo.jpg", alt: "Checkout and delivery selection" },
  ],
  stats: [
    { value: "+180%", label: "Online Orders" },
    { value: "Top 3", label: "Local Search Rankings" },
    { value: "4.9★", label: "Customer Rating" },
  ],
  challenge:
    "Calgary Florist was losing local orders to competitors with faster, cleaner online stores. Their existing WooCommerce site had no delivery zone logic, no occasion filtering, and a 6-step checkout — resulting in 74% cart abandonment.",
  strategy:
    "Built a conversion-optimised florist store with occasion-first navigation (birthdays, anniversaries, funerals, corporate), real-time delivery zone validation by postal code, and a 2-step checkout optimised for impulse-occasion gifting.",
  execution:
    "Developed a custom Next.js storefront with postal code delivery validation, same-day cut-off time logic, and dynamic upsell prompts (add-on chocolates, vases, greeting cards). Implemented Google Shopping feed and local SEO pages for 8 Calgary neighborhoods.",
  results:
    "Online orders increased 180% within 90 days. The store ranked in the top 3 for 'florist Calgary' and 12 neighborhood delivery queries. Customer satisfaction averaged 4.9★ from the simplified gifting experience.",
  technologies: [
    { label: "Next.js" },
    { label: "Delivery Zone Logic" },
    { label: "Google Shopping Feed" },
    { label: "Local SEO Pages" },
    { label: "2-Step Checkout" },
    { label: "Stripe Payments" },
  ],
  testimonial: {
    quote:
      "We went from taking orders by phone to having a store that sells on autopilot. The delivery zone feature alone saved us dozens of failed delivery attempts per week.",
    author: "Owner",
    role: "Calgary Florist",
  },
  related: ["jazzo", "lebodee", "ecofitz"],
};

const aagmanIndia: CaseStudy = {
  slug: "aagman-india",
  title: "Aagman India — Hospitality Booking Platform",
  client: "Aagman India",
  category: "Website Development",
  industry: "Hospitality / Tourism",
  location: "India",
  services: ["Booking Engine", "Multi-Property Listings", "Payment Gateway", "Mobile-First UX"],
  description:
    "Premium hospitality booking platform for heritage hotels and boutique stays across India — featuring real-time availability, multi-property listings, and a zero-friction checkout with 55% more direct bookings.",
  heroImage: "/portfolio/websites/vastra.jpg",
  images: [
    { src: "/portfolio/websites/vastra.jpg", alt: "Aagman India homepage" },
    { src: "/portfolio/websites/uptrix.jpg", alt: "Property listing page" },
    { src: "/portfolio/websites/vodaiq.jpg", alt: "Booking and checkout flow" },
  ],
  stats: [
    { value: "+55%", label: "Direct Bookings" },
    { value: "0.6s", label: "Page Load Speed" },
    { value: "30+", label: "Properties Listed" },
  ],
  challenge:
    "Aagman India's portfolio of boutique heritage hotels relied entirely on OTA platforms (MakeMyTrip, Booking.com) for reservations — paying 18–22% commission on every booking. They had no direct booking channel and no brand website worth visiting.",
  strategy:
    "Built a commission-free direct booking engine with a premium editorial design that matched the heritage aesthetic of their properties. Launched with 30+ property listings, each with an independent availability calendar, gallery, and room-category system.",
  execution:
    "Developed a full booking engine from scratch: real-time calendar availability, room inventory management, Razorpay payment gateway with UPI and card support, automated booking confirmation emails, and a host admin dashboard for managing rates and availability.",
  results:
    "Direct bookings grew 55% in the first season post-launch. OTA dependency reduced significantly. Page load speed hit 0.6s across all 30+ property pages. Average booking value increased 22% without OTA commission deduction.",
  technologies: [
    { label: "Next.js" },
    { label: "Custom Booking Engine" },
    { label: "Razorpay Payments" },
    { label: "Real-Time Availability Calendar" },
    { label: "Host Admin Dashboard" },
    { label: "Automated Email Confirmations" },
  ],
  testimonial: {
    quote:
      "We used to lose 20% of every booking to OTAs. Our own platform now drives more than half our reservations — direct, with no commission. The ROI is extraordinary.",
    author: "Founder",
    role: "Aagman India",
  },
  related: ["vastra", "lebodee", "jazzo"],
};

const affluxDentistry: CaseStudy = {
  slug: "afflux-dentistry",
  title: "Afflux Dentistry — Patient Acquisition System",
  client: "Afflux Dentistry",
  category: "Website Development",
  industry: "Healthcare / Dentistry",
  location: "Canada",
  services: ["Healthcare Website", "Online Booking Integration", "Local SEO", "Google Ads"],
  description:
    "Complete patient acquisition platform for a multi-location dental practice — combining a HIPAA-friendly booking system, local SEO, and Google Ads to deliver 210% more new patient inquiries.",
  heroImage: "/portfolio/websites/bigblare.jpg",
  images: [
    { src: "/portfolio/websites/bigblare.jpg", alt: "Afflux Dentistry homepage" },
    { src: "/portfolio/websites/uptrix.jpg", alt: "Treatment service pages" },
    { src: "/portfolio/websites/vodaiq.jpg", alt: "Online appointment booking" },
  ],
  stats: [
    { value: "+210%", label: "New Patient Inquiries" },
    { value: "Top 3", label: "Local Search Rankings" },
    { value: "4.8★", label: "Google Review Score" },
  ],
  challenge:
    "Afflux Dentistry had two locations but minimal online presence. Their existing site had no online booking, thin service pages, and no local SEO strategy — while competitors dominated the first page for high-value dental search queries in their area.",
  strategy:
    "Built a trust-first dental website with authoritative treatment pages (implants, Invisalign, teeth whitening, emergency dentistry), integrated online booking, and a complete local SEO strategy targeting both locations independently.",
  execution:
    "Designed and built a 12-page dental website with animated procedure explainer sections and before/after galleries. Integrated Calendly for appointment booking with service-type selection. Launched Google Ads for emergency dental and implant queries. Optimised Google Business Profiles for both locations.",
  results:
    "New patient inquiry volume increased 210% within 4 months. Both locations reached top-3 rankings for 20+ dental service queries. Google review score maintained at 4.8★ through post-visit review request automation.",
  technologies: [
    { label: "Next.js" },
    { label: "Calendly Booking Integration" },
    { label: "Google Business Profile Optimisation" },
    { label: "Local SEO" },
    { label: "Google Ads" },
    { label: "Review Automation" },
  ],
  testimonial: {
    quote:
      "Our phones ring constantly now. The combination of a professional website, online booking, and Google Ads Uptrix set up for us has been transformational for our practice.",
    author: "Principal Dentist",
    role: "Afflux Dentistry",
  },
  related: ["avant-pharmacy", "knovatek", "bigblare"],
};

// ─────────────────────────────────────────────────────────────────────────────
// Master export
// ─────────────────────────────────────────────────────────────────────────────

export const ALL_CASE_STUDIES: CaseStudy[] = [
  // SEO
  toplimo,
  msgCanada,
  affinoz,
  avantPharmacy,
  dotnetTricks,
  // Google Ads
  hearingCentre,
  knovatek,
  toeZoneUk,
  ikareHome,
  sersAustralia,
  // Meta Ads
  metaBeauty,
  metaRealEstateCanada,
  metaEducation,
  metaLeadGenIntl,
  // Social Media
  apexFitness,
  // Websites
  jazzo,
  bigblare,
  vastra,
  vodaiq,
  klevrax,
  uptrixSite,
  ecofitz,
  lebodee,
  tAdda,
  myGlobalSteps,
  calgaryFlorist,
  aagmanIndia,
  affluxDentistry,
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return ALL_CASE_STUDIES.find((cs) => cs.slug === slug);
}

export function getRelatedCaseStudies(slugs: string[]): CaseStudy[] {
  return slugs
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((cs): cs is CaseStudy => cs !== undefined)
    .slice(0, 3);
}
