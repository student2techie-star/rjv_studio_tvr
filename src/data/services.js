// src/data/services.js
import weddingImg from "../assets/images/weddings/anniversary-01.jpg";
import engagementImg from "../assets/images/portraits/shoot-02.webp";
import babyImg from "../assets/images/kids/babyshoot-01.webp";
import ceremonyImg from "../assets/images/ceremonies/shivarathiri-01.webp";
import portraitImg from "../assets/images/portraits/shoot-01.webp";
import eventImg from "../assets/images/events/event-01.webp";

export const services = [
  {
    id: "wedding",
    number: "01",
    title: "Wedding Photography",
    description:
      "Editorial storytelling for your big day — candid moments, rituals and emotions preserved with elegance.",
    image: weddingImg,
    features: ["Full-day coverage", "2 photographers", "Candid + traditional"],
  },
  {
    id: "engagement",
    number: "02",
    title: "Engagement & Pre-Wedding",
    description:
      "Couple portraits and pre-wedding sessions that capture your love story in beautiful light.",
    image: engagementImg,
    features: ["Location scouting", "Couple portraits", "Style guidance"],
  },
  {
    id: "baby",
    number: "03",
    title: "Baby & Kids",
    description:
      "Gentle, natural sessions for newborns and kids — tiny smiles, first milestones, forever keepsakes.",
    image: babyImg,
    features: ["Newborn safe set-ups", "Family moments", "Play-based"],
  },
  {
    id: "ceremony",
    number: "04",
    title: "Ceremonies & Festivals",
    description:
      "From Shivarathiri to family functions — vibrant coverage of traditions and celebrations.",
    image: ceremonyImg,
    features: ["Temple & home events", "Ritual coverage", "Album-ready output"],
  },
  {
    id: "portrait",
    number: "05",
    title: "Portrait Sessions",
    description:
      "Editorial and studio portraits crafted around your personality — sharp, contemporary, timeless.",
    image: portraitImg,
    features: ["Studio lighting", "Wardrobe guidance", "Retouched finals"],
  },
  {
    id: "events",
    number: "06",
    title: "Events & Functions",
    description:
      "Live shows, gatherings and corporate functions covered with energy and discretion.",
    image: eventImg,
    features: ["Multi-hour coverage", "Fast turnaround", "Digital delivery"],
  },
];