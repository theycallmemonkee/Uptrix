"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Heading = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  headings: Heading[];
  variant?: "desktop" | "tablet" | "mobile";
};

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" {...props}>
      <path d="M9 8H7v3h2v9h3v-9h2.72l.42-3H12V6c0-.88.11-1 1-1h2V2h-3c-3 0-4 1.48-4 4v2z" />
    </svg>
  );
}

export function BlogLeftTOC({ headings, variant = "desktop" }: Props) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const ids = useMemo(() => headings.map((h) => h.id), [headings]);

  useEffect(() => {
    if (!ids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    ids.forEach((id) => {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    });

    return () => observer.disconnect();
  }, [ids]);

  if (!headings.length) return null;

  // Render collapsible view for mobile
  if (variant === "mobile") {
    return (
      <div className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] p-4 shadow-sm">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex w-full items-center justify-between text-[#111827]"
        >
          <span className="text-xs font-bold tracking-widest text-[#111827] uppercase">Table of Contents</span>
          <ChevronDown
            size={16}
            className={`text-[#6B7280] transition-transform duration-300 ${mobileOpen ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3 pt-3 border-t border-gray-200"
            >
              <ul className="space-y-2">
                {headings.map((heading) => (
                  <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
                    <a
                      href={`#${heading.id}`}
                      onClick={() => setMobileOpen(false)}
                      className={`block text-sm py-1 ${
                        activeId === heading.id
                          ? "text-[#0066FF] font-semibold"
                          : "text-[#6B7280] hover:text-[#111827]"
                      }`}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Render expanded card view for tablet
  if (variant === "tablet") {
    return (
      <div className="w-full rounded-xl border border-gray-150 bg-[#F8FAFC] p-5 shadow-sm">
        <h3 className="text-xs font-bold tracking-widest text-[#111827] uppercase">Table of Contents</h3>
        <div className="h-[2px] w-8 bg-gray-300 mt-2 mb-4" />
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
          {headings.map((heading) => (
            <li key={heading.id} className={heading.level === 3 ? "pl-3 border-l border-gray-200" : ""}>
              <a
                href={`#${heading.id}`}
                className={`block text-sm py-1 transition-colors ${
                  activeId === heading.id ? "text-[#0066FF] font-semibold" : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Desktop view (Left Column vertical TOC)
  return (
    <nav className="w-full">
      <h3 className="text-xs font-bold tracking-widest text-[#111827] uppercase">Table of Contents</h3>
      <div className="h-[2px] w-8 bg-[#111] mt-2.5 mb-4" />
      <ul className="relative border-l border-gray-100 ml-1 space-y-2 py-1">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`block transition-all duration-200 text-sm py-1.5 -ml-px border-l ${
                  heading.level === 3 ? "pl-6 text-[13px]" : "pl-4"
                } ${
                  isActive
                    ? "text-[#0066FF] border-[#0066FF] font-semibold"
                    : "text-[#6B7280] border-transparent hover:text-[#111827] hover:border-gray-200"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function BlogLeftShare({ shareUrl, shareTitle }: { shareUrl: string; shareTitle: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full">
      <h4 className="text-[10px] font-bold tracking-widest text-[#6B7280] uppercase">Share Article</h4>
      <div className="mt-3.5 flex items-center gap-3">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Share on LinkedIn"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-[#F8FAFC] text-[#6B7280] transition-all duration-200 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
        >
          <LinkedinIcon />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Share on X"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-[#F8FAFC] text-[#6B7280] transition-all duration-200 hover:bg-black hover:text-white hover:border-black"
        >
          <XIcon />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Share on Facebook"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-[#F8FAFC] text-[#6B7280] transition-all duration-200 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
        >
          <FacebookIcon />
        </a>
        <button
          onClick={handleCopyLink}
          aria-label="Copy Link"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-[#F8FAFC] text-[#6B7280] transition-all duration-200 hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] relative"
        >
          {copied ? <Check size={14} className="text-green-500 hover:text-white" /> : <Copy size={14} />}
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-[#111827] px-2 py-1 text-[10px] font-medium text-white shadow-sm whitespace-nowrap">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
