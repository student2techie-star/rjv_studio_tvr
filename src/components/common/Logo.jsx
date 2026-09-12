// src/components/common/Logo.jsx
// RJV Studio logo with animated camera flash (lens flare on/off).

import React, { useState, useEffect } from "react";

const LOGO_SRC = `${import.meta.env.BASE_URL}images/logo.png`;

export default function Logo({ size = 40, className = "" }) {
  const [failed, setFailed] = useState(false);
  const [flashOn, setFlashOn] = useState(true);

  // Toggle flash every 2.5s: ON for 200ms (flash burst), OFF for 2300ms
  useEffect(() => {
    let timer;
    const cycle = () => {
      setFlashOn(true);
      timer = setTimeout(() => {
        setFlashOn(false);
        timer = setTimeout(() => {
          cycle();
        }, 2300);
      }, 200);
    };
    cycle();
    return () => clearTimeout(timer);
  }, []);

  if (!failed) {
    return (
      <span
        className={`relative inline-block ${className}`}
        style={{ width: size, height: size }}
      >
        {/* Base logo image */}
        <img
          src={LOGO_SRC}
          alt="RJV Studios logo"
          width={size}
          height={size}
          className="object-contain w-full h-full"
          onError={() => setFailed(true)}
        />
        {/* Flash overlay — golden lens flare burst from lens front */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "25.5%",
            left: "51%",
            transform: "translate(-50%, -50%)",
            width: size * 0.38,
            height: size * 0.38,
            borderRadius: "50%",
            background: flashOn
              ? "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,240,120,0.9) 25%, rgba(255,210,60,0.7) 55%, transparent 80%)"
              : "none",
            boxShadow: flashOn
              ? `0 0 ${size * 0.4}px ${size * 0.2}px rgba(255,210,60,0.9),
                 0 0 ${size * 0.7}px ${size * 0.15}px rgba(255,240,160,0.5)`
              : "none",
            opacity: flashOn ? 1 : 0,
            transition: flashOn
              ? "opacity 0.06s ease-in"
              : "opacity 0.4s ease-out",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        {/* Star flare rays from lens when flash fires */}
        {flashOn && [0, 45, 90, 135].map((deg) => (
          <span
            key={deg}
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "25.5%",
              left: "51%",
              transform: `translate(-50%, -50%) rotate(${deg}deg)`,
              transformOrigin: "center",
              width: size * 1.6,
              height: 2.5,
              background:
                "linear-gradient(to right, transparent 0%, rgba(255,220,50,1) 35%, rgba(255,245,180,1) 50%, rgba(255,220,50,1) 65%, transparent 100%)",
              borderRadius: "999px",
              pointerEvents: "none",
              zIndex: 2,
              animation: "flashRays 0.3s ease-out forwards",
            }}
          />
        ))}
      </span>
    );
  }

  // Fallback SVG aperture mark
  const blades = [0, 60, 120, 180, 240, 300];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="RJV Studios logo"
      className={className}
    >
      <defs>
        <clipPath id="lensOpening">
          <circle cx="32" cy="32" r="20" />
        </clipPath>
      </defs>
      <circle cx="32" cy="32" r="30" fill="currentColor" opacity="0.16" />
      <circle cx="32" cy="32" r="25.5" stroke="currentColor" strokeWidth="3.5" fill="none" />
      <g clipPath="url(#lensOpening)">
        {blades.map((angle) => (
          <ellipse
            key={angle}
            cx="32"
            cy="32"
            rx="34"
            ry="8.5"
            fill="currentColor"
            opacity="0.85"
            transform={`rotate(${angle} 32 32)`}
          />
        ))}
      </g>
      <circle cx="32" cy="32" r="10.5" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="32" r="3.5" fill="currentColor" />
      <path
        d="M32 17v-8 M32 55v-8 M47 32h8 M9 32h8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}