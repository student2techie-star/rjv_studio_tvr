// src/components/layout/LogoIntro.jsx
// Full-screen white loading intro — flash fires FROM the camera lens toward viewer.

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_SRC = `${import.meta.env.BASE_URL}images/logo.png`;

const STAGES = [
  { key: "enter",  ms: 900  },  // logo fades + scales in
  { key: "hold",   ms: 500  },  // brief hold
  { key: "charge", ms: 600  },  // glow builds at lens
  { key: "flash",  ms: 300  },  // flash fires forward
  { key: "fade",   ms: 500  },  // fades out to site
  { key: "done",   ms: 0    },
];

const LAST = STAGES.length - 1;

// Lens center coordinates (moved further top-left):
const LENS_TOP  = "20%";
const LENS_LEFT = "47%";

function prefersReducedMotion() {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function LogoIntro({ onFinish }) {
  const [stageIdx, setStageIdx] = useState(0);
  const finishedRef  = useRef(false);
  const onFinishRef  = useRef(onFinish);

  useEffect(() => { onFinishRef.current = onFinish; }, [onFinish]);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onFinishRef.current?.();
  }, []);

  useEffect(() => { if (prefersReducedMotion()) finish(); }, [finish]);

  useEffect(() => {
    if (stageIdx >= LAST) { finish(); return; }
    const t = setTimeout(() => setStageIdx(i => i + 1), STAGES[stageIdx].ms);
    return () => clearTimeout(t);
  }, [stageIdx, finish]);

  if (stageIdx >= LAST) return null;

  const stage    = STAGES[stageIdx].key;
  const isFlash  = stage === "flash";
  const showGlow = stage === "charge" || stage === "flash";
  const isFading = stage === "fade";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white cursor-pointer select-none overflow-hidden"
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
          scale:   isFlash ? 1.04 : isFading ? 0.95 : 1,
          y:       isFading ? -12 : 0,
        }}
        transition={{
          duration: isFading ? 0.4 : isFlash ? 0.1 : 0.55,
          ease: "easeOut",
        }}
      >
        {/* Logo image */}
        <img
          src={LOGO_SRC}
          alt="RJV Studios"
          style={{ width: 240, height: 240, objectFit: "contain", display: "block" }}
        />

        {/* ── Lens charge glow (soft warm build-up inside lens aperture) ── */}
        <AnimatePresence>
          {showGlow && (
            <motion.span
              key="lens-glow"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{
                opacity: isFlash ? 0 : 0.95,
                scale:   isFlash ? 0.2 : 1,
              }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                position:     "absolute",
                top:          LENS_TOP,
                left:         LENS_LEFT,
                transform:    "translate(-50%, -50%)",
                width:        28,
                height:       28,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, #ffffff 0%, #fff9c4 40%, #ffd54f 70%, rgba(255,200,50,0.6) 90%)",
                boxShadow: `
                  0 0 10px 4px rgba(255,220,60,0.9),
                  0 0 20px 8px rgba(255,235,100,0.6)
                `,
                mixBlendMode:  "normal",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Flash burst — fires FORWARD (outward cone from lens) ── */}
        <AnimatePresence>
          {isFlash && (
            <>
              {/* Primary blast: big radial burst from lens center outward */}
              <motion.span
                key="flash-burst"
                aria-hidden="true"
                initial={{ opacity: 1, scale: 0.2 }}
                animate={{ opacity: 0, scale: 5 }}
                transition={{ duration: 0.35, ease: [0.2, 0, 0.4, 1] }}
                style={{
                  position:     "absolute",
                  top:          LENS_TOP,
                  left:         LENS_LEFT,
                  transform:    "translate(-50%, -50%)",
                  width:        100,
                  height:       100,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, #ffffff 0%, #fffde7 20%, #ffd54f 45%, rgba(255,210,60,0.3) 70%, transparent 85%)",
                  boxShadow: `
                    0 0 0   10px rgba(255,255,255,0.95),
                    0 0 30px 20px rgba(255,250,200,0.85),
                    0 0 80px 40px rgba(255,230,80,0.5)
                  `,
                  pointerEvents: "none",
                }}
              />

              {/* Star flare rays — 4 sharp spikes radiating outward from lens */}
              {[0, 45, 90, 135].map((deg) => (
                <motion.span
                  key={`ray-${deg}`}
                  aria-hidden="true"
                  initial={{ opacity: 0.9, scaleX: 0.1, scaleY: 0.1 }}
                  animate={{ opacity: 0, scaleX: 1, scaleY: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    position:        "absolute",
                    top:             LENS_TOP,
                    left:            LENS_LEFT,
                    transform:       `translate(-50%, -50%) rotate(${deg}deg)`,
                    transformOrigin: "center",
                    width:           200,
                    height:          3,
                    background:
                      "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,240,120,0.9) 40%, rgba(255,240,120,0.9) 60%, rgba(255,255,255,0) 100%)",
                    borderRadius:    "999px",
                    pointerEvents:   "none",
                  }}
                />
              ))}

              {/* Shockwave ring expanding outward */}
              <motion.span
                key="shockwave"
                aria-hidden="true"
                initial={{ opacity: 0.7, scale: 0.4 }}
                animate={{ opacity: 0, scale: 3.5 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                style={{
                  position:     "absolute",
                  top:          LENS_TOP,
                  left:         LENS_LEFT,
                  transform:    "translate(-50%, -50%)",
                  width:        80,
                  height:       80,
                  borderRadius: "50%",
                  border:       "2px solid rgba(255,220,60,0.8)",
                  pointerEvents: "none",
                }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Full white flash veil ── */}
      <AnimatePresence>
        {isFlash && (
          <motion.div
            key="veil"
            className="absolute inset-0 pointer-events-none"
            style={{ background: "white" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.08 }}
          />
        )}
      </AnimatePresence>

      {/* ── Progress bar ── */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5"
        style={{ background: "linear-gradient(to right, #c8a951, #f0d070, #c8a951)" }}
        initial={{ width: "0%" }}
        animate={{
          width:
            isFading ? "100%" :
            isFlash  ? "85%"  :
            stage === "charge" ? "60%" :
            stage === "hold"   ? "35%" : "10%",
        }}
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