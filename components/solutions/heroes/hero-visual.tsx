"use client";

import Image from "next/image";
import { motion, MotionValue } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export type MetricCard = {
  value: string;
  label: string;
};

export type HeroVisualProps = {
  // Page-specific data — the only thing that differs per page
  mockupImage: string;
  alt: string;
  card1: MetricCard;
  card2: MetricCard;

  // Motion values from the parent's mouse-reactive spring system
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  rotateCard: MotionValue<number>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  metric1X: MotionValue<number>;
  metric1Y: MotionValue<number>;
  metric2X: MotionValue<number>;
  metric2Y: MotionValue<number>;
};

/**
 * HeroVisual — shared dashboard-style visual for all solution hero sections.
 *
 * Layout, sizing, positioning, border radius, shadow, animation timing,
 * and z-index structure are all locked here. Each page supplies only:
 * mockupImage, alt, card1, card2, and pre-computed motion values.
 */
export function HeroVisual({
  mockupImage,
  alt,
  card1,
  card2,
  parallaxX,
  parallaxY,
  rotateCard,
  rotateX,
  rotateY,
  metric1X,
  metric1Y,
  metric2X,
  metric2Y,
}: HeroVisualProps) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[315px] sm:max-w-[385px] lg:max-w-[455px] lg:justify-self-end mt-10 lg:mt-0"
      style={{ x: parallaxX, y: parallaxY, perspective: 1200 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
    >
      {/* Ambient glow behind the panel */}
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.15),transparent_70%)] blur-3xl opacity-80" />

      <div className="relative">
        {/* ── Primary dashboard panel ── */}
        <motion.article
          className="relative overflow-hidden rounded-[1.8rem] border border-white/15 bg-white/[0.04] p-2 sm:p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.45),0_0_40px_rgba(0,102,255,0.08),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl"
          style={{ rotateX, rotateY, rotate: rotateCard, transformStyle: "preserve-3d" }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: EASE }}
        >
          {/* Animated border sheen */}
          <motion.div
            className="pointer-events-none absolute -inset-[1px] rounded-[1.8rem] opacity-40"
            style={{
              background:
                "linear-gradient(120deg, rgba(0,102,255,0.2), rgba(255,255,255,0.03), rgba(0,102,255,0.18))",
            }}
          />

          {/* Dashboard image */}
          <div className="relative h-[15rem] w-full overflow-hidden rounded-[1.2rem] transition-transform duration-700 hover:scale-[1.015] sm:h-[17.5rem] lg:h-[19.5rem]">
            <Image
              src={mockupImage}
              alt={alt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 520px, 90vw"
            />
          </div>

          {/* Bottom vignette overlay */}
          <div className="pointer-events-none absolute inset-3 rounded-[1.2rem] bg-gradient-to-t from-[#071022]/80 via-transparent to-transparent" />
        </motion.article>

        {/* ── Metric Card 1 — top-left, desktop only ── */}
        <motion.article
          className="absolute -left-10 top-8 z-10 hidden w-44 overflow-hidden rounded-2xl border border-[#6EA6FF]/20 bg-[linear-gradient(155deg,rgba(10,28,59,0.92),rgba(5,13,31,0.85))] p-4 shadow-[0_12px_32px_rgba(2,9,22,0.45),0_0_20px_rgba(0,102,255,0.08)] ring-1 ring-inset ring-white/6 backdrop-blur-2xl lg:block"
          style={{ x: metric1X, y: metric1Y }}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          whileHover={{ y: -3, scale: 1.015 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_12%,rgba(255,255,255,0.1),transparent_48%),radial-gradient(circle_at_82%_14%,rgba(0,102,255,0.18),transparent_46%)]" />
          <div className="relative z-10 leading-snug">
            <p className="text-[9px] font-semibold tracking-wider text-[#A8C9FF]/75 uppercase">
              {card1.label}
            </p>
            <p className="mt-1.5 font-heading text-[1.65rem] font-bold leading-none text-white">
              {card1.value}
            </p>
          </div>
        </motion.article>

        {/* ── Metric Card 2 — bottom-right, desktop only ── */}
        <motion.article
          className="absolute -right-10 bottom-8 z-10 hidden w-44 overflow-hidden rounded-2xl border border-[#6EA6FF]/20 bg-[linear-gradient(155deg,rgba(10,28,59,0.92),rgba(5,13,31,0.85))] p-4 shadow-[0_12px_32px_rgba(2,9,22,0.45),0_0_20px_rgba(0,102,255,0.08)] ring-1 ring-inset ring-white/6 backdrop-blur-2xl lg:block"
          style={{ x: metric2X, y: metric2Y }}
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          whileHover={{ y: -3, scale: 1.015 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_12%,rgba(255,255,255,0.1),transparent_48%),radial-gradient(circle_at_82%_14%,rgba(0,102,255,0.18),transparent_46%)]" />
          <div className="relative z-10 leading-snug">
            <p className="text-[9px] font-semibold tracking-wider text-[#A8C9FF]/75 uppercase">
              {card2.label}
            </p>
            <p className="mt-1.5 font-heading text-[1.65rem] font-bold leading-none text-white">
              {card2.value}
            </p>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}
