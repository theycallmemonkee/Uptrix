"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * SplitTextReveal
 * Splits text into words and reveals them with staggered motion.
 */
export function SplitTextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.055,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.65, ease: EASE },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span> </span>}
        </span>
      ))}
    </motion.span>
  );
}

/**
 * ScrollReveal
 * Generic scroll-triggered reveal with configurable direction/blur.
 */
export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.72,
  blur = true,
  className = "",
  once = true,
}: {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  blur?: boolean;
  className?: string;
  once?: boolean;
}) {
  const initial: Record<string, number | string> = { opacity: 0 };
  if (direction === "up")    { initial.y = 28; }
  if (direction === "down")  { initial.y = -28; }
  if (direction === "left")  { initial.x = 28; }
  if (direction === "right") { initial.x = -28; }

  const visible: Record<string, number | string> = { opacity: 1 };
  if (direction !== "none") {
    if (direction === "up" || direction === "down") visible.y = 0;
    else visible.x = 0;
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={visible}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ParallaxSection
 * Wraps a section and applies a subtle vertical parallax on scroll.
 */
export function ParallaxSection({
  children,
  speed = 0.15,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [-80 * speed * 10, 80 * speed * 10]);
  const y = useSpring(raw, { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/**
 * AnimatedCounter
 * Number that counts up when it enters the viewport.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const count = useTransform(scrollYProgress, [0, 0.3], [0, value]);
  const rounded = useTransform(count, Math.round);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span transition={{ duration }}>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
