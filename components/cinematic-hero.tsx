"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
];

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_LINEAR = [0, 0, 1, 1] as const;

export function CinematicHero() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.4);

  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 20, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 20, mass: 0.7 });

  const glowX = useTransform(smoothX, [0, 1], ["8%", "92%"]);
  const glowY = useTransform(smoothY, [0, 1], ["8%", "78%"]);
  const glowBackground = useMotionTemplate`radial-gradient(680px circle at ${glowX} ${glowY}, rgba(0, 102, 255, 0.22), transparent 62%)`;

  const parallaxX = useTransform(smoothX, [0, 1], [-14, 14]);
  const parallaxY = useTransform(smoothY, [0, 1], [-10, 12]);
  const rotateCard = useTransform(smoothX, [0, 1], [-5, 5]);

  const textVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
      show: (delay = 0) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.78, delay, ease: EASE },
      }),
    }),
    [],
  );

  return (
    <section
      className="relative flex w-full flex-col overflow-hidden pb-20 pt-[100px] md:pb-28 md:pt-[120px] lg:pt-[160px]"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
    >
      {/* Mouse-reactive glow */}
      <motion.div className="pointer-events-none absolute inset-0 -z-10" style={{ background: glowBackground }} />

      {/* Animated moving grid */}
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_88%)]">
        <motion.div
          className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:70px_70px]"
          animate={{ backgroundPosition: ["0px 0px", "70px 70px"] }}
          transition={{ duration: 24, repeat: Infinity, ease: EASE_LINEAR }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="pointer-events-none absolute left-[8%] top-[22%] -z-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.28),transparent_68%)] blur-3xl"
        animate={{ y: [0, -24, 0], opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: EASE }}
      />
      <motion.div
        className="pointer-events-none absolute right-[10%] top-[30%] -z-20 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(120,168,255,0.22),transparent_65%)] blur-3xl"
        animate={{ y: [0, 18, 0], opacity: [0.3, 0.55, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: EASE, delay: 1.5 }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[15%] left-[38%] -z-20 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.18),transparent_65%)] blur-2xl"
        animate={{ y: [0, -12, 0], x: [0, 10, 0], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 11, repeat: Infinity, ease: EASE, delay: 3 }}
      />

      {/* UPTRIX watermark */}
      <p className="pointer-events-none absolute left-1/2 top-[46%] -z-20 -translate-x-1/2 -translate-y-1/2 text-center font-heading text-[16vw] leading-none font-bold tracking-[0.22em] text-white/[0.028] blur-[0.2px] md:top-[52%] md:text-[11rem]">
        UPTRIX
      </p>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div
          className="relative max-w-2xl"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Eyebrow badge */}
          <motion.div
            custom={0}
            variants={textVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#79ABFF]/28 bg-[#0C2C57]/42 px-4 py-1.5 text-xs tracking-[0.2em] text-[#CFE3FF]/85 uppercase backdrop-blur-md"
          >
            <Sparkles size={12} className="text-[#79ABFF]" />
            AI-Powered Digital Marketing
          </motion.div>

          <motion.h1
            custom={0.08}
            variants={textVariants}
            className="font-heading text-4xl leading-[1.08] font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Let&apos;s Amplify Your Brand&apos;s{" "}
            <motion.span
              className="relative inline-flex items-center rounded-2xl border border-[#87B4FF]/35 bg-[#7CB0FF]/16 px-4 py-1.5 text-[#D8E8FF] shadow-[0_8px_30px_rgba(0,102,255,0.22)]"
              animate={{ boxShadow: ["0 8px 30px rgba(0,102,255,0.22)", "0 12px 44px rgba(0,102,255,0.38)", "0 8px 30px rgba(0,102,255,0.22)"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: EASE }}
            >
              Success
            </motion.span>
          </motion.h1>

          <motion.p
            custom={0.18}
            variants={textVariants}
            className="mt-7 max-w-xl text-base leading-8 text-white/74 md:text-lg"
          >
            Discover Your Brand&apos;s Digital Journey With Our Digital Marketing Experts!
          </motion.p>

          {/* CTAs */}
          <motion.div custom={0.28} variants={textVariants} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              scroll
              className="shine-sweep will-gpu group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-6 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_16px_38px_rgba(0,102,255,0.36)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#86B6FF] hover:shadow-[0_20px_48px_rgba(0,102,255,0.48)]"
            >
              <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.22),transparent_52%)]" />
              Book Free Consultation
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/16 bg-white/[0.04] px-6 py-3.5 font-heading text-sm font-medium text-white/88 backdrop-blur-sm transition-all duration-300 hover:border-white/28 hover:bg-white/[0.07] hover:text-white hover:-translate-y-0.5"
            >
              Our Story
              <ArrowUpRight size={15} className="opacity-60 transition-transform duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div custom={0.36} variants={textVariants} className="mt-10 flex items-center gap-6">
            <div className="flex items-center">
              {AVATARS.map((src, index) => (
                <span
                  key={src}
                  className="-ml-2 first:ml-0 inline-block h-11 w-11 overflow-hidden rounded-full border-2 border-[#0B1F3A] shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
                >
                  <span
                    className="block h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${src})`, zIndex: AVATARS.length - index }}
                  />
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3.5 w-3.5 fill-[#FFBA00]" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-white/72">
                Trusted by 120+ high-performance brands
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-xl pb-4 lg:justify-self-end"
          style={{ x: parallaxX, y: parallaxY }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
        >
          <motion.article
            className="relative overflow-hidden rounded-[2rem] border border-white/18 bg-white/[0.07] p-4 shadow-[0_30px_90px_rgba(3,9,21,0.6)] backdrop-blur-xl"
            style={{ rotate: rotateCard }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.8, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
          >
            {/* Animated border overlay */}
            <motion.div
              className="pointer-events-none absolute -inset-[1px] rounded-[2rem] opacity-50"
              animate={{ opacity: [0.28, 0.52, 0.28] }}
              transition={{ duration: 4, repeat: Infinity, ease: EASE }}
              style={{ background: "linear-gradient(120deg, rgba(0,102,255,0.25), rgba(255,255,255,0.04), rgba(0,102,255,0.22))" }}
            />
            <div
              className="h-[21rem] w-full rounded-[1.35rem] bg-cover bg-center transition-transform duration-700 hover:scale-[1.02]"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80)",
              }}
            />
            <div className="pointer-events-none absolute inset-4 rounded-[1.35rem] bg-gradient-to-t from-[#071022]/80 via-transparent to-transparent" />
          </motion.article>

          {/* Performance card */}
          <motion.article
            className="absolute -left-8 top-8 w-52 overflow-hidden rounded-2xl border border-[#6EA6FF]/30 bg-[linear-gradient(155deg,rgba(18,43,82,0.86),rgba(8,21,43,0.72))] p-5 shadow-[0_18px_40px_rgba(2,9,22,0.52),0_4px_18px_rgba(0,102,255,0.12)] ring-1 ring-inset ring-white/8 backdrop-blur-2xl sm:w-60"
            style={{ x: useTransform(parallaxX, (v) => v * -0.65), y: useTransform(parallaxY, (v) => v * 0.55) }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.33 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_12%,rgba(255,255,255,0.14),transparent_48%),radial-gradient(circle_at_82%_14%,rgba(0,102,255,0.22),transparent_46%)]" />
            <div className="relative z-10">
              <p className="text-[10px] font-medium tracking-[0.22em] text-[#A8C9FF]/78 uppercase">
                Performance Lift
              </p>
              <motion.p
                className="mt-2 font-heading text-[2rem] leading-none font-semibold tracking-tight text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                +217%
              </motion.p>
              <p className="mt-2 max-w-[11rem] text-xs leading-5 text-white/62">
                Average ROI growth in the first 90 days
              </p>
            </div>
          </motion.article>

          {/* Testimonial card */}
          <motion.article
            className="absolute -right-6 -bottom-6 w-64 rounded-2xl border border-[#8BB7FF]/25 bg-[#0D2547]/85 p-5 shadow-[0_20px_60px_rgba(2,8,21,0.55)] backdrop-blur-xl sm:w-72"
            style={{ x: useTransform(parallaxX, (v) => v * 0.85), y: useTransform(parallaxY, (v) => v * -0.7) }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.42 }}
            whileHover={{ y: -4 }}
          >
            <p className="text-sm text-white/75">&quot;Uptrix transformed our acquisition pipeline with AI precision.&quot;</p>
            <p className="mt-4 font-heading text-sm font-semibold text-white">Aarav Singh</p>
            <p className="text-xs text-white/55">VP Growth, Altitude Labs</p>
            <Link
              href="/contact"
              scroll
              className="shine-sweep mt-5 inline-flex items-center gap-2 rounded-xl border border-[#5F9AFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-4 py-2.5 font-heading text-sm font-medium text-white shadow-[0_10px_26px_rgba(0,102,255,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,102,255,0.42)]"
            >
              Book Free Consultation
              <ArrowUpRight size={15} />
            </Link>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
