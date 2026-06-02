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
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
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
            className="mt-14 mb-6 w-full scroll-mt-28 first:mt-4"
          >
            <h2
              id={id}
              className="w-full font-heading text-[28px] sm:text-[42px] font-bold leading-[1.2] tracking-tight text-[#111827]"
            >
              {children}
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
            className="mt-10 mb-4 w-full scroll-mt-28 font-heading text-[22px] sm:text-[30px] font-semibold tracking-tight text-[#111827]"
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
            <span className="block font-heading text-lg sm:text-xl leading-[1.6] font-medium text-[#111827] italic">
              {children}
            </span>
          );
        }

        // Callout box: Insight Card
        if (/^insight:/i.test(text) || text.startsWith("💡")) {
          const copy = text.replace(/^💡\s*|^insight:\s*/i, "");
          return (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={FADE_UP}
              className="my-10 w-full rounded-[24px] border border-[#E5E7EB] bg-[#F8FAFC] p-8 shadow-sm"
            >
              <div className="relative flex flex-col sm:flex-row gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0066FF]/10 ring-1 ring-[#0066FF]/20">
                  <Lightbulb size={18} className="text-[#0066FF]" />
                </div>
                <div>
                  <span className="inline-flex rounded-full bg-[#0066FF]/10 px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#0066FF] uppercase">
                    Key Insight
                  </span>
                  <div className="mt-3 text-[18px] sm:text-[20px] leading-[1.9] text-[#111827] font-medium">
                    {copy}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        }

        // Callout box: Takeaway Card
        if (/^takeaway:/i.test(text)) {
          const copy = text.replace(/^takeaway:\s*/i, "");
          return (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={FADE_UP}
              className="my-10 w-full rounded-[24px] border border-[#DCFCE7] bg-[#F0FDF4] p-8 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 ring-1 ring-green-200">
                  <Target size={18} className="text-green-700" />
                </div>
                <div>
                  <span className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-bold tracking-wider text-green-800 uppercase">
                    Key Takeaway
                  </span>
                  <div className="mt-3 text-[18px] sm:text-[20px] leading-[1.9] text-[#111827] font-medium">
                    {copy}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        }

        // Callout box: Statistics Card
        if (/^stat:/i.test(text)) {
          const { value, label } = parseStatBlock(text);
          return (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={FADE_UP}
              className="my-10 w-full rounded-[24px] border border-[#E5E7EB] bg-white p-8 text-center shadow-sm"
            >
              <div className="font-heading text-[48px] sm:text-[64px] font-extrabold leading-none tracking-tight text-[#0066FF]">
                {value}
              </div>
              {label ? (
                <div className="mt-3 w-full text-[18px] sm:text-[20px] leading-[1.8] text-[#4B5563] font-medium">
                  {label}
                </div>
              ) : null}
            </motion.div>
          );
        }

        // Callout box: Framework Card
        if (/^framework:/i.test(text)) {
          const steps = parseFrameworkSteps(text);
          return (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={FADE_UP}
              className="my-10 w-full rounded-[24px] border border-[#E5E7EB] bg-[#F8FAFC] p-8 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-[#0066FF] uppercase">
                <Sparkles size={13} />
                Framework
              </div>
              <ol className="relative space-y-0">
                {steps.map((step, index) => (
                  <li key={step} className="relative flex gap-5 pb-8 last:pb-0">
                    {index < steps.length - 1 ? (
                      <span className="absolute left-[1.125rem] top-9 bottom-0 w-px bg-gray-200" />
                    ) : null}
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0066FF]/10 text-sm font-semibold text-[#0066FF]">
                      {index + 1}
                    </span>
                    <div className="pt-1">
                      <div className="text-[11px] font-bold tracking-[0.16em] text-[#6B7280] uppercase">Step {index + 1}</div>
                      <div className="mt-1 text-[18px] sm:text-[20px] leading-[1.8] text-[#1F2937] font-medium">{step}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>
          );
        }

        return (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={FADE_UP}
            className="mt-6 text-[18px] sm:text-[20px] leading-[1.9] text-[#1F2937]"
          >
            {children}
          </motion.div>
        );
      },
      blockquote: ({ children }) => (
        <motion.blockquote
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={FADE_UP}
          className="relative my-10 w-full overflow-hidden rounded-r-2xl border-l-4 border-[#0066FF] bg-[#F8FAFC] px-8 py-7 shadow-sm"
        >
          <Quote className="absolute right-6 top-5 h-12 w-12 text-[#0066FF]/5" />
          <div className="relative">{children}</div>
        </motion.blockquote>
      ),
      ul: ({ children }) => (
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={FADE_UP}
          className="mt-6 space-y-3 list-disc pl-6 text-[18px] sm:text-[20px] leading-[1.9] text-[#1F2937]"
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
          className="mt-6 space-y-3 list-decimal pl-6 text-[18px] sm:text-[20px] leading-[1.9] text-[#1F2937]"
        >
          {children}
        </motion.ol>
      ),
      li: ({ children }) => (
        <li className="pl-1 text-[#1F2937] marker:text-[#0066FF] marker:font-bold">
          {children}
        </li>
      ),
      code: ({ children, className }) => {
        const isBlock = Boolean(className?.includes("language-"));
        if (!isBlock) {
          return (
            <code className="rounded-md border border-gray-200 bg-[#F8FAFC] px-1.5 py-0.5 font-mono text-[0.9em] text-[#0066FF]">
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
          className="my-10 w-full overflow-x-auto rounded-2xl border border-gray-800 bg-[#0F172A] p-6 text-sm leading-7 text-[#F8FAFC] shadow-md font-mono"
        >
          {children}
        </motion.pre>
      ),
      img: ({ src, alt }) => (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={FADE_UP}
          className="my-12 w-full overflow-hidden rounded-[24px] md:rounded-[32px] border border-gray-100 shadow-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt || "Blog content graphic"}
            className="w-full h-auto object-cover rounded-[24px] md:rounded-[32px]"
          />
          {alt && (
            <figcaption className="mt-3 text-center text-sm text-[#6B7280] italic">
              {alt}
            </figcaption>
          )}
        </motion.div>
      ),
      table: ({ children }) => (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={FADE_UP}
          className="my-10 w-full overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white"
        >
          <table className="w-full border-collapse text-left">
            {children}
          </table>
        </motion.div>
      ),
      thead: ({ children }) => (
        <thead className="bg-[#F8FAFC] border-b border-gray-200 sticky top-0 z-10">
          {children}
        </thead>
      ),
      tbody: ({ children }) => (
        <tbody className="divide-y divide-gray-100">
          {children}
        </tbody>
      ),
      tr: ({ children }) => (
        <tr className="hover:bg-[#F8FAFC]/50 transition-colors duration-150">
          {children}
        </tr>
      ),
      th: ({ children }) => (
        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#111827]">
          {children}
        </th>
      ),
      td: ({ children }) => (
        <td className="px-6 py-4 text-[16px] leading-[1.6] text-[#4B5563]">
          {children}
        </td>
      ),
      hr: () => (
        <div className="my-16 flex w-full items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#0066FF]" />
          <div className="h-px flex-1 bg-gray-200" />
        </div>
      ),
      a: ({ href, children }) => (
        <a
          href={href}
          className="text-[#0066FF] font-semibold underline decoration-[#0066FF]/35 underline-offset-4 transition-colors hover:text-[#1552B6]"
          target={href?.startsWith("http") ? "_blank" : undefined}
          rel={href?.startsWith("http") ? "noreferrer" : undefined}
        >
          {children}
        </a>
      ),
      strong: ({ children }) => <strong className="font-bold text-[#111827]">{children}</strong>,
      em: ({ children }) => <em className="italic text-[#4B5563]">{children}</em>,
    };
  }, []);

  return (
    <div className="mt-8 w-full lg:mt-10">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
