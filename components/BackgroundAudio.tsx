import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

// Romantic instrumental track suitable for weddings
const AUDIO_URL = "https://cdn.pixabay.com/audio/2022/11/22/audio_febc508520.mp3";

interface BackgroundAudioProps {
  isOverlayOpen?: boolean;
}

const BackgroundAudio: React.FC<BackgroundAudioProps> = ({ isOverlayOpen = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4; // Start at 40% volume

    // Function to attempt playing audio
    const attemptPlay = () => {
      if (isPlaying) return; // Already playing

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            // Remove listeners once playing
            removeListeners();
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
      }
    };

    // Try to autoplay immediately
    attemptPlay();

    // Also listen for user interactions to start playing
    const handleInteraction = () => {
      attemptPlay();
    };

    const removeListeners = () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };

    // Add listeners for common user interactions
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      removeListeners();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.error("Play failed:", e));
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 animate-reveal" style={{ animationDelay: '1200ms' }}>
      <audio
        ref={audioRef}
        src={AUDIO_URL}
        loop
        preload="auto"
      />
      <div
        className={`transition-all duration-500 ease-in-out ${isOverlayOpen ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}
      >
        <button
          onClick={togglePlay}
          className={`relative group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-md border border-white/10 transition-all duration-500 cursor-pointer touch-manipulation ${isPlaying
              ? 'bg-amber-200/20 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.3)] border-amber-200/30'
              : 'bg-stone-900/60 text-stone-400 hover:bg-stone-800/80 hover:text-amber-100'
            }`}
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <>
              {/* Pulsing ring effect when playing */}
              <span className="absolute inset-0 rounded-full border border-amber-200/30 animate-ping opacity-20 duration-1000"></span>
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
            </>
          ) : (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
          )}
        </button>
      </div>
    </div>
  );
};

export default BackgroundAudio;