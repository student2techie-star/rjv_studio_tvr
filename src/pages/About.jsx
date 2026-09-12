// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import Seo from "../components/common/Seo";
import Container from "../components/common/Container";
import SectionHeading from "../components/common/SectionHeading";
import { useScrollReveal, staggerContainer, staggerItem } from "../hooks/useScrollReveal";
import weddingImg from "../assets/images/weddings/anniversary-03.webp";
import portraitImg from "../assets/images/portraits/shoot-02.webp";

const VALUES = [
  {
    title: "Story-first",
    body: "We photograph what matters — the laughter, the tears, the quiet looks between two people.",
  },
  {
    title: "Editorial craft",
    body: "Thoughtful light, considered composition and clean, film-like colour in every frame.",
  },
  {
    title: "Made with care",
    body: "Every album is hand-curated. We treat your memories with the reverence they deserve.",
  },
];

export default function About() {
  const reveal = useScrollReveal();

  return (
    <>
      <Seo
        title="About Us — Professional Photographers in Thiruvarur"
        description="Learn about RJV Studios — Thiruvarur's trusted photography studio specializing in editorial wedding stories, family portraits, and handcrafted photo frames."
        path="/about"
      />

      {/* Page hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-100 via-brand-50 to-white pt-20 pb-16 lg:pt-28 lg:pb-24 text-center">
        <Container>
          <motion.div {...useScrollReveal({ y: 16 })}>
            <p className="eyebrow mb-4">Our story</p>
            <h1 className="text-section max-w-2xl mx-auto">
              A love for light, a devotion to detail
            </h1>
            <p className="text-body mt-6 max-w-xl mx-auto">
              RJV Studios began with a simple belief — that the biggest gift you
              can give a family is the past, preserved beautifully.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <motion.div {...reveal} className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl shadow-brand-900/10">
                <img src={weddingImg} alt="RJV Studios wedding story" className="h-full w-full object-cover" loading="lazy" decoding="async" width={640} height={800} />
              </div>
              <div className="absolute -bottom-8 -right-4 sm:-right-8 hidden sm:block w-44 aspect-[3/4] overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
                <img src={portraitImg} alt="RJV Studios portrait work" className="h-full w-full object-cover" loading="lazy" decoding="async" width={300} height={400} />
              </div>
            </motion.div>

            <motion.div {...useScrollReveal({ delay: 0.12 })}>
              <p className="eyebrow mb-4">Who we are</p>
              <h2 className="text-section">The people behind the lens</h2>
              <p className="text-body mt-6">
                A small team of photographers, editors and storytellers based in
                Thiruvarur, Tamil Nadu. We specialise in weddings, ceremonies and
                forever-portraits — blending traditional warmth with a modern,
                editorial finish.
              </p>
              <p className="text-body mt-4">
                Whether it's a grand celebration or a quiet family afternoon, we
                arrive early, stay present and leave with images that feel like
                you — not like a template.
              </p>
              <p className="text-lead mt-8 text-brand-900">
                "We preserve your precious moments."
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-brand-50">
        <Container>
          <SectionHeading eyebrow="How we work" title="What you can expect" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {VALUES.map((v) => (
              <motion.div key={v.title} variants={staggerItem} className="card-soft p-8 text-center">
                <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-brand-300/50 text-brand-900 font-bold text-lg">
                  ◆
                </span>
                <h3 className="text-xl font-semibold text-brand-900">{v.title}</h3>
                <p className="text-caption mt-3">{v.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  );
}