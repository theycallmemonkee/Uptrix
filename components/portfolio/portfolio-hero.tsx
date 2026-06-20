"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Magnetic wrapper — slides toward cursor on hover */
function MagneticWrap({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 380, damping: 28 });
  const y = useSpring(rawY, { stiffness: 380, damping: 28 });

  return (
    <motion.div
      style={prefersReduced ? {} : { x, y }}
      onMouseMove={(e) => {
        if (prefersReduced) return;
        const rect = e.currentTarget.getBoundingClientRect();
        rawX.set((e.clientX - rect.left - rect.width / 2) * 0.28);
        rawY.set((e.clientY - rect.top - rect.height / 2) * 0.28);
      }}
      onMouseLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

interface PortfolioHeroProps {
  onViewWorkClick?: () => void;
}

const GRADIENT_STYLE: React.CSSProperties = {
  background: "linear-gradient(90deg, #A8C7FF 0%, #5A8BFF 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export function PortfolioHero({ onViewWorkClick }: PortfolioHeroProps) {
  const prefersReduced = useReducedMotion();

  const handleViewWork = () => {
    if (onViewWorkClick) {
      onViewWorkClick();
    } else {
      const el = document.getElementById("showcase-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* Shared line entrance factory */
  const lineVariant = (delay: number, targetOpacity: number) => ({
    initial: { opacity: 0, y: 20, willChange: "transform, opacity" },
    animate: {
      opacity: prefersReduced ? targetOpacity : targetOpacity,
      y: 0,
      transition: { duration: 0.72, delay, ease: EASE },
    },
  });

  return (
    <section className="relative z-[1] flex min-h-[92vh] items-center justify-center overflow-hidden px-6 pt-[118px] pb-4 md:px-10 lg:pt-[136px] bg-[#020617]">

      {/* ── Layered background ───────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(180deg,#081428_0%,#020617_55%,#01040f_100%)]" />

      {/* Dual radial colour wash */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(1100px circle at 8% 12%, rgba(0,102,255,0.20), transparent 55%), radial-gradient(700px circle at 88% 20%, rgba(96,160,255,0.12), transparent 58%)",
        }}
      />

      {/* Fine grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.13] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Noise texture */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] opacity-[0.016]" />

      {/* Slow-drifting radial glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,102,255,0.18) 0%, rgba(0,102,255,0.07) 40%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.07, 1], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[25%] left-[12%] -z-10 h-48 w-48 rounded-full bg-blue-600/10 blur-[70px]"
        animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[20%] right-[10%] -z-10 h-40 w-40 rounded-full bg-indigo-500/8 blur-[60px]"
        animate={{ y: [0, 14, 0], x: [0, -6, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#020617] to-transparent" />

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-5xl flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#4D8EFF]/30 bg-[#0066FF]/10 px-5 py-1.5 shadow-[0_0_20px_rgba(0,102,255,0.12)] backdrop-blur-sm">
            <Sparkles size={11} className="text-[#79ABFF]" />
            <span className="text-[10px] font-semibold tracking-[0.22em] text-[#DCEBFF] uppercase">
              Portfolio
            </span>
          </div>
        </motion.div>

        {/* Headline — staggered reveal sequence */}
        <h1
          className="font-heading"
          style={{
            fontWeight: 900,
            letterSpacing: "-0.06em",
            lineHeight: 0.9,
            fontSize: "clamp(3rem, 6.875vw, 5.5rem)",
            maxWidth: "900px",
          }}
        >
          {/* Line 1 — Real Campaigns. 75% white */}
          <motion.span
            className="block"
            style={{
              color: "rgba(255,255,255,0.75)",
              textShadow: "0 0 40px rgba(255,255,255,0.10)",
              willChange: "transform, opacity",
            }}
            {...lineVariant(0.3, 1)}
          >
            Real Campaigns.
          </motion.span>

          {/* Line 2 — Real Results. 90% white */}
          <motion.span
            className="block"
            style={{
              color: "rgba(255,255,255,0.90)",
              textShadow: "0 0 40px rgba(255,255,255,0.12)",
              willChange: "transform, opacity",
            }}
            {...lineVariant(0.8, 1)}
          >
            Real Results.
          </motion.span>

          {/* Line 3 — Real Growth. Blue gradient + glow + underline sweep */}
          <span className="relative inline-block">
            {/* Soft glow behind line 3 */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-[-10%] -z-10 h-[140%]"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(90,139,255,0.22) 0%, transparent 68%)",
                filter: "blur(16px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 1.5, ease: EASE }}
            />

            <motion.span
              className="block"
              style={{
                ...GRADIENT_STYLE,
                willChange: "transform, opacity",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                filter: prefersReduced
                  ? undefined
                  : "drop-shadow(0 0 16px rgba(120,171,255,0.44)) drop-shadow(0 0 32px rgba(90,143,255,0.22))",
              }}
              transition={{ duration: 0.72, delay: 1.3, ease: EASE }}
            >
              Real Growth.
            </motion.span>

            {/* Underline sweep — left to right */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 rounded-full"
              style={{
                bottom: "0.06em",
                height: "2px",
                background: "linear-gradient(90deg, #A8C7FF 0%, #5A8BFF 100%)",
                boxShadow: "0 0 10px rgba(90,139,255,0.55), 0 0 22px rgba(90,139,255,0.28)",
                transformOrigin: "left center",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.65, delay: 1.8, ease: EASE }}
            />
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          className="mt-5 max-w-[520px] text-[0.9375rem] leading-[1.82] text-white/58"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.5, ease: EASE }}
        >
          Explore how Uptrix helps brands grow through AI SEO, Google Ads, Meta
          Ads, Social Media, Business Automation and complete growth systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.75, ease: EASE }}
        >
          <MagneticWrap>
            <button
              onClick={handleViewWork}
              className="pulse-cta shine-sweep group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-[#4D8EFF]/80 bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-7 py-3.5 font-heading text-xs font-semibold uppercase tracking-wider text-white shadow-[0_12px_28px_rgba(0,102,255,0.32),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,102,255,0.50)] cursor-pointer"
            >
              View Case Studies
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </MagneticWrap>

          <MagneticWrap>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-xl border border-white/[0.12] bg-white/[0.04] px-7 py-3.5 font-heading text-xs font-semibold uppercase tracking-wider text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-white/22 hover:bg-white/[0.08] hover:-translate-y-0.5 hover:text-white"
            >
              Book Free Consultation
              <ArrowUpRight
                size={14}
                className="opacity-55 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </MagneticWrap>
        </motion.div>


      </div>
    </section>
  );
}
