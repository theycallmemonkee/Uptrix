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
        className="fixed inset-x-0 top-0 z-[70] h-[3px]"
        style={{ opacity }}
      >
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX,
            background: "linear-gradient(to right, #0066FF, #60A5FA, #0066FF)",
            boxShadow: "0 1px 4px rgba(0,102,255,0.2)",
          }}
        />
      </motion.div>


    </>
  );
}
