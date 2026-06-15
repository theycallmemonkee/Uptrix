"use client";

import { motion } from "framer-motion";

const INDUSTRIES = [
  "D2C and Ecommerce",
  "SaaS and Startups",
  "Local and Service Businesses",
  "B2B and Professional Services",
  "Healthcare",
  "Fintech",
  "Retail",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function IndustriesStrip() {
  return (
    <section className="relative z-10 w-full px-6 pb-24 pt-6 md:px-10 md:pb-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="text-center">
          <p className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase">
            WHO WE WORK WITH
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-white">
            Growth Systems for Every Kind of Business
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-[1.75] text-white/68">
            The systems adapt to your business. The goal stays the same. More customers, more revenue, less chaos.
          </p>
        </div>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {INDUSTRIES.map((industry) => (
            <span
              key={industry}
              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/75 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              {industry}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
