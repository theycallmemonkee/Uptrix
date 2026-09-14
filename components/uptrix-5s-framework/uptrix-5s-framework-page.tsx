"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { PremiumNavbar } from "@/components/shared/premium-navbar";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { PremiumAccordion, type PremiumAccordionItem } from "@/components/ui/premium-accordion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STAGES = [
  {
    number: "01",
    code: "SCAN",
    title: "Find where growth is stuck, or where the opportunity is",
    intro:
      "Every engagement starts here, because you cannot fix what you have not measured. Scan is where we build a clear, honest picture of your business before anyone touches an ad account or a page.",
    lookAt:
      "Where you are today. Your market and who you are really competing with, your current marketing and what it is producing, your website and how visitors move through it, and the numbers behind all of it. If you are pre launch, we look at the market you are about to enter and where the room is.",
    weDo:
      "We separate what is working from what is quietly costing you, and we find the one gap that matters most right now. Not a list of forty things, one starting point, because trying to fix everything at once is why most marketing stalls.",
    weGet:
      "A clear read on your starting position and the single most important thing to fix or build first. You finish this stage knowing exactly where you stand.",
  },
  {
    number: "02",
    code: "STRATEGY",
    title: "Set the positioning, message and plan",
    intro:
      "Scan tells us where you are. Strategy decides where you are going and how you will talk about it. This is the stage most businesses skip, and skipping it is why their ads get expensive and their message sounds like everyone else.",
    lookAt:
      "Who your best customers actually are, what they care about, and what makes them choose one option over another. Where you sit against competitors, and the space you can own that they cannot.",
    weDo:
      "We settle your positioning, who you are for, what you stand for, and why anyone should choose you over the cheaper option. Then we turn that into a clear message and a plan every channel will follow, so nothing built later contradicts anything built before it.",
    weGet:
      "A direction the whole business can line up behind. One message, one plan, and a reason behind every rupee you are about to spend.",
  },
  {
    number: "03",
    code: "SEQUENCE",
    title: "Map the channels and priorities for your stage",
    intro:
      "Knowing your strategy is not the same as knowing what to do first. Sequence is where we turn the plan into an order of work, matched to your stage, your budget and how fast you need to move.",
    lookAt:
      "The channels realistically open to you, what your budget can support, and what your stage of business actually needs. A startup finding its first customers and an SME fixing a leaking funnel need very different first moves.",
    weDo:
      "We decide what to build and in what order, so effort and budget go to what moves the needle first. We do not switch on six channels at once and hope. We build the sequence that gets you a result you can fund the next stage with.",
    weGet:
      "A prioritised plan of action. You know what comes first, what comes next, and why that order, instead of guessing or spreading yourself thin.",
  },
  {
    number: "04",
    code: "SHIP",
    title: "Build, launch and track the work",
    intro:
      "This is where the plan becomes real. Ship is the stage where our growth experts build and launch the actual work, with the tracking in place to prove what it does.",
    lookAt:
      "Everything the sequence calls for. The pages, the ads, the content, the follow up, and the tracking that ties them together.",
    weDo:
      "We build it and put it live. Every piece connects to the next, and tracking goes in from day one, so nothing runs blind and every result can be traced back to what caused it. This is where AI speeds up the production work, while a growth expert checks everything before it reaches your customers.",
    weGet:
      "Work that is live, measured, and connected. Not scattered across tools that do not talk to each other, but running as one flow you can actually see.",
  },
  {
    number: "05",
    code: "SCALE",
    title: "Measure, improve and reinvest what works",
    intro:
      "Launching is not the finish line, it is the start of the part that compounds. Scale is the ongoing stage where growth stops being a project and becomes a habit of steady improvement.",
    lookAt:
      "What moved and what did not. Which channels earned more budget, which need fixing, and where the next gain is hiding.",
    weDo:
      "We review on a 90 day cycle, cut what is not working, and put more behind what is. Each round is informed by the last, so the work gets sharper and the cost of growth comes down over time.",
    weGet:
      "Growth that builds on itself instead of resetting every quarter. Each 90 days starts further ahead than the one before it.",
  },
];

const FAQ_ITEMS: PremiumAccordionItem[] = [
  {
    id: "what-is-it",
    question: "What is Uptrix 5S?",
    answer:
      "Uptrix 5S is a five stage growth marketing framework: Scan, Strategy, Sequence, Ship and Scale. It runs the stages of growth in a set order, so strategy comes before spend and nothing is built until we know what it connects to.",
  },
  {
    id: "software-or-tool",
    question: "Is Uptrix 5S a software or a tool?",
    answer:
      "No. It is a framework run by the Uptrix team, not something you log into. Your growth is handled stage by stage by a fractional CMO and growth experts, with AI supporting behind the scenes.",
  },
  {
    id: "who-is-it-for",
    question: "Who is Uptrix 5S for?",
    answer:
      "Startups, scaleups and SMEs. The five stages stay the same for every business. What changes is where you start, based on where your business is today.",
  },
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase">
      {children}
    </p>
  );
}

function StageCard({ stage, index }: { stage: (typeof STAGES)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: EASE }}
      className="relative"
    >
      <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:gap-10">
        {/* Number + connector */}
        <div className="flex items-center gap-4 lg:flex-col lg:items-center lg:gap-0">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#79ABFF]/30 bg-[#0A234A]/70 font-heading text-lg font-bold text-[#9BC2FF]">
            {stage.number}
          </div>
          {index < STAGES.length - 1 && (
            <div className="hidden w-px flex-1 bg-gradient-to-b from-[#79ABFF]/30 to-transparent lg:mt-4 lg:block" />
          )}
          <p className="font-heading text-lg font-bold tracking-[0.06em] text-white uppercase lg:hidden">
            {stage.code}
          </p>
        </div>

        {/* Card */}
        <div className="mb-10 rounded-2xl border border-white/[0.09] bg-white/[0.035] p-6 backdrop-blur-sm md:p-8 lg:mb-14">
          <p className="hidden font-heading text-sm font-semibold tracking-[0.2em] text-[#79ABFF]/70 uppercase lg:block">
            {stage.code}
          </p>
          <h3 className="mt-2 font-heading text-xl font-semibold text-white md:text-2xl">
            {stage.title}
          </h3>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#86B3FF]">
                What we look at
              </p>
              <p className="mt-2 text-sm leading-[1.75] text-white/65">{stage.lookAt}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#86B3FF]">
                What we do
              </p>
              <p className="mt-2 text-sm leading-[1.75] text-white/65">{stage.weDo}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#86B3FF]">
                What you get
              </p>
              <p className="mt-2 text-sm leading-[1.75] text-white/65">{stage.weGet}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Uptrix5SFrameworkPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#0B1F3A] text-white font-sans antialiased">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(1200px circle at 15% 10%, rgba(0,102,255,0.22), transparent 55%), radial-gradient(900px circle at 85% 15%, rgba(74,143,255,0.12), transparent 60%), linear-gradient(180deg, #0B1F3A 0%, #091A33 60%, #071226 100%)",
        }}
      />

      <PremiumNavbar />

      <main className="relative z-10 flex flex-1 flex-col">
        {/* ============================================================
           SECTION 1 — WHAT IT IS
           ============================================================ */}
        <section className="px-6 pb-16 pt-28 text-center md:px-10 md:pb-20 md:pt-36">
          <div ref={heroRef} className="mx-auto max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-[#8DB8FF]/30 bg-[#78A8FF]/10 px-4 py-1.5 text-xs tracking-[0.2em] text-[#DCEBFF] uppercase backdrop-blur-sm"
            >
              The Framework
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="mt-6 font-heading text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.08] tracking-[-0.02em]"
            >
              <span className="text-white">WHAT IS</span>
              <br />
              <span className="text-[#79ABFF]">UPTRIX 5S™</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.14, ease: EASE }}
              className="mt-6 font-heading text-base font-semibold tracking-[0.02em] text-white/80 md:text-lg"
            >
              Scan <ArrowRight className="mx-1.5 mb-0.5 inline h-4 w-4 text-[#79ABFF]" />
              Strategy <ArrowRight className="mx-1.5 mb-0.5 inline h-4 w-4 text-[#79ABFF]" />
              Sequence <ArrowRight className="mx-1.5 mb-0.5 inline h-4 w-4 text-[#79ABFF]" />
              Ship <ArrowRight className="mx-1.5 mb-0.5 inline h-4 w-4 text-[#79ABFF]" />
              Scale
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
              className="mx-auto mt-8 max-w-2xl text-[0.9375rem] leading-[1.8] text-white/65"
            >
              <p>
                Uptrix 5S is the framework behind everything we do at Uptrix Technologies. It
                breaks growth into five stages and runs them in a set order, so strategy always
                comes before spend and nothing gets built until we know what it connects to.
              </p>
              <p className="mt-4">
                It is a way of working, not a piece of software. Your growth is run by our team,
                stage by stage, in the order that actually produces results.
              </p>
              <p className="mt-4">
                The five stages are Scan, Strategy, Sequence, Ship and Scale.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.26, ease: EASE }}
              className="mt-6"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#86B3FF] transition-colors hover:text-white"
              >
                See where Uptrix 5S would start for you
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
           SECTION 2 — WHY IT EXISTS
           ============================================================ */}
        <section className="border-t border-white/[0.04] bg-[#091a33]/20 px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>The idea behind it</SectionEyebrow>
            <h2 className="mt-4 font-heading text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              <span className="text-white">GROWTH WORKS</span>
              <br />
              <span className="text-[#79ABFF]">IN AN ORDER</span>
            </h2>
            <div className="mx-auto mt-6 max-w-2xl text-[0.9375rem] leading-[1.8] text-white/65">
              <p>
                Most marketing fails for one reason. It happens out of order. Ads before an offer.
                A website before a plan. A launch before anyone decided who it was for. Money
                goes out before the thinking is done.
              </p>
              <p className="mt-4">
                Uptrix 5S fixes that by putting the five stages of growth in the order they
                actually work. Each stage prepares the next. You always know which stage you are
                in, what happens next, and why.
              </p>
              <p className="mt-4">
                That is the whole idea. Growth is not a pile of tactics. It is a sequence, and the
                sequence is what makes it work.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 3 — THE FIVE STAGES
           ============================================================ */}
        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <SectionEyebrow>The five stages</SectionEyebrow>
              <h2 className="mt-4 font-heading text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                <span className="text-white">FIVE STAGES,</span>
                <br />
                <span className="text-[#79ABFF]">IN ORDER</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[0.9375rem] leading-[1.8] text-white/65">
                Each stage has one job and it prepares the next. We start wherever your business
                is today, and we do not move forward until the current stage is done. This is
                what keeps growth from running ahead of the thinking behind it.
              </p>
            </div>

            <div className="mt-14">
              {STAGES.map((stage, i) => (
                <StageCard key={stage.code} stage={stage} index={i} />
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-center text-sm italic leading-[1.75] text-white/45"
            >
              Every stage is run by our team. Your fractional CMO sets the direction, growth
              experts do the work, with AI supporting behind the scenes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, ease: EASE }}
              className="mt-10 w-full rounded-2xl border border-white/[0.07] bg-[linear-gradient(135deg,rgba(0,50,160,0.22),rgba(0,102,255,0.08))] px-8 py-8 text-center"
            >
              <p className="font-heading text-base font-semibold text-white md:text-lg">
                Which stage would we start you at?{" "}
                <span className="text-[#79ABFF]">Book a consultation and find out.</span>
              </p>
              <Link
                href="/contact"
                className="shine-sweep group mt-5 inline-flex items-center gap-2 rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-6 py-3 font-heading text-sm font-semibold text-white shadow-[0_10px_28px_rgba(0,102,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_38px_rgba(0,102,255,0.42)]"
              >
                Book a Growth Consultation
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
           SECTION 4 — WHO IT IS FOR
           ============================================================ */}
        <section className="border-t border-white/[0.04] bg-[#091a33]/15 px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Who it fits</SectionEyebrow>
            <h2 className="mt-4 font-heading text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              <span className="text-white">THE SAME FRAMEWORK,</span>
              <br />
              <span className="text-[#79ABFF]">ANY STAGE OF BUSINESS</span>
            </h2>

            <div className="mx-auto mt-6 max-w-2xl text-[0.9375rem] leading-[1.8] text-white/65">
              <p>Uptrix 5S does not change with business size. What changes is where you start.</p>
              <p className="mt-4">
                A <strong className="text-white">startup</strong> usually begins at Scan and
                Strategy, building the foundation right the first time. A{" "}
                <strong className="text-white">scaleup</strong> often starts at Sequence or Ship,
                fixing what is capping growth and adding channels in the right order. An{" "}
                <strong className="text-white">SME</strong> usually starts at Scan, finding what
                is leaking after years of marketing, then scaling what deserves it.
              </p>
              <p className="mt-4">The order stays the same. Your entry point does not.</p>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 5 — FAQ
           ============================================================ */}
        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <SectionEyebrow>Common questions</SectionEyebrow>
                <h2 className="mt-4 font-heading text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                  <span className="text-white">QUESTIONS</span>
                  <br />
                  <span className="text-[#79ABFF]">ABOUT UPTRIX 5S</span>
                </h2>
              </div>
              <div>
                <PremiumAccordion items={FAQ_ITEMS} />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 6 — CTA
           ============================================================ */}
        <section className="relative overflow-hidden border-t border-white/[0.04] px-6 py-20 text-center md:px-10 md:py-24">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[350px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/22 blur-[100px]" />

          <div className="mx-auto max-w-2xl">
            <h2 className="font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              <span className="text-white">WANT TO SEE WHERE</span>
              <br />
              <span className="text-[#79ABFF]">Uptrix 5S WOULD START FOR YOU?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-[1.8] text-white/68">
              Book a consultation and we will run the first stage with you: a clear read on where
              your growth is stuck and which stage of Uptrix 5S your business should start from.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="shine-sweep inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-7 py-4 font-heading text-sm font-semibold text-white shadow-[0_16px_44px_rgba(0,102,255,0.36)] transition-all hover:border-[#7FAEFF] hover:shadow-[0_20px_54px_rgba(0,102,255,0.48)] sm:w-auto"
              >
                Book a Growth Consultation
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <EnterpriseFooter />
      </main>
    </div>
  );
}
