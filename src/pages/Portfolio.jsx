// src/pages/Portfolio.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Seo from "../components/common/Seo";
import Container from "../components/common/Container";
import PortfolioFilter from "../components/portfolio/PortfolioFilter";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";
import BookingCTA from "../components/home/BookingCTA";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const reveal = useScrollReveal({ y: 16 });

  return (
    <>
      <Seo
        title="Portfolio"
        description="Browse the RJV Studios portfolio — weddings, ceremonies, portraits, baby shoots and events captured across Tamil Nadu."
        path="/portfolio"
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-brand-100 via-brand-50 to-white pt-20 pb-10 lg:pt-28 text-center">
        <Container>
          <motion.div {...reveal}>
            <p className="eyebrow mb-4">Portfolio</p>
            <h1 className="text-section max-w-2xl mx-auto">
              Moments we've been trusted to keep
            </h1>
            <p className="text-body mt-6 max-w-xl mx-auto">
              Tap any frame to view it full-screen. Filter by celebration to find
              the style that feels like you.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-12 lg:py-16 bg-transparent">
        <Container>
          <PortfolioFilter active={active} setActive={setActive} />
          <PortfolioGrid category={active} />
        </Container>
      </section>

      <BookingCTA />
    </>
  );
}