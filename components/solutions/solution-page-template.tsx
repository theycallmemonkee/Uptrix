"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
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
import { AiMarketingHero } from "@/components/solution-heroes/ai-marketing-hero";
import { ConversionWebsiteHero } from "@/components/solution-heroes/conversion-website-hero";
import { GrowthFoundationHero } from "@/components/solution-heroes/growth-foundation-hero";
import { RevenueOperationsHero } from "@/components/solution-heroes/revenue-operations-hero";
import { MarketingSystemHero } from "@/components/solution-heroes/marketing-system-hero";
import { TrustedBrandsSlider } from "@/components/shared/TrustedBrandsSlider";

// Map each solution slug to its isolated hero component.
// Changing one entry here never affects any other page.
const HERO_MAP: Record<string, React.ComponentType<{ solution: SolutionConfig }>> = {
  "ai-marketing-system": AiMarketingHero,
  "conversion-website-system": ConversionWebsiteHero,
  "growth-foundation-system": GrowthFoundationHero,
  "revenue-operations-system": RevenueOperationsHero,
  "paid-growth-engine": MarketingSystemHero,
};

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
        {(() => {
          const HeroComp = HERO_MAP[solution.slug];
          return HeroComp ? <HeroComp solution={solution} /> : null;
        })()}

        <TrustedBrandsSlider />

        {/* ============================================================
           PROBLEM SECTION
           ============================================================ */}
        <section id="problems" className="px-6 py-16 border-t border-white/[0.04] bg-[#091a33]/20 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
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
                <h2 className="mt-4 font-heading text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em] text-white">
                  Is your business facing these growth bottlenecks?
                </h2>
                <p className="mt-4 text-sm leading-[1.8] text-white/68">
                  Most teams try to patch marketing bottlenecks with fragmented tools and ad-hoc tactics. We help you replace leaks with unified growth systems.
                </p>
              </motion.div>

              <div className="space-y-4">
                {solution.problems.map((problem, i) => (
                  <motion.div
                    key={`problem-${i}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                    className="relative overflow-hidden rounded-2xl border border-red-500/12 bg-red-500/[0.04] p-5 backdrop-blur-md"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/14">
                        <XCircle size={18} />
                      </div>
                      <div>
                        <h3 className="font-heading text-sm font-semibold text-white">
                          {problem.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-[1.7] text-white/65">
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
        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                {solution.systemSolutions.map((sys, i) => (
                  <motion.div
                    key={`sys-${i}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                    className="relative overflow-hidden rounded-2xl border border-[#0066FF]/18 bg-[#0A234A]/50 p-5 backdrop-blur-md"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0066FF]/18 text-[#8FB8FF] border border-[#0066FF]/28">
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <h3 className="font-heading text-sm font-semibold text-white">
                          {sys.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-[1.7] text-white/65">
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
                <h2 className="mt-4 font-heading text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em] text-white">
                  Built to scale revenue by the numbers.
                </h2>
                <p className="mt-4 text-sm leading-[1.8] text-white/68">
                  Instead of manual tasks and messy databases, we deploy custom pipeline modules that connect traffic directly to closed won pipeline.
                </p>
                <div className="mt-7">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#86B3FF] transition-colors hover:text-white"
                  >
                    Discuss System Implementation
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================
           PROCESS TIMELINE
           ============================================================ */}
        <section className="px-6 py-16 border-t border-white/[0.04] bg-[#091a33]/15 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl mb-12">
              <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
                Methodology
              </p>
              <h2 className="mt-4 font-heading text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em] text-white">
                Implementation Workflow
              </h2>
              <p className="mt-4 text-sm leading-[1.8] text-white/68">
                A highly structured 4-phase deployment playbook designed to transition operations without breaking existing marketing velocity.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {solution.processSteps.map((step, i) => (
                <motion.div
                  key={`step-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#081728]/65 p-6 shadow-[0_12px_36px_rgba(0,0,0,0.15)] backdrop-blur-md"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#5B8EFF]/28 bg-[#0B315F]/75 text-xs font-bold text-[#D9E8FF]">
                    {step.step}
                  </div>
                  <h3 className="mt-5 font-heading text-sm font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.7] text-white/65">
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
        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl mb-12">
              <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
                System Core
              </p>
              <h2 className="mt-4 font-heading text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em] text-white">
                What&apos;s included in the system
              </h2>
              <p className="mt-4 text-sm leading-[1.8] text-white/68">
                We bundle enterprise-grade technology and dedicated expertise to remove key operational constraints.
              </p>
            </div>

            <div className={`grid gap-6 ${solution.featureCards.length === 3 ? "md:grid-cols-3" : "sm:grid-cols-2"}`}>
              {solution.featureCards.map((feat, i) => (
                <motion.article
                  key={`feat-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0B1F3D]/75 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
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
                  <div className="relative p-5">
                    <h3 className="font-heading text-base font-semibold text-white transition-colors group-hover:text-[#A8C9FF]">
                      {feat.title}
                    </h3>
                    <p className="mt-2 text-sm leading-[1.7] text-white/68">
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
        <section className="px-6 py-16 border-t border-white/[0.04] bg-[#091a33]/15 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            {/* ROI Grid */}
            <div className="grid gap-5 sm:grid-cols-2 mb-14">
              {solution.roiStats.map((stat, i) => (
                <motion.div
                  key={`stat-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className="rounded-2xl border border-white/10 bg-[#0A224D]/55 p-8 text-center backdrop-blur-md"
                >
                  <p className="font-heading text-[clamp(2.5rem,5vw,3.5rem)] font-bold tracking-[-0.025em] text-white">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-xs font-semibold text-[#A8C9FF] tracking-[0.18em] uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Case Study Details */}
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#08192A]/80 p-7 shadow-xl backdrop-blur-2xl"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,180,255,0.1),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(0,102,255,0.08),transparent_50%)]" />
                <div className="relative z-10">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9BC2FF]">
                    Case Study
                  </span>
                  <h3 className="mt-3 font-heading text-xl font-semibold text-white md:text-2xl">
                    {solution.caseStudy.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.8] text-white/68">
                    {solution.caseStudy.subtitle}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {solution.caseStudy.metrics.map((m, mi) => (
                      <div key={`metric-${mi}`} className="rounded-xl border border-white/[0.08] bg-[#0A264F]/75 p-3.5">
                        <p className="font-heading text-xl font-bold text-white">{m.value}</p>
                        <p className="mt-1 text-xs text-white/58 leading-tight">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <blockquote className="mt-5 border-l-2 border-[#8CB8FF]/38 bg-white/[0.02] px-4 py-3 text-sm italic text-white/78 rounded-r-lg">
                    "{solution.caseStudy.quote}"
                  </blockquote>
                  <p className="mt-3 text-sm font-semibold text-[#86B3FF]">
                    {solution.caseStudy.client}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="relative overflow-hidden rounded-[1.5rem] border border-white/10 shadow-xl aspect-[4/3]"
              >
                <Image
                  src={solution.caseStudy.image}
                  alt={solution.caseStudy.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/88 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================
           TESTIMONIALS SECTION
           ============================================================ */}
        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
              Feedback
            </p>
            <h2 className="mt-4 font-heading text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em] text-white">
              Client Testimonials
            </h2>

            <div className="mt-10 space-y-5">
              {solution.testimonials.map((t, i) => (
                <motion.div
                  key={`testimonial-${i}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B234A]/35 p-7 backdrop-blur-md"
                >
                  <p className="text-base italic text-white/88 leading-[1.75]">
                    "{t.quote}"
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                    <div>
                      <p className="text-sm font-semibold text-[#86B3FF]">
                        {t.author}
                      </p>
                      <p className="mt-0.5 text-xs text-white/48">
                        {t.role} • {t.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           FAQ SECTION
           ============================================================ */}
        <section className="px-6 py-16 border-t border-white/[0.04] bg-[#091a33]/15 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="font-heading text-xs font-medium tracking-[0.2em] text-[#9BC2FF] uppercase">
                  Q&A
                </p>
                <h2 className="mt-4 font-heading text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.02em] text-white leading-tight">
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 text-sm leading-[1.8] text-white/68">
                  Got questions about onboarding, tools integrations, and roadmap delivery? We&apos;ve compiled responses to our most common client queries.
                </p>
                <div className="mt-7">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#86B3FF] transition-colors hover:text-white"
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
        <section className="relative overflow-hidden px-6 py-20 md:px-10 md:py-24 text-center border-t border-white/[0.04]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[350px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/22 blur-[100px]" />

          <div className="mx-auto max-w-2xl">
            <h2 className="font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-semibold text-white leading-tight tracking-[-0.02em]">
              Ready to implement a premium growth architecture?
            </h2>
            <p className="mt-5 text-base leading-[1.8] text-white/68">
              Get in touch with our solutions architects to map out a custom category positioning and execution roadmap.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
        <section className="px-6 py-16 border-t border-white/[0.04] bg-[#071324]/35 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-heading text-xl font-semibold text-white md:text-2xl mb-8 tracking-tight">
              Explore Alternative Solutions
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedSolutions.map((sol) => {
                const RelatedIcon = ICON_MAP[sol.iconName] || TrendingUp;
                return (
                  <Link
                    href={`/solutions/${sol.slug}`}
                    key={sol.slug}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1F3D]/40 p-6 transition-all duration-300 hover:bg-[#0B254E]/60 hover:border-[#8CB8FF]/22 hover:shadow-lg"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.04] text-[#86B3FF] group-hover:bg-[#0066FF]/18 group-hover:text-white transition-colors">
                      <RelatedIcon size={17} />
                    </div>
                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">
                      {sol.subtitle}
                    </p>
                    <h3 className="mt-1 font-heading text-sm font-semibold text-white transition-colors group-hover:text-[#A8C9FF]">
                      {sol.title}
                    </h3>
                    <p className="mt-2 text-sm leading-[1.7] text-white/58">
                      {sol.description.substring(0, 110)}...
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#86B3FF]">
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
