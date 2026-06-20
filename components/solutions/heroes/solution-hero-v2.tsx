"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { HeroVisualV2 } from "./hero-visual-v2";
import {
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Target,
  Globe,
  Compass,
  Sparkles,
  Layers,
} from "lucide-react";
import { SolutionConfig } from "@/data/solutions-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICON_MAP = {
  TrendingUp,
  Target,
  Globe,
  Compass,
  Sparkles,
  Layers,
};

// Per-slug visual config — heading splits, image, floating metric cards.
// Lines and pill text are identical to the original headingLines / pill values.
type SlugConfig = {
  lines: string[];
  pill: string;
  pillLine?: number; // index of line that receives the pill (default: last line)
  fontSize?: string;
  maxWidth?: string;
  image: string;
  card1: { value: string; label: string };
  card2: { value: string; label: string };
};

const SLUG_CONFIGS: Record<string, SlugConfig> = {
  "demand-generation-system": {
    lines: ["Tired of Wondering Where", "Your Next Customer Will"],
    pill: "Come From?",
    fontSize: "text-[clamp(2rem,4.2vw,3.75rem)]",
    maxWidth: "max-w-[540px]",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    card1: { value: "$2.27", label: "Cost Per Lead" },
    card2: { value: "3.21x", label: "ROAS Delivered" },
  },
  "paid-growth-engine": {
    lines: ["Spending on Ads but Not Seeing", "It in Your Bank"],
    pill: "Account?",
    fontSize: "text-[clamp(2rem,4.2vw,3.75rem)]",
    maxWidth: "max-w-[520px]",
    image:
      "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1200&q=80",
    card1: { value: "$10K", label: "Monthly Ad Spend" },
    card2: { value: "6X", label: "ROAS Delivered" },
  },
  "conversion-website-system": {
    lines: ["Getting Visitors", "but No One Ever Reaches"],
    pill: "Out?",
    maxWidth: "max-w-[460px]",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    card1: { value: "3.21X", label: "ROAS Delivered" },
    card2: { value: "1.9M", label: "Views in 90 Days" },
  },
  "growth-foundation-system": {
    lines: ["Not Sure Where to", "Start With Your"],
    pill: "Marketing?",
    maxWidth: "max-w-[420px]",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    card1: { value: "4.9★", label: "Client Rating" },
    card2: { value: "90d", label: "GTM Roadmap" },
  },
  "ai-marketing-system": {
    lines: ["Worried Your Competitors Are", "Winning With AI While You"],
    pill: "Watch?",
    fontSize: "text-[clamp(2rem,4.2vw,3.75rem)]",
    maxWidth: "max-w-[560px]",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    card1: { value: "1.9M", label: "Views in 90 Days" },
    card2: { value: "$2.27", label: "Cost Per Lead" },
  },
  "revenue-operations-system": {
    lines: ["Growing Fast but Everything", "Feels Like It Is"],
    pill: "Breaking?",
    fontSize: "text-[clamp(2rem,4.2vw,3.75rem)]",
    maxWidth: "max-w-[520px]",
    image:
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1200&q=80",
    card1: { value: "99.8%", label: "Data Match Rate" },
    card2: { value: "+52%", label: "Lead Velocity" },
  },
};

const FALLBACK = SLUG_CONFIGS["demand-generation-system"];

type Props = { solution: SolutionConfig };

export function SolutionHeroV2({ solution }: Props) {
  const cfg = SLUG_CONFIGS[solution.slug] ?? FALLBACK;
  const IconComp = ICON_MAP[solution.iconName as keyof typeof ICON_MAP] ?? TrendingUp;

  // Mouse-reactive spring system
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.4);
  const smoothX = useSpring(mouseX, { stiffness: 78, damping: 22, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 78, damping: 22, mass: 0.8 });

  const glowX = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(smoothY, [0, 1], ["10%", "75%"]);
  const glowBg = useMotionTemplate`radial-gradient(700px circle at ${glowX} ${glowY}, rgba(0, 102, 255, 0.13), transparent 65%)`;

  const parallaxX = useTransform(smoothX, [0, 1], [-8, 8]);
  const parallaxY = useTransform(smoothY, [0, 1], [-6, 7]);
  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);

  const metric1X = useTransform(parallaxX, (v) => v * -0.5);
  const metric1Y = useTransform(parallaxY, (v) => v * 0.5);
  const metric2X = useTransform(parallaxX, (v) => v * 0.5);
  const metric2Y = useTransform(parallaxY, (v) => v * -0.5);

  const listVariants = useMemo(
    () => ({
      hidden: {},
      show: { transition: { staggerChildren: 0.08, delayChildren: 0 } },
    }),
    [],
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20, scale: 1 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.68, ease: EASE },
      },
    }),
    [],
  );

  const lastIdx = cfg.lines.length - 1;
  const badgeLineIdx = cfg.pillLine ?? lastIdx;

  const PillBadge = (
    <motion.span
      className="relative inline-flex items-center whitespace-nowrap rounded-xl border border-[#8DB8FF]/30 bg-[#7BABFF]/12 px-3.5 py-1 align-middle text-[#DDEBFF] shadow-[0_6px_20px_rgba(0,102,255,0.18)] backdrop-blur-sm"
      animate={{
        boxShadow: [
          "0 6px 20px rgba(0,102,255,0.18)",
          "0 9px 30px rgba(0,102,255,0.3)",
          "0 6px 20px rgba(0,102,255,0.18)",
        ],
      }}
      transition={{ duration: 3.4, repeat: Infinity, ease: EASE }}
    >
      {cfg.pill}
    </motion.span>
  );

  return (
    <section
      className="relative z-[1] flex w-full flex-col overflow-hidden pt-[130px] pb-14 sm:pt-[148px] sm:pb-16 lg:min-h-[88vh] lg:justify-center lg:pb-20"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - r.left) / r.width);
        mouseY.set((e.clientY - r.top) / r.height);
      }}
    >
      {/* Mouse-reactive glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: glowBg }}
      />

      {/* Static grid */}
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.18] [mask-image:radial-gradient(ellipse_at_50%_40%,black_35%,transparent_82%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute left-[5%] top-[22%] -z-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.16),transparent_65%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-[28%] -z-20 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(80,140,255,0.1),transparent_60%)] blur-3xl" />

      {/* Brand watermark */}
      <p className="pointer-events-none absolute left-1/2 top-[50%] -z-20 -translate-x-1/2 -translate-y-1/2 select-none text-center font-heading text-[15vw] leading-none font-bold tracking-[0.22em] text-white/[0.008] blur-[0.3px] md:text-[9rem]">
        UPTRIX
      </p>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-16">
        {/* ── Left column: text ── */}
        <motion.div
          className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
          initial="hidden"
          animate="show"
          variants={listVariants}
        >
          {/* Category badge */}
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#79ABFF]/18 bg-[#0C2C57]/40 px-4 py-1.5 text-[10.5px] font-medium tracking-[0.22em] text-[#CFE3FF]/80 uppercase backdrop-blur-md"
          >
            <IconComp size={10} className="shrink-0 text-[#79ABFF]" />
            <span>{solution.badge}</span>
          </motion.div>

          {/* Heading — same lines and pill text as before, now rendered uniformly */}
          <motion.h1
            variants={itemVariants}
            className={[
              "font-heading leading-[1.08] font-extrabold tracking-[-0.03em] text-white text-pretty",
              cfg.fontSize ?? "text-[clamp(2.4rem,4.8vw,4.25rem)]",
              cfg.maxWidth ?? "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {cfg.lines.map((line, i) => (
              <span key={i}>
                {i > 0 && (
                  <>
                    {" "}
                    <br className="hidden lg:block" />
                  </>
                )}
                {line}
                {i === badgeLineIdx && (
                  <>
                    {" "}
                    {PillBadge}
                  </>
                )}
              </span>
            ))}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-[500px] text-[0.9375rem] leading-[1.78] text-white/60 mx-auto lg:mx-0"
          >
            {solution.heroDescription}
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row lg:justify-start"
          >
            <Link
              href="/contact"
              className="shine-sweep will-gpu group relative inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-6 py-3.5 font-heading text-xs font-semibold text-white shadow-[0_12px_36px_rgba(0,102,255,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#86B6FF] hover:shadow-[0_18px_44px_rgba(0,102,255,0.44)] sm:w-auto"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/portfolio"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-heading text-xs font-medium text-white/72 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.05] hover:text-white sm:w-auto"
            >
              See Our Work
              <ChevronRight size={12} />
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            variants={itemVariants}
            className="mt-3.5 text-[11px] italic text-white/36"
          >
            No commitment. We understand your situation first.
          </motion.p>
        </motion.div>

        {/* ── Right column: visual ── */}
        <HeroVisualV2
          image={cfg.image}
          alt={solution.title}
          card1={cfg.card1}
          card2={cfg.card2}
          parallaxX={parallaxX}
          parallaxY={parallaxY}
          rotateX={rotateX}
          rotateY={rotateY}
          metric1X={metric1X}
          metric1Y={metric1Y}
          metric2X={metric2X}
          metric2Y={metric2Y}
        />
      </div>
    </section>
  );
}
