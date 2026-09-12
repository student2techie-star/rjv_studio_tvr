// src/data/services.js
import weddingImg from "../assets/images/weddings/anniversary-01.jpg";
import engagementImg from "../assets/images/portraits/shoot-02.webp";
import babyImg from "../assets/images/kids/maternity-01.jpg";
import ceremonyImg from "../assets/images/ceremonies/shivarathiri-01.webp";
import portraitImg from "../assets/images/portraits/bridal-red.jpg";
import eventImg from "../assets/images/events/event-01.webp";

export const services = [
  {
    id: "wedding",
    number: "01",
    title: "Wedding Photography",
    tagline: "Complete wedding storytelling with candid & traditional coverage.",
    events: [
      "Engagement Ceremony (Nitchayathartham)",
      "Pre-Wedding Couple Shoot",
      "Traditional Muhurtham Rituals",
      "Sangeet & Haldi Celebrations",
      "Grand Reception & Stage Coverage",
    ],
    image: weddingImg,
    features: ["Full-day coverage", "2 Photographers", "High-res Digital & Album"],
  },
  {
    id: "engagement",
    number: "02",
    title: "Engagement & Pre-Wedding",
    tagline: "Romantic couple sessions captured in gorgeous natural light.",
    events: [
      "Ring Exchange & Rituals",
      "Outdoor Scenic Couple Session",
      "Save-The-Date Reels & Teaser",
      "Wardrobe & Concept Guidance",
    ],
    image: engagementImg,
    features: ["Location scouting", "Cinematic Teaser", "Style Guidance"],
  },
  {
    id: "baby",
    number: "03",
    title: "Baby, Kids & Maternity",
    tagline: "Gentle, creative sessions for mothers, newborns and growing kids.",
    events: [
      "Maternity & Pregnancy Glow Shoot",
      "Newborn Baby Session (0–3 Months)",
      "Ear Piercing (Kadhukuthu Vizha)",
      "1st Birthday & Cake Smash",
      "Kids Milestone Photography",
    ],
    image: babyImg,
    features: ["Newborn Safe Setup", "Theme Props Included", "Family Portraits"],
  },
  {
    id: "ceremony",
    number: "04",
    title: "Traditional Ceremonies",
    tagline: "Vibrant coverage of sacred Tamil rituals and temple festivals.",
    events: [
      "Puberty Ceremony (Manjal Neerattu Vizha)",
      "Housewarming Rituals (Grihapravesam)",
      "Temple Festivals & Shivarathiri",
      "Family Poojas & Annaprasana",
    ],
    image: ceremonyImg,
    features: ["Temple & Home Events", "Ritual Highlights", "Premium Photo Book"],
  },
  {
    id: "portrait",
    number: "05",
    title: "Portrait Sessions",
    tagline: "Contemporary studio and outdoor portraits crafted with editorial polish.",
    events: [
      "Bridal & Groom Solo Portfolio",
      "Studio Lighting & Backdrops",
      "Outdoor Conceptual Session",
      "Family Group Portraiture",
    ],
    image: portraitImg,
    features: ["Studio Lighting", "Retouched Finals", "High Resolution"],
  },
  {
    id: "events",
    number: "06",
    title: "Events & Functions",
    tagline: "Energetic, seamless coverage for private parties and stage events.",
    events: [
      "Birthday Parties & Anniversaries",
      "Stage Performances & Culturals",
      "Corporate Gatherings & Launch",
      "Live Shows & Music Events",
    ],
    image: eventImg,
    features: ["Multi-hour Coverage", "Fast Turnaround", "Digital Gallery"],
  },
];