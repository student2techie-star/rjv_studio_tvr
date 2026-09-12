// src/components/home/SocialSection.jsx
import React from "react";
import { motion } from "framer-motion";
import Container from "../common/Container";
import SocialIcon from "../common/SocialIcons";
import { social } from "../../data/social";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function SocialSection() {
  const reveal = useScrollReveal();

  return (
    <section className="relative overflow-hidden bg-brand-900 py-20 lg:py-24">
      {/* Decorative aperture */}
      <svg
        className="absolute -bottom-40 -left-24 w-[460px] h-[460px] text-brand-300/10 pointer-events-none"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse key={a} cx="100" cy="100" rx="125" ry="36" fill="currentColor" transform={`rotate(${a} 100 100)`} />
        ))}
      </svg>

      <Container className="relative text-center">
        <motion.div {...reveal}>
          <p className="eyebrow text-brand-300 mb-4">Stay with us</p>
          <h2 className="text-section !text-white">Follow the journey</h2>
          <p className="text-body !text-brand-100/90 mt-5 max-w-xl mx-auto">
            New weddings, behind-the-scenes reels and daily stories — join us on
            Instagram, YouTube and WhatsApp.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {social.map((s) => (
              <motion.a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-brand-100/20 bg-white/5 px-6 py-3.5 text-brand-100 transition-colors hover:bg-brand-300 hover:text-brand-900"
                whileHover={{ y: -4 }}
              >
                <SocialIcon name={s.icon} size={18} />
                <span className="font-semibold text-sm">{s.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}