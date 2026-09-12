import React, { useState } from "react";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";
import PortfolioFilter from "../components/portfolio/PortfolioFilter";

export default function Portfolio() {
  const [active, setActive] = useState("All");

  return (
    <div className="py-12 bg-brand-50 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-center text-4xl font-bold text-brand-900 mb-6">
          Portfolio
        </h1>
        <PortfolioFilter active={active} setActive={setActive} />
        <PortfolioGrid category={active} />
      </div>
    </div>
  );
}
