// src/pages/Services.jsx
import React from "react";
import { motion } from "framer-motion";
import Seo from "../components/common/Seo";
import Container from "../components/common/Container";
import ServiceCard from "../components/services/ServiceCard";
import BookingCTA from "../components/home/BookingCTA";
import { services } from "../data/services";
import { useScrollReveal, staggerContainer, staggerItem } from "../hooks/useScrollReveal";

export default function Services() {
  return (
    <>
      <Seo
        title="Photography Services & Packages in Thiruvarur"
        description="Explore RJV Studios photography services in Thiruvarur — weddings, engagements, baby shoots, puberty ceremonies, outdoor portraits, and event cinematography."
        path="/services"
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-brand-100 via-brand-50 to-white pt-20 pb-12 lg:pt-28 text-center">
        <Container>
          <motion.div {...useScrollReveal({ y: 16 })}>
            <p className="eyebrow mb-4">Our services</p>
            <h1 className="text-section max-w-2xl mx-auto">
              A service for every celebration
            </h1>
            <p className="text-body mt-6 max-w-xl mx-auto">
              Weddings, engagements, baby sessions, ceremonies and events — each
              captured with the same care and polish.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-7 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} revealProps={staggerItem} />
            ))}
          </motion.div>
        </Container>
      </section>

      <BookingCTA />
    </>
  );
}