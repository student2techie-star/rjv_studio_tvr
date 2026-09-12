// src/components/common/Seo.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL =
  (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "") ||
  "https://student2techie-star.github.io/rjv_studio_tvr";

export default function Seo({ title, description, image, path = "/" }) {
  const fullTitle = title
    ? `${title} | RJV Studios Thiruvarur`
    : "RJV Studios — Best Photography Studio & Photo Frames in Thiruvarur";
  
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogImage = image || `${SITE_URL}/images/og-home.webp`;
  const defaultDesc =
    "RJV Studios — Premium wedding photography, baby shoots, event videography and custom photo frames in Thiruvarur, Tamil Nadu.";

  const metaDesc = description || defaultDesc;

  // Dynamic Breadcrumb JSON-LD schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      ...(path !== "/"
        ? [
            {
              "@type": "ListItem",
              "position": 2,
              "name": title || path.replace("/", ""),
              "item": canonical
            }
          ]
        : [])
    ]
  };

  return (
    <Helmet>
      {/* Title & Description */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content="RJV Studios Thiruvarur" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImage} />

      {/* Dynamic Breadcrumbs Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}