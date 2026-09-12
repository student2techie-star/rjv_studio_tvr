import React from "react";
import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";
import Container from "../common/Container";
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
            <div className="flex items-center gap-3">
              {/* Dark-theme transparent logo — seamlessly matches footer background */}
              <img
                src={`${import.meta.env.BASE_URL}images/logo-darkbg.png`}
                alt="RJV Studios logo"
                width={64}
                height={64}
                style={{
                  width: 64,
                  height: 64,
                  objectFit: "contain",
                  display: "block",
                }}
              />
              <div>
                <span className="block text-lg font-bold text-white tracking-tight leading-none">RJV Studios</span>
                <span className="block text-xs text-brand-300/80 tracking-widest uppercase leading-tight mt-0.5">Photography</span>
              </div>
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

        <div className="mt-12 pt-6 border-t border-brand-100/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-brand-200/70">
            © {new Date().getFullYear()} RJV Studios. All rights reserved.
          </p>

          <p className="text-xs text-brand-200/70 flex items-center justify-center gap-1.5">
            <span>Developed by</span>
            <a
              href="https://student2techie.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-brand-300 hover:text-white transition-colors underline decoration-brand-300/40 underline-offset-4"
            >
              <Code2 size={14} className="text-brand-300" />
              <span>Student2Techie</span>
            </a>
          </p>

          <p className="text-xs text-brand-200/70">
            Thiruvarur · Tamil Nadu · India
          </p>
        </div>
      </Container>
    </footer>
  );
}
