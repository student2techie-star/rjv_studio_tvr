// src/components/layout/MobileMenu.jsx
import React, { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const toggle = () => setOpen(!open);

  return (
    <div className="md:hidden">
      <button onClick={toggle} aria-label={open ? "Close menu" : "Open menu"} className="p-2 focus:outline-none">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      {open && (
        <nav className="fixed inset-0 bg-brand-200 bg-opacity-95 flex flex-col items-center justify-center space-y-6 z-40">
          <Link to="/" onClick={toggle} className="text-2xl font-semibold text-brand-800">Home</Link>
          <Link to="/about" onClick={toggle} className="text-2xl font-semibold text-brand-800">About</Link>
          <Link to="/services" onClick={toggle} className="text-2xl font-semibold text-brand-800">Services</Link>
          <Link to="/portfolio" onClick={toggle} className="text-2xl font-semibold text-brand-800">Portfolio</Link>
          <Link to="/frames" onClick={toggle} className="text-2xl font-semibold text-brand-800">Frames</Link>
          <Link to="/contact" onClick={toggle} className="text-2xl font-semibold text-brand-800">Contact</Link>
        </nav>
      )}
    </div>
  );
}
