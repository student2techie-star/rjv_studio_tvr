// src/components/home/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";

export default function Hero() {
  return (
    <section className="relative bg-brand-100 min-h-screen flex items-center">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 p-8">
        {/* Text column */}
        <div className="flex flex-col justify-center space-y-6">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-brand-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          >
            Capturing Moments, Crafting Stories
          </motion.h1>
          <motion.p
            className="text-base md:text-lg leading-relaxed text-brand-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.2 } }}
          >
            Premium photography services for weddings, engagements, events, and more.
          </motion.p>
          <Button className="self-start" onClick={() => window.location.href = "/contact"}>
            Book Your Session
          </Button>
        </div>
        {/* Image column */}
        <div className="relative">
          <motion.img
            src="/images/hero-placeholder.webp"
            alt="Editorial photography"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.3 } }}
          />
        </div>
      </div>
    </section>
  );
}
