// src/components/layout/LogoIntro.jsx
// Full-screen white loading intro with the RJV Studio logo + flash animation.
// Shows on every page load/refresh.

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_SRC = `${import.meta.env.BASE_URL}images/logo.png`;

// Animation timeline
const STAGES = [
  { key: "enter",  ms: 800  },  // logo scales in on white
  { key: "hold",   ms: 600  },  // brief pause
  { key: "charge", ms: 500  },  // glow builds on lens
  { key: "flash",  ms: 250  },  // camera flash fires
  { key: "fade",   ms: 500  },  // everything fades to white
  { key: "done",   ms: 0    },
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
    onFinishRef.current?.();
  }, []);

  // Skip only if reduced motion
  useEffect(() => {
    if (prefersReducedMotion()) finish();
  }, [finish]);

  // Step through stages
  useEffect(() => {
    if (stageIdx >= LAST) { finish(); return; }
    const t = setTimeout(() => setStageIdx((i) => i + 1), STAGES[stageIdx].ms);
    return () => clearTimeout(t);
  }, [stageIdx, finish]);

  if (stageIdx >= LAST) return null;

  const stage = STAGES[stageIdx].key;
  const isFlash  = stage === "flash";
  const showGlow = stage === "charge" || stage === "flash";
  const isFading = stage === "fade";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white cursor-pointer select-none"
      onClick={finish}
      role="button"
      tabIndex={-1}
      aria-label="Loading — tap to skip"
    >
      {/* ── Logo container ── */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.78, y: 24 }}
        animate={{
          opacity: isFading ? 0 : 1,
          scale:   isFlash ? 1.06 : isFading ? 0.94 : 1,
          y:       isFading ? -10 : 0,
        }}
        transition={{
          duration: isFading ? 0.45 : isFlash ? 0.12 : 0.55,
          ease: "easeOut",
        }}
      >
        {/* ── Logo image ── */}
        <img
          src={LOGO_SRC}
          alt="RJV Studios"
          style={{
            width:     240,
            height:    240,
            objectFit: "contain",
            display:   "block",
          }}
        />

        {/* ── Golden lens glow (charge → flash) ── */}
        <AnimatePresence>
          {showGlow && (
            <motion.span
              key="glow"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                opacity: isFlash ? 1 : 0.7,
                scale:   isFlash ? 1.8 : 0.9,
              }}
              exit={{ opacity: 0, scale: 2.5, transition: { duration: 0.3 } }}
              transition={{ duration: isFlash ? 0.1 : 0.35, ease: "easeOut" }}
              style={{
                position:     "absolute",
                /* Lens sits at ~50% X, ~27% from top in the 240px image */
                top:          "26%",
                left:         "50%",
                transform:    "translate(-50%, -50%)",
                width:        80,
                height:       80,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, #fffde7 0%, #ffd54f 30%, rgba(255,213,79,0.3) 65%, transparent 80%)",
                boxShadow: isFlash
                  ? `0 0 30px 18px rgba(255,210,60,0.95),
                     0 0 70px 35px rgba(255,230,100,0.6),
                     0 0 130px 60px rgba(255,240,180,0.3)`
                  : `0 0 18px 10px rgba(255,210,60,0.6),
                     0 0 40px 20px rgba(255,230,100,0.3)`,
                mixBlendMode: "multiply",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Flash shockwave ring ── */}
        <AnimatePresence>
          {isFlash && (
            <motion.span
              key="ring"
              aria-hidden="true"
              initial={{ opacity: 0.8, scale: 0.5 }}
              animate={{ opacity: 0, scale: 3.0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                position:     "absolute",
                top:          "26%",
                left:         "50%",
                transform:    "translate(-50%, -50%)",
                width:        80,
                height:       80,
                borderRadius: "50%",
                border:       "3px solid rgba(255,210,60,0.7)",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Flash white veil ── */}
      <AnimatePresence>
        {isFlash && (
          <motion.div
            key="veil"
            className="absolute inset-0 bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          />
        )}
      </AnimatePresence>

      {/* ── Progress bar along the bottom ── */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5"
        style={{ background: "linear-gradient(to right, #c8a951, #f0d070, #c8a951)" }}
        initial={{ width: "0%" }}
        animate={{ width: isFading ? "100%" : stage === "flash" ? "85%" : stage === "charge" ? "60%" : stage === "hold" ? "35%" : "10%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* ── Skip hint ── */}
      <motion.p
        className="absolute bottom-4 text-xs tracking-[0.2em] uppercase font-medium"
        style={{ color: "rgba(0,0,0,0.3)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isFading || isFlash ? 0 : 0.6 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        Tap to skip
      </motion.p>
    </motion.div>
  );
}