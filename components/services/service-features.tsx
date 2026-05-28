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
    <section ref={ref} className="px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h3 className="text-center font-heading text-3xl font-semibold text-white md:text-5xl">Premium capabilities for compounding growth</h3>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#7AAEFF]/24 bg-[#0D2C57]/44 p-6 shadow-[0_18px_52px_rgba(3,10,24,0.45)] backdrop-blur-md"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
            >
              <motion.div
                className="pointer-events-none absolute inset-[1px] rounded-[1.35rem] border border-white/8"
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
              />
              <div className="pointer-events-none absolute -inset-0.5 rounded-3xl bg-[linear-gradient(120deg,rgba(122,174,255,0.30),rgba(255,255,255,0.08),rgba(0,102,255,0.24))] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70" />
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
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
              <h4 className="mt-5 font-heading text-xl font-semibold text-white">{feature.title}</h4>
              <p className="mt-3 flex-1 text-sm leading-7 text-white/74 md:text-base">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
