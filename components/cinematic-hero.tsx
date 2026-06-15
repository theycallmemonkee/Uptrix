"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import type { SanityHomePage } from "@/lib/sanity";

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
];

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_LINEAR = [0, 0, 1, 1] as const;

export interface CinematicHeroProps {
  data?: SanityHomePage | null
}

export function CinematicHero({ data }: CinematicHeroProps = {}) {
  const eyebrow = data?.heroEyebrow ?? "AI Powered Growth Systems Partner";
  const headlinePart1 = data?.heroHeadlinePart1 ?? "Marketing Feels";
  const headlineHighlight = data?.heroHeadlineHighlight ?? "Broken?";
  const bodyText = data?.heroBody ?? "Most businesses stitch together random tactics and hope something works. Uptrix Technologies builds the connected systems that bring you customers, convert them, and let you scale without the chaos. One partner. One engine. Real growth.";
  const cta1Label = data?.heroCta1Label ?? "Contact Us";
  const cta1Href = data?.heroCta1Href ?? "/contact";
  const cta2Label = data?.heroCta2Label ?? "Find Your System";
  const cta2Href = data?.heroCta2Href ?? "/solutions";
  const socialProofText = data?.heroSocialProofText ?? "Trusted by growing brands worldwide";
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.4);

  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 20, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 20, mass: 0.7 });

  const glowX = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(smoothY, [0, 1], ["10%", "75%"]);
  const glowBackground = useMotionTemplate`radial-gradient(700px circle at ${glowX} ${glowY}, rgba(0, 102, 255, 0.16), transparent 65%)`;

  const parallaxX = useTransform(smoothX, [0, 1], [-7, 7]);
  const parallaxY = useTransform(smoothY, [0, 1], [-5, 6]);
  const rotateX = useTransform(smoothY, [0, 1], [3.5, -3.5]);
  const rotateY = useTransform(smoothX, [0, 1], [-3.5, 3.5]);

  const textVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
      show: (delay = 0) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, delay, ease: EASE },
      }),
    }),
    [],
  );

  return (
    <section
      className="relative z-[1] flex w-full flex-col overflow-hidden justify-center min-h-[88vh] sm:min-h-[86vh] lg:h-[90vh] lg:min-h-[640px] lg:max-h-[860px] pt-32 pb-16 sm:pt-36 sm:pb-14 lg:pt-24 lg:pb-16"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
    >
      {/* Mouse-reactive glow */}
      <motion.div className="pointer-events-none absolute inset-0 -z-10" style={{ background: glowBackground }} />

      {/* Animated moving grid */}
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.18] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_85%)]">
        <motion.div
          className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px]"
          animate={{ backgroundPosition: ["0px 0px", "70px 70px"] }}
          transition={{ duration: 24, repeat: Infinity, ease: EASE_LINEAR }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="pointer-events-none absolute left-[8%] top-[20%] -z-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.22),transparent_65%)] blur-3xl"
        animate={{ y: [0, -16, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: EASE }}
      />
      <motion.div
        className="pointer-events-none absolute right-[12%] top-[25%] -z-20 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(120,168,255,0.16),transparent_60%)] blur-3xl"
        animate={{ y: [0, 12, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: EASE, delay: 1.5 }}
      />

      {/* UPTRIX watermark */}
      <p className="pointer-events-none absolute left-1/2 top-[82%] -z-20 -translate-x-1/2 -translate-y-1/2 select-none text-center font-heading text-[15vw] leading-none font-bold tracking-[0.22em] text-white/[0.007] blur-[1px] md:text-[9.5rem]">
        UPTRIX
      </p>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

        {/* ── Left: copy block ── */}
        <motion.div
          className="relative max-w-2xl text-center lg:text-left"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Eyebrow badge */}
          <motion.div
            custom={0}
            variants={textVariants}
            className="mt-6 mb-6 inline-flex items-center gap-2 rounded-full border border-[#79ABFF]/20 bg-[#0C2C57]/48 px-4 py-1.5 text-xs tracking-[0.18em] text-[#CFE3FF]/88 uppercase shadow-[0_2px_16px_rgba(0,102,255,0.1)] backdrop-blur-md"
          >
            <Sparkles size={11} className="text-[#79ABFF]" />
            {eyebrow}
          </motion.div>

          {/* Headline */}
          <motion.div custom={0.08} variants={textVariants} className="text-center lg:text-left">
            <h1 className="font-heading text-[clamp(2.75rem,7vw,4.75rem)] leading-[1.08] font-extrabold tracking-[-0.025em] text-white">
              {headlinePart1}
              <br />
              <motion.span
                className="relative mt-1 inline-flex items-center whitespace-nowrap rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1.5 text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)] backdrop-blur-[2px]"
                animate={{
                  boxShadow: [
                    "0 8px 24px rgba(0,102,255,0.2)",
                    "0 10px 30px rgba(0,102,255,0.32)",
                    "0 8px 24px rgba(0,102,255,0.2)",
                  ],
                }}
                transition={{ duration: 3.2, repeat: Infinity, ease: EASE }}
              >
                {headlineHighlight}
              </motion.span>
            </h1>
          </motion.div>

          {/* Body copy */}
          <motion.p
            custom={0.16}
            variants={textVariants}
            className="mt-6 max-w-[480px] text-[0.9375rem] leading-[1.8] text-white/65 mx-auto lg:mx-0"
          >
            {bodyText}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={0.24}
            variants={textVariants}
            className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3"
          >
            <Link
              href={cta1Href}
              scroll
              className="shine-sweep will-gpu group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-6 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_12px_32px_rgba(0,102,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#86B6FF] hover:shadow-[0_18px_44px_rgba(0,102,255,0.4)]"
            >
              {cta1Label}
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={cta2Href}
              className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-heading text-sm font-medium text-white/78 backdrop-blur-sm transition-all duration-300 hover:border-white/18 hover:bg-white/[0.055] hover:text-white hover:-translate-y-0.5"
            >
              {cta2Label}
              <ArrowUpRight size={14} className="opacity-45 transition-transform duration-300 group-hover:opacity-90 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            custom={0.32}
            variants={textVariants}
            className="mt-8 flex items-center justify-center lg:justify-start gap-4"
          >
            <div className="flex items-center">
              {AVATARS.map((src, index) => (
                <span
                  key={src}
                  className="-ml-2 first:ml-0 inline-block h-8 w-8 overflow-hidden rounded-full border-2 border-[#0B1F3A] shadow-lg relative"
                  style={{ zIndex: AVATARS.length - index }}
                >
                  <Image
                    src={src}
                    alt="Client Avatar"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-0.5 text-left">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3 w-3 fill-[#FFBA00]" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[11px] leading-tight text-white/58">
                {socialProofText}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right: premium image card ── */}
        <motion.div
          className="relative mx-auto w-full max-w-[320px] sm:max-w-[440px] lg:max-w-none lg:justify-self-end mt-6 lg:mt-0"
          style={{ x: parallaxX, y: parallaxY }}
          initial={{ opacity: 0, scale: 0.97, y: 22, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        >
          {/* Soft blue ambient glow behind image */}
          <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(ellipse_at_55%_50%,rgba(0,102,255,0.28),rgba(0,50,160,0.1)_52%,transparent_78%)] blur-3xl" />

          {/* Image card with dual-axis 3D tilt */}
          <motion.div
            className="relative overflow-hidden rounded-[28px] border border-white/[0.1] shadow-[0_40px_100px_rgba(2,9,22,0.7),0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.09)]"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: EASE }}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=960&q=85"
                alt="Brand performance showcase"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 440px, 580px"
              />
              {/* Dark blue cinematic grade — three-layer stack */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#020D20]/60 via-[#031428]/28 to-[#001E6E]/22" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010810]/72 via-transparent to-[#010810]/12" />
              <div className="absolute inset-0 opacity-30 mix-blend-screen bg-[radial-gradient(ellipse_at_60%_40%,rgba(30,100,220,0.35),transparent_65%)]" />
            </div>
          </motion.div>

          {/* Single floating metric card — overlaps image naturally */}
          <motion.div
            initial={{ opacity: 0, x: -14, scale: 0.93 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.75, ease: EASE }}
            whileHover={{ y: -3, scale: 1.02, transition: { duration: 0.2 } }}
            className="hidden lg:block absolute -left-7 bottom-8 w-[148px] rounded-2xl border border-white/[0.09] bg-[#071b38]/96 p-3.5 shadow-[0_16px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.07)] ring-1 ring-white/[0.03] backdrop-blur-2xl pointer-events-none z-20"
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(0,102,255,0.14),transparent_55%)]" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[7.5px] font-semibold tracking-[0.14em] text-white/40 uppercase">ROAS Delivered</span>
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded bg-emerald-500/10 text-emerald-400 text-[9px]">↑</span>
              </div>
              <p className="font-heading text-[1.5rem] font-bold leading-none text-white">3.21X</p>
              <p className="text-[7px] text-white/44 leading-relaxed mt-1">On D2C campaigns</p>
              <div className="mt-2.5 h-[2.5px] overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#2E6EE0] to-[#90B8FF]"
                  initial={{ width: "0%" }}
                  animate={{ width: "76%" }}
                  transition={{ duration: 1.4, delay: 0.8, ease: EASE }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
