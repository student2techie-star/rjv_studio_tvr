// src/components/layout/LogoIntro.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEQUENCE = [
  { name: "lens", component: <motion.div className="w-32 h-32 bg-brand-300 rounded-full" /> },
  { name: "aperture", component: <motion.div className="w-32 h-32 border-4 border-brand-500 rounded-full" /> },
  { name: "focus", component: <motion.div className="w-40 h-40 border-2 border-brand-600 rounded-full" /> },
  { name: "flash", component: <motion.div className="w-48 h-48 bg-white opacity-0" /> },
];

export default function LogoIntro({ onFinish }) {
  const [shown, setShown] = useState(() => sessionStorage.getItem("logoIntroShown") === "true");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (shown) return;
    const timer = setTimeout(() => setStep((s) => (s < SEQUENCE.length ? s + 1 : s)), 800);
    return () => clearTimeout(timer);
  }, [step, shown]);

  useEffect(() => {
    if (step >= SEQUENCE.length) {
      sessionStorage.setItem("logoIntroShown", "true");
      setShown(true);
      if (onFinish) onFinish();
    }
  }, [step, onFinish]);

  if (shown) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-brand-100 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {SEQUENCE[step] && (
          <motion.div
            key={SEQUENCE[step].name}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.7 } }}
          >
            {SEQUENCE[step].component}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
