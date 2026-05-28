"use client";

import {
  useMotionValue,
  useSpring,
  motion,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

export function CursorGlow() {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 22, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 22, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  // Use as CSS custom properties for the radial gradient
  const left = useTransform(springX, (v) => `${v}px`);
  const top = useTransform(springY, (v) => `${v}px`);

  return (
    <motion.div
      aria-hidden
      className="cursor-glow pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      style={{ left: 0, top: 0 }}
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left,
          top,
          width: 580,
          height: 580,
          background:
            "radial-gradient(circle, rgba(0,102,255,0.07) 0%, rgba(0,102,255,0.03) 35%, transparent 70%)",
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />
      {/* Tight sharp inner dot */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left,
          top,
          width: 8,
          height: 8,
          background: "rgba(100,160,255,0.55)",
          boxShadow: "0 0 12px 4px rgba(0,102,255,0.35)",
          willChange: "transform",
        }}
      />
    </motion.div>
  );
}
