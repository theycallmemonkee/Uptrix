"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import type { Components } from "react-markdown";
import { Lightbulb, TrendingUp, Quote, Zap } from "lucide-react";

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()+=[\]{}|\\:;"'<>,.?/]/g, "")
    .replace(/\s+/g, "-");
}

// Detect special block types from paragraph content
function isInsightCard(text: string) {
  return text.startsWith("💡") || text.toLowerCase().startsWith("insight:");
}
function isStatCard(text: string) {
  return text.startsWith("📊") || text.toLowerCase().startsWith("stat:");
}
function isTipCard(text: string) {
  return text.startsWith("🚀") || text.toLowerCase().startsWith("tip:");
}
function isWarning(text: string) {
  return text.startsWith("⚠️") || text.toLowerCase().startsWith("warning:");
}

const FADE_UP = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function BlogContent({ content }: { content: string }) {
  const components: Components = {
    h1: ({ children }) => {
      const text = String(children).replace(/,/g, "");
      const id = slugifyHeading(text);
      return (
        <motion.h1
          id={id}
          variants={FADE_UP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 scroll-mt-28 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
        >
          {children}
        </motion.h1>
      );
    },
    h2: ({ children }) => {
      const text = String(children).replace(/,/g, "");
      const id = slugifyHeading(text);
      return (
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 mb-0"
        >
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-[#0066FF]/40 to-transparent" />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#0066FF]/60 uppercase">Section</span>
          </div>
          <h2
            id={id}
            className="scroll-mt-28 mt-4 font-heading text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-[2rem]"
          >
            <span className="relative inline-block">
              {children}
              <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-[#0066FF]/60 to-transparent" />
            </span>
          </h2>
        </motion.div>
      );
    },
    h3: ({ children }) => {
      const text = String(children).replace(/,/g, "");
      const id = slugifyHeading(text);
      return (
        <motion.h3
          id={id}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 scroll-mt-28 font-heading text-xl font-semibold tracking-tight text-[#D4E8FF] md:text-2xl"
        >
          <span className="mr-2 text-[#3B82F6]/60">—</span>
          {children}
        </motion.h3>
      );
    },
    p: ({ children }) => {
      const text = String(children);

      if (isInsightCard(text)) {
        return (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="my-8 flex gap-4 rounded-2xl border border-[#3B82F6]/25 bg-[linear-gradient(135deg,rgba(14,40,90,0.6),rgba(6,20,50,0.6))] p-5 shadow-[0_8px_32px_rgba(0,102,255,0.12)] backdrop-blur-sm"
          >
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0066FF]/20 ring-1 ring-[#0066FF]/30">
              <Lightbulb size={16} className="text-[#60A5FA]" />
            </div>
            <div>
              <p className="mb-1 text-[11px] font-semibold tracking-[0.2em] text-[#60A5FA]/80 uppercase">Insight</p>
              <p className="text-[0.95rem] leading-7 text-white/82">{text.replace(/^💡\s*|^insight:\s*/i, "")}</p>
            </div>
          </motion.div>
        );
      }

      if (isStatCard(text)) {
        return (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="my-8 flex gap-4 rounded-2xl border border-[#22C55E]/20 bg-[linear-gradient(135deg,rgba(14,50,30,0.55),rgba(6,20,14,0.6))] p-5 shadow-[0_8px_32px_rgba(34,197,94,0.08)] backdrop-blur-sm"
          >
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#22C55E]/15 ring-1 ring-[#22C55E]/25">
              <TrendingUp size={16} className="text-[#4ADE80]" />
            </div>
            <div>
              <p className="mb-1 text-[11px] font-semibold tracking-[0.2em] text-[#4ADE80]/80 uppercase">Key Metric</p>
              <p className="text-[0.95rem] leading-7 text-white/82">{text.replace(/^📊\s*|^stat:\s*/i, "")}</p>
            </div>
          </motion.div>
        );
      }

      if (isTipCard(text)) {
        return (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="my-8 flex gap-4 rounded-2xl border border-[#F59E0B]/20 bg-[linear-gradient(135deg,rgba(50,35,10,0.55),rgba(25,14,4,0.6))] p-5 shadow-[0_8px_32px_rgba(245,158,11,0.08)] backdrop-blur-sm"
          >
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F59E0B]/15 ring-1 ring-[#F59E0B]/25">
              <Zap size={16} className="text-[#FBB040]" />
            </div>
            <div>
              <p className="mb-1 text-[11px] font-semibold tracking-[0.2em] text-[#FBB040]/80 uppercase">Pro Tip</p>
              <p className="text-[0.95rem] leading-7 text-white/82">{text.replace(/^🚀\s*|^tip:\s*/i, "")}</p>
            </div>
          </motion.div>
        );
      }

      return (
        <p className="mt-6 text-[1.02rem] leading-[1.92] text-white/76 tracking-[0.005em]">
          {children}
        </p>
      );
    },
    blockquote: ({ children }) => (
      <motion.blockquote
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-10 overflow-hidden rounded-2xl border-l-[3px] border-[#3B82F6]/60 bg-[linear-gradient(135deg,rgba(14,40,90,0.45),rgba(6,14,28,0.5))] px-7 py-6 shadow-[0_12px_40px_rgba(0,102,255,0.1)] backdrop-blur-sm"
      >
        <Quote className="absolute top-4 right-5 h-16 w-16 text-[#0066FF]/10" />
        <div className="relative text-lg leading-8 text-[#DDEBFF]/90 font-medium italic">
          {children}
        </div>
      </motion.blockquote>
    ),
    ul: ({ children }) => (
      <motion.ul
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 space-y-2.5 text-white/78"
      >
        {children}
      </motion.ul>
    ),
    ol: ({ children }) => (
      <motion.ol
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 space-y-2.5 text-white/78 counter-reset-item"
      >
        {children}
      </motion.ol>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-3 leading-7 text-[0.97rem]">
        <span className="mt-[6px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0066FF]/18 ring-1 ring-[#0066FF]/28">
          <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
        </span>
        <span>{children}</span>
      </li>
    ),
    code: ({ children, className }) => {
      const isBlock = Boolean(className?.includes("language-"));
      if (!isBlock) {
        return (
          <code className="rounded-md border border-[#3B82F6]/20 bg-[#0066FF]/10 px-1.5 py-0.5 text-[0.88em] font-mono text-[#93C5FD]">
            {children}
          </code>
        );
      }
      return <code className={className}>{children}</code>;
    },
    pre: ({ children }) => (
      <motion.pre
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-[#030A16]/90 p-6 text-sm leading-7 text-[#DDEBFF] shadow-[0_16px_50px_rgba(2,9,22,0.55)] ring-1 ring-inset ring-white/6"
      >
        {children}
      </motion.pre>
    ),
    hr: () => (
      <div className="my-14 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent" />
        <div className="flex gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-[#0066FF]/40" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#0066FF]/25" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#0066FF]/12" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent" />
      </div>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="animated-underline relative inline-block text-[#93C5FD] transition-colors duration-200 hover:text-white"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-white/95">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-[#DDEBFF]/85 not-italic font-medium">{children}</em>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className="blog-prose max-w-none"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </motion.div>
  );
}
