"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SolutionsDropdownDesktop, SolutionsDropdownMobile } from "@/components/solutions/solutions-mega-menu";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Company", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function PremiumNavbar({ theme = "dark" }: { theme?: "dark" | "blog" }) {
  const pathname = usePathname();
  const isContactActive = pathname.startsWith("/contact");

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();


  const navWidth = useTransform(scrollY, [0, 120], ["min(1120px, 82vw)", "min(1040px, 80vw)"]);
  const navTop = useTransform(scrollY, [0, 120], [24, 12]);
  const navPaddingY = useTransform(scrollY, [0, 120], [18, 12]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileOpen]);

  const isActive = (href: string) => {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 z-[100] flex justify-center"
        style={{ top: navTop }}
      >
        <motion.nav
          className="relative flex w-full items-center justify-between rounded-2xl px-4 shadow-[0_12px_50px_rgba(7,14,29,0.28)] backdrop-blur-xl md:px-7"
          style={{
            width: navWidth,
            paddingTop: navPaddingY,
            paddingBottom: navPaddingY,
            border: theme === "blog"
              ? "1px solid rgba(255,255,255,0.16)"
              : scrolled
              ? "1px solid rgba(255,255,255,0.22)"
              : "1px solid rgba(255,255,255,0.12)",
            backgroundColor: theme === "blog"
              ? "rgba(11,31,58,0.92)"
              : scrolled
              ? "rgba(11,31,58,0.72)"
              : "rgba(11,31,58,0.08)",
            boxShadow: theme === "blog" || scrolled
              ? "0 12px 50px rgba(7,14,29,0.42), 0 0 0 1px rgba(0,102,255,0.08) inset"
              : "0 12px 50px rgba(7,14,29,0.18)",
          }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {/* Subtle top border highlight when scrolled or blog page */}
          {(scrolled || theme === "blog") && (
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(0,102,255,0.45), rgba(255,255,255,0.15), rgba(0,102,255,0.4), transparent)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}

          <Link href="/" className="group relative inline-flex items-center pr-2">
            <Image
              src="/Uptrix.png"
              alt="Uptrix Technologies"
              width={140}
              height={38}
              priority
              className="h-[34px] w-auto object-contain transition-opacity duration-300 group-hover:opacity-90 md:h-[38px]"
              sizes="(min-width: 768px) 140px, 110px"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="relative hidden items-center gap-8 md:flex select-none">
            {NAV_ITEMS.slice(0, 1).map((item) => {
              const active = isActive(item.href);
              return (
                <NavLink key={item.href} href={item.href} active={active}>
                  {item.label}
                </NavLink>
              );
            })}
            <SolutionsDropdownDesktop />
            {NAV_ITEMS.slice(1).map((item) => {
              const active = isActive(item.href);
              return (
                <NavLink key={item.href} href={item.href} active={active}>
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Link
                href="/contact"
                scroll
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

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 p-2 text-white transition-all duration-300 hover:bg-white/15 hover:border-white/30 md:hidden"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMobileOpen((prev) => !prev)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMobileOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -12, scale: 0.85 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 12, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            id="mobile-navigation"
            className="fixed inset-0 z-40 flex flex-col bg-[radial-gradient(circle_at_top,#14386b_0%,#0B1F3A_45%,#08152A_100%)] px-6 pt-28 pb-10 md:hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.42, ease: EASE }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(0,102,255,0.25), transparent 35%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.14), transparent 32%)",
              }}
            />

            <motion.ul
              className="relative z-10 mt-10 space-y-6 select-none"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.07, delayChildren: 0.08 },
                },
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
                variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <SolutionsDropdownMobile onNavigate={() => setIsMobileOpen(false)} />
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

            <motion.div
              className="relative z-10 mt-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            >
              <Link
                href="/contact"
                scroll
                aria-label="Contact Us"
                className={`shine-sweep inline-flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-4 font-heading text-base font-semibold text-white shadow-[0_14px_34px_rgba(0,102,255,0.34)] ${
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
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Desktop nav link ──────────────────────────────────────── */
function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative font-heading text-sm font-medium tracking-wide text-white/80 transition-colors duration-300 hover:text-white"
      aria-current={active ? "page" : undefined}
    >
      <span>{children}</span>
      {/* Active indicator */}
      <motion.span
        className="absolute inset-x-0 -bottom-2 h-px origin-left bg-gradient-to-r from-[#70A8FF] via-[#0066FF] to-[#70A8FF]"
        initial={false}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Hover indicator */}
      <span className="absolute inset-x-0 -bottom-2 h-px origin-left scale-x-0 bg-white/55 transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}

/* ── Mobile nav item ──────────────────────────────────────── */
function MobileNavItem({
  href,
  active,
  children,
  onClick,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.li
      variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={href}
        className={`font-heading text-3xl font-semibold tracking-tight transition-colors duration-300 ${
          active ? "text-[#A8C9FF]" : "text-white/90 hover:text-white"
        }`}
        aria-current={active ? "page" : undefined}
        onClick={onClick}
      >
        {children}
      </Link>
    </motion.li>
  );
}
