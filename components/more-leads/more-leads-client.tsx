"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  MessageSquare,
  Sparkles,
  User,
  X,
  XCircle,
} from "lucide-react";
import { InvisibleTurnstile } from "@/components/ui/turnstile";
import { PremiumNavbar } from "@/components/premium-navbar";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { PremiumAccordion, type PremiumAccordionItem } from "@/components/ui/premium-accordion";
import { FloatingOrbs, AnimatedGrid, AIWaveOverlay, NoiseTexture } from "@/components/ui/visual-effects";
import { TrustedBrandsSlider } from "@/components/shared/TrustedBrandsSlider";
import { DemandGenerationHero } from "@/components/solution-heroes/demand-generation-hero";

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_LINEAR = [0, 0, 1, 1] as const;

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  excerpt: string;
  cover: string;
  author: string;
  category: string;
  readingTime?: string;
};

type Props = {
  posts: BlogPost[];
};

export function MoreLeadsClient({ posts }: Props) {
  const [mounted, setMounted] = useState(false);

  // Navigation active state logic or page load state
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMounted(true);
  }, []);

  // Form 1 State (Checklist Lead Magnet)
  const [checklistForm, setChecklistForm] = useState({ firstName: "", email: "", honey: "" });
  const [checklistLoading, setChecklistLoading] = useState(false);
  const [checklistSuccess, setChecklistSuccess] = useState(false);
  const [checklistError, setChecklistError] = useState("");

  // Form 2 State (Tell Us About Your Lead Problem)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    website: "",
    budget: "",
    challenge: "",
    honey: "",
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");

  // Turnstile tokens & refs
  const [checklistToken, setChecklistToken] = useState("");
  const [contactToken, setContactToken] = useState("");
  const [exitToken, setExitToken] = useState("");

  const checklistTurnstileRef = useRef<{ reset: () => void; execute: () => void } | null>(null);
  const contactTurnstileRef = useRef<{ reset: () => void; execute: () => void } | null>(null);
  const exitTurnstileRef = useRef<{ reset: () => void; execute: () => void } | null>(null);

  // Exit intent popup state
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasExited, setHasExited] = useState(false);

  // Sticky banner state
  const [showStickyBanner, setShowStickyBanner] = useState(false);
  const [dismissedSticky, setDismissedSticky] = useState(false);

  const { scrollY } = useScroll();

  // Detect scroll to show sticky banner
  useEffect(() => {
    return scrollY.onChange((latest) => {
      const isConverted =
        localStorage.getItem("uptrix_lead_converted") === "true" ||
        localStorage.getItem("uptrix_checklist_downloaded") === "true";

      if (latest > 400 && !dismissedSticky && !isConverted) {
        setShowStickyBanner(true);
      } else {
        setShowStickyBanner(false);
      }
    });
  }, [scrollY, dismissedSticky]);

  // Detect exit intent
  useEffect(() => {
    const isConverted =
      localStorage.getItem("uptrix_lead_converted") === "true" ||
      localStorage.getItem("uptrix_checklist_downloaded") === "true";

    if (isConverted || hasExited) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) {
        setShowExitPopup(true);
        setHasExited(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasExited]);

  // Prevent page scroll when modal is open
  useEffect(() => {
    if (showExitPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showExitPopup]);

  // Handle Checklist Form submission
  const handleChecklistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecklistLoading(true);
    setChecklistError("");
    setChecklistSuccess(false);

    // If modal is active, send exitToken; otherwise send inline checklistToken
    const activeToken = showExitPopup ? exitToken : checklistToken;

    const payloadBody = {
      name: checklistForm.firstName,
      email: checklistForm.email,
      message: "[Lead Magnet: Checklist] Requested download for the Lead Leak Checklist.",
      honey: checklistForm.honey,
      source_page: "/solutions/demand-generation-system",
      turnstileToken: activeToken,
    };

    // Debug log formData
    console.log("formData", payloadBody);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadBody),
      });

      const data = await response.json();
      // Debug log apiResponse
      console.log("apiResponse", data);

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setChecklistSuccess(true);
      localStorage.setItem("uptrix_checklist_downloaded", "true");
      setShowExitPopup(false);
      setShowStickyBanner(false);
      setChecklistForm({ firstName: "", email: "", honey: "" });
      
      // Reset Turnstile tokens
      if (showExitPopup) {
        exitTurnstileRef.current?.reset();
        exitTurnstileRef.current?.execute();
      } else {
        checklistTurnstileRef.current?.reset();
        checklistTurnstileRef.current?.execute();
      }
    } catch (err: any) {
      // Debug log serverError
      console.log("serverError", err);
      setChecklistError(err.message || "Network error. Please try again.");
      if (showExitPopup) {
        exitTurnstileRef.current?.reset();
        exitTurnstileRef.current?.execute();
      } else {
        checklistTurnstileRef.current?.reset();
        checklistTurnstileRef.current?.execute();
      }
    } finally {
      setChecklistLoading(false);
    }
  };

  // Handle Contact Form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError("");
    setContactSuccess(false);

    if (contactForm.challenge.trim().length < 10) {
      setContactError("Please describe your biggest challenge in at least 10 characters.");
      setContactLoading(false);
      return;
    }

    const payloadBody = {
      name: contactForm.name,
      email: contactForm.email,
      message: contactForm.challenge,
      honey: contactForm.honey,
      website: contactForm.website,
      budget: contactForm.budget,
      source_page: "/solutions/demand-generation-system",
      turnstileToken: contactToken,
    };

    // Debug log formData
    console.log("formData", payloadBody);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadBody),
      });

      const data = await response.json();
      // Debug log apiResponse
      console.log("apiResponse", data);

      if (!response.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setContactSuccess(true);
      localStorage.setItem("uptrix_lead_converted", "true");
      setShowStickyBanner(false);
      setContactForm({ name: "", email: "", website: "", budget: "", challenge: "", honey: "" });
      contactTurnstileRef.current?.reset();
      contactTurnstileRef.current?.execute();
    } catch (err: any) {
      // Debug log serverError
      console.log("serverError", err);
      setContactError(err.message || "Network error. Please try again.");
      contactTurnstileRef.current?.reset();
      contactTurnstileRef.current?.execute();
    } finally {
      setContactLoading(false);
    }
  };

  // Smooth scroll handler
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 8 FAQ Accordion Items
  const faqItems: PremiumAccordionItem[] = [
    {
      id: "cost",
      question: "How much does lead generation cost per month?",
      answer: "It depends on your market and lead targets, but here is the honest structure: our fee plus your ad budget, agreed against a target cost per lead before we start. On the Growth Roadmap call we tell you the realistic number for your business — and whether your budget is enough to hit it. If it is not, we say so.",
    },
    {
      id: "timeline",
      question: "How long until lead generation shows results?",
      answer: "Paid modules typically produce leads within 30 to 45 days of launch. Organic modules — SEO, AI search, content — compound over 60 to 90 days and keep growing after that. We set the exact expectations for your situation before anything is built.",
    },
    {
      id: "agency-vs-house",
      question: "Is a lead generation agency better than building an in house team?",
      answer: "For most growing businesses, neither alone. An in house marketer is a generalist. The system needs specialists across SEO, paid, content and automation working together — which is exactly what you rent from us at a fraction of the cost of hiring four people. Many of our clients have in house marketers we work alongside.",
    },
    {
      id: "difference",
      question: "What is the difference between lead generation and demand generation?",
      answer: "Lead generation captures people who are ready to buy now. Demand generation builds the system that creates that readiness — visibility, trust and education — so buyers already know you when they are ready. The Demand Generation System does both, which is why it compounds instead of plateauing.",
    },
    {
      id: "industry",
      question: "Will this work for my industry?",
      answer: "If your buyers search online or use social media — yes. We have built systems for B2B, SaaS, D2C, ecommerce, professional services, local services and regulated industries across the US, UK, Gulf, Australia and worldwide.",
    },
    {
      id: "requirements",
      question: "What do I need to have in place before starting?",
      answer: "A clear idea of who your ideal customer is, a website or landing page we can send traffic to, and the ability to respond when leads come in. Everything else, we build.",
    },
    {
      id: "differentiation",
      question: "How is Uptrix Technologies different from other agencies?",
      answer: "We do not sell channels. We sell one system with one accountable number — your cost per lead. No juggling vendors, no reports full of impressions, no guessing what is working. One engine, fully tracked, built to compound.",
    },
    {
      id: "failure",
      question: "What happens if it is not working?",
      answer: "You will know before we do anything about it — weekly data reviews are visible to you. If a module underperforms we fix or replace it. Full transparency is the deal. We keep clients by results, not by contracts.",
    },
  ];

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#061124] text-white font-sans antialiased">
      {/* Dynamic spotlight and noise overlay */}
      <NoiseTexture opacity={0.038} />
      <FloatingOrbs
        orbs={[
          { cx: "12%", cy: "15%", size: 480, color: "rgba(0,102,255,0.22)", duration: 8, delay: 0 },
          { cx: "88%", cy: "22%", size: 360, color: "rgba(120,168,255,0.14)", duration: 10, delay: 2 },
          { cx: "50%", cy: "65%", size: 400, color: "rgba(0,102,255,0.12)", duration: 12, delay: 4 },
          { cx: "20%", cy: "80%", size: 300, color: "rgba(180,210,255,0.1)", duration: 9, delay: 1 },
        ]}
      />
      <AnimatedGrid opacity={0.3} gridSize={72} />

      <PremiumNavbar />

      <main className="relative z-10 flex flex-1 flex-col">
        {/* ============================================================
           SECTION 1 — HERO
           ============================================================ */}
        <DemandGenerationHero
          onPrimaryClick={() => scrollToId("contact")}
          onSecondaryClick={() => scrollToId("checklist")}
        />

        {/* ============================================================
           LOGO STRIP
           ============================================================ */}
        <TrustedBrandsSlider />

        {/* AI wave overlay separator */}
        <AIWaveOverlay className="relative z-10 -mt-6 h-16 opacity-40" />

        {/* ============================================================
           SECTION 2 — MARKET REALITY & SYSTEM ALIGNMENT
           ============================================================ */}
        <section id="why-leads-dry-up" className="relative z-10 w-full px-6 pt-12 pb-28 md:px-10 md:pt-16 md:pb-32 bg-[#040914]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              {/* Left Column: Context & Title */}
              <div>
                <span className="text-xs font-semibold tracking-[0.22em] text-[#79ABFF] uppercase block mb-3">Market Reality</span>
                <h2 className="font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.02em] text-white">
                  Why Your Customers Arrive in Waves Instead of <span className="inline-flex items-center rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1.5 text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)]">Steadily</span>
                </h2>
                <p className="mt-6 text-[0.9375rem] leading-[1.8] text-white/68">
                  Most businesses scale tactics instead of systems. Juggling separate search vendors, social managers and design agencies leads to disjointed tracking, rising cost to get each customer, and a pipeline that leaks. You do not have a lead problem. You have a system problem.
                </p>
                <p className="mt-4 text-[0.9375rem] leading-[1.8] text-white/68">
                  A unified demand generation system replaces isolated channels with one connected machine, where every click builds real buying intent instead of vanishing.
                </p>
                
                <div className="mt-8 rounded-2xl border border-[#79ABFF]/15 bg-[#0066FF]/5 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-sm">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#79ABFF] block mb-1">
                    System Formula
                  </span>
                  <p className="text-xs font-semibold text-white/90 leading-relaxed">
                    Demand Generation System = SEO + AI Search + Paid Search and Social + Content + High Intent Lead Capture
                  </p>
                </div>
                <p className="mt-4 text-xs text-white/50 leading-relaxed">
                  This is the complete engine. If you only need one part fixed, like your ads or your website, see the focused systems lower down.
                </p>
              </div>

              {/* Right Column: Comparative Alignments */}
              <div className="space-y-6">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-white/15 hover:bg-white/[0.03]">
                  <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-white/40 mb-4">The Bottlenecks</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Referral Dependency", desc: "Word of mouth is a bonus, not a system. It creates an unpredictable pipeline with no monthly floor you can count on." },
                      { title: "Siloed Channels and Leaks", desc: "SEO traffic with no conversion path is wasted. Ads with no dedicated landing pages are burned budget." },
                      { title: "Empty Pipeline and No Data", desc: "Vague dashboards that track impressions instead of cost per lead and real sales conversations." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-white/90">{item.title}</h4>
                          <p className="text-[11px] text-white/60 mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-[#79ABFF]/20 bg-[#071329]/40 p-6 shadow-[0_12px_40px_rgba(0,102,255,0.06)] transition-all duration-300 hover:border-[#79ABFF]/35 hover:bg-[#071329]/50">
                  <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-[#79ABFF] mb-4">The Solution</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Compounding Lead Engine", desc: "Organic authority and AI search citations that grow your reach without raising monthly ad costs." },
                      { title: "Unified Conversion Layers", desc: "Every touchpoint connected to lead capture and instant automated follow up." },
                      { title: "One Accountable Number", desc: "One team answerable to a single growth metric: cost per qualified lead." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <CheckCircle2 size={16} className="text-[#79ABFF] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-[#CFE3FF]">{item.title}</h4>
                          <p className="text-[11px] text-white/60 mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 3 — SYSTEM ARCHITECTURE
           ============================================================ */}
        <section id="what-is-inside" className="relative z-10 w-full px-6 pt-12 pb-28 md:px-10 md:pt-16 md:pb-32 bg-[#050b14]/30">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-5xl mb-12">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#79ABFF] uppercase block mb-3">System Components</span>
              <h2 className="font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.02em] text-white">
                The Core Modules We <span className="inline-flex items-center rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1.5 text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)]">Build & Run</span>
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-[1.8] text-white/68 max-w-3xl">
                Individual marketing campaigns produce reports. Systems produce revenue. We do not sell these modules separately because they only compound when operating as a single unified engine.
              </p>
            </div>

            {/* Modules Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  mod: "Module 01",
                  name: "Search Visibility Engine",
                  runs: "AI SEO + GEO (Generative Engine Optimization)",
                  desc: "Get found on classic search engines and modern AI tools like ChatGPT, Gemini and Perplexity. We structure your digital footprint so your business is cited wherever buyers ask their questions.",
                  outcome: "A steady flow of organic, high intent buyers looking for answers now."
                },
                {
                  mod: "Module 02",
                  name: "Paid Acquisition Engine",
                  runs: "Intent targeted Ads (Meta, Google, LinkedIn)",
                  desc: "Paid campaigns managed strictly against your target cost to acquire a customer. We build the targeting and refresh creative weekly to stay ahead of ad fatigue.",
                  outcome: "Immediate lead volume that keeps your calendar full while organic compounds."
                },
                {
                  mod: "Module 03",
                  name: "Authority Content Loop",
                  runs: "Content Assets and Social Amplification",
                  desc: "Content built around the exact questions your buyers are asking. Every piece builds trust and feeds your retargeting audiences.",
                  outcome: "Higher conversion rates and lower overall paid advertising costs."
                },
                {
                  mod: "Module 04",
                  name: "Lead Capture and Funnel Automation",
                  runs: "High Speed Landing Pages + CRM Integrations",
                  desc: "We bridge the gap between visitor traffic and your pipeline with fast landing pages, lead capture and instant automated follow up.",
                  outcome: "Fast loading pages with round the clock lead scoring and routing."
                }
              ].map((m, idx) => (
                <motion.article
                  key={idx}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.01] p-8 transition-all duration-300 hover:border-[#79ABFF]/25 hover:bg-white/[0.03] hover:-translate-y-1 shadow-[0_12px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(0,102,255,0.06)]"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: EASE }}
                >
                  <div className="pointer-events-none absolute -inset-px -z-10 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(400px_circle_at_top_left,rgba(0,102,255,0.06),transparent_60%)]" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#79ABFF]">
                        {m.mod}
                      </span>
                      <span className="text-[9px] text-white/40 font-mono tracking-wider">{m.runs}</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white mb-3">{m.name}</h3>
                    <p className="text-xs leading-relaxed text-white/60 mb-6 flex-1">{m.desc}</p>
                    <div className="mt-auto border-t border-white/[0.06] pt-4">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#79ABFF] mb-1">Business Outcome:</p>
                      <p className="text-xs text-white/80 font-medium">{m.outcome}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Mid-page CTA */}
            <div className="mt-16 text-center">
              <button
                onClick={() => scrollToId("contact")}
                className="shine-sweep inline-flex items-center gap-2 rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-8 py-3.5 font-heading text-xs font-semibold text-white shadow-[0_12px_32px_rgba(0,102,255,0.28)] hover:-translate-y-0.5 transition-transform cursor-pointer"
              >
                Want this system for your business? Contact Us →
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 4 — CASE STUDY SHOWCASE
           ============================================================ */}
        <section id="results" className="relative z-10 w-full px-6 pt-12 pb-28 md:px-10 md:pt-16 md:pb-32 bg-[#040914]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-5xl mb-12">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#79ABFF] uppercase block mb-3">Proven Results</span>
              <h2 className="font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.02em] text-white">
                Real Results <span className="inline-flex items-center rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1.5 text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)]">From the System</span>
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-[1.8] text-white/68 max-w-3xl">
                Here is what the demand generation system has delivered when every module runs together.
              </p>
            </div>

            {/* Premium Card Layout */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-[#070f1a]/85 p-8 md:p-12 shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_100%_0%,rgba(0,102,255,0.08),transparent_50%)]" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[36rem] w-[56rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.08),transparent_65%)] blur-3xl" />

              <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
                {/* Left Side: Honest framing */}
                <div>
                  <span className="inline-flex rounded bg-[#0066FF]/10 border border-[#0066FF]/20 px-2.5 py-1 text-[9px] font-semibold tracking-wider text-[#79ABFF] uppercase mb-4">
                    Verified Performance
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white mb-5 leading-snug">
                    What Happens When Every Module Runs Together
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed mb-6">
                    These are real numbers from the demand generation system running at full capacity. Paid, organic, content and capture working as one engine — not as separate campaigns.
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Results vary by market, budget and starting point. On the Growth Roadmap call we give you realistic targets for your specific situation before anything is built.
                  </p>
                </div>

                {/* Right Side: Real Results Grid */}
                <div className="space-y-6">
                  {[
                    { label: "D2C Brand — Paid Social + Content. 90 days.", value: "3.21x ROAS", bar: "w-[85%]" },
                    { label: "Ecommerce Brand — Search Ads Inside the System", value: "955% ROAS", bar: "w-full" },
                    { label: "Service Brand — Zero Ad Budget. Content Only.", value: "1.9M Views", bar: "w-[75%]" }
                  ].map((metric, idx) => (
                    <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-wide">{metric.label}</span>
                        <span className="font-heading text-xl font-bold text-white">{metric.value}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r from-[#0066FF] to-[#79ABFF] rounded-full ${metric.bar}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-[#0A2D59]/30 px-6 py-3.5 text-xs font-semibold text-white/80 hover:text-white hover:bg-[#0A2D59]/50 hover:border-white/10 transition-all cursor-pointer"
              >
                Explore all results →
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 5 — QUALIFICATION & VERTICALS
           ============================================================ */}
        <section id="best-for" className="relative z-10 w-full px-6 pt-12 pb-28 md:px-10 md:pt-16 md:pb-32 bg-[#050b14]/15">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
              {/* Left Column: Qualification */}
              <div>
                <span className="text-xs font-semibold tracking-[0.22em] text-[#79ABFF] uppercase block mb-3">Qualification</span>
                <h2 className="font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.02em] text-white">
                  Is This System Right for <span className="inline-flex items-center rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1.5 text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)]">Your Business?</span>
                </h2>
                <p className="mt-5 text-[0.9375rem] leading-[1.8] text-white/68 max-w-xl">
                  The demand generation system is not a quick fix for an offer that does not sell. It is built to scale businesses that already convert when the right people show up, but have no reliable system bringing those people in.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "You rely on referrals and want control over how many leads you get each month.",
                    "You have an offer that sells well once the right buyer sees it.",
                    "You want one team handling strategy, copy, design, ads and search instead of five vendors.",
                    "You are ready to invest for 90 days while the search assets compound."
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-white/80">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#79ABFF] mt-0.5 font-bold">
                        ✓
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Supported Verticals Grid */}
              <div className="rounded-[2.5rem] border border-white/12 bg-white/[0.01] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
                <span className="text-xs font-semibold tracking-[0.22em] text-[#79ABFF] uppercase block mb-4">
                  Ecosystem Alignment
                </span>
                <div className="grid gap-4 text-xs">
                  {[
                    { title: "D2C and Ecommerce Brands", desc: "New customer acquisition that scales while keeping the cost to acquire each order under control." },
                    { title: "Startups", desc: "Lead infrastructure built fast to hit growth goals in 90 days." },
                    { title: "Local and Service Businesses", desc: "Local search visibility plus instant follow up so no enquiry is missed." },
                    { title: "B2B and Professional Services", desc: "Demo and consultation bookings through search and authority content." },
                    { title: "Healthcare, Fintech and Regulated", desc: "Compliant lead generation with privacy safe tracking." }
                  ].map((vertical, idx) => (
                    <div key={idx} className="border-b border-white/[0.04] pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-heading font-bold text-white/90">{vertical.title}</h4>
                      <p className="text-[11px] text-white/50 mt-1 leading-relaxed">{vertical.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 6 — METHODOLOGY TIMELINE
           ============================================================ */}
        <section id="how-it-works" className="relative z-10 w-full px-6 pt-12 pb-28 md:px-10 md:pt-16 md:pb-32 bg-[#040914]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-5xl mb-12">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#79ABFF] uppercase block mb-3">Methodology</span>
              <h2 className="font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.02em] text-white">
                The Path to a <span className="inline-flex items-center rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1.5 text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)]">Compounding Pipeline</span>
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-[1.8] text-white/68 max-w-3xl">
                We follow a clear four stage blueprint to build, test and scale your lead engine.
              </p>
            </div>

            {/* Horizontal Timeline Container */}
            <div className="relative mt-12">
              {/* Timeline Connector Line */}
              <div className="absolute top-[38px] left-[5%] right-[5%] h-px bg-white/[0.08] hidden lg:block" />

              <div className="grid gap-8 lg:grid-cols-4 relative z-10">
                {[
                  {
                    step: "01",
                    title: "Growth Roadmap Call",
                    desc: "60 minutes. We audit your search visibility, look at where leads should come from, and find exactly where your current pipeline is leaking."
                  },
                  {
                    step: "02",
                    title: "System Architecture",
                    desc: "We map your system: which modules, which traffic sources, what budget and what cost per lead target, before anything is built."
                  },
                  {
                    step: "03",
                    title: "Engine Implementation",
                    desc: "Every asset built and connected. Landing pages, paid search accounts, AI search setup and tracking."
                  },
                  {
                    step: "04",
                    title: "Optimisation and Scaling",
                    desc: "Weekly performance work, fresh creative and tracking checks that bring your cost to acquire a customer down over time."
                  }
                ].map((s, idx) => (
                  <motion.div
                    key={idx}
                    className="flex flex-col items-start"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    {/* Circle Node */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-[#081325]/90 text-sm font-bold text-[#CFE3FF] shadow-lg mb-6 relative hover:border-[#79ABFF] hover:bg-[#0c203a] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_rgba(0,102,255,0.15)]">
                      {s.step}
                    </div>
                    <h3 className="font-heading text-sm font-bold text-white mb-2">{s.title}</h3>
                    <p className="text-[11px] leading-relaxed text-white/50">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center">
              <button
                onClick={() => scrollToId("contact")}
                className="shine-sweep inline-flex items-center gap-2 rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-8 py-3.5 font-heading text-xs font-semibold text-white shadow-lg hover:-translate-y-0.5 transition-transform cursor-pointer"
              >
                Schedule Your Growth Roadmap →
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 7 — INLINE LEAD MAGNET
           ============================================================ */}
        <section id="checklist" className="relative z-10 w-full px-6 pt-12 pb-28 md:px-10 md:pt-16 md:pb-32 bg-[#050b14]/15">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-[#070f1a]/85 p-8 md:p-12 shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_50%_0%,rgba(0,102,255,0.08),transparent_50%)]" />

              <div className="relative z-10 grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-center">
                <div>
                  <span className="text-xs font-semibold tracking-[0.22em] text-[#79ABFF] uppercase block mb-3">Free Resource</span>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight text-white mb-4">
                    Find Your Lead <span className="inline-flex items-center rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1.5 text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)]">Leak First</span>
                  </h2>
                  <p className="text-xs md:text-sm text-white/60 leading-relaxed">
                    Most growing businesses lose interest from buyers in one of ten predictable places. Get the exact self diagnosis we use to find the leaks.
                  </p>
                  <p className="mt-3 text-xs md:text-sm font-semibold text-white/90 leading-relaxed">
                    Download: The Lead Leak Checklist — 10 Reasons Your Business Is Not Getting Leads
                  </p>
                  <p className="mt-3 text-xs md:text-sm text-[#79ABFF] leading-relaxed">
                    A 10 minute check covering traffic capture, AI search visibility and follow up. With the first fix for each leak.
                  </p>
                </div>

                <div className="bg-[#030712]/60 border border-white/10 rounded-[2rem] p-6 shadow-inner backdrop-blur-md">
                  <form onSubmit={handleChecklistSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="firstName" className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">First Name</label>
                      <div className="relative">
                        <User size={13} className="absolute left-3.5 top-3.5 text-[#79ABFF]/70" />
                        <input
                          id="firstName"
                          type="text"
                          required
                          placeholder="Your first name"
                          value={checklistForm.firstName}
                          onChange={(e) => setChecklistForm(prev => ({ ...prev, firstName: e.target.value }))}
                          disabled={checklistLoading}
                          className="w-full rounded-xl border border-white/[0.06] bg-[#070f1a] pl-10 pr-4 py-3 text-xs text-white outline-none placeholder:text-white/20 focus:border-[#79ABFF]/60 focus:ring-1 focus:ring-[#79ABFF]/30 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="checklistEmail" className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Business Email</label>
                      <div className="relative">
                        <Mail size={13} className="absolute left-3.5 top-3.5 text-[#79ABFF]/70" />
                        <input
                          id="checklistEmail"
                          type="email"
                          required
                          placeholder="you@company.com"
                          value={checklistForm.email}
                          onChange={(e) => setChecklistForm(prev => ({ ...prev, email: e.target.value }))}
                          disabled={checklistLoading}
                          className="w-full rounded-xl border border-white/[0.06] bg-[#070f1a] pl-10 pr-4 py-3 text-xs text-white outline-none placeholder:text-white/20 focus:border-[#79ABFF]/60 focus:ring-1 focus:ring-[#79ABFF]/30 transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Honeypot */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={checklistForm.honey}
                        onChange={(e) => setChecklistForm(prev => ({ ...prev, honey: e.target.value }))}
                      />
                    </div>

                    <InvisibleTurnstile onVerify={setChecklistToken} widgetRef={checklistTurnstileRef} />

                    <button
                      type="submit"
                      disabled={checklistLoading || checklistForm.firstName.trim().length === 0 || checklistForm.email.trim().length === 0}
                      className="shine-sweep group inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-5 py-3 font-heading text-xs font-semibold text-white shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    >
                      {checklistLoading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Sending Audit...
                        </>
                      ) : (
                        "Get the Checklist →"
                      )}
                    </button>
                  </form>

                  <AnimatePresence>
                    {checklistSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 rounded-xl bg-emerald-500/10 border border-emerald-400/20 p-3 text-[11px] text-emerald-300"
                      >
                        Checklist requested! We will send it to your email shortly.
                      </motion.div>
                    )}
                    {checklistError && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 rounded-xl bg-rose-500/10 border border-rose-400/20 p-3 text-[11px] text-rose-300"
                      >
                        {checklistError}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <p className="mt-3 text-[9px] text-center text-white/30">
                    No spam. Zero sales pitch. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 9 — RELATED SOLUTIONS
           ============================================================ */}
        <section className="relative z-10 w-full px-6 pt-12 pb-28 md:px-10 md:pt-16 md:pb-32 bg-transparent">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-5xl mb-12">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#79ABFF] uppercase block mb-3">Complete the System</span>
              <h2 className="font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.02em] text-white">
                Complete the <span className="inline-flex items-center rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1.5 text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)]">Growth Engine</span>
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-[1.8] text-white/68 max-w-3xl">
                Connect related systems into one synchronised engine.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  q: "Traffic arriving but your website not converting it?",
                  title: "Conversion Website System",
                  desc: "Pages engineered to turn visitors into enquiries.",
                  url: "/solutions/conversion-website-system",
                },
                {
                  q: "Want to win AI search before competitors wake up?",
                  title: "AI Marketing System",
                  desc: "GEO, AI automation and AI content.",
                  url: "/solutions/ai-marketing-system",
                },
              ].map((sol, idx) => (
                <Link
                  href={sol.url}
                  key={idx}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B1F3D]/45 p-6 transition-all duration-300 hover:bg-[#0B254E]/65 hover:border-[#8CB8FF]/25 hover:shadow-[0_20px_50px_rgba(0,102,255,0.06)] hover:-translate-y-1"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#79ABFF] mb-2">{sol.q}</p>
                  <h3 className="font-heading text-base font-bold text-white transition-colors group-hover:text-[#A8C9FF]">
                    {sol.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/60 mb-4">{sol.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-[#86B3FF]">
                    <span>Explore System</span>
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 10 — INSIGHTS
           ============================================================ */}
        {posts.length > 0 && (
          <section className="relative z-10 w-full px-6 pt-12 pb-28 md:px-10 md:pt-16 md:pb-32 bg-[#091a33]/15">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            <div className="mx-auto w-full max-w-7xl">
              <div className="max-w-5xl mb-12">
                <span className="text-xs font-semibold tracking-[0.22em] text-[#79ABFF] uppercase block mb-3">Resources</span>
                <h2 className="font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.02em] text-white">
                  Lead Generation <span className="inline-flex items-center rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1.5 text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)]">Insights</span>
                </h2>
                <p className="mt-5 text-[0.9375rem] leading-[1.8] text-white/68 max-w-3xl">
                  Practical guides and playbooks on filling your pipeline. No fluff.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {posts.map((post) => (
                  <Link
                    href={`/blog/${post.slug}`}
                    key={post.slug}
                    className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B1F3D]/45 transition-all duration-300 hover:bg-[#0B254E]/65 hover:border-[#8CB8FF]/25 hover:shadow-[0_20px_50px_rgba(0,102,255,0.06)] hover:-translate-y-1 flex flex-col h-full"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-[#0A1F3D]">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 250px"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-bold text-[#79ABFF] uppercase tracking-wider">
                          {post.category}
                        </span>
                        <h3 className="mt-2 font-heading text-sm font-bold text-white transition-colors group-hover:text-[#A8C9FF] leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-xs text-white/50 leading-relaxed line-clamp-3">{post.excerpt}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3 text-[10px] text-white/40">
                        <span>{post.displayDate}</span>
                        <span>{post.readingTime || "3 min read"}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
           SECTION 11 — FAQ
           ============================================================ */}
        <section id="faq" className="relative z-10 w-full px-6 pt-12 pb-28 md:px-10 md:pt-16 md:pb-32 bg-transparent">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <span className="text-xs font-semibold tracking-[0.22em] text-[#79ABFF] uppercase block mb-3">Q&A</span>
                <h2 className="font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.02em] text-white">
                  Frequently Asked <span className="inline-flex items-center rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1.5 text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)]">Questions</span>
                </h2>
                <p className="mt-5 text-[0.9375rem] leading-[1.8] text-white/68">
                  Questions about onboarding, lead generation and how the system works. Here are our most common answers.
                </p>
                <div className="mt-8">
                  <button
                    onClick={() => scrollToId("contact")}
                    className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#0A2D59]/70 px-6 py-3 text-xs font-semibold text-white transition-colors duration-300 hover:border-[#86B6FF]/60 hover:bg-[#09264C] cursor-pointer"
                  >
                    Contact our team
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>

              <div>
                <PremiumAccordion items={faqItems} />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 12 — CONTACT FORM
           ============================================================ */}
        <section id="contact" className="relative z-10 w-full px-6 pt-12 pb-28 md:px-10 md:pt-16 md:pb-32 bg-[#091a33]/15">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="mx-auto w-full max-w-7xl">
            <div className="mx-auto max-w-3xl">
              <div className="text-center mb-12">
                <span className="text-xs font-semibold tracking-[0.22em] text-[#79ABFF] uppercase block mb-3">Get Started</span>
                <h2 className="font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.02em] text-white">Tell Us About Your <span className="inline-flex items-center rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1.5 text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)]">Lead Problem</span></h2>
                <p className="mt-4 text-[0.9375rem] leading-[1.8] text-white/68 max-w-2xl mx-auto">
                  Fill this in and we will come back within 24 hours with our first honest read on where your pipeline is
                  leaking — before any call, any pitch, any commitment.
                </p>
              </div>

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-white/[0.03] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl md:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_0%,rgba(0,102,255,0.14),transparent_60%)]" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[36rem] w-[56rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.08),transparent_65%)] blur-3xl" />

              <form onSubmit={handleContactSubmit} className="relative z-10 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-white/60 mb-2">Name</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-3.5 text-[#79ABFF]" />
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        disabled={contactLoading}
                        className="w-full rounded-xl border border-white/12 bg-[#051429]/60 pl-10 pr-4 py-3 text-xs text-white outline-none backdrop-blur-sm placeholder:text-white/30 focus:border-[#79ABFF]/70"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-white/60 mb-2">Business Email</label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3.5 top-3.5 text-[#79ABFF]" />
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        disabled={contactLoading}
                        className="w-full rounded-xl border border-white/12 bg-[#051429]/60 pl-10 pr-4 py-3 text-xs text-white outline-none backdrop-blur-sm placeholder:text-white/30 focus:border-[#79ABFF]/70"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="website" className="block text-xs font-semibold text-white/60 mb-2">Website</label>
                    <input
                      id="website"
                      type="url"
                      placeholder="https://yourcompany.com"
                      value={contactForm.website}
                      onChange={(e) => setContactForm(prev => ({ ...prev, website: e.target.value }))}
                      disabled={contactLoading}
                      className="w-full rounded-xl border border-white/12 bg-[#051429]/60 px-4 py-3 text-xs text-white outline-none backdrop-blur-sm placeholder:text-white/30 focus:border-[#79ABFF]/70"
                    />
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-xs font-semibold text-white/60 mb-2">Monthly Marketing Budget Range</label>
                    <div className="relative">
                      <select
                        id="budget"
                        required
                        value={contactForm.budget}
                        onChange={(e) => setContactForm(prev => ({ ...prev, budget: e.target.value }))}
                        disabled={contactLoading}
                        className="w-full appearance-none rounded-xl border border-white/12 bg-[#051429]/60 px-4 py-3 text-xs text-white outline-none backdrop-blur-sm focus:border-[#79ABFF]/70"
                      >
                        <option value="" disabled className="bg-[#061124]">Select budget range</option>
                        <option value="Under $5,000" className="bg-[#061124]">Under $5,000 / mo</option>
                        <option value="$5,000 - $10,000" className="bg-[#061124]">$5,000 - $10,000 / mo</option>
                        <option value="$10,000 - $25,000" className="bg-[#061124]">$10,000 - $25,000 / mo</option>
                        <option value="$25,000 - $50,000" className="bg-[#061124]">$25,000 - $50,000 / mo</option>
                        <option value="$50,000+" className="bg-[#061124]">$50,000+ / mo</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-4 text-[#79ABFF] pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="challenge" className="block text-xs font-semibold text-white/60 mb-2">
                    What is your biggest lead challenge right now?
                  </label>
                  <div className="relative">
                    <MessageSquare size={14} className="absolute left-3.5 top-3.5 text-[#79ABFF]" />
                    <textarea
                      id="challenge"
                      required
                      rows={4}
                      placeholder="Describe your current lead generation struggles, what you have tried, and what metrics you are trying to hit..."
                      value={contactForm.challenge}
                      onChange={(e) => setContactForm(prev => ({ ...prev, challenge: e.target.value }))}
                      disabled={contactLoading}
                      className="w-full rounded-xl border border-white/12 bg-[#051429]/60 pl-10 pr-4 py-3 text-xs text-white outline-none backdrop-blur-sm placeholder:text-white/30 focus:border-[#79ABFF]/70 resize-none"
                    />
                  </div>
                </div>

                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={contactForm.honey}
                    onChange={(e) => setContactForm(prev => ({ ...prev, honey: e.target.value }))}
                  />
                </div>

                <InvisibleTurnstile onVerify={setContactToken} widgetRef={contactTurnstileRef} />

                <button
                  type="submit"
                  disabled={contactLoading || contactForm.name.trim().length === 0 || contactForm.email.trim().length === 0 || contactForm.challenge.trim().length < 10 || !contactForm.budget}
                  className="shine-sweep group inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-5 py-4 font-heading text-sm font-semibold text-white shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Get My Growth Roadmap →"
                  )}
                </button>
              </form>

              <AnimatePresence>
                {contactSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 rounded-xl bg-emerald-500/12 border border-emerald-400/35 p-4 text-xs text-emerald-100"
                  >
                    Your request was received! Our growth architects will analyze your challenges and get back to you with your Roadmap within 24 hours.
                  </motion.div>
                )}
                {contactError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 rounded-xl bg-rose-500/12 border border-rose-400/35 p-4 text-xs text-rose-100"
                  >
                    {contactError}
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="mt-4 text-xs italic text-center text-white/40">
                No commitment. No agency pitch. Just clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

        <EnterpriseFooter />
      </main>

      {/* ============================================================
         EXIT INTENT POPUP (MODAL)
         ============================================================ */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {showExitPopup && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowExitPopup(false)}
                className="fixed inset-0 bg-[#020813]/85 backdrop-blur-md z-0"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="relative w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden rounded-[2.5rem] border border-white/14 bg-[linear-gradient(155deg,#0a1c3b,#050d1f)] p-6 md:p-8 shadow-2xl backdrop-blur-2xl z-10"
              >
                {/* Close Button - Always visible at top-right of container */}
                <button
                  onClick={() => setShowExitPopup(false)}
                  className="absolute right-5 top-5 z-50 rounded-full border border-white/10 bg-white/[0.04] p-1.5 text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white cursor-pointer"
                >
                  <X size={16} />
                </button>

                {/* Scrollable Container Content Wrapper */}
                <div className="overflow-y-auto flex-1 pr-2 relative scrollbar-thin scrollbar-thumb-white/10 pt-2 pb-2">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_circle_at_50%_0%,rgba(0,102,255,0.18),transparent_60%)]" />

                  <div className="relative z-10 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#79ABFF] mb-2 block">
                      Wait! Before you leave...
                    </span>
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-3">
                      Find Your Lead Leak First.
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed mb-5 max-w-md mx-auto">
                      Download the Lead Leak Checklist and diagnose referral dependency, AI search invisibility, missing capture
                      systems, and broken follow up.
                    </p>

                    <form onSubmit={handleChecklistSubmit} className="space-y-3.5 text-left max-w-sm mx-auto">
                      <input
                        type="text"
                        required
                        placeholder="First Name"
                        value={checklistForm.firstName}
                        onChange={(e) => setChecklistForm(prev => ({ ...prev, firstName: e.target.value }))}
                        disabled={checklistLoading}
                        className="w-full rounded-xl border border-white/12 bg-[#051429]/60 px-4 py-3 text-xs text-white outline-none placeholder:text-white/30 focus:border-[#79ABFF]/70"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Business Email"
                        value={checklistForm.email}
                        onChange={(e) => setChecklistForm(prev => ({ ...prev, email: e.target.value }))}
                        disabled={checklistLoading}
                        className="w-full rounded-xl border border-white/12 bg-[#051429]/60 px-4 py-3 text-xs text-white outline-none placeholder:text-white/30 focus:border-[#79ABFF]/70"
                      />
                      {/* Honeypot */}
                      <div className="hidden" aria-hidden="true">
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={checklistForm.honey}
                          onChange={(e) => setChecklistForm(prev => ({ ...prev, honey: e.target.value }))}
                        />
                      </div>

                      <InvisibleTurnstile onVerify={setExitToken} widgetRef={exitTurnstileRef} />

                      <button
                        type="submit"
                        disabled={checklistLoading || checklistForm.firstName.trim().length === 0 || checklistForm.email.trim().length === 0}
                        className="shine-sweep group inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-5 py-3 font-heading text-xs font-semibold text-white shadow-md cursor-pointer disabled:opacity-50"
                      >
                        {checklistLoading ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Downloading...
                          </>
                        ) : (
                          "Send Me the Checklist →"
                        )}
                      </button>
                    </form>

                    <p className="mt-3 text-[9px] text-white/40">
                      No spam. One useful email. Unsubscribe any time.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* ============================================================
         SLIM STICKY BANNER
         ============================================================ */}
      <AnimatePresence>
        {showStickyBanner && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-xl overflow-hidden rounded-2xl border border-[#79ABFF]/25 bg-[linear-gradient(155deg,rgba(10,28,59,0.95),rgba(5,13,31,0.9))] p-3 shadow-2xl backdrop-blur-xl"
          >
            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0066FF]/20 text-[#8FB8FF] border border-[#0066FF]/30">
                  <Sparkles size={14} />
                </div>
                <p className="text-[11px] leading-tight text-white/90">
                  <span className="font-semibold text-white">Find Your Lead Leak:</span> Download the free Lead Leak Checklist now.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowExitPopup(true);
                  }}
                  className="rounded-lg bg-gradient-to-r from-[#0066FF] to-[#1552B6] border border-[#4D8EFF] px-3.5 py-1.5 text-[10px] font-semibold text-white shadow-md hover:-translate-y-0.5 transition-transform cursor-pointer"
                >
                  Download Checklist
                </button>
                <button
                  onClick={() => {
                    setDismissedSticky(true);
                    setShowStickyBanner(false);
                  }}
                  className="rounded-lg border border-white/10 bg-white/[0.04] p-1 text-white/50 hover:bg-white/[0.08] hover:text-white cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
