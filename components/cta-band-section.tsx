"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CtaBandSection() {
  return (
    <section className="relative z-10 w-full overflow-hidden px-6 py-20 md:px-10 md:py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent,rgba(0,50,160,0.10),transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.1),transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.025em]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.72, ease: EASE }}
        >
          <span className="text-white">EXPERT LED</span>
          <br />
          <span className="text-[#79ABFF]">GROWTH Marketing</span>
        </motion.h2>

        <motion.p
          className="mt-6 text-[0.9375rem] leading-[1.8] text-white/60 lg:whitespace-nowrap"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
        >
          One team. Full ownership. From the first growth call to the numbers at the end of the quarter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          className="mt-8"
        >
          <Link
            href="#contact"
            className="shine-sweep group inline-flex items-center gap-2 rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-8 py-4 font-heading text-sm font-semibold text-white shadow-[0_14px_40px_rgba(0,102,255,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#86B6FF] hover:shadow-[0_18px_52px_rgba(0,102,255,0.46)]"
          >
            Book a Growth Consultation
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
