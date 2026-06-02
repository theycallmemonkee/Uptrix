"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  takeaways: string[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function BlogTakeawaysAccordion({ takeaways }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#111111] bg-white p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <span className="font-heading text-lg font-bold text-[#111827]">
          Key takeaways:
        </span>
        <ChevronDown
          size={18}
          className={`text-[#111827] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-3 pl-1">
              {takeaways.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-[16px] leading-[1.65] text-[#374151]">
                  <span className="text-[#111827] font-bold shrink-0 select-none mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
