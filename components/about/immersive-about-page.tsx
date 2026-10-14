"use client";

import { animate, motion, useInView, useMotionValue, useMotionTemplate, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Brain, Globe, Rocket, Shield, Sparkles, Target, TrendingUp, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FloatingParticles, AnimatedGrid } from "@/components/ui/visual-effects";
import { ScrollReveal } from "@/components/ui/motion-components";
import { MarqueeLogos } from "@/components/ui/client-logo-strip";
import type { SanityAboutPage } from "@/lib/sanity";

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_LINEAR = [0, 0, 1, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Icon registry for Sanity icon name strings
const ICON_MAP: Record<string, React.ElementType> = {
  Users, Rocket, Shield, Brain, Target, Zap, Globe, TrendingUp,
};

function resolveIcon(name?: string): React.ElementType {
  return (name && ICON_MAP[name]) ? ICON_MAP[name] : Sparkles;
}

// Default hardcoded data
const DEFAULT_STATS = [
  { label: "Returning Clients",             value: 99,  suffix: "%", icon: Users },
  { label: "Successful Projects",           value: 150, suffix: "+", icon: Rocket },
  { label: "Years of Combined Team Expertise", value: 15, suffix: "+", icon: Brain },
] as const;

const DEFAULT_VALUES = [
  { icon: Target,    title: "Precision",    desc: "Every decision backed by data, not guesswork." },
  { icon: Zap,       title: "Velocity",     desc: "Speed to market with zero compromise on quality." },
  { icon: Globe,     title: "Global Reach", desc: "Cross-border growth systems built for scale." },
  { icon: TrendingUp,title: "Outcomes",     desc: "We measure everything that moves the needle." },
];

export interface ImmersiveAboutPageProps {
  data?: SanityAboutPage | null
}

function CountCard({ value, suffix, label, icon: Icon }: { value: number; suffix: string; label: string; icon: React.ElementType }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE_OUT,
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20, scale: 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.65, ease: EASE }}
      className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-xl will-change-transform hover:border-[#79ABFF]/28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_35%_20%,rgba(0,102,255,0.2),transparent_58%)]" />
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#79ABFF]/28 bg-[#0C2C57]/42 text-[#79ABFF]">
        <Icon size={18} />
      </div>
      <p className="relative font-heading text-4xl font-semibold tracking-tight text-white md:text-5xl">
        {count}{suffix}
      </p>
      <p className="relative mt-2 text-sm text-white/68">{label}</p>
      <div className="relative mt-5 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.span
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0066FF] to-[#70A8FF]"
          initial={{ width: "0%" }}
          animate={inView ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 1.4, ease: EASE }}
        />
      </div>
    </motion.div>
  );
}

export function ImmersiveAboutPage({ data }: ImmersiveAboutPageProps = {}) {
  // Derive active data from Sanity or fall back to hardcoded defaults
  const STATS: Array<{ label: string; value: number; suffix: string; icon: React.ElementType }> =
    data?.stats?.length
      ? data.stats.map((s) => {
          const raw = s.value ?? "";
          const numeric = parseInt(raw.replace(/[^0-9]/g, ""), 10) || 0;
          const suffix = raw.replace(/[0-9]/g, "");
          return { label: s.label, value: numeric, suffix, icon: Sparkles };
        })
      : [...DEFAULT_STATS];

  const VALUES: Array<{ icon: React.ElementType; title: string; desc: string }> =
    data?.values?.length
      ? data.values.map((v) => ({ icon: resolveIcon(v.iconName), title: v.title, desc: v.description }))
      : [...DEFAULT_VALUES];

  const rootRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18 });
  const spotX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const spotY = useTransform(smoothY, [0, 1], ["0%", "100%"]);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotX} ${spotY}, rgba(0,102,255,0.14), transparent 68%)`;

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden bg-[#061124] text-white"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }}
    >
      {/* Global spotlight */}
      <motion.div className="pointer-events-none fixed inset-0 z-0 opacity-80" style={{ background: spotlight }} />

      {/* Static backgrounds */}
      <div className="pointer-events-none absolute inset-0 -z-40 bg-[linear-gradient(180deg,#0A1B35_0%,#061124_62%,#030915_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(1200px_circle_at_12%_14%,rgba(0,102,255,0.22),transparent_58%),radial-gradient(900px_circle_at_88%_12%,rgba(130,181,255,0.14),transparent_62%)]" />
      <AnimatedGrid opacity={0.28} gridSize={72} />
      <FloatingParticles count={24} className="-z-10 opacity-60" />

      <main className="relative z-10">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="flex min-h-[80vh] items-center px-6 pb-16 pt-[100px] md:px-10 md:pt-[120px] lg:pt-[160px]">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.65, ease: EASE }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8DB8FF]/30 bg-[#78A8FF]/10 px-4 py-1.5 text-xs tracking-[0.2em] text-[#DCEBFF] uppercase backdrop-blur-sm"
              >
                <Sparkles size={13} className="text-[#79ABFF]" />
                Uptrix Technologies
              </motion.div>

              <motion.h1
                className="font-heading text-[clamp(2.75rem,6vw,5rem)] font-semibold tracking-[-0.025em]"
                initial={{ opacity: 0, y: 24, scale: 1 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
              >
                About{" "}
                <motion.span
                  className="inline-block bg-gradient-to-r from-[#E6F1FF] via-[#70A8FF] to-[#E6F1FF] bg-[length:200%_100%] bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: EASE_LINEAR }}
                >
                  Us
                </motion.span>
              </motion.h1>

              <motion.p
                className="mx-auto mt-5 max-w-xl text-base text-white/68 leading-[1.8]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.72, delay: 0.18, ease: EASE }}
              >
                Real growth begins when innovation meets purpose. Uptrix Technologies is a growth marketing company. One team owns strategy, execution and performance, from the first call to scale.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.28, ease: EASE }}
              >
                <Link
                  href="/contact"
                  className="shine-sweep group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-6 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,102,255,0.36)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(0,102,255,0.48)]"
                >
                  <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.22),transparent_50%)]" />
                  Let&apos;s Connect
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 rounded-xl border border-white/16 bg-white/[0.04] px-6 py-3.5 font-heading text-sm font-medium text-white/88 backdrop-blur-sm transition-all duration-300 hover:border-white/28 hover:bg-white/[0.07] hover:-translate-y-0.5"
                >
                  Our Services
                  <ArrowUpRight size={15} className="opacity-60 transition-transform duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── LOGOS ─────────────────────────────────────────────── */}
        <MarqueeLogos title="Trusted by growth-focused teams worldwide" className="px-6 md:px-10" />

        {/* ── MISSION / VISION ─────────────────────────────────── */}
        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <ScrollReveal direction="left" className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-7 backdrop-blur-xl md:p-10 hover:border-[#79ABFF]/24 transition-colors duration-300">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(0,102,255,0.16),transparent_55%)]" />
              <p className="text-xs font-medium tracking-[0.2em] text-[#A8C9FF]/70 uppercase">Our Mission</p>
              <h2 className="mt-4 max-w-xl font-heading text-[clamp(1.75rem,3.5vw,3rem)] leading-tight font-semibold tracking-[-0.02em]">
                Maximize Your Growth With AI-Powered Marketing
              </h2>
              <p className="mt-4 text-[0.9375rem] text-white/68 leading-[1.8]">
                To empower businesses through smart development and result-driven marketing, creating growth that compounds over time.
              </p>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="mt-7 inline-flex items-center gap-2 rounded-2xl border border-[#8FB9FF]/40 bg-[#77A9FF]/12 px-5 py-3 font-heading text-lg text-[#E8F2FF]"
              >
                <Zap size={18} className="text-[#79ABFF]" />
                15+ Years Of Combined Team Expertise
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1} className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-7 backdrop-blur-xl md:p-10 hover:border-[#79ABFF]/24 transition-colors duration-300">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(0,102,255,0.16),transparent_55%)]" />
              <p className="text-xs font-medium tracking-[0.2em] text-[#A8C9FF]/70 uppercase mb-4">Your Success, Our Priority</p>
              <p className="text-[0.9375rem] text-white/68 leading-[1.8]">
                At Uptrix Technologies, we turn ideas into impact. We are a growth marketing team dedicated to helping brands grow, scale and stand out in the digital world.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {VALUES.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                    <Icon size={16} className="text-[#79ABFF] mb-2" />
                    <p className="font-heading text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-xs text-white/58 leading-5">{desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── STATS ─────────────────────────────────────────────── */}
        <section className="px-6 py-12 md:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {STATS.map((item) => (
                <CountCard key={item.label} label={item.label} value={item.value} suffix={item.suffix} icon={item.icon} />
              ))}
            </div>
          </div>
        </section>

        {/* ── COMBINED EXPERTISE ────────────────────────────────── */}
        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto w-full max-w-4xl">
            <ScrollReveal className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-7 backdrop-blur-xl md:p-10">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(0,102,255,0.16),transparent_55%)]" />
              <p className="text-xs font-medium tracking-[0.2em] text-[#A8C9FF]/70 uppercase">Our Approach</p>
              <h2 className="mt-4 font-heading text-[clamp(1.75rem,3.5vw,3rem)] leading-tight font-semibold tracking-[-0.02em] text-white">
                Built on 15+ Years of Combined Expertise
              </h2>
              <p className="mt-5 text-[0.9375rem] text-white/68 leading-[1.8]">
                Uptrix Technologies was founded in 2024. The team behind it has spent more than fifteen combined years across SEO, paid media, performance marketing and growth systems, working with startups, scaleups and SMEs.
              </p>
              <p className="mt-4 text-[0.9375rem] text-white/68 leading-[1.8]">
                That experience is why we work in a fixed order rather than starting with execution. Diagnose what is actually limiting growth, decide what matters, sequence the work, ship it, and scale what the evidence supports.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ── EXPERTISE CTA ─────────────────────────────────────── */}
        <section className="px-6 pb-24 pt-8 md:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <ScrollReveal>
              <div className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-7 backdrop-blur-xl md:p-10 hover:border-[#79ABFF]/24 transition-colors duration-300">
                <motion.div
                  className="pointer-events-none absolute -inset-[1px] rounded-[2rem] opacity-40"
                  animate={{ opacity: [0.22, 0.44, 0.22] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: EASE }}
                  style={{ background: "linear-gradient(120deg, rgba(0,102,255,0.2), rgba(255,255,255,0.04), rgba(0,102,255,0.18))" }}
                />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100 bg-[radial-gradient(circle_at_25%_15%,rgba(0,102,255,0.18),transparent_56%)]" />
                <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="max-w-2xl font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-semibold tracking-[-0.02em]">
                      Proven Strategies And Business Growth
                    </h2>
                    <p className="mt-4 max-w-xl text-[0.9375rem] text-white/68 leading-[1.8]">
                      We combine creativity, technology and strategy to deliver the one thing that matters most: your measurable success.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="shine-sweep shrink-0 group inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-6 py-4 font-heading text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,102,255,0.36)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(0,102,255,0.48)] whitespace-nowrap"
                  >
                    Start Growing Today
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </div>
  );
}
