// src/components/layout/Footer.jsx
import React from "react";
import { Camera, CirclePlay, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white py-8 mt-16">
      <div className="container mx-auto text-center space-y-4">
        <p className="text-sm">© {new Date().getFullYear()} RJV Studios. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="https://www.instagram.com/rjv_studios_tvr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brand-300">
            <Camera size={24} />
          </a>
          <a href="https://www.youtube.com/@rjvstudiostvr7354" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-brand-300">
            <CirclePlay size={24} />
          </a>
          <a href="https://wa.me/919003430930" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-brand-300">
            <MessageCircle size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
