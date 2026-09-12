// src/components/home/Intro.jsx
import React from "react";
import { motion } from "framer-motion";
import Container from "../common/Container";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import weddingImg from "../../assets/images/weddings/anniversary-02.webp";
import portraitImg from "../../assets/images/portraits/shoot-01.webp";

const STATS = [
  { value: "8+", label: "Years behind the lens" },
  { value: "1200+", label: "Shoots delivered" },
  { value: "800+", label: "Happy families" },
];

export default function Intro() {
  const reveal = useScrollReveal();

  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Photo collage */}
          <motion.div {...reveal} className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl shadow-brand-900/10">
              <img src={weddingImg} alt="RJV Studios wedding photography" className="h-full w-full object-cover" loading="lazy" width={640} height={800} />
            </div>
            <div className="absolute -bottom-10 -right-4 sm:-right-8 w-40 sm:w-52 aspect-[3/4] overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
              <img src={portraitImg} alt="Editorial portrait by RJV Studios" className="h-full w-full object-cover" loading="lazy" width={320} height={427} />
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div {...useScrollReveal({ delay: 0.12 })}>
            <p className="eyebrow mb-4">Welcome to RJV Studios</p>
            <h2 className="text-section">We preserve your precious memories</h2>
            <p className="text-body mt-6">
              From weddings that glow with tradition to quiet, candid portraits —
              we photograph life the way it happens: honest, warm and full of light.
            </p>
            <p className="text-body mt-4">
              Every session is planned around you — the light, the location and the
              story you want to keep. No rushed poses, only moments that matter.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-10">
              {STATS.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <p className="text-3xl md:text-4xl font-bold text-brand-900">{s.value}</p>
                  <p className="text-xs uppercase tracking-wider text-brand-600 mt-1.5">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}