// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import PageTransition from "./components/layout/PageTransition";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LogoIntro from "./components/layout/LogoIntro";
import WhatsAppButton from "./components/common/WhatsAppButton";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Frames from "./pages/Frames";
import Contact from "./pages/Contact";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Runs the logo intro only once per browser session.
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("logoIntroShown") === "true";
    if (alreadyShown) setShowIntro(false);
  }, []);

  return (
    <HelmetProvider>
      <Router basename="/rjv_studio_tvr">
        {showIntro && <LogoIntro onFinish={() => setShowIntro(false)} />}
        <Header />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/frames" element={<Frames />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </PageTransition>
        <Footer />
        <WhatsAppButton />
      </Router>
    </HelmetProvider>
  );
}

export default App;