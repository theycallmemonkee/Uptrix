"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Target,
  Globe,
  Compass,
  Sparkles,
  Layers,
} from "lucide-react";
import { SolutionConfig } from "@/data/solutions-data";

const EASE = [0.22, 1, 0.36, 1] as const;
const ICON_MAP = { TrendingUp, Target, Globe, Compass, Sparkles, Layers };

// ── Hardcoded config for AI Marketing System — edit only this file ──
const IMAGE_SRC =
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=960&q=85";
const CARD_VALUE = "1.9M";
const CARD_LABEL = "Views in 90 Days";
const CARD_SUBLABEL = "AI-powered content engine";

type Props = { solution: SolutionConfig };

export function AiMarketingHero({ solution }: Props) {
  const IconComp = ICON_MAP[solution.iconName as keyof typeof ICON_MAP] ?? Sparkles;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.4);
  const smoothX = useSpring(mouseX, { stiffness: 78, damping: 22, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 78, damping: 22, mass: 0.8 });

  const glowX = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(smoothY, [0, 1], ["10%", "75%"]);
  const glowBg = useMotionTemplate`radial-gradient(700px circle at ${glowX} ${glowY}, rgba(0, 102, 255, 0.14), transparent 65%)`;

  const parallaxX = useTransform(smoothX, [0, 1], [-7, 7]);
  const parallaxY = useTransform(smoothY, [0, 1], [-5, 6]);
  const rotateX = useTransform(smoothY, [0, 1], [3.5, -3.5]);
  const rotateY = useTransform(smoothX, [0, 1], [-3.5, 3.5]);

  const listVariants = useMemo(
    () => ({ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0 } } }),
    [],
  );
  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
      show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.68, ease: EASE } },
    }),
    [],
  );

  return (
    <section
      className="relative z-20 flex w-full flex-col overflow-hidden pt-[130px] pb-20 sm:pt-[148px] sm:pb-24 lg:min-h-[88vh] lg:justify-center lg:pb-28"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - r.left) / r.width);
        mouseY.set((e.clientY - r.top) / r.height);
      }}
    >
      <motion.div className="pointer-events-none absolute inset-0 -z-10" style={{ background: glowBg }} />

      <p className="pointer-events-none absolute left-1/2 top-[50%] -z-20 -translate-x-1/2 -translate-y-1/2 select-none text-center font-heading text-[15vw] leading-none font-bold tracking-[0.22em] text-white/[0.008] blur-[0.3px] md:text-[9rem]">
        UPTRIX
      </p>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[1fr_1fr] lg:gap-14 xl:gap-16">

        {/* ── Left column: text ── */}
        <motion.div
          className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
          initial="hidden"
          animate="show"
          variants={listVariants}
        >
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#79ABFF]/18 bg-[#0C2C57]/40 px-4 py-1.5 text-[10.5px] font-medium tracking-[0.22em] text-[#CFE3FF]/80 uppercase backdrop-blur-md"
          >
            <IconComp size={10} className="shrink-0 text-[#79ABFF]" />
            <span>{solution.badge}</span>
          </motion.div>

          {/* Headline — two explicit blocks for clean 2-line layout on desktop */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-[clamp(1.8rem,2.6vw,2.9rem)] leading-[1.12] font-extrabold tracking-[-0.025em] text-white"
          >
            <span className="block">Worried Your Competitors Are</span>
            <span className="block mt-1">
              Winning With AI While You{" "}
              <motion.span
                className="relative inline-flex items-center whitespace-nowrap rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1 align-middle text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)] backdrop-blur-[2px]"
                animate={{
                  boxShadow: [
                    "0 8px 24px rgba(0,102,255,0.2)",
                    "0 10px 30px rgba(0,102,255,0.3)",
                    "0 8px 24px rgba(0,102,255,0.2)",
                  ],
                }}
                transition={{ duration: 3.2, repeat: Infinity, ease: EASE }}
              >
                Watch?
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-[460px] text-[0.9375rem] leading-[1.78] text-white/60 mx-auto lg:mx-0"
          >
            {solution.heroDescription}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row lg:justify-start"
          >
            <Link
              href="/contact"
              className="shine-sweep will-gpu group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-6 py-3.5 font-heading text-xs font-semibold text-white shadow-[0_12px_36px_rgba(0,102,255,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#86B6FF] hover:shadow-[0_18px_44px_rgba(0,102,255,0.44)] sm:w-auto"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/portfolio"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-heading text-xs font-medium text-white/72 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.05] hover:text-white sm:w-auto"
            >
              See Our Work
              <ChevronRight size={12} />
            </Link>
          </motion.div>

          <motion.p variants={itemVariants} className="mt-3.5 text-[11px] italic text-white/36">
            No commitment. We understand your situation first.
          </motion.p>
        </motion.div>

        {/* ── Right column: premium image card ── */}
        <motion.div
          className="relative mx-auto w-full max-w-[320px] sm:max-w-[420px] lg:max-w-none lg:justify-self-end mt-10 lg:mt-0"
          style={{ x: parallaxX, y: parallaxY }}
          initial={{ opacity: 0, scale: 0.97, y: 22, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
        >
          <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(ellipse_at_55%_50%,rgba(0,102,255,0.28),rgba(0,50,160,0.1)_52%,transparent_78%)] blur-3xl" />

          <motion.div
            className="relative overflow-hidden rounded-[28px] border border-white/[0.1] shadow-[0_40px_100px_rgba(2,9,22,0.7),0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.09)]"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: EASE }}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={IMAGE_SRC}
                alt="AI marketing strategy session"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 560px"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#020D20]/65 via-[#031428]/30 to-[#001E6E]/25" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010810]/75 via-transparent to-[#010810]/15" />
              <div className="absolute inset-0 opacity-30 mix-blend-screen bg-[radial-gradient(ellipse_at_60%_40%,rgba(30,100,220,0.35),transparent_65%)]" />
            </div>
          </motion.div>

          {/* Single floating metric card */}
          <motion.div
            initial={{ opacity: 0, x: -14, scale: 0.93 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.75, ease: EASE }}
            whileHover={{ y: -3, scale: 1.02, transition: { duration: 0.2 } }}
            className="hidden lg:block absolute -left-7 bottom-8 w-[148px] rounded-2xl border border-white/[0.09] bg-[#071b38]/96 p-3.5 shadow-[0_16px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.07)] ring-1 ring-white/[0.03] backdrop-blur-2xl pointer-events-none z-20"
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(0,102,255,0.14),transparent_55%)]" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[7.5px] font-semibold tracking-[0.14em] text-white/40 uppercase">{CARD_LABEL}</span>
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded bg-emerald-500/10 text-emerald-400 text-[9px]">↑</span>
              </div>
              <p className="font-heading text-[1.5rem] font-bold leading-none text-white">{CARD_VALUE}</p>
              <p className="text-[7px] text-white/44 leading-relaxed mt-1">{CARD_SUBLABEL}</p>
              <div className="mt-2.5 h-[2.5px] overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#2E6EE0] to-[#90B8FF]"
                  initial={{ width: "0%" }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
