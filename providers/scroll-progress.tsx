"use client";

import { motion, useScroll, useSpring } from "framer-motion";

const EASE_LINEAR = [0, 0, 1, 1] as const;

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[9999] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(to right, #0066FF, #70A8FF, #0066FF)",
        backgroundSize: "200% 100%",
        willChange: "transform",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        backgroundPosition: {
          duration: 3,
          repeat: Infinity,
          ease: EASE_LINEAR,
        },
      }}
    />
  );
}
