// src/components/common/Seo.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL =
  (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "") ||
  "https://student2techie-star.github.io/rjv_studio_tvr";

export default function Seo({ title, description, image, path = "/" }) {
  const fullTitle = title ? `${title} — RJV Studios` : "RJV Studios — Premium Photography";
  const canonical = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/images/og-home.webp`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}