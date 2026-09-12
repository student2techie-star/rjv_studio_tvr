// src/pages/Home.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/home/Hero";
// Placeholder imports for remaining home sections
import Intro from "../components/home/Intro";
import ServicesPreview from "../components/home/ServicesPreview";
import FeaturedPortfolio from "../components/home/FeaturedPortfolio";
import SocialSection from "../components/home/SocialSection";
import BookingCTA from "../components/home/BookingCTA";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>RJV Studios – Premium Photography</title>
        <meta name="description" content="Experience premium photography services – weddings, events, portraits, and more. Capture your moments with style and elegance." />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="RJV Studios – Premium Photography" />
        <meta property="og:description" content="Experience premium photography services – weddings, events, portraits, and more. Capture your moments with style and elegance." />
        <meta property="og:image" content="/images/og-home.webp" />
      </Helmet>
      <Hero />
      {/* The following sections can be fleshed out later */}
      {/* <Intro /> */}
      {/* <ServicesPreview /> */}
      {/* <FeaturedPortfolio /> */}
      {/* <SocialSection /> */}
      {/* <BookingCTA /> */}
    </>
  );
}
