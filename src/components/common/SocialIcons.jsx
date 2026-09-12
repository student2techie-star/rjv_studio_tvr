// src/components/common/SocialIcons.jsx
// Brand icons (Instagram / YouTube / WhatsApp) drawn as inline SVGs
// because current lucide-react no longer ships brand icons.

export default function SocialIcon({ name, size = 20, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  if (name === "whatsapp") {
    return (
      <svg {...common}>
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.6 0-3.1-.44-4.4-1.2L3 20l1.2-5.1A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M9 10h.01M15 10h.01M8.5 13.5c.8 1.2 2.1 2 3.5 2s2.7-.8 3.5-2" />
      </svg>
    );
  }

  if (name === "youtube") {
    return (
      <svg {...common}>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17Z" />
        <path d="m10 15 5-3-5-3v6Z" />
      </svg>
    );
  }

  if (name === "justdial") {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5h-1.5V10H12v6.5h-1zm.5-8.25c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM15 16.5h-1.5v-3.5c0-.55-.45-1-1-1s-1 .45-1 1v3.5H10V10h1.5v.8c.4-.5 1-0.8 1.8-0.8 1.4 0 2.2.9 2.2 2.5v4.0z"/>
      </svg>
    );
  }

  // Instagram default
  return (
    <svg {...common}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}