"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function encode(value: string) {
  return encodeURIComponent(value);
}

export function BlogShare({ title }: { title: string }) {
  const href =
    typeof window !== "undefined" ? window.location.href : "";

  const twitter = `https://twitter.com/intent/tweet?text=${encode(title)}&url=${encode(href)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encode(href)}`;

  return (
    <div className="flex items-center gap-3">
      <ShareButton href={twitter} label="Share on X" />
      <ShareButton href={linkedin} label="Share on LinkedIn" />
    </div>
  );
}

function ShareButton({ href, label }: { href: string; label: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        className="inline-flex items-center rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/80 shadow-[0_16px_44px_rgba(2,9,22,0.55)] ring-1 ring-inset ring-white/8 transition-colors duration-300 hover:border-[#9CC3FF]/35 hover:text-white"
      >
        {label}
      </Link>
    </motion.div>
  );
}

