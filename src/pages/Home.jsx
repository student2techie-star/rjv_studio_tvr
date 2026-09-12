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
        title="Best Photography Studio & Photo Frames in Thiruvarur"
        description="RJV Studios — Premium wedding photography, baby shoots, event videography and custom photo frames in Thiruvarur, Tamil Nadu. Book your shoot today!"
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