// src/pages/Contact.jsx
import React from "react";
import { motion } from "framer-motion";
import Seo from "../components/common/Seo";
import Container from "../components/common/Container";
import ContactInfo from "../components/contact/ContactInfo";
import BookingForm from "../components/contact/BookingForm";
import GoogleMap from "../components/contact/GoogleMap";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Contact() {
  const reveal = useScrollReveal({ y: 16 });

  return (
    <>
      <Seo
        title="Book Now"
        description="Book your photography session with RJV Studios — share your event details and get a personalised plan within 24 hours."
        path="/contact"
      />

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

      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] items-start">
            <motion.div {...useScrollReveal({ delay: 0.05 })}>
              <ContactInfo />
            </motion.div>
            <motion.div {...useScrollReveal({ delay: 0.12 })}>
              <BookingForm />
            </motion.div>
          </div>

          <div className="mt-16">
            <h2 className="text-section text-center mb-8">Visit the studio</h2>
            <GoogleMap />
          </div>
        </Container>
      </section>
    </>
  );
}