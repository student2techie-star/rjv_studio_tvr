// src/components/common/Logo.jsx
// Original camera-lens + aperture SVG mark. Sharp at any resolution.

export default function Logo({ size = 40, className = "", bars = true }) {
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

      {/* Lens barrel */}
      <circle cx="32" cy="32" r="30" fill="currentColor" opacity="0.16" />
      <circle cx="32" cy="32" r="25.5" stroke="currentColor" strokeWidth="3.5" fill="none" />

      {/* Aperture blades */}
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

      {/* Shutter ring */}
      <circle cx="32" cy="32" r="10.5" fill="none" stroke="currentColor" strokeWidth="3" />

      {/* Focus point */}
      <circle cx="32" cy="32" r="3.5" fill="currentColor" />

      {bars && (
        <path
          d="M32 17v-8 M32 55v-8 M47 32h8 M9 32h8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}