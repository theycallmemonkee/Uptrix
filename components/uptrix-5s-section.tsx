"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Fragment, useRef } from "react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const STAGES = [
  {
    number: "01",
    code: "SCAN",
    title: "Find where growth is stuck or where the opportunity is",
    description:
      "We audit where you are now and where growth is being lost or left on the table.",
  },
  {
    number: "02",
    code: "STRATEGY",
    title: "Set the positioning, message and plan",
    description:
      "We settle what you stand for, who you are for, and why anyone should choose you.",
  },
  {
    number: "03",
    code: "SEQUENCE",
    title: "Map the channels and priorities for your stage",
    description:
      "We decide what to build and in what order. Different for a startup than an SME.",
  },
  {
    number: "04",
    code: "SHIP",
    title: "Build, launch and track the work",
    description:
      "We build the pages, ads, content and tracking, put them live, and measure from day one.",
  },
  {
    number: "05",
    code: "SCALE",
    title: "Measure, improve and reinvest what works",
    description:
      "We review on a 90 day cycle and reinvest in what works, so each quarter starts ahead of the last.",
  },
];

function StageCard({ stage, index }: { stage: typeof STAGES[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col rounded-2xl border border-white/[0.09] bg-white/[0.035] p-6 backdrop-blur-sm transition-colors duration-500 hover:border-[#79ABFF]/25 hover:bg-white/[0.055]"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,rgba(0,102,255,0.1),transparent_60%)]" />

      <div className="flex items-start justify-between">
        <span className="font-heading text-[11px] font-semibold tracking-[0.2em] text-[#79ABFF]/60 uppercase">
          {stage.number}
        </span>
        <div className="h-1.5 w-1.5 rounded-full bg-[#79ABFF]/40" />
      </div>

      <p className="mt-3 font-heading text-lg font-bold tracking-[0.06em] text-white uppercase">
        {stage.code}
      </p>

      <p className="mt-2 text-[0.8125rem] font-semibold leading-[1.4] text-[#9BC2FF]">
        {stage.title}
      </p>

      <p className="mt-2 text-[0.8125rem] leading-[1.75] text-white/55 flex-1">
        {stage.description}
      </p>
    </motion.div>
  );
}

export function Uptrix5SSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.3 });

  return (
    <section
      id="uptrix-5s"
      className="relative z-10 w-full overflow-hidden px-6 py-20 md:px-10 md:py-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.09),transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headingRef} className="text-center">
          <motion.p
            className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE }}
          >
            How we work
          </motion.p>

          <motion.h2
            className="mt-4 font-heading text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          >
            <span className="text-white">ONE FRAMEWORK,</span>
            <br />
            <span className="text-[#79ABFF]">FROM FIRST IDEA TO SCALE</span>
          </motion.h2>

          <motion.p
            className="mx-auto mt-6 max-w-lg text-[0.9375rem] leading-[1.75] text-white/55"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.14, ease: EASE }}
          >
            Uptrix 5S™ &middot; Scan &rarr; Strategy &rarr; Sequence &rarr; Ship &rarr; Scale
          </motion.p>

          <motion.p
            className="mx-auto mt-4 max-w-2xl text-[0.9375rem] leading-[1.75] text-white/55"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
          >
            Expert led at every stage. Your fractional CMO owns the plan, our growth experts run it. The same five stages whether you are a startup, a scaleup or an SME. We pick up wherever you are today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
          >
            <Link
              href="/uptrix-5s-framework"
              className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-[#79ABFF] transition-colors duration-200 hover:text-white"
            >
              Explore Uptrix 5S
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Stage cards — horizontal flow with arrows on desktop */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-0">
          {STAGES.map((stage, i) => (
            <Fragment key={stage.code}>
              <StageCard stage={stage} index={i} />
              {i < STAGES.length - 1 && (
                <div className="hidden shrink-0 items-center justify-center px-2 lg:flex">
                  <ArrowRight className="h-4 w-4 text-[#79ABFF]/35" aria-hidden />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {/* Support line */}
        <motion.p
          className="mt-10 text-center text-sm leading-[1.75] text-white/45 italic lg:whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Expert led. Your fractional CMO sets the direction, our growth experts run it, with AI supporting behind the scenes.
        </motion.p>

        {/* Fractional CMO block */}
        <motion.div
          className="mx-auto mt-10 max-w-2xl rounded-2xl border border-[#79ABFF]/15 bg-white/[0.03] px-8 py-6 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <p className="font-heading text-[11px] font-semibold tracking-[0.18em] text-[#79ABFF] uppercase">
            Your Fractional CMO
          </p>
          <p className="mt-3 text-[0.9375rem] leading-[1.75] text-white/68">
            A fractional CMO gives you senior marketing leadership without building a senior team around it. Ours arrives with the team already attached. They own your strategy, your numbers and your quarterly plan, and sit with the people executing it.
          </p>
          <Link
            href="#contact"
            className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-[#79ABFF] hover:text-white transition-colors duration-200"
          >
            Learn more about Fractional CMO
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>

        {/* CTA band */}
        <motion.div
          className="mt-12 w-full rounded-2xl border border-white/[0.07] bg-[linear-gradient(135deg,rgba(0,50,160,0.22),rgba(0,102,255,0.08))] px-8 py-8 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <p className="font-heading text-base font-semibold text-white md:text-lg">
            Ready to build your <span className="text-[#79ABFF]">growth function?</span>
          </p>
          <Link
            href="#contact"
            className="shine-sweep group mt-4 inline-flex items-center gap-2 rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-6 py-3 font-heading text-sm font-semibold text-white shadow-[0_10px_28px_rgba(0,102,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_38px_rgba(0,102,255,0.42)]"
          >
            Book a Growth Consultation
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
