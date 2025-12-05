import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import BackgroundSlideshow from './components/BackgroundSlideshow';
import CountdownTimer from './components/CountdownTimer';
import MapModal from './components/MapModal';
import BackgroundAudio from './components/BackgroundAudio';

const App: React.FC = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Set date to Dec 6, 2025 11:00 AM
  const WEDDING_DATE = "2025-12-06T11:00:00";

  return (
    <div className="relative min-h-screen w-full font-sans antialiased">
      <BackgroundSlideshow />

      {/* Main Content Layer */}
      <main className={`relative z-30 min-h-screen flex flex-col justify-between p-6 sm:p-8 max-w-lg mx-auto transition-opacity duration-500 ${isMapOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Header */}
        <header className="text-center pt-8 sm:pt-16">
          <div className="animate-reveal">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-100/80 mb-6 font-light leading-relaxed">
              The families of <br/>
              Pharm. & Mrs. John Kayode Falana <br/>
              <span className="text-teal-200/60">&</span> <br/>
              Mr. & Mrs. Basil Emeka Nzebachie
            </p>
          </div>
          
          <div className="animate-reveal" style={{ animationDelay: '200ms' }}>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-teal-100/70 mb-4 font-light">
              Cordially Invite You To The Wedding Of
            </p>
          </div>

          <div className="animate-reveal" style={{ animationDelay: '400ms' }}>
            <h1 className="serif-font text-5xl sm:text-7xl text-amber-50 leading-[0.9] tracking-tight italic font-medium drop-shadow-md">
              Omotayo <span className="not-italic text-4xl sm:text-5xl font-light text-teal-200/80 align-middle px-1">&</span> <br /> Simplicius
            </h1>
            <div className="flex justify-center gap-4 mt-2 text-sm sm:text-base text-amber-100/60 font-light tracking-wide serif-font">
              <span>Chamun Falana</span>
              <span>•</span>
              <span>Osita Emeka</span>
            </div>
          </div>
        </header>

        {/* Footer Actions */}
        <div className="flex flex-col items-center w-full gap-8 sm:gap-12 pb-8 sm:pb-12">
          
          {/* Proverb Quote */}
          <div className="animate-reveal text-center px-4" style={{ animationDelay: '600ms' }}>
             <p className="serif-font italic text-amber-50/70 text-lg sm:text-xl">
               "In their hearts human plan their course,<br/> but the LORD establishes their steps."
             </p>
             <p className="text-[10px] uppercase tracking-widest text-teal-200/50 mt-2">Proverbs 16:9</p>
          </div>

          {/* Timer */}
          <div className="w-full animate-reveal" style={{ animationDelay: '800ms' }}>
            <CountdownTimer targetDate={WEDDING_DATE} />
          </div>

          {/* Main Action Button */}
          <button 
            onClick={() => setIsMapOpen(true)}
            className="group relative w-full max-w-xs animate-reveal focus:outline-none focus:ring-2 focus:ring-amber-200/50 rounded-full cursor-pointer touch-manipulation"
            style={{ animationDelay: '1000ms' }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-200/30 to-teal-200/30 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative flex items-center justify-center gap-3 bg-stone-900/90 hover:bg-stone-800/90 backdrop-blur-md px-8 py-5 rounded-full transition-all duration-300 ease-out shadow-[0_0_20px_rgba(251,191,36,0.1)] transform group-hover:scale-[1.02] border border-amber-500/10">
              <span className="text-amber-50 text-sm font-semibold tracking-widest uppercase">Wedding Details & RSVP</span>
              <MapPin className="text-teal-200 w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </button>
        </div>
      </main>

      {/* Overlays */}
      <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
      <BackgroundAudio isOverlayOpen={isMapOpen} />

    </div>
  );
};

export default App;