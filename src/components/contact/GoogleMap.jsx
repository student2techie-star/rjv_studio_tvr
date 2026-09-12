// src/components/contact/GoogleMap.jsx
import React from "react";
import { MapPin, ExternalLink } from "lucide-react";

// Street View embed for the studio (no API key needed). Configure via .env.
const MAP_EMBED_URL = (import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL || "").trim();

// Full-screen Street View for the exact same panorama.
const STREET_VIEW_LINK =
  "https://www.google.com/maps/@10.7741953,79.6338374,3a,75y,90t/data=!3m7!1e1!3m5!1sDMGIOPFVYU501Opgx0BbIQ!2e0!6shttps:%2F%2Fwww.google.com%2Fmaps%2Fplace%2FRJV%2BStudios%2B%26%2BFrames%2F%4010.7741953%2C79.6338374!8m2!3d10.7741953!4d79.6338374";

export default function GoogleMap() {
  if (MAP_EMBED_URL) {
    return (
      <div className="overflow-hidden rounded-3xl border border-brand-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-100 bg-white px-4 py-3 sm:px-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-brand-900">
            <MapPin size={16} className="text-brand-500" />
            RJV Studios &amp; Frames — Street View
          </p>
          <a
            href={STREET_VIEW_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1 text-sm"
          >
            Open in Google Maps <ExternalLink size={14} />
          </a>
        </div>
        <iframe
          title="RJV Studios street view"
          src={MAP_EMBED_URL}
          className="h-[420px] w-full border-0"
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
          The studio street view is nearly ready. Set{" "}
          <code className="rounded bg-brand-100 px-1.5 py-0.5 text-xs">VITE_GOOGLE_MAPS_EMBED_URL</code>{" "}
          in your <code className="rounded bg-brand-100 px-1.5 py-0.5 text-xs">.env</code> to
          show the location, or ask us directly on WhatsApp — we'll share the exact spot.
        </p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=RJV%20Studios%20%26%20Frames%4010.7741953%2C79.6338374"
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