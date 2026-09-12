// src/components/layout/LogoIntro.jsx
// Full-screen loading intro that uses the RJV Studio logo image
// with a cinematic flash sequence before revealing the site.

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_SRC = `${import.meta.env.BASE_URL}images/logo.png`;

// Sequence stages
const STAGES = [
  { key: "reveal",  ms: 900  },   // logo fades in
  { key: "glow",    ms: 800  },   // golden glow builds up
  { key: "flash1",  ms: 180  },   // first flash burst
  { key: "dim",     ms: 500  },   // brief dim between flashes
  { key: "flash2",  ms: 200  },   // second bigger flash
  { key: "white",   ms: 700  },   // full white screen hold
  { key: "done",    ms: 0    },
];

const LAST = STAGES.length - 1;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function LogoIntro({ onFinish }) {
  const [stageIdx, setStageIdx] = useState(0);
  const finishedRef = useRef(false);
  const onFinishRef = useRef(onFinish);

  useEffect(() => { onFinishRef.current = onFinish; }, [onFinish]);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    sessionStorage.setItem("logoIntroShown", "true");
    onFinishRef.current?.();
  }, []);

  // Skip if already seen or reduced motion preference
  useEffect(() => {
    if (sessionStorage.getItem("logoIntroShown") === "true" || prefersReducedMotion()) {
      finish();
    }
  }, [finish]);

  // Advance through stages
  useEffect(() => {
    if (stageIdx >= LAST) { finish(); return; }
    const t = setTimeout(() => setStageIdx((i) => i + 1), STAGES[stageIdx].ms);
    return () => clearTimeout(t);
  }, [stageIdx, finish]);

  if (stageIdx >= LAST) return null;

  const stage = STAGES[stageIdx].key;
  const isFlash  = stage === "flash1" || stage === "flash2";
  const isWhite  = stage === "white";
  const showGlow = stage === "glow" || stage === "flash1" || stage === "dim" || stage === "flash2";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden cursor-pointer select-none"
      style={{ background: "#0a0a0a" }}
      animate={{ backgroundColor: isFlash || isWhite ? "#ffffff" : "#0a0a0a" }}
      transition={{ duration: isFlash ? 0.06 : isWhite ? 0.3 : 0.4 }}
      onClick={finish}
      role="button"
      tabIndex={-1}
      aria-label="Intro — tap to skip"
    >
      {/* ── Logo image ── */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{
          opacity: isFlash || isWhite ? 0 : 1,
          scale:   stage === "glow" || stage === "flash1" ? 1.04 : 1,
        }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {/* Logo image */}
        <motion.img
          src={LOGO_SRC}
          alt="RJV Studios"
          style={{ width: 260, height: 260, objectFit: "contain" }}
          /* Invert to look good on dark background */
          animate={{ filter: "brightness(1.15) drop-shadow(0 0 24px rgba(255,213,79,0.0))" }}
        />

        {/* Golden glow overlay on lens */}
        <AnimatePresence>
          {showGlow && (
            <motion.span
              key="glow"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: stage === "glow" ? 0.85 : stage === "dim" ? 0.4 : 1,
                scale:   stage === "flash1" || stage === "flash2" ? 1.6 : 1,
              }}
              exit={{ opacity: 0, scale: 2, transition: { duration: 0.25 } }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                position: "absolute",
                /* Lens center is ~50% X, ~27% Y of the 260px image */
                top:    "27%",
                left:   "50%",
                transform: "translate(-50%, -50%)",
                width:  90,
                height: 90,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, #fffde7 0%, #ffd54f 28%, rgba(255,213,79,0.35) 60%, transparent 80%)",
                boxShadow: `
                  0 0 40px 20px rgba(255,213,79,0.9),
                  0 0 90px 40px rgba(255,220,100,0.55),
                  0 0 160px 60px rgba(255,240,180,0.25)
                `,
                mixBlendMode: "screen",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>

        {/* Flash shutter ray burst */}
        <AnimatePresence>
          {isFlash && (
            <motion.span
              key="rays"
              aria-hidden="true"
              initial={{ opacity: 0.9, scale: 0.6 }}
              animate={{ opacity: 0, scale: 2.8 }}
              transition={{ duration: stage === "flash2" ? 0.22 : 0.18, ease: "easeOut" }}
              style={{
                position: "absolute",
                top:    "27%",
                left:   "50%",
                transform: "translate(-50%, -50%)",
                width:  140,
                height: 140,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,240,180,0.6) 40%, transparent 70%)",
                pointerEvents: "none",
                mixBlendMode: "screen",
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Full white flash veil */}
      <AnimatePresence>
        {(isFlash || isWhite) && (
          <motion.div
            key="veil"
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: isFlash ? 0.9 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </AnimatePresence>

      {/* Skip hint */}
      <motion.p
        className="absolute bottom-8 text-xs font-semibold tracking-[0.25em] uppercase"
        style={{ color: "rgba(255,255,255,0.45)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isFlash || isWhite ? 0 : 0.7 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        Tap anywhere to skip
      </motion.p>
    </motion.div>
  );
}