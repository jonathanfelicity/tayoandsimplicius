import React, { useEffect, useState } from 'react';

const IMAGES = [
  // User's Couple Photo (First)
  "https://res.cloudinary.com/dmfm7iint/image/upload/v1764963048/LAR-2710_1_lfcnln.jpg",
  // Elegant Black Couple Wedding
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2400&auto=format&fit=crop",
  // Wedding Details/Vintage Car
  "https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=2400&auto=format&fit=crop",
  // Floral/Decor
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2400&auto=format&fit=crop"
];

const BackgroundSlideshow: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(IMAGES.length).fill(false));

  useEffect(() => {
    // Preload images
    IMAGES.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-stone-900">
      {IMAGES.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index}`}
          className={`absolute inset-0 w-full h-full object-cover object-center animate-zoom-fade ${loadedImages[index] ? 'opacity-0' : 'opacity-0'}`}
          style={{
            animationDelay: `${index * 6}s`,
            // Fallback: if image isn't loaded yet, keep it hidden to avoid broken icon, 
            // though the animation starts with opacity 0 anyway.
          }}
          onError={(e) => {
            // If an image breaks, hide it completely
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      ))}

      {/* Soft Film Grain Overlay */}
      <div className="absolute inset-0 grain-overlay z-10 pointer-events-none"></div>

      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/30 to-stone-900/90 z-20"></div>
      <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply z-20"></div>
    </div>
  );
};

export default BackgroundSlideshow;