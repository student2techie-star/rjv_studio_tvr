// src/components/portfolio/PortfolioFilter.jsx
import React from "react";
import { motion } from "framer-motion";

const categories = [
  "All",
  "Wedding",
  "Engagement",
  "Birthday",
  "Baby Shower",
  "Ceremony",
  "Kids",
  "Family",
  "Events",
  "Pre-Wedding",
  "Portrait",
];

export default function PortfolioFilter({ active, setActive }) {
  return (
    <motion.div className="flex flex-wrap justify-center gap-4 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-4 py-2 rounded-full border ${active === cat ? "bg-brand-500 text-white" : "bg-white text-brand-700"} hover:bg-brand-300 transition`}
        >
          {cat}
        </button>
      ))}
    </motion.div>
  );
}
