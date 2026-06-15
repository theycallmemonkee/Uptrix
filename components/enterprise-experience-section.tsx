"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  type MotionValue,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Users2, Zap, TrendingUp, Award } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Stat = { value: number; suffix: string; label: string; icon: React.ElementType };
type PortfolioItem = { title: string; description: string; image: string };

const STATS: Stat[] = [
  { value: 2.5, suffix: "M+", label: "Ad spend managed", icon: TrendingUp },
  { value: 3.21, suffix: "X", label: "ROAS delivered on D2C campaigns", icon: Zap },
  { value: 955, suffix: "%", label: "ROAS delivered on Google ads", icon: Award },
  { value: 6, suffix: "+ years", label: "Building growth systems", icon: Users2 },
];

const PORTFOLIO: PortfolioItem[] = [
  {
    title: "Performance Engine",
    description: "AI campaign orchestration with full-funnel reporting intelligence.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Growth Studio",
    description: "Integrated paid, AI SEO, and lifecycle workflows for scale-ready brands.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Brand Acceleration",
    description: "Premium storytelling systems designed for trust and conversion lift.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  },
];

function PortfolioCard({
  item,
  index,
  parallaxX,
  parallaxY,
  mounted,
}: {
  item: PortfolioItem;
  index: number;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  mounted: boolean;
}) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 110, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 110, damping: 22 });
  const glowXp = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const glowYp = useTransform(smoothY, [0, 1], ["10%", "90%"]);
  const hoverGlow = useMotionTemplate`radial-gradient(280px circle at ${glowXp} ${glowYp}, rgba(0,102,255,0.22), transparent 70%)`;

  const rotateY = useTransform(parallaxX, (v) => v * 0.12);
  const rotateX = useTransform(parallaxY, (v) => v * -0.12);

  return (
    <motion.article
      className="group relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-[linear-gradient(160deg,rgba(14,34,64,0.75),rgba(7,18,37,0.64))] p-4 shadow-[0_22px_65px_rgba(2,9,22,0.45)] ring-1 ring-inset ring-white/8 backdrop-blur-2xl will-change-transform"
      style={{
        rotateY: mounted ? rotateY : 0,
        rotateX: mounted ? rotateX : 0,
        transformPerspective: 900,
      }}
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.72, delay: index * 0.09, ease: EASE }}
      whileHover={{ y: -10, scale: 1.012 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{ background: hoverGlow }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-[1.6rem] opacity-0 transition-opacity duration-400 group-hover:opacity-55"
        style={{ background: "linear-gradient(130deg, rgba(0,102,255,0.22), rgba(255,255,255,0.03), rgba(0,102,255,0.2))" }}
      />
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src={item.image}
          alt={item.title}
          width={900}
          height={540}
          className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 48vw, 100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071022]/75 via-transparent to-transparent" />
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.07) 50%, transparent 70%)" }}
        />
      </div>
      <div className="relative mt-5">
        <h4 className="font-heading text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#CFE3FF]">
          {item.title}
        </h4>
        <p className="mt-2 text-sm leading-6 text-white/68">{item.description}</p>
        <Link
          href="/contact"
          scroll
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-[#82B3FF]/42 hover:bg-[#0A2752]/55 hover:gap-3"
        >
          Explore Case
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-6" />
        </Link>
      </div>
    </motion.article>
  );
}

function formatNumber(n: number, target: number): string {
  const decimals = target % 1 !== 0 ? String(target).split(".")[1].length : 0;
  return n.toFixed(decimals);
}

function CountUpNumber({ value, suffix, icon: Icon }: { value: number; suffix: string; icon: React.ElementType }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.65 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const totalFrames = 60;
    const tick = () => {
      frame += 1;
      const progress = frame / totalFrames;
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(parseFloat((value * eased).toFixed(2)));
      if (frame < totalFrames) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="mb-3.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#79ABFF]/24 bg-[#0C2C57]/40 text-[#79ABFF]">
        <Icon size={18} />
      </div>
      <span className="font-heading text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl">
        {formatNumber(display, value)}
        {suffix}
      </span>
    </div>
  );
}

export function EnterpriseExperienceSection() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 85, damping: 20, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 85, damping: 20, mass: 0.8 });

  const glowX = useTransform(smoothX, [0, 1], ["8%", "92%"]);
  const glowY = useTransform(smoothY, [0, 1], ["6%", "88%"]);
  const movingLight = useMotionTemplate`radial-gradient(620px circle at ${glowX} ${glowY}, rgba(0,102,255,0.18), transparent 66%)`;

  const parallaxX = useTransform(smoothX, [0, 1], [-14, 14]);
  const parallaxY = useTransform(smoothY, [0, 1], [-12, 12]);
  const featureX = useTransform(parallaxX, (v) => v * 0.55);
  const featureY = useTransform(parallaxY, (v) => v * -0.45);

  return (
    <section
      className="relative z-10 w-full overflow-hidden px-6 pb-24 pt-12 md:px-10 md:pb-32"
      onMouseMove={(event) => {
        if (!mounted) return;
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
    >
      <motion.div className="pointer-events-none absolute inset-0 -z-20" style={mounted ? { background: movingLight } : undefined} />
      <div className="pointer-events-none absolute inset-0 -z-30 opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_52%,transparent_90%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat, index) => (
            <motion.article
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(14,34,64,0.7),rgba(7,18,37,0.6))] p-5 shadow-[0_18px_50px_rgba(2,9,22,0.42)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-2xl will-change-transform transition-all duration-300 hover:border-[#79ABFF]/26 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: EASE }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,rgba(0,102,255,0.26),transparent_48%)]" />
              <CountUpNumber value={stat.value} suffix={stat.suffix} icon={stat.icon} />
              <p className="mt-2 text-sm text-white/72">{stat.label}</p>
              <motion.div
                className="mt-5 h-[2px] w-full bg-gradient-to-r from-[#3F87FF]/0 via-[#79ABFF] to-[#3F87FF]/0"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: EASE, delay: index * 0.2 }}
              />
            </motion.article>
          ))}
        </div>

        {/* Main feature */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.article
            className="relative overflow-hidden rounded-[2rem] border border-white/16 bg-white/[0.06] p-4 shadow-[0_24px_75px_rgba(3,10,24,0.55)] ring-1 ring-inset ring-white/10 backdrop-blur-2xl"
            style={mounted ? { x: parallaxX, y: parallaxY } : undefined}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <div className="relative overflow-hidden rounded-[1.35rem]">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80"
                alt="Team collaboration and strategy session"
                width={1200}
                height={760}
                className="h-[24rem] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                sizes="(min-width: 1024px) 52vw, 100vw"
              />
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/16 to-transparent"
                initial={{ x: "-120%" }}
                whileInView={{ x: "120%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.35, ease: EASE, delay: 0.55 }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071022]/76 via-transparent to-transparent" />
            </div>

            <motion.div
              className="absolute left-6 bottom-6 inline-flex items-center gap-2 rounded-xl border border-[#85B5FF]/28 bg-[#0B2344]/78 px-4 py-2.5 text-sm text-white shadow-[0_14px_35px_rgba(2,9,22,0.5)] backdrop-blur-2xl"
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <Users2 size={16} className="text-[#97BEFF]" />
              Community Building
            </motion.div>
          </motion.article>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <h3 className="font-heading text-[clamp(1.75rem,3.5vw,3rem)] leading-tight font-semibold tracking-[-0.02em] text-white">
              One Connected Engine, Not Scattered Services
            </h3>
            <p className="mt-5 max-w-xl text-base leading-[1.8] text-white/68">
              We blend strategy, creative and the right technology into systems that work together. Where most businesses juggle separate vendors who never talk to each other, you get one engine where every part feeds the next, optimised on real data.
            </p>

            <motion.article
              className="group relative mt-8 overflow-hidden rounded-[1.7rem] border border-[#78AEFF]/28 bg-[linear-gradient(160deg,rgba(17,42,79,0.84),rgba(7,18,39,0.72))] p-6 shadow-[0_20px_56px_rgba(2,8,21,0.52)] ring-1 ring-inset ring-white/10 backdrop-blur-2xl transition-all duration-300 hover:border-[#79ABFF]/42 hover:-translate-y-1"
              style={mounted ? { x: featureX, y: featureY } : undefined}
            >
              <motion.div
                className="pointer-events-none absolute -inset-[1px] rounded-[1.7rem] opacity-55"
                animate={{ opacity: [0.32, 0.62, 0.32] }}
                transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
                style={{ background: "linear-gradient(120deg, rgba(0,102,255,0.2), rgba(255,255,255,0.04), rgba(0,102,255,0.2))" }}
              />
              <div className="relative z-10">
                <motion.span
                  className="inline-flex rounded-lg border border-[#90BAFF]/28 bg-white/[0.06] p-2 text-[#95BEFF]"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
                >
                  <Zap size={18} />
                </motion.span>
                <h4 className="mt-4 font-heading text-xl font-semibold text-white">One System, One Number</h4>
                <p className="mt-3 text-sm leading-[1.75] text-white/68">
                  Every system we build connects to one clear growth metric, so you always know what is working and why.
                </p>
              </div>
            </motion.article>
          </motion.div>
        </div>

        {/* Portfolio */}
        <div>
          <motion.h3
            className="mx-auto max-w-4xl text-center font-heading text-[clamp(1.75rem,3.5vw,3rem)] leading-tight font-semibold tracking-[-0.02em] text-white"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Your Story Success Begin With{" "}
            <span className="inline-flex items-center rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1.5 text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)]">
              Uptrix
            </span>
          </motion.h3>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {PORTFOLIO.map((item, index) => (
              <PortfolioCard
                key={item.title}
                item={item}
                index={index}
                parallaxX={parallaxX}
                parallaxY={parallaxY}
                mounted={mounted}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
