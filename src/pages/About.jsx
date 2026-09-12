// src/pages/About.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import Container from "../components/common/Container";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About – RJV Studios</title>
        <meta name="description" content="Learn about RJV Studios' philosophy, team, and approach to premium photography." />
        <link rel="canonical" href="/about" />
        <meta property="og:title" content="About – RJV Studios" />
        <meta property="og:description" content="Learn about RJV Studios' philosophy, team, and approach to premium photography." />
        <meta property="og:image" content="/images/og-about.webp" />
      </Helmet>
      <Container className="py-16">
        <h1 className="text-4xl md:text-5xl font-semibold text-brand-800 mb-6">Our Story</h1>
        <p className="text-base md:text-lg leading-relaxed text-brand-700">
          RJV Studios was founded with a passion for capturing timeless moments through an editorial lens. Our team blends artistic vision with technical expertise to deliver images that tell a story.
        </p>
        {/* Add more narrative, team photos, etc. */}
      </Container>
    </>
  );
}
