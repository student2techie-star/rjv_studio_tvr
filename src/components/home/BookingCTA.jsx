// src/components/home/BookingCTA.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Container from "../common/Container";
import Button from "../common/Button";
import { createWhatsAppUrl } from "../../utils/whatsapp";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function BookingCTA() {
  const reveal = useScrollReveal();

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <motion.div
          {...reveal}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-200 via-brand-100 to-white p-10 sm:p-16 text-center"
        >
          {/* Decorative corner accent */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-300/30 pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-48 h-48 rounded-full bg-brand-400/20 pointer-events-none" />

          <div className="relative">
            <p className="eyebrow mb-4">Ready to begin?</p>
            <h2 className="text-section !text-brand-900 max-w-lg mx-auto">
              Let's plan something beautiful together.
            </h2>
            <p className="text-body mt-5 max-w-xl mx-auto">
              Share a few details about your event and we'll create a
              personalised photography plan within 24 hours.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button to="/contact" variant="dark">
                Open booking form <ArrowRight size={18} />
              </Button>
              <a
                href={createWhatsAppUrl(
                  "Hello, I would like to enquire about a photography booking at RJV Studios."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <MessageCircle size={18} /> WhatsApp us
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}