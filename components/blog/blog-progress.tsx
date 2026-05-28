"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function BlogProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.6 });
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <>
      {/* Thin top progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[2px]"
        style={{ opacity }}
      >
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX,
            background: "linear-gradient(to right, #3B82F6, #0066FF, #60A5FA, #0066FF)",
            boxShadow: "0 0 12px 2px rgba(0,102,255,0.7)",
          }}
        />
      </motion.div>

      {/* Reading progress ring — bottom right */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 hidden lg:flex items-center justify-center"
        style={{ opacity }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg width="48" height="48" className="rotate-[-90deg]">
          <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="url(#progressGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            style={{ strokeDashoffset: useTransform(scaleX, [0, 1], [1, 0]) }}
          />
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#0066FF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
        </div>
      </motion.div>
    </>
  );
}
