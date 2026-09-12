// src/components/layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import Logo from "../common/Logo";
import SocialIcon from "../common/SocialIcons";
import Button from "../common/Button";
import { social } from "../../data/social";
import { NAV } from "../../data/nav";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-100 mt-24">
      <Container className="pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={36} className="text-brand-300" bars={false} />
              <span className="text-lg font-bold text-white tracking-tight">RJV Studios</span>
            </div>
            <p className="text-sm leading-relaxed text-brand-200/80 mt-4 max-w-xs">
              Premium photography &amp; cinematography from Thiruvarur — preserving your
              precious moments with an editorial touch.
            </p>
            <div className="flex gap-3 mt-6">
              {social.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid place-items-center w-10 h-10 rounded-full border border-brand-200/25 text-brand-200 transition-colors hover:bg-brand-300 hover:text-brand-900 hover:border-brand-300"
                >
                  <SocialIcon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300 mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {NAV.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-brand-100/80 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300 mb-4">
              Follow
            </h3>
            <ul className="space-y-2.5">
              {social.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-100/80 hover:text-white transition-colors"
                  >
                    {s.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300 mb-4">
              Book a session
            </h3>
            <p className="text-sm text-brand-100/80 mb-5">
              Tell us about your event and get a personalised plan.
            </p>
            <Button to="/book" variant="primary">
              Book Now
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-brand-100/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brand-200/70">
            © {new Date().getFullYear()} RJV Studios. All rights reserved.
          </p>
          <p className="text-xs text-brand-200/70">
            Thiruvarur · Tamil Nadu · India
          </p>
        </div>
      </Container>
    </footer>
  );
}
