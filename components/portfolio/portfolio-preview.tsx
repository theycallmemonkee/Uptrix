"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PORTFOLIO_ITEMS } from "@/data/portfolio-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const categorySlugMap: Record<string, string> = {
  "ai-seo": "ai-seo",
  "google-ads": "google-ads",
  "meta-ads": "meta-ads",
  "social-media": "social",
};

export function PortfolioPreview() {
  // Show 4 featured items (one of each category)
  const featured = PORTFOLIO_ITEMS.slice(0, 4);

  return (
    <section className="relative z-10 px-6 py-24 md:px-10 bg-[#061124]">
      {/* Background radial highlight */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1000px_circle_at_center,rgba(0,102,255,0.06),transparent_60%)]" />

      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8DB8FF]/28 bg-[#78A8FF]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#DCEBFF] uppercase"
          >
            <Sparkles size={12} className="text-[#70A8FF]" />
            Proven Impact
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-white"
          >
            Real Results From Real Work
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mt-4 max-w-lg text-base leading-[1.75] text-white/68"
          >
            We build, manage and scale growth systems that turn traffic into revenue. Here is a look at the work.
          </motion.p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
              className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.03] p-5 backdrop-blur-md hover:border-[#70A8FF]/30 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,102,255,0.12)] transition-all duration-300"
            >
              {/* Glass sweep top indicator */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_25%_20%,rgba(0,102,255,0.14),transparent_55%)]" />

              {/* Image Frame */}
              <Link
                href={`/portfolio/${categorySlugMap[item.id] || item.id}/case-study-1`}
                onClick={() => window.scrollTo(0, 0)}
                className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/8 bg-[#081220]"
              >
                <Image
                  src={item.featuredImage}
                  alt={item.title}
                  fill
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061124]/90 via-[#061124]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-6">
                  <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#70A8FF] flex items-center gap-1">
                    View Case Study Details
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>

              {/* Project Metadata */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-widest text-[#70A8FF] uppercase">
                    {item.category}
                  </span>
                  <span className="text-xs text-white/50">{item.client}</span>
                </div>
                
                <h3 className="mt-2 font-heading text-xl font-semibold leading-snug text-white transition-colors group-hover:text-[#70A8FF]">
                  {item.title}
                </h3>

                {/* Primary Metric highlight */}
                <div className="mt-4 flex items-center justify-between border-t border-white/6 pt-4">
                  <div className="flex gap-2">
                    {item.metrics.slice(0, 2).map((m) => (
                      <span key={m.label} className="rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold text-white/88 backdrop-blur-sm">
                        {m.value} {m.label}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    href={`/portfolio/${categorySlugMap[item.id] || item.id}/case-study-1`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="rounded-full border border-white/10 p-2 text-white/80 transition-all duration-300 group-hover:bg-[#0066FF] group-hover:border-[#70A8FF]/40 group-hover:text-white"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore Portfolio CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/portfolio"
            onClick={() => window.scrollTo(0, 0)}
            className="shine-sweep group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-7 py-4 font-heading text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,102,255,0.36)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(0,102,255,0.48)] cursor-pointer"
          >
            Explore Full Portfolio
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
