// src/components/services/ServiceCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getWhatsAppUrl } from "../../utils/whatsapp";

export default function ServiceCard({ service, revealProps }) {
  return (
    <motion.article
      {...revealProps}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-brand-200/70 shadow-sm shadow-brand-900/5 transition-shadow hover:shadow-xl hover:shadow-brand-900/10"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover"
          loading="lazy"
          width={640}
          height={480}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-brand-800">
          {service.number}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-brand-900">{service.title}</h3>
        <p className="text-sm leading-relaxed text-brand-600 mt-2.5">{service.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {service.features.map((f) => (
            <li key={f} className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800">
              {f}
            </li>
          ))}
        </ul>

        <a
          href={getWhatsAppUrl("service", service.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-auto pt-6 inline-flex items-center gap-1.5 text-sm"
        >
          Enquire on WhatsApp <ArrowRight size={16} />
        </a>
      </div>
    </motion.article>
  );
}