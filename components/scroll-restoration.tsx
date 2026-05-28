"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const KEY = "uptrix:scroll";

type ScrollMap = Record<string, number>;

function readMap(): ScrollMap {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ScrollMap) : {};
  } catch {
    return {};
  }
}

function writeMap(map: ScrollMap) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

export function ScrollRestoration() {
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

    const onPageHide = () => {
      const map = readMap();
      map[pathname] = window.scrollY;
      writeMap(map);
    };

    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prevPath = prevPathRef.current;
    prevPathRef.current = pathname;

    // Save previous route scroll on navigation.
    if (prevPath && prevPath !== pathname) {
      const map = readMap();
      map[prevPath] = window.scrollY;
      writeMap(map);
    }

    // Restore scroll for current route (back/forward).
    const map = readMap();
    const y = map[pathname];
    if (typeof y === "number") {
      // Two rAFs helps with App Router hydration/layout shifts.
      requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "auto" })));
    }
  }, [pathname]);

  return null;
}

