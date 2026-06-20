"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const DESIGNS = [
  {
    id: "klevrax",
    title: "Klevrax",
    category: "Brand Identity",
    badge: "Website Design",
    image: "/portfolio/websites/klevrax.jpg",
  },
  {
    id: "jazzo",
    title: "Jazzo",
    category: "UI/UX Design",
    badge: "Website Design",
    image: "/portfolio/websites/jazzo.jpg",
  },
  {
    id: "ecofitz",
    title: "EcoFitz",
    category: "E-Commerce",
    badge: "E-Commerce",
    image: "/portfolio/websites/ecofitz.jpg",
  },
  {
    id: "lebodee",
    title: "LeBodee",
    category: "Brand Identity",
    badge: "Brand Design",
    image: "/portfolio/websites/lebodee.jpg",
  },
  {
    id: "vastra",
    title: "Vastra",
    category: "Fashion UI",
    badge: "Website Design",
    image: "/portfolio/websites/vastra.jpg",
  },
  {
    id: "vodaiq",
    title: "VodaIQ",
    category: "SaaS Dashboard",
    badge: "Product Design",
    image: "/portfolio/websites/vodaiq.jpg",
  },
  {
    id: "uptrix",
    title: "Uptrix",
    category: "Agency Website",
    badge: "Website Design",
    image: "/portfolio/websites/uptrix.jpg",
  },
];

const TOTAL = DESIGNS.length;
const AUTO_INTERVAL = 4000;

function wrap(index: number, length: number) {
  return ((index % length) + length) % length;
}

type CardProps = {
  design: (typeof DESIGNS)[number];
  position: number; // -2, -1, 0, 1, 2
  onClick: () => void;
};

function DesignCard({ design, position, onClick }: CardProps) {
  const abs = Math.abs(position);

  const xPx =
    position === 0
      ? 0
      : position === 1
      ? 260
      : position === -1
      ? -260
      : position === 2
      ? 480
      : -480;

  const scale = abs === 0 ? 1 : abs === 1 ? 0.82 : 0.65;
  const rotateY = position * -42;
  const blurPx = abs === 0 ? 0 : abs === 1 ? 3 : 8;
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.85 : 0.45;
  const zIndex = abs === 0 ? 10 : abs === 1 ? 5 : 1;

  if (abs > 2) return null;

  return (
    <motion.div
      onClick={onClick}
      className="absolute top-0 cursor-pointer select-none"
      style={{
        zIndex,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      animate={{
        x: xPx,
        scale,
        rotateY,
        opacity,
        filter: `blur(${blurPx}px)`,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30,
        mass: 0.9,
      }}
    >
      <div
        className={`relative overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-white/[0.04] shadow-[0_24px_72px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-[box-shadow] duration-300 ${
          abs === 0
            ? "w-[min(320px,calc(100vw-3rem))] sm:w-[380px] md:w-[440px] shadow-[0_0_80px_rgba(0,102,255,0.18),0_24px_72px_rgba(0,0,0,0.55)]"
            : "w-[270px] sm:w-[310px] md:w-[360px]"
        }`}
      >
        {/* Top shine */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={design.image}
            alt={design.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 440px"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent" />
        </div>

        {/* Info */}
        <div className="p-5">
          <span className="inline-flex items-center rounded-full border border-[#4D8EFF]/25 bg-[#0066FF]/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9CC0FF]">
            {design.badge}
          </span>
          <h3 className="mt-2.5 font-heading text-lg font-bold text-white tracking-[-0.01em]">
            {design.title}
          </h3>
          <p className="mt-1 text-[0.8rem] text-white/50">{design.category}</p>
        </div>

        {/* Active border glow */}
        {abs === 0 && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              boxShadow: "inset 0 0 0 1px rgba(0,102,255,0.4)",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

export function GraphicDesignShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 18, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 18, mass: 0.8 });
  const rotX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  const advance = useCallback(() => {
    setActiveIndex((i) => wrap(i + 1, TOTAL));
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => wrap(i - 1, TOTAL));
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => wrap(i + 1, TOTAL));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(advance, AUTO_INTERVAL);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, isPaused, advance]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="relative z-10 w-full overflow-hidden bg-[#020617] pt-8 pb-20 md:pt-12 md:pb-24"
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        onMouseLeave();
      }}
      onMouseMove={onMouseMove}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_50%,rgba(0,60,200,0.09),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <span className="inline-flex items-center rounded-full border border-[#4D8EFF]/25 bg-[#0066FF]/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9CC0FF]">
            Creative Portfolio
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.025em] text-white">
            Graphic Design & Brand Work
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[0.9375rem] leading-[1.75] text-white/52">
            Visual identities, websites, and digital experiences built for conversion and recall.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{
            height: "clamp(320px, 44vw, 540px)",
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
            rotateX: rotX,
            rotateY: rotY,
          }}
        >
          {DESIGNS.map((design, i) => {
            const position = wrap(i - activeIndex, TOTAL);
            const adjustedPos =
              position > TOTAL / 2 ? position - TOTAL : position;
            return (
              <DesignCard
                key={design.id}
                design={design}
                position={adjustedPos}
                onClick={() => {
                  if (adjustedPos !== 0) setActiveIndex(i);
                }}
              />
            );
          })}
        </motion.div>

        {/* Dot indicators */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {DESIGNS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "h-2 w-8 bg-[#4D8EFF]"
                  : "h-2 w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white/70 backdrop-blur-md transition-all duration-200 hover:border-[#4D8EFF]/40 hover:bg-[#0066FF]/10 hover:text-white"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white/70 backdrop-blur-md transition-all duration-200 hover:border-[#4D8EFF]/40 hover:bg-[#0066FF]/10 hover:text-white"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
