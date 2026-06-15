"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Props = {
  title: string;
  description: string;
};

export function FinalCta({ title, description }: Props) {
  return (
    <section className="px-6 pb-20 pt-8 md:px-10 md:pb-24 md:pt-12">
      <motion.div
        className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[1.5rem] border border-white/12 bg-[linear-gradient(140deg,#0E2D55_0%,#0D2950_44%,#123866_100%)] px-6 py-10 shadow-[0_24px_80px_rgba(3,10,25,0.48)] md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:px-10 md:py-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_24%,rgba(0,102,255,0.28),transparent_52%),radial-gradient(760px_circle_at_85%_0%,rgba(176,211,255,0.18),transparent_46%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_100%)]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>

        <div className="relative text-center md:text-left">
          <motion.h3
            className="max-w-3xl font-heading text-[clamp(1.75rem,3.5vw,3rem)] leading-tight font-semibold tracking-[-0.02em] text-white"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-[0.9375rem] leading-[1.8] text-white/68 md:mx-0"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            {description}
          </motion.p>
        </div>

        <div className="relative mt-8 inline-flex justify-center md:mt-0 md:justify-end">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-6 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_16px_40px_rgba(0,102,255,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A9CCFF]"
          >
            <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_58%)]" />
            Start your premium growth journey
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
