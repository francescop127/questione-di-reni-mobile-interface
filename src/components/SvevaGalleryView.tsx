import React, { useState } from 'react';
import { Heart, MessageSquare, ChevronLeft, ChevronRight, X, Play } from 'lucide-react';
import { SvevaPhoto } from '../data';

interface SvevaGalleryProps {
  photos: SvevaPhoto[];
  onBackFeed?: () => void;
}

export default function SvevaGalleryView({ photos, onBackFeed }: SvevaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? photos.length - 1 : lightboxIndex - 1);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === photos.length - 1 ? 0 : lightboxIndex + 1);
  };

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

      {/* Photos Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {photos.map((photo, index) => (
          <div
            key={photo.id || index}
            onClick={() => setLightboxIndex(index)}
            className="aspect-square bg-zinc-100 rounded-2xl overflow-hidden cursor-pointer border border-zinc-200 hover:border-emerald-600 transition group relative"
          >
            <img
              src={photo.url}
              alt={`Sofia photo ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              referrerPolicy="no-referrer"
            />
            {/* Hover overlay stats */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white text-xs font-bold">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-white" /> {photo.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 fill-white" /> {photo.commentsCount}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-[10px] text-zinc-400 mt-6 font-mono">
        Rete Protetta della Famiglia • Clicca per ingrandire a pieno schermo
      </div>

      {/* Lightbox Screen */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-[999] flex flex-col justify-between p-4 sm:p-6 select-none animate-fade-in text-white">
          {/* Lightbox Head */}
          <div className="flex justify-between items-center text-xs">
            <span className="font-mono tracking-widest text-zinc-400">
              FOTO {lightboxIndex + 1} DI {photos.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 bg-zinc-800/70 hover:bg-zinc-700 text-white rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Content Carousel */}
          <div className="flex items-center justify-between flex-1 max-w-[550px] mx-auto w-full gap-4">
            <button
              onClick={prevImage}
              className="p-2 bg-zinc-800/60 hover:bg-zinc-700 text-white rounded-full transition shrink-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Img Box */}
            <div className="flex-1 flex flex-col items-center justify-center max-h-[70vh] relative">
              <img
                src={photos[lightboxIndex].url}
                alt="Sofia zoom visual"
                className="max-h-[60vh] max-w-full object-contain rounded-2xl border border-zinc-800 bg-zinc-950"
                referrerPolicy="no-referrer"
              />
              {/* Caption details bottom */}
              <p className="text-center text-xs sm:text-sm text-neutral-200 mt-4 max-w-md leading-relaxed font-sans font-medium">
                {photos[lightboxIndex].caption}
              </p>
            </div>

            <button
              onClick={nextImage}
              className="p-2 bg-zinc-800/60 hover:bg-zinc-700 text-white rounded-full transition shrink-0"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center font-mono text-[9px] text-zinc-550 uppercase tracking-wider pb-2">
            Dispositivo di Anna • Visualizzatore On-Set Alta Definizione
          </div>
        </div>
      )}
    </div>
  );
}
