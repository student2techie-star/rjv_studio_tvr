// src/components/home/FeaturedPortfolio.jsx
import React from "react";
import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";
import { portfolio } from "../../data/portfolio";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const FEATURED_IDS = [1, 4, 7, 8, 10, 3];

const SPANS = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "sm:row-span-2",
  "",
  "sm:col-span-2",
];

export default function FeaturedPortfolio() {
  const reveal = useScrollReveal();
  const items = FEATURED_IDS.map((id) => portfolio.find((p) => p.id === id)).filter(Boolean);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="A few favourite frames"
          description="A glimpse into the moments we have been trusted to keep."
        />

        <motion.div
          {...reveal}
          className="grid-flow-dense grid auto-rows-[160px] sm:auto-rows-[200px] grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl ${SPANS[i] || ""}`}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
                variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-brand-900/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-4 right-4 translate-y-2 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.title}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Button to="/portfolio" variant="dark">
            Explore full portfolio
          </Button>
        </div>
      </Container>
    </section>
  );
}