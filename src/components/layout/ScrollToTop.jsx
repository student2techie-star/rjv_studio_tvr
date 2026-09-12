// src/components/layout/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Instantly jump to the top on every route change, even with
// `scroll-behavior: smooth` in the global CSS.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = "";
  }, [pathname]);

  return null;
}