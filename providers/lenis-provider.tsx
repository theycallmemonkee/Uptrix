"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface LenisInstance {
  raf: (time: number) => void;
  destroy: () => void;
  scrollTo: (target: number | string | HTMLElement, options?: { immediate?: boolean }) => void;
}

export function LenisProvider() {
  const pathname = usePathname();
  const lenisRef = useRef<LenisInstance | null>(null);

  useEffect(() => {
    let lenis: LenisInstance | null = null;
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
        } as ConstructorParameters<typeof LenisClass>[0]) as unknown as LenisInstance;

        lenisRef.current = lenis;

        // Force scroll reset on initial startup
        lenis.scrollTo(0, { immediate: true });

        function raf(time: number) {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);
      } catch {
        console.error("Lenis init failed");
      }
    }

    init();

    return () => {
      cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
      }
      lenisRef.current = null;
    };
  }, []);

  // Track pathname transitions and scroll back to top of new view instantly
  useEffect(() => {
    if (lenisRef.current) {
      try {
        lenisRef.current.scrollTo(0, { immediate: true });
      } catch {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    } else {
      try {
        window.scrollTo({ top: 0, behavior: "auto" });
      } catch {}
    }
  }, [pathname]);

  return null;
}
