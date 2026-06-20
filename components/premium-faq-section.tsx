"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, PhoneCall } from "lucide-react";
import { useMemo, useRef, useSyncExternalStore } from "react";
import { PremiumAccordion, type PremiumAccordionItem } from "@/components/ui/premium-accordion";
import type { SanityFaqItem, SanityGlobalSettings } from "@/lib/sanity";

const EASE = [0.22, 1, 0.36, 1] as const;

const DEFAULT_FAQS: PremiumAccordionItem[] = [
  {
    id: "services",
    question: "What does Uptrix Technologies actually do?",
    answer:
      "We build AI powered growth systems for businesses. Instead of selling separate services, we build connected engines that bring you leads, convert them into customers and help you scale. You can use one system or combine several into one growth engine.",
  },
  {
    id: "type",
    question: "Do you work with my type of business?",
    answer:
      "Yes. We build systems for D2C, ecommerce, startups, local and service businesses, B2B, professional services and regulated industries. The systems adapt to your business. The goal of more customers and more revenue stays the same.",
  },
  {
    id: "custom",
    question: "Do you create custom strategies or use templates?",
    answer:
      "Every system is built for your specific business, your market and your goals. We start by understanding where you are, then build the system that fits. No templates, no one size fits all.",
  },
  {
    id: "measurement",
    question: "How do you measure success?",
    answer:
      "By real business outcomes, leads, customers and revenue, not vanity metrics like impressions or reach. Every system connects to one clear growth number you actually care about.",
  },
  {
    id: "start",
    question: "How do I get started with Uptrix Technologies?",
    answer:
      "Contact us and we will come back within 24 hours with a first honest read on where your growth is stuck and which system fixes it. No commitment, no pitch, just clarity.",
  },
];

export interface PremiumFaqSectionProps {
  faqs?: SanityFaqItem[] | null
  settings?: SanityGlobalSettings | null
  className?: string
}

export function PremiumFaqSection({ faqs, settings, className }: PremiumFaqSectionProps = {}) {
  const phone = settings?.phone ?? "+91-9266 893 997";

  const faqItems: PremiumAccordionItem[] =
    faqs && faqs.length > 0
      ? faqs.map((f, i) => ({ id: f._id ?? String(i), question: f.question, answer: f.answer }))
      : DEFAULT_FAQS;
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.45);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 22, mass: 0.75 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 22, mass: 0.75 });

  const glowX = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(smoothY, [0, 1], ["10%", "86%"]);
  const movingLight = useMotionTemplate`radial-gradient(720px circle at ${glowX} ${glowY}, rgba(0,102,255,0.18), transparent 64%)`;

  const parallaxX = useTransform(smoothX, [0, 1], [-14, 14]);
  const parallaxY = useTransform(smoothY, [0, 1], [-12, 12]);

  const contactCardX = useTransform(parallaxX, (v) => v * -0.65);
  const contactCardY = useTransform(parallaxY, (v) => v * 0.6);
  const zero = useMotionValue(0);

  const headingVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18 },
      show: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
      }),
    }),
    [],
  );

  return (
    <section
      ref={containerRef}
      className={`relative z-10 w-full overflow-hidden px-6 md:px-10 ${className ?? "pb-24 pt-8 md:pb-32"}`}
      onMouseMove={(event) => {
        if (!mounted) return;
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.45);
      }}
    >
      <motion.div className="pointer-events-none absolute inset-0 -z-30" style={mounted ? { background: movingLight } : undefined} />
      <div className="pointer-events-none absolute inset-0 -z-40 opacity-45 [mask-image:radial-gradient(ellipse_at_center,black_54%,transparent_90%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:74px_74px]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl items-start gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <PremiumAccordion items={faqItems} />
        </motion.div>

        <div className="relative">
          <motion.h2
            className="font-heading text-[clamp(1.75rem,3.5vw,3rem)] leading-tight font-semibold tracking-[-0.02em] text-white"
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.span custom={0.05} variants={headingVariants} className="block">
              Frequently Asked Questions{" "}
              <span className="inline-flex items-center rounded-2xl border border-[#8DB8FF]/32 bg-[#7BABFF]/12 px-3.5 py-1 text-[#DDEBFF] shadow-[0_10px_30px_rgba(0,102,255,0.16)]">
                (FAQs)
              </span>
            </motion.span>
          </motion.h2>

          <motion.p
            custom={0.12}
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="mt-5 text-base leading-[1.8] text-white/68"
          >
            Transparent answers, enterprise-ready execution, and a strategy-first approach—built for premium AI-powered growth.
          </motion.p>

          <motion.div
            className="relative mt-10"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.article
              className="group relative overflow-hidden rounded-[2rem] border border-white/16 bg-white/[0.06] p-4 shadow-[0_28px_90px_rgba(3,10,24,0.6)] ring-1 ring-inset ring-white/10 backdrop-blur-2xl"
          style={{ x: mounted ? parallaxX : zero, y: mounted ? parallaxY : zero }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="pointer-events-none absolute -inset-[1px] opacity-55"
                animate={{ opacity: [0.35, 0.62, 0.35] }}
                transition={{ duration: 4.6, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
                style={{
                  background:
                    "linear-gradient(120deg, rgba(0,102,255,0.22), rgba(255,255,255,0.05), rgba(0,102,255,0.2))",
                }}
              />

              <div className="relative overflow-hidden rounded-[1.4rem]">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1400&q=80"
                  alt="Marketing strategy meeting"
                  width={1200}
                  height={820}
                  className="h-[22rem] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] md:h-[24rem]"
                  sizes="(min-width: 1024px) 44vw, 100vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071022]/80 via-transparent to-transparent" />
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/14 to-transparent"
                  initial={{ x: "-120%" }}
                  whileInView={{ x: "120%" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                />
              </div>
            </motion.article>

            <motion.aside
              className="absolute -left-2 top-10 w-[min(20rem,86%)] overflow-hidden rounded-[1.7rem] border border-[#86B6FF]/28 bg-[linear-gradient(155deg,rgba(18,43,82,0.88),rgba(8,21,43,0.72))] p-5 shadow-[0_20px_60px_rgba(2,9,22,0.52),0_4px_18px_rgba(0,102,255,0.14)] ring-1 ring-inset ring-white/10 backdrop-blur-2xl sm:left-6 sm:w-72"
              style={{
            x: mounted ? contactCardX : zero,
            y: mounted ? contactCardY : zero,
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.14),transparent_50%),radial-gradient(circle_at_82%_12%,rgba(0,102,255,0.22),transparent_48%)]" />

              <div className="relative z-10">
                <p className="text-[10px] font-medium tracking-[0.22em] text-[#A8C9FF]/78 uppercase">
                  Call Us Now!
                </p>
                <p className="mt-2 font-heading text-2xl font-semibold tracking-tight text-white">{phone}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/14 bg-white/[0.06] text-[#9AC0FF]">
                    <PhoneCall size={18} />
                  </span>
                  <p className="text-sm leading-6 text-white/70">Speak to a strategist and get a clear growth plan.</p>
                </div>

                <motion.div
                  className="mt-5"
                  animate={{ x: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 14, mass: 0.8 }}
                >
                  <Link
                    href="/contact"
                    scroll
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-4 py-3 font-heading text-sm font-medium text-white shadow-[0_10px_28px_rgba(0,102,255,0.32)] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Contact Team
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              </div>
            </motion.aside>

            <motion.div
              className="pointer-events-none absolute -right-6 -bottom-8 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.35),transparent_62%)] blur-2xl"
              animate={{ opacity: [0.35, 0.75, 0.35], scale: [1, 1.1, 1] }}
              transition={{ duration: 5.6, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

