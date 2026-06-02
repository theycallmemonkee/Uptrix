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
  cover: string;
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
      <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-[#0066FF]/20">
        <Image src={image} alt={name} fill className="object-cover" sizes="44px" />
      </div>
    );
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0066FF,#235FC6)] text-sm font-semibold text-white ring-2 ring-[#0066FF]/20">
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
    <header className="w-full pb-10">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-8"
      >
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm text-[#6B7280] transition-colors hover:text-[#111827]"
        >
          <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to insights
        </Link>
      </motion.div>

      {/* Hero content animation */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {/* Category Pill */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
          }}
        >
          <span className="inline-flex items-center rounded-full border border-[#0066FF]/20 bg-[#0066FF]/5 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#0066FF] uppercase">
            {post.category}
          </span>
        </motion.div>

        {/* H1 Title */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
          }}
          className="mt-6 font-heading text-4xl sm:text-5xl lg:text-[64px] leading-[1.1] font-extrabold tracking-tight text-[#111827]"
        >
          {post.title}
        </motion.h1>

        {/* Author & Meta Block */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
          }}
          className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-[#6B7280] border-y border-gray-100 py-5"
        >
          <div className="flex items-center gap-3">
            <AuthorAvatar name={post.author} image={post.authorImage} />
            <span className="font-semibold text-[#111827]">{post.author}</span>
          </div>
          
          <span className="hidden sm:block h-4 w-px bg-gray-200" />
          
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} className="text-[#0066FF]" />
            {displayDate}
          </span>
          
          <span className="h-4 w-px bg-gray-200" />
          
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} className="text-[#0066FF]" />
            {post.readingTime}
          </span>
        </motion.div>

        {/* Cover Image (Below Hero Info) */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 22 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
          }}
          className="relative mt-10 overflow-hidden rounded-[24px] md:rounded-[32px] aspect-[16/9] w-full border border-gray-100 shadow-sm"
        >
          <Image
            src={post.cover}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1280px) 760px, 90vw"
          />
        </motion.div>

        {/* Article Intro (Excerpt) (Below Cover Image) */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
          }}
          className="mt-10"
        >
          <p className="text-xl sm:text-[22px] leading-[1.65] text-[#4B5563] font-light italic">
            {post.excerpt}
          </p>
        </motion.div>
      </motion.div>
    </header>
  );
}
