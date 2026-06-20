"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/data/portfolio-data";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ────────────────────────────────────────────────────────────────

const ITEMS = PORTFOLIO_ITEMS; // all 5 portfolio items
const N = ITEMS.length;
const SCROLL_PER_CARD = 550; // px of page scroll per card step
const EASE = [0.22, 1, 0.36, 1] as const;

const categorySlugMap: Record<string, string> = {
  "ai-seo": "ai-seo",
  "google-ads": "google-ads",
  "meta-ads": "meta-ads",
  "social-media": "social",
  "website-development": "websites",
};

/**
 * Returns the signed circular offset of card i from float position pos.
 * Always in the range (-N/2, N/2].
 */
function wrapOffset(i: number, pos: number): number {
  let o = i - pos;
  o = ((o % N) + N) % N;
  if (o > N / 2) o -= N;
  return o;
}

// ─── Portfolio card ───────────────────────────────────────────────────────────

function PortfolioCard({ item, landscape = false }: { item: PortfolioItem; landscape?: boolean }) {
  const href = `/portfolio/${categorySlugMap[item.id] || item.id}/case-study-1`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/12 bg-[linear-gradient(155deg,rgba(12,28,56,0.82),rgba(5,14,30,0.72))] shadow-[0_28px_70px_rgba(2,8,22,0.55)] ring-1 ring-inset ring-white/8 backdrop-blur-2xl transition-colors duration-500 hover:border-[#70A8FF]/32 hover:shadow-[0_36px_90px_rgba(2,8,22,0.65),0_0_55px_rgba(0,102,255,0.15)] transform-gpu [backface-visibility:hidden]">
      {/* Hover glow sweep */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_25%_20%,rgba(0,102,255,0.14),transparent_55%)]" />

      {/* Image — 57% of card height in landscape coverflow, fixed 200px in mobile grid */}
      <Link
        href={href}
        onClick={() => window.scrollTo(0, 0)}
        className="relative block w-full shrink-0 overflow-hidden"
        style={{ height: landscape ? "48%" : 200 }}
      >
        <Image
          src={item.featuredImage}
          alt={item.title}
          fill
          className="object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          sizes="(min-width: 1280px) 53vw, (min-width: 768px) 52vw, 90vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050e1e]/90 via-[#050e1e]/25 to-transparent" />
        <div className="absolute inset-0 flex items-end p-5 opacity-0 transition-opacity duration-400 group-hover:opacity-100 bg-[#050e1e]/40">
          <span className="inline-flex items-center gap-1 font-heading text-[10px] font-semibold uppercase tracking-wider text-[#70A8FF]">
            View Case Study
            <ArrowUpRight size={12} />
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#70A8FF]">
            {item.category}
          </span>
          <span className="text-[10px] text-white/45">{item.client}</span>
        </div>

        <h3 className="mt-2 font-heading text-[15px] font-semibold leading-[1.3] tracking-tight text-white transition-colors duration-300 group-hover:text-[#CDDEFF]">
          {item.title}
        </h3>

        <p className="mt-2 flex-1 text-[12px] leading-[1.7] text-white/55 line-clamp-2">
          {item.subtitle}
        </p>

        {/* Metrics */}
        <div className="mt-4 border-t border-white/[0.06] pt-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {item.metrics.slice(0, 2).map((m) => (
                <span
                  key={m.label}
                  className="rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold text-white/88 backdrop-blur-sm"
                >
                  {m.value} {m.label}
                </span>
              ))}
            </div>
            <Link
              href={href}
              onClick={() => window.scrollTo(0, 0)}
              className="ml-3 shrink-0 rounded-full border border-white/10 p-2 text-white/60 transition-all duration-300 group-hover:border-[#70A8FF]/40 group-hover:bg-[#0066FF] group-hover:text-white"
            >
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function PortfolioPreview() {
  const outerRef   = useRef<HTMLDivElement>(null);
  const stageRef   = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  /**
   * drive(pos) — sets all 3-D transforms for the given float card position.
   * pos=0 → item 0 centred, pos=1 → item 1 centred, etc.
   */
  const drive = useCallback((pos: number) => {
    const vw    = typeof window !== "undefined" ? window.innerWidth : 1280;
    const CARD_X = Math.max(240, Math.min(580, Math.round(vw * 0.40)));
    const lerp  = gsap.utils.interpolate;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;

      const o    = wrapOffset(i, pos);
      const absO = Math.abs(o);
      const sign = o < 0 ? -1 : 1;

      if (absO > 2.4) {
        gsap.set(el, { autoAlpha: 0, zIndex: 0, force3D: true });
        return;
      }

      // Scale: 1.0 → 0.88 → 0.76
      const scale = absO <= 1
        ? lerp(1, 0.88, absO)
        : lerp(0.88, 0.76, Math.min(absO - 1, 1));

      // RotateY: 0° → ±25° → ±45°
      const ry = (absO <= 1
        ? lerp(0, 25, absO)
        : lerp(25, 45, Math.min(absO - 1, 1))) * sign;

      const x = o * CARD_X;

      // Opacity: 1 → 0.6 → 0.3
      const opacity = absO <= 1
        ? lerp(1, 0.6, absO)
        : lerp(0.6, 0.3, Math.min(absO - 1, 1));

      // Blur: none at centre, subtle for side cards
      const blur   = absO < 0.5 ? 0 : Math.min((absO - 0.5) * 2, 1.2);
      const zIndex = Math.max(1, 10 - Math.round(absO * 2));

      gsap.set(el, {
        xPercent: -50,
        yPercent: -50,
        x,
        rotateY: ry,
        scale,
        autoAlpha: opacity,
        filter: blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none",
        zIndex,
        force3D: true,
        pointerEvents: absO < 0.5 ? "auto" : "none",
      });
    });

    // Dots
    const active = Math.round(((pos % N) + N) % N);
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      gsap.to(dot, {
        width: i === active ? 24 : 8,
        opacity: i === active ? 1 : 0.35,
        duration: 0.22,
        ease: "power2.out",
        overwrite: true,
      });
    });
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) return; // skip GSAP on mobile — CSS grid shown instead
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Position cards before revealing stage (prevents stacked-card flash)
    drive(0);
    if (stageRef.current) stageRef.current.style.opacity = "1";

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([badgeRef.current, headingRef.current, descRef.current], {
          opacity: 1, y: 0, clearProps: "filter",
        });
        return;
      }

      // One-shot heading entrances
      gsap.fromTo(badgeRef.current, { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.55, ease: "power2.out",
        scrollTrigger: {
          trigger: badgeRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      gsap.fromTo(headingRef.current, { opacity: 0, y: 40, filter: "blur(12px)" }, {
        opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      gsap.fromTo(descRef.current, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.65, delay: 0.08, ease: "power2.out",
        scrollTrigger: {
          trigger: descRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      // Coverflow scroll driver — NO GSAP PIN.
      // CSS position:sticky handles the pinning via the outer div's extra height.
      // scrub:0.5 gives buttery-smooth card transitions.
      ScrollTrigger.create({
        trigger: outerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          drive(self.progress * (N - 1));
        },
      });
    }, outerRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [drive]);

  return (
    <>
      {/* ── Mobile: plain card grid (shown below md) ── */}
      <section className="md:hidden bg-[#061124] px-5 py-14">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8DB8FF]/28 bg-[#78A8FF]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#DCEBFF] uppercase">
            <Sparkles size={12} className="text-[#70A8FF]" />
            Proven Impact
          </div>
          <h2 className="mx-auto max-w-2xl font-heading text-[clamp(1.6rem,6vw,2.25rem)] font-semibold tracking-[-0.02em] text-white">
            Real Results From Real Work
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-[0.9375rem] leading-[1.75] text-white/65">
            We build, manage and scale growth systems that turn traffic into revenue. Here is a look at the work.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            onClick={() => window.scrollTo(0, 0)}
            className="shine-sweep group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-8 py-4 font-heading text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,102,255,0.36)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(0,102,255,0.48)]"
          >
            Explore Full Portfolio
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>

      {/*
       * OUTER DIV — provides the scroll space the sticky inner consumes.
       * 100vh for the pinned section + (N-1)*SCROLL_PER_CARD extra pixels.
       * Hidden on mobile — the grid above handles small screens.
       */}
      <div
        ref={outerRef}
        className="hidden md:block"
        style={{
          position: "relative",
          height: `calc(100vh + ${(N - 1) * SCROLL_PER_CARD}px)`,
        }}
      >
        {/* STICKY INNER — stays pinned at the viewport top */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden", // clips cards at viewport edges (coverflow effect)
          }}
          className="flex flex-col bg-[#061124]"
        >
          {/* Radial background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(1000px circle at 50% 30%, rgba(0,102,255,0.07), transparent 60%)",
            }}
          />
          {/* Grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.022]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Content column */}
          <div className="flex h-full flex-col items-center px-6 py-10 md:px-10 md:py-14">

            {/* Heading */}
            <div className="w-full shrink-0 text-center">
              <div
                ref={badgeRef}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8DB8FF]/28 bg-[#78A8FF]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#DCEBFF] uppercase"
              >
                <Sparkles size={12} className="text-[#70A8FF]" />
                Proven Impact
              </div>

              <h2
                ref={headingRef}
                className="mx-auto max-w-2xl font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.02em] text-white"
              >
                Real Results From Real Work
              </h2>

              <p
                ref={descRef}
                className="mx-auto mt-4 max-w-lg text-[0.9375rem] leading-[1.75] text-white/65"
              >
                We build, manage and scale growth systems that turn traffic into
                revenue. Here is a look at the work.
              </p>
            </div>

            {/* 3D Coverflow Stage
             * opacity:0 → drive(0) fires → opacity:1 (no stacked-card flash) */}
            <div
              ref={stageRef}
              className="relative mt-8 w-full flex-1"
              style={{
                opacity: 0,
                perspective: "1400px",
                perspectiveOrigin: "50% 50%",
                overflow: "visible",
              }}
            >
              {/* Ambient glow behind active card */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: 520,
                  height: 520,
                  background:
                    "radial-gradient(circle at center, rgba(0,102,255,0.20) 0%, rgba(0,102,255,0.07) 45%, transparent 70%)",
                  filter: "blur(52px)",
                }}
              />

              {/* Cards — landscape 17:10 ratio, wider to fill the stage */}
              {ITEMS.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="absolute transform-gpu will-change-transform"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: "clamp(420px, 56vw, 780px)",
                    aspectRatio: "16/10",
                    maxHeight: "62vh",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <PortfolioCard item={item} landscape />
                </div>
              ))}
            </div>

            {/* Progress dots */}
            <div className="mt-5 flex shrink-0 items-center justify-center gap-2">
              {ITEMS.map((_, i) => (
                <span
                  key={i}
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className="block h-2 rounded-full bg-[#4D8EFF]"
                  style={{ width: 8, opacity: 0.35 }}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Explore CTA — desktop only, below sticky coverflow */}
      <div className="hidden md:block bg-[#061124] py-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Link
            href="/portfolio"
            onClick={() => window.scrollTo(0, 0)}
            className="shine-sweep group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-8 py-4 font-heading text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,102,255,0.36)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(0,102,255,0.48)]"
          >
            Explore Full Portfolio
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </>
  );
}
