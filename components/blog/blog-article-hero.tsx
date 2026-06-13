"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Blog } from "@/app/blog/data";
import { Calendar, Clock, ArrowLeft, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BlogArticleHero({ blog }: { blog: Blog }) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative z-[1] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_32px_100px_rgba(2,9,22,0.7)] ring-1 ring-inset ring-white/8"
    >
      {/* Animated mesh / grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Hero image with parallax */}
      <div className="relative h-[22rem] md:h-[32rem] lg:h-[38rem] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Layered gradient overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,25,0.12)_0%,rgba(4,12,25,0.5)_40%,rgba(4,12,25,0.9)_70%,rgba(4,12,25,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(0,102,255,0.22)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(100,160,255,0.12)_0%,transparent_55%)]" />

        {/* Aurora glow behind title area */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-48 w-[80%] rounded-full bg-[#0066FF]/18 blur-[80px]" />
      </div>

      {/* Floating radial light effects */}
      <div className="pointer-events-none absolute top-12 left-12 h-32 w-32 rounded-full bg-[#0066FF]/20 blur-3xl animate-float-orb" />
      <div className="pointer-events-none absolute top-8 right-16 h-24 w-24 rounded-full bg-[#60A5FA]/12 blur-2xl" style={{ animationDelay: "3s" }} />

      {/* Hero content */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 px-6 pb-8 md:px-10 md:pb-12"
        style={{ y: textY, opacity }}
      >
        {/* Breadcrumb */}
        <motion.div
          className="mb-5 flex flex-wrap items-center gap-2.5 text-xs"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/[0.06] px-3 py-1.5 text-white/75 backdrop-blur-sm transition-colors hover:border-white/22 hover:text-white"
          >
            <ArrowLeft size={12} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            Blog
          </Link>
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span className="text-white/45">{blog.displayDate}</span>
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span className="text-white/45">{blog.readTime}</span>
        </motion.div>

        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          className="mb-5"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3B82F6]/35 bg-[#0066FF]/18 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-[#93C5FD] uppercase backdrop-blur-sm shadow-[0_4px_20px_rgba(0,102,255,0.2)]">
            <Sparkles size={11} />
            {blog.category}
          </span>
        </motion.div>

        {/* Main title — large, cinematic */}
        <motion.h1
          className="max-w-5xl font-heading text-4xl font-bold leading-[1.06] tracking-tight text-white md:text-5xl lg:text-[3.6rem]"
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          {blog.title}
        </motion.h1>

        {/* Excerpt */}
        <motion.p
          className="mt-4 max-w-3xl text-[0.95rem] leading-7 text-white/62 md:text-base"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        >
          {blog.excerpt}
        </motion.p>

        {/* Meta row */}
        <motion.div
          className="mt-5 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32, ease: EASE }}
        >
          <div className="flex items-center gap-2 text-[12px] text-white/50">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0066FF]/20 ring-1 ring-[#0066FF]/25">
              <span className="text-[8px] font-bold text-[#93C5FD]">U</span>
            </div>
            <span>{blog.author}</span>
          </div>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-1.5 text-[12px] text-white/45">
            <Calendar size={11} />
            {blog.displayDate}
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-white/45">
            <Clock size={11} />
            {blog.readTime}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
