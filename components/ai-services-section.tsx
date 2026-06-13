"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

export function AiServicesSection() {
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
      className="relative z-10 w-full px-6 pb-24 pt-8 md:px-10 md:pb-32"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <motion.div
          className="relative max-w-xl"
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
            Intelligent Growth Engine
          </motion.p>
          <motion.h2
            className="mt-5 font-heading text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            AI-Powered Digital Marketing Services
          </motion.h2>
          <motion.p
            className="mt-6 text-base leading-8 text-white/72 md:text-lg"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
              From AI SEO intelligence and PPC automation to full-funnel performance systems, we build precision
            marketing infrastructure designed for sustainable enterprise-scale growth.
          </motion.p>

          <motion.div
            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-[#5E99FF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-5 py-3 font-heading text-sm font-medium text-white shadow-[0_12px_30px_rgba(0,102,255,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#86B6FF]"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/contact" scroll className="inline-flex items-center gap-2">
              Explore Services
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-2xl"
          style={{ x: parallaxX, y: parallaxY }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem]" style={{ background: localLight }} />

          <motion.article
            className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/[0.06] p-4 shadow-[0_28px_90px_rgba(2,9,22,0.56)] ring-1 ring-inset ring-white/10 backdrop-blur-2xl"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
          >
            <div className="relative h-[21rem] w-full overflow-hidden rounded-[1.35rem]">
              <Image
                src="https://images.unsplash.com/photo-1553484771-cc0d9b8c2b33?auto=format&fit=crop&w=1400&q=80"
                alt="AI-Powered Marketing Solutions Showcase"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-4 rounded-[1.35rem] bg-gradient-to-t from-[#061124]/78 via-transparent to-transparent" />
          </motion.article>

          <motion.article
            className="absolute -left-6 top-8 w-56 rounded-2xl border border-[#7AAEFF]/26 bg-[linear-gradient(155deg,rgba(17,42,79,0.84),rgba(8,19,39,0.72))] p-5 shadow-[0_18px_45px_rgba(2,9,22,0.52)] ring-1 ring-inset ring-white/10 backdrop-blur-2xl sm:w-64"
            style={{ x: useTransform(parallaxX, (v) => v * -0.7), y: useTransform(parallaxY, (v) => v * 0.65) }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[10px] font-medium tracking-[0.2em] text-[#A9C9FF]/78 uppercase">15+ Years Experience</p>
            <p className="mt-2 font-heading text-2xl font-semibold tracking-tight text-white">Proven Growth Systems</p>
            <p className="mt-2 text-xs leading-5 text-white/66">Strategic execution built from a decade-plus of real campaign outcomes.</p>
          </motion.article>

          <motion.article
            className="absolute -bottom-7 -right-6 w-60 rounded-2xl border border-[#7AAEFF]/26 bg-[linear-gradient(160deg,rgba(16,40,76,0.88),rgba(7,18,38,0.76))] p-5 shadow-[0_22px_55px_rgba(2,9,22,0.56)] ring-1 ring-inset ring-white/10 backdrop-blur-2xl sm:w-72"
            style={{ x: useTransform(parallaxX, (v) => v * 0.78), y: useTransform(parallaxY, (v) => v * -0.7) }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[10px] font-medium tracking-[0.2em] text-[#A9C9FF]/78 uppercase">Success Our Priority</p>
            <p className="mt-2 font-heading text-2xl font-semibold tracking-tight text-white">Outcome-Led Execution</p>
            <p className="mt-2 text-xs leading-5 text-white/66">
              Every sprint aligns technology, data, and media buying with measurable growth KPIs.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
