"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const CASE_STUDIES = [
  {
    industry: "Real Estate",
    headline: "From 3 leads a month to a consistent pipeline",
    narrative:
      "A regional property developer was generating around 3 inbound leads per month through an outdated website and sporadic social posts. Within 90 days we rebuilt their conversion architecture, launched a targeted content and outreach programme and implemented a follow-up sequence. Monthly inbound leads reached 40 within the quarter.",
    highlights: ["40 inbound leads/month", "12x increase", "90 days"],
    accent: "#2563EB",
  },
  {
    industry: "D2C Fashion",
    headline: "3.2x ROAS on Meta within 60 days",
    narrative:
      "A fashion brand was running Meta campaigns with creative that was not built for conversion. We audited the account, rebuilt the creative strategy around real customer language, restructured the funnel and relaunched. ROAS moved from 0.9x to 3.2x within 60 days.",
    highlights: ["3.2x ROAS", "From 0.9x", "60 days"],
    accent: "#79ABFF",
  },
  {
    industry: "Healthcare Tech",
    headline: "Positioning and pipeline for a regulated market",
    narrative:
      "A healthcare technology business had a strong product but was not communicating its value clearly in a regulated market. We redefined the positioning, rebuilt the website messaging and launched a compliant outreach programme targeting procurement teams. Within 120 days they had 14 qualified sales conversations booked.",
    highlights: ["14 qualified meetings", "120 days", "Regulated market"],
    accent: "#38BDF8",
  },
] as const;

function CaseStudyCard({ study, index }: { study: typeof CASE_STUDIES[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.article
      ref={ref}
      className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 transition-all duration-500 hover:border-white/[0.14] hover:bg-white/[0.055] hover:shadow-[0_20px_56px_rgba(0,0,0,0.3)]"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,rgba(0,102,255,0.08),transparent_55%)]" />

      {/* Industry tag */}
      <span
        className="inline-block rounded-md px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] uppercase"
        style={{
          background: `${study.accent}22`,
          color: study.accent,
          border: `1px solid ${study.accent}33`,
        }}
      >
        {study.industry}
      </span>

      {/* Headline */}
      <h3 className="relative mt-4 font-heading text-lg font-semibold leading-snug text-white">
        {study.headline}
      </h3>

      {/* Narrative */}
      <p className="relative mt-3 text-[0.8125rem] leading-[1.8] text-white/52 flex-1">
        {study.narrative}
      </p>

      {/* Results strip */}
      <div className="relative mt-5 flex flex-wrap gap-2">
        {study.highlights.map((h) => (
          <span
            key={h}
            className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 font-heading text-[11px] font-semibold text-white/75"
          >
            {h}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export function CaseStudiesSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.3 });

  return (
    <section className="relative z-10 w-full overflow-hidden px-6 py-20 md:px-10 md:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.07),transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headingRef} className="mx-auto max-w-xl text-center">
          <motion.p
            className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE }}
          >
            Real results
          </motion.p>

          <motion.h2
            className="mt-4 font-heading text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          >
            <span className="text-white">REAL BUSINESSES</span>
            <br />
            <span className="text-[#79ABFF]">REAL GROWTH</span>
          </motion.h2>

          <motion.p
            className="mt-5 text-[0.9375rem] leading-[1.75] text-white/55 lg:whitespace-nowrap"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.14, ease: EASE }}
          >
            Anonymised to protect client confidentiality. The numbers are real.
          </motion.p>
        </div>

        {/* Case study cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyCard key={study.industry} study={study} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <Link
            href="/portfolio"
            onClick={() => window.scrollTo(0, 0)}
            className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.13] bg-white/[0.04] px-6 py-3 font-heading text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/22 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_8px_28px_rgba(0,0,0,0.22)]"
          >
            See The Results
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
