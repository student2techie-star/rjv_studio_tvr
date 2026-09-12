// src/hooks/useScrollReveal.js
import { useMemo } from "react";

/**
 * Returns framer-motion props for subtle scroll-reveal.
 * Guarantees content is visible immediately so no white screen occurs.
 */
export function useScrollReveal({ delay = 0, duration = 0.5 } = {}) {
  return useMemo(
    () => ({
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0 },
      transition: { duration, delay, ease: "easeOut" },
    }),
    [delay, duration]
  );
}

export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerItem = {
  hidden: { opacity: 1, y: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};