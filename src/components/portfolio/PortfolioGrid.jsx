// src/components/portfolio/PortfolioGrid.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { portfolio, categoryKey } from "../../data/portfolio";
import Lightbox from "./Lightbox";

// Editorial composition — mix of large, wide, tall and standard tiles.
const SPAN_PATTERN = [
  "lg:col-span-2 lg:row-span-2",
  "lg:row-span-2",
  "",
  "lg:col-span-2",
  "",
  "",
];

function spansFor(i) {
  return SPAN_PATTERN[i % SPAN_PATTERN.length] || "";
}

export default function PortfolioGrid({ category = "All" }) {
  const items = useMemo(() => {
    if (category === "All") return portfolio;
    const key = categoryKey(category);
    return portfolio.filter((item) => item.category === key);
  }, [category]);

  const [openIndex, setOpenIndex] = useState(null);
  const filtered = category !== "All";

  return (
    <>
      <motion.div
        layout
        className={
          filtered
            ? "grid-flow-dense grid auto-rows-[150px] sm:auto-rows-[190px] grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
            : "grid-flow-dense grid auto-rows-[150px] sm:auto-rows-[180px] grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        }
      >
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            layout
            type="button"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
            whileHover="hover"
            animate="rest"
            className={`group relative overflow-hidden rounded-2xl ${filtered ? "" : spansFor(i)}`}
            onClick={() => setOpenIndex(i)}
            aria-label={`Open ${item.title}`}
          >
            <motion.img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            {/* Hover overlay */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-900/75 via-brand-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="pointer-events-none absolute inset-x-4 bottom-3 left-4 text-left">
              <span className="block translate-y-2 text-base font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.title}
              </span>
            </span>
          </motion.button>
        ))}
      </motion.div>

      {items.length === 0 && (
        <p className="py-16 text-center text-body">
          No shots in this category yet — check back soon.
        </p>
      )}

      {openIndex !== null && items[openIndex] && (
        <Lightbox
          items={items}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}