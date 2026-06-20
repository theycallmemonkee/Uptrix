"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { ArrowUpRight, Zap } from "lucide-react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Service = {
  title: string;
  description: string;
  category: string;
  image: string;
  href?: string;
};

const SERVICES: Service[] = [
  {
    title: "Demand Generation System",
    description: "Bring qualified leads to your business every month.",
    category: "Demand Generation",
    image: "/services/seo.svg",
    href: "/solutions/demand-generation-system",
  },
  {
    title: "Paid Growth System",
    description: "Turn ad spend into real, trackable revenue.",
    category: "Paid Growth",
    image: "/services/paid.svg",
    href: "/solutions/paid-growth-engine",
  },
  {
    title: "Conversion Website System",
    description: "Turn website visitors into enquiries.",
    category: "Conversion Website",
    image: "/services/social.svg",
    href: "/solutions/conversion-website-system",
  },
  {
    title: "Growth Foundation System",
    description: "Get your positioning, plan and 90 day roadmap.",
    category: "Growth Foundation",
    image: "/services/branding.svg",
    href: "/solutions/growth-foundation-system",
  },
  {
    title: "AI Marketing System",
    description: "Put AI to work where it actually grows revenue.",
    category: "AI Marketing",
    image: "/services/ai-ugc-video-ads.svg",
    href: "/solutions/ai-marketing-system",
  },
  {
    title: "Revenue Operations System",
    description: "Scale smoothly without the chaos.",
    category: "Revenue Operations",
    image: "/services/business-automation.svg",
    href: "/solutions/revenue-operations-system",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const headingContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const headingItemVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.94,
    rotateX: 8,
    filter: "blur(10px)",
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: EASE,
      delay: (index % 3) * 0.15,
    },
  }),
};

// ─── Card ─────────────────────────────────────────────────────────────────────

function FeaturedServiceCard({ service, index }: { service: Service; index: number }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 110, damping: 22, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 110, damping: 22, mass: 0.8 });

  const glowX = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(smoothY, [0, 1], ["10%", "90%"]);
  const interactiveLight = useMotionTemplate`radial-gradient(240px circle at ${glowX} ${glowY}, rgba(0,102,255,0.22), transparent 70%)`;

  return (
    <article
      className="group/card relative flex h-full w-full flex-col overflow-hidden rounded-[32px] border border-white/14 bg-[linear-gradient(160deg,rgba(14,34,64,0.72),rgba(7,18,37,0.62))] shadow-[0_22px_65px_rgba(2,9,22,0.45)] ring-1 ring-inset ring-white/9 backdrop-blur-2xl transition-all duration-400 hover:border-[#85B5FF]/36 hover:shadow-[0_36px_90px_rgba(5,18,40,0.68),0_0_60px_rgba(0,102,255,0.18)]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover/card:opacity-100"
        style={{ background: interactiveLight }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-[32px] opacity-0 transition-opacity duration-400 group-hover/card:opacity-50"
        style={{
          background: "linear-gradient(120deg, rgba(0,102,255,0.25), rgba(255,255,255,0.04), rgba(0,102,255,0.22))",
        }}
      />

      {/* Image Area (60%) */}
      <div className="relative h-[60%] w-full overflow-hidden shrink-0">
        <Image
          src={service.image}
          alt={`${service.title} preview`}
          fill
          priority={index < 2}
          className="object-cover object-top transition-transform duration-400 ease-out group-hover/card:scale-[1.05]"
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 48vw, 100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071023]/88 via-[#071023]/15 to-transparent" />
      </div>

      {/* Content Area (40%) */}
      <div className="relative flex h-[40%] flex-col justify-between p-5 md:p-6">
        <div className="flex flex-col gap-2">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#83B3FF]/28 bg-[#6EA8FF]/12 px-3 py-1 text-[11px] font-medium tracking-wide text-[#DCEBFF]">
              <Zap size={10} className="text-[#79ABFF]" />
              {service.category}
            </span>
          </div>
          <h3 className="font-heading text-base md:text-lg font-semibold tracking-tight text-white transition-colors duration-300 group-hover/card:text-[#CFE3FF] line-clamp-1">
            {service.title}
          </h3>
          <p className="text-xs md:text-sm text-white/65 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>
        <div className="border-t border-white/[0.06] pt-3">
          <Link
            href={service.href || "/contact"}
            scroll
            className="group/btn inline-flex items-center gap-1.5 rounded-full border border-white/14 bg-white/[0.05] px-3.5 py-1.5 text-[11px] font-medium text-white/85 transition-all duration-300 hover:border-[#80B2FF]/38 hover:bg-[#0A2752]/50 hover:text-white"
          >
            Learn More
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function FeaturedServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  return (
    <section ref={containerRef} className="relative z-10 w-full bg-[#020617] px-6 py-16 md:px-10 md:py-24">
      {/* Background grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.022]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Subtle radial highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px circle at 50% 0%, rgba(0,102,255,0.07), transparent 55%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1400px]">
        {/* Heading */}
        <motion.div
          className="text-center"
          variants={headingContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p
            variants={headingItemVariants}
            className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase"
          >
            OUR SOLUTIONS
          </motion.p>

          <motion.h2
            variants={headingItemVariants}
            className="mx-auto mt-4 max-w-3xl font-heading text-[clamp(1.875rem,4.5vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-white"
          >
            Six Systems. One Complete Growth Engine.
          </motion.h2>

          <motion.p
            variants={headingItemVariants}
            className="mx-auto mt-4 max-w-xl text-base leading-[1.75] text-white/65"
          >
            We do not sell channels or one-off services. We build complete systems,
            each one owning a part of your growth. Use the one you need, or connect
            several into one engine.
          </motion.p>
        </motion.div>

        {/* Card grid */}
        <div
          className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1400px] mx-auto"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 0%" }}
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.href}
              className="w-full aspect-square transform-gpu will-change-transform"
              variants={cardVariants}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                y: -8,
                transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
              }}
            >
              <FeaturedServiceCard service={service} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
