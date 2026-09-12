// src/components/portfolio/PortfolioFilter.jsx
import React from "react";
import { motion } from "framer-motion";
import { portfolioCategories } from "../../data/portfolio";

export default function PortfolioFilter({ active, setActive }) {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2.5 mb-12"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      role="tablist"
      aria-label="Filter portfolio"
    >
      {portfolioCategories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setActive(cat)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ${
              isActive
                ? "bg-brand-900 text-white shadow-md shadow-brand-900/25 scale-105"
                : "bg-white text-brand-700 border border-brand-200 hover:border-brand-400 hover:bg-brand-100"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </motion.div>
  );
}