"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Volume2, VolumeX } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ReelItem {
  id: string;
  thumbnail: string;
  label: string;
  tag: string;
  views: string;
}

const REELS: ReelItem[] = [
  {
    id: "r1",
    thumbnail: "/portfolio/social/4.jpg",
    label: "Campaign Highlight",
    tag: "Meta Ads",
    views: "1.2M",
  },
  {
    id: "r2",
    thumbnail: "/portfolio/social/6.jpg",
    label: "Brand Story Reel",
    tag: "Organic",
    views: "890K",
  },
  {
    id: "r3",
    thumbnail: "/portfolio/meta-ads/3.jpg",
    label: "Product Launch Cut",
    tag: "Meta Ads",
    views: "2.1M",
  },
  {
    id: "r4",
    thumbnail: "/portfolio/social/7.jpg",
    label: "Behind the Scenes",
    tag: "Organic",
    views: "450K",
  },
  {
    id: "r5",
    thumbnail: "/portfolio/meta-ads/5.jpg",
    label: "Conversion Creative",
    tag: "Meta Ads",
    views: "1.8M",
  },
  {
    id: "r6",
    thumbnail: "/portfolio/social/9.jpg",
    label: "UGC Style Edit",
    tag: "Organic",
    views: "320K",
  },
];

const TAG_STYLES: Record<string, string> = {
  "Meta Ads": "border-indigo-400/30 bg-indigo-500/10 text-indigo-200/90",
  Organic: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200/90",
};

function ReelCard({ reel, index }: { reel: ReelItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [muted, setMuted] = useState(true);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleMute = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setMuted((m) => !m);
    },
    []
  );

  return (
    <motion.div
      ref={cardRef}
      className="group relative shrink-0 cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#010d1c]"
      style={{ aspectRatio: "9/16", width: "clamp(160px, 18vw, 220px)" }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
      whileHover={{ scale: 1.03, y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="absolute inset-0">
        {inView && (
          <Image
            src={reel.thumbnail}
            alt={reel.label}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="220px"
            loading="lazy"
          />
        )}
      </div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#010d1c]/95 via-[#010d1c]/30 to-transparent" />

      {/* Hover glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[1.5rem]"
        animate={{
          boxShadow: hovered
            ? "inset 0 0 0 1px rgba(0,102,255,0.5), 0 0 40px rgba(0,102,255,0.18)"
            : "inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Tag top-left */}
      <div className="absolute left-3 top-3">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] backdrop-blur-md ${
            TAG_STYLES[reel.tag] ?? "border-white/20 bg-white/5 text-white/70"
          }`}
        >
          {reel.tag}
        </span>
      </div>

      {/* Mute toggle top-right */}
      <button
        onClick={toggleMute}
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur-md transition-all duration-200 hover:bg-white/10 hover:text-white"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <VolumeX size={11} /> : <Volume2 size={11} />}
      </button>

      {/* Play icon center — fades in on hover */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 shadow-[0_0_32px_rgba(0,102,255,0.3)] backdrop-blur-md">
          <Play size={20} className="translate-x-0.5 text-white" fill="white" />
        </div>
      </motion.div>

      {/* Bottom info */}
      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <p className="font-heading text-[0.8rem] font-semibold leading-snug text-white">
          {reel.label}
        </p>
        <p className="mt-0.5 text-[10px] text-white/45">{reel.views} views</p>
      </div>

      {/* In-view indicator */}
      {inView && (
        <div className="absolute left-3 bottom-[4.5rem] flex items-center gap-1">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#4D8EFF]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[9px] text-white/40 uppercase tracking-wide">Live</span>
        </div>
      )}
    </motion.div>
  );
}

export function ReelShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative z-10 w-full overflow-hidden bg-[#020617] pt-8 pb-20 md:pt-12 md:pb-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_50%_40%,rgba(0,40,180,0.08),transparent_60%)]" />

      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          className="mb-14 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <span className="inline-flex items-center rounded-full border border-[#4D8EFF]/25 bg-[#0066FF]/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9CC0FF]">
            Video Edits
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.025em] text-white">
            Instagram Reel Edits
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[0.9375rem] leading-[1.75] text-white/52">
            Short-form video content engineered for native engagement, conversion, and maximum reach.
          </p>
        </motion.div>

        {/* Reel grid — horizontal scroll on mobile, wrap on desktop */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide sm:justify-center sm:flex-wrap md:gap-5 lg:flex-nowrap lg:justify-center"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
        >
          {REELS.map((reel, i) => (
            <div key={reel.id} style={{ scrollSnapAlign: "center" }}>
              <ReelCard reel={reel} index={i} />
            </div>
          ))}
        </div>

        {/* Scroll hint — mobile only */}
        <div className="mt-6 flex items-center justify-center gap-2 sm:hidden">
          <div className="h-0.5 w-6 rounded-full bg-white/20" />
          <p className="text-[11px] text-white/35 uppercase tracking-wider">Scroll to explore</p>
          <div className="h-0.5 w-6 rounded-full bg-white/20" />
        </div>
      </div>
    </section>
  );
}
