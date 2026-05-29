"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export type BlogPostHeroData = {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorImage?: string;
  date: string;
  displayDate?: string;
  readingTime: string;
};

function AuthorAvatar({ name, image }: { name: string; image?: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (image) {
    return (
      <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-[#3B82F6]/30">
        <Image src={image} alt={name} fill className="object-cover" sizes="44px" />
      </div>
    );
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0066FF,#235FC6)] text-sm font-semibold text-white ring-2 ring-[#3B82F6]/30">
      {initials}
    </div>
  );
}

export function BlogPostHero({ post }: { post: BlogPostHeroData }) {
  const displayDate =
    post.displayDate ||
    new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(post.date));

  return (
    <header className="w-full border-b border-white/10 pb-10 lg:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-7"
      >
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to insights
        </Link>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
          }}
          className="inline-flex items-center rounded-full border border-[#3B82F6]/30 bg-[#0066FF]/10 px-3.5 py-1 text-[11px] font-medium tracking-[0.18em] text-[#93C5FD] uppercase"
        >
          {post.category}
        </motion.span>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
          }}
          className="mt-5 font-heading text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-white"
        >
          {post.title}
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
          }}
          className="blog-article-lead mt-5 text-[clamp(1.05rem,1.8vw,1.3rem)] leading-[1.65] text-white/68"
        >
          {post.excerpt}
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
          }}
          className="mt-7 flex flex-wrap items-center gap-4 text-sm text-white/55"
        >
          <div className="flex items-center gap-3">
            <AuthorAvatar name={post.author} image={post.authorImage} />
            <span className="font-medium text-white/90">{post.author}</span>
          </div>
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} className="text-[#60A5FA]/75" />
            {displayDate}
          </span>
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} className="text-[#60A5FA]/75" />
            {post.readingTime}
          </span>
        </motion.div>
      </motion.div>
    </header>
  );
}
