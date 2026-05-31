"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Zap } from "lucide-react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

type Service = {
  title: string;
  description: string;
  category: string;
  image: string;
  href?: string;
};

const SERVICES: Service[] = [
  {
    title: "AI-Powered Search Engine Optimization",
    description: "Build sustainable organic growth through AI-powered technical SEO, content architecture, and AI-led search insights.",
    category: "AI SEO",
    image: "/services/seo.svg",
    href: "/services/seo",
  },
  {
    title: "Social Media Marketing",
    description: "Scale audience engagement with data-backed creative systems across social channels and community touchpoints.",
    category: "Social",
    image: "/services/social.svg",
    href: "/services/social-media",
  },
  {
    title: "Paid Marketing",
    description: "Drive profitable CAC and conversion velocity through predictive PPC frameworks and automated bidding precision.",
    category: "PPC",
    image: "/services/paid.svg",
    href: "/services/ppc",
  },
  {
    title: "Branding",
    description: "Craft positioning, voice, and visual systems that communicate trust and premium differentiation at enterprise scale.",
    category: "Brand",
    image: "/services/branding.svg",
    href: "/services/branding",
  },
  {
    title: "AI UGC Video Ads",
    description: "Create high-converting UGC-style video ads with AI avatars, voice cloning, and platform-optimized workflows.",
    category: "UGC Ads",
    image: "/services/ai-ugc-video-ads.svg",
    href: "/services/ai-ugc-video-ads",
  },
  {
    title: "Business Automation Solutions",
    description: "Automate lead workflows, CRM triggers, support routing, and reporting pipelines with AI systems.",
    category: "Automation",
    image: "/services/business-automation.svg",
    href: "/services/business-automation",
  },
];

function FeaturedServiceCard({ service, index }: { service: Service; index: number }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 110, damping: 22, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 110, damping: 22, mass: 0.8 });

  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);
  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);
  const glowX = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(smoothY, [0, 1], ["10%", "90%"]);
  const interactiveLight = useMotionTemplate`radial-gradient(240px circle at ${glowX} ${glowY}, rgba(0,102,255,0.22), transparent 70%)`;

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.65rem] border border-white/14 bg-[linear-gradient(160deg,rgba(14,34,64,0.72),rgba(7,18,37,0.62))] shadow-[0_22px_65px_rgba(2,9,22,0.45)] ring-1 ring-inset ring-white/9 backdrop-blur-2xl will-change-transform transition-colors duration-400 hover:border-[#85B5FF]/36 hover:shadow-[0_28px_80px_rgba(5,18,40,0.58)]"
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.72, delay: index * 0.09, ease: EASE }}
      whileHover={{ y: -10, scale: 1.015 }}
    >
      {/* Mouse-reactive glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{ background: interactiveLight }}
      />
      {/* Animated glow border */}
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-[1.65rem] opacity-0 transition-opacity duration-400 group-hover:opacity-50"
        style={{
          background: "linear-gradient(120deg, rgba(0,102,255,0.25), rgba(255,255,255,0.04), rgba(0,102,255,0.22))",
        }}
      />

      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.title} dashboard preview`}
          width={1440}
          height={900}
          priority={index < 2}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 24vw, (min-width: 768px) 45vw, 100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071023]/88 via-[#071023]/15 to-transparent" />
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(105deg, transparent 28%, rgba(255,255,255,0.08) 48%, transparent 68%), radial-gradient(ellipse at 50% 0%, rgba(0,102,255,0.18), transparent 55%)",
          }}
        />
      </div>

      <div className="relative flex flex-1 flex-col p-4 pt-5 md:p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#83B3FF]/30 bg-[#6EA8FF]/14 px-3 py-1 text-xs font-medium tracking-wide text-[#DCEBFF]">
            <Zap size={10} className="text-[#79ABFF]" />
            {service.category}
          </span>
        </div>
        <h3 className="font-heading text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#CFE3FF]">
          {service.title}
        </h3>
        <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-white/68">{service.description}</p>

        <div className="mt-auto flex items-center justify-end pt-5">
          <Link
            href={service.href || "/contact"}
            scroll
            className="group/btn inline-flex items-center gap-1.5 rounded-full border border-white/16 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-white/88 transition-all duration-300 hover:border-[#80B2FF]/42 hover:bg-[#0A2752]/55 hover:text-white"
          >
            Learn More
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedServices() {
  return (
    <section className="relative z-10 w-full px-6 pb-28 pt-10 md:px-10 md:pb-32">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <p className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase">
            ( OUR FEATURED SERVICES )
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl font-heading text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Precision Marketing Built For{" "}
            <span className="inline-flex items-center rounded-2xl border border-[#8DB8FF]/36 bg-[#7BABFF]/14 px-4 py-1.5 text-[#DDEBFF] shadow-[0_8px_24px_rgba(0,102,255,0.2)]">
              Enterprise Scale
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
            Every service is built on AI infrastructure, data precision, and outcome-led execution.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => (
            <FeaturedServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
