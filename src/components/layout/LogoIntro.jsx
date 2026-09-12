// src/components/layout/LogoIntro.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STAGES = [
  { key: "lens", ms: 750 },
  { key: "aperture", ms: 1200 },
  { key: "focus", ms: 950 },
  { key: "pulse", ms: 700 },
  { key: "flash", ms: 420 },
  { key: "white", ms: 1000 },
  { key: "done", ms: 0 },
];

const LAST = STAGES.length - 1;
const blades = [0, 60, 120, 180, 240, 300];

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

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    sessionStorage.setItem("logoIntroShown", "true");
    onFinishRef.current?.();
  }, []);

  // Skip entirely when already seen this session (or reduced motion).
  useEffect(() => {
    if (sessionStorage.getItem("logoIntroShown") === "true" || prefersReducedMotion()) {
      finish();
    }
  }, [finish]);

  // Step through the sequence.
  useEffect(() => {
    if (stageIdx >= LAST) {
      finish();
      return;
    }
    const t = setTimeout(() => setStageIdx((i) => i + 1), STAGES[stageIdx].ms);
    return () => clearTimeout(t);
  }, [stageIdx, finish]);

  if (stageIdx >= LAST) return null;

  const stage = STAGES[stageIdx].key;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      animate={{
        background:
          stage === "flash" || stage === "white" ? "#FFFFFF" : "#EEF9FE",
      }}
      transition={{ duration: 0.25 }}
      onClick={finish}
      role="button"
      tabIndex={-1}
      aria-label="Intro — tap to continue"
    >
      {/* Aperture blades — appear in "lens", rotate in "aperture" */}
      {(stage === "lens" || stage === "aperture") && (
        <svg width="230" height="230" viewBox="0 0 230 230" className="absolute">
          <motion.g
            initial={{ rotate: 0, opacity: 0.1 }}
            animate={{
              rotate: stage === "aperture" ? 90 : 0,
              opacity: stage === "aperture" ? 1 : 0.15,
            }}
            transition={{ duration: 1.05, ease: "easeInOut" }}
            style={{ transformOrigin: "115px 115px" }}
          >
            {blades.map((angle) => (
              <ellipse
                key={angle}
                cx="115"
                cy="115"
                rx="125"
                ry="32"
                fill="#6FAED0"
                opacity="0.85"
                transform={`rotate(${angle} 115 115)`}
              />
            ))}
          </motion.g>
        </svg>
      )}

      {/* Lens barrel rings */}
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="absolute"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: 1,
          scale: stage === "focus" || stage === "pulse" ? 0.9 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <circle cx="100" cy="100" r="92" fill="none" stroke="#4F91B6" strokeWidth="5" opacity="0.45" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#6FAED0" strokeWidth="4" />
        <circle cx="100" cy="100" r="48" fill="none" stroke="#AFDBF5" strokeWidth="3" />
      </motion.svg>

      {/* Focus pulse */}
      {(stage === "pulse" || stage === "flash") && (
        <motion.svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="absolute"
        >
          <motion.circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="#AFDBF5"
            strokeWidth="7"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1.3, opacity: [0, 1, 0] }}
            transition={{
              duration: 0.65,
              repeat: stage === "pulse" ? Infinity : 0,
              repeatType: "reverse",
            }}
          />
        </motion.svg>
      )}

      {/* Aperture opening — the focus step */}
      {(stage === "focus" || stage === "pulse" || stage === "flash") && (
        <motion.svg
          width="170"
          height="170"
          viewBox="0 0 170 170"
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: stage === "flash" ? 1.08 : 1 }}
        >
          {blades.map((angle) => (
            <ellipse
              key={angle}
              cx="85"
              cy="85"
              rx="95"
              ry="24"
              fill="#245A73"
              opacity="0.9"
              transform={`rotate(${angle} 85 85)`}
            />
          ))}
          <circle cx="85" cy="85" r="16" fill="#AFDBF5" />
          <circle cx="85" cy="85" r="7" fill="#173B52" />
        </motion.svg>
      )}

      {/* Flash → pure white screen */}
      {(stage === "flash" || stage === "white") && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        />
      )}

      <style>{`svg { overflow: visible; }`}</style>

      {/* Skip hint */}
      <motion.p
        className="absolute bottom-6 text-sm font-medium tracking-widest text-brand-600/80 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === "white" ? 0 : 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        Tap anywhere to continue
      </motion.p>
    </motion.div>
  );
}