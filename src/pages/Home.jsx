// src/pages/Home.jsx
import React from "react";
import Seo from "../components/common/Seo";
import Hero from "../components/home/Hero";
import Intro from "../components/home/Intro";
import ServicesPreview from "../components/home/ServicesPreview";
import FeaturedPortfolio from "../components/home/FeaturedPortfolio";
import SocialSection from "../components/home/SocialSection";
import BookingCTA from "../components/home/BookingCTA";

export default function Home() {
  return (
    <>
      <Seo
        title="Premium Photography"
        description="RJV Studios — premium wedding, ceremony, baby, portrait and event photography from Thiruvarur. Preserve your precious moments with an editorial touch."
        path="/"
      />
      <Hero />
      <Intro />
      <ServicesPreview />
      <FeaturedPortfolio />
      <SocialSection />
      <BookingCTA />
    </>
  );
}