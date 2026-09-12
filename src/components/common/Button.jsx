// src/components/common/Button.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      className={`bg-brand-500 hover:bg-brand-600 text-white font-semibold py-2 px-4 rounded transition-colors ${className}`}
    >
      {children}
    </motion.button>
  );
}
