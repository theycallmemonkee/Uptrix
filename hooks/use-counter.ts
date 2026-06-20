import { useState, useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export function useCounter(end: number, decimals = 0, duration = 1400) {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(decimals ? (0).toFixed(decimals) : "0");

  useEffect(() => {
    if (!isInView) return;

    if (prefersReduced) {
      const frame = requestAnimationFrame(() => {
        setDisplay(decimals ? end.toFixed(decimals) : String(end));
      });
      return () => cancelAnimationFrame(frame);
    }

    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
      const val = end * eased;

      setDisplay(decimals ? val.toFixed(decimals) : Math.floor(val).toString());

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, prefersReduced, end, decimals, duration]);

  return { ref, display };
}
