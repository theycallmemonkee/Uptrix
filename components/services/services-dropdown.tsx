"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BarChart2, ChevronDown, Globe, Palette, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  {
    name: "SEO Services",
    href: "/services/seo",
    icon: Search,
    desc: "Organic growth & technical SEO",
    color: "rgba(0,102,255,0.2)",
  },
  {
    name: "Social Media",
    href: "/services/social-media",
    icon: Globe,
    desc: "Community & content strategy",
    color: "rgba(100,150,255,0.2)",
  },
  {
    name: "PPC Marketing",
    href: "/services/ppc",
    icon: BarChart2,
    desc: "Performance ads & ROAS",
    color: "rgba(80,130,255,0.2)",
  },
  {
    name: "Branding",
    href: "/services/branding",
    icon: Palette,
    desc: "Identity & brand architecture",
    color: "rgba(120,170,255,0.2)",
  },
] as const;

type DesktopProps = { className?: string };
type MobileProps  = { onNavigate?: () => void };

export function ServicesDropdownDesktop({ className }: DesktopProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = pathname.startsWith("/services");

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
        <span>Our Services</span>
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
            className="absolute left-1/2 z-50 mt-5 w-[26rem] -translate-x-1/2"
            initial={{ opacity: 0, y: -10, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.995 }}
            transition={{ type: "spring", stiffness: 360, damping: 36, mass: 0.7 }}
            role="menu"
              >
            {/* Arrow */}
            <div className="relative mx-auto mb-1 h-2 w-4 overflow-hidden">
              <div className="absolute inset-x-0 top-1 h-3 w-3 origin-bottom-left rotate-45 rounded-sm border border-[#8CB8FF]/22 bg-[#0C2749]" style={{ left: "50%", transform: "translateX(-50%) rotate(45deg)" }} />
            </div>

            <div
              className="overflow-hidden rounded-2xl"
              style={{
                border: "1px solid rgba(120,170,255,0.15)",
                background: "linear-gradient(180deg,#071426,#0B1D38)",
                backgroundColor: "rgba(7,20,38,0.94)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Large soft blue glow behind the panel */}
              <div
                className="pointer-events-none absolute -inset-12 -z-10 rounded-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side at 50% 10%, rgba(0,102,255,0.18), rgba(0,102,255,0.06) 18%, transparent 45%)",
                  filter: "blur(40px)",
                  opacity: 0.95,
                }}
              />

              {/* Inner layered glass */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))" }} />

              <div className="relative p-2.5">
                {SERVICES.map(({ name, href, icon: Icon, desc, color }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: i * 0.04, ease: EASE }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link
                      href={href}
                      className="group/item relative flex items-center gap-3.5 rounded-xl border px-3 py-3 transition-all duration-250"
                      role="menuitem"
                      style={{
                        borderColor: "transparent",
                        background: "transparent",
                      }}
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 bg-[rgba(255,255,255,0.02)] group-hover/item:scale-105 group-hover/item:shadow-[0_8px_28px_rgba(0,102,255,0.12)]"
                        style={{
                          background: color,
                          border: "1px solid rgba(255,255,255,0.04)",
                          transitionProperty: "transform, box-shadow, background",
                        }}
                      >
                        <Icon size={16} className="text-[#A8C9FF]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-heading text-sm font-medium text-white/92 transition-colors group-hover/item:text-white">
                          {name}
                        </p>
                        <p className="mt-0.5 text-[11px] text-white/52 transition-colors group-hover/item:text-white/70">
                          {desc}
                        </p>
                      </div>
                      <motion.div
                        className="ml-2 flex items-center"
                        initial={false}
                        whileHover={{ x: 6 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ArrowUpRight size={14} className="shrink-0 text-white/40 transition-colors group-hover/item:text-[#A8C9FF]" />
                      </motion.div>

                      {/* Hover overlay */}
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-all duration-250"
                        style={{
                          boxShadow: "0 10px 40px rgba(3,82,255,0.12)",
                          background: "linear-gradient(90deg, rgba(7,20,38,0.0), rgba(7,20,38,0.02))",
                        }}
                      />
                    </Link>
                  </motion.div>
                ))}

                {/* Footer CTA */}
                <div className="mt-1.5 border-t border-white/[0.07] pt-2.5 px-1">
                  <Link
                    href="/contact"
                    className="group/cta flex items-center justify-between rounded-xl border border-[#4D8EFF]/35 bg-gradient-to-r from-[#0066FF]/20 to-[#1552B6]/20 px-3 py-2.5 transition-all duration-250 hover:from-[#0066FF]/30 hover:to-[#1552B6]/30"
                  >
                    <span className="text-sm font-medium text-[#A8C9FF]">Free Strategy Call</span>
                    <ArrowUpRight size={14} className="text-[#A8C9FF] transition-transform duration-250 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ServicesDropdownMobile({ onNavigate }: MobileProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(pathname.startsWith("/services"));

  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.02] p-4">
      <button
        type="button"
        className="flex w-full items-center justify-between font-heading text-3xl font-semibold tracking-tight text-white/90"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>Our Services</span>
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
            {SERVICES.map(({ name, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex items-center gap-3 rounded-xl border border-transparent bg-[#0B2A52]/44 px-3 py-2.5 text-base text-white/82 transition-all duration-250 hover:border-[#8CB8FF]/30 hover:text-white"
                  onClick={onNavigate}
                >
                  <Icon size={16} className="text-[#79ABFF]" />
                  <span>{name}</span>
                  <ArrowUpRight size={14} className="ml-auto text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#A8C9FF]" />
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
