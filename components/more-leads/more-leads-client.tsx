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
import { PremiumNavbar } from "@/components/premium-navbar";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { PremiumAccordion, type PremiumAccordionItem } from "@/components/ui/premium-accordion";
import { FloatingOrbs, AnimatedGrid, AIWaveOverlay, NoiseTexture } from "@/components/ui/visual-effects";
import { ClientLogoStrip } from "@/components/ui/client-logo-strip";

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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: checklistForm.firstName,
          email: checklistForm.email,
          message: "[Lead Magnet: Checklist] Requested download for the Lead Leak Checklist.",
          honey: checklistForm.honey,
          source_page: "/solutions/demand-generation-system",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setChecklistSuccess(true);
      localStorage.setItem("uptrix_checklist_downloaded", "true");
      setShowExitPopup(false);
      setShowStickyBanner(false);
      setChecklistForm({ firstName: "", email: "", honey: "" });
    } catch (err: any) {
      setChecklistError(err.message || "Network error. Please try again.");
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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.challenge,
          honey: contactForm.honey,
          website: contactForm.website,
          budget: contactForm.budget,
          source_page: "/solutions/demand-generation-system",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setContactSuccess(true);
      localStorage.setItem("uptrix_lead_converted", "true");
      setShowStickyBanner(false);
      setContactForm({ name: "", email: "", website: "", budget: "", challenge: "", honey: "" });
    } catch (err: any) {
      setContactError(err.message || "Network error. Please try again.");
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
        <section className="relative z-20 flex w-full flex-col overflow-hidden justify-center min-h-[90vh] px-6 pt-32 pb-16 md:px-10 md:pt-40 md:pb-24">
          {/* Watermark */}
          <p className="pointer-events-none absolute left-1/2 top-[55%] -z-10 -translate-x-1/2 -translate-y-1/2 text-center font-heading text-[14vw] leading-none font-bold tracking-[0.22em] text-white/[0.009] blur-[0.3px] md:text-[9rem]">
            UPTRIX
          </p>

          <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              className="relative max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {/* Eyebrow badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: EASE } },
                }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#79ABFF]/20 bg-[#0C2C57]/42 px-4 py-1.5 text-xs tracking-[0.2em] text-[#CFE3FF]/85 uppercase backdrop-blur-md"
              >
                <Sparkles size={11} className="text-[#79ABFF]" />
                Demand Generation System
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, delay: 0.08, ease: EASE } },
                }}
                className="font-heading text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl md:text-[clamp(42px,4.2vw,62px)] max-w-none"
              >
                Predictable Inbound Engines for B2B SaaS.
              </motion.h1>

              {/* Description */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, delay: 0.16, ease: EASE } },
                }}
                className="mt-6 space-y-4 max-w-2xl text-sm leading-relaxed text-white/70 mx-auto lg:mx-0 text-center lg:text-left"
              >
                <p>
                  We build a unified demand generation system that aggregates SEO, intent-driven paid social, and AI search presence to bring high-intent SQLs straight to your sales calendar.
                </p>
                <p className="font-semibold text-white/90">
                  Stop depending on hope. Build a compounding pipeline engine.
                </p>
              </motion.div>

              {/* Actions */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, delay: 0.28, ease: EASE } },
                }}
                className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto"
              >
                <button
                  onClick={() => scrollToId("contact")}
                  className="shine-sweep will-gpu group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-6 py-3.5 font-heading text-xs font-semibold text-white shadow-[0_12px_32px_rgba(0,102,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#86B6FF] hover:shadow-[0_16px_40px_rgba(0,102,255,0.38)] cursor-pointer"
                >
                  Contact Us →
                </button>
                <button
                  onClick={() => scrollToId("checklist")}
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-6 py-3.5 font-heading text-xs font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white hover:-translate-y-0.5 cursor-pointer"
                >
                  Download Free: The Lead Leak Checklist ↓
                </button>
              </motion.div>

              <motion.p
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { delay: 0.35 } },
                }}
                className="mt-3 text-xs italic text-white/40"
              >
                No commitment. We understand your situation first.
              </motion.p>
            </motion.div>

            {/* Visual Column - Dashboard Mockup */}
            <motion.div
              className="relative w-full max-w-xl lg:justify-self-end mt-12 lg:mt-0"
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            >
              {/* Main Dashboard Panel */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#081325]/90 p-5 shadow-[0_24px_70px_rgba(2,9,22,0.6)] backdrop-blur-2xl">
                {/* Window header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[10px] text-white/40 tracking-wider">inbound_engine_v2.0</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-white/[0.03] px-2.5 py-1 text-[9px] font-medium text-white/60 border border-white/[0.04]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#79ABFF] animate-pulse" />
                    <span>Active System</span>
                  </div>
                </div>

                {/* Grid of micro-reports */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  {/* Left Report */}
                  <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-3">
                    <p className="text-[10px] text-white/40 font-medium tracking-wide uppercase">Pipeline Value</p>
                    <p className="font-heading text-2xl font-bold text-white mt-1">$184,200</p>
                    <div className="flex items-center gap-1 mt-1 text-[9px] text-emerald-400 font-semibold">
                      <span>↑ 24%</span>
                      <span className="text-white/30 font-normal">vs last month</span>
                    </div>
                  </div>

                  {/* Right Report */}
                  <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-3">
                    <p className="text-[10px] text-white/40 font-medium tracking-wide uppercase">Conversion Rate</p>
                    <p className="font-heading text-2xl font-bold text-[#79ABFF] mt-1">3.4%</p>
                    <div className="flex items-center gap-1 mt-1 text-[9px] text-[#79ABFF] font-semibold">
                      <span>+1.2%</span>
                      <span className="text-white/30 font-normal">optimization lift</span>
                    </div>
                  </div>
                </div>

                {/* SVG Visual Graph */}
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-semibold text-white/70 uppercase tracking-wide">Daily Inbound Leads</p>
                    <div className="flex gap-2 text-[9px] text-white/40">
                      <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#0066FF]" /> SEO</span>
                      <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#79ABFF]" /> Paid</span>
                    </div>
                  </div>
                  {/* Styled simulated line graph */}
                  <div className="relative h-28 w-full">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                      <div className="border-b border-white/[0.08] w-full h-px" />
                      <div className="border-b border-white/[0.08] w-full h-px" />
                      <div className="border-b border-white/[0.08] w-full h-px" />
                    </div>

                    <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0066FF" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#0066FF" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Gradient fill */}
                      <path
                        d="M 0 90 Q 50 60 100 80 T 200 40 T 300 30 T 400 10 L 400 100 L 0 100 Z"
                        fill="url(#gradient)"
                      />
                      {/* Stroke lines */}
                      <motion.path
                        d="M 0 90 Q 50 60 100 80 T 200 40 T 300 30 T 400 10"
                        fill="none"
                        stroke="#0066FF"
                        strokeWidth="2.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                      <motion.path
                        d="M 0 95 Q 55 75 105 85 T 205 60 T 305 45 T 400 25"
                        fill="none"
                        stroke="#79ABFF"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Lead Feed Table */}
                <div className="rounded-xl border border-white/[0.04] bg-[#050b14] overflow-hidden">
                  <div className="border-b border-white/[0.06] bg-white/[0.02] px-3.5 py-2 flex items-center justify-between">
                    <p className="text-[9px] font-bold text-white/50 uppercase tracking-wider">Live Inbound Stream</p>
                    <span className="text-[8px] font-mono text-emerald-400">updating...</span>
                  </div>
                  <div className="divide-y divide-white/[0.04] text-[10px]">
                    {[
                      { name: "Acme Corp", source: "SEO (High-Intent)", status: "Qualified", time: "2m ago" },
                      { name: "Linear Systems", source: "Google Ads", status: "Qualified", time: "18m ago" },
                      { name: "Stripe Partner", source: "AI Search Citation", status: "Closed-Won", time: "1h ago" }
                    ].map((lead, idx) => (
                      <div key={idx} className="px-3.5 py-2.5 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span className="font-semibold text-white/90">{lead.name}</span>
                          <span className="text-[9px] text-white/40">• {lead.source}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-medium ${
                            lead.status === "Closed-Won" 
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-[#0066FF]/10 text-[#79ABFF] border border-[#0066FF]/20"
                          }`}>
                            {lead.status}
                          </span>
                          <span className="text-white/30 text-[9px]">{lead.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Metric Cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -left-8 bottom-12 w-44 rounded-2xl border border-white/[0.08] bg-[linear-gradient(155deg,rgba(10,24,47,0.95),rgba(5,11,20,0.85))] p-4 shadow-[0_12px_32px_rgba(2,9,22,0.5)] backdrop-blur-xl pointer-events-none"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold tracking-wider text-white/40 uppercase">Inbound SQLs</span>
                  <span className="flex h-4 w-4 items-center justify-center rounded bg-emerald-500/10 text-emerald-400 text-[9px]">↑</span>
                </div>
                <p className="mt-1 font-heading text-2xl font-bold text-white">3.4x</p>
                <p className="text-[9px] text-white/50 leading-relaxed mt-0.5">Pipeline growth achieved in 90 days</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -right-6 top-12 w-40 rounded-2xl border border-white/[0.08] bg-[linear-gradient(155deg,rgba(10,24,47,0.95),rgba(5,11,20,0.85))] p-4 shadow-[0_12px_32px_rgba(2,9,22,0.5)] backdrop-blur-xl pointer-events-none"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold tracking-wider text-white/40 uppercase">Average CPL</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0066FF]" />
                </div>
                <p className="mt-1 font-heading text-2xl font-bold text-[#79ABFF]">$2.27</p>
                <p className="text-[9px] text-white/50 leading-relaxed mt-0.5">Verified cost per qualified lead</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Jump Links Container */}
          <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 mt-16 border-t border-white/10 pt-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#79ABFF] mb-3 text-center lg:text-left">
              Jump to Section
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-xs font-semibold text-white/60">
              {[
                { label: "Why leads dry up", id: "why-leads-dry-up" },
                { label: "What is inside the system", id: "what-is-inside" },
                { label: "Who it is best for", id: "best-for" },
                { label: "Results", id: "results" },
                { label: "How it works", id: "how-it-works" },
                { label: "FAQ", id: "faq" },
                { label: "Contact", id: "contact" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToId(link.id)}
                  className="transition-colors hover:text-[#79ABFF] cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           LOGO STRIP
           ============================================================ */}
        <ClientLogoStrip
          title="Trusted by leaders at fast-growing enterprise companies"
          className="relative z-10 w-full pb-20 md:pb-24"
        />

        {/* AI wave overlay separator */}
        <AIWaveOverlay className="relative z-10 -mt-6 h-16 opacity-40" />

        {/* ============================================================
           SECTION 2 — MARKET REALITY & SYSTEM ALIGNMENT
           ============================================================ */}
        <section id="why-leads-dry-up" className="relative z-10 w-full px-6 py-28 md:px-10 md:py-32 border-b border-white/[0.04] bg-[#040914]">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
              {/* Left Column: Context & Title */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#79ABFF]">Market Reality</span>
                <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl max-w-none">
                  Why Standard Customer Acquisition Fails
                </h2>
                <p className="mt-6 text-sm leading-relaxed text-white/70">
                  Most B2B organizations scale tactics instead of systems. Juggling disparate search vendors, social managers, and design agencies results in disjointed attribution, high customer acquisition costs (CAC), and leaky pipelines.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  A unified demand system replaces isolated channels with a cohesive machine where every click builds commercial intent.
                </p>
                
                <div className="mt-8 rounded-2xl border border-[#79ABFF]/15 bg-[#0066FF]/5 p-5 shadow-inner">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#79ABFF] block mb-1">
                    System Formula
                  </span>
                  <p className="text-xs font-semibold text-white/90 leading-relaxed">
                    Demand Generation = SEO + AI Search Citation + Paid Search/Social Ads + Custom High-Intent Lead Captures
                  </p>
                </div>
              </div>

              {/* Right Column: Comparative Alignments */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                  <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-white/40 mb-4">The Bottlenecks</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Referral Dependency", desc: "Word-of-mouth is a bonus, not a scale model. It creates a volatile pipeline with zero monthly predictability." },
                      { title: "Siloed Channels & Leaks", desc: "SEO traffic without conversion copy is waste. Ads without dedicated landing pages represent burned budget." },
                      { title: "Empty Pipeline & Lack of Data", desc: "Vague web dashboards that track impressions instead of cost per lead (CPL) and sales conversations." }
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

                <div className="rounded-2xl border border-[#79ABFF]/10 bg-[#071329]/40 p-6">
                  <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-[#79ABFF] mb-4">The Solution</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Compounding Inbound Engine", desc: "Organic authority and AI search citations that scale brand footprint without increasing monthly media costs." },
                      { title: "Unified Conversion Layers", desc: "Every touchpoint is integrated into custom captures and instant automated nurture workflows." },
                      { title: "ROI Accountability", desc: "One team accountable to a single growth metric: cost per qualified sales meeting." }
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
        <section id="what-is-inside" className="relative z-10 w-full px-6 py-28 md:px-10 md:py-32 bg-[#050b14]/30">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="w-full mb-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#79ABFF]">System Components</span>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl max-w-none">
                The Core Modules We Build & Run
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-4xl">
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
                  desc: "Dominate classical search engines and modern AI chat tools (ChatGPT, Gemini, Perplexity). We structure your digital footprint to ensure your solution is cited wherever prospects ask questions.",
                  outcome: "A continuous flow of organic, high-intent buyers seeking immediate answers."
                },
                {
                  mod: "Module 02",
                  name: "Paid Acquisition Engine",
                  runs: "Intent-Targeted Ads (Meta, Google, LinkedIn)",
                  desc: "Scale paid acquisition campaigns governed strictly by target acquisition cost (CAC). We build targeting schemas and update creative assets weekly to bypass ad fatigue ceiling.",
                  outcome: "Immediate pipeline velocity that keeps sales calendars filled."
                },
                {
                  mod: "Module 03",
                  name: "Authority Content Loop",
                  runs: "Content Assets & Social Amplification",
                  desc: "Generate industry content addressing the exact commercial concerns of your target accounts. Every piece is built to build brand trust and fuel retargeting audiences.",
                  outcome: "Higher buyer conversion rates and lower overall paid advertising costs."
                },
                {
                  mod: "Module 04",
                  name: "Lead Capture & Funnel Automation",
                  runs: "High-Speed Landing Pages + CRM Integrations",
                  desc: "Bridge the gap between visitor traffic and sales pipeline. We construct high-converting Next.js landing pages, lead capture components, and instant automated qualification workflows.",
                  outcome: "Sub-second load times and 24/7 lead scoring and routing."
                }
              ].map((m, idx) => (
                <motion.article
                  key={idx}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.01] p-8 transition-all duration-300 hover:border-[#79ABFF]/30 hover:bg-white/[0.03] shadow-lg hover:shadow-2xl"
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
        <section id="results" className="relative z-10 w-full px-6 py-28 md:px-10 md:py-32 border-t border-white/[0.04] bg-[#040914]">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="w-full mb-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#79ABFF]">Proven Case Study</span>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl max-w-none">
                Scaling Inbound Pipeline by 240%
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-4xl">
                How we deployed our demand generation system for an enterprise B2B SaaS provider, replacing cold outreach as their primary pipeline driver.
              </p>
            </div>

            {/* Premium Card Layout */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-[#070f1a]/80 p-8 md:p-12 shadow-2xl backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_100%_0%,rgba(0,102,255,0.08),transparent_50%)]" />

              <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
                {/* Left Side: Summary & Quote */}
                <div>
                  <span className="inline-flex rounded bg-[#0066FF]/10 border border-[#0066FF]/20 px-2.5 py-1 text-[9px] font-semibold tracking-wider text-[#79ABFF] uppercase mb-4">
                    Enterprise SaaS Client
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white mb-5 leading-snug">
                    Overhauling Outbound with Predictable Inbound Demand
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed mb-6">
                    Prior to partnering, the client relied on raw volume cold email campaigns that were seeing decaying conversion rates. By mapping transactional search intent, establishing SGE/AI engine authority, and building conversion landing pages, inbound replaced outbound within 90 days.
                  </p>

                  <div className="border-l-2 border-[#79ABFF] pl-4 italic text-sm text-[#CFE3FF]">
                    <p className="leading-relaxed">
                      "Our marketing pipeline completely flipped. We are now generating higher-quality leads at a fraction of our previous acquisition cost."
                    </p>
                    <span className="block mt-2 text-[10px] font-bold uppercase tracking-wider text-white/40 not-italic">
                      VP OF GROWTH — B2B CLOUD PLATFORM
                    </span>
                  </div>
                </div>

                {/* Right Side: Metrics Grid */}
                <div className="space-y-6">
                  {[
                    { label: "Pipeline Scale Value", value: "240%", bar: "w-full" },
                    { label: "Increase in Inbound SQLs", value: "3.4x", bar: "w-[85%]" },
                    { label: "Reduction in CPA/CAC", value: "32%", bar: "w-[68%]" }
                  ].map((metric, idx) => (
                    <div key={idx} className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-4">
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
                Explore all verified case studies →
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 5 — QUALIFICATION & VERTICALS
           ============================================================ */}
        <section id="best-for" className="relative z-10 w-full px-6 py-28 md:px-10 md:py-32 border-t border-white/[0.04] bg-[#050b14]/15">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-start">
              {/* Left Column: Qualification */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#79ABFF]">Qualification</span>
                <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl max-w-none">
                  Is This Engine Aligned With Your Business?
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/70 max-w-xl">
                  The demand generation system is not a quick fix for struggling offers. It is designed to scale companies that have proven product-market fit but lack a systematic client acquisition channel.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "You rely on referrals and want control over your monthly lead velocity.",
                    "You have an offer that sells consistently when you get in front of the right buyers.",
                    "You want a single growth team to handle the strategy, copy, design, ads, and technical SEO.",
                    "You are prepared to invest for 90 days to let the compounding search assets scale."
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
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.01] p-6 md:p-8 shadow-xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#79ABFF] block mb-4">
                  Ecosystem Alignment
                </span>
                <div className="grid gap-4 text-xs">
                  {[
                    { title: "B2B and SaaS Platforms", desc: "Demo and trial booking optimization. Dynamic search capturing and LinkedIn buyer loops." },
                    { title: "Enterprise Professional Services", desc: "Positioning practitioners as high-authority answers in AI query results." },
                    { title: "High-Growth Startups", desc: "Deploying GTM infrastructure rapidly to hit board goals in 90 days." },
                    { title: "Healthcare & Fintech Services", desc: "Scale pipeline under strict privacy guidelines and compliant architectures." }
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
        <section id="how-it-works" className="relative z-10 w-full px-6 py-28 md:px-10 md:py-32 border-t border-white/[0.04] bg-[#040914]">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="w-full mb-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#79ABFF]">Methodology</span>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl max-w-none">
                The Path to a Compounding Pipeline
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-4xl">
                We follow a strict, four-stage implementation blueprint to construct, test, and scale your inbound demand machine.
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
                    title: "Growth Audit & Diagnosis",
                    desc: "60 minutes. We audit search visibility, analyze conversion ceilings, and isolate where current pipeline is leaking."
                  },
                  {
                    step: "02",
                    title: "System Architecture",
                    desc: "We construct a map of your system: modules, traffic sources, retargeting pools, and CPL target thresholds."
                  },
                  {
                    step: "03",
                    title: "Engine Implementation",
                    desc: "Every asset built and integrated. Next.js landing pages, paid search accounts, AI search schema, tracking."
                  },
                  {
                    step: "04",
                    title: "Optimization & Scaling",
                    desc: "Weekly performance optimizations, creative additions, and attribution checks to lower customer acquisition cost."
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
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#79ABFF]/25 bg-[#081325]/90 text-sm font-bold text-[#CFE3FF] shadow-xl mb-6 relative hover:border-[#79ABFF] hover:text-white transition-colors">
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
                Schedule Your Growth Audit →
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 7 — INLINE LEAD MAGNET
           ============================================================ */}
        <section id="checklist" className="relative z-10 w-full px-6 py-28 md:px-10 md:py-32 border-t border-white/[0.04] bg-[#050b14]/15">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-[#070f1a]/80 p-8 md:p-12 shadow-2xl backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_50%_0%,rgba(0,102,255,0.08),transparent_50%)]" />

              <div className="relative z-10 grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#79ABFF]">Free Resource</span>
                  <h2 className="mt-4 font-heading text-2xl md:text-3xl font-bold leading-tight text-white">
                    Audit Your Pipeline Bottlenecks
                  </h2>
                  <p className="mt-4 text-xs text-white/60 leading-relaxed">
                    Most growing businesses lose inbound interest in one of ten predictable places. Get the exact self-diagnosis framework we use to isolate leaks.
                  </p>
                  <p className="mt-3 text-xs font-semibold text-white/90 leading-relaxed">
                    Download: The Lead Leak Checklist — 10 Reasons Your Pipeline Is Stuck
                  </p>
                  <p className="mt-3 text-xs text-[#79ABFF] leading-relaxed">
                    A 10-minute audit covering traffic capturing, AI search citations, and follow-up loops. Complete with the primary fix for each bottleneck.
                  </p>
                </div>

                <div className="bg-[#030712] border border-white/[0.06] rounded-2xl p-6 shadow-inner">
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
        <section className="relative z-10 w-full px-6 py-28 md:px-10 md:py-32 bg-transparent">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="w-full mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#79ABFF]">Synergy</span>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl max-w-none">
                Complete the Growth Engine
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-4xl">
                Accelerate your marketing efficiency by connecting related solution modules into a single synchronized framework.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  q: "Leads coming in but not turning into sales?",
                  title: "AI Lead Conversion System",
                  desc: "Automated scoring, nurture and follow up.",
                  url: "/solutions/ai-lead-conversion-system",
                },
                {
                  q: "Traffic arriving but your website not converting it?",
                  title: "Conversion Website System",
                  desc: "Pages engineered to turn visitors into enquiries.",
                  url: "/solutions/conversion-website-system",
                },
                {
                  q: "Want to dominate AI search before competitors wake up?",
                  title: "AI Marketing System",
                  desc: "GEO, AI automation and AI content.",
                  url: "/solutions/ai-marketing-system",
                },
              ].map((sol, idx) => (
                <Link
                  href={sol.url}
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1F3D]/45 p-6 transition-all duration-300 hover:bg-[#0B254E]/65 hover:border-[#8CB8FF]/25 hover:shadow-lg"
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
          <section className="relative z-10 w-full px-6 py-28 md:px-10 md:py-32 border-t border-white/[0.04] bg-[#091a33]/15">
            <div className="mx-auto w-full max-w-[1440px]">
              <div className="w-full mb-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#79ABFF]">Resources</span>
                <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl max-w-none">
                  Lead Generation Insights
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-4xl">
                  Deep dives, checklists, and execution playbooks covering B2B customer acquisition and pipeline conversion.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {posts.map((post) => (
                  <Link
                    href={`/blog/${post.slug}`}
                    key={post.slug}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1F3D]/45 transition-all duration-300 hover:bg-[#0B254E]/65 hover:border-[#8CB8FF]/25 shadow-md flex flex-col h-full"
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
        <section id="faq" className="relative z-10 w-full px-6 py-28 md:px-10 md:py-32 border-t border-white/[0.04]">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#79ABFF]">Q&A</span>
                <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/70">
                  Got questions about our onboarding, lead generation metrics, or system features? Review our answers to
                  our most common client queries.
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
        <section id="contact" className="relative z-10 w-full px-6 py-28 md:px-10 md:py-32 border-t border-white/[0.04] bg-[#091a33]/15">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="mx-auto max-w-3xl">
              <div className="text-center mb-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#79ABFF]">Get Started</span>
                <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl max-w-none">Tell Us About Your Lead Problem</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-2xl mx-auto">
                  Fill this in and we will come back within 24 hours with our first honest read on where your pipeline is
                  leaking — before any call, any pitch, any commitment.
                </p>
              </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-xl md:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_0%,rgba(0,102,255,0.14),transparent_60%)]" />

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
