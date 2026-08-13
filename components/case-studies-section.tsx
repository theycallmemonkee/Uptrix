"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const CASE_STUDIES = [
  {
    industry: "Real Estate, Canada",
    narrative:
      "Enquiries went cold before anyone called back. We rebuilt the follow up, connected it to the ad accounts, then scaled spend once tracking held.",
    outcome: "Pipeline stayed clean as spend grew.",
    accent: "#2563EB",
  },
  {
    industry: "D2C Fashion",
    narrative:
      "Ad costs climbed while sales stayed flat. We rebuilt positioning and creative first, then landing pages, then retargeting.",
    outcome: "3.21X ROAS on rebuilt Meta campaigns.",
    accent: "#79ABFF",
  },
  {
    industry: "Health Technology",
    narrative:
      "Search traffic was flat and content had no plan behind it. We rebuilt the site architecture around real search intent, then wrote against it.",
    outcome: "Organic traffic and ranked keywords both grew.",
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

      {/* Narrative */}
      <p className="relative mt-4 text-[0.8125rem] leading-[1.8] text-white/52 flex-1">
        {study.narrative}
      </p>

      {/* Outcome */}
      <p
        className="relative mt-5 font-heading text-sm font-semibold leading-snug"
        style={{ color: study.accent }}
      >
        {study.outcome}
      </p>
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
            Proven impact
          </motion.p>

          <motion.h2
            className="mt-4 font-heading text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          >
            <span className="text-white">REAL WORK.</span>
            <br />
            <span className="text-[#79ABFF]">REAL NUMBERS.</span>
          </motion.h2>

          <motion.p
            className="mt-5 text-[0.9375rem] leading-[1.75] text-white/55"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.14, ease: EASE }}
          >
            Every number below came from a specific engagement, not an average. Results vary by business, budget and market, so we do not promise figures. What we do promise is that you will see the ones that did not move.
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
