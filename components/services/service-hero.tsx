"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect } from "react";
import type { ServiceConfig } from "@/data/services";

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_LINEAR = [0, 0, 1, 1] as const;

type Props = {
  service: ServiceConfig;
};

function highlightHeadline(headline: string, keyword: string, easeFunc: any) {
  if (!headline.includes(keyword)) return headline;
  const [prefix, suffix] = headline.split(keyword);
  return (
    <>
      {prefix}
      <motion.span
        className="relative inline-flex items-center rounded-2xl border border-[#87B4FF]/30 bg-[#7CB0FF]/12 px-3 py-1 text-[#D8E8FF] shadow-[0_8px_24px_rgba(0,102,255,0.18)]"
        animate={{ boxShadow: ["0 8px 24px rgba(0,102,255,0.18)", "0 10px 36px rgba(0,102,255,0.3)", "0 8px 24px rgba(0,102,255,0.18)"] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: easeFunc }}
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

  useEffect(() => {
    if (!service.heroVisuals) return;

    if (service.slug === "ai-ugc-video-ads" || service.slug === "business-automation") {
      console.log(
        "[service-hero] hero images",
        service.slug,
        {
          dashboardImage: service.heroVisuals.dashboardImage,
          chartImage: service.heroVisuals.chartImage,
          workspaceImage: service.heroVisuals.workspaceImage,
        }
      );
    }
  }, [
    service.slug,
    service.heroVisuals,
  ]);

  return (
    <section
      className="relative z-[1] flex w-full flex-col overflow-hidden justify-center min-h-[85vh] lg:h-[88vh] lg:min-h-[620px] lg:max-h-[820px] pt-28 pb-10"
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
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } }
            }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#79ABFF]/20 bg-[#0C2C57]/42 px-3.5 py-1 text-xs tracking-[0.2em] text-[#CFE3FF]/85 uppercase backdrop-blur-md"
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
            className="font-heading text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-5xl md:text-[clamp(56px,5vw,78px)]"
          >
            {highlightHeadline(service.headline, service.highlightedKeyword, EASE)}
          </motion.h1>

          <motion.p
            custom={0.16}
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, delay: 0.16, ease: EASE } }
            }}
            className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 mx-auto lg:mx-0"
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
            className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4"
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
            <div className="relative h-[17.5rem] w-full overflow-hidden rounded-[1.2rem] transition-transform duration-700 hover:scale-[1.015]">
              <Image
                src={service.heroVisuals.dashboardImage}
                alt={`${service.name} Performance Showcase`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <div className="pointer-events-none absolute inset-3 rounded-[1.2rem] bg-gradient-to-t from-[#071022]/80 via-transparent to-transparent" />
          </motion.article>

          {/* Floating Metric Card 1 */}
          {service.heroMetrics?.[0] && (
            <motion.article
              className="absolute -left-6 top-8 w-44 overflow-hidden rounded-2xl border border-[#6EA6FF]/25 bg-[linear-gradient(155deg,rgba(18,43,82,0.9),rgba(8,21,43,0.78))] p-4 shadow-[0_12px_32px_rgba(2,9,22,0.45),0_4px_14px_rgba(0,102,255,0.1)] ring-1 ring-inset ring-white/6 backdrop-blur-2xl sm:w-50 z-20 pointer-events-none"
              style={{ x: useTransform(parallaxX, (v) => v * -0.6), y: useTransform(parallaxY, (v) => v * 0.5) }}
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
              className="absolute -right-6 bottom-8 w-44 overflow-hidden rounded-2xl border border-[#6EA6FF]/25 bg-[linear-gradient(155deg,rgba(18,43,82,0.9),rgba(8,21,43,0.78))] p-4 shadow-[0_12px_32px_rgba(2,9,22,0.45),0_4px_14px_rgba(0,102,255,0.1)] ring-1 ring-inset ring-white/6 backdrop-blur-2xl sm:w-50 z-20 pointer-events-none"
              style={{ x: useTransform(parallaxX, (v) => v * 0.6), y: useTransform(parallaxY, (v) => v * -0.5) }}
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
