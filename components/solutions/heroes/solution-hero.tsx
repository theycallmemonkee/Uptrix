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
import { HeroVisual } from "./hero-visual";
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

// Per-page hero configuration — each page controls its own heading split and cards
type HeroConfig = {
  // Legacy two-line split (used when headingLines / heading are absent)
  headingLine1: string;
  headingLine2: string;
  pill: string;

  // Optional per-page heading overrides — set only what the page needs
  heading?: string;         // Full heading as a single text block (pill appended at end)
  headingLines?: string[];  // Explicit line-by-line split; highlighted badge appended to highlightedLine
  highlightedWord?: string; // Overrides `pill` for the badge text
  highlightedLine?: number; // headingLines index that receives the badge (default: last line)
  maxWidth?: string;        // Tailwind max-width class applied to h1, e.g. "max-w-[500px]"
  fontSize?: string;        // Tailwind text class override, e.g. "text-[clamp(1.8rem,3.5vw,3rem)]"

  mockupImage: string;
  card1: { value: string; label: string };
  card2: { value: string; label: string };
};

const HERO_CONFIGS: Record<string, HeroConfig> = {
  "paid-growth-engine": {
    headingLine1: "Spending on Ads but Not Seeing",
    headingLine2: "It in Your Bank",
    pill: "Account?",
    maxWidth: "max-w-[520px]",
    mockupImage:
      "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1200&q=80",
    card1: { value: "$10K", label: "Monthly Ad Spend" },
    card2: { value: "6X", label: "ROAS Delivered" },
  },
  "conversion-website-system": {
    headingLine1: "Getting Visitors",
    headingLine2: "but No One Ever Reaches",
    pill: "Out?",
    headingLines: ["Getting Visitors", "but No One Ever Reaches"],
    highlightedWord: "Out?",
    highlightedLine: 1,
    maxWidth: "max-w-[460px]",
    mockupImage:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    card1: { value: "3.21X", label: "ROAS Delivered" },
    card2: { value: "1.9M", label: "Views in 90 Days" },
  },
  "growth-foundation-system": {
    headingLine1: "Not Sure Where to",
    headingLine2: "Start With Your",
    pill: "Marketing?",
    maxWidth: "max-w-[440px]",
    mockupImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    card1: { value: "4.9★", label: "Client Rating" },
    card2: { value: "90d", label: "GTM Roadmap" },
  },
  "demand-generation-system": {
    headingLine1: "Tired of Wondering Where",
    headingLine2: "Your Next Customer Will",
    pill: "Come From?",
    headingLines: ["Tired of Wondering Where", "Your Next Customer Will"],
    highlightedWord: "Come From?",
    highlightedLine: 1,
    fontSize: "text-[clamp(2rem,4vw,3.75rem)]",
    maxWidth: "max-w-[560px]",
    mockupImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    card1: { value: "$2.27", label: "Cost Per Lead" },
    card2: { value: "3.21x", label: "ROAS Delivered" },
  },
  "ai-marketing-system": {
    headingLine1: "Worried Your Competitors Are",
    headingLine2: "Winning With AI While You",
    pill: "Watch?",
    headingLines: ["Worried Your Competitors Are", "Winning With AI While You"],
    highlightedWord: "Watch?",
    highlightedLine: 1,
    fontSize: "text-[clamp(2rem,4vw,3.75rem)]",
    maxWidth: "max-w-[560px]",
    mockupImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    card1: { value: "1.9M", label: "Views in 90 Days" },
    card2: { value: "$2.27", label: "Cost Per Lead" },
  },
  "revenue-operations-system": {
    headingLine1: "Growing Fast but Everything",
    headingLine2: "Feels Like It Is",
    pill: "Breaking?",
    headingLines: ["Growing Fast but Everything", "Feels Like It Is"],
    highlightedWord: "Breaking?",
    highlightedLine: 1,
    fontSize: "text-[clamp(2rem,4vw,3.75rem)]",
    maxWidth: "max-w-[540px]",
    mockupImage:
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1200&q=80",
    card1: { value: "99.8%", label: "Data Match Rate" },
    card2: { value: "+52%", label: "Lead Velocity" },
  },
};

const FALLBACK_CONFIG = HERO_CONFIGS["paid-growth-engine"];

type Props = { solution: SolutionConfig };

export function SolutionHero({ solution }: Props) {
  const config = HERO_CONFIGS[solution.slug] ?? FALLBACK_CONFIG;
  const IconComp =
    ICON_MAP[solution.iconName as keyof typeof ICON_MAP] ?? TrendingUp;

  // Mouse-reactive parallax
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.4);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 20, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 20, mass: 0.7 });

  const glowX = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(smoothY, [0, 1], ["10%", "75%"]);
  const glowBackground = useMotionTemplate`radial-gradient(600px circle at ${glowX} ${glowY}, rgba(0, 102, 255, 0.18), transparent 60%)`;

  const parallaxX = useTransform(smoothX, [0, 1], [-10, 10]);
  const parallaxY = useTransform(smoothY, [0, 1], [-8, 9]);
  const rotateCard = useTransform(smoothX, [0, 1], [-3, 3]);
  const rotateX = useTransform(smoothY, [0, 1], [5, -5]);
  const rotateY = useTransform(smoothX, [0, 1], [-5, 5]);

  // Cards move opposite to parallax for depth
  const metric1X = useTransform(parallaxX, (v) => v * -0.4);
  const metric1Y = useTransform(parallaxY, (v) => v * 0.4);
  const metric2X = useTransform(parallaxX, (v) => v * 0.4);
  const metric2Y = useTransform(parallaxY, (v) => v * -0.4);

  const textVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20, scale: 1 },
      show: (delay = 0) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, delay, ease: EASE },
      }),
    }),
    [],
  );

  return (
    <section
      className="relative z-[1] flex w-full flex-col overflow-hidden justify-center min-h-[88vh] lg:h-[92vh] lg:min-h-[660px] lg:max-h-[880px] pt-[124px] pb-16 sm:pt-[140px] sm:pb-12"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }}
    >
      {/* Interactive mouse glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: glowBackground }}
      />

      {/* Animated background grid */}
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]">
        <motion.div
          className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px]"
          animate={{ backgroundPosition: ["0px 0px", "70px 70px"] }}
          transition={{ duration: 25, repeat: Infinity, ease: [0, 0, 1, 1] }}
        />
      </div>

      {/* Ambient orbs */}
      <motion.div
        className="pointer-events-none absolute left-[8%] top-[20%] -z-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.22),transparent_65%)] blur-3xl"
        animate={{ y: [0, -16, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: EASE }}
      />
      <motion.div
        className="pointer-events-none absolute right-[12%] top-[25%] -z-20 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(120,168,255,0.16),transparent_60%)] blur-3xl"
        animate={{ y: [0, 12, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: EASE, delay: 1 }}
      />

      {/* Brand watermark */}
      <p className="pointer-events-none absolute left-1/2 top-[52%] -z-20 -translate-x-1/2 -translate-y-1/2 text-center font-heading text-[15vw] leading-none font-bold tracking-[0.22em] text-white/[0.008] blur-[0.2px] md:text-[9.5rem]">
        UPTRIX
      </p>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* ── Left column: Text ── */}
        <motion.div
          className="relative text-center lg:text-left flex flex-col items-center lg:items-start"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Category badge */}
          <motion.div
            custom={0}
            variants={textVariants}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#79ABFF]/20 bg-[#0C2C57]/42 px-4 py-1.5 text-xs tracking-[0.2em] text-[#CFE3FF]/85 uppercase backdrop-blur-md"
          >
            <IconComp size={11} className="text-[#79ABFF]" />
            <span>{solution.badge}</span>
          </motion.div>

          {/*
            Heading structure — per-page controlled.
            Priority: headingLines[] > heading (single block) > headingLine1/2 (legacy).
            Each page sets only what it needs; the rest falls back to safe defaults.
          */}
          <motion.h1
            custom={0.08}
            variants={textVariants}
            className={[
              "font-heading leading-[1.1] font-extrabold tracking-[-0.025em] text-white text-pretty",
              config.fontSize ?? "text-[clamp(2.25rem,4.5vw,4rem)]",
              config.maxWidth ?? "",
            ].filter(Boolean).join(" ")}
          >
            {(() => {
              const pillText = config.highlightedWord ?? config.pill;
              const PillBadge = (
                <motion.span
                  className="relative inline-flex items-center whitespace-nowrap rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1 align-middle text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)] backdrop-blur-[2px]"
                  animate={{
                    boxShadow: [
                      "0 8px 24px rgba(0,102,255,0.2)",
                      "0 10px 30px rgba(0,102,255,0.3)",
                      "0 8px 24px rgba(0,102,255,0.2)",
                    ],
                  }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: EASE }}
                >
                  {pillText}
                </motion.span>
              );

              if (config.headingLines) {
                const lastIdx = config.headingLines.length - 1;
                const badgeLine = config.highlightedLine ?? lastIdx;
                return config.headingLines.map((line, i) => (
                  <span key={i}>
                    {i > 0 && <>{" "}<br className="hidden lg:block" /></>}
                    {line}
                    {i === badgeLine && <>{" "}{PillBadge}</>}
                  </span>
                ));
              }

              if (config.heading) {
                return <>{config.heading}{" "}{PillBadge}</>;
              }

              // Legacy: headingLine1 + lg-only break + headingLine2 + pill
              return (
                <>
                  {config.headingLine1}
                  {" "}
                  <br className="hidden lg:block" />
                  {config.headingLine2}
                  {" "}
                  {PillBadge}
                </>
              );
            })()}
          </motion.h1>

          {/* Supporting paragraph */}
          <motion.p
            custom={0.16}
            variants={textVariants}
            className="mt-6 max-w-[520px] text-[0.9375rem] leading-[1.8] text-white/68 mx-auto lg:mx-0"
          >
            {solution.heroDescription}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            custom={0.24}
            variants={textVariants}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start w-full sm:w-auto"
          >
            <Link
              href="/contact"
              className="shine-sweep will-gpu group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-6 py-3.5 font-heading text-xs font-semibold text-white shadow-[0_12px_32px_rgba(0,102,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#86B6FF] hover:shadow-[0_16px_40px_rgba(0,102,255,0.38)]"
            >
              Get Started
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/portfolio"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-6 py-3.5 font-heading text-xs font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white hover:-translate-y-0.5"
            >
              See Our Work
              <ChevronRight size={13} />
            </Link>
          </motion.div>

          <motion.p
            custom={0.32}
            variants={textVariants}
            className="mt-3 text-xs italic text-white/40"
          >
            No commitment. We understand your situation first.
          </motion.p>
        </motion.div>

        {/* ── Right column: shared HeroVisual — layout locked, data flows in ── */}
        <HeroVisual
          mockupImage={config.mockupImage}
          alt={solution.title}
          card1={config.card1}
          card2={config.card2}
          parallaxX={parallaxX}
          parallaxY={parallaxY}
          rotateCard={rotateCard}
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
