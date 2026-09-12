// src/components/home/ServicesPreview.jsx
import React from "react";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import ServiceCard from "../services/ServiceCard";
import Button from "../common/Button";
import { services } from "../../data/services";
import { staggerContainer, staggerItem } from "../../hooks/useScrollReveal";
import { motion } from "framer-motion";

export default function ServicesPreview() {
  const preview = services.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-brand-50">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Photography for every chapter"
          description="Choose a service or let us tailor a package to your celebration. Every shoot is planned, styled and delivered with care."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {preview.map((service) => (
            <ServiceCard key={service.id} service={service} revealProps={staggerItem} />
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Button to="/services" variant="dark">
            View all services
          </Button>
        </div>
      </Container>
    </section>
  );
}