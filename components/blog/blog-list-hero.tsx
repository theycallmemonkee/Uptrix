"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const stats = [
  { label: "Companies Served", value: 100 },
  { label: "Growth Campaigns", value: 50 },
  { label: "Weekly Research", value: "∞" },
  { label: "AI Frameworks", value: 25 },
];

const topics = [
  "AI & AI SEO",
  "PPC",
  "Branding",
  "Social Media",
  "Growth Systems",
];

export default function BlogListHero() {
  const container = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
      },
    }),
    []
  );

  const item = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: EASE },
      },
    }),
    []
  );

  return (
    <motion.section
      className="relative z-[1] mx-auto w-full max-w-[1280px] px-6 pt-[100px] pb-16 md:px-10 md:pt-[120px] lg:pt-[160px]"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Badge */}
      <motion.div variants={item} className="inline-block">
        <span className="text-xs font-medium tracking-[0.24em] text-[#A8C9FF]/72 uppercase">
          Uptrix Editorial
        </span>
      </motion.div>

      {/* Main Grid */}
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_340px] lg:items-start">
        {/* Left: Headline & Description */}
        <div>
          <motion.h1
            variants={item}
            className="font-heading text-[56px] leading-[1.08] font-semibold tracking-tight md:text-[64px]"
            style={{ maxWidth: "700px" }}
          >
            AI Growth Insights, Marketing Systems &amp; Industry Playbooks
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-[560px] text-[18px] leading-[1.8] text-white/76"
          >
            Research, frameworks, case studies and AI marketing strategies used by modern growth teams. Deep-dive playbooks for founders, CMOs, and growth leaders.
          </motion.p>

          {/* Featured Topics */}
          <motion.div variants={item} className="mt-10">
            <p className="text-xs font-medium tracking-[0.18em] text-[#A8C9FF]/60 uppercase">
              Featured Topics
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {topics.map((topic) => (
                <motion.button
                  key={topic}
                  className="group relative rounded-full border border-[#0066FF]/30 bg-[#0066FF]/8 px-4 py-2 text-sm font-medium text-[#A8C9FF] transition-all duration-300 hover:border-[#0066FF]/60 hover:bg-[#0066FF]/16 hover:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  [ {topic} ]
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Insight Panel */}
        <motion.div
          variants={item}
          className="flex flex-col gap-3 lg:sticky lg:top-24"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              className="group overflow-hidden rounded-xl border border-[#0066FF]/20 bg-[linear-gradient(135deg,rgba(7,20,38,0.6),rgba(6,14,28,0.8))] p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#0066FF]/40 hover:bg-[linear-gradient(135deg,rgba(7,20,38,0.8),rgba(6,14,28,0.95))]"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.08, ease: EASE }}
            >
              <div className="text-[10px] font-semibold tracking-[0.16em] text-[#0066FF]/70 uppercase">
                {stat.label}
              </div>
              <div className="mt-2 text-3xl font-semibold text-white group-hover:text-[#A8C9FF]">
                {stat.value}+
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#0066FF]/10">
                <motion.div
                  className="h-full w-full bg-gradient-to-r from-[#0066FF] to-[#79ABFF]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.4 + idx * 0.1,
                    ease: "easeOut",
                  }}
                  style={{ originX: 0 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
