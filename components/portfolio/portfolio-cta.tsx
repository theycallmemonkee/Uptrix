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
          <span className="text-xs font-semibold tracking-[0.22em] text-[#70A8FF] uppercase">
            LET'S BUILD YOUR GROWTH ENGINE
          </span>

          {/* Title */}
          <h2 className="mx-auto mt-5 max-w-2xl font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-white">
            Ready to Stop Guessing and Start Growing?
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-base leading-[1.75] text-white/68">
            Tell us where your growth is stuck. We will show you exactly which system fixes it and how it works, before you commit to anything.
          </p>

          {/* Small list of value adds */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#70A8FF]" /> No commitment
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#70A8FF]" /> Honest first read
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#70A8FF]" /> No long contracts
            </span>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="shine-sweep group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-8 py-4 font-heading text-sm font-semibold text-white shadow-[0_16px_44px_rgba(0,102,255,0.42)] transition-all duration-300 hover:border-[#A7CBFF] cursor-pointer"
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
