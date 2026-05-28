"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Blog } from "@/app/blog/data";
import { ArrowUpRight, Clock, Calendar, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function RelatedArticles({ posts }: { posts: Blog[] }) {
  if (!posts.length) return null;

  return (
    <motion.section
      className="mt-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Section header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0066FF]/18 ring-1 ring-[#0066FF]/25">
            <Sparkles size={13} className="text-[#60A5FA]" />
          </div>
          <h2 className="font-heading text-xl font-bold tracking-tight text-white md:text-2xl">
            Related Articles
          </h2>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-[#0066FF]/30 to-transparent" />
        <Link
          href="/blog"
          className="text-[12px] font-medium text-[#60A5FA] transition-colors hover:text-white"
        >
          View all →
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <RelatedCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </motion.section>
  );
}

function RelatedCard({ post, index }: { post: Blog; index: number }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.45);
  const smoothX = useSpring(mouseX, { stiffness: 110, damping: 22, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 110, damping: 22, mass: 0.7 });

  const glowX = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(smoothY, [0, 1], ["8%", "85%"]);
  const hoverGlow = useMotionTemplate`radial-gradient(400px circle at ${glowX} ${glowY}, rgba(0,102,255,0.2), transparent 65%)`;

  const tiltX = useTransform(smoothY, [0, 1], [5, -5]);
  const tiltY = useTransform(smoothX, [0, 1], [-6, 6]);

  return (
    <motion.article
      className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(160deg,rgba(12,30,60,0.65),rgba(5,12,24,0.72))] shadow-[0_18px_60px_rgba(2,9,22,0.5)] ring-1 ring-inset ring-white/7 backdrop-blur-xl will-change-transform"
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: EASE }}
      whileHover={{ y: -8 }}
      style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.45);
      }}
    >
      {/* Mouse-reactive glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{ background: hoverGlow }}
      />
      {/* Shimmer border on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-[1.6rem] opacity-0 transition-opacity duration-500 group-hover:opacity-50"
        style={{
          background: "linear-gradient(120deg, rgba(0,102,255,0.25), rgba(255,255,255,0.04), rgba(0,102,255,0.2))",
        }}
      />

      <Link href={`/blog/${post.slug}`} className="relative block">
        {/* Article image */}
        <div className="relative m-3.5 overflow-hidden rounded-[1.15rem]">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={450}
            className="h-44 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05101F]/85 via-transparent to-transparent" />

          {/* Shine sweep on hover */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(105deg,transparent_25%,rgba(255,255,255,0.06)_50%,transparent_75%)]" />

          {/* Category pill */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 rounded-full border border-[#3B82F6]/30 bg-[#0066FF]/20 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#93C5FD] backdrop-blur-sm">
              {post.category}
            </span>
          </div>
        </div>

        <div className="px-5 pb-5">
          {/* Date & read time */}
          <div className="flex items-center gap-3 text-[11px] text-white/40">
            <span className="flex items-center gap-1">
              <Calendar size={10} />
              {post.displayDate}
            </span>
            <span className="h-0.5 w-0.5 rounded-full bg-white/25" />
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {post.readTime}
            </span>
          </div>

          <h3 className="mt-3 font-heading text-[0.97rem] font-semibold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-[#BDD9FF]">
            {post.title}
          </h3>
          <p className="mt-2 text-[0.82rem] leading-6 text-white/55 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Read more link */}
          <div className="mt-4 flex items-center gap-2 text-[12px] font-medium text-[#60A5FA] transition-all duration-300 group-hover:gap-3 group-hover:text-white">
            Read article
            <ArrowUpRight
              size={13}
              className="opacity-65 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
