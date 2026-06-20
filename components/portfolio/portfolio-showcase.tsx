"use client";

import { useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

// ── PROJECT DATA ──────────────────────────────────────────────────────────────

interface Stat {
  value: string;
  label: string;
}

interface Project {
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

const PROJECTS: Project[] = [
  // ── AI SEO Projects ──────────────────────────────────────────────
  {
    id: "toplimo",
    badge: "SEO Portfolio",
    client: "Toplimo",
    description:
      "AI-driven SEO strategy that transformed Toplimo's local search presence, boosting content quality, UX, and organic rankings across competitive local queries.",
    image: "/portfolio/ai-seo/5.png",
    imageStyle: "contain",
    stats: [
      { value: "+200%", label: "Organic Traffic" },
      { value: "Top 3", label: "Local Rankings" },
      { value: "4x", label: "ROI Increase" },
    ],
    achievements: [
      "Improved content quality using AI-driven analysis.",
      "Increased local SEO visibility across target markets.",
      "Enhanced UX and on-site engagement metrics.",
      "Achieved top rankings and measurable higher ROI.",
    ],
    ctaHref: "/case-studies/toplimo",
  },
  {
    id: "msg-canada",
    badge: "SEO Portfolio",
    client: "MSG Canada Insurance",
    description:
      "Full-stack SEO and content overhaul that secured top 3 Google positions for high-competition insurance keywords — delivered in just 6 months.",
    image: "/portfolio/ai-seo/6.png",
    imageStyle: "contain",
    stats: [
      { value: "Top 3", label: "Google Rankings" },
      { value: "6 Months", label: "Delivery Timeline" },
      { value: "+150%", label: "Organic Traffic" },
    ],
    achievements: [
      "AI-powered UI/UX improvements for better engagement.",
      "Content optimization across all service pages.",
      "Complete meta tag overhaul for insurance search queries.",
      "Secured top 3 rankings within 6 months of launch.",
    ],
    ctaHref: "/case-studies/msg-canada",
  },
  {
    id: "affinoz",
    badge: "SEO Portfolio",
    client: "Affinoz",
    description:
      "Complete SEO transformation scaling from 1K to 100K monthly organic users through technical excellence, content strategy, and sustained inbound growth.",
    image: "/portfolio/ai-seo/7.png",
    imageStyle: "contain",
    stats: [
      { value: "100K", label: "Monthly Users" },
      { value: "100x", label: "Traffic Growth" },
      { value: "+65%", label: "Conversion Rate" },
    ],
    achievements: [
      "Grew organic traffic from 1K to 100K monthly users.",
      "Improved conversion rates through landing page optimization.",
      "Managed end-to-end SEO campaigns and keyword strategies.",
      "Increased revenue significantly through inbound marketing.",
    ],
    ctaHref: "/case-studies/affinoz",
  },
  {
    id: "avant-pharmacy",
    badge: "SEO Portfolio",
    client: "Avant Pharmacy",
    description:
      "Custom pharmacy SEO strategy tailored for competitive health keywords, delivering measurable improvements in search visibility and patient engagement.",
    image: "/portfolio/ai-seo/8.png",
    imageStyle: "contain",
    stats: [
      { value: "+300%", label: "SEO Score" },
      { value: "Top 5", label: "Search Rankings" },
      { value: "2x", label: "Conversions" },
    ],
    achievements: [
      "Improved overall SEO score to industry-leading levels.",
      "Enhanced user experience and site navigation flow.",
      "Built a customized SEO strategy for the pharmacy vertical.",
      "Achieved top rankings for local health and pharmacy queries.",
    ],
    ctaHref: "/case-studies/avant-pharmacy",
  },
  {
    id: "dotnet-tricks",
    badge: "SEO Portfolio",
    client: "DotNetTricks",
    description:
      "Technical and content SEO execution that doubled organic traffic to 11K monthly visitors and generated 200+ qualified leads every single month.",
    image: "/portfolio/ai-seo/9.png",
    imageStyle: "contain",
    stats: [
      { value: "11K", label: "Monthly Traffic" },
      { value: "200+", label: "Monthly Leads" },
      { value: "+120%", label: "Backlink Growth" },
    ],
    achievements: [
      "Traffic growth from 5K to 11K monthly organic visitors.",
      "Acquired 200+ high-quality organic leads per month.",
      "Improved backlink profile and overall domain authority.",
      "Increased organic visibility for competitive .NET keywords.",
    ],
    ctaHref: "/case-studies/dotnet-tricks",
  },

  // ── Google Ads ───────────────────────────────────────────────────
  {
    id: "hearing-centre",
    badge: "GOOGLE ADS",
    client: "Hearing Centre",
    description: "Designed and launched targeted local search campaigns to capture high-intent audiology service queries.",
    image: "/portfolio/google-ads/4.jpg",
    imageStyle: "contain",
    stats: [
      { value: "+142%", label: "Lead Volume" },
      { value: "-28%", label: "Cost Per Lead" },
      { value: "4.2x", label: "Campaign ROAS" },
    ],
    ctaHref: "/case-studies/hearing-centre",
  },
  {
    id: "hearing-centre-insights",
    badge: "GOOGLE ADS",
    client: "Hearing Centre Campaign Insights",
    description: "Analyzed audience search patterns and negative keywords to eliminate wasted ad spend.",
    image: "/portfolio/google-ads/5.jpg",
    imageStyle: "contain",
    stats: [
      { value: "-35%", label: "Waste Cut" },
      { value: "98%", label: "Match Accuracy" },
      { value: "2.1x", label: "CTR Increase" },
    ],
    ctaHref: "/case-studies/hearing-centre",
  },
  {
    id: "knovatek",
    badge: "GOOGLE ADS",
    client: "Knovatek Inc.",
    description: "Engineered scalable Performance Max and B2B search ads to drive global demo bookings.",
    image: "/portfolio/google-ads/6.jpg",
    imageStyle: "contain",
    stats: [
      { value: "3.8x", label: "Demo Signups" },
      { value: "$2.4M", label: "Pipeline Value" },
      { value: "+88%", label: "SQL Conversion" },
    ],
    ctaHref: "/case-studies/knovatek",
  },
  {
    id: "knovatek-breakdown",
    badge: "GOOGLE ADS",
    client: "Knovatek Performance Breakdown",
    description: "Deployed localized landing pages and automated bid strategies to optimize acquisition costs.",
    image: "/portfolio/google-ads/7.jpg",
    imageStyle: "contain",
    stats: [
      { value: "-44%", label: "CPA Reduction" },
      { value: "100%", label: "Data Accuracy" },
      { value: "+165%", label: "Search Reach" },
    ],
    ctaHref: "/case-studies/knovatek",
  },
  {
    id: "toezone-uk",
    badge: "GOOGLE ADS",
    client: "ToeZone UK",
    description: "Scaled shopping campaigns and search ads for UK footwear brand, driving dynamic product listing conversions.",
    image: "/portfolio/google-ads/8.jpg",
    imageStyle: "contain",
    stats: [
      { value: "6.4x", label: "Shopping ROAS" },
      { value: "+210%", label: "Online Sales" },
      { value: "5.1M", label: "Impressions" },
    ],
    ctaHref: "/case-studies/toezone-uk",
  },
  {
    id: "toezone-results",
    badge: "GOOGLE ADS",
    client: "ToeZone Campaign Results",
    description: "Optimized retargeting and smart bidding to maximize average order value and repeat sales.",
    image: "/portfolio/google-ads/9.jpg",
    imageStyle: "contain",
    stats: [
      { value: "+48%", label: "Order Value" },
      { value: "8.2x", label: "Retargeting ROI" },
      { value: "+320%", label: "Click Volume" },
    ],
    ctaHref: "/case-studies/toezone-uk",
  },
  {
    id: "ikare-home",
    badge: "GOOGLE ADS",
    client: "iKare Home",
    description: "Rebuilt local lead generation funnel for home care services, achieving highly-qualified client bookings.",
    image: "/portfolio/google-ads/10.jpg",
    imageStyle: "contain",
    stats: [
      { value: "+180%", label: "Inquiries" },
      { value: "3.6x", label: "Booking Rates" },
      { value: "-22%", label: "Cost Per Call" },
    ],
    ctaHref: "/case-studies/ikare-home",
  },
  {
    id: "ikare-home-optimization",
    badge: "GOOGLE ADS",
    client: "iKare Home Optimization",
    description: "Implemented call tracking and conversion mapping to focus ad spend on high-value eldercare service inquiries.",
    image: "/portfolio/google-ads/11.jpg",
    imageStyle: "contain",
    stats: [
      { value: "99%", label: "Lead Attribution" },
      { value: "5.2x", label: "Spend Efficiency" },
      { value: "+115%", label: "Direct Calls" },
    ],
    ctaHref: "/case-studies/ikare-home",
  },
  {
    id: "sers-australia",
    badge: "GOOGLE ADS",
    client: "SERS Australia",
    description: "Structured complex commercial search campaigns to capture high-value enterprise engineering contract opportunities.",
    image: "/portfolio/google-ads/12.jpg",
    imageStyle: "contain",
    stats: [
      { value: "+94%", label: "Enterprise Leads" },
      { value: "5.8x", label: "ROAS Realized" },
      { value: "$4.1M", label: "Contract Pipe" },
    ],
    ctaHref: "/case-studies/sers-australia",
  },
  {
    id: "sers-campaign",
    badge: "GOOGLE ADS",
    client: "SERS Campaign Results",
    description: "Optimized geographic bidding parameters and ad schedules to capture peak demand in commercial sectors.",
    image: "/portfolio/google-ads/13.jpg",
    imageStyle: "contain",
    stats: [
      { value: "+125%", label: "Geo CTR" },
      { value: "-30%", label: "CPC Reduction" },
      { value: "95%", label: "Top-of-Page Rate" },
    ],
    ctaHref: "/case-studies/sers-australia",
  },

  // ── Meta Ads ─────────────────────────────────────────────────────
  {
    id: "meta-beauty",
    badge: "META ADS",
    client: "D2C Beauty & Personal Care Brand",
    description: "Scaled dynamic catalog ads and video hooks to drive mass brand visibility and traffic.",
    image: "/portfolio/meta-ads/3.jpg",
    imageStyle: "contain",
    stats: [
      { value: "44M+", label: "Impressions" },
      { value: "22M+", label: "Engagements" },
      { value: "2.5M+", label: "LPVs" },
    ],
    ctaHref: "/case-studies/meta-beauty",
  },
  {
    id: "meta-real-estate",
    badge: "META ADS",
    client: "Canadian Real Estate Lead Generation",
    description: "Designed hyper-local Meta lead form campaigns targeting prospective homebuyers and property investors.",
    image: "/portfolio/meta-ads/3-dashboard.jpg",
    imageStyle: "contain",
    stats: [
      { value: "588", label: "Leads" },
      { value: "$17", label: "CPL" },
      { value: "$10K", label: "Spend" },
    ],
    ctaHref: "/case-studies/meta-real-estate-canada",
  },
  {
    id: "meta-education",
    badge: "META ADS",
    client: "Education Lead Generation",
    description: "Launched targeted demographic campaigns and video ads promoting professional education program registrations.",
    image: "/portfolio/meta-ads/4-dashboard.jpg",
    imageStyle: "contain",
    stats: [
      { value: "448", label: "Registrations" },
      { value: "$2.27", label: "CPA" },
      { value: "$1,015", label: "Spend" },
    ],
    ctaHref: "/case-studies/meta-education",
  },
  {
    id: "meta-social-growth",
    badge: "META ADS",
    client: "Social Media Growth Campaign",
    description: "Implemented scroll-stopping vertical video creatives to boost brand reach and build community interaction.",
    image: "/portfolio/meta-ads/4-dashboard1.jpg",
    imageStyle: "contain",
    stats: [
      { value: "27K", label: "Reach" },
      { value: "41K", label: "Impressions" },
      { value: "Low-cost", label: "Engagement" },
    ],
    ctaHref: "/case-studies/meta-education",
  },
  {
    id: "meta-smo",
    badge: "META ADS",
    client: "SMO Campaign",
    description: "Deployed specialized link-click optimization to send targeted traffic to priority business service pages.",
    image: "/portfolio/meta-ads/4-dashboard2.jpg",
    imageStyle: "contain",
    stats: [
      { value: "19", label: "Link Clicks" },
      { value: "$7.58", label: "CPC" },
      { value: "$144", label: "Spend" },
    ],
    ctaHref: "/case-studies/meta-real-estate-canada",
  },
  {
    id: "meta-real-estate-traffic",
    badge: "META ADS",
    client: "Real Estate Traffic Campaign",
    description: "Drove high-intent buyers to real estate listings through optimized catalog and single-image ads.",
    image: "/portfolio/meta-ads/4-dashboard3.jpg",
    imageStyle: "contain",
    stats: [
      { value: "290", label: "Link Clicks" },
      { value: "$0.28", label: "CPC" },
      { value: "$80", label: "Spend" },
    ],
    ctaHref: "/case-studies/meta-real-estate-canada",
  },
  {
    id: "meta-lead-gen-intl",
    badge: "META ADS",
    client: "International Lead Generation",
    description: "Scaled multi-country lead capture campaigns with lookalike targeting and custom automated lead routing.",
    image: "/portfolio/meta-ads/4-dashboard4.jpg",
    imageStyle: "contain",
    stats: [
      { value: "612K", label: "Reach" },
      { value: "998K", label: "Impressions" },
      { value: "$2,612", label: "Spend" },
    ],
    ctaHref: "/case-studies/meta-lead-gen-intl",
  },
  {
    id: "meta-canadian-real-estate",
    badge: "META ADS",
    client: "Canadian Real Estate Campaign",
    description: "Ran targeted acquisition campaigns to capture high-value property buyers in Canadian urban centers.",
    image: "/portfolio/meta-ads/5.jpg",
    imageStyle: "contain",
    stats: [
      { value: "588", label: "Leads" },
      { value: "$17", label: "CPL" },
      { value: "$10K", label: "Budget" },
    ],
    ctaHref: "/case-studies/meta-real-estate-canada",
  },

  // ── Social Media ─────────────────────────────────────────────────
  {
    id: "apex-fitness",
    badge: "Social Media Portfolio",
    client: "Apex Fitness Platforms",
    description:
      "Viral creator loop strategy that generated 1.9M organic views, built a thriving community of 747K, and drove app installs without additional paid spend.",
    image: "/portfolio/social/4-dashboard.jpg",
    imageStyle: "contain",
    stats: [
      { value: "1.9M", label: "Organic Views" },
      { value: "747K", label: "Community Reach" },
      { value: "206K", label: "Total Engagements" },
    ],
    achievements: [
      "Launched performance-oriented creator and influencer network.",
      "Produced daily platform-optimized vertical video content.",
      "Deployed automated comment-to-DM lead capture flows.",
      "Ran targeted micro-influencer seed campaigns for app growth.",
    ],
    ctaHref: "/case-studies/apex-fitness",
  },

  // ── Website Projects ─────────────────────────────────────────────
  {
    id: "jazzo",
    badge: "Website Portfolio",
    client: "Jazzo Store",
    description:
      "High-end designer streetwear store with custom product matrices, dynamic category filtering, CDN image pipelines, and mobile-first layouts.",
    image: "/portfolio/websites/jazzo.jpg",
    imageStyle: "cover",
    stats: [
      { value: "0.4s", label: "Page Load Speed" },
      { value: "99+", label: "Lighthouse Score" },
      { value: "3x", label: "Conversion Lift" },
    ],
    achievements: [
      "Custom product display matrices and advanced filtering.",
      "Fast CDN image pipelines for sub-second load times.",
      "Responsive mobile-first layout system.",
      "Automated inventory and cart management integration.",
    ],
    ctaHref: "/case-studies/jazzo",
  },
  {
    id: "bigblare",
    badge: "Website Portfolio",
    client: "Big Blare Innovations",
    description:
      "Sleek agency hub with dynamic page-reveal transitions, glassmorphic UI components, interactive service grids, and optimized client intake workflows.",
    image: "/portfolio/websites/bigblare.jpg",
    imageStyle: "cover",
    stats: [
      { value: "Next.js 15", label: "Modern Stack" },
      { value: "99+", label: "Performance Score" },
      { value: "2x", label: "Lead Generation" },
    ],
    achievements: [
      "Dynamic page-reveal and scroll-trigger animations.",
      "Custom glassmorphic interface components.",
      "Interactive service grids and case study flows.",
      "Optimized client intake and CRM automation.",
    ],
    ctaHref: "/case-studies/bigblare",
  },
  {
    id: "vastra",
    badge: "Website Portfolio",
    client: "Vastra Store",
    description:
      "Premium ethnic fashion store built on headless Shopify with high-speed catalogs, dynamic banners, and personalized product recommendation engines.",
    image: "/portfolio/websites/vastra.jpg",
    imageStyle: "cover",
    stats: [
      { value: "Shopify", label: "Headless Commerce" },
      { value: "0.5s", label: "Load Time" },
      { value: "+45%", label: "Add-to-Cart Rate" },
    ],
    achievements: [
      "Headless Shopify architecture for maximum performance.",
      "Dynamic banner carousels and collection landing pages.",
      "Customizable size grids and product recommendations.",
      "Mobile-first performance with sub-half-second loads.",
    ],
    ctaHref: "/case-studies/vastra",
  },
  {
    id: "vodaiq",
    badge: "Website Portfolio",
    client: "Vodaiq",
    description:
      "Data-analytics SaaS landing page with custom dark-mode dashboards, interactive pricing, SVG chart animations, and automated sales funnels.",
    image: "/portfolio/websites/vodaiq.jpg",
    imageStyle: "cover",
    stats: [
      { value: "Tailwind v4", label: "Tech Stack" },
      { value: "98+", label: "Lighthouse Score" },
      { value: "+60%", label: "Trial Signups" },
    ],
    achievements: [
      "Custom dark-mode dashboard UI component library.",
      "Interactive pricing matrices with toggle animations.",
      "SVG chart animations for compelling data storytelling.",
      "Automated lead capture with CRM routing flows.",
    ],
    ctaHref: "/case-studies/vodaiq",
  },
  {
    id: "klevrax",
    badge: "Website Portfolio",
    client: "Klevrax",
    description:
      "Award-winning design studio site with immersive scroll-triggered layouts, custom WebGL graphics, and fluid grid-based navigation.",
    image: "/portfolio/websites/klevrax.jpg",
    imageStyle: "cover",
    stats: [
      { value: "WebGL", label: "3D Graphics" },
      { value: "100ms", label: "Interaction Speed" },
      { value: "5x", label: "Session Dwell Time" },
    ],
    achievements: [
      "Immersive scroll-triggered layout animation system.",
      "Custom WebGL graphics with unique hover highlights.",
      "Fluid grid-based navigation for seamless browsing.",
      "Award-quality interaction design and motion.",
    ],
    ctaHref: "/case-studies/klevrax",
  },
  {
    id: "uptrix-site",
    badge: "Website Portfolio",
    client: "Uptrix Technologies",
    description:
      "Enterprise AI marketing agency site built with Next.js, custom Framer Motion timelines, edge rendering, and automated business intake paths.",
    image: "/portfolio/websites/uptrix.jpg",
    imageStyle: "cover",
    stats: [
      { value: "Enterprise", label: "Scale & Security" },
      { value: "99+", label: "Lighthouse Score" },
      { value: "4x", label: "Lead Conversion" },
    ],
    achievements: [
      "Next.js enterprise architecture with edge rendering.",
      "Custom Framer Motion timeline and scroll animations.",
      "Automated business intake and CRM routing.",
      "Multi-service digital presence built for scale.",
    ],
    ctaHref: "/case-studies/uptrix-site",
  },
  {
    id: "ecofitz",
    badge: "Website Portfolio",
    client: "Ecofitz",
    description:
      "Eco-friendly consumer store with green-first storytelling, robust search, minimal load latency, and 99/100 Lighthouse performance score.",
    image: "/portfolio/websites/ecofitz.jpg",
    imageStyle: "cover",
    stats: [
      { value: "99/100", label: "Lighthouse Speed" },
      { value: "0.3s", label: "Time to Interactive" },
      { value: "+70%", label: "Organic Traffic" },
    ],
    achievements: [
      "Sustainable storytelling and green-HSL design system.",
      "Robust product search and category filter capabilities.",
      "Edge-optimized assets for sub-0.3s interaction times.",
      "SEO-first architecture driving 70% more organic traffic.",
    ],
    ctaHref: "/case-studies/ecofitz",
  },
  {
    id: "lebodee",
    badge: "Website Portfolio",
    client: "Lebodee",
    description:
      "Luxury apparel storefront with high-definition media displays, modular catalog cards, and frictionless cart-to-order checkout pipelines.",
    image: "/portfolio/websites/lebodee.jpg",
    imageStyle: "cover",
    stats: [
      { value: "Frictionless", label: "Checkout UX" },
      { value: "+55%", label: "Cart Conversion" },
      { value: "4.9★", label: "Client Rating" },
    ],
    achievements: [
      "High-definition product media display system.",
      "Modular catalog card grid for seamless browsing.",
      "Optimized cart-to-checkout conversion pipeline.",
      "One-click purchase flow and payment integration.",
    ],
    ctaHref: "/case-studies/lebodee",
  },
  {
    id: "t-adda",
    badge: "Website Portfolio",
    client: "T-Adda",
    description:
      "Custom print-on-demand store with a real-time canvas design engine, automated fulfillment integrations, and bulk ordering management.",
    image: "/portfolio/websites/t-adda.jpg",
    imageStyle: "cover",
    stats: [
      { value: "Canvas", label: "Design Engine" },
      { value: "Real-time", label: "Customizer" },
      { value: "500+", label: "Products Live" },
    ],
    achievements: [
      "Real-time product design customizer built on Canvas API.",
      "Automated backend fulfillment and logistics integrations.",
      "Bulk ordering calculator and management dashboard.",
      "Print-on-demand pipeline with zero-touch automation.",
    ],
    ctaHref: "/case-studies/t-adda",
  },
];


// ── BADGE ─────────────────────────────────────────────────────────────────────

const BADGE_STYLES: Record<string, string> = {
  "SEO Portfolio": "border-emerald-400/25 bg-emerald-500/10 text-emerald-200/90",
  "GOOGLE ADS": "border-sky-400/25 bg-sky-500/10 text-sky-200/90",
  "META ADS": "border-indigo-400/25 bg-indigo-500/10 text-indigo-200/90",
  "Social Media Portfolio": "border-violet-400/25 bg-violet-500/10 text-violet-200/90",
  "Website Portfolio": "border-blue-400/25 bg-blue-500/10 text-blue-200/90",
};

function Badge({ label }: { label: string }) {
  const style = BADGE_STYLES[label] ?? "border-[#79ABFF]/25 bg-[#0C2C57]/50 text-[#9CC0FF]";
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase backdrop-blur-md ${style}`}
    >
      {label}
    </span>
  );
}

function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-[#4D8EFF]/20 bg-[#0066FF]/10 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-[#9CC0FF] uppercase backdrop-blur-md">
      {label}
    </span>
  );
}

// ── REDESIGNED SPLIT BLOCK (WITH SPOTLIGHT & ZOOM EFFECT) ────────────────────

function SplitBlock({
  project,
  imageLeft,
}: {
  project: Project;
  imageLeft: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const rotateX = useSpring(rawRX, { stiffness: 260, damping: 24 });
  const rotateY = useSpring(rawRY, { stiffness: 260, damping: 24 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawRX.set(((e.clientY - rect.top) / rect.height - 0.5) * -8);
    rawRY.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
  };
  const onMouseLeave = () => { rawRX.set(0); rawRY.set(0); };

  const imageCol = (
    <div className="group/image relative will-change-transform">
      <div className="absolute -inset-3 rounded-[1.75rem] bg-[#0066FF]/8 opacity-0 blur-2xl transition-opacity duration-500 group-hover/image:opacity-100 pointer-events-none" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-[border-color,box-shadow] duration-500 ease-out group-hover/image:border-[#4D8EFF]/30 group-hover/image:shadow-[0_28px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(77,142,255,0.18),0_0_40px_rgba(0,102,255,0.08)]">
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.client}
            fill
            className={`will-change-transform transition-transform duration-[700ms] ease-out group-hover/image:scale-[1.03] ${
              project.imageStyle === "cover" ? "object-cover" : "object-contain p-5 md:p-7"
            }`}
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/image:opacity-100" />
          <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/[0.05]" />
        </div>
      </div>
    </div>
  );

  const contentCol = (
    <div className="flex flex-col gap-7 lg:gap-8 py-1 lg:py-6 lg:px-2">
      <Badge label={project.badge} />

      <div className="space-y-4">
        <h3 className="font-heading text-3xl md:text-4xl lg:text-[2.5rem] font-bold leading-[1.12] tracking-[-0.02em] text-white">
          {project.client}
        </h3>

        <p className="max-w-md text-[0.9375rem] leading-[1.75] text-white/55 line-clamp-3">
          {project.description}
        </p>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-[#4D8EFF]/15 via-white/[0.06] to-transparent" />

      <div className="grid grid-cols-3 gap-5 sm:gap-6">
        {project.stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-2">
            <span className="font-heading text-2xl sm:text-[1.75rem] md:text-3xl font-bold leading-none text-white tracking-tight tabular-nums">
              {s.value}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.12em] text-white/38 leading-snug">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-1">
        <Link
          href={project.ctaHref}
          onClick={() => window.scrollTo(0, 0)}
          className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#5A9FFF] transition-colors duration-300 hover:text-[#9CC0FF]"
        >
          View Case Study
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );

  return (
    <motion.article
      layout
      style={prefersReduced ? {} : { rotateX, rotateY, transformPerspective: 1100 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -3, scale: 1.008 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="group/card relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.025] p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#4D8EFF]/25 hover:shadow-[0_20px_56px_rgba(0,0,0,0.28),0_0_60px_rgba(0,102,255,0.08)] will-change-transform"
    >
      {/* Radial glow sweep */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-60 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background: imageLeft
            ? "radial-gradient(ellipse 80% 60% at 15% 50%, rgba(0,102,255,0.06), transparent 70%)"
            : "radial-gradient(ellipse 80% 60% at 85% 50%, rgba(0,102,255,0.06), transparent 70%)",
        }}
      />

      {/* Animated gradient border (shows on hover) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{
          padding: "1px",
          background: "linear-gradient(120deg, rgba(0,102,255,0.5) 0%, rgba(255,255,255,0.08) 50%, rgba(77,142,255,0.4) 100%)",
          backgroundSize: "200% 200%",
          animation: "border-flow 3s ease infinite",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
        <div className={`lg:col-span-7 ${imageLeft ? "order-1" : "order-1 lg:order-2"}`}>
          {imageCol}
        </div>
        <div className={`lg:col-span-5 ${imageLeft ? "order-2" : "order-2 lg:order-1"}`}>
          {contentCol}
        </div>
      </div>
    </motion.article>
  );
}

// ── CATEGORY CONFIG ───────────────────────────────────────────────────────────

type CategoryId = "featured" | "seo" | "google-ads" | "meta-ads" | "social-media" | "websites";

const CATEGORY_TABS: { id: CategoryId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "seo", label: "SEO" },
  { id: "google-ads", label: "Google Ads" },
  { id: "meta-ads", label: "Meta Ads" },
  { id: "social-media", label: "Social Media" },
  { id: "websites", label: "Websites" },
];

const CATEGORY_META: Record<
  Exclude<CategoryId, "featured">,
  { badge: string; title: string; description: string; badgeFilter: string }
> = {
  seo: {
    badge: "SEO",
    title: "Search Engine Optimization",
    description: "Compound B2B organic pipeline, indexation architectures, and search rankings.",
    badgeFilter: "SEO Portfolio",
  },
  "google-ads": {
    badge: "Google Ads",
    title: "Google Ads Campaigns",
    description: "Precision paid search media, Performance Max optimization, and bidding automation systems.",
    badgeFilter: "GOOGLE ADS",
  },
  "meta-ads": {
    badge: "Meta Ads",
    title: "Meta Advertising",
    description: "High-scale social media media buying, lookalike scaling, and testing protocols.",
    badgeFilter: "META ADS",
  },
  "social-media": {
    badge: "Social Media Marketing",
    title: "Social Media Marketing",
    description: "UGC loops, community reach scale systems, and platforms growth engines.",
    badgeFilter: "Social Media Portfolio",
  },
  websites: {
    badge: "Website Development",
    title: "Website Development",
    description: "Next.js high-performance engineering, responsive mobile-first catalogs, and custom storefront interfaces.",
    badgeFilter: "Website Portfolio",
  },
};

function CategoryTabs({
  active,
  onChange,
}: {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
}) {
  return (
    <div className="mb-8 md:mb-10">
      <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0 md:flex md:justify-center">
        <LayoutGroup id="portfolio-tabs">
          <div className="inline-flex min-w-max gap-1.5 rounded-full border border-white/[0.07] bg-[#020617]/85 p-1.5 shadow-[0_6px_24px_rgba(0,0,0,0.3)] backdrop-blur-xl md:gap-2">
            {CATEGORY_TABS.map((tab) => {
              const isActive = active === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  type="button"
                  onClick={() => onChange(tab.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  className={`relative shrink-0 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 md:px-6 md:py-2.5 will-change-transform ${
                    isActive ? "text-white" : "text-white/50 hover:text-white/85"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="portfolio-active-tab"
                      className="absolute inset-0 rounded-full border border-[#4D8EFF]/25 bg-gradient-to-r from-[#0066FF] to-[#1552B6] shadow-[0_0_18px_rgba(0,102,255,0.32),0_3px_12px_rgba(0,102,255,0.18)]"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}

function CategoryHeader({ categoryId }: { categoryId: Exclude<CategoryId, "featured"> }) {
  const meta = CATEGORY_META[categoryId];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="mb-8 md:mb-10 max-w-2xl space-y-4"
    >
      <CategoryBadge label={meta.badge} />
      <h2 className="font-heading text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white tracking-[-0.02em]">
        {meta.title}
      </h2>
      <p className="text-[0.9375rem] leading-[1.75] text-white/50">{meta.description}</p>
    </motion.div>
  );
}


// ── FEATURED VIEW DATA ──────────────────────────────────────────────────────────

const FEATURED_HERO = PROJECTS.find((p) => p.id === "klevrax")!;

const FEATURED_ROW_1: Project[] = [
  PROJECTS.find((p) => p.id === "affinoz")!,
  PROJECTS.find((p) => p.id === "meta-beauty")!,
  PROJECTS.find((p) => p.id === "jazzo")!,
];

const FEATURED_ROW_2: Project[] = [
  PROJECTS.find((p) => p.id === "affinoz")!,
  PROJECTS.find((p) => p.id === "meta-beauty")!,
  PROJECTS.find((p) => p.id === "knovatek")!,
];


// ── CINEMATIC HERO CARD (KFC-style) ───────────────────────────────────────────

function CinematicHeroCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group relative w-full overflow-hidden rounded-[2.25rem] border border-white/[0.08] shadow-[0_24px_72px_rgba(0,0,0,0.5)] mb-8 md:mb-10 will-change-transform"
    >
      {/* Background image */}
      <div className="relative w-full h-[280px] sm:h-[360px] md:h-[450px] lg:h-[490px]">
        <Image
          src={project.image}
          alt={project.client}
          fill
          className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
          sizes="100vw"
          priority
        />

        {/* Multi-layer dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#010d1c]/96 via-[#020617]/82 to-[#020617]/38" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/88 via-transparent to-transparent" />
        {/* Subtle blue ambient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_8%_65%,rgba(0,102,255,0.10),transparent_65%)]" />

        {/* Bottom hairline */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-[#4D8EFF]/20 via-white/[0.05] to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-10 md:p-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16">

          {/* Left: badge + title + description + CTA */}
          <div className="max-w-sm lg:max-w-[460px]">
            <Badge label={project.badge} />
            <h2 className="mt-4 font-heading text-2xl sm:text-3xl md:text-[2.25rem] font-bold text-white leading-[1.12] tracking-[-0.025em]">
              {project.client}
            </h2>
            <p className="mt-3 text-[0.875rem] sm:text-[0.9375rem] leading-[1.75] text-white/58 line-clamp-3 lg:line-clamp-none">
              {project.description}
            </p>
            <div className="mt-6">
              <Link
                href={project.ctaHref}
                onClick={() => window.scrollTo(0, 0)}
                className="group/cta inline-flex items-center gap-2.5 rounded-xl border border-[#4D8EFF]/65 bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-5 py-2.5 font-heading text-xs font-semibold text-white shadow-[0_8px_24px_rgba(0,102,255,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,102,255,0.44)]"
              >
                View Case Study
                <ArrowRight size={13} className="transition-transform duration-300 group-hover/cta:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Right: metrics — desktop */}
          <div className="hidden lg:flex items-center gap-0 shrink-0 pb-1">
            {project.stats.map((s, i) => (
              <div key={s.label} className="flex items-center">
                {i > 0 && (
                  <div className="mx-8 h-10 w-px bg-white/[0.14] self-center" />
                )}
                <div className="text-left min-w-[80px]">
                  <p className="font-heading text-[2.25rem] xl:text-[2.75rem] font-extrabold text-white leading-none tabular-nums tracking-tight">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/42 whitespace-nowrap">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile metrics */}
          <div className="flex lg:hidden gap-3 mt-5 flex-wrap">
            {project.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/[0.1] bg-black/30 px-3.5 py-2.5 backdrop-blur-sm"
              >
                <p className="font-heading text-xl font-bold text-white tabular-nums leading-none">{s.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── COMPACT FEATURED PROJECT CARD ─────────────────────────────────────────────

function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const prefersReduced = useReducedMotion();
  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const rotateX = useSpring(rawRX, { stiffness: 280, damping: 26 });
  const rotateY = useSpring(rawRY, { stiffness: 280, damping: 26 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawRX.set(((e.clientY - rect.top) / rect.height - 0.5) * -8);
    rawRY.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
  };
  const onMouseLeave = () => { rawRX.set(0); rawRY.set(0); };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.52, delay: index * 0.08, ease: EASE }}
      style={prefersReduced ? {} : { rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -5, scale: 1.012 }}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl shadow-[0_10px_36px_rgba(0,0,0,0.22)] transition-[border-color,box-shadow] duration-300 hover:border-[#4D8EFF]/25 hover:shadow-[0_20px_54px_rgba(0,0,0,0.3),0_0_44px_rgba(0,102,255,0.10)] will-change-transform"
    >
      {/* Hover radial sweep */}
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,102,255,0.06),transparent_70%)]" />

      {/* Animated gradient border on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          padding: "1px",
          background: "linear-gradient(120deg, rgba(0,102,255,0.45) 0%, rgba(255,255,255,0.07) 50%, rgba(77,142,255,0.35) 100%)",
          backgroundSize: "200% 200%",
          animation: "border-flow 3s ease infinite",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.client}
          fill
          className={`transition-transform duration-[620ms] ease-out group-hover:scale-[1.03] ${
            project.imageStyle === "cover" ? "object-cover" : "object-contain p-4"
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-4 p-5 sm:p-6">
        <span
          className={`inline-flex w-fit items-center rounded-full border px-3 py-0.5 text-[10px] font-semibold tracking-[0.18em] uppercase backdrop-blur-md ${
            BADGE_STYLES[project.badge] ?? "border-white/20 bg-white/5 text-white/70"
          }`}
        >
          {project.badge}
        </span>

        <div>
          <h3 className="font-heading text-[1.05rem] font-bold text-white leading-tight tracking-[-0.01em]">
            {project.client}
          </h3>
          <p className="mt-2 text-[0.8125rem] leading-[1.72] text-white/48 line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-[#4D8EFF]/15 via-white/[0.06] to-transparent" />

        <div className="grid grid-cols-3 gap-3">
          {project.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1.5">
              <span className="font-heading text-[1.15rem] font-bold text-white tabular-nums leading-none">
                {s.value}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/36 leading-snug">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-0.5">
          <Link
            href={project.ctaHref}
            onClick={() => window.scrollTo(0, 0)}
            className="group/link inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-[#5A9FFF] transition-colors duration-300 hover:text-[#9CC0FF]"
          >
            View Case Study
            <ArrowRight size={12} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}


// ── FEATURED VIEW ASSEMBLER ───────────────────────────────────────────────────

function FeaturedView() {
  return (
    <motion.div
      key="featured-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {/* 1. Cinematic hero */}
      <CinematicHeroCard project={FEATURED_HERO} />

      {/* 2. Row 1: SEO · Meta · Website */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-10 md:mb-14">
        {FEATURED_ROW_1.map((project, i) => (
          <FeaturedProjectCard
            key={`row1-${project.id}-${i}`}
            project={project}
            index={i}
          />
        ))}
      </div>

      {/* 3. Row 2: SEO · Meta · Google Ads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {FEATURED_ROW_2.map((project, i) => (
          <FeaturedProjectCard
            key={`row2-${project.id}-${i}`}
            project={project}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────

export function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("featured");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "featured") return PROJECTS;
    const meta = CATEGORY_META[activeCategory];
    return PROJECTS.filter((p) => p.badge === meta.badgeFilter);
  }, [activeCategory]);

  return (
    <section
      id="showcase-section"
      className="relative z-10 bg-[#020617] px-6 pt-6 pb-0 md:px-10 md:pt-8 overflow-hidden"
    >
      {/* Noise overlay */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] opacity-[0.015]" />

      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      {/* Soft radial glow accents */}
      <div className="pointer-events-none absolute top-[20%] right-0 -z-10 h-[600px] w-[600px] rounded-full bg-blue-600/8 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[10%] left-0 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-600/6 blur-[100px]" />

      <div className="mx-auto w-full max-w-7xl">
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        <AnimatePresence mode="wait">
          {activeCategory === "featured" ? (
            <FeaturedView key="featured-view" />
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <CategoryHeader categoryId={activeCategory} />
              <motion.div layout className="space-y-8 md:space-y-10">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
                      transition={{ duration: 0.4, delay: index * 0.04, ease: EASE }}
                    >
                      <SplitBlock
                        project={project}
                        imageLeft={index % 2 === 0}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
