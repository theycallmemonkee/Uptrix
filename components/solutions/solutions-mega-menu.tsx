"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { 
  ChevronDown, 
  ArrowRight, 
  TrendingUp, 
  Target, 
  Globe, 
  Cpu, 
  Compass, 
  Sparkles, 
  Layers 
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SOLUTIONS } from "@/data/solutions-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  TrendingUp,
  Target,
  Globe,
  Cpu,
  Compass,
  Sparkles,
  Layers,
};

type DesktopProps = { className?: string };
type MobileProps  = { onNavigate?: () => void };

export function SolutionsDropdownDesktop({ className }: DesktopProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string>(SOLUTIONS[0].slug);
  
  const isActive = pathname.startsWith("/solutions");
  const activeSolution = SOLUTIONS.find((s) => s.slug === activeSlug) || SOLUTIONS[0];

  return (
    <div
      className={`relative ${className ?? ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="group relative inline-flex items-center gap-1 font-heading text-sm font-medium tracking-wide text-white/80 transition-colors duration-150 hover:text-white"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span>Our Solutions</span>
        <ChevronDown
          size={15}
          className={`transition-transform duration-150 ${open ? "rotate-180 text-white" : "text-white/60 group-hover:text-white"}`}
        />
        <motion.span
          className="absolute inset-x-0 -bottom-2 h-px origin-left bg-gradient-to-r from-[#70A8FF] via-[#0066FF] to-[#70A8FF]"
          initial={false}
          animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-1/2 z-50 mt-[20px] w-[min(1150px,94vw)] -translate-x-[45%]"
            initial={{ opacity: 0, y: -8, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.995 }}
            transition={{ duration: 0.2, ease: EASE }}
            role="menu"
          >
            {/* Arrow */}
            <div className="relative mx-auto mb-1 h-2 w-4 overflow-hidden" style={{ left: "-5%" }}>
              <div className="absolute inset-x-0 top-1 h-3 w-3 origin-bottom-left rotate-45 rounded-sm border border-[#8CB8FF]/22 bg-[#071426]" style={{ left: "50%", transform: "translateX(-50%) rotate(45deg)" }} />
            </div>

            <div
              className="grid grid-cols-[40%_60%] overflow-y-auto rounded-[24px] max-h-[72vh] w-full"
              style={{
                border: "1px solid rgba(120, 170, 255, 0.12)",
                background: "linear-gradient(180deg,#071426,#0a1a30)",
                backgroundColor: "rgba(7,20,38,0.95)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                backdropFilter: "blur(14px)",
              }}
            >
              {/* Left Column: Solutions Navigation */}
              <div className="flex flex-col border-r border-white/[0.06] p-4">
                <div className="flex-1 space-y-1">
                  {SOLUTIONS.map((sol) => {
                    const IconComp = ICON_MAP[sol.iconName] || TrendingUp;
                    const isSelected = sol.slug === activeSlug;

                    return (
                      <div
                        key={sol.slug}
                        onMouseEnter={() => setActiveSlug(sol.slug)}
                        onClick={() => setActiveSlug(sol.slug)}
                        className="group/item relative flex h-[76px] cursor-pointer items-center gap-3.5 rounded-xl p-[14px_18px] transition-colors duration-150"
                        style={{
                          background: isSelected ? "rgba(255, 255, 255, 0.03)" : "transparent",
                          border: isSelected ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid transparent",
                        }}
                      >
                        {/* 44x44 Icon Container */}
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-150 bg-white/[0.01]"
                          style={{
                            background: isSelected ? sol.iconColor : "rgba(255, 255, 255, 0.01)",
                            border: isSelected ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(255, 255, 255, 0.02)",
                          }}
                        >
                          <IconComp size={18} className="text-[#9FC5FF]" />
                        </div>
                        
                        <div className="min-w-0 flex-1 flex flex-col justify-center leading-normal">
                          <span className="text-[13px] font-medium text-white/40 leading-none group-hover/item:text-white/60">
                            {sol.subtitle}
                          </span>
                          <h4 className="font-heading text-[18px] font-medium text-white/92 transition-colors leading-tight group-hover/item:text-[#A8C9FF] mt-0.5">
                            {sol.title}
                          </h4>
                          <div className="mt-1 flex flex-wrap gap-x-1.5 gap-y-0.5 leading-none">
                            {sol.features.slice(0, 4).map((f, i) => (
                              <span key={f} className="text-[12px] text-white/30">
                                {f}{i < Math.min(sol.features.length, 4) - 1 ? " •" : ""}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Hover glow line */}
                        {isSelected && (
                          <motion.div
                            className="absolute inset-y-3.5 left-0 w-[2.5px] rounded-r bg-[#0066ff]"
                            layoutId="activeIndicator"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Row: Trusted Tags */}
                <div className="mt-4 border-t border-white/[0.06] pt-3.5 px-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
                    Trusted by ambitious brands across
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {["D2C", "SaaS", "Fintech", "Healthcare", "B2B"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/[0.04] bg-white/[0.01] px-2 py-0.5 text-[10px] font-medium text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Content Panel */}
              <div className="relative flex flex-col bg-[#071324]/20 p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSolution.slug}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="flex flex-1 flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Badge */}
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8CB8FF]/15 bg-[#153B6A]/45 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#A8C9FF]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#7FB0FF]" />
                          {activeSolution.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="font-heading text-[22px] font-semibold leading-snug text-white">
                        {activeSolution.title}
                      </h4>

                      {/* Description */}
                      <p className="text-[13px] leading-relaxed text-white/70">
                        {activeSolution.description}
                      </p>

                      {/* Best For Card */}
                      <div className="rounded-[18px] border border-white/[0.06] bg-white/[0.02] p-3.5 backdrop-blur-sm shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                          Best For
                        </p>
                        <p className="mt-1 text-[12px] leading-relaxed text-white/75">
                          {activeSolution.bestFor}
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA Row: Pinned at bottom */}
                    <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                      <Link
                        href={`/solutions/${activeSolution.slug}`}
                        onClick={() => setOpen(false)}
                        className="group/cta inline-flex items-center gap-1.5 text-xs font-semibold text-[#86B3FF] transition-colors hover:text-white"
                      >
                        {activeSolution.cta}
                        <ArrowRight size={13} className="transition-transform group-hover/cta:translate-x-1" />
                      </Link>

                      <Link
                        href="/contact"
                        onClick={() => setOpen(false)}
                        className="shine-sweep inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-5 py-2.5 text-center text-xs font-semibold text-white shadow-md hover:shadow-lg transition-all"
                      >
                        Get Growth Roadmap
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SolutionsDropdownMobile({ onNavigate }: MobileProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(pathname.startsWith("/solutions"));

  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.02] p-4">
      <button
        type="button"
        className="flex w-full items-center justify-between font-heading text-3xl font-semibold tracking-tight text-white/90"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>Our Solutions</span>
        <ChevronDown size={22} className={`transition-transform duration-150 ${open ? "rotate-180" : "rotate-0"}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            className="mt-4 space-y-2 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {SOLUTIONS.map((sol) => {
              const IconComp = ICON_MAP[sol.iconName] || TrendingUp;
              return (
                <li key={sol.slug}>
                  <Link
                    key={sol.slug}
                    href={`/solutions/${sol.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-transparent bg-[#0B2A52]/44 px-3 py-2.5 text-base text-white/82 transition-all duration-150 hover:border-[#8CB8FF]/30 hover:text-white"
                    onClick={onNavigate}
                  >
                    <IconComp size={16} className="text-[#79ABFF]" />
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                        {sol.subtitle}
                      </p>
                      <p className="font-heading text-sm font-medium text-white/90">
                        {sol.title}
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-[#A8C9FF]" />
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
