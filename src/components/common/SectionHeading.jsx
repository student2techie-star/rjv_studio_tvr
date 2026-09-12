// src/components/common/SectionHeading.jsx
import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}) {
  const reveal = useScrollReveal({ y: 20 });
  const alignCls =
    align === "center"
      ? "text-center mx-auto"
      : align === "left"
        ? "text-left"
        : "text-right ml-auto";

  return (
    <motion.div
      {...reveal}
      className={`max-w-2xl ${alignCls} mb-12 lg:mb-16 ${className}`}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="text-section">{title}</h2>
      {description && <p className="text-body mt-5">{description}</p>}
    </motion.div>
  );
}