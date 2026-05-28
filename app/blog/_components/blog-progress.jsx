"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function BlogProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.7 });

  return (
    <div className="fixed inset-x-0 top-0 z-[80] h-[2px] bg-transparent">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[#79ABFF] via-[#0066FF] to-[#79ABFF]"
        style={{ scaleX }}
      />
    </div>
  );
}
