// src/components/portfolio/PortfolioGrid.jsx
import React from "react";
import { motion } from "framer-motion";
import { portfolio } from "../../data/portfolio";

export default function PortfolioGrid({ category = "All" }) {
  const filtered =
    category === "All"
      ? portfolio
      : portfolio.filter((item) => item.category === category.toLowerCase());

  return (
    <section className="py-12 bg-brand-50">
      <div className="container mx-auto grid gap-4 auto-rows-fr" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
        {filtered.map((item) => (
          <motion.div
            key={item.id}
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            <img src={item.image} alt={item.alt} className="w-full h-full object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <h3 className="text-white text-lg font-semibold">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
