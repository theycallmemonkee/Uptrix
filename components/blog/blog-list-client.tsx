"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { BlogPost } from "@/lib/blog/types";

export function BlogListClient({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, idx) => (
        <BlogCard key={post.slug} post={post} index={idx} />
      ))}
    </div>
  );
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.45);
  const smoothX = useSpring(mouseX, { stiffness: 110, damping: 22, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 110, damping: 22, mass: 0.7 });

  const glowX = useTransform(smoothX, [0, 1], ["12%", "88%"]);
  const glowY = useTransform(smoothY, [0, 1], ["10%", "82%"]);
  const hoverGlow = useMotionTemplate`radial-gradient(520px circle at ${glowX} ${glowY}, rgba(0,102,255,0.20), transparent 60%)`;

  const tiltX = useTransform(smoothY, [0, 1], [4, -4]);
  const tiltY = useTransform(smoothX, [0, 1], [-6, 6]);

  return (
    <motion.article
      className="group relative overflow-hidden rounded-[1.7rem] border border-white/12 bg-[linear-gradient(160deg,rgba(14,34,64,0.62),rgba(6,14,28,0.72))] shadow-[0_22px_70px_rgba(2,9,22,0.55)] ring-1 ring-inset ring-white/8 backdrop-blur-xl"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.01 }}
      style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.45);
      }}
    >
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: hoverGlow }} />
      <motion.div
        className="pointer-events-none absolute -inset-[1px] opacity-0 transition-opacity duration-300 group-hover:opacity-60"
        style={{
          background:
            "linear-gradient(120deg, rgba(0,102,255,0.18), rgba(255,255,255,0.04), rgba(0,102,255,0.16))",
        }}
      />

      <Link href={`/blog/${post.slug}`} className="relative block h-full">
        <div className="relative overflow-hidden rounded-[1.25rem] m-4">
          <Image
            src={post.frontmatter.coverImage}
            alt={post.frontmatter.title}
            width={1200}
            height={720}
            className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050B14]/78 via-transparent to-transparent" />
        </div>

        <div className="px-6 pb-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/62">
            <span>{post.frontmatter.date}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>{post.readingTimeText}</span>
          </div>

          <h3 className="mt-4 font-heading text-xl font-semibold tracking-tight text-white">
            {post.frontmatter.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/70">{post.frontmatter.description}</p>

          <div className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-medium text-[#A8C9FF] transition-colors duration-300 group-hover:text-white">
            Read article
            <span className="h-px w-6 bg-gradient-to-r from-[#79ABFF] to-transparent transition-all duration-300 group-hover:w-10" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

