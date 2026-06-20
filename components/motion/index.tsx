"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*  Shared easing curve                                                        */
/* -------------------------------------------------------------------------- */
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*  FadeIn                                                                     */
/*  Simple fade-up / blur-to-clear reveal on scroll.                          */
/* -------------------------------------------------------------------------- */
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  blur?: boolean;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.72,
  y = 24,
  blur = true,
  className,
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  StaggerContainer                                                            */
/*  Wraps children and staggers their whileInView animations.                 */
/* -------------------------------------------------------------------------- */
interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
  once?: boolean;
}

export function StaggerContainer({
  children,
  stagger = 0.08,
  delayChildren = 0.05,
  className,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const StaggerItem = motion.div;
export const STAGGER_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: EASE_PREMIUM },
  },
};

/* -------------------------------------------------------------------------- */
/*  AnimatedSection                                                             */
/*  Full section entrance with optional gradient divider.                     */
/* -------------------------------------------------------------------------- */
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.section>
  );
}

/* -------------------------------------------------------------------------- */
/*  HoverTilt                                                                  */
/*  3-D tilt card on mouse move.                                               */
/* -------------------------------------------------------------------------- */
interface HoverTiltProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  perspective?: number;
}

export function HoverTilt({
  children,
  className,
  intensity = 5,
  perspective = 900,
}: HoverTiltProps) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 110, damping: 22, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 110, damping: 22, mass: 0.8 });

  const rotateY = useTransform(smoothX, [0, 1], [-intensity, intensity]);
  const rotateX = useTransform(smoothY, [0, 1], [intensity, -intensity]);

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: perspective }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  GlowCard                                                                   */
/*  Glassmorphism card with interactive mouse-tracking inner glow.            */
/* -------------------------------------------------------------------------- */
interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
  tilt?: boolean;
  intensity?: number;
}

export function GlowCard({
  children,
  className = "",
  glowColor = "rgba(0,102,255,0.22)",
  glowSize = 280,
  tilt = true,
  intensity = 4,
}: GlowCardProps) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 110, damping: 22, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 110, damping: 22, mass: 0.8 });

  const glowXp = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const glowYp = useTransform(smoothY, [0, 1], ["10%", "90%"]);
  const hoverGlow = useMotionTemplate`radial-gradient(${glowSize}px circle at ${glowXp} ${glowYp}, ${glowColor}, transparent 70%)`;

  const rotateY = useTransform(smoothX, [0, 1], [-intensity, intensity]);
  const rotateX = useTransform(smoothY, [0, 1], [intensity, -intensity]);

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={
        tilt
          ? { rotateX, rotateY, transformPerspective: 900 }
          : undefined
      }
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.35, ease: EASE_PREMIUM }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: hoverGlow }}
      />
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MagneticButton                                                             */
/*  Button that subtly pulls toward the cursor (magnetic effect).             */
/* -------------------------------------------------------------------------- */
interface MagneticButtonProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  strength?: number;
}

export function MagneticButton({
  children,
  strength = 0.22,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.8 });

  return (
    <motion.div
      ref={ref}
      {...rest}
      style={{ x: springX, y: springY, display: "inline-flex" }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
