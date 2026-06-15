"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { SanityHomePage } from "@/lib/sanity";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface AiServicesSectionProps {
  data?: SanityHomePage | null
}

export function AiServicesSection({ data }: AiServicesSectionProps = {}) {
  const eyebrow = data?.aiSectionEyebrow ?? "WHY UPTRIX TECHNOLOGIES";
  const headline = data?.aiSectionHeadline ?? "We Build Growth Systems, Not Marketing Campaigns";
  const body = data?.aiSectionBody ?? "Most agencies run campaigns. A campaign stops the day you stop paying. We build systems, connected engines that compound over time, so your growth keeps building instead of resetting every month. One team handles the whole engine, accountable to one thing: your growth.";
  const ctaLabel = data?.aiSectionCtaLabel ?? "Why Uptrix Technologies";
  const ctaHref = data?.aiSectionCtaHref ?? "/about";
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 20, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 20, mass: 0.8 });

  const glowX = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(smoothY, [0, 1], ["10%", "85%"]);
  const localLight = useMotionTemplate`radial-gradient(560px circle at ${glowX} ${glowY}, rgba(0,102,255,0.16), transparent 65%)`;

  const parallaxX = useTransform(smoothX, [0, 1], [-14, 14]);
  const parallaxY = useTransform(smoothY, [0, 1], [-12, 12]);

  return (
    <section
      className="relative z-10 w-full overflow-hidden px-6 pb-24 pt-8 md:px-10 md:pb-32"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <motion.div
          className="relative max-w-xl text-center lg:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.p
            className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            className="mt-4 font-heading text-[clamp(1.75rem,3.5vw,3rem)] leading-tight font-semibold tracking-[-0.02em] text-white"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            {headline}
          </motion.h2>
          <motion.p
            className="mt-5 text-[0.9375rem] leading-[1.8] text-white/68"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            {body}
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center lg:justify-start"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={ctaHref}
              scroll
              className="shine-sweep group inline-flex items-center gap-2 rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-5 py-3 font-heading text-sm font-semibold text-white shadow-[0_12px_32px_rgba(0,102,255,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#86B6FF] hover:shadow-[0_16px_42px_rgba(0,102,255,0.42)]"
            >
              {ctaLabel}
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[540px] pb-16 md:pb-20"
          style={{ x: parallaxX, y: parallaxY }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem]" style={{ background: localLight }} />

          {/* Ambient glow */}
          <div className="pointer-events-none absolute -inset-8 -z-20 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.12),transparent_65%)] blur-3xl" />

          <motion.article
            className="relative overflow-hidden rounded-[1.75rem] border border-white/16 bg-white/[0.055] p-3 shadow-[0_28px_85px_rgba(2,9,22,0.54)] ring-1 ring-inset ring-white/10 backdrop-blur-2xl"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
          >
            <div className="relative h-[17rem] w-full overflow-hidden rounded-[1.2rem] md:h-[20rem]">
              <Image
                src="https://images.unsplash.com/photo-1553484771-cc0d9b8c2b33?auto=format&fit=crop&w=1400&q=80"
                alt="AI-Powered Marketing Solutions Showcase"
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-3 rounded-[1.2rem] bg-gradient-to-t from-[#061124]/78 via-transparent to-transparent" />
          </motion.article>

          {/* Top-left floating card */}
          <motion.article
            className="absolute -top-4 -left-4 hidden w-52 rounded-2xl border border-[#7AAEFF]/24 bg-[linear-gradient(155deg,rgba(17,42,79,0.88),rgba(8,19,39,0.78))] p-4 shadow-[0_18px_46px_rgba(2,9,22,0.54)] ring-1 ring-inset ring-white/8 backdrop-blur-2xl md:block md:w-56 lg:-left-8"
            style={{ x: useTransform(parallaxX, (v) => v * -0.65), y: useTransform(parallaxY, (v) => v * 0.6) }}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ y: -4, scale: 1.015 }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.08),transparent_50%)]" />
            <p className="font-heading text-base font-semibold tracking-tight text-white">Built From Real Experience</p>
            <p className="mt-2 text-xs leading-[1.65] text-white/62">Over $2.5M in ad spend managed across global markets, not theory or templates.</p>
          </motion.article>

          {/* Bottom-right floating card */}
          <motion.article
            className="absolute -bottom-10 -right-4 hidden w-52 rounded-2xl border border-[#7AAEFF]/24 bg-[linear-gradient(160deg,rgba(16,40,76,0.90),rgba(7,18,38,0.80))] p-4 shadow-[0_22px_56px_rgba(2,9,22,0.56)] ring-1 ring-inset ring-white/8 backdrop-blur-2xl md:block md:w-56 lg:-right-8"
            style={{ x: useTransform(parallaxX, (v) => v * 0.72), y: useTransform(parallaxY, (v) => v * -0.65) }}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ y: -4, scale: 1.015 }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(0,102,255,0.18),transparent_50%)]" />
            <p className="font-heading text-base font-semibold tracking-tight text-white">Outcome Led, Always</p>
            <p className="mt-2 text-xs leading-[1.65] text-white/62">
              Every system we build is judged on real business outcomes. Leads, customers, revenue. Not vanity metrics.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
