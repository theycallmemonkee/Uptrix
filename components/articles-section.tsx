"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface ArticlePreview {
  slug: string;
  title: string;
  category: string;
  displayDate: string;
  author: string;
  cover: string;
}

function ArticleCard({ article, index }: { article: ArticlePreview; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.article
      ref={ref}
      className="group relative flex w-[260px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-500 hover:border-white/[0.13] hover:bg-white/[0.055] hover:shadow-[0_12px_36px_rgba(0,0,0,0.22)] sm:w-[300px]"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.58, delay: index * 0.07, ease: EASE }}
    >
      <Link href={`/blog/${article.slug}`} className="flex flex-1 flex-col">
        <div className="relative h-36 w-full overflow-hidden sm:h-40">
          <Image
            src={article.cover}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 260px, 300px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061124]/70 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 rounded-md border border-white/[0.15] bg-[#061124]/80 px-2 py-0.5 text-[10px] font-bold tracking-[0.14em] text-[#79ABFF] uppercase backdrop-blur-sm">
            {article.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-[11px] text-white/45">{article.displayDate}</p>
          <h3 className="mt-2 font-heading text-[0.9375rem] font-semibold leading-snug text-white flex-1">
            {article.title}
          </h3>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-[11px] text-white/50">{article.author}</p>
            <span className="inline-flex items-center gap-1 font-heading text-xs font-semibold text-[#79ABFF] group-hover:text-white transition-colors duration-200">
              Read more
              <ArrowUpRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function ArticlesSection({ articles = [] }: { articles?: ArticlePreview[] }) {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.3 });

  if (!articles.length) return null;

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
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.13] bg-white/[0.04] px-5 py-2.5 font-heading text-sm font-semibold text-white/75 backdrop-blur-sm transition-all duration-300 hover:border-white/22 hover:bg-white/[0.08] hover:text-white"
            >
              View All Articles
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        <motion.p
          className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.75] text-white/55"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Practical writing on brand, growth, paid media and conversion. Written for founders and marketing leads who want the thinking behind the work.
        </motion.p>

        {/* Article horizontal scroll */}
        <div className="mt-10 -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {articles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
