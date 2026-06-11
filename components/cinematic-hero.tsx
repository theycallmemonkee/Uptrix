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

  const glowX = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(smoothY, [0, 1], ["10%", "75%"]);
  const glowBackground = useMotionTemplate`radial-gradient(600px circle at ${glowX} ${glowY}, rgba(0, 102, 255, 0.18), transparent 60%)`;

  const parallaxX = useTransform(smoothX, [0, 1], [-10, 10]);
  const parallaxY = useTransform(smoothY, [0, 1], [-8, 9]);
  const rotateCard = useTransform(smoothX, [0, 1], [-3, 3]);

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
      className="relative flex w-full flex-col overflow-hidden justify-center min-h-[85vh] lg:h-[88vh] lg:min-h-[620px] lg:max-h-[820px] pt-28 pb-10"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
    >
      {/* Mouse-reactive glow */}
      <motion.div className="pointer-events-none absolute inset-0 -z-10" style={{ background: glowBackground }} />

      {/* Animated moving grid */}
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_85%)]">
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
      <p className="pointer-events-none absolute left-1/2 top-[52%] -z-20 -translate-x-1/2 -translate-y-1/2 text-center font-heading text-[15vw] leading-none font-bold tracking-[0.22em] text-white/[0.02] blur-[0.2px] md:text-[9.5rem]">
        UPTRIX
      </p>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
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
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#79ABFF]/20 bg-[#0C2C57]/42 px-3.5 py-1 text-xs tracking-[0.2em] text-[#CFE3FF]/85 uppercase backdrop-blur-md"
          >
            <Sparkles size={11} className="text-[#79ABFF]" />
            AI-Powered Digital Marketing
          </motion.div>

          {/* Headline - Clamp style with max 3 lines */}
          <motion.h1
            custom={0.08}
            variants={textVariants}
            className="font-heading text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-5xl md:text-[clamp(56px,5vw,78px)]"
          >
            Let&apos;s Amplify Your Brand&apos;s{" "}
            <motion.span
              className="relative inline-flex items-center rounded-2xl border border-[#87B4FF]/30 bg-[#7CB0FF]/12 px-3 py-1 text-[#D8E8FF] shadow-[0_8px_24px_rgba(0,102,255,0.18)]"
              animate={{ boxShadow: ["0 8px 24px rgba(0,102,255,0.18)", "0 10px 36px rgba(0,102,255,0.3)", "0 8px 24px rgba(0,102,255,0.18)"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: EASE }}
            >
              Success
            </motion.span>
          </motion.h1>

          <motion.p
            custom={0.16}
            variants={textVariants}
            className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 mx-auto lg:mx-0"
          >
            Discover Your Brand&apos;s Digital Journey With Our Digital Marketing Experts!
          </motion.p>

          {/* CTAs */}
          <motion.div custom={0.24} variants={textVariants} className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Link
              href="/contact"
              scroll
              className="shine-sweep will-gpu group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-5 py-3 font-heading text-xs font-semibold text-white shadow-[0_12px_32px_rgba(0,102,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#86B6FF] hover:shadow-[0_16px_40px_rgba(0,102,255,0.38)]"
            >
              Book Free Consultation
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 font-heading text-xs font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white hover:-translate-y-0.5"
            >
              Our Story
              <ArrowUpRight size={13} className="opacity-50 transition-transform duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div custom={0.32} variants={textVariants} className="mt-8 flex items-center justify-center lg:justify-start gap-5">
            <div className="flex items-center">
              {AVATARS.map((src, index) => (
                <span
                  key={src}
                  className="-ml-2 first:ml-0 inline-block h-9.5 w-9.5 overflow-hidden rounded-full border-2 border-[#0B1F3A] shadow-md"
                >
                  <span
                    className="block h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${src})`, zIndex: AVATARS.length - index }}
                  />
                </span>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3 w-3 fill-[#FFBA00]" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs leading-normal text-white/65">
                Trusted by 120+ high-performance brands
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Showcase Panel & Floating Card */}
        <motion.div
          className="relative mx-auto w-full max-w-md pb-4 lg:justify-self-end mt-10 lg:mt-0"
          style={{ x: parallaxX, y: parallaxY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          <motion.article
            className="relative overflow-hidden rounded-[1.8rem] border border-white/14 bg-white/[0.06] p-3 shadow-[0_24px_70px_rgba(3,9,21,0.55)] backdrop-blur-xl"
            style={{ rotate: rotateCard }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.8, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
          >
            {/* Animated border overlay */}
            <motion.div
              className="pointer-events-none absolute -inset-[1px] rounded-[1.8rem] opacity-40"
              animate={{ opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 4, repeat: Infinity, ease: EASE }}
              style={{ background: "linear-gradient(120deg, rgba(0,102,255,0.2), rgba(255,255,255,0.03), rgba(0,102,255,0.18))" }}
            />
            <div
              className="h-[17.5rem] w-full rounded-[1.2rem] bg-cover bg-center transition-transform duration-700 hover:scale-[1.015]"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80)",
              }}
            />
            <div className="pointer-events-none absolute inset-3 rounded-[1.2rem] bg-gradient-to-t from-[#071022]/80 via-transparent to-transparent" />
          </motion.article>

          {/* Performance Card - Kept inside bounds & scaled by 15-20% */}
          <motion.article
            className="absolute -left-6 top-8 w-44 overflow-hidden rounded-2xl border border-[#6EA6FF]/25 bg-[linear-gradient(155deg,rgba(18,43,82,0.9),rgba(8,21,43,0.78))] p-4 shadow-[0_12px_32px_rgba(2,9,22,0.45),0_4px_14px_rgba(0,102,255,0.1)] ring-1 ring-inset ring-white/6 backdrop-blur-2xl sm:w-50"
            style={{ x: useTransform(parallaxX, (v) => v * -0.6), y: useTransform(parallaxY, (v) => v * 0.5) }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ y: -3, scale: 1.015 }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_12%,rgba(255,255,255,0.1),transparent_48%),radial-gradient(circle_at_82%_14%,rgba(0,102,255,0.18),transparent_46%)]" />
            <div className="relative z-10">
              <p className="text-[9px] font-semibold tracking-wider text-[#A8C9FF]/75 uppercase">
                Performance Lift
              </p>
              <motion.p
                className="mt-1 font-heading text-[1.65rem] leading-none font-bold tracking-tight text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                +217%
              </motion.p>
              <p className="mt-1 max-w-[9rem] text-[10px] leading-relaxed text-white/55">
                Average ROI growth in the first 90 days
              </p>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
