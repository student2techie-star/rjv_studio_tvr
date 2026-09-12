// src/components/home/Hero.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import Container from "../common/Container";
import Button from "../common/Button";

// Hero main showcase photos
import heroImg from "../../assets/images/weddings/anniversary-01.jpg";

// Slideshow showcase photos
import bridalRed from "../../assets/images/portraits/bridal-red.jpg";
import anniversary02 from "../../assets/images/weddings/anniversary-02.jpg";
import babyshootMurugan from "../../assets/images/kids/babyshoot-murugan.jpg";
import maternity01 from "../../assets/images/kids/maternity-01.jpg";
import thaliMacro from "../../assets/images/ceremonies/thali-macro.jpg";
import anniversary04 from "../../assets/images/weddings/anniversary-04.jpg";

const SLIDES = [
  { src: bridalRed, label: "Bridal Portrait" },
  { src: anniversary02, label: "Wedding Arch" },
  { src: babyshootMurugan, label: "Baby Shoot" },
  { src: maternity01, label: "Maternity Glow" },
  { src: thaliMacro, label: "Sacred Rituals" },
  { src: anniversary04, label: "Fairy Lights" },
];

function HeroSlideshowChip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[index];

  return (
    <motion.div
      className="absolute -top-7 -right-3 sm:-right-7 lg:-right-9 hidden sm:block w-36 h-48 sm:w-44 sm:h-56 lg:w-48 lg:h-60 rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-brand-900/30 rotate-3 transition-transform duration-500 hover:rotate-0 z-20 bg-slate-950"
      initial={{ opacity: 0, scale: 0.85, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.85 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          <img
            src={slide.src}
            alt={slide.label}
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient shadow and category badge */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-6 flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold text-white tracking-wider uppercase bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
              {slide.label}
            </span>
            {/* Dots indicator */}
            <div className="flex gap-1">
              {SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-3 bg-brand-300" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-100 via-brand-50 to-white">
      {/* Decorative aperture */}
      <svg
        className="absolute -top-24 -right-24 w-[420px] h-[420px] text-brand-300/40 pointer-events-none"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse key={a} cx="100" cy="100" rx="120" ry="34" fill="currentColor" opacity="0.7" transform={`rotate(${a} 100 100)`} />
        ))}
      </svg>

      <Container className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.p
              className="eyebrow mb-4 inline-flex items-center gap-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block h-px w-8 bg-brand-500 align-middle" />
              Thiruvarur · Premium Photography
            </motion.p>

            <motion.h1
              className="text-hero"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              Capturing moments,<br />
              <span className="text-brand-600">crafting stories.</span>
            </motion.h1>

            <motion.p
              className="text-body mt-5 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
            >
              Royal &amp; elegant photography for weddings, celebrations and
              everyday life — every frame a memory you will never want to lose.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36 }}
            >
              <Button to="/book" variant="primary">
                Book Your Session <ArrowRight size={18} />
              </Button>
              <Button to="/portfolio" variant="outline">
                View Portfolio
              </Button>
            </motion.div>

            {/* Trust feature chips replacing empty space */}
            <motion.div
              className="mt-8 pt-6 border-t border-brand-200/60 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-xs sm:text-sm font-medium text-brand-800"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48 }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                <span>Thiruvarur &amp; Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star size={15} className="fill-amber-400 text-amber-400" />
                <span className="font-bold text-brand-900">4.9/5</span>
                <span className="text-brand-600">Rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-brand-600" />
                <span>3D Custom Frames</span>
              </div>
            </motion.div>
          </div>

          {/* Editorial photo section */}
          <motion.div
            className="relative mx-auto max-w-md lg:max-w-none"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-brand-900/15">
              <motion.img
                src={heroImg}
                alt="RJV Studios featured photograph"
                className="absolute inset-0 h-full w-full object-cover"
                width={720}
                height={900}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />

              {/* Floating stat card */}
              <motion.div
                className="absolute bottom-4 left-4 z-10 rounded-2xl bg-white/95 backdrop-blur-md px-4 sm:px-5 py-3 sm:py-4 shadow-xl shadow-brand-900/20 border border-brand-200/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <p className="text-xl sm:text-2xl font-bold text-brand-900">1000+</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-600">Smiles preserved</p>
              </motion.div>
            </div>

            {/* Free-style larger animated slideshow chip */}
            <HeroSlideshowChip />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
