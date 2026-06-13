"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ServiceConfig } from "@/data/services";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  service: ServiceConfig;
};

export function WhyChooseSection({ service }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.2, once: true });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    if (service.slug === "ai-ugc-video-ads" || service.slug === "business-automation") {
      console.log("[why-choose] image sources", service.slug, service.whyVisuals);
    }
  }, [service.slug, service.whyVisuals]);

  return (
    <section ref={sectionRef} className="px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_1.02fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading text-3xl leading-tight font-bold tracking-tight text-white md:text-5xl">{service.whyTitle}</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/74 md:text-lg">{service.whyDescription}</p>
          
          <ul className="mt-6 space-y-3.5 max-w-xl">
            {service.whyBullets.map((bullet, index) => (
              <motion.li
                key={bullet}
                className="flex items-start gap-3 text-sm text-white/84 md:text-base"
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                transition={{ duration: 0.45, delay: 0.15 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <CheckCircle2 size={18} className="text-[#8CB9FF] shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </motion.li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-[#4D8EFF] bg-[#0D2D59]/66 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-[#93BEFF] hover:bg-[#103769]"
          >
            Discuss your growth goals
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.div
          className="group relative [perspective:1000px]"
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 9;
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * -9;
            setTilt({ rotateX: y, rotateY: x });
          }}
          onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
        >
          <motion.div
            className="relative overflow-hidden rounded-[1.8rem] border border-white/14 bg-white/[0.03] p-6 shadow-[0_26px_80px_rgba(3,12,28,0.5)] backdrop-blur-xl md:p-8"
            animate={tilt}
            transition={{ type: "spring", stiffness: 170, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(0,102,255,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(160,201,255,0.14),transparent_40%)]" />
            <div className="relative h-56 overflow-hidden rounded-2xl border border-[#8FB9FF]/18 md:h-64">
              <Image src={service.whyVisuals.mainImage} alt={`${service.name} strategic team visual`} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
              <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(6,17,34,0.18),rgba(6,17,34,0.78))]" />
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_35%_24%,rgba(255,255,255,0.18),transparent_46%)]"
                animate={{ opacity: [0.45, 0.82, 0.45] }}
                transition={{ duration: 4.6, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
              />
              <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/18 bg-[#0D2F5E]/62 px-3 py-2 text-xs text-[#DCEBFF] backdrop-blur-md">
                Premium execution stack with measurable growth loops.
              </div>
            </div>

            <motion.div
              className="absolute top-4 right-4 rounded-2xl border border-[#A8CBFF]/26 bg-[#0F3262]/84 px-4 py-2 text-xs text-[#E4F0FF] shadow-[0_12px_28px_rgba(0,102,255,0.26)] backdrop-blur-sm"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.6, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
            >
              10+ Years Experience
            </motion.div>

            <motion.div
              className="absolute -right-3 bottom-18 w-44 overflow-hidden rounded-2xl border border-white/16 shadow-[0_18px_40px_rgba(2,12,30,0.52)]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
            >
              <div className="relative aspect-[4/3]">
                <Image src={service.whyVisuals.analyticsImage} alt={`${service.name} analytics overlay`} fill className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,21,43,0.2),rgba(5,21,43,0.72))]" />
              </div>
            </motion.div>

            <motion.div
              className="absolute left-4 top-4 rounded-2xl border border-[#9CC3FF]/24 bg-[#0B2C57]/78 px-3 py-2 text-[11px] text-[#DDEBFF] shadow-[0_12px_24px_rgba(0,102,255,0.2)] backdrop-blur-sm"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: EASE }}
            >
              +187% qualified growth
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
