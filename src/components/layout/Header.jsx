// src/components/layout/Header.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../common/Logo";
import Button from "../common/Button";
import MobileMenu from "./MobileMenu";
import { NAV } from "../../data/nav";

export default function Header() {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur-xl border-b border-brand-200/70 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">
          {/* Logo / wordmark */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="RJV Studios — Home">
            <Logo size={36} className="text-brand-500 transition-transform duration-300 group-hover:rotate-12" bars={false} />
            <span className="text-lg md:text-xl font-bold text-brand-900 tracking-tight">
              RJV&nbsp;Studios
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main">
            {NAV.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors ${
                    isActive
                      ? "bg-brand-300/50 text-brand-900"
                      : "text-brand-700 hover:text-brand-900 hover:bg-brand-100"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Button to="/contact" variant="primary">
                Book Now
              </Button>
            </div>
            <MobileMenu />
          </div>
        </div>
      </header>
      {/* Spacer for the fixed header */}
      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  );
}