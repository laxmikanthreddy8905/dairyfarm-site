// src/pages/Gallery.tsx
import './Gallery.css';
import { useState } from 'react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    '/images/gallery1.jpeg',
    '/images/gallery2.jpeg',
    '/images/gallery3.jpeg',
    '/images/gallery4.webp',
    '/images/gallery5.jpeg',
    '/images/gallery6.jpeg',
  ];

  return (
    <div className="gallery-container">
      <div className="gallery-overlay">
        <h1 className="gallery-title">Welcome to Our Dairy Farm</h1>
        <p className="gallery-subtitle">
          Fresh cows. Clean barns. Natural beauty. Here’s a glimpse into our everyday life.
        </p>

        <div className="gallery-grid">
          {images.map((src, index) => (
            <div className="gallery-card" key={index} onClick={() => setSelectedImage(src)}>
              <img src={src} alt={`Gallery ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Enlarged" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
