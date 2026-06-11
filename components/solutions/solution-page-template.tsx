"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ArrowUpRight,
  CheckCircle2, 
  ChevronRight, 
  XCircle,
  TrendingUp, 
  Target, 
  Globe, 
  Cpu, 
  Compass, 
  Sparkles, 
  Layers 
} from "lucide-react";
import { PremiumNavbar } from "@/components/premium-navbar";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { PremiumAccordion, type PremiumAccordionItem } from "@/components/ui/premium-accordion";
import { SOLUTIONS, SolutionConfig } from "@/data/solutions-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  TrendingUp,
  Target,
  Globe,
  Cpu,
  Compass,
  Sparkles,
  Layers,
};

type Props = {
  solution: SolutionConfig;
};

export function SolutionPageTemplate({ solution }: Props) {
  const IconComp = ICON_MAP[solution.iconName] || TrendingUp;
  
  // Find related solutions (excluding current)
  const relatedSolutions = SOLUTIONS.filter((s) => s.slug !== solution.slug).slice(0, 3);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#0B1F3A] text-white font-sans antialiased">
      {/* Background radial glows & grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(1200px circle at 15% 15%, rgba(0,102,255,0.22), transparent 55%), radial-gradient(900px circle at 85% 20%, rgba(74,143,255,0.12), transparent 60%), linear-gradient(180deg, #0B1F3A 0%, #091A33 60%, #071226 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <PremiumNavbar />

      <main className="relative z-10 flex flex-1 flex-col">
        {/* ============================================================
           HERO SECTION
           ============================================================ */}
        <section className="relative px-6 pt-[140px] pb-16 md:px-10 md:pt-[170px] md:pb-24">
          <div className="mx-auto max-w-6xl text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#8CB8FF]/20 bg-[#153B6A]/55 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#A8C9FF]"
            >
              <IconComp size={14} className="text-[#8CB8FF]" />
              <span>{solution.badge}</span>
            </motion.div>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
              className="mt-6 font-heading text-sm font-semibold tracking-[0.2em] text-[#9BC2FF] uppercase"
            >
              {solution.subtitle}
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
              className="mt-4 font-heading text-4xl font-semibold tracking-tight text-white md:text-6xl max-w-4xl mx-auto leading-tight md:leading-tight"
            >
              {solution.headline}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
              className="mt-6 max-w-2xl mx-auto text-base leading-relaxed text-white/72 md:text-lg"
            >
              {solution.heroDescription}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/contact"
                className="shine-sweep w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#1552B6] border border-[#4D8EFF] px-7 py-4 font-heading text-sm font-semibold text-white shadow-[0_16px_44px_rgba(0,102,255,0.36)] transition-all hover:border-[#7FAEFF] hover:shadow-[0_20px_54px_rgba(0,102,255,0.48)]"
              >
                Get Growth Roadmap
                <ArrowRight size={16} />
              </Link>
              <a
                href="#problems"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-heading text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10 hover:border-white/20"
              >
                Explore Solution
                <ChevronRight size={16} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
           PROBLEM SECTION
           ============================================================ */}
        <section id="problems" className="px-6 py-14 border-t border-white/[0.04] bg-[#091a33]/25 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease: EASE }}
              >
                <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
                  Market Friction
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-white md:text-5xl">
                  Is your business facing these growth bottlenecks?
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/70">
                  Most teams try to patch marketing bottlenecks with fragmented tools and ad-hoc tactics. We help you replace leaks with unified growth systems.
                </p>
              </motion.div>

              <div className="space-y-6">
                {solution.problems.map((problem, i) => (
                  <motion.div
                    key={problem.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1F3D]/65 p-6 shadow-md backdrop-blur-md"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/15">
                        <XCircle size={20} />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-white">
                          {problem.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-white/68">
                          {problem.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           OUR SYSTEM Section
           ============================================================ */}
        <section className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-6">
                {solution.systemSolutions.map((sys, i) => (
                  <motion.div
                    key={sys.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A234A]/60 p-6 shadow-md backdrop-blur-md"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0066FF]/20 text-[#8FB8FF] border border-[#0066FF]/35">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-white">
                          {sys.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-white/68">
                          {sys.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease: EASE }}
              >
                <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
                  Our System
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-white md:text-5xl">
                  Built to scale revenue by the numbers.
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/70">
                  Instead of manual tasks and messy databases, we deploy custom pipeline modules that connect traffic directly to closed won pipeline.
                </p>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#86B3FF] hover:text-white"
                  >
                    Discuss System Implementation
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================
           PROCESS TIMELINE
           ============================================================ */}
        <section className="px-6 py-14 border-t border-white/[0.04] bg-[#091a33]/15 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl mb-12">
              <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
                Methodology
              </p>
              <h2 className="mt-4 font-heading text-3xl font-semibold text-white md:text-5xl">
                Implementation Workflow
              </h2>
              <p className="mt-4 text-sm text-white/68">
                A highly structured 4-phase deployment playbook designed to transition operations without breaking existing marketing velocity.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {solution.processSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#081728]/70 p-6 shadow-[0_12px_36px_rgba(0,0,0,0.15)] backdrop-blur-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#5B8EFF]/30 bg-[#0B315F]/80 text-xs font-semibold text-[#D9E8FF] shadow-[0_8px_20px_rgba(0,102,255,0.12)]">
                    {step.step}
                  </div>
                  <h3 className="mt-5 font-heading text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-white/70">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           FEATURES SECTION
           ============================================================ */}
        <section className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl mb-12">
              <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
                System Core
              </p>
              <h2 className="mt-4 font-heading text-3xl font-semibold text-white md:text-5xl">
                What's included in the system
              </h2>
              <p className="mt-4 text-sm text-white/68">
                We bundle enterprise-grade technology and dedicated expertise to remove key operational constraints.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {solution.featureCards.map((feat, i) => (
                <motion.article
                  key={feat.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className="group relative overflow-hidden rounded-3xl border border-white/12 bg-[#0B1F3D]/80 shadow-[0_24px_65px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={feat.image}
                      alt={feat.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3D] via-transparent to-transparent" />
                  </div>
                  <div className="relative p-6">
                    <h3 className="font-heading text-lg font-semibold text-white transition-colors group-hover:text-[#A8C9FF]">
                      {feat.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-white/70">
                      {feat.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           ROI STATS & CASE STUDY
           ============================================================ */}
        <section className="px-6 py-14 border-t border-white/[0.04] bg-[#091a33]/15 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            {/* ROI Grid */}
            <div className="grid gap-6 sm:grid-cols-2 mb-16">
              {solution.roiStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className="rounded-3xl border border-white/10 bg-[#0A224D]/60 p-8 text-center backdrop-blur-md shadow-lg"
                >
                  <p className="font-heading text-5xl font-semibold text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm text-[#A8C9FF] font-medium tracking-wide uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Case Study Details */}
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative overflow-hidden rounded-3xl border border-white/14 bg-[#08192A]/85 p-8 shadow-xl backdrop-blur-2xl"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,180,255,0.12),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(0,102,255,0.1),transparent_50%)]" />
                <div className="relative z-10">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9BC2FF]">
                    Case Study
                  </span>
                  <h3 className="mt-3 font-heading text-2xl font-semibold text-white md:text-3xl">
                    {solution.caseStudy.title}
                  </h3>
                  <p className="mt-4 text-xs leading-relaxed text-white/70">
                    {solution.caseStudy.subtitle}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {solution.caseStudy.metrics.map((m) => (
                      <div key={m.label} className="rounded-2xl border border-white/[0.08] bg-[#0A264F]/80 p-4">
                        <p className="font-heading text-2xl font-semibold text-white">{m.value}</p>
                        <p className="mt-1 text-[10px] text-white/60 leading-tight">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <blockquote className="mt-6 border-l-2 border-[#8CB8FF]/40 bg-white/[0.02] p-4 text-xs italic text-white/80 rounded-r-xl">
                    “{solution.caseStudy.quote}”
                  </blockquote>
                  <p className="mt-3 text-xs font-semibold text-[#86B3FF]">
                    {solution.caseStudy.client}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="relative overflow-hidden rounded-3xl border border-white/12 shadow-xl aspect-[4/3]"
              >
                <Image
                  src={solution.caseStudy.image}
                  alt={solution.caseStudy.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================
           TESTIMONIALS SECTION
           ============================================================ */}
        <section className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
              Feedback
            </p>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-white md:text-5xl">
              Client Testimonials
            </h2>

            <div className="mt-12 space-y-6">
              {solution.testimonials.map((t, i) => (
                <motion.div
                  key={t.author}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B234A]/40 p-8 shadow-md backdrop-blur-md"
                >
                  <p className="font-heading text-lg italic text-white/90 leading-relaxed md:text-xl">
                    “{t.quote}”
                  </p>
                  <div className="mt-6">
                    <p className="font-heading text-sm font-semibold text-[#86B3FF]">
                      {t.author}
                    </p>
                    <p className="mt-1 text-xs text-white/50">
                      {t.role} • {t.company}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           FAQ SECTION
           ============================================================ */}
        <section className="px-6 py-14 border-t border-white/[0.04] bg-[#091a33]/15 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
                  Q&A
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold text-white md:text-5xl leading-tight">
                  Frequently Asked Questions
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/70">
                  Got questions about onboarding, tools integrations, and roadmap delivery? We've compiled responses to our most common client queries.
                </p>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#86B3FF] hover:text-white"
                  >
                    Contact support team
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              <div>
                <PremiumAccordion items={solution.faqItems as PremiumAccordionItem[]} />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           CTA SECTION
           ============================================================ */}
        <section className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28 text-center border-t border-white/[0.04]">
          {/* Intense center ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[350px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-core/25 opacity-70 blur-[100px]" />
          
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-semibold text-white md:text-5xl leading-tight">
              Ready to implement a premium growth architecture?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              Get in touch with our solutions architects to mapping out a custom category positioning and execution roadmap.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="shine-sweep w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#1552B6] border border-[#4D8EFF] px-7 py-4 font-heading text-sm font-semibold text-white shadow-[0_16px_44px_rgba(0,102,255,0.36)] transition-all hover:border-[#7FAEFF] hover:shadow-[0_20px_54px_rgba(0,102,255,0.48)]"
              >
                Schedule Architecture Call
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================
           RELATED SOLUTIONS
           ============================================================ */}
        <section className="px-6 py-14 border-t border-white/[0.04] bg-[#071324]/40 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl mb-8">
              Explore Alternative Solutions
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedSolutions.map((sol) => {
                const RelatedIcon = ICON_MAP[sol.iconName] || TrendingUp;
                return (
                  <Link
                    href={`/solutions/${sol.slug}`}
                    key={sol.slug}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1F3D]/45 p-6 transition-all duration-300 hover:bg-[#0B254E]/65 hover:border-[#8CB8FF]/25 hover:shadow-lg"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.04] text-[#86B3FF] group-hover:bg-[#0066FF]/20 group-hover:text-white transition-colors">
                      <RelatedIcon size={18} />
                    </div>
                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-white/45">
                      {sol.subtitle}
                    </p>
                    <h3 className="mt-1 font-heading text-base font-semibold text-white transition-colors group-hover:text-[#A8C9FF]">
                      {sol.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/60">
                      {sol.description.substring(0, 110)}...
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-[#86B3FF]">
                      <span>Learn More</span>
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <EnterpriseFooter />
      </main>
    </div>
  );
}
