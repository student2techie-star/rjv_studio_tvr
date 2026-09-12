// src/components/layout/MobileMenu.jsx
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "../common/Logo";
import Button from "../common/Button";
import { NAV } from "../../data/nav";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Close on navigation and prevent background scrolling while open.
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        className="md:hidden transition-colors rounded-lg p-1.5 text-brand-800 hover:bg-brand-100"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {open &&
          createPortal(
            <motion.div
              className="fixed inset-0 z-[60] md:hidden flex flex-col items-center justify-center gap-6 bg-brand-50/95 backdrop-blur-2xl overflow-y-auto py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
            <button
              className="absolute top-16 right-5 p-2 rounded-lg text-brand-800 hover:bg-brand-100"
              aria-label="Close menu"
              onClick={close}
            >
              <X size={28} />
            </button>

            <Logo size={52} className="text-brand-400 mb-1" bars={false} />

            <nav className="flex flex-col items-center gap-5" aria-label="Mobile">
              {NAV.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.05 * (i + 1) } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                >
                  <NavLink
                    to={to}
                    end={to === "/"}
                    onClick={close}
                    className={({ isActive }) =>
                      `text-2xl font-semibold tracking-tight transition-colors ${
                        isActive
                          ? "text-brand-900 underline underline-offset-8 decoration-brand-300 decoration-4"
                          : "text-brand-700 hover:text-brand-900"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.05 * (NAV.length + 1) } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                <Button to="/book" variant="dark" onClick={close}>
                  Book Now
                </Button>
              </motion.div>
            </nav>
          </motion.div>,
          document.body,
        )}
    </>
  );
}
