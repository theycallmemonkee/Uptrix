"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { useMemo, useRef, useState, useSyncExternalStore } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blog" },
] as const;

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/uptrixtechnologies",
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/uptrixtechnologies",
    Icon: InstagramIcon,
  },
] as const;

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 22v-8.2h2.75l.4-3.2H13.5V8.6c0-.93.26-1.56 1.6-1.56h1.7V4.2c-.83-.12-1.84-.2-3-.2-2.97 0-5 1.8-5 5.1v1.5H6v3.2h2.8V22h4.7Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <rect x="6.5" y="6.5" width="11" height="11" rx="3.2" strokeWidth="1.8" />
      <path d="M12 10.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Z" strokeWidth="1.8" />
      <path d="M16.7 8.1h.01" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function EnterpriseFooter() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const mouseX = useMotionValue(0.55);
  const mouseY = useMotionValue(0.4);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 18, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 18, mass: 0.8 });

  const glowX = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(smoothY, [0, 1], ["10%", "86%"]);
  const ambientGlow = useMotionTemplate`radial-gradient(820px circle at ${glowX} ${glowY}, rgba(0,102,255,0.24), transparent 62%)`;

  const ctaGlow = useMotionTemplate`radial-gradient(360px circle at ${glowX} ${glowY}, rgba(138,185,255,0.18), transparent 66%)`;

  const parallaxX = useTransform(smoothX, [0, 1], [-14, 14]);
  const parallaxY = useTransform(smoothY, [0, 1], [-10, 10]);
  const leftX = useTransform(parallaxX, (v) => v * 0.18);
  const midX = useTransform(parallaxX, (v) => v * -0.1);
  const rightX = useTransform(parallaxX, (v) => v * 0.24);
  const rightY = useTransform(parallaxY, (v) => v * 0.18);

  const parent = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
      },
    }),
    [],
  );

  const child = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      },
    }),
    [],
  );

  return (
    <footer
      ref={ref}
      className="relative z-10 w-full overflow-hidden px-6 pb-10 pt-16 md:px-10"
      onMouseMove={(event) => {
        if (!mounted) return;
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        mouseX.set(0.55);
        mouseY.set(0.4);
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-40 bg-[linear-gradient(180deg,#050F1F_0%,#030A16_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(1000px_circle_at_16%_18%,rgba(0,102,255,0.18),transparent_60%),radial-gradient(860px_circle_at_86%_22%,rgba(255,255,255,0.06),transparent_64%),radial-gradient(760px_circle_at_50%_120%,rgba(0,102,255,0.12),transparent_66%)]" />
      <motion.div className="pointer-events-none absolute inset-0 -z-20 opacity-70" style={mounted ? { background: ambientGlow } : undefined} />
      <motion.div
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[26rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.22),transparent_62%)] blur-3xl"
        animate={{ opacity: [0.12, 0.22, 0.12], scale: [1, 1.04, 1] }}
        transition={{ duration: 7.2, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-28 -left-24 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_65%)] blur-3xl"
        animate={{ opacity: [0.05, 0.1, 0.05], x: [0, 24, 0], y: [0, -8, 0] }}
        transition={{ duration: 10.5, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
      />

      <div className="pointer-events-none absolute inset-0 -z-20 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_52%,transparent_90%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:78px_78px]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <motion.div
        className="mx-auto w-full max-w-7xl"
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={parent}
      >
        <motion.div
          variants={child}
          className="relative overflow-hidden rounded-[2.2rem] border border-white/12 bg-white/[0.04] px-6 py-10 shadow-[0_26px_90px_rgba(2,9,22,0.66)] ring-1 ring-inset ring-white/8 backdrop-blur-xl md:px-10 md:py-12"
        >
          <motion.div
            className="pointer-events-none absolute -inset-[1px] opacity-40"
            animate={{ opacity: [0.26, 0.42, 0.26] }}
            transition={{ duration: 5.6, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
            style={{
              background:
                "linear-gradient(120deg, rgba(0,102,255,0.18), rgba(255,255,255,0.04), rgba(0,102,255,0.16))",
            }}
          />
          <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]">
            <div className="h-full w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02),transparent)]" />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.9fr_1.05fr] lg:gap-10">
            <motion.div variants={child} className="max-w-md" style={mounted ? { x: leftX } : undefined}>
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/Uptrix.png"
                  alt="Uptrix Technologies"
                  width={180}
                  height={50}
                  className="h-10 w-auto object-contain"
                  sizes="180px"
                />
              </Link>
              <p className="mt-5 text-sm leading-7 text-white/74 md:text-[0.98rem]">
                India&apos;s Top Next-Gen AI-Powered Digital Marketing Agency!
              </p>
            </motion.div>

            <motion.div variants={child} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1" style={mounted ? { x: midX } : undefined}>
              <div>
                <p className="text-[11px] font-medium tracking-[0.22em] text-[#A8C9FF]/78 uppercase">Navigation</p>
                <ul className="mt-4 space-y-3">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-2 font-heading text-sm font-medium text-white/82 transition-colors duration-300 hover:text-white"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#79ABFF]/70 transition-transform duration-300 group-hover:scale-110" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[11px] font-medium tracking-[0.22em] text-[#A8C9FF]/78 uppercase">Contact</p>
                <ul className="mt-4 space-y-3 text-sm text-white/76">
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-[#B3D0FF]">
                      <Mail size={16} />
                    </span>
                    <a className="transition-colors duration-300 hover:text-white" href="mailto:connect@uptrixtechnologies.com">
                      connect@uptrixtechnologies.com
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-[#B3D0FF]">
                      <Phone size={16} />
                    </span>
                    <a className="transition-colors duration-300 hover:text-white" href="tel:+918796160561">
                      +91 87961 60561
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={child} className="flex flex-col items-start gap-6 lg:items-end" style={mounted ? { x: rightX, y: rightY } : undefined}>
              <h3 className="max-w-xl font-heading text-4xl leading-[1.06] font-semibold tracking-tight text-white md:text-[2.85rem] lg:text-right">
                Let&apos;s Talk About Your{" "}
                <span className="inline-flex items-center rounded-2xl border border-[#8DB8FF]/30 bg-[#7BABFF]/10 px-4 py-1.5 text-[#E7F1FF] shadow-[0_10px_34px_rgba(0,102,255,0.18)]">
                  Business
                </span>{" "}
                With Us
              </h3>

              <motion.div
                animate={{ x: magnet.x, y: magnet.y }}
                transition={{ type: "spring", stiffness: 180, damping: 14, mass: 0.8 }}
                className="w-full lg:w-auto"
              >
                <Link
                  href="/contact"
                  scroll
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-5 py-4 font-heading text-sm font-semibold text-white shadow-[0_16px_44px_rgba(0,102,255,0.42)] transition-all duration-300 hover:border-[#A7CBFF] lg:w-auto"
                  onMouseMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
                    const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
                    setMagnet({ x, y });
                  }}
                  onMouseLeave={() => setMagnet({ x: 0, y: 0 })}
                >
                  <motion.span
                    className="pointer-events-none absolute -inset-10 -z-10 opacity-0"
                    animate={{ opacity: [0, 0.9, 0] }}
                    transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
                    style={mounted ? { background: ctaGlow } : undefined}
                  />
                  <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.22),transparent_50%)]" />
                  <motion.span
                    className="pointer-events-none absolute -inset-[1px] opacity-55"
                    animate={{ opacity: [0.35, 0.7, 0.35] }}
                    transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
                    style={{
                      background:
                        "linear-gradient(120deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02), rgba(0,102,255,0.18))",
                    }}
                  />
                  Let&apos;s Get Started
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </motion.div>

              <div className="flex items-center gap-3">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <motion.div
                    key={href}
                    className="relative"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 5.8, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
                  >
                    <Link
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/14 bg-white/[0.04] text-white/82 shadow-[0_16px_46px_rgba(2,9,22,0.55)] ring-1 ring-inset ring-white/8 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9CC3FF]/40 hover:bg-[#0B2344]/48 hover:text-white"
                    >
                      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.20),transparent_55%)]" />
                      <Icon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
                      <span className="pointer-events-none absolute h-16 w-16 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.24),transparent_62%)] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={child}
            className="relative mt-12 flex flex-col gap-4 border-t border-white/12 pt-7 text-sm text-white/62 md:flex-row md:items-center md:justify-between"
          >
            <p>Copyright © 2026 Uptrix Technologies</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/terms-and-condition" className="transition-colors duration-300 hover:text-white">
                Terms &amp; Condition
              </Link>
              <Link href="/privacy-policy" className="transition-colors duration-300 hover:text-white">
                Privacy Policy
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

