// src/data/portfolio.js
import anniversary01 from "../assets/images/weddings/anniversary-01.webp";
import anniversary02 from "../assets/images/weddings/anniversary-02.webp";
import anniversary03 from "../assets/images/weddings/anniversary-03.webp";
import shivarathiri01 from "../assets/images/ceremonies/shivarathiri-01.webp";
import shivarathiri02 from "../assets/images/ceremonies/shivarathiri-02.webp";
import shoot01 from "../assets/images/portraits/shoot-01.webp";
import shoot02 from "../assets/images/portraits/shoot-02.webp";
import babyshoot01 from "../assets/images/kids/babyshoot-01.webp";
import babyshoot02 from "../assets/images/kids/babyshoot-02.webp";
import event01 from "../assets/images/events/event-01.webp";
import event02 from "../assets/images/events/event-02.webp";
import reception from "../assets/gallery/photo1.jpg";

export const portfolio = [
  {
    id: 1,
    title: "Golden Years",
    category: "wedding",
    image: anniversary01,
    alt: "Anniversary couple photographed by RJV Studios",
  },
  {
    id: 2,
    title: "Tamil Wedding",
    category: "wedding",
    image: anniversary02,
    alt: "Traditional Tamil wedding photography",
  },
  {
    id: 3,
    title: "Vow Renewal",
    category: "wedding",
    image: anniversary03,
    alt: "Vow renewal ceremony photography",
  },
  {
    id: 4,
    title: "Shivarathiri Nights",
    category: "ceremony",
    image: shivarathiri01,
    alt: "Shivarathiri celebration photography",
  },
  {
    id: 5,
    title: "Festival Lights",
    category: "ceremony",
    image: shivarathiri02,
    alt: "Festival ceremony photography",
  },
  {
    id: 6,
    title: "Editorial Portrait",
    category: "portrait",
    image: shoot01,
    alt: "Editorial studio portrait",
  },
  {
    id: 7,
    title: "The Groom",
    category: "portrait",
    image: shoot02,
    alt: "Pre-wedding groom portrait",
  },
  {
    id: 8,
    title: "Baby Shower",
    category: "baby-shower",
    image: babyshoot01,
    alt: "Baby shower celebration photography",
  },
  {
    id: 9,
    title: "Little One",
    category: "kids",
    image: babyshoot02,
    alt: "Baby photography session",
  },
  {
    id: 10,
    title: "Crowd & Flash",
    category: "events",
    image: event01,
    alt: "Live event crowd photography",
  },
  {
    id: 11,
    title: "Stage Lights",
    category: "events",
    image: event02,
    alt: "Stage event photography",
  },
  {
    id: 12,
    title: "The Reception",
    category: "events",
    image: reception,
    alt: "Wedding reception photograph",
  },
];

export const portfolioCategories = [
  "All",
  "Wedding",
  "Ceremony",
  "Portrait",
  "Kids",
  "Baby Shower",
  "Events",
];