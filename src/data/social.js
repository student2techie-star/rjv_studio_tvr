// src/data/social.js
import { createWhatsAppUrl } from "../utils/whatsapp";

export const social = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@rjv_studios_tvr",
    url: "https://www.instagram.com/rjv_studios_tvr/",
    icon: "instagram",
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "RJV Studios TVR",
    url: "https://www.youtube.com/@rjvstudiostvr7354",
    icon: "youtube",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    handle: "+91 75983 82584",
    url: createWhatsAppUrl(
      "Hello, I would like to know more about RJV Studios photography services."
    ),
    icon: "whatsapp",
  },
  {
    id: "justdial",
    name: "Justdial",
    handle: "RJV Studios (Opp. HDFC Bank)",
    url: "https://www.justdial.com/Tiruvarur/RJV-Studios-Opposite-Hdfc-Bank-Tiruvarur-North/9999P4366-4366-181214173912-R4A5_BZDET",
    icon: "justdial",
  },
];