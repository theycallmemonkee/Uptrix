"use client";

import { motion } from "framer-motion";
import { ClientLogoStrip } from "@/components/ui/client-logo-strip";

const EASE = [0.22, 1, 0.36, 1] as const;

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

      <motion.p
        className="mt-6 text-center font-heading text-sm font-semibold text-white/70"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
      >
        $2.5M+ in ad spend managed across 200+ growth projects.
      </motion.p>
    </div>
  );
}
