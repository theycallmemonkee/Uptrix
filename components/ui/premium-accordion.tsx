"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Minus, Plus } from "lucide-react";

export type PremiumAccordionItem = {
  id: string;
  question: string;
  answer: string;
};

type Props = {
  items: PremiumAccordionItem[];
  defaultOpenId?: string;
  className?: string;
};

function useStableId(prefix: string) {
  const reactId = React.useId();
  return `${prefix}-${reactId.replaceAll(":", "")}`;
}

export function PremiumAccordion({ items, defaultOpenId, className }: Props) {
  const [openId, setOpenId] = React.useState<string | null>(defaultOpenId ?? items[0]?.id ?? null);
  const rootId = useStableId("premium-accordion");

  return (
    <div className={className} role="region" aria-label="Frequently asked questions">
      <div className="flex flex-col gap-4">
        {items.map((item, idx) => (
          <AccordionCard
            key={item.id}
            index={idx}
            item={item}
            open={openId === item.id}
            buttonId={`${rootId}-btn-${item.id}`}
            panelId={`${rootId}-panel-${item.id}`}
            onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
          />
        ))}
      </div>
    </div>
  );
}

function AccordionCard({
  item,
  open,
  onToggle,
  buttonId,
  panelId,
  index,
}: {
  item: PremiumAccordionItem;
  open: boolean;
  onToggle: () => void;
  buttonId: string;
  panelId: string;
  index: number;
}) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.45);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 24, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 24, mass: 0.7 });

  const glowX = useTransform(smoothX, [0, 1], ["12%", "88%"]);
  const glowY = useTransform(smoothY, [0, 1], ["10%", "82%"]);
  const hoverGlow = useMotionTemplate`radial-gradient(520px circle at ${glowX} ${glowY}, rgba(0,102,255,0.22), transparent 60%)`;

  return (
    <motion.article
      className="group relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-[linear-gradient(160deg,rgba(14,34,64,0.74),rgba(7,18,37,0.62))] shadow-[0_18px_55px_rgba(2,9,22,0.48)] ring-1 ring-inset ring-white/8 backdrop-blur-2xl"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.45);
      }}
      whileHover={{ y: -4 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: hoverGlow }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-[1px] opacity-0 transition-opacity duration-300 group-hover:opacity-60"
        style={{
          background:
            "linear-gradient(120deg, rgba(0,102,255,0.22), rgba(255,255,255,0.04), rgba(0,102,255,0.2))",
        }}
      />

      <div className="relative z-10">
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-start justify-between gap-6 px-6 py-6 text-left"
          aria-controls={panelId}
          aria-expanded={open}
          onClick={onToggle}
        >
          <span className="font-heading text-base leading-7 font-semibold tracking-tight text-white md:text-[1.05rem]">
            {item.question}
          </span>

          <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/14 bg-white/[0.06] text-white shadow-[0_10px_28px_rgba(2,9,22,0.38)] transition-colors duration-300 group-hover:border-[#86B6FF]/32 group-hover:bg-[#0B2344]/55">
            <motion.span
              className="relative inline-flex"
              initial={false}
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <Plus size={18} className={open ? "opacity-0" : "opacity-100"} />
              <Minus size={18} className={open ? "absolute inset-0 opacity-100" : "absolute inset-0 opacity-0"} />
            </motion.span>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -6, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="px-6 pb-6"
              >
                <p className="max-w-2xl text-sm leading-7 text-white/70 md:text-[0.98rem]">{item.answer}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

