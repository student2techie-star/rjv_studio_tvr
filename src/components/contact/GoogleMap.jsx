// src/components/contact/GoogleMap.jsx
import React from "react";
import { MapPin, ExternalLink } from "lucide-react";

// Normal map embed — no API key needed for public embeds.
const LAT  = "10.7741953";
const LNG  = "79.6338374";
const ZOOM = "16";

// Standard Google Maps embed URL (normal map view)
const MAP_EMBED_URL =
  `https://maps.google.com/maps?q=${LAT},${LNG}&z=${ZOOM}&output=embed`;

// Full Google Maps link to open in a new tab
const MAPS_LINK =
  `https://www.google.com/maps/search/?api=1&query=RJV%20Studios%20%26%20Frames@${LAT},${LNG}`;

export default function GoogleMap() {
  return (
    <div className="overflow-hidden rounded-3xl border border-brand-200 shadow-sm">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-100 bg-white px-4 py-3 sm:px-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand-900">
          <MapPin size={16} className="text-brand-500" />
          RJV Studios &amp; Frames — Thiruvarur
        </p>
        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex items-center gap-1 text-sm"
        >
          Open in Google Maps <ExternalLink size={14} />
        </a>
      </div>

      {/* Normal map iframe */}
      <iframe
        title="RJV Studios location map"
        src={MAP_EMBED_URL}
        className="h-[420px] w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}