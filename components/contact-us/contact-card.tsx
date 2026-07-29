"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ContactCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string | null;
  isExternal?: boolean;
}

export function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  isExternal,
}: ContactCardProps) {
  const isClickable = !!href;
  const CardContainer = isClickable ? motion.a : motion.div;

  const containerProps = isClickable
    ? {
        href,
        ...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}),
      }
    : {};

  return (
    <CardContainer
      {...containerProps}
      className={`group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-[#79ABFF]/28 ${
        isClickable ? "cursor-pointer" : ""
      }`}
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Hover radial gradient glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,rgba(0,102,255,0.16),transparent_55%)]" />
      
      <div className="relative flex items-center gap-4">
        {/* Icon box */}
        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#79ABFF]/28 bg-[#0C2C57]/42 text-[#79ABFF]">
          <Icon size={17} />
        </div>
        
        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium tracking-[0.18em] text-[#A8C9FF]/70 uppercase leading-normal">
            {label}
          </p>
          <p className="mt-1 text-sm font-medium text-white transition-colors group-hover:text-[#A8C9FF] leading-relaxed">
            {value}
          </p>
        </div>
      </div>
    </CardContainer>
  );
}
