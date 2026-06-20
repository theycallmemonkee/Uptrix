"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ClientLogoStrip } from "@/components/ui/client-logo-strip";

const EASE = [0.22, 1, 0.36, 1] as const;

type StatItem = {
  prefix?: string;
  end: number;
  decimals?: number;
  suffix: string;
  label: string;
};

const STATS: StatItem[] = [
  { prefix: "$", end: 2.5, decimals: 1, suffix: "M+", label: "Ad Spend Managed" },
  { end: 3.21, decimals: 2, suffix: "x", label: "Average ROAS" },
  { end: 955, suffix: "%", label: "Growth Generated" },
  { end: 50, suffix: "+", label: "Brands Served" },
];

function CountUpStat({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(stat.decimals ? (0).toFixed(stat.decimals) : "0");

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setDisplay(stat.decimals ? stat.end.toFixed(stat.decimals) : String(stat.end));
      return;
    }

    const DURATION = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = stat.end * eased;
      setDisplay(stat.decimals ? current.toFixed(stat.decimals) : Math.floor(current).toString());
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, prefersReducedMotion, stat]);

  return (
    <p
      ref={ref}
      className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl tabular-nums"
    >
      {stat.prefix ?? ""}{display}{stat.suffix}
    </p>
  );
}

export function TrustedCompanies() {
  return (
    <div className="relative z-10 w-full">
      {/* 1. Metrics */}
      <div className="mx-auto mt-4 max-w-5xl px-6 md:px-10">
        <div className="border-t border-white/[0.06] pt-10">
          <motion.div
            className="grid grid-cols-2 items-center gap-y-8 gap-x-6 md:grid-cols-4 md:gap-x-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <CountUpStat stat={stat} />
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/48">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 2. Logo strip */}
      <div className="mt-10 pb-14 md:pb-16">
        <ClientLogoStrip title="Trusted by growing brands worldwide" className="w-full" />
      </div>
    </div>
  );
}
