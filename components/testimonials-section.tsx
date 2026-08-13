"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const TESTIMONIALS = [
  {
    quote:
      "We had tried two agencies before Uptrix. Both ran campaigns that looked good on paper but brought in the wrong people. Uptrix was the first team that asked what a good lead looks like before touching the budget.",
    name: "Alex R.",
    role: "Co-Founder",
    company: "B2B SaaS",
    initials: "AR",
    accent: "#2563EB",
  },
  {
    quote:
      "The clarity we got in the first two weeks was worth the engagement on its own. We finally understood who we were talking to, why our messaging was not landing and what to fix first. The results followed.",
    name: "Priya S.",
    role: "Head of Growth",
    company: "D2C Brand",
    initials: "PS",
    accent: "#79ABFF",
  },
  {
    quote:
      "I was sceptical about a fractional model but the Uptrix team was more embedded than any full-time hire I have made. They knew our numbers and owned the outcomes. Best quarter in the company's history.",
    name: "James O.",
    role: "Founder",
    company: "Service Business",
    initials: "JO",
    accent: "#38BDF8",
  },
] as const;

function TestimonialCard({ t, index }: { t: typeof TESTIMONIALS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.article
      ref={ref}
      className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 transition-all duration-500 hover:border-white/[0.13] hover:bg-white/[0.055]"
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
    >
      {/* Large quote mark */}
      <div
        aria-hidden
        className="pointer-events-none mb-4 font-heading text-6xl font-bold leading-none text-[#79ABFF]/20 select-none"
      >
        &ldquo;
      </div>

      {/* Quote */}
      <p className="flex-1 text-[0.875rem] leading-[1.85] text-white/70">
        {t.quote}
      </p>

      {/* Attribution */}
      <div className="mt-6 flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${t.accent}66, ${t.accent}33)`, border: `1px solid ${t.accent}44` }}
        >
          {t.initials}
        </div>
        <div>
          <p className="font-heading text-sm font-semibold text-white">{t.name}</p>
          <p className="text-[11px] text-white/45">{t.role} &middot; {t.company}</p>
        </div>
      </div>
    </motion.article>
  );
}

export function TestimonialsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.3 });

  return (
    <section className="relative z-10 w-full overflow-hidden px-6 py-20 md:px-10 md:py-24">
      <div className="pointer-events-none absolute left-1/4 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.07),transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headingRef} className="mx-auto max-w-xl text-center">
          <motion.p
            className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE }}
          >
            Testimonials
          </motion.p>

          <motion.h2
            className="mt-4 font-heading text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          >
            <span className="text-white">WHAT CLIENTS SAY</span>
            <br />
            <span className="text-[#79ABFF]">AFTER 90 DAYS</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
