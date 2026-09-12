// src/pages/Contact.jsx
// Contact page — map, contact details, and social links.
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import Seo from "../components/common/Seo";
import Container from "../components/common/Container";
import GoogleMap from "../components/contact/GoogleMap";
import SocialIcon from "../components/common/SocialIcons";
import { createWhatsAppUrl } from "../utils/whatsapp";
import { useScrollReveal, staggerContainer, staggerItem } from "../hooks/useScrollReveal";

const SOCIALS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    handle: "+91 90034 30930",
    note: "Fastest reply — usually within the hour.",
    url: createWhatsAppUrl("Hello! I'd like to know more about RJV Studios."),
    icon: "whatsapp",
    color: "bg-green-50 text-green-700 border-green-200",
    iconBg: "bg-green-100 text-green-700",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@rjv_studios_tvr",
    note: "DMs open for bookings & enquiries.",
    url: "https://www.instagram.com/rjv_studios_tvr/",
    icon: "instagram",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    iconBg: "bg-pink-100 text-pink-700",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "RJV Studios TVR",
    note: "Cinematic films & behind-the-scenes.",
    url: "https://www.youtube.com/@rjvstudiostvr7354",
    icon: "youtube",
    color: "bg-red-50 text-red-700 border-red-200",
    iconBg: "bg-red-100 text-red-700",
  },
];

const INFO = [
  {
    icon: MapPin,
    label: "Location",
    value: "Thiruvarur, Tamil Nadu, India",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91 90034 30930",
    href: "tel:+919003430930",
  },
  {
    icon: Mail,
    label: "Email",
    value: "rjvstudiostvr@gmail.com",
    href: "mailto:rjvstudiostvr@gmail.com",
  },
];

export default function Contact() {
  const reveal = useScrollReveal({ y: 16 });

  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with RJV Studios — find us on WhatsApp, Instagram, YouTube, or visit us in Thiruvarur."
        path="/contact"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-100 via-brand-50 to-white pt-20 pb-12 lg:pt-28 text-center">
        <Container>
          <motion.div {...reveal}>
            <p className="eyebrow mb-4">Get in touch</p>
            <h1 className="text-section max-w-2xl mx-auto">
              Find us &amp; connect
            </h1>
            <p className="text-body mt-6 max-w-xl mx-auto">
              We're based in Thiruvarur, Tamil Nadu. Reach us on WhatsApp,
              Instagram or YouTube — we'd love to hear from you.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>

          {/* Contact info cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-3 mb-14"
          >
            {INFO.map((item) => (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className="flex items-start gap-4 rounded-2xl border border-brand-200/70 bg-white p-5 shadow-sm"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
                  <item.icon size={20} />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-brand-500 mb-0.5">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="block font-semibold text-brand-900 hover:text-brand-600 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="block font-semibold text-brand-900">{item.value}</span>
                  )}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div {...useScrollReveal({ delay: 0.05 })} className="mb-14">
            <h2 className="text-xl font-bold text-brand-900 mb-6">Follow &amp; connect</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center gap-4 rounded-2xl border p-5 transition-shadow hover:shadow-lg ${s.color}`}
                >
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${s.iconBg}`}>
                    <SocialIcon name={s.icon} size={24} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-0.5">
                      {s.label}
                    </span>
                    <span className="block truncate font-bold text-base">{s.handle}</span>
                    <span className="block text-xs opacity-70 mt-0.5">{s.note}</span>
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div {...useScrollReveal({ delay: 0.1 })}>
            <h2 className="text-xl font-bold text-brand-900 mb-6">Visit the studio</h2>
            <GoogleMap />
          </motion.div>

        </Container>
      </section>
    </>
  );
}