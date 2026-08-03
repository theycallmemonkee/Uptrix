"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const ARTICLES = [
  {
    category: "CRO",
    title: "Why most growth strategies fail at the conversion layer",
    excerpt: "Getting traffic is only half the job. Most businesses solve the wrong problem first.",
    href: "/insights",
    accent: "#2563EB",
  },
  {
    category: "Strategy",
    title: "Positioning before paid: the order most brands get wrong",
    excerpt: "Spending on ads before your positioning is clear is one of the most expensive mistakes in growth.",
    href: "/insights",
    accent: "#79ABFF",
  },
  {
    category: "Paid Growth",
    title: "What a 3x ROAS campaign actually looks like from the inside",
    excerpt: "The creative decisions, audience work and funnel structure behind campaigns that actually scale.",
    href: "/insights",
    accent: "#38BDF8",
  },
  {
    category: "Leadership",
    title: "The case for a fractional CMO before a full-time hire",
    excerpt: "Why bringing in senior strategy part-time often outperforms a full-time hire at the early stage.",
    href: "/insights",
    accent: "#7C3AED",
  },
] as const;

function ArticleCard({ article, index }: { article: typeof ARTICLES[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.article
      ref={ref}
      className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-500 hover:border-white/[0.13] hover:bg-white/[0.055] hover:shadow-[0_12px_36px_rgba(0,0,0,0.22)]"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.58, delay: index * 0.07, ease: EASE }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,rgba(0,102,255,0.07),transparent_55%)]" />

      <span
        className="relative inline-block rounded-md px-2 py-0.5 text-[10px] font-bold tracking-[0.14em] uppercase"
        style={{
          background: `${article.accent}22`,
          color: article.accent,
          border: `1px solid ${article.accent}33`,
        }}
      >
        {article.category}
      </span>

      <h3 className="relative mt-3 font-heading text-[0.9375rem] font-semibold leading-snug text-white flex-1">
        {article.title}
      </h3>

      <p className="relative mt-2 text-[0.8125rem] leading-[1.7] text-white/50">
        {article.excerpt}
      </p>

      <Link
        href={article.href}
        className="relative mt-4 inline-flex items-center gap-1 font-heading text-xs font-semibold text-[#79ABFF] hover:text-white transition-colors duration-200"
      >
        Read more
        <ArrowUpRight size={12} />
      </Link>
    </motion.article>
  );
}

export function ArticlesSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.3 });

  return (
    <section className="relative z-10 w-full overflow-hidden px-6 py-20 md:px-10 md:py-24">
      <div className="pointer-events-none absolute -right-20 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.07),transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headingRef} className="flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE }}
            >
              Insights
            </motion.p>

            <motion.h2
              className="mt-3 font-heading text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]"
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            >
              <span className="text-white">THINGS WORTH </span><span className="text-[#79ABFF]">READING</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
          >
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.13] bg-white/[0.04] px-5 py-2.5 font-heading text-sm font-semibold text-white/75 backdrop-blur-sm transition-all duration-300 hover:border-white/22 hover:bg-white/[0.08] hover:text-white"
            >
              Read All Insights
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        <motion.p
          className="mt-4 text-[0.9375rem] leading-[1.75] text-white/55 lg:whitespace-nowrap"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Practical thinking on growth marketing, positioning and building businesses that scale.
        </motion.p>

        {/* Article grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ARTICLES.map((article, i) => (
            <ArticleCard key={article.title} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
