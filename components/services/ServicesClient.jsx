"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/services";

const EASE = [0.22, 1, 0.36, 1];

export function ServicesClient() {
  return (
    <section className="px-6 pb-24 md:px-10 md:pb-28">
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {SERVICES.map((service, index) => (
          <Link href={service.href} key={service.slug} className="group block h-full">
            <motion.article
              className="relative overflow-hidden rounded-[1.85rem] border border-white/12 bg-[linear-gradient(160deg,rgba(11,31,58,0.98),rgba(7,18,37,0.97))] shadow-[0_22px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#85B5FF]/30 hover:shadow-[0_28px_90px_rgba(0,102,255,0.15)] h-full flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.05, ease: EASE }}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.7rem]">
                <Image
                  src={service.cardImage}
                  alt={`${service.cardTitle} preview`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,17,36,0.08),rgba(4,17,36,0.7))]" />
              </div>
              <div className="p-6 flex flex-1 flex-col justify-between">
                <div>
                  <span className="inline-flex rounded-full border border-[#84B2FF]/20 bg-[#6C96D6]/12 px-3 py-1 text-[11px] font-medium tracking-[0.22em] text-[#DCEBFF]">
                    {service.cardCategory}
                  </span>
                  <h2 className="mt-4 font-heading text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-[#A8C9FF]">{service.cardTitle}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/70">{service.cardDescription}</p>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div
                    className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white transition duration-300 group-hover:border-[#7FB0FF]/42 group-hover:bg-[#0A2F56]/70"
                  >
                    Learn More
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </section>
  );
}
