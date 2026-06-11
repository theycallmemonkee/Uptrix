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
  Layers, 
  CheckCircle2 
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SOLUTIONS, SolutionConfig } from "@/data/solutions-data";

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
        className="group relative inline-flex items-center gap-1 font-heading text-sm font-medium tracking-wide text-white/80 transition-colors duration-300 hover:text-white"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span>Our Solutions</span>
        <ChevronDown
          size={15}
          className={`transition-transform duration-300 ${open ? "rotate-180 text-white" : "text-white/60 group-hover:text-white"}`}
        />
        <motion.span
          className="absolute inset-x-0 -bottom-2 h-px origin-left bg-gradient-to-r from-[#70A8FF] via-[#0066FF] to-[#70A8FF]"
          initial={false}
          animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-1/2 z-50 mt-5 w-[56rem] -translate-x-[45%]"
            initial={{ opacity: 0, y: -12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 350, damping: 35, mass: 0.75 }}
            role="menu"
          >
            {/* Arrow */}
            <div className="relative mx-auto mb-1 h-2 w-4 overflow-hidden" style={{ left: "-5%" }}>
              <div className="absolute inset-x-0 top-1 h-3 w-3 origin-bottom-left rotate-45 rounded-sm border border-[#8CB8FF]/22 bg-[#071426]" style={{ left: "50%", transform: "translateX(-50%) rotate(45deg)" }} />
            </div>

            <div
              className="grid grid-cols-[1.25fr_1fr] overflow-hidden rounded-3xl"
              style={{
                border: "1px solid rgba(120, 170, 255, 0.16)",
                background: "linear-gradient(180deg,#071426,#0a1a30)",
                backgroundColor: "rgba(7,20,38,0.96)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.55)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Soft blue ambient glow behind layout */}
              <div
                className="pointer-events-none absolute -inset-20 -z-10 rounded-3xl"
                style={{
                  background: "radial-gradient(closest-side at 50% 15%, rgba(0, 102, 255, 0.22), rgba(0, 102, 255, 0.05) 24%, transparent 55%)",
                  filter: "blur(50px)",
                  opacity: 0.9,
                }}
              />

              {/* Left Column: Solutions List */}
              <div className="flex flex-col border-r border-white/[0.07] p-5">
                <div className="flex-1 space-y-1">
                  {SOLUTIONS.map((sol) => {
                    const IconComp = ICON_MAP[sol.iconName] || TrendingUp;
                    const isSelected = sol.slug === activeSlug;

                    return (
                      <div
                        key={sol.slug}
                        onMouseEnter={() => setActiveSlug(sol.slug)}
                        onClick={() => setActiveSlug(sol.slug)}
                        className="group/item relative flex cursor-pointer items-center gap-3.5 rounded-2xl p-3 transition-all duration-300"
                        style={{
                          background: isSelected ? "rgba(255, 255, 255, 0.035)" : "transparent",
                          border: isSelected ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent",
                        }}
                      >
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 bg-white/[0.02]"
                          style={{
                            background: isSelected ? sol.iconColor : "rgba(255, 255, 255, 0.02)",
                            border: isSelected ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(255, 255, 255, 0.04)",
                          }}
                        >
                          <IconComp size={18} className="text-[#9FC5FF]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-semibold tracking-wider text-white/45 uppercase group-hover/item:text-white/60">
                            {sol.subtitle}
                          </p>
                          <p className="font-heading text-sm font-medium text-white/92 transition-colors group-hover/item:text-[#A8C9FF]">
                            {sol.title}
                          </p>
                          <div className="mt-1 flex flex-wrap gap-x-1.5 gap-y-0.5">
                            {sol.features.slice(0, 4).map((f, i) => (
                              <span key={f} className="text-[10px] text-white/40">
                                {f}{i < Math.min(sol.features.length, 4) - 1 ? " •" : ""}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Hover glow line */}
                        {isSelected && (
                          <motion.div
                            className="absolute inset-y-3 left-0 w-[3px] rounded-r bg-blue-core"
                            layoutId="activeIndicator"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Row: Trusted Tags */}
                <div className="mt-5 border-t border-white/[0.07] pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
                    Trusted by ambitious brands across
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["D2C", "SaaS", "Fintech", "Healthcare", "B2B"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2 py-0.5 text-[10px] font-medium text-white/60 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Content Panel */}
              <div className="relative flex flex-col bg-[#071324]/40 p-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSolution.slug}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="flex flex-1 flex-col justify-between"
                  >
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8CB8FF]/20 bg-[#153B6A]/55 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#A8C9FF]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#7FB0FF]" />
                        {activeSolution.badge}
                      </span>

                      <h4 className="mt-4 font-heading text-2xl font-semibold leading-snug text-white">
                        {activeSolution.title}
                      </h4>

                      <p className="mt-3 text-xs leading-relaxed text-white/70">
                        {activeSolution.description}
                      </p>

                      <div className="mt-5 rounded-2xl border border-white/[0.06] bg-[#071529]/80 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                          Best For
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-white/75">
                          {activeSolution.bestFor}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
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
                        className="shine-sweep flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#1552B6] py-3 text-center text-xs font-semibold text-white shadow-[0_8px_24px_rgba(0,102,255,0.28)] transition-all hover:shadow-[0_12px_32px_rgba(0,102,255,0.42)]"
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
        <ChevronDown size={22} className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            className="mt-4 space-y-2 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {SOLUTIONS.map((sol) => {
              const IconComp = ICON_MAP[sol.iconName] || TrendingUp;
              return (
                <li key={sol.slug}>
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-transparent bg-[#0B2A52]/44 px-3 py-2.5 text-base text-white/82 transition-all duration-250 hover:border-[#8CB8FF]/30 hover:text-white"
                    onClick={onNavigate}
                  >
                    <IconComp size={16} className="text-[#79ABFF]" />
                    <div className="flex-1">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-white/40">
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
