"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  ArrowUpRight,
  CheckCircle2, 
  ChevronRight, 
  XCircle,
  TrendingUp, 
  Target, 
  Globe, 
  Cpu, 
  Compass, 
  Sparkles, 
  Layers 
} from "lucide-react";
import { PremiumNavbar } from "@/components/premium-navbar";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { PremiumAccordion, type PremiumAccordionItem } from "@/components/ui/premium-accordion";
import { SOLUTIONS, SolutionConfig } from "@/data/solutions-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  TrendingUp,
  Target,
  Globe,
  Cpu,
  Compass,
  Sparkles,
  Layers,
};

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
];

type HeroContent = {
  line1: string;
  line2: string;
  pillText: string;
  mockupImage: string;
  card1Val: string;
  card1Lbl: string;
  card2Val: string;
  card2Lbl: string;
};

const HERO_MAP: Record<string, HeroContent> = {
  "demand-generation-system": {
    line1: "Transform Silent Traffic",
    line2: "Into Staggering Inbound",
    pillText: "Pipelines",
    mockupImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    card1Val: "+217%",
    card1Lbl: "Conversion Lift",
    card2Val: "3.4x",
    card2Lbl: "Inbound SQLs",
  },
  "paid-growth-engine": {
    line1: "Scale Paid Channels",
    line2: "Without Campaign ROAS",
    pillText: "Decline",
    mockupImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    card1Val: "4.5x",
    card1Lbl: "Budget Scaled",
    card2Val: "-22%",
    card2Lbl: "CAC Reduction",
  },
  "conversion-website-system": {
    line1: "Turn Passive Web Visitors",
    line2: "Into High-Converting",
    pillText: "Revenue",
    mockupImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    card1Val: "0.8s",
    card1Lbl: "Load Speed",
    card2Val: "+142%",
    card2Lbl: "Signup Boost",
  },
  "ai-lead-conversion-system": {
    line1: "Automate Lead Qualification",
    line2: "24/7 With Custom",
    pillText: "AI Agents",
    mockupImage: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=1200&q=80",
    card1Val: "12s",
    card1Lbl: "Response Speed",
    card2Val: "34h",
    card2Lbl: "Saved / Week",
  },
  "growth-foundation-system": {
    line1: "Transition From Random",
    line2: "Tactics to Category",
    pillText: "Dominance",
    mockupImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    card1Val: "4.9★",
    card1Lbl: "Client Rating",
    card2Val: "90d",
    card2Lbl: "GTM Roadmap",
  },
  "ai-marketing-system": {
    line1: "Unleash Advanced Generative",
    line2: "AI to Triple Content",
    pillText: "Velocity",
    mockupImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    card1Val: "4.0x",
    card1Lbl: "Content Volume",
    card2Val: "-62%",
    card2Lbl: "Overhead Cost",
  },
  "revenue-operations-system": {
    line1: "Unify Tech Stacks And",
    line2: "Track Inbound Funnel",
    pillText: "Accuracy",
    mockupImage: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1200&q=80",
    card1Val: "99.8%",
    card1Lbl: "Data Match Rate",
    card2Val: "+52%",
    card2Lbl: "Lead Velocity",
  },
};

type Props = {
  solution: SolutionConfig;
};

export function SolutionPageTemplate({ solution }: Props) {
  const IconComp = ICON_MAP[solution.iconName] || TrendingUp;
  
  // Custom hero content mappings
  const heroContent = HERO_MAP[solution.slug] || HERO_MAP["demand-generation-system"];

  // Framer motion interactive mouse hooks
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

  // Find related solutions (excluding current)
  const relatedSolutions = SOLUTIONS.filter((s) => s.slug !== solution.slug).slice(0, 3);

  const textVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
      show: (delay = 0) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, delay, ease: EASE },
      }),
    }),
    [],
  );

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#0B1F3A] text-white font-sans antialiased">
      {/* Background radial glows & grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(1200px circle at 15% 15%, rgba(0,102,255,0.22), transparent 55%), radial-gradient(900px circle at 85% 20%, rgba(74,143,255,0.12), transparent 60%), linear-gradient(180deg, #0B1F3A 0%, #091A33 60%, #071226 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <PremiumNavbar />

      <main className="relative z-10 flex flex-1 flex-col">
        {/* ============================================================
           HERO SECTION
           ============================================================ */}
        <section 
          className="relative flex w-full flex-col overflow-hidden justify-center min-h-[85vh] lg:h-[88vh] lg:min-h-[620px] lg:max-h-[820px] pt-28 pb-10"
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            mouseX.set((event.clientX - rect.left) / rect.width);
            mouseY.set((event.clientY - rect.top) / rect.height);
          }}
        >
          {/* Interactive mouse glow */}
          <motion.div className="pointer-events-none absolute inset-0 -z-10" style={{ background: glowBackground }} />

          {/* Animated moving background grid */}
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

          {/* UPTRIX brand watermark */}
          <p className="pointer-events-none absolute left-1/2 top-[52%] -z-20 -translate-x-1/2 -translate-y-1/2 text-center font-heading text-[15vw] leading-none font-bold tracking-[0.22em] text-white/[0.02] blur-[0.2px] md:text-[9.5rem]">
            UPTRIX
          </p>

          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left Side: Typography and Actions */}
            <motion.div
              className="relative max-w-2xl text-center lg:text-left"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {/* Category Badge */}
              <motion.div
                custom={0}
                variants={textVariants}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#79ABFF]/20 bg-[#0C2C57]/42 px-3.5 py-1 text-xs tracking-[0.2em] text-[#CFE3FF]/85 uppercase backdrop-blur-md"
              >
                <IconComp size={11} className="text-[#79ABFF]" />
                <span>{solution.badge}</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                custom={0.08}
                variants={textVariants}
                className="font-heading text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-5xl md:text-[clamp(56px,5vw,78px)]"
              >
                {heroContent.line1} <br />
                {heroContent.line2}{" "}
                <motion.span
                  className="relative inline-flex items-center rounded-2xl border border-[#87B4FF]/30 bg-[#7CB0FF]/12 px-3 py-1 text-[#D8E8FF] shadow-[0_8px_24px_rgba(0,102,255,0.18)]"
                  animate={{ boxShadow: ["0 8px 24px rgba(0,102,255,0.18)", "0 10px 36px rgba(0,102,255,0.3)", "0 8px 24px rgba(0,102,255,0.18)"] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: EASE }}
                >
                  {heroContent.pillText}
                </motion.span>
              </motion.h1>

              {/* Supporting paragraph */}
              <motion.p
                custom={0.16}
                variants={textVariants}
                className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 mx-auto lg:mx-0"
              >
                {solution.heroDescription}
              </motion.p>

              {/* Two CTA Buttons */}
              <motion.div 
                custom={0.24} 
                variants={textVariants} 
                className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
              >
                <Link
                  href="/contact"
                  className="shine-sweep will-gpu group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-5 py-3 font-heading text-xs font-semibold text-white shadow-[0_12px_32px_rgba(0,102,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#86B6FF] hover:shadow-[0_16px_40px_rgba(0,102,255,0.38)]"
                >
                  Get Growth Roadmap
                  <ArrowRight size={14} />
                </Link>
                <a
                  href="#problems"
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 font-heading text-xs font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white hover:-translate-y-0.5"
                >
                  Explore System
                  <ChevronRight size={14} />
                </a>
              </motion.div>

              {/* Trust Section */}
              <motion.div 
                custom={0.32} 
                variants={textVariants} 
                className="mt-8 flex flex-col items-center gap-5 sm:flex-row justify-center lg:justify-start"
              >
                <div className="flex items-center">
                  {AVATARS.map((src, index) => (
                    <span
                      key={src}
                      className="-ml-2 first:ml-0 inline-block h-9.5 w-9.5 overflow-hidden rounded-full border-2 border-[#0B1F3A] shadow-md"
                    >
                      <span
                        className="block h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${src})`, zIndex: AVATARS.length - index }}
                      />
                    </span>
                  ))}
                </div>
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-3 w-3 fill-[#FFBA00]" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs leading-normal text-white/65">
                    Used by startups, D2C, healthcare & enterprise companies.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side: Interactive Showcase & Metric Cards */}
            <motion.div
              className="relative mx-auto w-full max-w-md pb-4 lg:justify-self-end mt-10 lg:mt-0"
              style={{ x: parallaxX, y: parallaxY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              {/* Large floating showcase panel */}
              <motion.article
                className="relative overflow-hidden rounded-[1.8rem] border border-white/14 bg-white/[0.06] p-3 shadow-[0_24px_70px_rgba(3,9,21,0.55)] backdrop-blur-xl"
                style={{ rotate: rotateCard }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: EASE }}
              >
                {/* Animated border overlay */}
                <motion.div
                  className="pointer-events-none absolute -inset-[1px] rounded-[1.8rem] opacity-40"
                  style={{ background: "linear-gradient(120deg, rgba(0,102,255,0.2), rgba(255,255,255,0.03), rgba(0,102,255,0.18))" }}
                />
                <div
                  className="h-[17.5rem] w-full rounded-[1.2rem] bg-cover bg-center transition-transform duration-700 hover:scale-[1.015]"
                  style={{
                    backgroundImage: `url(${heroContent.mockupImage})`,
                  }}
                />
                <div className="pointer-events-none absolute inset-3 rounded-[1.2rem] bg-gradient-to-t from-[#071022]/80 via-transparent to-transparent" />
              </motion.article>

              {/* Floating Metric Card 1 (Left Side) - Sized down & kept inside borders */}
              <motion.article
                className="absolute -left-6 top-8 w-44 overflow-hidden rounded-2xl border border-[#6EA6FF]/25 bg-[linear-gradient(155deg,rgba(18,43,82,0.9),rgba(8,21,43,0.78))] p-4 shadow-[0_12px_32px_rgba(2,9,22,0.45),0_4px_14px_rgba(0,102,255,0.1)] ring-1 ring-inset ring-white/6 backdrop-blur-2xl sm:w-50"
                style={{ x: useTransform(parallaxX, (v) => v * -0.6), y: useTransform(parallaxY, (v) => v * 0.5) }}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                whileHover={{ y: -3, scale: 1.015 }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_12%,rgba(255,255,255,0.1),transparent_48%),radial-gradient(circle_at_82%_14%,rgba(0,102,255,0.18),transparent_46%)]" />
                <div className="relative z-10 leading-snug">
                  <p className="text-[9px] font-semibold tracking-wider text-[#A8C9FF]/75 uppercase">
                    {heroContent.card1Lbl}
                  </p>
                  <p className="mt-1 font-heading text-[1.65rem] font-bold text-white leading-none">
                    {heroContent.card1Val}
                  </p>
                </div>
              </motion.article>

              {/* Floating Metric Card 2 (Right Side) - Sized down & kept inside borders */}
              <motion.article
                className="absolute -right-6 bottom-10 w-42 overflow-hidden rounded-2xl border border-[#6EA6FF]/25 bg-[linear-gradient(155deg,rgba(18,43,82,0.9),rgba(8,21,43,0.78))] p-4 shadow-[0_12px_32px_rgba(2,9,22,0.45),0_4px_14px_rgba(0,102,255,0.1)] ring-1 ring-inset ring-white/6 backdrop-blur-2xl sm:w-46"
                style={{ x: useTransform(parallaxX, (v) => v * 0.5), y: useTransform(parallaxY, (v) => v * -0.6) }}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                whileHover={{ y: -3, scale: 1.015 }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_12%,rgba(255,255,255,0.1),transparent_48%),radial-gradient(circle_at_82%_14%,rgba(0,102,255,0.18),transparent_46%)]" />
                <div className="relative z-10 leading-snug">
                  <p className="text-[9px] font-semibold tracking-wider text-[#A8C9FF]/75 uppercase">
                    {heroContent.card2Lbl}
                  </p>
                  <p className="mt-1 font-heading text-[1.65rem] font-bold text-white leading-none">
                    {heroContent.card2Val}
                  </p>
                </div>
              </motion.article>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
           PROBLEM SECTION
           ============================================================ */}
        <section id="problems" className="px-6 py-14 border-t border-white/[0.04] bg-[#091a33]/25 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease: EASE }}
              >
                <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
                  Market Friction
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-white md:text-5xl">
                  Is your business facing these growth bottlenecks?
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/70">
                  Most teams try to patch marketing bottlenecks with fragmented tools and ad-hoc tactics. We help you replace leaks with unified growth systems.
                </p>
              </motion.div>

              <div className="space-y-6">
                {solution.problems.map((problem, i) => (
                  <motion.div
                    key={problem.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1F3D]/65 p-6 shadow-md backdrop-blur-md"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/15">
                        <XCircle size={20} />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-white">
                          {problem.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-white/68">
                          {problem.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           OUR SYSTEM Section
           ============================================================ */}
        <section className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-6">
                {solution.systemSolutions.map((sys, i) => (
                  <motion.div
                    key={sys.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A234A]/60 p-6 shadow-md backdrop-blur-md"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0066FF]/20 text-[#8FB8FF] border border-[#0066FF]/35">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-white">
                          {sys.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-white/68">
                          {sys.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease: EASE }}
              >
                <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
                  Our System
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-white md:text-5xl">
                  Built to scale revenue by the numbers.
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/70">
                  Instead of manual tasks and messy databases, we deploy custom pipeline modules that connect traffic directly to closed won pipeline.
                </p>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#86B3FF] hover:text-white"
                  >
                    Discuss System Implementation
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================
           PROCESS TIMELINE
           ============================================================ */}
        <section className="px-6 py-14 border-t border-white/[0.04] bg-[#091a33]/15 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl mb-12">
              <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
                Methodology
              </p>
              <h2 className="mt-4 font-heading text-3xl font-semibold text-white md:text-5xl">
                Implementation Workflow
              </h2>
              <p className="mt-4 text-sm text-white/68">
                A highly structured 4-phase deployment playbook designed to transition operations without breaking existing marketing velocity.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {solution.processSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#081728]/70 p-6 shadow-[0_12px_36px_rgba(0,0,0,0.15)] backdrop-blur-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#5B8EFF]/30 bg-[#0B315F]/80 text-xs font-semibold text-[#D9E8FF] shadow-[0_8px_20px_rgba(0,102,255,0.12)]">
                    {step.step}
                  </div>
                  <h3 className="mt-5 font-heading text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-white/70">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           FEATURES SECTION
           ============================================================ */}
        <section className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl mb-12">
              <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
                System Core
              </p>
              <h2 className="mt-4 font-heading text-3xl font-semibold text-white md:text-5xl">
                What's included in the system
              </h2>
              <p className="mt-4 text-sm text-white/68">
                We bundle enterprise-grade technology and dedicated expertise to remove key operational constraints.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {solution.featureCards.map((feat, i) => (
                <motion.article
                  key={feat.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className="group relative overflow-hidden rounded-3xl border border-white/12 bg-[#0B1F3D]/80 shadow-[0_24px_65px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={feat.image}
                      alt={feat.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3D] via-transparent to-transparent" />
                  </div>
                  <div className="relative p-6">
                    <h3 className="font-heading text-lg font-semibold text-white transition-colors group-hover:text-[#A8C9FF]">
                      {feat.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-white/70">
                      {feat.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           ROI STATS & CASE STUDY
           ============================================================ */}
        <section className="px-6 py-14 border-t border-white/[0.04] bg-[#091a33]/15 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            {/* ROI Grid */}
            <div className="grid gap-6 sm:grid-cols-2 mb-16">
              {solution.roiStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className="rounded-3xl border border-white/10 bg-[#0A224D]/60 p-8 text-center backdrop-blur-md shadow-lg"
                >
                  <p className="font-heading text-5xl font-semibold text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm text-[#A8C9FF] font-medium tracking-wide uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Case Study Details */}
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative overflow-hidden rounded-3xl border border-white/14 bg-[#08192A]/85 p-8 shadow-xl backdrop-blur-2xl"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,180,255,0.12),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(0,102,255,0.1),transparent_50%)]" />
                <div className="relative z-10">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9BC2FF]">
                    Case Study
                  </span>
                  <h3 className="mt-3 font-heading text-2xl font-semibold text-white md:text-3xl">
                    {solution.caseStudy.title}
                  </h3>
                  <p className="mt-4 text-xs leading-relaxed text-white/70">
                    {solution.caseStudy.subtitle}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {solution.caseStudy.metrics.map((m) => (
                      <div key={m.label} className="rounded-2xl border border-white/[0.08] bg-[#0A264F]/80 p-4">
                        <p className="font-heading text-2xl font-semibold text-white">{m.value}</p>
                        <p className="mt-1 text-[10px] text-white/60 leading-tight">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <blockquote className="mt-6 border-l-2 border-[#8CB8FF]/40 bg-white/[0.02] p-4 text-xs italic text-white/80 rounded-r-xl">
                    “{solution.caseStudy.quote}”
                  </blockquote>
                  <p className="mt-3 text-xs font-semibold text-[#86B3FF]">
                    {solution.caseStudy.client}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="relative overflow-hidden rounded-3xl border border-white/12 shadow-xl aspect-[4/3]"
              >
                <Image
                  src={solution.caseStudy.image}
                  alt={solution.caseStudy.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================
           TESTIMONIALS SECTION
           ============================================================ */}
        <section className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
              Feedback
            </p>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-white md:text-5xl">
              Client Testimonials
            </h2>

            <div className="mt-12 space-y-6">
              {solution.testimonials.map((t, i) => (
                <motion.div
                  key={t.author}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B234A]/40 p-8 shadow-md backdrop-blur-md"
                >
                  <p className="font-heading text-lg italic text-white/90 leading-relaxed md:text-xl">
                    “{t.quote}”
                  </p>
                  <div className="mt-6">
                    <p className="font-heading text-sm font-semibold text-[#86B3FF]">
                      {t.author}
                    </p>
                    <p className="mt-1 text-xs text-white/50">
                      {t.role} • {t.company}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           FAQ SECTION
           ============================================================ */}
        <section className="px-6 py-14 border-t border-white/[0.04] bg-[#091a33]/15 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
                  Q&A
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold text-white md:text-5xl leading-tight">
                  Frequently Asked Questions
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/70">
                  Got questions about onboarding, tools integrations, and roadmap delivery? We've compiled responses to our most common client queries.
                </p>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#86B3FF] hover:text-white"
                  >
                    Contact support team
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              <div>
                <PremiumAccordion items={solution.faqItems as PremiumAccordionItem[]} />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           CTA SECTION
           ============================================================ */}
        <section className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28 text-center border-t border-white/[0.04]">
          {/* Intense center ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[350px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-core/25 opacity-70 blur-[100px]" />
          
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-semibold text-white md:text-5xl leading-tight">
              Ready to implement a premium growth architecture?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              Get in touch with our solutions architects to mapping out a custom category positioning and execution roadmap.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="shine-sweep w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#1552B6] border border-[#4D8EFF] px-7 py-4 font-heading text-sm font-semibold text-white shadow-[0_16px_44px_rgba(0,102,255,0.36)] transition-all hover:border-[#7FAEFF] hover:shadow-[0_20px_54px_rgba(0,102,255,0.48)]"
              >
                Schedule Architecture Call
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================
           RELATED SOLUTIONS
           ============================================================ */}
        <section className="px-6 py-14 border-t border-white/[0.04] bg-[#071324]/40 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl mb-8">
              Explore Alternative Solutions
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedSolutions.map((sol) => {
                const RelatedIcon = ICON_MAP[sol.iconName] || TrendingUp;
                return (
                  <Link
                    href={`/solutions/${sol.slug}`}
                    key={sol.slug}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1F3D]/45 p-6 transition-all duration-300 hover:bg-[#0B254E]/65 hover:border-[#8CB8FF]/25 hover:shadow-lg"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.04] text-[#86B3FF] group-hover:bg-[#0066FF]/20 group-hover:text-white transition-colors">
                      <RelatedIcon size={18} />
                    </div>
                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-white/45">
                      {sol.subtitle}
                    </p>
                    <h3 className="mt-1 font-heading text-base font-semibold text-white transition-colors group-hover:text-[#A8C9FF]">
                      {sol.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/60">
                      {sol.description.substring(0, 110)}...
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-[#86B3FF]">
                      <span>Learn More</span>
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <EnterpriseFooter />
      </main>
    </div>
  );
}
