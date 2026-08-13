"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { SanityHomePage } from "@/lib/sanity";

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_LINEAR = [0, 0, 1, 1] as const;

export interface CinematicHeroProps {
  data?: SanityHomePage | null;
}

export function CinematicHero({ data }: CinematicHeroProps = {}) {
  // Copy — Sanity overrides, sensible defaults
  const headlinePart1    = data?.heroHeadlinePart1  ?? "We Grow Startups Scaleups & SMEs";
  const headlineHighlight = data?.heroHeadlineHighlight ?? "From First Idea to Scale";
  const bodyText         = data?.heroBody          ?? "A growth marketing company that runs as your fractional CMO. One team owning your brand, marketing and growth, from the first strategy call to the numbers at the end.";
  const cta1Label        = data?.heroCta1Label     ?? "Book a Growth Consultation";
  const cta1Href         = data?.heroCta1Href      ?? "#contact";
  const cta2Label        = data?.heroCta2Label     ?? "See Case Studies";
  const cta2Href         = data?.heroCta2Href      ?? "/portfolio";

  // Mouse-reactive parallax
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.4);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 22, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 22, mass: 0.8 });

  const glowX  = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const glowY  = useTransform(smoothY, [0, 1], ["10%", "70%"]);
  const glowBg = useMotionTemplate`radial-gradient(600px circle at ${glowX} ${glowY}, rgba(0,102,255,0.13), transparent 68%)`;

  const imgParallaxX = useTransform(smoothX, [0, 1], [-6, 6]);
  const imgParallaxY = useTransform(smoothY, [0, 1], [-4, 5]);
  const rotateX      = useTransform(smoothY, [0, 1], [3, -3]);
  const rotateY      = useTransform(smoothX, [0, 1], [-3, 3]);

  return (
    <section
      className="relative z-[1] flex w-full overflow-hidden
                 pt-[84px] pb-10
                 sm:pt-36 sm:pb-20
                 lg:pt-40 lg:pb-28"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - r.left) / r.width);
        mouseY.set((e.clientY - r.top) / r.height);
      }}
    >
      {/* ── Backgrounds ──────────────────────────────────────────────── */}

      {/* Mouse-reactive glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: glowBg }}
      />

      {/* Static radial glow — behind heading */}
      <div className="pointer-events-none absolute -left-24 top-1/4 -z-20 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.15),transparent_65%)] blur-3xl" />

      {/* Static radial glow — behind image */}
      <div className="pointer-events-none absolute -right-16 top-1/3 -z-20 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(40,110,255,0.12),transparent_65%)] blur-3xl" />

      {/* Animated grid — subtle */}
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_45%_50%,black_40%,transparent_82%)]">
        <motion.div
          className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]"
          animate={{ backgroundPosition: ["0px 0px", "64px 64px"] }}
          transition={{ duration: 28, repeat: Infinity, ease: EASE_LINEAR }}
        />
      </div>

      {/* UPTRIX watermark */}
      <p className="pointer-events-none absolute left-1/2 bottom-[8%] -z-20 -translate-x-1/2 select-none font-heading text-[18vw] font-bold leading-none tracking-[0.22em] text-white/[0.012] blur-[2px] md:text-[11rem]">
        UPTRIX
      </p>

      {/* ── Content grid ─────────────────────────────────────────────── */}
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-6 md:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-16">

        {/* ── Left: copy ── */}
        <div className="relative mx-auto max-w-[600px] text-center lg:mx-0 lg:text-left">
          {/*
           * H1 is the LCP element — rendered as plain HTML with NO opacity:0 initial state.
           * CSS animation (not Framer Motion) handles the fade-in so the browser can
           * paint it immediately from SSR HTML without waiting for JS hydration.
           */}
          <h1
            className="hero-h1 font-heading text-[2.5rem] leading-[1.1] tracking-[-0.03em] text-white font-extrabold
                       sm:text-[2.75rem] sm:leading-[1.1]
                       lg:text-[clamp(2rem,3.5vw,2.75rem)] lg:leading-[1.12]"
          >
            {headlinePart1}
            <br />
            <span className="text-[#79ABFF] [text-shadow:0_0_56px_rgba(121,171,255,0.32)]">
              {headlineHighlight}
            </span>
          </h1>

          {/* Body — JS animation fine here, not LCP */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="mx-auto mt-5 max-w-[88%] text-base leading-[1.75] text-white/60
                       sm:mt-6 sm:max-w-[460px] sm:text-[0.9375rem] sm:leading-[1.85] sm:text-white/58
                       lg:mx-0"
          >
            {bodyText}
          </motion.p>

          {/* CTAs — stacked full-width on mobile, inline on sm+ */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            className="mt-7 flex flex-col items-stretch gap-3.5
                       sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3
                       lg:justify-start"
          >
            {/* Primary */}
            <div className="relative w-full sm:w-auto">
              <Link
                href={cta1Href}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl
                           border border-[#3D7FFF]
                           bg-gradient-to-br from-[#0055FF] via-[#0066FF] to-[#0044CC]
                           px-6 py-[15px]
                           font-heading text-sm font-semibold text-white
                           shadow-[0_8px_28px_rgba(0,102,255,0.28),inset_0_1px_0_rgba(255,255,255,0.1)]
                           transition-all duration-300 active:scale-[0.98]
                           sm:w-auto sm:py-3.5
                           hover:-translate-y-px
                           hover:border-[#6AACFF]
                           hover:shadow-[0_14px_44px_rgba(0,102,255,0.46),inset_0_1px_0_rgba(255,255,255,0.14)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.09] to-transparent transition-transform duration-500 group-hover:translate-x-full"
                />
                <span className="relative">{cta1Label}</span>
                <ArrowUpRight
                  size={15}
                  aria-hidden
                  className="relative transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
                />
              </Link>

              {/* Handwritten note pointing at the primary CTA */}
              <motion.p
                aria-hidden
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.55, ease: EASE }}
                className="pointer-events-none absolute -top-6 -left-1 hidden -rotate-3 whitespace-nowrap font-hand text-lg text-[#79ABFF]/80 sm:-left-3 sm:block sm:text-xl"
              >
                ← talk to a growth strategist
              </motion.p>
            </div>

            {/* Secondary */}
            <Link
              href={cta2Href}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl
                         border border-white/[0.13]
                         bg-white/[0.04]
                         px-6 py-[14px]
                         font-heading text-sm font-medium text-white/75
                         backdrop-blur-sm
                         transition-all duration-300 active:scale-[0.98]
                         sm:w-auto sm:py-3.5
                         hover:-translate-y-px
                         hover:border-white/22
                         hover:bg-white/[0.08]
                         hover:text-white
                         hover:shadow-[0_8px_28px_rgba(0,0,0,0.22)]"
            >
              {cta2Label}
              <ArrowUpRight
                size={14}
                aria-hidden
                className="opacity-45 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-px group-hover:translate-x-px"
              />
            </Link>
          </motion.div>

          {/* Proof line — directly below buttons */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
            className="mt-5 font-heading text-xs font-semibold text-white/60 text-center
                       sm:mt-6 sm:text-sm sm:text-white/70
                       lg:text-left"
          >
            200+ projects delivered for startups, scaleups and SMEs worldwide.
          </motion.p>
        </div>

        {/* ── Right: image card ── */}
        <motion.div
          className="relative mx-auto w-full sm:max-w-[480px] lg:max-w-none lg:justify-self-end"
          style={{ x: imgParallaxX, y: imgParallaxY }}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
        >
          {/* Ambient glow behind image */}
          <div className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(ellipse_at_55%_50%,rgba(0,102,255,0.22),rgba(0,50,160,0.08)_55%,transparent_80%)] blur-3xl" />

          {/* Image card — 3D tilt + float; no overflow-hidden so metric card peeks out */}
          <motion.div
            className="relative rounded-[2rem]
                       border border-white/[0.11]
                       shadow-[0_32px_80px_rgba(2,9,22,0.62),0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.08)]"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: EASE }}
          >
            {/* Image — clipped to rounded corners */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] lg:aspect-[5/4]">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=960&q=85"
                alt="Brand performance showcase"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) 480px, 620px"
              />
              {/* Minimal overlay — let image breathe */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#020D20]/20 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010810]/38 via-transparent to-transparent" />
            </div>

            {/* Metric card — overlapping inside bottom-left of image */}
            <motion.div
              className="absolute bottom-3 left-3 z-20
                         w-[116px] rounded-xl p-2.5
                         sm:bottom-4 sm:left-4 sm:w-[152px] sm:rounded-2xl sm:p-3.5
                         border border-white/[0.12]
                         bg-[#071b38]/94
                         shadow-[0_16px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]
                         ring-1 ring-white/[0.05]
                         backdrop-blur-2xl"
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.65, duration: 0.7, ease: EASE }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_12%,rgba(0,102,255,0.18),transparent_58%)]" />
              <div className="relative z-10">
                <div className="mb-1.5 flex items-center justify-between sm:mb-2">
                  <span className="text-[6.5px] font-semibold uppercase tracking-[0.12em] text-white/45 sm:text-[7.5px] sm:tracking-[0.14em]">
                    ROAS Delivered
                  </span>
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-md bg-emerald-500/14 text-[9px] text-emerald-400 sm:h-4 sm:w-4 sm:text-[10px]">
                    ↑
                  </span>
                </div>
                <p className="font-heading text-[1.25rem] font-bold leading-none text-white sm:text-[1.625rem]">3.21X</p>
                <p className="mt-0.5 text-[6.5px] leading-relaxed text-white/40 sm:mt-1 sm:text-[7.5px]">On D2C campaigns</p>
                <div className="mt-2 h-[2px] overflow-hidden rounded-full bg-white/[0.08] sm:mt-3">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#2E6EE0] to-[#90B8FF]"
                    initial={{ width: "0%" }}
                    animate={{ width: "76%" }}
                    transition={{ duration: 1.5, delay: 1.0, ease: EASE }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
