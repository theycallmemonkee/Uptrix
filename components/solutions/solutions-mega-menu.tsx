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
  
  const isActive = pathname.startsWith("/solutions");

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
          <>
            {/* Full screen dim and backdrop blur (z-190) behind the dropdown, clearing the navbar */}
            <motion.div
              className="fixed inset-x-0 bottom-0 top-[98px] z-[-10] bg-black/15 pointer-events-none"
              style={{ backdropFilter: "blur(18px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />

            {/* Dropdown panel (z-200) spaced 28px from navbar */}
            <motion.div
              className="dropdown absolute left-1/2 top-full z-[200] pt-[28px] w-[min(540px,94vw)] -translate-x-1/2"
              initial={{ opacity: 0, y: -12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ type: "spring", stiffness: 350, damping: 35, mass: 0.75 }}
              role="menu"
            >
              {/* Arrow */}
              <div className="relative mx-auto mb-1 h-2 w-4 overflow-hidden">
                <div className="absolute inset-x-0 top-1 h-3 w-3 origin-bottom-left rotate-45 rounded-sm border border-[#78aaff]/12 bg-[#071024]" style={{ left: "50%", transform: "translateX(-50%) rotate(45deg)" }} />
              </div>

              <div
                className="overflow-hidden rounded-3xl w-full p-4 flex flex-col relative"
                style={{
                  border: "1px solid rgba(120, 170, 255, 0.12)",
                  background: "linear-gradient(135deg, rgba(7, 16, 36, 0.99), rgba(10, 24, 52, 0.98))",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.45), 0 0 30px rgba(35, 90, 255, 0.08)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Soft blue ambient glow inside panel, constrained to prevent bleeding upwards into navbar */}
                <div
                  className="pointer-events-none absolute -inset-x-20 -bottom-20 top-0 -z-10 rounded-3xl"
                  style={{
                    background: "radial-gradient(closest-side at 50% 15%, rgba(0, 102, 255, 0.12), rgba(0, 102, 255, 0.02) 24%, transparent 55%)",
                    filter: "blur(40px)",
                    opacity: 0.8,
                  }}
                />

                <div className="space-y-1 select-none">
                  {SOLUTIONS.map((sol) => {
                     const IconComp = ICON_MAP[sol.iconName] || TrendingUp;
                     const isSelected = pathname === `/solutions/${sol.slug}`;

                     return (
                      <Link
                        key={sol.slug}
                        href={`/solutions/${sol.slug}`}
                        onClick={() => setOpen(false)}
                        className={`menu-item group/item relative flex items-center gap-3.5 rounded-2xl p-[10px_16px] transition-all duration-200 border border-transparent ${
                          isSelected 
                            ? "bg-white/[0.05] border-white/[0.08] shadow-[0_8px_24px_rgba(0,102,255,0.06),0_0_0_1px_rgba(255,255,255,0.05)] opacity-100" 
                            : "opacity-80 hover:opacity-100 hover:bg-white/[0.04] hover:border-[#8CB8FF]/20 hover:shadow-[0_8px_24px_rgba(0,102,255,0.04)]"
                        }`}
                      >
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300"
                          style={{
                            background: isSelected ? sol.iconColor : "rgba(255, 255, 255, 0.02)",
                            border: isSelected ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(255, 255, 255, 0.04)",
                          }}
                        >
                          <IconComp size={18} className="text-[#9FC5FF]" />
                        </div>
                        <div className="min-w-0 flex-1 leading-tight py-0.5">
                          <p className="text-[10px] font-semibold tracking-wider text-white/45 uppercase group-hover/item:text-white/60">
                            {sol.subtitle}
                          </p>
                          <p className="font-heading text-[16px] font-medium text-white/92 transition-colors group-hover/item:text-[#A8C9FF] mt-1">
                            {sol.title}
                          </p>
                        </div>

                        {/* Hover glow line */}
                        {isSelected && (
                          <motion.div
                            className="absolute inset-y-3 left-0 w-[3px] rounded-r bg-[#0066FF]"
                            layoutId="activeIndicator"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
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
        <span>Solutions</span>
        <ChevronDown size={22} className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            className="mt-4 space-y-2 overflow-hidden select-none pointer-events-auto"
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
                    className="group flex items-center gap-3 rounded-xl border border-transparent bg-[#0B2A52]/44 px-3 py-2.5 text-base text-white/82 transition-all duration-200 hover:border-[#8CB8FF]/30 hover:bg-[#0B2A52]/65 hover:text-white cursor-pointer"
                    onClick={onNavigate}
                  >
                    <IconComp size={16} className="text-[#79ABFF]" />
                    <div className="flex-1">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-white/45">
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
