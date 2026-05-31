"use client";

import { motion } from "framer-motion";
import { ChevronDown, Hash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { TocItem } from "@/lib/blog/types";

export function BlogToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [openMobile, setOpenMobile] = useState(false);
  const headings = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-16% 0px -60% 0px", threshold: [0.2, 0.5, 0.8] },
    );

    headings.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (!items.length) return null;

  return (
    <motion.nav
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(12,30,60,0.72),rgba(6,14,28,0.78))] p-5 shadow-[0_20px_60px_rgba(2,9,22,0.55)] ring-1 ring-inset ring-white/8 backdrop-blur-xl"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow accent */}
      <div className="pointer-events-none absolute -top-8 -left-8 h-32 w-32 rounded-full bg-[#0066FF]/12 blur-2xl" />

      <button
        type="button"
        onClick={() => setOpenMobile((v) => !v)}
        className="flex w-full items-center justify-between md:pointer-events-none"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#0066FF]/20 ring-1 ring-[#0066FF]/30">
            <Hash size={11} className="text-[#7BABFF]" />
          </div>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#A8C9FF]/80 uppercase">
            On this page
          </p>
        </div>
        <ChevronDown
          size={16}
          className={`text-white/50 transition-transform duration-300 md:hidden ${openMobile ? "rotate-180" : ""}`}
        />
      </button>

      <div className="mt-3 h-px w-full bg-gradient-to-r from-[#0066FF]/30 via-white/8 to-transparent" />

      <ul className={`mt-4 space-y-0.5 ${openMobile ? "block" : "hidden md:block"}`}>
        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href={`#${item.id}`}
                className={[
                  "group relative flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm leading-6 transition-all duration-200",
                  item.level === 3 ? "pl-5" : "pl-2",
                  isActive
                    ? "bg-[#0066FF]/14 text-[#BFD9FF]"
                    : "text-white/55 hover:bg-white/[0.04] hover:text-white/85",
                ].join(" ")}
              >
                {/* Active indicator bar */}
                <span
                  className={[
                    "absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[2px] rounded-full transition-all duration-300",
                    isActive ? "bg-gradient-to-b from-[#60A5FA] to-[#0066FF] opacity-100" : "opacity-0",
                  ].join(" ")}
                />
                <span className="line-clamp-2 text-[13px] leading-5">{item.text}</span>
              </a>
            </motion.li>
          );
        })}
      </ul>

      {/* Progress indicator */}
      <div className="mt-4 h-px w-full bg-gradient-to-r from-[#0066FF]/20 via-white/6 to-transparent" />
      <p className="mt-3 text-[10px] text-white/30 tracking-wider uppercase">
        {items.length} sections
      </p>
    </motion.nav>
  );
}
