// src/hooks/useScrollReveal.js
import { useMemo } from "react";

/**
 * Returns framer-motion props for a subtle scroll-reveal.
 * Respects reduced-motion via framer-motion's built-in handling.
 * Usage:
 *   <motion.div {...useScrollReveal({ delay: 0.1 })}>
 */
export function useScrollReveal({ delay = 0, y = 28, duration = 0.65 } = {}) {
  return useMemo(
    () => ({
      initial: { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.05 },
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    }),
    [delay, y, duration]
  );
}

export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};