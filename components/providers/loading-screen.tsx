"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [barDone, setBarDone] = useState(false);

  useEffect(() => {
    // Simulate loading — complete after ~1.4s
    const barTimer = setTimeout(() => setBarDone(true), 900);
    const exitTimer = setTimeout(() => setVisible(false), 1600);
    return () => {
      clearTimeout(barTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#07111F]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          {/* Ambient background orbs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,102,255,0.18) 0%, transparent 68%)",
              }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: EASE }}
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Image
              src="/Uptrix.png"
              alt="Uptrix Technologies"
              width={200}
              height={55}
              priority
              className="h-12 w-auto object-contain"
            />
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="mt-10 h-[2px] w-48 overflow-hidden rounded-full bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#0066FF] via-[#70A8FF] to-[#0066FF]"
              initial={{ x: "-100%" }}
              animate={{ x: barDone ? "0%" : "-20%" }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="mt-5 text-[11px] tracking-[0.28em] text-white/42 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            AI-Powered Growth
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
