"use client";

import { useEffect } from "react";

export function LenisProvider() {
  useEffect(() => {
    let lenis: {
      raf: (time: number) => void;
      destroy: () => void;
    } | null = null;

    let rafId: number;

    async function init() {
      try {
        const LenisClass = (await import("@studio-freight/lenis")).default;

        lenis = new LenisClass({
          duration: 1.25,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 1.5,
          infinite: false,
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
        } as ConstructorParameters<typeof LenisClass>[0]);

        function raf(time: number) {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);
      } catch {
        // If Lenis fails (SSR guard, old browser), silently fall back
      }
    }

    init();

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
}
