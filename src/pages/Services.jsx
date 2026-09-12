// src/pages/Services.jsx
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, CalendarCheck } from "lucide-react";
import Seo from "../components/common/Seo";
import Container from "../components/common/Container";
import ServiceCard from "../components/services/ServiceCard";
import BookingCTA from "../components/home/BookingCTA";
import { services } from "../data/services";
import { getWhatsAppUrl } from "../utils/whatsapp";
import { useScrollReveal, staggerContainer, staggerItem } from "../hooks/useScrollReveal";

export default function Services() {
  return (
    <>
      <Seo
        title="Photography Services & Packages in Thiruvarur"
        description="Explore RJV Studios photography services in Thiruvarur — weddings, engagements, baby shoots, puberty ceremonies, outdoor portraits, and event cinematography."
        path="/services"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-100 via-brand-50 to-white pt-20 pb-12 lg:pt-28 text-center">
        <Container>
          <motion.div {...useScrollReveal({ y: 16 })}>
            <p className="eyebrow mb-4">Our Services &amp; Packages</p>
            <h1 className="text-section max-w-3xl mx-auto">
              Event-by-Event Coverage Tailored for Your Celebration
            </h1>
            <p className="text-body mt-6 max-w-xl mx-auto">
              Every tradition, ceremony, and milestone captured with dedicated care.
              Browse our itemized event lists below.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Itemized Detailed Services Section */}
      <section className="py-12 lg:py-16 bg-transparent">
        <Container className="space-y-12 lg:space-y-16">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              {...useScrollReveal({ delay: 0.05 * idx })}
              className="card-soft border-3d bg-white p-6 sm:p-8 lg:p-10 rounded-3xl grid gap-8 lg:grid-cols-12 items-center shadow-lg"
            >
              {/* Image Column */}
              <div className={`lg:col-span-5 ${idx % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-brand-200/60 bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${service.imagePosition || "object-center"}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-4 left-4 bg-brand-900 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md">
                    Service {service.number}
                  </span>
                </div>
              </div>

              {/* Content Column */}
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                <div className="flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">
                  <Sparkles size={16} className="text-brand-500" />
                  <span>RJV Studios Experience</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
                  {service.title}
                </h2>
                <p className="text-sm sm:text-base text-brand-600 mt-2 leading-relaxed">
                  {service.tagline}
                </p>

                {/* Itemized Events Covered List (Grid of Checkmarks) */}
                <div className="mt-6 pt-5 border-t border-brand-100/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-3.5 flex items-center gap-2">
                    <CalendarCheck size={16} className="text-brand-600" />
                    <span>Events &amp; Rituals Covered:</span>
                  </h3>

                  <ul className="grid gap-3 sm:grid-cols-2">
                    {service.events.map((evt) => (
                      <li
                        key={evt}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-brand-50/70 border border-brand-100/60 text-xs sm:text-sm font-medium text-brand-900 shadow-xs"
                      >
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                        <span>{evt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Feature Tags & Action Buttons */}
                <div className="mt-6 pt-5 border-t border-brand-100/60 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((f) => (
                      <span key={f} className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
                        {f}
                      </span>
                    ))}
                  </div>

                  <a
                    href={getWhatsAppUrl("service", service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dark text-xs sm:text-sm py-2.5 px-5 inline-flex items-center gap-2 rounded-full font-semibold shadow-md"
                  >
                    Enquire for {service.title} <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </Container>
      </section>

      {/* Grid Overview */}
      <section className="py-12 lg:py-16 bg-brand-50">
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
              Quick Package Overview
            </h2>
            <p className="text-caption mt-2">Compare services at a glance</p>
          </div>

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