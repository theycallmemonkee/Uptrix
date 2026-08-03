"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SolutionsDropdownDesktop, SolutionsDropdownMobile } from "@/components/shared/solutions-mega-menu";
import { ServicesDropdownDesktop, ServicesDropdownMobile } from "@/components/services/services-dropdown";
import { NAV_ITEMS } from "@/constants/navigation";
import { EASE_PREMIUM } from "@/lib/motion";

export function PremiumNavbar({ theme = "dark" }: { theme?: "dark" | "blog" }) {
  const pathname = usePathname();
  const isContactActive = pathname.startsWith("/contact");

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Desktop: floating pill that shrinks on scroll
  const navWidthDesktop = useTransform(scrollY, [0, 120], ["min(1200px, 90vw)", "min(1120px, 88vw)"]);
  const navTop          = useTransform(scrollY, [0, 120], [16, 8]);
  const navPaddingY     = useTransform(scrollY, [0, 120], [12, 8]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    if (!isMobileOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Header shell ─────────────────────────────────────────── */}
      <motion.header
        className="fixed inset-x-0 z-[100] flex justify-center"
        style={{ top: navTop }}
      >
        <motion.nav
          className={[
            "relative flex w-full items-center justify-between rounded-2xl backdrop-blur-md",
            /* mobile: full-width minus 16px side margins */
            "mx-4 px-4",
            /* desktop: managed by motion width, more px */
            "lg:mx-0 lg:px-8",
          ].join(" ")}
          style={{
            width: navWidthDesktop,
            paddingTop: navPaddingY,
            paddingBottom: navPaddingY,
            border: theme === "blog"
              ? "1px solid rgba(255,255,255,0.14)"
              : scrolled
              ? "1px solid rgba(255,255,255,0.18)"
              : "1px solid rgba(255,255,255,0.1)",
            backgroundColor: theme === "blog"
              ? "rgba(11,31,58,0.90)"
              : scrolled
              ? "rgba(11,31,58,0.72)"
              : "rgba(11,31,58,0.08)",
            boxShadow: theme === "blog" || scrolled
              ? "0 8px 40px rgba(7,14,29,0.36), 0 0 0 1px rgba(0,102,255,0.07) inset"
              : "none",
          }}
          transition={{ duration: 0.45, ease: EASE_PREMIUM }}
        >
          {/* Top border highlight on scroll */}
          {(scrolled || theme === "blog") && (
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(0,102,255,0.45), rgba(255,255,255,0.15), rgba(0,102,255,0.4), transparent)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}

          {/* Logo */}
          <Link href="/" className="group relative inline-flex shrink-0 items-center">
            <Image
              src="/Uptrix.png"
              alt="Uptrix Technologies"
              width={140}
              height={38}
              priority
              className="h-[26px] w-auto object-contain transition-opacity duration-300 group-hover:opacity-90 sm:h-[30px] md:h-[34px] lg:h-[38px]"
              sizes="(min-width: 768px) 140px, 100px"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="relative hidden items-center gap-1 lg:flex select-none">
            {NAV_ITEMS.slice(0, 1).map((item) => (
              <NavLink key={item.href} href={item.href} active={isActive(item.href)}>
                {item.label}
              </NavLink>
            ))}
            <SolutionsDropdownDesktop />
            <ServicesDropdownDesktop />
            {NAV_ITEMS.slice(1).map((item) => (
              <NavLink key={item.href} href={item.href} active={isActive(item.href)}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right slot */}
          <div className="flex items-center gap-2.5">
            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                aria-label="Contact Us"
                className={`shine-sweep group inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 font-heading text-sm font-medium text-white transition-all duration-300 ${
                  isContactActive
                    ? "border-[#9FC5FF] bg-gradient-to-r from-[#1A74FF] to-[#235FC6] shadow-[0_8px_24px_rgba(0,102,255,0.45)] ring-2 ring-[#8CB8FF]/45"
                    : "border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] shadow-[0_8px_24px_rgba(0,102,255,0.35)] hover:border-[#7FAEFF] hover:shadow-[0_12px_32px_rgba(0,102,255,0.48)]"
                }`}
              >
                Contact Us
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile hamburger — 44×44px touch target */}
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.16] bg-white/[0.08] text-white transition-all duration-200 active:scale-95 active:bg-white/[0.14] lg:hidden"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMobileOpen((prev) => !prev)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMobileOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 15, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center"
                >
                  {isMobileOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* ── Mobile full-screen menu ───────────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[39] pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            />

            <motion.aside
              id="mobile-navigation"
              className="fixed inset-0 z-40 flex flex-col overflow-y-auto pointer-events-auto lg:hidden"
              style={{
                background: "radial-gradient(circle at top, #14386b 0%, #0B1F3A 45%, #08152A 100%)",
              }}
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.38, ease: EASE_PREMIUM }}
            >
              {/* Ambient orbs */}
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, rgba(0,102,255,0.25), transparent 35%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.12), transparent 32%)",
                }}
              />

              {/* Spacer for navbar height: 16px top + 26px logo + 12px*2 padding = ~66px, add 16px breathing room */}
              <div className="shrink-0 h-[82px]" aria-hidden />

              {/* Nav links */}
              <motion.ul
                className="relative z-10 flex-1 flex flex-col justify-center px-7 space-y-5"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
                }}
              >
                {NAV_ITEMS.slice(0, 1).map((item) => (
                  <MobileNavItem
                    key={item.href}
                    href={item.href}
                    active={isActive(item.href)}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {item.label}
                  </MobileNavItem>
                ))}
                <motion.li
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                >
                  <SolutionsDropdownMobile onNavigate={() => setIsMobileOpen(false)} />
                </motion.li>
                <motion.li
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                >
                  <ServicesDropdownMobile onNavigate={() => setIsMobileOpen(false)} />
                </motion.li>
                {NAV_ITEMS.slice(1).map((item) => (
                  <MobileNavItem
                    key={item.href}
                    href={item.href}
                    active={isActive(item.href)}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {item.label}
                  </MobileNavItem>
                ))}
              </motion.ul>

              {/* Bottom CTA */}
              <motion.div
                className="relative z-10 px-6 pb-10 pt-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.45, delay: 0.14, ease: EASE_PREMIUM }}
              >
                <Link
                  href="/contact"
                  aria-label="Contact Us"
                  className={`shine-sweep inline-flex w-full items-center justify-center gap-2 rounded-2xl border py-[17px] font-heading text-base font-semibold text-white shadow-[0_14px_34px_rgba(0,102,255,0.34)] transition-all duration-200 active:scale-[0.98] ${
                    isContactActive
                      ? "border-[#9FC5FF] bg-gradient-to-r from-[#1A74FF] to-[#235FC6] ring-2 ring-[#8CB8FF]/45"
                      : "border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6]"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  Contact Us
                  <ArrowUpRight size={18} />
                </Link>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative rounded-lg px-3 py-2 font-heading text-sm font-medium tracking-wide text-white/75 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
      aria-current={active ? "page" : undefined}
    >
      <span className="relative">
        {children}
        <motion.span
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gradient-to-r from-[#70A8FF] via-[#0066FF] to-[#70A8FF]"
          initial={false}
          animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
          transition={{ duration: 0.3, ease: EASE_PREMIUM }}
        />
      </span>
    </Link>
  );
}

function MobileNavItem({
  href, active, children, onClick,
}: {
  href: string; active: boolean; children: React.ReactNode; onClick: () => void;
}) {
  return (
    <motion.li
      variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.4, ease: EASE_PREMIUM }}
    >
      <Link
        href={href}
        className={`block font-heading text-[2rem] font-semibold tracking-tight transition-colors duration-200 ${
          active ? "text-[#A8C9FF]" : "text-white/85 hover:text-white"
        }`}
        aria-current={active ? "page" : undefined}
        onClick={onClick}
      >
        {children}
      </Link>
    </motion.li>
  );
}
