import React, { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { SvevaPhoto } from '../data';

interface SvevaGalleryProps {
  photos: SvevaPhoto[];
  onBackFeed?: () => void;
}

export default function SvevaGalleryView({ photos, onBackFeed }: SvevaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="max-w-[650px] mx-auto bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs font-sans tracking-normal select-none">
      {/* Header component */}
      <div className="flex justify-between items-center border-b border-zinc-100 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-linear-to-tr from-pink-500 to-rose-400 p-[2px]">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
              alt="Sveva Avatar"
              className="w-full h-full object-cover rounded-full border border-white"
            />
          </div>
          <div>
            <h2 className="text-sm font-black text-zinc-900 leading-tight">Sveva</h2>
            <p className="text-[10px] text-zinc-400 font-bold uppercase mt-0.5">La mia bacheca privata • Sofia 🌸</p>
          </div>
        </div>

        {onBackFeed && (
          <button
            onClick={onBackFeed}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Esci</span>
          </button>
        )}
      </div>

      {/* Main Desc */}
      <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 mb-6 flex flex-col gap-1.5">
        <p className="text-[11px] text-zinc-500 uppercase tracking-wide font-mono font-black">
          💝 ALBUM FOTOGRAFICO CONDIVISO CON ANNA
        </p>
        <p className="text-xs text-zinc-750 leading-relaxed font-medium">
          "Un anno speciale con Sofia. Guarda com'è cresciuta e com'è felice nel parco vicino a casa Anna! Ti mando queste foto così puoi farle vedere anche a Mauro."
        </p>
      </div>

      {/* Photo */}
      <div className="w-full">
        {photos[0] && (
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="w-full aspect-[4/3] bg-zinc-100 rounded-2xl overflow-hidden cursor-pointer border border-zinc-200 hover:border-emerald-600 transition group relative block"
            aria-label="Apri la foto di Sofia a pieno schermo"
          >
            <img
              src={photos[0].url}
              alt="Sofia a cavallo"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
              referrerPolicy="no-referrer"
            />
          </button>
        )}
      </div>

      <div className="text-center text-[10px] text-zinc-400 mt-6 font-mono">
        Rete Protetta della Famiglia • Clicca per ingrandire a pieno schermo
      </div>

      {/* Lightbox Screen */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-4 sm:p-6 select-none animate-fade-in text-white">
          <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 bg-zinc-800/70 hover:bg-zinc-700 text-white rounded-full transition"
              aria-label="Chiudi foto a pieno schermo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <img
            src={photos[lightboxIndex].url}
            alt="Sofia a cavallo a pieno schermo"
            className="max-h-full max-w-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
}
