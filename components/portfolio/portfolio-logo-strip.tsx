"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// Unique client logos — no duplicates in this array.
const LOGOS = [
  { src: "/logo1.png", alt: "Client Logo 1" },
  { src: "/logo2.png", alt: "Client Logo 2" },
  { src: "/logo3.png", alt: "Client Logo 3" },
  { src: "/logo4.png", alt: "Client Logo 4" },
  { src: "/logo5.png", alt: "Client Logo 5" },
  { src: "/logo6.png", alt: "Client Logo 6" },
];

// 4× duplication per track fills the full viewport before the loop resets.
const TRACK = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

function LogoItem({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="
        group/logo
        relative mx-3 inline-flex
        h-16 w-44
        shrink-0 items-center justify-center
        overflow-hidden rounded-2xl
        border border-white/[0.09]
        bg-white/[0.03]
        px-5
        shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_4px_20px_rgba(0,0,0,0.22)]
        backdrop-blur-md
        transition-[border-color,box-shadow] duration-300
        hover:border-[#4D8EFF]/30
        hover:shadow-[0_0_28px_rgba(0,102,255,0.16),inset_0_1px_0_rgba(255,255,255,0.10)]
        md:mx-4 md:h-[4.5rem] md:w-52
      "
    >
      <Image
        src={src}
        alt={alt}
        width={140}
        height={48}
        loading="lazy"
        className="
          h-8 w-auto max-w-full
          object-contain
          grayscale brightness-75
          transition-all duration-300
          group-hover/logo:grayscale-0
          group-hover/logo:brightness-110
          md:h-9
        "
        sizes="(min-width: 768px) 180px, 140px"
      />
    </div>
  );
}

// ── Portfolio logo strip ──────────────────────────────────────────────────────
// Uses the same viewport-breakout + 97vw technique as ClientLogoStrip
// so width, spacing, and fade masks are identical to the working reference.
export function PortfolioLogoStrip() {
  return (
    <section
      className="
        relative z-10
        w-[100vw] max-w-[100vw]
        -ml-[calc((100vw-100%)/2)]
        bg-[#020617]
        py-10
        overflow-x-hidden
      "
    >
      {/* Section heading */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="mb-8 px-4 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-white/40"
      >
        Trusted by growth-focused brands worldwide
      </motion.p>

      {/* Glassmorphism strip — 97vw centred */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
        className="
          relative mx-auto
          w-[97vw] max-w-[97vw]
          overflow-hidden
          rounded-3xl
          border border-white/[0.10]
          bg-[linear-gradient(160deg,rgba(13,44,87,0.38),rgba(7,18,38,0.52))]
          py-6 md:py-7
          shadow-[0_0_0_1px_rgba(0,102,255,0.08),0_24px_80px_rgba(2,9,22,0.60)]
          ring-1 ring-inset ring-white/[0.07]
          backdrop-blur-xl
        "
      >
        {/* Ambient blue glow */}
        <div className="pointer-events-none absolute -inset-20 opacity-50 bg-[radial-gradient(600px_circle_at_15%_22%,rgba(0,102,255,0.22),transparent_62%),radial-gradient(460px_circle_at_82%_18%,rgba(120,174,255,0.14),transparent_62%)]" />

        {/* Dot-grid texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Animated floating orbs */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-[#6FA8FF]/20 blur-3xl"
          animate={{ x: [0, 60, 0], opacity: [0.28, 0.55, 0.28] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-[#A7CBFF]/16 blur-2xl"
          animate={{ x: [0, -44, 0], opacity: [0.22, 0.50, 0.22] }}
          transition={{ duration: 9.5, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
        />

        {/* Fade masks — must match the portfolio page background (#020617) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-[#020617] via-[#020617]/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-[#020617] via-[#020617]/60 to-transparent" />

        {/* Dual-track marquee — hover pauses both tracks */}
        <div className="pls-marquee group relative z-10">
          {/* Track A */}
          <div className="pls-track pls-track-forward" style={{ animationDuration: "52s" }}>
            {TRACK.map((logo, i) => (
              <LogoItem key={`pls-a-${i}`} src={logo.src} alt={logo.alt} />
            ))}
          </div>
          {/* Track B — seamless clone, aria-hidden for screen readers */}
          <div className="pls-track pls-track-forward" style={{ animationDuration: "52s" }} aria-hidden>
            {TRACK.map((logo, i) => (
              <LogoItem key={`pls-b-${i}`} src={logo.src} alt={logo.alt} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
