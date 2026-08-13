"use client";

import { motion } from "framer-motion";
import { Calendar, Rocket, ShieldCheck, Layers } from "lucide-react";
import { ClientLogoStrip } from "@/components/ui/client-logo-strip";

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { icon: Calendar,    stat: "10+",  label: "Years of expertise" },
  { icon: Rocket,      stat: "200+", label: "Growth projects" },
  { icon: ShieldCheck, stat: "98%+", label: "Client retention" },
  { icon: Layers,      stat: "12+",  label: "Industries served" },
] as const;

export function TrustedCompanies() {
  return (
    <div className="relative z-10 w-full py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.p
          className="text-center font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          TRUSTED BY GROWING BRANDS WORLDWIDE
        </motion.p>
      </div>

      <div className="mt-6">
        <ClientLogoStrip className="w-full" />
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-4 px-6 sm:grid-cols-4 sm:gap-6 md:px-10">
        {STATS.map(({ icon: Icon, stat, label }, i) => (
          <motion.div
            key={label}
            className="flex flex-col items-center gap-2 text-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.1 + i * 0.06, ease: EASE }}
          >
            <Icon className="h-5 w-5 text-[#79ABFF]" aria-hidden />
            <p className="font-heading text-2xl font-bold text-white sm:text-[1.75rem]">{stat}</p>
            <p className="text-xs font-medium text-white/60 sm:text-sm">{label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
