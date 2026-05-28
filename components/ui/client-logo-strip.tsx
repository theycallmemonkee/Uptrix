"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const LOGOS = [
  { src: "/logo1.png", alt: "Client Logo 1" },
  { src: "/logo2.png", alt: "Client Logo 2" },
  { src: "/logo3.png", alt: "Client Logo 3" },
  { src: "/logo4.png", alt: "Client Logo 4" },
  { src: "/logo5.png", alt: "Client Logo 5" },
  { src: "/logo6.png", alt: "Client Logo 6" },
];

function LogoItem({ src, alt, idx }: { src: string; alt: string; idx: number }) {
  return (
    <motion.div
      className="logo-card group/logo relative mx-2 inline-flex h-14 w-34 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md md:mx-3 md:h-16 md:w-40"
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1], delay: (idx % 6) * 0.01 }}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-[1px] opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100"
        style={{
          background:
            "linear-gradient(120deg, rgba(0,102,255,0.2), rgba(255,255,255,0.08), rgba(0,102,255,0.2))",
        }}
      />
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100 bg-[radial-gradient(circle_at_30%_30%,rgba(122,174,255,0.24),transparent_60%)]" />
      <Image
        src={src}
        alt={alt}
        width={120}
        height={40}
        loading="lazy"
        className="h-7 w-auto max-w-full object-contain grayscale brightness-75 transition-all duration-300 group-hover/logo:grayscale-0 group-hover/logo:brightness-110 group-hover/logo:drop-shadow-[0_6px_18px_rgba(0,102,255,0.38)] md:h-8"
        sizes="(min-width: 768px) 140px, 120px"
      />
    </motion.div>
  );
}

interface MarqueeLogosProps {
  title?: string;
  className?: string;
  speed?: number;
  reverse?: boolean;
}

export function MarqueeLogos({
  title = "Collaborated with 100+ internationally renowned companies",
  className = "",
  speed = 34,
  reverse = false,
}: MarqueeLogosProps) {
  const items = [...LOGOS, ...LOGOS];

  return (
    <section className={`relative w-full py-10 ${className}`}>
      {title && (
        <p className="mb-8 text-center text-xs font-medium tracking-[0.22em] text-white/42 uppercase">
          {title}
        </p>
      )}
      <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-[linear-gradient(160deg,rgba(13,44,87,0.36),rgba(7,18,38,0.48))] px-2 py-5 shadow-[0_22px_72px_rgba(2,9,22,0.55)] ring-1 ring-inset ring-white/8 backdrop-blur-xl md:px-3 md:py-6">
        <div className="pointer-events-none absolute -inset-16 opacity-55 bg-[radial-gradient(560px_circle_at_18%_24%,rgba(0,102,255,0.24),transparent_64%),radial-gradient(420px_circle_at_80%_16%,rgba(139,184,255,0.16),transparent_64%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1px,transparent_1px)] bg-[size:74px_74px]" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-14 top-1/3 h-16 w-16 rounded-full bg-[#6FA8FF]/22 blur-2xl"
          animate={{ x: [0, 54, 0], opacity: [0.3, 0.58, 0.3] }}
          transition={{ duration: 7.5, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-8 top-2/3 h-12 w-12 rounded-full bg-[#A7CBFF]/18 blur-2xl"
          animate={{ x: [0, -40, 0], opacity: [0.25, 0.52, 0.25] }}
          transition={{ duration: 8.2, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
        />

        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-[#091A33] via-[#091A33]/65 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-[#091A33] via-[#091A33]/65 to-transparent" />

        <div className="logo-marquee group relative z-10">
          <div
            className={`logo-track ${reverse ? "logo-track-reverse" : "logo-track-forward"} [animation-duration:34s] max-md:[animation-duration:24s]`}
            style={{ animationDuration: `${speed}s` }}
          >
            {items.map((logo, i) => (
              <LogoItem key={`${logo.src}-${i}`} src={logo.src} alt={logo.alt} idx={i} />
            ))}
          </div>
          <div
            className={`logo-track ${reverse ? "logo-track-reverse" : "logo-track-forward"} [animation-duration:34s] max-md:[animation-duration:24s]`}
            style={{ animationDuration: `${speed}s` }}
            aria-hidden
          >
            {items.map((logo, i) => (
              <LogoItem key={`${logo.src}-clone-${i}`} src={logo.src} alt={logo.alt} idx={i + 10} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .logo-marquee {
          display: flex;
          width: max-content;
          transform: translateZ(0);
          will-change: transform;
        }
        .logo-track {
          display: flex;
          align-items: center;
          min-width: max-content;
          transform: translateZ(0);
          will-change: transform;
        }
        .logo-track-forward {
          animation: marquee-left linear infinite;
        }
        .logo-track-reverse {
          animation: marquee-right linear infinite;
        }
        .group:hover .logo-track {
          animation-play-state: paused;
        }
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}

export function ClientLogoStrip({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) {
  return <MarqueeLogos title={title} className={className} />;
}
