// src/components/layout/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="bg-brand-100 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-semibold text-brand-800">
          {/* Logo placeholder */}
          <span className="sr-only">Home</span>
          <svg className="h-8 w-8 text-brand-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10" /></svg>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-brand-700 hover:text-brand-900">Home</Link>
          <Link to="/about" className="text-brand-700 hover:text-brand-900">About</Link>
          <Link to="/services" className="text-brand-700 hover:text-brand-900">Services</Link>
          <Link to="/portfolio" className="text-brand-700 hover:text-brand-900">Portfolio</Link>
          <Link to="/frames" className="text-brand-700 hover:text-brand-900">Frames</Link>
          <Link to="/contact" className="text-brand-700 hover:text-brand-900">Contact</Link>
        </nav>
        <button className="md:hidden text-brand-800" aria-label="Open menu">
          <Menu />
        </button>
      </div>
      {/* Mobile menu placeholder – will be toggled via state in future */}
      <MobileMenu />
    </header>
  );
}
