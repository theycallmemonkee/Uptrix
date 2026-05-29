"use client";

import { motion } from "framer-motion";
import React from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BlogContentAnimated({ contentHtml }: { contentHtml: string }) {
  return (
    <motion.div
      className="prose prose-invert mx-auto max-w-[70ch] prose-h1:text-[64px] prose-h2:text-[40px] prose-h3:text-[28px] prose-p:text-[20px] prose-p:leading-[1.9] prose-headings:font-heading prose-headings:tracking-tight"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
