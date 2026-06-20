"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Target, Compass, Award, Quote, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CaseStudy, getRelatedCaseStudies } from "@/data/case-studies-data";

const EASE = [0.22, 1, 0.36, 1] as const;

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedStat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setVisible(true), prefersReducedMotion ? 0 : delay * 1000);
      return () => clearTimeout(t);
    }
  }, [isInView, delay, prefersReducedMotion]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE }}
      className="rounded-2xl border border-white/[0.09] bg-[linear-gradient(160deg,rgba(13,44,87,0.40),rgba(7,18,38,0.55))] p-6 text-center backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
    >
      <p className="font-heading text-4xl font-bold text-[#70A8FF] md:text-5xl tabular-nums leading-none">
        {value}
      </p>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
        {label}
      </p>
    </motion.div>
  );
}

// ── Category badge colours ────────────────────────────────────────────────────
const CATEGORY_STYLES: Record<string, string> = {
  "AI SEO": "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
  "Google Ads": "border-sky-400/30 bg-sky-500/10 text-sky-200",
  "Meta Ads": "border-indigo-400/30 bg-indigo-500/10 text-indigo-200",
  "Social Media": "border-violet-400/30 bg-violet-500/10 text-violet-200",
  "Website Development": "border-blue-400/30 bg-blue-500/10 text-blue-200",
};

// ── Section heading ───────────────────────────────────────────────────────────
function SectionHeading({
  icon,
  label,
  iconColor,
}: {
  icon: React.ReactNode;
  label: string;
  iconColor: string;
}) {
  return (
    <div className={`mb-5 flex items-center gap-2.5 ${iconColor}`}>
      {icon}
      <h2 className="font-heading text-lg font-bold uppercase tracking-widest text-white">
        {label}
      </h2>
    </div>
  );
}

// ── Main template ─────────────────────────────────────────────────────────────
export function CaseStudyTemplate({ study }: { study: CaseStudy }) {
  const related = getRelatedCaseStudies(study.related);
  const badgeClass = CATEGORY_STYLES[study.category] ?? "border-white/20 bg-white/5 text-white/70";

  return (
    <div className="relative isolate min-h-screen bg-[#020617] text-white overflow-x-hidden">

      {/* ── Background ambience ── */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-600/6 blur-[140px]" />
        <div className="absolute bottom-[20%] left-0 h-[500px] w-[500px] rounded-full bg-indigo-600/5 blur-[120px]" />
      </div>

      {/* ── Hero ── */}
      <section className="relative w-full overflow-hidden pt-[100px] pb-16 md:pt-[130px] md:pb-20">
        {/* Hero image with overlay */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={study.heroImage}
            alt={study.title}
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-[#020617]/80 to-[#020617]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/70 via-transparent to-[#020617]/70" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">

          {/* Back + breadcrumb */}
          <nav className="mb-10 flex items-center gap-2 text-[11px] font-medium text-white/40 tracking-wider">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 hover:text-white/70 transition-colors"
            >
              <ChevronLeft size={13} />
              Portfolio
            </Link>
            <span>/</span>
            <span className="text-white/60">{study.client}</span>
          </nav>

          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <span
              className={`inline-flex items-center rounded-full border px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md ${badgeClass}`}
            >
              {study.category} · Case Study
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
            className="mt-6 font-heading text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]"
          >
            {study.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
            className="mt-5 max-w-2xl text-base leading-[1.75] text-white/60 md:text-lg"
          >
            {study.description}
          </motion.p>

          {/* Key stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3"
          >
            {study.stats.map((stat, i) => (
              <AnimatedStat key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Showcase image ── */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
        >
          {/* Hover glow */}
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,102,255,0.08),transparent_70%)]" />
          <div className="relative aspect-[16/9] w-full bg-[#081220]">
            <Image
              src={study.heroImage}
              alt={study.client}
              fill
              className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02] md:p-6"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>
        </motion.div>

        {/* Thumbnail gallery */}
        {study.images.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {study.images.slice(1).map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                whileHover={{ scale: 1.04, y: -3 }}
                className="relative aspect-[16/10] w-36 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-[#081220] cursor-pointer shadow-md md:w-44"
              >
                <Image src={img.src} alt={img.alt} fill className="object-contain p-2" sizes="160px" />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ── Overview strip ── */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grid grid-cols-2 gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7 backdrop-blur-md sm:grid-cols-4 md:p-8"
        >
          {[
            { label: "Client", value: study.client },
            { label: "Industry", value: study.industry },
            { label: "Location", value: study.location },
            { label: "Services", value: study.services.slice(0, 2).join(", ") + (study.services.length > 2 ? " +" + (study.services.length - 2) + " more" : "") },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#70A8FF]">{item.label}</p>
              <p className="mt-1.5 text-sm font-semibold text-white leading-snug">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Challenge / Strategy / Execution ── */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14">

          {/* Left — narrative */}
          <div className="space-y-12">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 backdrop-blur-sm"
            >
              <SectionHeading
                icon={<Target size={17} />}
                label="The Challenge"
                iconColor="text-rose-400"
              />
              <p className="text-[0.9375rem] leading-[1.8] text-white/65">{study.challenge}</p>
            </motion.div>

            {/* Strategy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 backdrop-blur-sm"
            >
              <SectionHeading
                icon={<Compass size={17} />}
                label="The Strategy"
                iconColor="text-[#70A8FF]"
              />
              <p className="text-[0.9375rem] leading-[1.8] text-white/65">{study.strategy}</p>
            </motion.div>

            {/* Execution & Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 backdrop-blur-sm"
            >
              <SectionHeading
                icon={<Award size={17} />}
                label="Execution & Results"
                iconColor="text-amber-400"
              />
              <p className="text-[0.9375rem] leading-[1.8] text-white/65">{study.execution}</p>
              <div className="mt-5 h-px bg-gradient-to-r from-[#4D8EFF]/20 via-white/[0.06] to-transparent" />
              <p className="mt-5 text-[0.9375rem] leading-[1.8] text-white/65">{study.results}</p>
            </motion.div>
          </div>

          {/* Right — services + technologies */}
          <div className="space-y-8">
            {/* Services */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="rounded-2xl border border-white/[0.08] bg-[linear-gradient(160deg,rgba(13,44,87,0.38),rgba(7,18,38,0.52))] p-7 backdrop-blur-md"
            >
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#70A8FF]">
                Services Provided
              </p>
              <ul className="space-y-3">
                {study.services.map((svc) => (
                  <li key={svc} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#70A8FF] shadow-[0_0_8px_rgba(112,168,255,0.7)]" />
                    <span className="text-sm text-white/72">{svc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
              className="rounded-2xl border border-white/[0.08] bg-[linear-gradient(160deg,rgba(13,44,87,0.38),rgba(7,18,38,0.52))] p-7 backdrop-blur-md"
            >
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#70A8FF]">
                Technologies & Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {study.technologies.map((tech) => (
                  <span
                    key={tech.label}
                    className="inline-flex items-center rounded-xl border border-[#4D8EFF]/20 bg-[#0066FF]/10 px-3.5 py-1.5 text-[11px] font-semibold text-[#9CC0FF] backdrop-blur-sm"
                  >
                    {tech.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Quick stats (repeat) */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
              className="grid gap-3"
            >
              {study.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-5 py-4"
                >
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">
                    {stat.label}
                  </span>
                  <span className="font-heading text-lg font-bold text-[#70A8FF] tabular-nums">
                    {stat.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      {study.testimonial && (
        <section className="mx-auto w-full max-w-6xl px-6 pb-20 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative overflow-hidden rounded-[2rem] border border-[#4D8EFF]/15 p-10 md:p-14"
            style={{
              background: "linear-gradient(140deg, rgba(0,30,80,0.55) 0%, rgba(2,6,23,0.85) 50%, rgba(0,20,70,0.50) 100%)",
              boxShadow: "0 0 0 1px rgba(77,142,255,0.10), 0 24px 72px rgba(0,0,0,0.38)",
            }}
          >
            {/* Ambient top glow */}
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-48 w-80 rounded-full bg-[#0066FF]/10 blur-3xl" />

            <Quote size={40} className="mb-6 text-[#4D8EFF]/40" aria-hidden />
            <blockquote className="relative font-heading text-xl font-semibold leading-[1.55] text-white/88 md:text-2xl">
              &ldquo;{study.testimonial.quote}&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0066FF] to-[#1552B6] flex items-center justify-center text-sm font-bold text-white select-none">
                {study.testimonial.author[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{study.testimonial.author}</p>
                <p className="text-[11px] text-white/50">{study.testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ── Related Case Studies ── */}
      {related.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 pb-20 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Related Case Studies
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                  whileHover={{ y: -5 }}
                >
                  <Link
                    href={`/case-studies/${rel.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-md shadow-[0_8px_28px_rgba(0,0,0,0.22)] transition-[border-color,box-shadow] duration-300 hover:border-[#4D8EFF]/22 hover:shadow-[0_16px_44px_rgba(0,0,0,0.32)]"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#081220]">
                      <Image
                        src={rel.heroImage}
                        alt={rel.client}
                        fill
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                      <div>
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md ${CATEGORY_STYLES[rel.category] ?? "border-white/20 bg-white/5 text-white/70"}`}
                        >
                          {rel.category}
                        </span>
                        <h3 className="mt-3 font-heading text-[0.95rem] font-bold leading-snug text-white group-hover:text-[#70A8FF] transition-colors duration-300">
                          {rel.client}
                        </h3>
                        <p className="mt-2 text-[0.8rem] leading-[1.65] text-white/45 line-clamp-2">
                          {rel.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-[0.8rem] font-semibold text-[#5A9FFF] transition-colors duration-300 group-hover:text-[#9CC0FF]">
                        View Case Study
                        <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="relative overflow-hidden rounded-[2rem] p-10 text-center md:p-16"
          style={{
            background: "linear-gradient(140deg, rgba(0,30,80,0.60) 0%, rgba(2,6,23,0.90) 50%, rgba(0,20,70,0.60) 100%)",
            boxShadow: "0 0 0 1px rgba(77,142,255,0.14), 0 28px 72px rgba(0,0,0,0.40)",
          }}
        >
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-52 w-96 rounded-full bg-[#0066FF]/12 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4D8EFF]/25 bg-[#0066FF]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9CC0FF]">
              Ready to grow?
            </span>
            <h2 className="mt-5 font-heading text-2xl font-bold leading-[1.2] tracking-[-0.02em] text-white sm:text-3xl md:text-[2.25rem]">
              Want similar results for your brand?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[0.9375rem] leading-[1.75] text-white/50">
              Join 50+ growth-focused companies that trust Uptrix to run their digital acquisition engine.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="shine-sweep group/btn inline-flex items-center gap-2.5 rounded-xl border border-[#4D8EFF]/70 bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-8 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_10px_28px_rgba(0,102,255,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,102,255,0.46)]"
              >
                Book Free Consultation
                <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-7 py-3.5 font-heading text-sm font-semibold text-white/80 transition-all duration-300 hover:bg-white/[0.08] hover:text-white"
              >
                View All Case Studies
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
