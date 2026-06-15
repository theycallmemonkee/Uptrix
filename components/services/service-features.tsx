"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ServiceFeature } from "@/data/services";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  features: ServiceFeature[];
};

export function ServiceFeatures({ features }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase">Core Modules</p>
          <h3 className="mt-4 font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-white">
            Premium capabilities for compounding growth
          </h3>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[#7AAEFF]/18 bg-[#0D2C57]/38 p-4 shadow-[0_16px_44px_rgba(3,10,24,0.34)] backdrop-blur-md transition-all duration-300 hover:border-[#86B6FF]/32"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <motion.div
                className="pointer-events-none absolute inset-[1px] rounded-[1.15rem] border border-white/8"
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
              />
              <div className="pointer-events-none absolute -inset-0.5 rounded-[1.25rem] bg-[linear-gradient(120deg,rgba(122,174,255,0.24),rgba(255,255,255,0.06),rgba(0,102,255,0.2))] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60" />
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem] border border-white/10">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 24vw, (min-width: 768px) 48vw, 100vw"
                  className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.08]"
                />
                <motion.div
                  className="absolute inset-0 bg-[linear-gradient(170deg,rgba(5,18,39,0.14),rgba(5,18,39,0.8))]"
                  animate={{ opacity: [0.75, 0.9, 0.75] }}
                  transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
                />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_55%)]" />
              </div>
              <h4 className="mt-5 font-heading text-lg font-semibold leading-snug text-white">{feature.title}</h4>
              <p className="mt-3 flex-1 text-sm leading-[1.75] text-white/68">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
