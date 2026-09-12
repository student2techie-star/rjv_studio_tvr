import React, { useState } from 'react';
import Lightbox from '../components/Lightbox';
import photo1 from '../assets/gallery/photo1.jpg';
import '../styles/gallery.css';

const images = [photo1]; // Add more images as needed

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);

  const openLightbox = (img) => {
    setCurrentImg(img);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImg(null);
  };

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Portfolio</h2>
      <div className="gallery-grid">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="gallery-item"
            onClick={() => openLightbox(img)}
          >
            <img src={img} alt={`Gallery ${idx + 1}`} className="gallery-thumb" />
          </div>
        ))}
      </div>
      {lightboxOpen && (
        <Lightbox img={currentImg} onClose={closeLightbox} />
      )}
    </div>
  );
}
