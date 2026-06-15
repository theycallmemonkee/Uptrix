"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const ROUTES = [
  {
    question: "Not Enough Leads?",
    system: "Demand Generation System",
    description: "Bring qualified leads to your business every month.",
    href: "/solutions/demand-generation-system",
  },
  {
    question: "Ads Not Performing?",
    system: "Paid Growth System",
    description: "Turn ad spend into real, trackable revenue.",
    href: "/solutions/paid-growth-engine",
  },
  {
    question: "Website Not Converting?",
    system: "Conversion Website System",
    description: "Turn website visitors into enquiries.",
    href: "/solutions/conversion-website-system",
  },
  {
    question: "No Clear Marketing Strategy?",
    system: "Growth Foundation System",
    description: "Get your positioning, plan and 90 day roadmap.",
    href: "/solutions/growth-foundation-system",
  },
  {
    question: "Falling Behind in AI?",
    system: "AI Marketing System",
    description: "Put AI to work where it actually grows revenue.",
    href: "/solutions/ai-marketing-system",
  },
  {
    question: "Growth Hard to Manage?",
    system: "Revenue Operations System",
    description: "Scale smoothly without the chaos.",
    href: "/solutions/revenue-operations-system",
  },
];

export function ProblemRouter() {
  return (
    <section id="problem-router" className="relative z-10 w-full px-6 pb-24 pt-8 md:px-10 md:pb-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="text-center">
          <p className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase">
            WHERE DO YOU NEED GROWTH?
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-white">
            What Is Holding Your Growth Back Right Now?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-[1.75] text-white/68 md:text-[1.0625rem]">
            Every business hits a different wall. Find yours below and see the system built to fix it.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ROUTES.map((route, index) => (
            <motion.div
              key={route.href}
              initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.68, delay: index * 0.06, ease: EASE }}
            >
              <Link
                href={route.href}
                className="group flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_60px_rgba(2,9,22,0.3)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#6EA6FF]/28 hover:bg-white/[0.055] hover:shadow-[0_28px_70px_rgba(0,102,255,0.1)]"
              >
                <div className="text-base font-semibold leading-snug text-white">{route.question}</div>
                <p className="mt-2.5 text-sm font-medium text-[#8DB8FF]">{route.system}</p>
                <p className="mt-3.5 flex-1 text-sm leading-[1.7] text-white/62">{route.description}</p>
                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-white/75 transition-all duration-300 group-hover:text-[#CFE3FF] group-hover:gap-2">
                  <span>See the system</span>
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
