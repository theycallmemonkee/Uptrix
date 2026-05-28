"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Blog } from "@/app/blog/data";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.45);
  const smoothX = useSpring(mouseX, { stiffness: 110, damping: 22, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 110, damping: 22, mass: 0.7 });

  const glowX = useTransform(smoothX, [0, 1], ["12%", "88%"]);
  const glowY = useTransform(smoothY, [0, 1], ["10%", "82%"]);
  const hoverGlow = useMotionTemplate`radial-gradient(480px circle at ${glowX} ${glowY}, rgba(0,102,255,0.22), transparent 60%)`;

  const tiltX = useTransform(smoothY, [0, 1], [4, -4]);
  const tiltY = useTransform(smoothX, [0, 1], [-5, 5]);

  return (
    <motion.article
      className="group relative overflow-hidden rounded-[1.7rem] border border-white/12 bg-[linear-gradient(160deg,rgba(14,34,64,0.62),rgba(6,14,28,0.72))] shadow-[0_22px_70px_rgba(2,9,22,0.55)] ring-1 ring-inset ring-white/8 backdrop-blur-xl will-change-transform"
      initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.72, delay: index * 0.07, ease: EASE }}
      whileHover={{ y: -10, scale: 1.012 }}
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
      {/* Mouse-reactive inner glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{ background: hoverGlow }}
      />
      {/* Animated border glow */}
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-[1.7rem] opacity-0 transition-opacity duration-400 group-hover:opacity-55"
        style={{
          background:
            "linear-gradient(120deg, rgba(0,102,255,0.22), rgba(255,255,255,0.04), rgba(0,102,255,0.18))",
        }}
      />

      <Link href={`/blog/${blog.slug}`} className="relative block h-full">
        {/* Image with parallax on hover */}
        <div className="relative overflow-hidden rounded-[1.25rem] m-4">
          <Image
            src={blog.image}
            alt={blog.title}
            width={1200}
            height={720}
            className="h-48 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050B14]/78 via-transparent to-transparent" />
          {/* Shine sweep on image hover */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
            }}
          />
        </div>

        <div className="px-6 pb-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/62">
            <span className="inline-flex items-center rounded-full border border-[#4D8EFF]/28 bg-[#0C2C57]/42 px-2.5 py-1 text-[11px] font-medium text-[#A8C9FF]/88 backdrop-blur-sm">
              {blog.category}
            </span>
            <span className="flex items-center gap-1 text-white/50">
              <Calendar size={11} />
              {blog.displayDate}
            </span>
            <span className="flex items-center gap-1 text-white/50">
              <Clock size={11} />
              {blog.readTime}
            </span>
          </div>

          <h3 className="mt-4 font-heading text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#CFE3FF]">
            {blog.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/70">{blog.excerpt}</p>

          <div className="mt-5 flex items-center gap-2 font-heading text-sm font-medium text-[#A8C9FF] transition-all duration-300 group-hover:gap-3 group-hover:text-white">
            Read article
            <ArrowUpRight
              size={15}
              className="opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
