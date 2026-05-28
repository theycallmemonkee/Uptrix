"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useEffect } from "react";

/**
 * SpotlightBackground
 * A radial spotlight that follows the cursor across the entire page.
 * Use inside a `relative` parent with `overflow-hidden` or `overflow-clip`.
 */
export function SpotlightBackground({
  color = "rgba(0,102,255,0.14)",
  size = 700,
  className = "",
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  const glowX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  const bg = useMotionTemplate`radial-gradient(${size}px circle at ${glowX} ${glowY}, ${color}, transparent 70%)`;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      style={{ background: bg }}
    />
  );
}

/**
 * FloatingOrbs
 * Decorative ambient orbs in the background.
 */
interface Orb {
  cx: string;
  cy: string;
  size: number;
  color: string;
  duration: number;
  delay?: number;
}

const DEFAULT_ORBS: Orb[] = [
  { cx: "8%",  cy: "18%", size: 500, color: "rgba(0,102,255,0.18)",   duration: 8,  delay: 0 },
  { cx: "88%", cy: "22%", size: 380, color: "rgba(120,168,255,0.14)", duration: 11, delay: 2 },
  { cx: "50%", cy: "80%", size: 440, color: "rgba(0,102,255,0.12)",   duration: 13, delay: 4 },
  { cx: "20%", cy: "68%", size: 260, color: "rgba(180,210,255,0.1)",  duration: 9,  delay: 1 },
];

export function FloatingOrbs({ orbs = DEFAULT_ORBS }: { orbs?: Orb[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            left: orb.cx,
            top: orb.cy,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -28, 0],
            x: [0, 14, 0],
            scale: [1, 1.08, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay ?? 0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * AnimatedGrid
 * Slowly drifting dot/line grid for backgrounds.
 */
export function AnimatedGrid({
  opacity = 0.4,
  gridSize = 72,
  type = "lines",
}: {
  opacity?: number;
  gridSize?: number;
  type?: "lines" | "dots";
}) {
  const bg =
    type === "dots"
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${gridSize}' height='${gridSize}'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.6)'/%3E%3C/svg%3E")`
      : `linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px)`;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_48%,transparent_90%)]"
      style={{ opacity }}
    >
      <motion.div
        className="h-full w-full"
        style={{
          backgroundImage: bg,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
        animate={{ backgroundPosition: ["0px 0px", `${gridSize}px ${gridSize}px`] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/**
 * NoiseTexture
 * SVG-based cinematic film grain overlay.
 */
export function NoiseTexture({ opacity = 0.032 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9990]"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
      }}
    />
  );
}

/**
 * AIWaveOverlay
 * Animated sinusoidal waveform inspired by AI/neural visuals.
 */
export function AIWaveOverlay({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full"
      >
        {[0, 0.3, 0.6].map((delay, i) => (
          <motion.path
            key={i}
            d={`M0,60 C120,${20 + i * 15} 240,${100 - i * 15} 360,60 C480,${20 + i * 15} 600,${100 - i * 15} 720,60 C840,${20 + i * 15} 960,${100 - i * 15} 1080,60 C1200,${20 + i * 15} 1320,${100 - i * 15} 1440,60`}
            stroke={`rgba(0,102,255,${0.18 - i * 0.04})`}
            strokeWidth={1.5 - i * 0.3}
            animate={{
              d: [
                `M0,60 C120,${20 + i * 15} 240,${100 - i * 15} 360,60 C480,${20 + i * 15} 600,${100 - i * 15} 720,60 C840,${20 + i * 15} 960,${100 - i * 15} 1080,60 C1200,${20 + i * 15} 1320,${100 - i * 15} 1440,60`,
                `M0,60 C120,${100 - i * 15} 240,${20 + i * 15} 360,60 C480,${100 - i * 15} 600,${20 + i * 15} 720,60 C840,${100 - i * 15} 960,${20 + i * 15} 1080,60 C1200,${100 - i * 15} 1320,${20 + i * 15} 1440,60`,
                `M0,60 C120,${20 + i * 15} 240,${100 - i * 15} 360,60 C480,${20 + i * 15} 600,${100 - i * 15} 720,60 C840,${20 + i * 15} 960,${100 - i * 15} 1080,60 C1200,${20 + i * 15} 1320,${100 - i * 15} 1440,60`,
              ],
            }}
            transition={{
              duration: 6 + i * 1.5,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * FloatingParticles
 * Lightweight canvas-free particle field using CSS/Framer Motion.
 */
export function FloatingParticles({
  count = 28,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 5) % 100}%`,
    top:  `${(i * 53 + 8) % 100}%`,
    size: 1.5 + (i % 3) * 0.8,
    duration: 7 + (i % 6) * 1.5,
    delay: (i % 8) * 0.5,
    opacity: 0.25 + (i % 4) * 0.12,
  }));

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[#8FB9FF]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -22, 0],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
