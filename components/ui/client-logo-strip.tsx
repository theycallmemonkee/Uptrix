"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ── Design tokens ─────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

// Unique client brands — no duplicates in this array.
// Duplication for seamless looping is handled internally per-track.
const LOGOS = [
  { src: "/logo1.png", alt: "Client Logo 1" },
  { src: "/logo2.png", alt: "Client Logo 2" },
  { src: "/logo3.png", alt: "Client Logo 3" },
  { src: "/logo4.png", alt: "Client Logo 4" },
  { src: "/logo5.png", alt: "Client Logo 5" },
  { src: "/logo6.png", alt: "Client Logo 6" },
];

// Each track repeats 4× so it fills the full viewport before the loop resets —
// guaranteeing no blank gap even at very wide screens.
const TRACK_ITEMS = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

// ── Individual logo card ──────────────────────────────────────────────────────
function LogoItem({
  src,
  alt,
  idx,
}: {
  src: string;
  alt: string;
  idx: number;
}) {
  return (
    <motion.div
      className="
        logo-card group/logo
        relative mx-3 inline-flex
        h-16 w-44
        shrink-0 items-center justify-center
        overflow-hidden rounded-2xl
        border border-white/[0.09]
        bg-white/[0.03]
        px-5
        shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_4px_20px_rgba(0,0,0,0.22)]
        backdrop-blur-md
        transition-[border-color,box-shadow]
        duration-300
        hover:border-[#4D8EFF]/30
        hover:shadow-[0_0_28px_rgba(0,102,255,0.16),inset_0_1px_0_rgba(255,255,255,0.10)]
        md:mx-4 md:h-[4.5rem] md:w-52
      "
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
        delay: (idx % LOGOS.length) * 0.008,
      }}
    >
      {/* Blue gradient overlay on hover */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100"
        style={{
          background:
            "linear-gradient(120deg, rgba(0,102,255,0.18), rgba(255,255,255,0.07), rgba(0,102,255,0.18))",
        }}
      />
      {/* Radial shimmer */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100 bg-[radial-gradient(circle_at_30%_30%,rgba(122,174,255,0.22),transparent_58%)]" />

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
          group-hover/logo:drop-shadow-[0_4px_16px_rgba(0,102,255,0.36)]
          md:h-9
        "
        sizes="(min-width: 768px) 180px, 140px"
      />
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface MarqueeLogosProps {
  title?: string;
  className?: string;
  /** Animation speed in seconds per full loop (higher = slower). Default 52s. */
  speed?: number;
  reverse?: boolean;
}

export function MarqueeLogos({
  title = "Collaborated with 100+ internationally renowned companies",
  className = "",
  speed = 52,
  reverse = false,
}: MarqueeLogosProps) {
  return (
    /*
     * Full-bleed wrapper: uses the "negative-margin viewport-break-out" trick.
     * This breaks out of any parent max-width container without touching
     * surrounding page layout or causing horizontal overflow.
     */
    <section
      className={`
        relative
        w-[100vw] max-w-[100vw]
        -ml-[calc((100vw-100%)/2)]
        py-10
        overflow-x-hidden
        ${className}
      `}
    >
      {/* Heading */}
      {title && (
        <p className="mb-8 px-4 text-center text-[11px] font-medium tracking-[0.24em] text-white/40 uppercase">
          {title}
        </p>
      )}

      {/*
       * Glassmorphism container — 97vw centred with a small margin each side.
       * mx-auto + max-w keeps the border/glow perfectly centred.
       */}
      <div
        className="
          relative mx-auto
          w-[97vw] max-w-[97vw]
          overflow-hidden
          rounded-3xl
          border border-white/[0.10]
          bg-[linear-gradient(160deg,rgba(13,44,87,0.38),rgba(7,18,38,0.52))]
          px-0 py-6
          shadow-[0_0_0_1px_rgba(0,102,255,0.08),0_24px_80px_rgba(2,9,22,0.60)]
          ring-1 ring-inset ring-white/[0.07]
          backdrop-blur-xl
          md:py-7
        "
      >
        {/* Ambient blue glow */}
        <div className="pointer-events-none absolute -inset-20 opacity-50 bg-[radial-gradient(600px_circle_at_15%_22%,rgba(0,102,255,0.22),transparent_62%),radial-gradient(460px_circle_at_82%_18%,rgba(120,174,255,0.14),transparent_62%)]" />

        {/* Subtle dot-grid texture */}
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

        {/* Left fade mask — matches page background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-[#091A33] via-[#091A33]/60 to-transparent" />
        {/* Right fade mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-[#091A33] via-[#091A33]/60 to-transparent" />

        {/* ── Dual-track marquee — hover pauses both tracks ── */}
        <div className="cls-marquee group relative z-10">
          {/* Track A */}
          <div
            className={`cls-track ${reverse ? "cls-track-reverse" : "cls-track-forward"}`}
            style={{ animationDuration: `${speed}s` }}
          >
            {TRACK_ITEMS.map((logo, i) => (
              <LogoItem
                key={`cls-a-${logo.src}-${i}`}
                src={logo.src}
                alt={logo.alt}
                idx={i}
              />
            ))}
          </div>

          {/* Track B — seamless clone */}
          <div
            className={`cls-track ${reverse ? "cls-track-reverse" : "cls-track-forward"}`}
            style={{ animationDuration: `${speed}s` }}
            aria-hidden
          >
            {TRACK_ITEMS.map((logo, i) => (
              <LogoItem
                key={`cls-b-${logo.src}-${i}`}
                src={logo.src}
                alt={logo.alt}
                idx={i + TRACK_ITEMS.length}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

// ── Convenience alias — backward-compatible with all existing call-sites ──────
export function ClientLogoStrip({
  title,
  className,
  speed,
  reverse,
}: {
  title?: string;
  className?: string;
  speed?: number;
  reverse?: boolean;
}) {
  return (
    <MarqueeLogos
      title={title}
      className={className}
      speed={speed}
      reverse={reverse}
    />
  );
}
