import React, { useState, useRef, useCallback, useEffect } from 'react';
import { X, Church, GlassWater, Phone, ArrowRight, Map, ChevronDown } from 'lucide-react';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CEREMONY_MAP_URL = "https://www.google.com/maps/dir//VVMJ%2B279,+Jos+930103,+Plateau/@9.9072969,8.8693617,19687m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x105373000eee798f:0xdac70cae8417de2!2m2!1d8.8807378!2d9.8825427?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D";
const RECEPTION_MAP_URL = "https://www.google.com/maps/dir//SYNSAMSALI+EVENT+CENTER,+No.+5+Furaka,+Lane,+Sainyi+930105,+Plateau/@9.898861,8.928833,19688m/data=!3m1!1e3!4m17!1m8!3m7!1s0x10537115b202d933:0xae5154cde7d0c5db!2sSYNSAMSALI+EVENT+CENTER!8m2!3d9.898861!4d8.928833!15sCh5TeWxuYXNtc2FsaSBFdmVudCBKb3MgbG9jYXRpb25aFyIVc3lsbmFzbXNhbGkgZXZlbnQgam9zkgEGZ2FyZGVumgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVI0ZEhReVVuSkJSUkFC4AEA-gEFCLUDEDE!16s%2Fg%2F11tx_z0pld!4m7!1m0!1m5!1m1!1s0x10537115b202d933:0xae5154cde7d0c5db!2m2!1d8.928833!2d9.898861?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D";

const SWIPE_THRESHOLD = 100; // pixels needed to trigger close

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }) => {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset drag offset when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setDragOffset(0);
      setIsDragging(false);
    }
  }, [isOpen]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - dragStartY.current;

    // Only allow dragging downward (positive values)
    if (diff > 0) {
      setDragOffset(diff);
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (dragOffset > SWIPE_THRESHOLD) {
      // Close the modal
      onClose();
    }
    // Reset
    setDragOffset(0);
    setIsDragging(false);
  }, [dragOffset, onClose]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragStartY.current = e.clientY;
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;

    const currentY = e.clientY;
    const diff = currentY - dragStartY.current;

    if (diff > 0) {
      setDragOffset(diff);
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    if (dragOffset > SWIPE_THRESHOLD) {
      onClose();
    }
    setDragOffset(0);
    setIsDragging(false);
  }, [dragOffset, onClose]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setDragOffset(0);
      setIsDragging(false);
    }
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 bg-stone-900/95 backdrop-blur-xl ${isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      style={{
        transform: isOpen
          ? `translateY(${dragOffset}px)`
          : 'translateY(100%)',
        transition: isDragging ? 'none' : 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Swipe Down Handle Area */}
      <div
        className="absolute top-0 left-0 right-0 z-30 touch-manipulation cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Drag Handle Indicator */}
        <div className="flex flex-col items-center pt-4 pb-2">
          {/* Pill Handle */}
          <div className="w-16 h-2 bg-amber-200/40 rounded-full mb-2 transition-all duration-300 hover:bg-amber-200/60 active:bg-amber-200/80" />

          {/* Animated Arrow Indicator */}
          <div className={`flex flex-col items-center transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <ChevronDown
              className="w-8 h-8 text-amber-200/50 animate-bounce"
              style={{ animationDuration: '2s' }}
            />
            <span className="text-xs text-amber-200/40 uppercase tracking-widest mt-1">Swipe to close</span>
          </div>
        </div>
      </div>

      {/* Modal Header */}
      <div className="absolute top-24 left-0 right-0 z-20">
        {/* Background gradient - non-interactive */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900 to-transparent pointer-events-none" />
        {/* Interactive header content */}
        <div className="relative px-6 py-4 flex justify-between items-center">
          <h2 className="serif-font text-3xl text-amber-50 tracking-tight italic">The Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-3 rounded-full bg-stone-800 text-amber-100 hover:bg-stone-700 active:bg-stone-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-200/20 cursor-pointer touch-manipulation"
            aria-label="Close Map"
          >
            <X className="w-7 h-7 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full h-full pt-44 pb-10 px-6 overflow-y-auto scrollbar-hide flex flex-col justify-start sm:justify-center">

        {/* Details List */}
        <div className="max-w-md w-full mx-auto space-y-10 pb-20">

          {/* Location 1 */}
          <div className={`flex gap-5 items-start border-l border-amber-500/20 pl-5 transition-all duration-700 delay-100 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <div className="mt-1 text-amber-200 bg-amber-200/10 p-2 rounded-full">
              <Church className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-2xl text-amber-50 font-medium tracking-tight serif-font italic">Ceremony</h3>
              <p className="text-sm uppercase tracking-wider text-teal-200/80 mt-1 font-medium">11:00 AM</p>
              <p className="text-base text-stone-300 mt-2 leading-relaxed font-light">
                Shekinah Global Gospel Ministries Inc.<br />
                <span className="text-stone-400 text-sm">@ ABBA Memorial College Premises, by Police Mobile Barrack, Abattoir, Jos Plateau State.</span>
              </p>
              <a
                href={CEREMONY_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-xs uppercase tracking-widest text-amber-200 hover:text-white transition-colors border border-amber-500/30 rounded-full px-4 py-2 hover:bg-amber-500/10 hover:border-amber-500/50"
              >
                <span>Get Directions</span>
                <Map className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Location 2 */}
          <div className={`flex gap-5 items-start border-l border-amber-500/20 pl-5 transition-all duration-700 delay-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <div className="mt-1 text-teal-200 bg-teal-200/10 p-2 rounded-full">
              <GlassWater className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-2xl text-amber-50 font-medium tracking-tight serif-font italic">Reception</h3>
              <p className="text-sm uppercase tracking-wider text-teal-200/80 mt-1 font-medium">Follows Immediately</p>
              <p className="text-base text-stone-300 mt-2 leading-relaxed font-light">
                Synsamsali Event Center<br />
                <span className="text-stone-400 text-sm">Jos, Plateau State</span>
              </p>
              <a
                href={RECEPTION_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-xs uppercase tracking-widest text-teal-200 hover:text-white transition-colors border border-teal-500/30 rounded-full px-4 py-2 hover:bg-teal-500/10 hover:border-teal-500/50"
              >
                <span>Get Directions</span>
                <Map className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* RSVP */}
          <div className={`flex gap-5 items-start border-l border-amber-500/20 pl-5 transition-all duration-700 delay-500 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <div className="mt-1 text-amber-100 bg-amber-100/10 p-2 rounded-full">
              <Phone className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-2xl text-amber-50 font-medium tracking-tight serif-font italic">R.S.V.P</h3>
              <p className="text-sm uppercase tracking-wider text-teal-200/80 mt-1 font-medium">Kind Response</p>
              <div className="flex flex-col gap-2 mt-3">
                <a href="tel:08068123704" className="text-stone-300 hover:text-amber-200 transition-colors font-light tracking-wide block">08068123704</a>
                <a href="tel:09030924443" className="text-stone-300 hover:text-amber-200 transition-colors font-light tracking-wide block">09030924443</a>
                <a href="tel:07063073000" className="text-stone-300 hover:text-amber-200 transition-colors font-light tracking-wide block">07063073000</a>
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className={`mt-8 pt-8 border-t border-white/5 text-center transition-all duration-700 delay-700 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">Colours of the Day</p>
            <div className="flex justify-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#556B2F] border border-white/10" title="Olive Green"></div>
              <div className="w-6 h-6 rounded-full bg-[#008080] border border-white/10" title="Teal Blue"></div>
              <div className="w-6 h-6 rounded-full bg-[#FFD700] border border-white/10" title="Gold"></div>
            </div>
            <p className="text-stone-400 text-xs mt-2 font-light italic">Olive Green • Teal Blue • Gold</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MapModal;