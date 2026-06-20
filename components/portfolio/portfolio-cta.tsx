"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

function FloatingParticles({ count = 10 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="absolute bottom-4 rounded-full bg-[#4D8EFF]"
          style={{
            left: `${5 + i * (90 / count)}%`,
            width: `${1 + (i % 3) * 0.5}px`,
            height: `${1 + (i % 3) * 0.5}px`,
            opacity: 0,
            animation: `float-particle ${3.5 + (i % 4) * 0.9}s ease-in-out ${i * 0.45}s infinite`,
            transform: "translateZ(0)",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}

export function PortfolioCta() {
  return (
    <motion.section
      className="relative z-10 px-6 pt-10 pb-20 md:px-10 md:pt-14 md:pb-24 bg-[#020617]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[28rem] w-[44rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.1),transparent_65%)] blur-3xl" />

      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] px-6 py-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl md:px-12 md:py-16 transition-[border-color,box-shadow] duration-500 hover:border-[#4D8EFF]/22 hover:shadow-[0_24px_70px_rgba(0,0,0,0.32),0_0_80px_rgba(0,102,255,0.07)]"
        >
          {/* Animated gradient background */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[2rem]"
            style={{
              background: "linear-gradient(135deg, rgba(0,20,80,0.32) 0%, rgba(0,102,255,0.045) 50%, rgba(0,25,90,0.28) 100%)",
              backgroundSize: "200% 200%",
              animation: "gradient-drift 10s ease infinite",
            }}
          />

          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_20%,rgba(0,102,255,0.09),transparent_55%)]" />

          {/* Floating particles */}
          <FloatingParticles count={10} />

          <span className="relative z-10 text-[11px] font-semibold tracking-[0.2em] text-[#79ABFF] uppercase">
            LET'S BUILD YOUR GROWTH ENGINE
          </span>

          <h2 className="relative z-10 mx-auto mt-5 max-w-2xl font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.02em] text-white">
            Ready to Stop Guessing and Start Growing?
          </h2>

          <p className="relative z-10 mx-auto mt-5 max-w-lg text-[0.9375rem] leading-[1.75] text-white/58">
            Tell us where your growth is stuck. We will show you exactly which system fixes it and how it works, before you commit to anything.
          </p>

          <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs text-white/52">
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

          <div className="relative z-10 mt-10 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <Link
                href="/contact"
                className="shine-sweep group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF]/80 bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-8 py-4 font-heading text-sm font-semibold text-white shadow-[0_14px_36px_rgba(0,102,255,0.3)] transition-[box-shadow] duration-300 hover:border-[#A7CBFF] hover:shadow-[0_18px_48px_rgba(0,102,255,0.46)]"
              >
                Book Strategy Call
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </motion.section>
  );
}
