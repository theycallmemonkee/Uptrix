"use client";

import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import type { Components } from "react-markdown";
import { Lightbulb, Target, Quote, Sparkles } from "lucide-react";
import { useMemo } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const FADE_UP = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE },
  },
};

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()+=[\]{}|\\:;"'<>,.?/]/g, "")
    .replace(/\s+/g, "-");
}

function plainText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map((c) => plainText(c)).join("");
  if (children && typeof children === "object" && "props" in children) {
    return plainText((children as { props?: { children?: ReactNode } }).props?.children);
  }
  return String(children ?? "");
}

function parseStatBlock(text: string) {
  const body = text.replace(/^stat:\s*/i, "").trim();
  const pipe = body.indexOf("|");
  if (pipe > -1) {
    return { value: body.slice(0, pipe).trim(), label: body.slice(pipe + 1).trim() };
  }
  const dash = body.indexOf("—");
  if (dash > -1) {
    return { value: body.slice(0, dash).trim(), label: body.slice(dash + 1).trim() };
  }
  const match = body.match(/^([\d.]+%?)\s+(.+)$/);
  if (match) return { value: match[1], label: match[2] };
  return { value: body, label: "" };
}

function parseFrameworkSteps(text: string) {
  return text
    .replace(/^framework:\s*/i, "")
    .split("|")
    .map((step) => step.trim())
    .filter(Boolean);
}

function isInsideBlockquote(node: unknown) {
  const parent = (node as { parent?: { tagName?: string } } | undefined)?.parent;
  return parent?.tagName === "blockquote";
}

export function BlogContent({ content }: { content: string }) {
  const components: Components = useMemo(() => {
    return {
      h2: ({ children }) => {
        const text = plainText(children);
        const id = slugifyHeading(text);
        return (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.45 }}
            variants={FADE_UP}
            className="blog-block-full mt-16 w-full scroll-mt-36 first:mt-4"
          >
            <h2
              id={id}
              className="w-full font-heading text-[clamp(2rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white"
            >
              <span className="relative inline-block pb-3">
                {children}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[linear-gradient(90deg,#0066FF,rgba(96,165,250,0.35),transparent)]"
                />
              </span>
            </h2>
          </motion.div>
        );
      },
      h3: ({ children }) => {
        const text = plainText(children);
        const id = slugifyHeading(text);
        return (
          <motion.h3
            id={id}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={FADE_UP}
            className="blog-block-full mt-10 w-full scroll-mt-36 font-heading text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold tracking-tight text-[#9CC3FF]"
          >
            {children}
          </motion.h3>
        );
      },
      p: ({ children, node }) => {
        const text = plainText(children).trim();
        const inBlockquote = isInsideBlockquote(node);

        if (inBlockquote) {
          return (
            <span className="block font-heading text-[clamp(1.35rem,2.5vw,1.75rem)] leading-[1.5] font-medium tracking-tight text-[#E8F2FF]">
              {children}
            </span>
          );
        }

        if (/^insight:/i.test(text) || text.startsWith("💡")) {
          const copy = text.replace(/^💡\s*|^insight:\s*/i, "");
          return (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={FADE_UP}
              className="blog-block-full relative my-10 w-full overflow-hidden rounded-2xl border border-[#3B82F6]/30 bg-[linear-gradient(135deg,rgba(0,102,255,0.16),rgba(6,20,45,0.55))] p-6 shadow-[0_0_60px_rgba(0,102,255,0.14),0_24px_60px_rgba(2,9,22,0.45)] backdrop-blur-md"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#0066FF]/25 blur-3xl" />
              <div className="relative flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0066FF]/22 ring-1 ring-[#60A5FA]/35">
                  <Lightbulb size={18} className="text-[#93C5FD]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-[#93C5FD] uppercase">Insight</p>
                  <p className="mt-2 text-[20px] leading-[1.9] text-white/86">{copy}</p>
                </div>
              </div>
            </motion.div>
          );
        }

        if (/^takeaway:/i.test(text)) {
          const copy = text.replace(/^takeaway:\s*/i, "");
          return (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={FADE_UP}
              className="blog-block-full my-10 w-full rounded-2xl border border-[#22C55E]/22 bg-[linear-gradient(135deg,rgba(34,197,94,0.1),rgba(6,24,16,0.45))] p-6 shadow-[0_20px_50px_rgba(2,9,22,0.4)] backdrop-blur-sm"
            >
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#22C55E]/16 ring-1 ring-[#4ADE80]/28">
                  <Target size={18} className="text-[#86EFAC]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-[#86EFAC] uppercase">Key Takeaway</p>
                  <p className="mt-2 text-[20px] leading-[1.9] text-white/86">{copy}</p>
                </div>
              </div>
            </motion.div>
          );
        }

        if (/^stat:/i.test(text)) {
          const { value, label } = parseStatBlock(text);
          return (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={FADE_UP}
              className="blog-block-full my-12 w-full rounded-2xl border border-white/12 bg-[linear-gradient(160deg,rgba(12,30,60,0.75),rgba(5,12,24,0.85))] px-8 py-10 text-center shadow-[0_28px_80px_rgba(2,9,22,0.55)] ring-1 ring-inset ring-white/8"
            >
              <p className="font-heading text-[clamp(3rem,8vw,4.5rem)] font-bold leading-none tracking-tight text-transparent bg-clip-text bg-[linear-gradient(135deg,#FFFFFF,#60A5FA)]">
                {value}
              </p>
              {label ? (
                <p className="mt-4 w-full text-[20px] leading-[1.9] text-white/68">{label}</p>
              ) : null}
            </motion.div>
          );
        }

        if (/^framework:/i.test(text)) {
          const steps = parseFrameworkSteps(text);
          return (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={FADE_UP}
              className="blog-block-full relative my-12 w-full rounded-2xl border border-white/12 bg-white/[0.03] p-6 md:p-8 shadow-[0_24px_70px_rgba(2,9,22,0.5)] backdrop-blur-md"
            >
              <p className="mb-6 flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#93C5FD] uppercase">
                <Sparkles size={13} />
                Framework
              </p>
              <ol className="relative space-y-0">
                {steps.map((step, index) => (
                  <li key={step} className="relative flex gap-5 pb-10 last:pb-0">
                    {index < steps.length - 1 ? (
                      <span className="absolute left-[1.15rem] top-10 bottom-0 w-px bg-gradient-to-b from-[#3B82F6]/55 to-transparent" />
                    ) : null}
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0066FF]/20 text-sm font-semibold text-[#93C5FD] ring-1 ring-[#3B82F6]/40">
                      {index + 1}
                    </span>
                    <div className="pt-1">
                      <p className="text-[11px] font-medium tracking-[0.16em] text-white/45 uppercase">Step {index + 1}</p>
                      <p className="mt-1.5 text-[20px] leading-[1.9] text-white/84">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>
          );
        }

        return (
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={FADE_UP}
            className="blog-article-text mt-6 text-[20px] leading-[1.9] text-white/80"
          >
            {children}
          </motion.p>
        );
      },
      blockquote: ({ children }) => (
        <motion.blockquote
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={FADE_UP}
          className="blog-block-full relative my-10 w-full overflow-hidden rounded-2xl border border-[#3B82F6]/20 bg-[linear-gradient(135deg,rgba(14,40,90,0.35),rgba(6,14,28,0.4))] px-8 py-7 shadow-[0_20px_60px_rgba(2,9,22,0.35)]"
        >
          <Quote className="absolute right-6 top-5 h-12 w-12 text-[#0066FF]/15" />
          <div className="relative">{children}</div>
        </motion.blockquote>
      ),
      ul: ({ children }) => (
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={FADE_UP}
          className="blog-article-text blog-ul mt-8 w-full space-y-4"
        >
          {children}
        </motion.ul>
      ),
      ol: ({ children }) => (
        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={FADE_UP}
          className="blog-article-text blog-ol mt-8 w-full space-y-4"
        >
          {children}
        </motion.ol>
      ),
      li: ({ children }) => (
        <li className="blog-li text-[20px] leading-[1.9] text-white/78">
          <span>{children}</span>
        </li>
      ),
      code: ({ children, className }) => {
        const isBlock = Boolean(className?.includes("language-"));
        if (!isBlock) {
          return (
            <code className="rounded-md border border-[#3B82F6]/22 bg-[#0066FF]/12 px-1.5 py-0.5 font-mono text-[0.9em] text-[#93C5FD]">
              {children}
            </code>
          );
        }
        return <code className={className}>{children}</code>;
      },
      pre: ({ children }) => (
        <motion.pre
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={FADE_UP}
          className="blog-block-full mt-10 w-full overflow-x-auto rounded-2xl border border-white/10 bg-[#030A16]/92 p-6 text-sm leading-7 text-[#DDEBFF] shadow-[0_20px_60px_rgba(2,9,22,0.55)] ring-1 ring-inset ring-white/6"
        >
          {children}
        </motion.pre>
      ),
      hr: () => (
        <div className="blog-block-full my-16 flex w-full items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#0066FF]/35 to-transparent" />
          <div className="h-2 w-2 rounded-full bg-[#0066FF]/50 shadow-[0_0_12px_rgba(0,102,255,0.6)]" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#0066FF]/35 to-transparent" />
        </div>
      ),
      a: ({ href, children }) => (
        <a
          href={href}
          className="text-[#93C5FD] underline decoration-[#3B82F6]/40 underline-offset-4 transition-colors hover:text-white"
          target={href?.startsWith("http") ? "_blank" : undefined}
          rel={href?.startsWith("http") ? "noreferrer" : undefined}
        >
          {children}
        </a>
      ),
      strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
      em: ({ children }) => <em className="text-[#DDEBFF]/88">{children}</em>,
    };
  }, []);

  return (
    <div className="blog-article-prose mt-8 w-full lg:mt-10">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
