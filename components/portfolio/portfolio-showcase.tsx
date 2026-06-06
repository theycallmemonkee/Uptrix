"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BarChart3, Eye, Phone, Laptop, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PORTFOLIO_ITEMS, PortfolioImage } from "@/data/portfolio-data";
import { WebsiteShowcase } from "@/components/portfolio/website-showcase";

// Helper to resolve images defensively
function getSafeImage(images: PortfolioImage[], index: number, fallbackType?: "dashboard" | "phone" | "report" | "masonry"): { src: string; alt: string } {
  const absoluteFallback = {
    src: "/portfolio/ai-seo/5.png",
    alt: "Portfolio Showcase Image"
  };

  if (!images || images.length === 0) {
    return absoluteFallback;
  }

  // 1. Try direct index match
  if (images[index] && images[index].src) {
    return {
      src: images[index].src,
      alt: images[index].alt || "Portfolio Showcase Image"
    };
  }

  // 2. Try type match fallback if provided
  if (fallbackType) {
    const matched = images.find(img => img.type === fallbackType && img.src);
    if (matched) {
      return {
        src: matched.src,
        alt: matched.alt || "Portfolio Showcase Image"
      };
    }
  }

  // 3. Fallback to the first available image
  const firstAvailable = images.find(img => img.src);
  if (firstAvailable) {
    return {
      src: firstAvailable.src,
      alt: firstAvailable.alt || "Portfolio Showcase Image"
    };
  }

  return absoluteFallback;
}


const EASE = [0.22, 1, 0.36, 1] as const;

// ── UPGRADED ENHANCED IMAGE EXPERIENCE WRAPPERS ──────────────────

/**
 * FloatingAnalyticsWindow
 * Wraps dashboard screenshots in a macOS-style browser shell
 */
export function FloatingAnalyticsWindow({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href: string;
}) {
  return (
    <Link href={href} onClick={() => window.scrollTo(0, 0)} className="block">
      <motion.div
        whileHover={{ y: -8, scale: 1.02, zIndex: 10 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="group relative overflow-hidden rounded-xl border border-white/12 bg-[#0B1528]/80 shadow-2xl backdrop-blur-md cursor-pointer select-none"
      >
        {/* Dynamic light highlight border */}
        <div className="absolute inset-0 z-10 border border-transparent group-hover:border-[#70A8FF]/20 rounded-xl transition-colors duration-400" />
        
        {/* Browser Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0E1E38]/90 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] opacity-80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] opacity-80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] opacity-80" />
          </div>
          <div className="rounded bg-white/[0.05] px-4 py-0.5 text-[10px] tracking-wide text-white/40 font-mono">
            analytics.uptrix.com
          </div>
          <div className="w-12" />
        </div>

        {/* Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#081220]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-102"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Glass Overlay on Hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#071224]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#0066FF] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(0,102,255,0.4)]">
              <Laptop size={14} />
              Inspect Performance
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/**
 * PremiumPhoneMockup
 * Wraps social media creatives in a premium smartphone shell
 */
export function PremiumPhoneMockup({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href: string;
}) {
  return (
    <Link href={href} onClick={() => window.scrollTo(0, 0)} className="block">
      <motion.div
        whileHover={{ y: -10, scale: 1.03, rotate: 0.5, zIndex: 10 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative mx-auto w-full max-w-[270px] rounded-[38px] border-[6px] border-[#1C2C46] bg-[#0A1628] p-1.5 shadow-[0_30px_70px_rgba(2,8,20,0.85)] cursor-pointer select-none"
      >
        {/* Inner reflection outline */}
        <div className="absolute inset-0 z-10 border border-transparent group-hover:border-[#70A8FF]/20 rounded-[32px] pointer-events-none transition-colors duration-400" />
        
        {/* Speaker / Camera Notch */}
        <div className="absolute top-4 left-1/2 z-20 h-4 w-24 -translate-x-1/2 rounded-full bg-[#1C2C46]" />
        
        {/* Inside Screen Container */}
        <div className="relative aspect-[9/18.5] w-full overflow-hidden rounded-[29px] bg-[#081220]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="270px"
          />
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
          
          {/* Action hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#071224]/60 opacity-0 transition-opacity duration-300 hover:opacity-100 backdrop-blur-[2px]">
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#0066FF] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(0,102,255,0.4)]">
              <Phone size={14} />
              View Creative
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/**
 * LayeredCaseStudyCard
 * Generates layered cards overlapping each other, shifting on hover
 */
export function LayeredCaseStudyCard({
  src,
  alt,
  index,
  href,
}: {
  src: string;
  alt: string;
  index: number;
  href: string;
}) {
  const rotation = index === 0 ? "-2.5deg" : index === 1 ? "1.5deg" : "-0.5deg";
  const offset = index === 0 ? "translate-y-0" : index === 1 ? "translate-y-4 translate-x-4 md:translate-x-6" : "translate-y-8 translate-x-8 md:translate-x-12";
  
  return (
    <Link href={href} onClick={() => window.scrollTo(0, 0)} className={`absolute block transition-all duration-300 w-[82%] sm:w-[85%] ${offset}`}>
      <motion.div
        style={{ rotate: rotation }}
        whileHover={{ y: -12, scale: 1.04, rotate: "0deg", zIndex: 20 }}
        className="group relative overflow-hidden rounded-2xl border border-white/12 bg-[#0C1B33]/90 p-2 shadow-[0_20px_50px_rgba(2,9,22,0.6)] backdrop-blur-md cursor-pointer select-none"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#081220]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-102"
            sizes="(max-width: 768px) 80vw, 40vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-[#071224]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[1px]">
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#0066FF] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(0,102,255,0.4)]">
              <BarChart3 size={14} />
              Inspect Audit
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/**
 * MetricBadge
 * Styled floating glassmorphic metrics card positioned dynamically
 */
export function MetricBadge({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.04 }}
      className={`absolute z-20 flex flex-col items-center justify-center rounded-2xl border border-white/14 bg-[#0A1D36]/82 px-5 py-3 shadow-[0_12px_36px_rgba(0,0,0,0.65)] ring-1 ring-white/10 backdrop-blur-xl pointer-events-auto ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <TrendingUp size={12} className="text-[#70A8FF]" />
        <span className="font-heading text-lg font-bold text-white tracking-tight">{value}</span>
      </div>
      <span className="mt-0.5 text-[9px] font-semibold tracking-wider text-white/60 uppercase">{label}</span>
    </motion.div>
  );
}

export function FloatingGlassCard({
  icon,
  text,
  className = "",
  delay = 0,
}: {
  icon: string;
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
      className={`flex items-center gap-2 rounded-xl border border-white/12 bg-[#0C1B33]/80 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-md text-xs font-semibold text-white/90 ${className}`}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </motion.div>
  );
}

const SLIDESHOW_WEBSITES = [
  { name: "Jazzo Store", url: "jazzo.store", src: "/portfolio/websites/jazzo.jpg" },
  { name: "Bigblare Innovations", url: "bigblareinnovations.com", src: "/portfolio/websites/bigblare.jpg" },
  { name: "Vastra Store", url: "vastra-store.com", src: "/portfolio/websites/vastra.jpg" },
  { name: "Vodaiq", url: "vodaiq.com", src: "/portfolio/websites/vodaiq.jpg" },
  { name: "Klevrax", url: "klevrax.com", src: "/portfolio/websites/klevrax.jpg" },
  { name: "Uptrix Technologies", url: "uptrixtechnologies.com", src: "/portfolio/websites/uptrix.jpg" },
  { name: "Ecofitz", url: "ecofitz.com", src: "/portfolio/websites/ecofitz.jpg" },
  { name: "Lebodee", url: "lebodee.com", src: "/portfolio/websites/lebodee.jpg" },
  { name: "T-Adda", url: "t-adda.in", src: "/portfolio/websites/t-adda.jpg" },
];

export function WebsiteSlideshowSection({
  route,
  item,
}: {
  route: string;
  item: typeof PORTFOLIO_ITEMS[number];
}) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % SLIDESHOW_WEBSITES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentSite = SLIDESHOW_WEBSITES[currentIdx];

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] relative">
      {/* Left Column: Floating glass cards */}
      <div className="relative flex flex-col justify-center gap-4 py-6 md:py-12 min-h-[240px] md:min-h-[380px]">
        {/* Floating background glow */}
        <div className="absolute inset-0 bg-[#0066FF]/5 blur-3xl rounded-full pointer-events-none" />
        
        <FloatingGlassCard icon="⚡" text="0.4s Load" className="relative md:absolute md:top-[8%] md:left-2" delay={0} />
        <FloatingGlassCard icon="🚀" text="Next.js 15" className="relative md:absolute md:top-[30%] md:right-2" delay={0.8} />
        <FloatingGlassCard icon="🤖" text="AI Ready" className="relative md:absolute md:top-[52%] md:left-4" delay={0.4} />
        <FloatingGlassCard icon="🔒" text="Enterprise Secure" className="relative md:absolute md:top-[74%] md:right-4" delay={1.2} />
      </div>

      {/* Right Column: Browser mockup and stats */}
      <div className="flex flex-col justify-between gap-6">
        <Link href={route} onClick={() => window.scrollTo(0, 0)} className="block">
          <motion.div
            whileHover={{ y: -8, scale: 1.02, zIndex: 10 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="group relative overflow-hidden rounded-xl border border-white/12 bg-[#0B1528]/80 shadow-2xl backdrop-blur-md cursor-pointer select-none"
          >
            {/* Dynamic light highlight border */}
            <div className="absolute inset-0 z-10 border border-transparent group-hover:border-[#70A8FF]/20 rounded-xl transition-colors duration-400" />
            
            {/* Browser Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0E1E38]/90 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] opacity-80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] opacity-80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] opacity-80" />
              </div>
              <div className="rounded bg-white/[0.05] px-4 py-0.5 text-[10px] tracking-wide text-white/40 font-mono">
                {currentSite.url}
              </div>
              <div className="w-12" />
            </div>

            {/* Image Container with Slideshow */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#081220]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentSite.src}
                    alt={currentSite.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Glass Overlay on Hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#071224]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#0066FF] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(0,102,255,0.4)]">
                  <Laptop size={14} />
                  Inspect Website
                </div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Bottom stats cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {item.metrics[2] && (
            <Link
              href={route}
              onClick={() => window.scrollTo(0, 0)}
              className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-[0_12px_40px_rgba(2,9,22,0.4)] backdrop-blur-xl hover:border-[#70A8FF]/25 cursor-pointer block"
            >
              <p className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {item.metrics[2].value}
              </p>
              <p className="mt-1 text-xs font-medium tracking-wide text-[#70A8FF] uppercase">
                {item.metrics[2].label}
              </p>
            </Link>
          )}

          {item.metrics[3] && (
            <Link
              href={route}
              onClick={() => window.scrollTo(0, 0)}
              className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-[0_12px_40px_rgba(2,9,22,0.4)] backdrop-blur-xl hover:border-[#70A8FF]/25 cursor-pointer block"
            >
              <p className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {item.metrics[3].value}
              </p>
              <p className="mt-1 text-xs font-medium tracking-wide text-[#70A8FF] uppercase">
                {item.metrics[3].label}
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN INTERACTIVE PORTFOLIO SHOWCASE ──────────────────────────

const categorySlugMap: Record<string, string> = {
  "ai-seo": "ai-seo",
  "google-ads": "google-ads",
  "meta-ads": "meta-ads",
  "social-media": "social",
  "website-development": "websites",
};

const TABS = ["All", "AI SEO", "Google Ads", "Meta Ads", "Social Media", "Website Development"];

export function PortfolioShowcase() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filteredItems = activeTab === "All"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="showcase-section" className="relative z-10 px-6 py-20 md:px-10 bg-[#061124]">
      {/* Grid background lines */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        
        {/* Navigation Tabs */}
        <div className="mb-20 flex flex-wrap justify-center gap-3">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative rounded-xl px-5 py-3 font-heading text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "border border-[#8DB8FF]/45 bg-[#0066FF] text-white shadow-[0_8px_24px_rgba(0,102,255,0.4)]"
                  : "border border-white/12 bg-white/[0.03] text-white/80 hover:border-white/24 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Categories Section List */}
        <div className="space-y-32">
          {filteredItems.map((item) => {
            const sectionNumber = `0${PORTFOLIO_ITEMS.findIndex(p => p.id === item.id) + 1}`;
            const route = `/portfolio/${categorySlugMap[item.id] || item.id}/case-study-1`;
            return (
              <div key={item.id} className="group/section border-t border-white/8 pt-16">
                <div className="grid gap-12 lg:grid-cols-[1.1fr_1.9fr] lg:gap-16">
                  
                  {/* Left Column: Details */}
                  <div className="flex flex-col justify-start">
                    <div className="flex items-baseline gap-4">
                      <span className="font-heading text-3xl font-semibold tracking-wide text-[#70A8FF]/40 md:text-4xl">
                        {sectionNumber}
                      </span>
                      <span className="text-[11px] font-medium tracking-[0.25em] text-[#70A8FF] uppercase">
                        {item.category}
                      </span>
                    </div>

                    <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-white md:text-4xl">
                      {item.title}
                    </h2>

                    <p className="mt-4 text-sm text-white/70">
                      Client: <span className="font-medium text-white">{item.client}</span>
                    </p>

                    <p className="mt-6 text-base leading-relaxed text-white/74">
                      {item.subtitle}
                    </p>

                    {/* Showcase Stats Widgets */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      {item.metrics.slice(0, 2).map((m) => (
                        <Link key={m.label} href={route} onClick={() => window.scrollTo(0, 0)} className="block rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 select-none cursor-pointer">
                          <p className="font-heading text-2xl font-bold text-white">{m.value}</p>
                          <p className="mt-1 text-[10px] font-medium tracking-wider text-white/60 uppercase">{m.label}</p>
                        </Link>
                      ))}
                    </div>

                    {/* View Details CTA */}
                    <div className="mt-10">
                      <Link
                        href={route}
                        onClick={() => window.scrollTo(0, 0)}
                        className="shine-sweep inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-5 py-3.5 font-heading text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-[#70A8FF]/30 hover:bg-[#0C2448]/50 cursor-pointer"
                      >
                        Explore Case Study
                        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/section:translate-x-0.5 group-hover/section:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Dynamic layouts based on categories */}
                  <div className="relative">
                    {item.id === "ai-seo" && (
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Layered Cards Column */}
                        <div className="relative flex flex-col justify-center gap-6">
                          <div className="absolute inset-0 bg-[#0066FF]/5 blur-3xl rounded-full pointer-events-none" />
                          <div className="relative h-[250px] md:h-[300px]">
                            <LayeredCaseStudyCard
                              src={getSafeImage(item.images, 0, "report").src}
                              alt={getSafeImage(item.images, 0, "report").alt}
                              index={0}
                              href={route}
                            />
                            <LayeredCaseStudyCard
                              src={getSafeImage(item.images, 1, "report").src}
                              alt={getSafeImage(item.images, 1, "report").alt}
                              index={1}
                              href={route}
                            />
                          </div>
                          
                          {/* Floating Badges */}
                          <MetricBadge value="AI Optimized" label="Tech System" className="-top-6 left-0" />
                        </div>
                        
                        {/* Interactive Masonry Frame + Stats Badges */}
                        <div className="flex flex-col gap-6 relative">
                          <Link href={route} onClick={() => window.scrollTo(0, 0)}>
                            <motion.div
                              whileHover={{ y: -6, scale: 1.02 }}
                              className="relative aspect-[1.4] overflow-hidden rounded-2xl border border-white/12 shadow-2xl cursor-pointer bg-[#081220]"
                            >
                              <Image
                                src={getSafeImage(item.images, 2, "masonry").src}
                                alt={getSafeImage(item.images, 2, "masonry").alt}
                                fill
                                className="object-contain transition-transform duration-500 hover:scale-102"
                                sizes="(max-width: 768px) 100vw, 30vw"
                              />
                              {/* Hover overlay indicator */}
                              <div className="absolute inset-0 flex items-center justify-center bg-[#071224]/50 opacity-0 transition-opacity duration-300 hover:opacity-100 backdrop-blur-[2px]">
                                <span className="flex items-center gap-2 rounded-full bg-[#0066FF] px-4 py-2 text-xs font-semibold text-white">
                                  <Eye size={14} /> View Audit Details
                                </span>
                              </div>
                            </motion.div>
                          </Link>

                          <Link
                            href={route}
                            onClick={() => window.scrollTo(0, 0)}
                            className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-[0_12px_40px_rgba(2,9,22,0.4)] backdrop-blur-xl hover:border-[#70A8FF]/25 cursor-pointer block"
                          >
                            <p className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
                              {item.metrics[2].value}
                            </p>
                            <p className="mt-1 text-xs font-medium tracking-wide text-[#70A8FF] uppercase">
                              {item.metrics[2].label}
                            </p>
                          </Link>
                        </div>
                      </div>
                    )}

                    {item.id === "google-ads" && (
                      <div className="space-y-6 relative">
                        {/* Floating Analytics Windows (macOS theme) */}
                        <div className="grid gap-6 md:grid-cols-2">
                          <FloatingAnalyticsWindow
                            src={getSafeImage(item.images, 0, "dashboard").src}
                            alt={getSafeImage(item.images, 0, "dashboard").alt}
                            href={route}
                          />
                          <FloatingAnalyticsWindow
                            src={getSafeImage(item.images, 1, "dashboard").src}
                            alt={getSafeImage(item.images, 1, "dashboard").alt}
                            href={route}
                          />
                        </div>
                        
                        <div className="grid gap-6 sm:grid-cols-3">
                          <Link href={route} onClick={() => window.scrollTo(0, 0)} className="col-span-1 sm:col-span-2 block">
                            <motion.div
                              whileHover={{ y: -6, scale: 1.01 }}
                              className="relative aspect-[2] overflow-hidden rounded-2xl border border-white/12 cursor-pointer shadow-2xl bg-[#081220]"
                            >
                              <Image
                                src={getSafeImage(item.images, 5, "report").src}
                                alt={getSafeImage(item.images, 5, "report").alt}
                                fill
                                className="object-contain transition-transform duration-500 hover:scale-102"
                                sizes="(max-width: 768px) 100vw, 40vw"
                              />
                              {/* Hover overlay indicator */}
                              <div className="absolute inset-0 flex items-center justify-center bg-[#071224]/50 opacity-0 transition-opacity duration-300 hover:opacity-100 backdrop-blur-[2px]">
                                <span className="flex items-center gap-2 rounded-full bg-[#0066FF] px-4 py-2 text-xs font-semibold text-white">
                                  <Eye size={14} /> View Report Details
                                </span>
                              </div>
                            </motion.div>
                          </Link>

                          <Link
                            href={route}
                            onClick={() => window.scrollTo(0, 0)}
                            className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-[0_12px_40px_rgba(2,9,22,0.4)] backdrop-blur-xl hover:border-[#70A8FF]/25 cursor-pointer flex flex-col justify-center items-center text-center block"
                          >
                            <p className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
                              {item.metrics[0].value}
                            </p>
                            <p className="mt-1 text-xs font-medium tracking-wide text-[#70A8FF] uppercase">
                              {item.metrics[0].label}
                            </p>
                          </Link>
                        </div>

                        {/* Floating Badges */}
                        <MetricBadge value="Performance Lift" label="Optimization" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    )}

                    {item.id === "meta-ads" && (
                      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] relative">
                        {/* Creative Phone mockup */}
                        <div className="flex items-center justify-center relative">
                          <div className="relative mx-auto w-full max-w-[270px] rounded-[38px] border-[6px] border-transparent p-1.5 opacity-0 pointer-events-none">
                            <div className="relative aspect-[9/18.5] w-full" />
                          </div>
                          
                          {/* Floating Badges */}
                          <MetricBadge value="+217% ROI" label="Funnel Scaling" className="-top-4 -left-6 pointer-events-none" />
                        </div>
                        
                        {/* Analytics window and metrics */}
                        <div className="flex flex-col justify-between gap-6">
                          <FloatingAnalyticsWindow
                            src={getSafeImage(item.images, 2, "dashboard").src}
                            alt={getSafeImage(item.images, 2, "dashboard").alt}
                            href={route}
                          />
                          <div className="grid gap-6 sm:grid-cols-2">
                            
                            <Link
                              href={route}
                              onClick={() => window.scrollTo(0, 0)}
                              className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-[0_12px_40px_rgba(2,9,22,0.4)] backdrop-blur-xl hover:border-[#70A8FF]/25 cursor-pointer block"
                            >
                              <p className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
                                {item.metrics[0].value}
                              </p>
                              <p className="mt-1 text-xs font-medium tracking-wide text-[#70A8FF] uppercase">
                                {item.metrics[0].label}
                              </p>
                            </Link>

                            <Link
                              href={route}
                              onClick={() => window.scrollTo(0, 0)}
                              className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-[0_12px_40px_rgba(2,9,22,0.4)] backdrop-blur-xl hover:border-[#70A8FF]/25 cursor-pointer block"
                            >
                              <p className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
                                {item.metrics[2].value}
                              </p>
                              <p className="mt-1 text-xs font-medium tracking-wide text-[#70A8FF] uppercase">
                                {item.metrics[2].label}
                              </p>
                            </Link>

                          </div>
                        </div>
                      </div>
                    )}

                    {item.id === "social-media" && (
                      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] relative">
                        {/* Phone layouts fan */}
                        <div className="flex items-center justify-center gap-4 py-6 relative">
                          <div className="-rotate-6 translate-x-4 w-full max-w-[270px]">
                            <div className="relative mx-auto w-full rounded-[38px] border-[6px] border-transparent p-1.5 opacity-0 pointer-events-none">
                              <div className="relative aspect-[9/18.5] w-full" />
                            </div>
                          </div>
                          <div className="rotate-3 -translate-x-4 w-full max-w-[270px]">
                            <div className="relative mx-auto w-full rounded-[38px] border-[6px] border-transparent p-1.5 opacity-0 pointer-events-none">
                              <div className="relative aspect-[9/18.5] w-full" />
                            </div>
                          </div>
                          
                          {/* Floating Badges */}
                          <MetricBadge value="747K Reach" label="Viral Loops" className="top-1/3 left-0 pointer-events-none" />
                        </div>
                        
                        {/* Analytics window and metrics */}
                        <div className="flex flex-col justify-between gap-6">
                          <FloatingAnalyticsWindow
                            src={getSafeImage(item.images, 6, "dashboard").src}
                            alt={getSafeImage(item.images, 6, "dashboard").alt}
                            href={route}
                          />
                          <div className="grid gap-6 sm:grid-cols-2">
                            
                            <Link
                              href={route}
                              onClick={() => window.scrollTo(0, 0)}
                              className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-[0_12px_40px_rgba(2,9,22,0.4)] backdrop-blur-xl hover:border-[#70A8FF]/25 cursor-pointer block"
                            >
                              <p className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
                                {item.metrics[0].value}
                              </p>
                              <p className="mt-1 text-xs font-medium tracking-wide text-[#70A8FF] uppercase">
                                {item.metrics[0].label}
                              </p>
                            </Link>

                            <Link
                              href={route}
                              onClick={() => window.scrollTo(0, 0)}
                              className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-[0_12px_40px_rgba(2,9,22,0.4)] backdrop-blur-xl hover:border-[#70A8FF]/25 cursor-pointer block"
                            >
                              <p className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
                                {item.metrics[2].value}
                              </p>
                              <p className="mt-1 text-xs font-medium tracking-wide text-[#70A8FF] uppercase">
                                {item.metrics[2].label}
                              </p>
                            </Link>

                          </div>

                          
                          {/* Floating Badges */}
                          <MetricBadge value="206K Engagement" label="Community Growth" className="-bottom-4 left-6 pointer-events-none" />
                        </div>
                      </div>
                    )}

                    {item.id === "website-development" && (
                      <WebsiteSlideshowSection route={route} item={item} />
                    )}
                  </div>

                </div>
              </div>
            );
          })}



          {activeTab === "Website Development" && (
            <div className="border-t border-white/8 pt-16">
              <div className="mb-12 text-center">
                <span className="text-[11px] font-medium tracking-[0.25em] text-[#70A8FF] uppercase">
                  Website Showcase
                </span>
                <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-white md:text-4xl sm:text-5xl">
                  DETAILED PORTFOLIO PROJECTS
                </h2>
                <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
                  Explore our premium, high-converting enterprise portals and custom e-commerce developments.
                </p>
              </div>
              <WebsiteShowcase />
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
