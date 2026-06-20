import { useState, useEffect } from "react";

export function useWindowScroll() {
  const [scrollState, setScrollState] = useState({
    y: 0,
    x: 0,
    scrolled: false,
    direction: "none" as "up" | "down" | "none",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const currentX = window.scrollX;
      const direction = currentY > lastY ? "down" : currentY < lastY ? "up" : "none";

      setScrollState({
        y: currentY,
        x: currentX,
        scrolled: currentY > 40,
        direction,
      });

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollState;
}
