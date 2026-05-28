"use client";

import { motion } from "framer-motion";
import { AtSign, ChevronDown, Globe2, Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type SidebarHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

type Props = {
  headings: SidebarHeading[];
  shareUrl: string;
  shareTitle: string;
};

export function BlogSidebar({ headings, shareUrl, shareTitle }: Props) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const ids = useMemo(() => headings.map((heading) => heading.id), [headings]);

  useEffect(() => {
    if (!ids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-14% 0px -64% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    ids.forEach((id) => {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    });

    return () => observer.disconnect();
  }, [ids]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full lg:sticky lg:top-28 lg:h-fit"
    >
      <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-4 shadow-[0_20px_60px_rgba(2,9,22,0.45)] ring-1 ring-inset ring-white/8 backdrop-blur-lg">
        <button
          type="button"
          className="flex w-full items-center justify-between lg:pointer-events-none"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <p className="text-[11px] tracking-[0.2em] text-[#B9D5FF]/74 uppercase">Table of content</p>
          <ChevronDown
            size={16}
            className={`text-white/56 transition-transform duration-300 lg:hidden ${mobileOpen ? "rotate-180" : ""}`}
          />
        </button>

        <ul
          className={`mt-3 max-h-[26rem] space-y-1 overflow-auto pr-1 [scrollbar-color:rgba(139,184,255,0.35)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#8BB8FF]/40 [&::-webkit-scrollbar]:w-[4px] ${
            mobileOpen ? "block" : "hidden lg:block"
          }`}
        >
          {headings.map((heading, idx) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={[
                  "block rounded-md py-1.5 text-[13px] leading-5 transition-all duration-200",
                  heading.level === 3 ? "pl-4 pr-2" : "px-2",
                  activeId === heading.id
                    ? "bg-[#0E335F]/50 text-[#DDEBFF]"
                    : "text-white/62 hover:bg-white/[0.03] hover:text-white/90",
                ].join(" ")}
                style={{ transitionDelay: `${idx * 6}ms` }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-4 h-px bg-white/10" />
        <div className="mt-4">
          <p className="text-[11px] tracking-[0.2em] text-[#B9D5FF]/74 uppercase">Share this article</p>
          <div className="mt-3 flex items-center gap-2">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8BB8FF]/45 hover:text-white"
            >
              <AtSign size={14} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on X"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8BB8FF]/45 hover:text-white"
            >
              <Send size={14} />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8BB8FF]/45 hover:text-white"
            >
              <Globe2 size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
