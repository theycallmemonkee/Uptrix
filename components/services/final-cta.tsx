"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

type Props = {
  title: string;
  description: string;
};

export function FinalCta({ title, description }: Props) {
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });

  return (
    <section className="px-6 pt-10 pb-20 md:px-10 md:pt-14 md:pb-24">
      <motion.div
        className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(140deg,#0E2D55_0%,#0D2950_32%,#143D74_100%)] px-6 py-14 shadow-[0_28px_100px_rgba(3,10,25,0.58)] md:px-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_24%,rgba(0,102,255,0.35),transparent_52%),radial-gradient(760px_circle_at_85%_0%,rgba(176,211,255,0.24),transparent_46%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_100%)]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 12 }).map((_, index) => (
            <motion.span
              key={index}
              className="absolute h-2 w-2 rounded-full bg-[#B8D7FF]/70 blur-[1px]"
              style={{
                left: `${8 + (index * 7) % 80}%`,
                top: `${10 + (index * 11) % 75}%`,
              }}
              animate={{ y: [0, -14, 0], opacity: [0.25, 0.8, 0.25] }}
              transition={{ duration: 3.2 + (index % 4), repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          ))}
        </div>

        <div className="relative text-center">
          <motion.h3
            className="font-heading text-3xl leading-tight font-semibold text-white md:text-5xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/78 md:text-lg"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            {description}
          </motion.p>

          <motion.div
            className="mt-9 inline-flex"
            animate={{ x: magnet.x, y: magnet.y }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-6 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_16px_40px_rgba(0,102,255,0.42)] transition-all duration-300 hover:border-[#A9CCFF]"
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                setMagnet({
                  x: (event.clientX - rect.left - rect.width / 2) * 0.18,
                  y: (event.clientY - rect.top - rect.height / 2) * 0.18,
                });
              }}
              onMouseLeave={() => setMagnet({ x: 0, y: 0 })}
            >
              <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_58%)]" />
              Start your premium growth journey
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
