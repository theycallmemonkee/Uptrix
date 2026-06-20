"use client";

import Image from "next/image";
import { motion, MotionValue } from "framer-motion";
import { TrendingUp } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export type MetricCard = { value: string; label: string };

export type HeroVisualV2Props = {
  image: string;
  alt: string;
  card1: MetricCard;
  card2: MetricCard;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  metric1X: MotionValue<number>;
  metric1Y: MotionValue<number>;
  metric2X: MotionValue<number>;
  metric2Y: MotionValue<number>;
};

const BAR_HEIGHTS = [38, 56, 34, 72, 44, 82, 58, 76];

export function HeroVisualV2({
  image,
  alt,
  card1,
  card2,
  parallaxX,
  parallaxY,
  rotateX,
  rotateY,
  metric1X,
  metric1Y,
  metric2X,
  metric2Y,
}: HeroVisualV2Props) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[420px] lg:max-w-[480px] xl:max-w-[520px] lg:justify-self-end mt-12 lg:mt-0"
      style={{ x: parallaxX, y: parallaxY }}
      initial={{ opacity: 0, y: 28, scale: 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
    >
      {/* Ambient glow behind card */}
      <div className="pointer-events-none absolute -inset-16 -z-10 bg-[radial-gradient(ellipse_at_55%_45%,rgba(0,102,255,0.22),rgba(0,60,160,0.07)_55%,transparent_80%)] blur-3xl" />

      {/* ── Browser-chrome dashboard card ── */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0D2247]/88 to-[#071528]/95 shadow-[0_40px_100px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.09)] backdrop-blur-xl"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: EASE }}
      >
        {/* Chrome top bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.025] px-4 py-[11px]">
          <div className="flex items-center gap-[5px] shrink-0">
            <div className="h-[9px] w-[9px] rounded-full bg-[#FF5F57]/65 border border-[#FF5F57]/25" />
            <div className="h-[9px] w-[9px] rounded-full bg-[#FEBC2E]/65 border border-[#FEBC2E]/25" />
            <div className="h-[9px] w-[9px] rounded-full bg-[#28C840]/65 border border-[#28C840]/25" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="flex h-[20px] items-center gap-1.5 rounded-md border border-white/[0.07] bg-white/[0.04] px-3">
              <span className="relative flex h-[5px] w-[5px] shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-[5px] w-[5px] rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[9px] text-white/30 tracking-wide">uptrix.io/dashboard</span>
            </div>
          </div>
          <div className="w-[52px] shrink-0" />
        </div>

        {/* Dashboard image */}
        <div className="relative h-[195px] sm:h-[230px] lg:h-[248px] xl:h-[265px] w-full overflow-hidden">
          <Image
            src={image}
            alt={alt}
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            sizes="(min-width: 1280px) 520px, (min-width: 1024px) 480px, 90vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071528]/80 via-transparent to-transparent" />
        </div>

        {/* Metrics bar */}
        <div className="flex items-stretch divide-x divide-white/[0.06] border-t border-white/[0.06] bg-white/[0.02]">
          <div className="flex-1 px-4 py-3.5">
            <p className="font-heading text-[1.1rem] font-bold leading-none text-white">{card1.value}</p>
            <p className="mt-[5px] text-[9px] font-medium tracking-[0.14em] text-white/38 uppercase">{card1.label}</p>
          </div>
          <div className="flex-1 px-4 py-3.5">
            <p className="font-heading text-[1.1rem] font-bold leading-none text-white">{card2.value}</p>
            <p className="mt-[5px] text-[9px] font-medium tracking-[0.14em] text-white/38 uppercase">{card2.label}</p>
          </div>
          <div className="flex items-center px-4 py-3.5">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-[6px] w-[6px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-65" />
                <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-emerald-400" />
              </span>
              <span className="text-[9px] tracking-wide text-white/32">Live</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Floating Card 1 — top-left ── */}
      <motion.article
        className="absolute -left-7 top-[60px] z-20 hidden w-[148px] rounded-xl border border-white/[0.08] bg-[#071b38]/95 p-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/[0.04] backdrop-blur-2xl lg:block"
        style={{ x: metric1X, y: metric1Y }}
        initial={{ opacity: 0, x: -14, scale: 0.93 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.55, ease: EASE }}
        whileHover={{ y: -3, scale: 1.025, transition: { duration: 0.2 } }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_20%_10%,rgba(0,102,255,0.14),transparent_55%)]" />
        <div className="relative z-10 flex items-start justify-between gap-1">
          <div className="min-w-0">
            <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#8DB4FF]/55 truncate">{card1.label}</p>
            <p className="mt-[5px] font-heading text-[1.55rem] font-bold leading-none text-white">{card1.value}</p>
          </div>
          <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg bg-[#0052CC]/25 border border-[#4D8EFF]/22">
            <TrendingUp size={11} className="text-[#79ABFF]" />
          </div>
        </div>
        <div className="relative z-10 mt-3 h-[3px] overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#2E6EE0] to-[#90B8FF]"
            initial={{ width: "0%" }}
            animate={{ width: "72%" }}
            transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
          />
        </div>
      </motion.article>

      {/* ── Floating Card 2 — bottom-right ── */}
      <motion.article
        className="absolute -bottom-5 -right-5 z-20 hidden w-[158px] rounded-xl border border-white/[0.08] bg-[#071b38]/95 p-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/[0.04] backdrop-blur-2xl lg:block"
        style={{ x: metric2X, y: metric2Y }}
        initial={{ opacity: 0, x: 14, scale: 0.93 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.7, ease: EASE }}
        whileHover={{ y: -3, scale: 1.025, transition: { duration: 0.2 } }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_80%_90%,rgba(0,102,255,0.12),transparent_55%)]" />
        <div className="relative z-10">
          <div className="mb-2.5 flex items-center gap-1.5">
            <span className="relative flex h-[5px] w-[5px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-65" />
              <span className="relative inline-flex h-[5px] w-[5px] rounded-full bg-emerald-400" />
            </span>
            <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-emerald-400/65">Live tracking</span>
          </div>
          <p className="font-heading text-[1.55rem] font-bold leading-none text-white">{card2.value}</p>
          <p className="mt-[5px] text-[8px] font-semibold uppercase tracking-[0.16em] text-[#8DB4FF]/55">{card2.label}</p>
          {/* Mini bar chart */}
          <div className="mt-3 flex items-end justify-between gap-[2px]" style={{ height: 22 }}>
            {BAR_HEIGHTS.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-[1px] bg-gradient-to-t from-[#4D8EFF]/55 to-[#4D8EFF]/18 origin-bottom"
                style={{ height: `${(h / 100) * 22}px` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.32, delay: 0.92 + i * 0.065, ease: EASE }}
              />
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
