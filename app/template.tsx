"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// GPU-friendly: only opacity + transform (no filter: blur which forces rasterisation)
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: EASE }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
