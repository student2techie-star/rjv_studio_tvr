// src/components/contact/ContactInfo.jsx
import React from "react";
import { motion } from "framer-motion";
import SocialIcon from "../common/SocialIcons";
import { createWhatsAppUrl } from "../../utils/whatsapp";
import { useScrollReveal, staggerContainer, staggerItem } from "../../hooks/useScrollReveal";

const CARDS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+91 90034 30930",
    note: "Fastest reply — usually within the hour.",
    url: createWhatsAppUrl("Hello, I'd like to get in touch with RJV Studios."),
    icon: "whatsapp",
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "@rjv_studios_tvr",
    note: "DMs open for bookings & enquiries.",
    url: "https://www.instagram.com/rjv_studios_tvr/",
    icon: "instagram",
  },
  {
    id: "youtube",
    label: "YouTube",
    value: "RJV Studios TVR",
    note: "Cinematic films & behind-the-scenes.",
    url: "https://www.youtube.com/@rjvstudiostvr7354",
    icon: "youtube",
  },
];

export default function ContactInfo() {
  const reveal = useScrollReveal();

  return (
    <motion.div {...reveal} className="space-y-4">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
        {CARDS.map((c) => (
          <motion.a
            key={c.id}
            variants={staggerItem}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-brand-200/70 bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-brand-900/5"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
              <SocialIcon name={c.icon} size={22} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-widest text-brand-500">
                {c.label}
              </span>
              <span className="block truncate font-semibold text-brand-900">{c.value}</span>
              <span className="block text-xs text-brand-500">{c.note}</span>
            </span>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}