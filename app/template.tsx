"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// GPU-friendly: only opacity + transform (no filter: blur which forces rasterisation)
// No persistent will-change: transform here — it makes this div the containing block
// for every position:fixed descendant (navbar, mobile menu), breaking them.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
