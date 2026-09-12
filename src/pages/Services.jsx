// src/pages/Services.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import Container from "../components/common/Container";
import ServiceCard from "../components/services/ServiceCard";
import { services } from "../data/services";

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services – RJV Studios</title>
        <meta name="description" content="Explore the premium photography services offered by RJV Studios, including wedding, engagement, portrait, and more." />
        <link rel="canonical" href="/services" />
        <meta property="og:title" content="Services – RJV Studios" />
        <meta property="og:description" content="Explore the premium photography services offered by RJV Studios, including wedding, engagement, portrait, and more." />
        <meta property="og:image" content="/images/og-services.webp" />
      </Helmet>
      <Container className="py-16">
        <h1 className="text-4xl md:text-5xl font-semibold text-brand-800 mb-8 text-center">Our Services</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((svc) => (
            <ServiceCard key={svc.id} service={svc} />
          ))}
        </div>
      </Container>
    </>
  );
}
