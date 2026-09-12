// src/components/common/WhatsAppButton.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import SocialIcon from "./SocialIcons";
import { createWhatsAppUrl } from "../../utils/whatsapp";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function WhatsAppButton() {
  const { pathname } = useLocation();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Keep clear of the Frames uploader controls.
  if (pathname.startsWith("/frames")) return null;

  const url = createWhatsAppUrl(
    "Hello, I would like to know more about RJV Studios photography services."
  );

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RJV Studios on WhatsApp"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 1.2 } }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/20 hover:bg-[#1fb959] px-5 py-3.5 font-semibold"
    >
      <SocialIcon name="whatsapp" size={22} />
      {isDesktop && <span className="text-sm">WhatsApp</span>}
    </motion.a>
  );
}