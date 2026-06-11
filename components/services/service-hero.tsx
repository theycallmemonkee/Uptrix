"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { ServiceConfig } from "@/data/services";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  service: ServiceConfig;
};

function highlightHeadline(headline: string, keyword: string) {
  if (!headline.includes(keyword)) return headline;
  const [prefix, suffix] = headline.split(keyword);
  return (
    <>
      {prefix}
      <span className="inline-flex rounded-2xl border border-[#9FC5FF]/30 bg-[#8AB8FF]/12 px-3 py-1 text-[#EAF2FF] shadow-[0_8px_24px_rgba(0,102,255,0.18)]">
        {keyword}
      </span>
      {suffix}
    </>
  );
}

export function ServiceHero({ service }: Props) {
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!service.heroVisuals) return;

    if (service.slug === "ai-ugc-video-ads" || service.slug === "business-automation") {
      console.log(
        "[service-hero] hero images",
        service.slug,
        {
          dashboardImage: service.heroVisuals.dashboardImage,
          chartImage: service.heroVisuals.chartImage,
          workspaceImage: service.heroVisuals.workspaceImage,
        }
      );
    }
  }, [
    service.slug,
    service.heroVisuals,
  ]);

  return (
    <section className="relative flex w-full flex-col overflow-hidden justify-center min-h-[85vh] lg:h-[88vh] lg:min-h-[620px] lg:max-h-[820px] pt-28 pb-10 px-6 md:px-10">
      {/* Background radial glows */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(0,102,255,0.22),transparent_58%),radial-gradient(760px_circle_at_86%_24%,rgba(138,184,255,0.12),transparent_62%)]" />
      <motion.div
        className="pointer-events-none absolute -top-24 right-[-10rem] -z-10 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.32),transparent_68%)] blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.45, 0.72, 0.45] }}
        transition={{ duration: 7.2, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <motion.div
        className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-[#9FC5FF]/20 bg-[#0C2C57]/42 px-3.5 py-1 text-xs tracking-[0.22em] text-[#CFE3FF]/85 uppercase backdrop-blur-md">
            Uptrix {service.shortLabel} Systems
          </div>
          <h1 className="mt-4 font-heading text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-5xl md:text-[clamp(56px,5vw,78px)]">
            {highlightHeadline(service.headline, service.highlightedKeyword)}
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70">{service.heroDescription}</p>

          <motion.div
            className="mt-8 inline-flex"
            animate={{ x: magnet.x, y: magnet.y }}
            transition={{ type: "spring", stiffness: 170, damping: 14, mass: 0.85 }}
          >
            <Link
              href="/contact"
              className="shine-sweep group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-5 py-3 font-heading text-xs font-semibold text-white shadow-[0_12px_32px_rgba(0,102,255,0.28)] transition-colors duration-300 hover:border-[#98C0FF]"
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                setMagnet({
                  x: (event.clientX - rect.left - rect.width / 2) * 0.15,
                  y: (event.clientY - rect.top - rect.height / 2) * 0.15,
                });
              }}
              onMouseLeave={() => setMagnet({ x: 0, y: 0 })}
            >
              <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.22),transparent_52%)]" />
              {service.ctaLabel}
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative hidden h-[26rem] lg:block"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute -top-8 right-10 h-36 w-36 rounded-full bg-[radial-gradient(circle_at_center,rgba(130,178,255,0.45),transparent_65%)] blur-3xl"
            animate={{ y: [0, -10, 0], opacity: [0.42, 0.72, 0.42] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
          />

          <motion.div
            className="absolute top-6 right-0 w-[74%] overflow-hidden rounded-3xl border border-white/12 shadow-[0_18px_50px_rgba(3,11,28,0.45)]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={service.heroVisuals.dashboardImage}
                alt={`${service.name} dashboard mockup`}
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(170deg,rgba(4,17,36,0.1),rgba(4,17,36,0.72))]" />
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-6 left-0 w-[54%] overflow-hidden rounded-2xl border border-[#9DC6FF]/20 bg-[#0B2E5A]/72 shadow-[0_14px_40px_rgba(0,102,255,0.18)] backdrop-blur-md"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={service.heroVisuals.chartImage}
                alt={`${service.name} analytics chart`}
                fill
                sizes="(min-width: 1024px) 24vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(3,18,40,0.2),rgba(3,18,40,0.76))]" />
            </div>
            <div className="absolute right-3 bottom-3 rounded-xl border border-white/20 bg-[#0A2A50]/78 px-2.5 py-1 text-[10px] tracking-[0.14em] text-[#D8E9FF] uppercase">
              Live Growth
            </div>
          </motion.div>

          <motion.div
            className="absolute -bottom-4 right-8 w-[40%] overflow-hidden rounded-2xl border border-white/10"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 6.8, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
          >
            <div className="relative aspect-[1/1]">
              <Image
                src={service.heroVisuals.workspaceImage}
                alt={`${service.name} workspace team`}
                fill
                sizes="(min-width: 1024px) 18vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,20,40,0.15),rgba(5,20,40,0.8))]" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
