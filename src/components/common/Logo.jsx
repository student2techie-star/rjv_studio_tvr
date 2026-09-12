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
        {/* Flash overlay — golden lens flare burst on lens center */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            /* Lens sits roughly at 50% X, 28% Y of the image */
            top: "26%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: size * 0.35,
            height: size * 0.35,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #fffde7 0%, #ffd54f 30%, rgba(255,213,79,0.4) 60%, transparent 80%)",
            boxShadow: flashOn
              ? `0 0 ${size * 0.25}px ${size * 0.15}px #ffd54f,
                 0 0 ${size * 0.5}px ${size * 0.1}px rgba(255,255,200,0.8)`
              : "none",
            opacity: flashOn ? 1 : 0,
            transition: flashOn
              ? "opacity 0.06s ease-in, box-shadow 0.06s ease-in"
              : "opacity 0.3s ease-out, box-shadow 0.3s ease-out",
            pointerEvents: "none",
            mixBlendMode: "screen",
          }}
        />
        {/* Radial light rays when flash fires */}
        {flashOn && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "26%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: size * 0.7,
              height: size * 0.7,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,253,231,0.6) 0%, rgba(255,213,79,0.15) 40%, transparent 70%)",
              pointerEvents: "none",
              mixBlendMode: "screen",
              animation: "flashRays 0.2s ease-out forwards",
            }}
          />
        )}
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