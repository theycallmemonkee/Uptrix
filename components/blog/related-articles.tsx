"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Clock, Calendar, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export type RelatedPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  date: string;
  displayDate?: string;
  readingTime: string;
};

function formatDate(date: string, displayDate?: string) {
  if (displayDate) return displayDate;
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

export function RelatedArticles({ posts }: { posts: RelatedPost[] }) {
  if (!posts.length) return null;

  return (
    <motion.section
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="mb-10 flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0066FF]/10 ring-1 ring-[#0066FF]/20">
            <Sparkles size={14} className="text-[#0066FF]" />
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[#111827] md:text-[1.75rem]">
            Continue reading
          </h2>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
        <Link href="/blog" className="text-sm font-semibold text-[#0066FF] transition-colors hover:text-[#1552B6]">
          View all →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <RelatedCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </motion.section>
  );
}

function RelatedCard({ post, index }: { post: RelatedPost; index: number }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.45);
  const smoothX = useSpring(mouseX, { stiffness: 110, damping: 22, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 110, damping: 22, mass: 0.7 });

  const glowX = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(smoothY, [0, 1], ["8%", "85%"]);
  const hoverGlow = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, rgba(0,102,255,0.06), transparent 65%)`;

  const tiltX = useTransform(smoothY, [0, 1], [4, -4]);
  const tiltY = useTransform(smoothX, [0, 1], [-4, 4]);

  return (
    <motion.article
      className="group relative overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200 will-change-transform"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.68, delay: index * 0.08, ease: EASE }}
      whileHover={{ y: -6 }}
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
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{ background: hoverGlow }}
      />

      <Link href={`/blog/${post.slug}`} className="relative block">
        <div className="relative m-3.5 overflow-hidden rounded-[18px]">
          <Image
            src={post.cover}
            alt={post.title}
            width={900}
            height={506}
            className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex rounded-full border border-[#0066FF]/20 bg-white/90 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#0066FF] backdrop-blur-sm">
              {post.category}
            </span>
          </div>
        </div>

        <div className="px-5 pb-5">
          <div className="flex items-center gap-3 text-[11px] text-[#6B7280] font-medium">
            <span className="inline-flex items-center gap-1">
              <Calendar size={11} className="text-[#0066FF]/80" />
              {formatDate(post.date, post.displayDate)}
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span className="inline-flex items-center gap-1">
              <Clock size={11} className="text-[#0066FF]/80" />
              {post.readingTime}
            </span>
          </div>
          <h3 className="mt-3 font-heading text-lg font-bold leading-snug tracking-tight text-[#111827] transition-colors group-hover:text-[#0066FF]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#4B5563]">{post.excerpt}</p>
          <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#0066FF] transition-all group-hover:gap-3 group-hover:text-[#1552B6]">
            Read article
            <ArrowUpRight size={14} className="opacity-80 group-hover:opacity-100" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
