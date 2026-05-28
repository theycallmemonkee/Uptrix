"use client";

import { motion } from "framer-motion";
import type { Blog } from "@/app/blog/data";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = (delay = 0) => ({
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, delay, ease: EASE },
  },
});

export function BlogHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
}) {
  return (
    <motion.section
      className="relative max-w-[68rem]"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -inset-x-10 -top-14 -z-10 h-44 rounded-[2.5rem] opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_72%)]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,102,255,0.22),transparent_60%),radial-gradient(circle_at_70%_0%,rgba(255,255,255,0.08),transparent_55%)]" />
      </div>
      <div className="pointer-events-none absolute -inset-x-10 -top-20 -z-20 h-56 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_42%,transparent_76%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <motion.p
        variants={item(0)}
        className="text-[11px] font-medium tracking-[0.26em] text-[#A8C9FF]/78 uppercase"
      >
        {eyebrow}
      </motion.p>
      <motion.h1
        variants={item(0.06)}
        className="mt-4 font-heading text-4xl leading-[1.08] font-semibold tracking-tight text-white md:text-6xl md:leading-[1.03] lg:whitespace-nowrap lg:text-[3.25rem]"
      >
        {title}
      </motion.h1>
      <motion.p
        variants={item(0.14)}
        className="mt-5 max-w-2xl text-base leading-8 text-white/72 md:mt-6 md:text-lg lg:max-w-none lg:whitespace-nowrap lg:text-[1.05rem] lg:leading-8"
      >
        {subtitle}
      </motion.p>
    </motion.section>
  );
}

export function BlogPostHero({ blog }: { blog: Blog }) {
  return (
    <motion.header
      className="mt-6 max-w-4xl"
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.72, ease: EASE }}
    >
      <h1 className="font-heading text-4xl font-semibold tracking-tight text-white md:text-6xl">{blog.title}</h1>
      <motion.p
        className="mt-6 text-base leading-8 text-white/72 md:text-lg"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
      >
        {blog.excerpt}
      </motion.p>
    </motion.header>
  );
}
