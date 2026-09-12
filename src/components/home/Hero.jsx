// src/components/home/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "../common/Container";
import Button from "../common/Button";
import heroImg from "../../assets/images/hero.png";
import weddingImg from "../../assets/images/weddings/anniversary-01.jpg";

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

      <Container className="relative pt-10 pb-24 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.p
              className="eyebrow mb-5 inline-flex items-center gap-2"
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
              className="text-body mt-6 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
            >
              Royal &amp; elegant photography for weddings, celebrations and
              everyday life — every frame a memory you will never want to lose.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-4"
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
          </div>

          {/* Editorial photo */}
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
            </div>

            {/* Floating stat card */}
            <motion.div
              className="absolute bottom-4 left-4 sm:-bottom-6 sm:-left-8 z-10 rounded-2xl bg-white/95 backdrop-blur-md px-4 sm:px-5 py-3 sm:py-4 shadow-xl shadow-brand-900/10 border border-brand-200/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="text-xl sm:text-2xl font-bold text-brand-900">1000+</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-600">Smiles preserved</p>
            </motion.div>

            {/* Floating image chip */}
            <motion.div
              className="absolute -top-5 -right-3 sm:-right-6 hidden sm:block w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-lg"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
            >
              <img src={weddingImg} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" width={112} height={112} />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
