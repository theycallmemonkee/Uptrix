"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const SOLUTIONS = [
  {
    problem: "We need customers, but nobody knows we exist.",
    name: "DEMAND GENERATION",
    description:
      "We build the organic, content and outreach engine that fills your pipeline with the right people.",
    services: ["SEO & Content", "Email Outreach", "Thought Leadership", "PR & Link Building"],
    href: "/solutions/demand-generation-system",
    accent: "rgba(0,102,255,0.12)",
  },
  {
    problem: "We are spending on ads but the returns are not there.",
    name: "PAID GROWTH",
    description:
      "We build and manage paid campaigns that turn ad spend into predictable, measurable revenue.",
    services: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Retargeting"],
    href: "/solutions/paid-growth-engine",
    accent: "rgba(121,171,255,0.10)",
  },
  {
    problem: "Our website gets traffic but it does not convert.",
    name: "CONVERSION WEBSITE",
    description:
      "We redesign, rebuild and optimise websites for one job: turning visitors into enquiries.",
    services: ["Website Design", "CRO", "Landing Pages", "A/B Testing"],
    href: "/solutions/conversion-website-system",
    accent: "rgba(0,102,255,0.12)",
  },
  {
    problem: "We are not clear on our positioning or where to start.",
    name: "GROWTH FOUNDATION",
    description:
      "We define your positioning, build your growth plan and give you the 90-day roadmap to follow.",
    services: ["Brand Strategy", "Market Research", "Go-To-Market", "Growth Roadmap"],
    href: "/solutions/growth-foundation-system",
    accent: "rgba(121,171,255,0.10)",
  },
  {
    problem: "We want to use AI but do not know where it fits.",
    name: "AI MARKETING",
    description:
      "We identify where AI creates real leverage in your marketing and build those workflows into your business.",
    services: ["AI Content", "Automated Outreach", "AI Ad Creative", "Workflow Automation"],
    href: "/solutions/ai-marketing-system",
    accent: "rgba(0,102,255,0.12)",
  },
  {
    problem: "Growth is happening but operations cannot keep up.",
    name: "REVENUE OPERATIONS",
    description:
      "We build the ops layer that lets your business scale without chaos: CRM, reporting, process, automation.",
    services: ["CRM Setup", "Revenue Reporting", "Process Design", "Automation"],
    href: "/solutions/revenue-operations-system",
    accent: "rgba(121,171,255,0.10)",
  },
] as const;

function SolutionCard({ solution, index }: { solution: typeof SOLUTIONS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.article
      ref={ref}
      className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-500 hover:border-[#79ABFF]/22 hover:bg-white/[0.055] hover:shadow-[0_16px_48px_rgba(0,0,0,0.28),0_0_40px_rgba(0,102,255,0.08)]"
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.58, delay: (index % 3) * 0.07, ease: EASE }}
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 20% 20%, ${solution.accent}, transparent 60%)` }}
      />

      {/* Problem quote */}
      <p className="relative text-[0.8125rem] leading-[1.65] text-white/45 italic">
        &ldquo;{solution.problem}&rdquo;
      </p>

      {/* Solution name */}
      <p className="relative mt-4 font-heading text-[11px] font-bold tracking-[0.18em] text-[#79ABFF] uppercase">
        {solution.name}
      </p>

      {/* Description */}
      <p className="relative mt-2 text-[0.875rem] leading-[1.7] text-white/75 flex-1">
        {solution.description}
      </p>

      {/* Services */}
      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {solution.services.map((s) => (
          <span
            key={s}
            className="rounded-md border border-white/[0.09] bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-white/50"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Link */}
      <Link
        href={solution.href}
        className="relative mt-5 inline-flex items-center gap-1 font-heading text-xs font-semibold text-[#79ABFF] hover:text-white transition-colors duration-200"
      >
        Learn more
        <ArrowUpRight size={12} />
      </Link>
    </motion.article>
  );
}

export function SevenSolutionsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.3 });

  return (
    <section className="relative z-10 w-full overflow-hidden px-6 py-20 md:px-10 md:py-24">
      {/* Background accents */}
      <div className="pointer-events-none absolute -left-20 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.07),transparent_65%)] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(121,171,255,0.06),transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <motion.p
            className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE }}
          >
            Seven solutions
          </motion.p>

          <motion.h2
            className="mt-4 font-heading text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          >
            <span className="text-white">WHICH PROBLEM</span>
            <br />
            <span className="text-[#79ABFF]">ARE WE SOLVING FOR YOU?</span>
          </motion.h2>

          <motion.p
            className="mt-5 text-[0.9375rem] leading-[1.75] text-white/55 lg:whitespace-nowrap"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.14, ease: EASE }}
          >
            Find the challenge that sounds like yours. Every solution is built around a real growth problem, not a list of services.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((solution, i) => (
            <SolutionCard key={solution.name} solution={solution} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
