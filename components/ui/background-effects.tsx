"use client";

/**
 * BackgroundEffects
 *
 * Client Component boundary required so that `{ ssr: false }` is legal.
 * Turbopack (Next.js 16 default bundler for `next build`) disallows
 * `dynamic(..., { ssr: false })` in Server Components.
 *
 * The two decorative effects are lazy-loaded and intentionally skipped
 * during SSR so they never block LCP or inflate the server HTML payload.
 */

import dynamic from "next/dynamic";

const FloatingOrbs = dynamic(
  () => import("@/components/ui/visual-effects").then((m) => m.FloatingOrbs),
  { ssr: false }
);

const AnimatedGrid = dynamic(
  () => import("@/components/ui/visual-effects").then((m) => m.AnimatedGrid),
  { ssr: false }
);

interface BackgroundEffectsProps {
  gridOpacity?: number;
  gridSize?: number;
}

export function BackgroundEffects({
  gridOpacity = 0.38,
  gridSize = 72,
}: BackgroundEffectsProps) {
  return (
    <>
      <AnimatedGrid opacity={gridOpacity} gridSize={gridSize} />
      <FloatingOrbs />
    </>
  );
}
