"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PremiumAccordion, type PremiumAccordionItem } from "@/components/ui/premium-accordion";
import type { ServiceConfig } from "@/data/services";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  service: ServiceConfig;
};

export function ServiceDetailSections({ service }: Props) {
  return (
    <>
      {(service.problems || service.solutions) && (
        <section className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase">
                Problem → Solution
              </p>
              <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-white md:text-5xl">
                Solve creative friction and launch smarter growth systems.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/72 md:text-lg">
                We diagnose the real bottleneck, then pair AI workflows and campaign execution to turn sluggish delivery into consistent scaling.
              </p>
            </motion.div>

            <div className="flex flex-col gap-6">
              {service.sectionVisuals?.problemImage && (
                <motion.div
                  className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#071B39]/85 shadow-[0_22px_68px_rgba(0,0,0,0.24)] backdrop-blur-2xl"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={service.sectionVisuals.problemImage}
                      alt={`${service.name} workflow preview`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,17,38,0.15),rgba(2,17,38,0.8))]" />
                  </div>
                  <div className="absolute left-6 top-6 rounded-2xl border border-white/15 bg-[#0A2A56]/70 px-3 py-2 text-sm text-[#DCEBFF] shadow-[0_12px_28px_rgba(0,102,255,0.22)] backdrop-blur-sm">
                    Creative workflow dashboard
                  </div>
                </motion.div>
              )}
              <div className="space-y-5">
                {service.problems?.map((problem, index) => (
                  <motion.article
                    key={problem.title}
                    className="group relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-[#0B1F3D]/80 p-6 shadow-[0_24px_72px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.65, delay: index * 0.06, ease: EASE }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,102,255,0.16),transparent_62%),radial-gradient(circle_at_bottom_right,rgba(120,180,255,0.085),transparent_58%)]" />
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#8DB8FF]/20 bg-[#18417B]/50 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-[#DDEBFF]">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#84B2FF] shadow-[0_0_14px_rgba(132,178,255,0.35)]" />
                        Problem
                      </div>
                      <h3 className="mt-4 font-heading text-xl font-semibold text-white">{problem.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/75">{problem.description}</p>
                    </div>
                  </motion.article>
                ))}
                {service.solutions?.map((solution, index) => (
                  <motion.article
                    key={solution.title}
                    className="group relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-[#0B1F3D]/80 p-6 shadow-[0_24px_72px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.65, delay: 0.12 + index * 0.06, ease: EASE }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,180,255,0.18),transparent_62%),radial-gradient(circle_at_bottom_left,rgba(0,102,255,0.08),transparent_58%)]" />
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#8DB8FF]/20 bg-[#0E3C7F]/55 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-[#DDEBFF]">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#A3C7FF] shadow-[0_0_14px_rgba(163,199,255,0.28)]" />
                        Solution
                      </div>
                      <h3 className="mt-4 font-heading text-xl font-semibold text-white">{solution.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/75">{solution.description}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {service.processSteps && (
        <section className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-2xl">
              <p className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase">Process Timeline</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-white md:text-5xl">
                From discovery to automation, every step is built for velocity.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/72 md:text-lg">
                Our process turns concept into live systems using a repeatable framework that keeps every team aligned.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-6">
                {service.processSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    className="group relative overflow-hidden rounded-[1.7rem] border border-white/12 bg-[#081724]/80 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.24)] backdrop-blur-2xl"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.65, delay: index * 0.06, ease: EASE }}
                  >
                    <div className="absolute left-6 top-6 h-10 w-10 rounded-2xl border border-[#5B8EFF]/30 bg-[#0B315F]/80 text-center text-sm font-semibold leading-10 text-[#D9E8FF] shadow-[0_10px_30px_rgba(0,102,255,0.15)]">
                      {step.step}
                    </div>
                    <div className="ml-16 space-y-2">
                      <h3 className="font-heading text-xl font-semibold text-white">{step.title}</h3>
                      <p className="text-sm leading-7 text-white/73">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {service.sectionVisuals?.timelineImage && (
                <motion.div
                  className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#091A33]/90 shadow-[0_26px_82px_rgba(0,0,0,0.26)] backdrop-blur-2xl"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.72, delay: 0.08, ease: EASE }}
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={service.sectionVisuals.timelineImage}
                      alt={`${service.name} timeline preview`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,38,0.12),rgba(6,18,38,0.8))]" />
                  </div>
                  <div className="absolute left-5 top-5 rounded-2xl border border-white/15 bg-[#08305B]/80 px-3 py-2 text-sm font-semibold text-[#DCEBFF] shadow-[0_12px_30px_rgba(0,102,255,0.2)] backdrop-blur-sm">
                    Process & timeline preview
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {service.benefits && (
        <section className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase">Benefits</p>
                <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-white md:text-5xl">
                  The measurable advantages of premium automation and creative systems.
                </h2>
                <p className="mt-5 text-base leading-7 text-white/72 md:text-lg">
                  Built for leaders who need predictable output, faster decision cycles, and reduced operational risk.
                </p>
              </div>

              <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {service.benefits.map((benefit, index) => (
                  <motion.article
                    key={benefit.title}
                    className="group relative overflow-hidden rounded-[1.7rem] border border-white/12 bg-[#0A234C]/86 p-6 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl"
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.65, delay: index * 0.05, ease: EASE }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,102,255,0.18),transparent_62%),radial-gradient(circle_at_bottom_right,rgba(135,190,255,0.1),transparent_60%)]" />
                    <div className="relative z-10">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0D3F74] text-[#8FB8FF] shadow-[0_14px_36px_rgba(0,102,255,0.18)]">
                        <CheckCircle2 size={20} />
                      </div>
                      <h3 className="mt-6 font-heading text-xl font-semibold text-white">{benefit.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/72">{benefit.description}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
              {service.sectionVisuals?.benefitsImage && (
                <motion.div
                  className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#071A33]/90 shadow-[0_24px_76px_rgba(0,0,0,0.24)] backdrop-blur-2xl"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.72, delay: 0.1, ease: EASE }}
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={service.sectionVisuals.benefitsImage}
                      alt={`${service.name} benefits dashboard`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,17,35,0.16),rgba(5,17,35,0.82))]" />
                  </div>
                  <div className="absolute left-5 top-5 rounded-2xl border border-white/15 bg-[#0B2D5B]/72 px-3 py-2 text-sm text-[#DCEBFF] shadow-[0_12px_30px_rgba(0,102,255,0.2)] backdrop-blur-sm">
                    Automation & performance visuals
                  </div>
                </motion.div>
              )}
            </div>
            </div>
          </div>
        </section>
      )}

      {service.caseStudy && (
        <section className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-[#081924]/88 p-8 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur-2xl"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.72, ease: EASE }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,180,255,0.18),transparent_62%),radial-gradient(circle_at_bottom_left,rgba(0,102,255,0.14),transparent_56%)]" />
              <div className="relative z-10">
                <p className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase">Case Study</p>
                <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-white md:text-4xl">
                  {service.caseStudy.title}
                </h2>
                <p className="mt-5 text-base leading-7 text-white/72 md:text-lg">{service.caseStudy.subtitle}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {service.caseStudy.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-3xl border border-white/10 bg-[#0B274D]/80 p-5">
                      <p className="text-3xl font-heading font-semibold text-white">{metric.value}</p>
                      <p className="mt-2 text-sm text-white/64">{metric.label}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="mt-8 rounded-3xl border border-white/12 bg-[#0C2B55]/72 p-6 text-white/80 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
                  “{service.caseStudy.quote}”
                </blockquote>
                <p className="mt-4 text-sm font-semibold text-[#C7D9FF]">{service.caseStudy.client}</p>
                <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#4F89FF]/30 bg-[#0E316D]/70 px-4 py-2 text-sm text-white/80">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#7AB1FF]" />
                  Rapid creative and operational uplift in one deployment.
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-[#0C2551]/90 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur-2xl"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.72, delay: 0.08, ease: EASE }}
            >
              <div className="relative aspect-[4/3]">
                <Image src={service.caseStudy.image} alt={`${service.name} case study visual`} fill className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,22,48,0.18),rgba(5,12,28,0.88))]" />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {service.faqItems && (
        <section className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <p className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase">Frequently Asked Questions</p>
                <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-white md:text-5xl">
                  Everything you need to know before scaling with Uptrix.
                </h2>
                <p className="mt-5 text-base leading-7 text-white/72 md:text-lg">
                  Clear answers for creative, automation, and enterprise execution so your team can move confidently.
                </p>
              </div>

              <div className="space-y-6">
                {service.sectionVisuals?.faqImage && (
                  <motion.div
                    className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#091B34]/90 shadow-[0_24px_76px_rgba(0,0,0,0.24)] backdrop-blur-2xl"
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={service.sectionVisuals.faqImage}
                        alt={`${service.name} AI dashboard visual`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,18,41,0.16),rgba(2,18,41,0.82))]" />
                    </div>
                    <div className="absolute left-5 top-5 rounded-2xl border border-white/15 bg-[#0C2F5A]/70 px-3 py-2 text-sm text-[#DCEBFF] shadow-[0_12px_30px_rgba(0,102,255,0.2)] backdrop-blur-sm">
                      AI automation orchestration
                    </div>
                  </motion.div>
                )}
                <PremiumAccordion items={service.faqItems as PremiumAccordionItem[]} />
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#0A2D59]/70 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-[#86B6FF]/60 hover:bg-[#09264C]"
                >
                  Contact our team
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
