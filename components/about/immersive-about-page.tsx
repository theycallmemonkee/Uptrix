"use client";

import { animate, motion, useInView, useMotionValue, useMotionTemplate, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Brain, Globe, Rocket, Shield, Sparkles, Target, TrendingUp, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { FloatingParticles, FloatingOrbs, AnimatedGrid } from "@/components/ui/visual-effects";
import { ScrollReveal, SplitTextReveal } from "@/components/ui/motion-components";
import { MarqueeLogos } from "@/components/ui/client-logo-strip";

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_LINEAR = [0, 0, 1, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { label: "Returning Clients",    value: 99,  suffix: "%", icon: Users },
  { label: "Successful Projects",  value: 150, suffix: "+", icon: Rocket },
  { label: "Work Transparency",    value: 100, suffix: "%", icon: Shield },
  { label: "Years of Expertise",   value: 15,  suffix: "+", icon: Brain },
] as const;

const TIMELINE = [
  { year: "2009", title: "Founded", desc: "Uptrix was born with a mission to bridge technology and marketing." },
  { year: "2014", title: "Going Digital", desc: "Expanded into AI SEO & PPC as digital channels exploded globally." },
  { year: "2018", title: "AI Integration", desc: "First-mover on AI-powered campaign optimization infrastructure." },
  { year: "2022", title: "Enterprise Scale", desc: "Serving 100+ enterprise brands across 12+ industries worldwide." },
  { year: "2024", title: "Growth OS", desc: "Launched full-stack AI Growth OS for ambitious brands." },
] as const;

const VALUES = [
  { icon: Target,    title: "Precision",    desc: "Every decision backed by data, not guesswork." },
  { icon: Zap,       title: "Velocity",     desc: "Speed to market with zero compromise on quality." },
  { icon: Globe,     title: "Global Reach", desc: "Cross-border growth systems built for scale." },
  { icon: TrendingUp,title: "Outcomes",     desc: "We measure everything that moves the needle." },
] as const;

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
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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

function TimelineItem({ year, title, desc, index }: { year: string; title: string; desc: string; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      className={`relative flex items-start gap-6 ${isEven ? "flex-row" : "flex-row-reverse"} lg:items-center`}
      initial={{ opacity: 0, x: isEven ? -30 : 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: EASE }}
    >
      {/* Card */}
      <motion.div
        className="group relative flex-1 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-xl hover:border-[#79ABFF]/28 transition-colors duration-300"
        whileHover={{ y: -4, scale: 1.01 }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_25%_20%,rgba(0,102,255,0.18),transparent_55%)]" />
        <p className="text-xs font-medium tracking-[0.2em] text-[#A8C9FF]/70 uppercase">{year}</p>
        <h3 className="mt-2 font-heading text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-white/68">{desc}</p>
      </motion.div>

      {/* Center dot */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
        <motion.div
          className="h-3 w-3 rounded-full bg-[#0066FF] shadow-[0_0_20px_rgba(0,102,255,0.6)]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: EASE, delay: index * 0.3 }}
        />
        <div className="absolute h-full w-px bg-gradient-to-b from-white/5 via-[#0066FF]/40 to-white/5" />
      </div>

      {/* Spacer for alternating */}
      <div className="flex-1 lg:block hidden" />
    </motion.div>
  );
}

export function ImmersiveAboutPage() {
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
        <section className="flex min-h-[90vh] items-center px-6 pb-16 pt-[100px] md:px-10 md:pt-[120px] lg:pt-[160px]">
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
                className="font-heading text-6xl font-semibold tracking-tight md:text-8xl"
                initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
                className="mx-auto mt-6 max-w-2xl text-lg text-white/72 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.72, delay: 0.18, ease: EASE }}
              >
                Real growth begins when innovation meets purpose. We are India&apos;s most advanced AI marketing infrastructure company.
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
        <MarqueeLogos title="Collaborated with 100+ internationally renowned companies" className="px-6 md:px-10" />

        {/* ── MISSION / VISION ─────────────────────────────────── */}
        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <ScrollReveal direction="left" className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-7 backdrop-blur-xl md:p-10 hover:border-[#79ABFF]/24 transition-colors duration-300">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(0,102,255,0.16),transparent_55%)]" />
              <p className="text-xs font-medium tracking-[0.2em] text-[#A8C9FF]/70 uppercase">Our Mission</p>
              <h2 className="mt-4 max-w-xl font-heading text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
                Maximize Your Growth With AI-Powered Marketing
              </h2>
              <p className="mt-5 max-w-2xl text-white/72 leading-7">
                To empower businesses through smart development and result-driven marketing — creating growth that compounds over time.
              </p>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="mt-7 inline-flex items-center gap-2 rounded-2xl border border-[#8FB9FF]/40 bg-[#77A9FF]/12 px-5 py-3 font-heading text-lg text-[#E8F2FF]"
              >
                <Zap size={18} className="text-[#79ABFF]" />
                15+ Years Of Experience
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1} className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-7 backdrop-blur-xl md:p-10 hover:border-[#79ABFF]/24 transition-colors duration-300">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(0,102,255,0.16),transparent_55%)]" />
              <p className="text-xs font-medium tracking-[0.2em] text-[#A8C9FF]/70 uppercase mb-4">Your Success, Our Priority</p>
              <p className="text-white/74 leading-7">
                At Uptrix, we turn ideas into impact. We&apos;re a passionate development and marketing firm dedicated to helping brands grow, scale, and stand out in the digital world.
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
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {STATS.map((item) => (
                <CountCard key={item.label} label={item.label} value={item.value} suffix={item.suffix} icon={item.icon} />
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ──────────────────────────────────────────── */}
        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto w-full max-w-4xl">
            <ScrollReveal className="mb-12 text-center">
              <p className="text-xs font-medium tracking-[0.22em] text-[#A8C9FF]/70 uppercase mb-4">Our Journey</p>
              <h2 className="font-heading text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Built Over{" "}
                <span className="inline-flex items-center rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1.5 text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)]">
                  15 Years
                </span>
              </h2>
            </ScrollReveal>
            <div className="space-y-6">
              {TIMELINE.map((item, index) => (
                <TimelineItem key={item.year} {...item} index={index} />
              ))}
            </div>
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
                    <h2 className="max-w-2xl font-heading text-4xl font-semibold tracking-tight md:text-5xl">
                      Proven Strategies And Business Growth
                    </h2>
                    <p className="mt-4 max-w-3xl text-white/72 leading-7">
                      We combine creativity, technology, and strategy to deliver the one thing that matters most — your measurable success.
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
