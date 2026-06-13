"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, Star, TrendingUp, BarChart3, Eye, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FloatingParticles, AnimatedGrid } from "@/components/ui/visual-effects";

const EASE = [0.22, 1, 0.36, 1] as const;

interface PortfolioHeroProps {
  onViewWorkClick?: () => void;
}

const DASHBOARD_IMAGES = [
  { src: "/portfolio/ai-seo/5.png", alt: "AI SEO Analytics Suite" },
  { src: "/portfolio/google-ads/4.jpg", alt: "Google Paid PPC Tracking Dashboard" },
  { src: "/portfolio/meta-ads/4-dashboard.jpg", alt: "Meta Business Manager Conversion Scaling" },
  { src: "/portfolio/social/4-dashboard.jpg", alt: "Social Campaign View Velocity Graph" },
];

export function PortfolioHero({ onViewWorkClick }: PortfolioHeroProps) {
  const handleViewWork = () => {
    if (onViewWorkClick) {
      onViewWorkClick();
    } else {
      const el = document.getElementById("showcase-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % DASHBOARD_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative z-[1] flex min-h-[95vh] items-center justify-center overflow-hidden px-6 pt-[120px] pb-20 md:px-10 lg:pt-[160px] bg-[#061124]">
      {/* ── Layered Background System ───────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(180deg,#0a1b35_0%,#061124_62%,#030915_100%)]"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(1200px circle at 10% 15%, rgba(0,102,255,0.22), transparent 58%), radial-gradient(850px circle at 85% 25%, rgba(112,168,255,0.14), transparent 60%)",
        }}
      />

      {/* Grid background lines */}
      <AnimatedGrid opacity={0.35} gridSize={72} type="lines" />

      {/* Floating particles background */}
      <FloatingParticles count={24} className="-z-10 opacity-70" />

      {/* Ambient background glow orb */}
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.14),transparent_65%)] blur-3xl"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 items-center">
          
          {/* ── LEFT COLUMN: CONTENT ──────────────────────────── */}
          <div className="flex flex-col items-start text-left">
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: EASE }}
              className="mb-6 inline-flex items-center rounded-full border border-[#8DB8FF]/30 bg-[#78A8FF]/10 px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-[#DCEBFF] uppercase backdrop-blur-sm"
            >
              PORTFOLIO
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
            >
              Real Campaigns.<br />
              Real Dashboards.<br />
              <motion.span
                className="inline-block bg-gradient-to-r from-[#E6F1FF] via-[#70A8FF] to-[#E6F1FF] bg-[length:200%_100%] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                Real Business Growth.
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="mt-6 max-w-2xl text-sm leading-relaxed text-white/76 md:text-base md:leading-loose"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
            >
              Explore how Uptrix scales brands using AI SEO, Google Ads, Meta Ads, Social Media, Business Automation and AI-powered growth systems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.26, ease: EASE }}
            >
              <button
                onClick={handleViewWork}
                className="shine-sweep group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-6 py-3.5 font-heading text-xs font-semibold uppercase tracking-wider text-white shadow-[0_12px_28px_rgba(0,102,255,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(0,102,255,0.44)] cursor-pointer"
              >
                View Case Studies
                <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/14 bg-white/[0.04] px-6 py-3.5 font-heading text-xs font-semibold uppercase tracking-wider text-white/88 backdrop-blur-sm transition-all duration-300 hover:border-white/24 hover:bg-white/[0.07] hover:-translate-y-0.5"
              >
                Book Free Consultation
                <ArrowUpRight size={14} className="opacity-60 transition-transform duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Trust Section */}
            <motion.div
              className="mt-12 flex flex-col gap-2 border-t border-white/[0.08] pt-8 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#FFD23F" className="text-[#FFD23F]" />
                ))}
              </div>
              <p className="text-xs font-medium tracking-wide text-white/50">
                Trusted by growth-focused brands
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: LAYERED PREVIEW VISUAL ───────────────── */}
          <div className="relative flex items-center justify-center lg:mt-0 mt-16 py-8 px-4 w-full select-none">
            
            {/* Glow backing */}
            <div className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-60 bg-[radial-gradient(circle,rgba(0,102,255,0.15)_0%,transparent_65%)]" />

            {/* Browser Mockup Wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              whileHover={{ rotateX: 1, rotateY: -1, y: -2 }}
              className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/12 bg-[#0B1528]/80 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-md"
            >
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0E1E38]/90 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#FF5F56] opacity-85" />
                  <span className="h-2 w-2 rounded-full bg-[#FFBD2E] opacity-85" />
                  <span className="h-2 w-2 rounded-full bg-[#27C93F] opacity-85" />
                </div>
                <div className="rounded bg-white/[0.04] px-4 py-0.5 text-[9px] tracking-wide text-white/35 font-mono">
                  performance.uptrix.com
                </div>
                <div className="w-8" />
              </div>

              {/* Rotating Preview Screen */}
              <div className="relative h-[calc(100%-32px)] w-full bg-[#081220] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={imageIndex}
                    initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.015, filter: "blur(4px)" }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="relative w-full h-full p-3"
                  >
                    <Image
                      src={DASHBOARD_IMAGES[imageIndex].src}
                      alt={DASHBOARD_IMAGES[imageIndex].alt}
                      fill
                      className="object-contain p-2"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ── FLOATING STATS BADGES ── */}

            {/* Stat 1: Organic Traffic (Top Left) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: [-4, 4, -4] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.3 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -top-6 -left-6 z-20 flex items-center gap-3 rounded-2xl border border-white/14 bg-[#0B1E3B]/85 px-4 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.6)] backdrop-blur-xl hover:scale-104 transition-transform duration-300"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0066FF]/20 text-[#70A8FF]">
                <TrendingUp size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-base font-bold text-white leading-none tracking-tight">+342%</span>
                <span className="mt-1 text-[8px] font-semibold text-white/50 uppercase tracking-wider leading-none">Organic Traffic</span>
              </div>
            </motion.div>

            {/* Stat 2: ROAS (Top Right) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: [4, -4, 4] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.38 },
                y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -top-10 -right-6 z-20 flex items-center gap-3 rounded-2xl border border-white/14 bg-[#0B1E3B]/85 px-4 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.6)] backdrop-blur-xl hover:scale-104 transition-transform duration-300"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#27C93F]/20 text-[#54EC73]">
                <BarChart3 size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-base font-bold text-white leading-none tracking-tight">4.8X</span>
                <span className="mt-1 text-[8px] font-semibold text-white/50 uppercase tracking-wider leading-none">ROAS Scaled</span>
              </div>
            </motion.div>

            {/* Stat 3: Organic Views (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: [4, -4, 4] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.44 },
                y: { duration: 6.2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -bottom-8 -left-8 z-20 flex items-center gap-3 rounded-2xl border border-white/14 bg-[#0B1E3B]/85 px-4 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.6)] backdrop-blur-xl hover:scale-104 transition-transform duration-300"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E02424]/20 text-[#F05252]">
                <Eye size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-base font-bold text-white leading-none tracking-tight">1.9M</span>
                <span className="mt-1 text-[8px] font-semibold text-white/50 uppercase tracking-wider leading-none">Organic Views</span>
              </div>
            </motion.div>

            {/* Stat 4: ROI Growth (Bottom Right) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: [-4, 4, -4] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.5 },
                y: { duration: 5.8, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -bottom-6 -right-6 z-20 flex items-center gap-3 rounded-2xl border border-white/14 bg-[#0B1E3B]/85 px-4 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.6)] backdrop-blur-xl hover:scale-104 transition-transform duration-300"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFBD2E]/20 text-[#FFE066]">
                <Award size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-base font-bold text-white leading-none tracking-tight">+217%</span>
                <span className="mt-1 text-[8px] font-semibold text-white/50 uppercase tracking-wider leading-none">ROI Growth</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#061124] to-transparent pointer-events-none" />
    </section>
  );
}
