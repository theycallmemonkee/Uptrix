"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const SOLUTIONS = [
  {
    problem: "Every agency tells me something different.",
    name: "BRAND & GTM STRATEGY",
    description:
      "We settle what you stand for, who you are for and why anyone should pick you. Then a 90 day roadmap.",
    href: "/solutions/growth-foundation-system",
    accent: "rgba(121,171,255,0.10)",
  },
  {
    problem: "I spend on ads monthly and cannot tell you what I got back.",
    name: "PAID GROWTH ENGINE",
    description:
      "We find what is draining the account, rebuild creative and targeting, then fix the pages traffic lands on.",
    href: "/solutions/paid-growth-engine",
    accent: "rgba(0,102,255,0.12)",
  },
  {
    problem: "My pipeline is empty and referrals are drying up.",
    name: "DEMAND GENERATION",
    description:
      "People searching for what you sell start finding you. Several channels feeding one pipeline, not one bet.",
    href: "/solutions/demand-generation-system",
    accent: "rgba(121,171,255,0.10)",
  },
  {
    problem: "People visit, look around, and leave without a word.",
    name: "CONVERSION WEBSITE",
    description:
      "Your site stops being a brochure. We rebuild the message, flow and speed around one job: getting enquiries.",
    href: "/solutions/conversion-website-system",
    accent: "rgba(0,102,255,0.12)",
  },
  {
    problem: "Leads go cold before anyone calls them.",
    name: "AI LEAD CONVERSION",
    description:
      "The moment someone enquires, they hear back. Warm leads reach your team, cold ones stay in nurture.",
    href: "/solutions/demand-generation-system",
    accent: "rgba(121,171,255,0.10)",
  },
  {
    problem: "Everything takes too long and my team is at capacity.",
    name: "AI MARKETING",
    description:
      "We rebuild the slow parts so a small team ships like a large one, with a specialist on every output.",
    href: "/solutions/ai-marketing-system",
    accent: "rgba(0,102,255,0.12)",
  },
  {
    problem: "Growth is breaking our operations.",
    name: "REVENUE OPERATIONS",
    description:
      "One place where sales and marketing see the same numbers. Leads route themselves, nothing falls between teams.",
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
            Our solutions
          </motion.p>

          <motion.h2
            className="mt-4 font-heading text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          >
            <span className="text-white">ANY GROWTH MARKETING PROBLEM.</span>
            <br />
            <span className="text-[#79ABFF]">ONE GROWTH TEAM.</span>
          </motion.h2>

          <motion.p
            className="mt-5 text-[0.9375rem] leading-[1.75] text-white/55"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.14, ease: EASE }}
          >
            Same capabilities as above, now sorted by the problem they solve. Whatever stage you are at, one of these owns what you are facing right now. Read the seven quotes and start with the one that sounds most like you.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((solution, i) => (
            <SolutionCard key={solution.name} solution={solution} index={i} />
          ))}
        </div>

        {/* Pre grid line + CTA */}
        <motion.div
          className="mx-auto mt-12 max-w-xl text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-[0.9375rem] leading-[1.75] text-white/55">
            Just starting out and none of these sound like you yet? That is the first one. We build the plan before there is anything to fix.
          </p>
          <Link
            href="#contact"
            className="shine-sweep group mt-6 inline-flex items-center gap-2 rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-6 py-3 font-heading text-sm font-semibold text-white shadow-[0_10px_28px_rgba(0,102,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_38px_rgba(0,102,255,0.42)]"
          >
            Not sure where to start? Find My Starting Point
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
