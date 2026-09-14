// src/utils/whatsapp.js
// Central place for all WhatsApp logic. Never hand-write wa.me URLs in components.

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "917598382584";

export function createWhatsAppUrl(message = "") {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function createBookingWhatsAppMessage(data) {
  const lines = [
    "Hello, I would like to enquire about a photography booking.",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Event: ${data.eventType}`,
    `Date: ${data.eventDate}`,
    `Location: ${data.location}`,
    `Service: ${data.service}`,
    `Message: ${data.message || "-"}`,
  ];
  return lines.join("\n");
}

const messages = {
  booking: "Hello, I would like to enquire about a photography booking.",
  wedding:
    "Hello, I would like to enquire about wedding photography at RJV Studios.",
  general:
    "Hello, I would like to know more about RJV Studios photography services.",
  frames: (payload) => {
    if (typeof payload === "object" && payload !== null) {
      const lines = [
        "📸 RJV Studio - New Photo Submission",
        "",
        `Name: ${payload.name || "-"}`,
        "",
        "Address:",
        `${payload.address || "-"}`,
        "",
        "File Name:",
        `${payload.filename || "-"}`,
        "",
        "Image:",
        `${payload.fileUrl || payload.photoUrl || "-"}`
      ];
      return lines.join("\n");
    }
    return `Hello, I would like to send you a frame photo for editing.\n\nSelected photo: ${payload}\n\n(Please attach the photo here and send it to the studio.)`;
  },
  service: (serviceName) =>
    `Hello, I would like to enquire about ${serviceName} at RJV Studios.`,
};

export function getWhatsAppUrl(key, payload) {
  const build =
    typeof messages[key] === "function" ? messages[key] : messages[key];
  const text = typeof build === "function" ? build(payload) : build;
  return createWhatsAppUrl(text);
}

export const whatsappNumber = WHATSAPP_NUMBER;