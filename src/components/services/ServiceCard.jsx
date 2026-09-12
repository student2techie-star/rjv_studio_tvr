// src/components/services/ServiceCard.jsx
import React from "react";
import { motion } from "framer-motion";

export default function ServiceCard({ service }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 text-center"
      whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
    >
      <img src={service.image} alt={service.title} className="mx-auto mb-4 w-24 h-24 object-cover rounded-full" />
      <h3 className="text-xl font-semibold text-brand-800 mb-2">{service.title}</h3>
      <p className="text-brand-700">{service.description}</p>
    </motion.div>
  );
}
