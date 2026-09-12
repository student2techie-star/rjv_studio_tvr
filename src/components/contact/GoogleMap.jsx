// src/components/contact/GoogleMap.jsx
import React from "react";
import { MapPin, ExternalLink } from "lucide-react";

// Configure via .env — never hardcode an invented studio address.
const MAP_EMBED_URL = (import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL || "").trim();

export default function GoogleMap() {
  if (MAP_EMBED_URL) {
    return (
      <div className="overflow-hidden rounded-3xl border border-brand-200 shadow-sm h-[420px]">
        <iframe
          title="RJV Studios location on Google Maps"
          src={MAP_EMBED_URL}
          className="h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className="grid h-[420px] place-items-center rounded-3xl border border-dashed border-brand-300 bg-brand-50/60 p-8 text-center">
      <div className="max-w-sm">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-100 text-brand-600">
          <MapPin size={26} />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-brand-900">
          Find the studio
        </h3>
        <p className="text-caption mt-2">
          The studio map is nearly ready. Set{" "}
          <code className="rounded bg-brand-100 px-1.5 py-0.5 text-xs">VITE_GOOGLE_MAPS_EMBED_URL</code>{" "}
          in your <code className="rounded bg-brand-100 px-1.5 py-0.5 text-xs">.env</code> to
          show the location, or ask us directly on WhatsApp — we'll share the exact spot.
        </p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=RJV+Studios+Thiruvarur"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-4 inline-flex items-center gap-1.5 text-sm"
        >
          Open in Google Maps <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}