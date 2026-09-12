// src/components/services/ServiceCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, CalendarCheck } from "lucide-react";
import { getWhatsAppUrl } from "../../utils/whatsapp";

export default function ServiceCard({ service, revealProps }) {
  return (
    <motion.article
      {...revealProps}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-brand-200/70 shadow-sm shadow-brand-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-brand-900/10 border-3d"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <motion.img
          src={service.image}
          alt={service.title}
          className={`h-full w-full object-cover ${service.imagePosition || "object-center"}`}
          loading="lazy"
          decoding="async"
          width={640}
          height={400}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-brand-800 shadow-sm">
          {service.number}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-bold text-brand-900">{service.title}</h3>
        <p className="text-xs sm:text-sm text-brand-600 mt-2 leading-relaxed">
          {service.tagline}
        </p>

        {/* Itemized Events Covered List */}
        <div className="mt-5 pt-4 border-t border-brand-100/80">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-3 flex items-center gap-1.5">
            <CalendarCheck size={14} className="text-brand-600" />
            <span>Events Covered:</span>
          </p>

          <ul className="space-y-2.5">
            {service.events.map((evt) => (
              <li key={evt} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-brand-900 leading-snug">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>{evt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Highlight Badges */}
        <ul className="mt-6 pt-4 border-t border-brand-100/60 flex flex-wrap gap-1.5">
          {service.features.map((f) => (
            <li key={f} className="rounded-full bg-brand-100/80 px-2.5 py-1 text-[11px] font-semibold text-brand-800">
              {f}
            </li>
          ))}
        </ul>

        {/* WhatsApp CTA */}
        <a
          href={getWhatsAppUrl("service", service.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-6 pt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-900"
        >
          Enquire on WhatsApp <ArrowRight size={16} />
        </a>
      </div>
    </motion.article>
  );
}