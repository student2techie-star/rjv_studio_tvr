// src/pages/Book.jsx
// "Book Now" page — only shows the booking form.
import React from "react";
import { motion } from "framer-motion";
import Seo from "../components/common/Seo";
import Container from "../components/common/Container";
import BookingForm from "../components/contact/BookingForm";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Book() {
  const reveal = useScrollReveal({ y: 16 });

  return (
    <>
      <Seo
        title="Book a Session"
        description="Book your photography session with RJV Studios — share your event details and get a personalised plan within 24 hours."
        path="/book"
      />

      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-100 via-brand-50 to-white pt-20 pb-12 lg:pt-28 text-center">
        <Container>
          <motion.div {...reveal}>
            <p className="eyebrow mb-4">Book now</p>
            <h1 className="text-section max-w-2xl mx-auto">
              Tell us about your celebration
            </h1>
            <p className="text-body mt-6 max-w-xl mx-auto">
              Fill in the form and continue on WhatsApp — your enquiry arrives
              pre-filled and we reply within 24 hours.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Booking form only */}
      <section className="py-12 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <motion.div {...useScrollReveal({ delay: 0.1 })}>
              <BookingForm />
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
