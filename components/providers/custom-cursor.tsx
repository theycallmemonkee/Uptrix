"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "click" | "text";

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const isTouchDevice = useRef(false);

  // Smooth spring-based following
  const springConfig = { stiffness: 350, damping: 28, mass: 0.5 };
  const slowConfig  = { stiffness: 120, damping: 20, mass: 0.8 };

  const dotX = useSpring(mouseX, springConfig);
  const dotY = useSpring(mouseY, springConfig);
  const ringX = useSpring(mouseX, slowConfig);
  const ringY = useSpring(mouseY, slowConfig);
  const glowX = useSpring(mouseX, { stiffness: 60, damping: 18, mass: 1.2 });
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 18, mass: 1.2 });

  useEffect(() => {
    // Detect touch — hide cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      isTouchDevice.current = true;
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.matches("a, button, [role='button'], [data-cursor='hover'], label") ||
        target.closest("a, button, [role='button']")
      ) {
        setCursorState("hover");
      } else if (target.matches("p, h1, h2, h3, h4, span, li")) {
        setCursorState("text");
      } else {
        setCursorState("default");
      }
    };

    const onDown  = () => setCursorState("click");
    const onUp    = () => setCursorState("default");
    const onLeave = () => setIsVisible(false);
    const onEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onEnter, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnterWindow);

    // Hide native cursor globally
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnterWindow);
      document.documentElement.style.cursor = "";
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice.current) return null;

  const isHover = cursorState === "hover";
  const isClick = cursorState === "click";
  const isText  = cursorState === "text";

  return (
    <>
      {/* Outer ambient glow — slowest */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10001] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
        style={{
          x: glowX,
          y: glowY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width:  isHover ? 180 : 120,
          height: isHover ? 180 : 120,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: isHover
              ? "radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,102,255,0.07) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10002] -translate-x-1/2 -translate-y-1/2 rounded-full border will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          opacity: isVisible ? 1 : 0,
          borderColor: isHover
            ? "rgba(0,102,255,0.7)"
            : isText
            ? "rgba(255,255,255,0.3)"
            : "rgba(255,255,255,0.45)",
          mixBlendMode: "difference",
        }}
        animate={{
          width:  isClick ? 18 : isHover ? 44 : isText ? 3 : 36,
          height: isClick ? 18 : isHover ? 44 : isText ? 28 : 36,
          borderRadius: isText ? "2px" : "50%",
          borderWidth: isHover ? 1.5 : 1,
          scale: isClick ? 0.8 : 1,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Dot — fastest */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10003] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          opacity: isVisible ? 1 : 0,
          background: isHover ? "rgba(0,102,255,1)" : "rgba(255,255,255,0.9)",
          boxShadow: isHover
            ? "0 0 12px 4px rgba(0,102,255,0.55)"
            : "0 0 6px 2px rgba(255,255,255,0.25)",
        }}
        animate={{
          width:  isClick ? 6 : isHover ? 8 : 5,
          height: isClick ? 6 : isHover ? 8 : 5,
          scale:  isClick ? 0.6 : 1,
        }}
        transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}
