"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PortfolioCta() {


  return (
    <section className="relative z-10 px-6 py-24 md:px-10 bg-[#040C1A]">
      {/* Visual background lights */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[32rem] w-[50rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.12),transparent_65%)] blur-3xl"
        style={{ opacity: 0.8 }}
      />

      <div className="mx-auto w-full max-w-5xl">
        <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-white/[0.03] px-6 py-12 text-center shadow-2xl backdrop-blur-xl md:px-12 md:py-16">
          {/* Internal gradient border flow */}
          <motion.div
            className="pointer-events-none absolute -inset-[1px] rounded-[2.5rem] opacity-35"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: EASE }}
            style={{
              background: "linear-gradient(120deg, rgba(0,102,255,0.2), rgba(255,255,255,0.04), rgba(0,102,255,0.18))"
            }}
          />
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_20%,rgba(0,102,255,0.16),transparent_55%)]" />

          {/* Tag */}
          <span className="text-xs font-semibold tracking-[0.25em] text-[#70A8FF] uppercase">
            Let&apos;s Build Your Growth Infrastructure
          </span>

          {/* Title */}
          <h2 className="mx-auto mt-6 max-w-2xl font-heading text-4xl font-semibold leading-tight text-white md:text-5xl">
            Ready to scale your business?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
            Deploy an optimized AI SEO roadmap, automate paid campaigns, and scale conversion pipelines with our certified marketing teams.
          </p>

          {/* Small list of value adds */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#70A8FF]" /> 90-Day Conversion Scaling
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#70A8FF]" /> Full Funnel Accountability
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#70A8FF]" /> No Long-Term Lock-ins
            </span>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="shine-sweep group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-8 py-4.5 font-heading text-sm font-semibold text-white shadow-[0_16px_44px_rgba(0,102,255,0.42)] transition-all duration-300 hover:border-[#A7CBFF] cursor-pointer"
            >
              Book Free Strategy Call
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
