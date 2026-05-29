"use client";

import type { ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const progressPercent = useTransform(progress, (v) => Math.round(v * 100));

  const [displayPercent, setDisplayPercent] = useState(0);
  useEffect(() => {
    return progressPercent.on("change", (v) => setDisplayPercent(v));
  }, [progressPercent]);

  useEffect(() => {
    if (!ids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-12% 0px -62% 0px", threshold: [0.15, 0.4, 0.65] },
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
    <aside className="w-full shrink-0 lg:w-[260px] lg:self-start">
      <div className="lg:sticky lg:top-[120px] lg:h-fit">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-medium tracking-[0.18em] text-white/45 uppercase">Reading progress</p>
            <span className="text-xs font-medium tabular-nums text-[#93C5FD]/90">{displayPercent}%</span>
          </div>
          <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full bg-[#3B82F6]"
              style={{ scaleX: progress, transformOrigin: "left" }}
            />
          </div>

          {headings.length > 0 ? (
            <div className="mt-5 border-t border-white/8 pt-4">
              <button
                type="button"
                className="flex w-full items-center justify-between lg:pointer-events-none"
                onClick={() => setMobileOpen((v) => !v)}
              >
                <p className="text-[10px] font-medium tracking-[0.18em] text-white/45 uppercase">Table of contents</p>
                <ChevronDown
                  size={15}
                  className={`text-white/45 transition-transform duration-300 lg:hidden ${mobileOpen ? "rotate-180" : ""}`}
                />
              </button>

              <ul
                className={`mt-3 max-h-[min(42vh,22rem)] space-y-0.5 overflow-y-auto [scrollbar-width:thin] ${
                  mobileOpen ? "block" : "hidden lg:block"
                }`}
              >
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className={[
                        "block rounded-md py-1.5 text-[13px] leading-snug transition-colors duration-200",
                        heading.level === 3 ? "pl-3 pr-1" : "px-1",
                        activeId === heading.id
                          ? "text-[#DDEBFF]"
                          : "text-white/50 hover:text-white/80",
                      ].join(" ")}
                      style={
                        activeId === heading.id
                          ? { boxShadow: "inset 2px 0 0 #3B82F6" }
                          : undefined
                      }
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className={`${headings.length > 0 ? "mt-5 border-t border-white/8 pt-4" : "mt-5"}`}>
            <p className="text-[10px] font-medium tracking-[0.18em] text-white/45 uppercase">Share article</p>
            <div className="mt-3 flex items-center gap-2">
              <ShareLink
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                label="Share on LinkedIn"
                icon={<AtSign size={14} />}
              />
              <ShareLink
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                label="Share on X"
                icon={<Send size={14} />}
              />
              <ShareLink
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                label="Share on Facebook"
                icon={<Globe2 size={14} />}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ShareLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 text-white/60 transition-colors hover:border-white/25 hover:text-white"
    >
      {icon}
    </a>
  );
}
