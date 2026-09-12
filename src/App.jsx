// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import PageTransition from "./components/layout/PageTransition";
import ScrollToTop from "./components/layout/ScrollToTop";
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
import Book from "./pages/Book";

function App() {
  // Play logo intro only on first load per session (prevents white screen on subpages/navigation)
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem("rjv_intro_seen");
    } catch {
      return true;
    }
  });

  const handleFinishIntro = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem("rjv_intro_seen", "true");
    } catch {}
  };

  return (
    <HelmetProvider>
      <Router basename="/rjv_studio_tvr">
        <ScrollToTop />
        {showIntro && <LogoIntro onFinish={handleFinishIntro} />}
        <Header />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/frames" element={<Frames />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />
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