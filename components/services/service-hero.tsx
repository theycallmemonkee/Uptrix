"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import type { ServiceConfig } from "@/data/services";

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_LINEAR = [0, 0, 1, 1] as const;

type Props = {
  service: ServiceConfig;
};

function highlightHeadline(headline: string, keyword: string) {
  if (!headline.includes(keyword)) return headline;
  const [prefix, suffix] = headline.split(keyword);
  return (
    <>
      {prefix}
      <motion.span
        className="relative inline text-[#D8E8FF] [text-shadow:0_0_34px_rgba(0,102,255,0.32)]"
        animate={{ opacity: [0.92, 1, 0.92] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: EASE }}
      >
        {keyword}
      </motion.span>
      {suffix}
    </>
  );
}

export function ServiceHero({ service }: Props) {
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
  const firstMetricX = useTransform(parallaxX, (v) => v * -0.6);
  const firstMetricY = useTransform(parallaxY, (v) => v * 0.5);
  const secondMetricX = useTransform(parallaxX, (v) => v * 0.6);
  const secondMetricY = useTransform(parallaxY, (v) => v * -0.5);

  return (
    <section
      className="relative z-[1] flex w-full flex-col overflow-hidden justify-center min-h-[86vh] lg:h-[90vh] lg:min-h-[640px] lg:max-h-[860px] pt-28 pb-14"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
    >
      {/* Mouse-reactive glow */}
      <motion.div className="pointer-events-none absolute inset-0 -z-10" style={{ background: glowBackground }} />

      {/* Animated moving grid */}
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_85%)]">
        <motion.div
          className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px]"
          animate={{ backgroundPosition: ["0px 0px", "70px 70px"] }}
          transition={{ duration: 24, repeat: Infinity, ease: EASE_LINEAR }}
        />
      </div>

      <p className="pointer-events-none absolute left-1/2 top-[51%] -z-20 -translate-x-1/2 -translate-y-1/2 text-center font-heading text-[16vw] leading-none font-bold tracking-[0.22em] text-white/[0.018] blur-[0.2px] md:text-[10rem]">
        UPTRIX
      </p>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 md:px-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(390px,0.98fr)] xl:gap-16">
        <motion.div
          className="relative max-w-[46rem] text-center lg:text-left"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Eyebrow badge */}
          <motion.div
            custom={0}
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } }
            }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#79ABFF]/20 bg-[#0C2C57]/42 px-3.5 py-1 text-xs tracking-[0.18em] text-[#CFE3FF]/85 uppercase backdrop-blur-md"
          >
            <Sparkles size={11} className="text-[#79ABFF]" />
            Uptrix {service.shortLabel} Systems
          </motion.div>

          {/* Headline - Match homepage style, max 3 lines */}
          <motion.h1
            custom={0.08}
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, delay: 0.08, ease: EASE } }
            }}
            className="font-heading text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] font-extrabold tracking-[-0.025em] text-white"
          >
            {highlightHeadline(service.headline, service.highlightedKeyword)}
          </motion.h1>

          <motion.p
            custom={0.16}
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, delay: 0.16, ease: EASE } }
            }}
            className="mx-auto mt-5 max-w-[520px] text-[0.9375rem] leading-[1.8] text-white/68 lg:mx-0"
          >
            {service.heroDescription}
          </motion.p>

          {/* CTA Section - Double buttons aligned and visible above the fold */}
          <motion.div
            custom={0.24}
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, delay: 0.24, ease: EASE } }
            }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Link
              href="/contact"
              scroll
              className="shine-sweep will-gpu group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-5 py-3 font-heading text-xs font-semibold text-white shadow-[0_12px_32px_rgba(0,102,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#86B6FF] hover:shadow-[0_16px_40px_rgba(0,102,255,0.38)]"
            >
              {service.ctaLabel}
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 font-heading text-xs font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white hover:-translate-y-0.5"
            >
              View Portfolio
              <ArrowUpRight size={13} className="opacity-50 transition-transform duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {service.whyBullets?.length > 0 && (
            <motion.div
              custom={0.32}
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, delay: 0.32, ease: EASE } }
              }}
              className="mx-auto mt-7 grid gap-2.5 text-left sm:grid-cols-3 lg:mx-0"
            >
              {service.whyBullets.slice(0, 3).map((bullet) => (
                <div
                  key={bullet}
                  className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-[1.65] text-white/68 backdrop-blur-md"
                >
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#8CB9FF]" />
                  <span>{bullet}</span>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Right Side: Showcase Panel & Floating Card */}
        <motion.div
          className="relative mx-auto mt-8 w-full max-w-[31rem] pb-4 lg:mt-0 lg:justify-self-end"
          style={{ x: parallaxX, y: parallaxY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          <motion.article
            className="relative overflow-hidden rounded-[1.5rem] border border-white/14 bg-white/[0.055] p-3 shadow-[0_24px_70px_rgba(3,9,21,0.46)] backdrop-blur-xl"
            style={{ rotate: rotateCard }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.8, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
          >
            {/* Animated border overlay */}
            <motion.div
              className="pointer-events-none absolute -inset-[1px] rounded-[1.5rem] opacity-30"
              animate={{ opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 4, repeat: Infinity, ease: EASE }}
              style={{ background: "linear-gradient(120deg, rgba(0,102,255,0.2), rgba(255,255,255,0.03), rgba(0,102,255,0.18))" }}
            />
            <div className="relative h-[20rem] w-full overflow-hidden rounded-[1rem] transition-transform duration-700 hover:scale-[1.012] sm:h-[23rem] lg:h-[25rem]">
              <Image
                src={service.heroVisuals.dashboardImage}
                alt={`${service.name} Performance Showcase`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <div className="pointer-events-none absolute inset-3 rounded-[1rem] bg-gradient-to-t from-[#071022]/80 via-transparent to-transparent" />
          </motion.article>

          {/* Floating Metric Card 1 */}
          {service.heroMetrics?.[0] && (
            <motion.article
              className="absolute left-3 top-4 z-20 w-40 overflow-hidden rounded-2xl border border-[#6EA6FF]/22 bg-[linear-gradient(155deg,rgba(18,43,82,0.86),rgba(8,21,43,0.72))] p-4 shadow-[0_12px_32px_rgba(2,9,22,0.38)] ring-1 ring-inset ring-white/6 backdrop-blur-2xl pointer-events-none sm:-left-5 sm:top-8 sm:w-44"
              style={{ x: firstMetricX, y: firstMetricY }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ y: -3, scale: 1.015 }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_12%,rgba(255,255,255,0.1),transparent_48%),radial-gradient(circle_at_82%_14%,rgba(0,102,255,0.18),transparent_46%)]" />
              <div className="relative z-10 leading-snug">
                <p className="text-[9px] font-semibold tracking-wider text-[#A8C9FF]/75 uppercase">
                  {service.heroMetrics[0].label}
                </p>
                <p className="mt-1 font-heading text-xl font-bold text-white leading-none">
                  {service.heroMetrics[0].value}
                </p>
              </div>
            </motion.article>
          )}

          {/* Floating Metric Card 2 */}
          {service.heroMetrics?.[1] && (
            <motion.article
              className="absolute bottom-5 right-3 z-20 w-40 overflow-hidden rounded-2xl border border-[#6EA6FF]/22 bg-[linear-gradient(155deg,rgba(18,43,82,0.86),rgba(8,21,43,0.72))] p-4 shadow-[0_12px_32px_rgba(2,9,22,0.38)] ring-1 ring-inset ring-white/6 backdrop-blur-2xl pointer-events-none sm:-right-5 sm:bottom-8 sm:w-44"
              style={{ x: secondMetricX, y: secondMetricY }}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              whileHover={{ y: -3, scale: 1.015 }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_12%,rgba(255,255,255,0.1),transparent_48%),radial-gradient(circle_at_82%_14%,rgba(0,102,255,0.18),transparent_46%)]" />
              <div className="relative z-10 leading-snug">
                <p className="text-[9px] font-semibold tracking-wider text-[#A8C9FF]/75 uppercase">
                  {service.heroMetrics[1].label}
                </p>
                <p className="mt-1 font-heading text-xl font-bold text-white leading-none">
                  {service.heroMetrics[1].value}
                </p>
              </div>
            </motion.article>
          )}
        </motion.div>
      </div>
    </section>
  );
}
