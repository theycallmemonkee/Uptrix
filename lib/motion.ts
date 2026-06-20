export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    transition: {
      duration: custom?.duration ?? 0.72,
      delay: custom?.delay ?? 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom?: { delay?: number; duration?: number; y?: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration ?? 0.72,
      delay: custom?.delay ?? 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom?.duration ?? 0.72,
      delay: custom?.delay ?? 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const slideLeft = {
  hidden: { opacity: 0, x: 24 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration ?? 0.72,
      delay: custom?.delay ?? 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const slideRight = {
  hidden: { opacity: 0, x: -24 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration ?? 0.72,
      delay: custom?.delay ?? 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});
