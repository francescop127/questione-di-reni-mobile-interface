import React from 'react';
import { Newspaper, ChevronLeft, ArrowRight } from 'lucide-react';
import { NewspaperContent } from '../data';

interface NewspaperViewProps {
  newspaper: NewspaperContent;
  onBackFeed?: () => void;
}

export default function NewspaperView({ newspaper, onBackFeed }: NewspaperViewProps) {
  return (
    <div className="max-w-[800px] mx-auto bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm p-6 sm:p-10 font-sans tracking-normal select-none">
      {/* Newspaper Top Bar Header */}
      <div className="border-b-4 border-double border-zinc-800 pb-3 mb-6 text-center">
        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest px-1">
          <span>EDIZIONE DIGITALE REGIONALE</span>
          <span className="text-zinc-900 font-extrabold">{newspaper.publicationDate}</span>
          <span>COPIA PER IL TABLET</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-zinc-900 mt-2 font-display">
          {newspaper.journalTitle}
        </h1>
        <div className="border-t border-zinc-300 mt-3 pt-1 flex justify-center gap-6 text-[10px] italic text-zinc-500">
          <span>Giornalismo Libero & Sostenibile</span>
          <span>•</span>
          <span>Direttore di Scena: {newspaper.authorName}</span>
        </div>
      </div>

      {/* Back Button if inside simulation */}
      {onBackFeed && (
        <button
          onClick={onBackFeed}
          className="mb-6 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition"
        >
          <ChevronLeft className="w-4 h-4 text-zinc-600" />
          <span>Torna al Social Feed</span>
        </button>
      )}

      {/* Main Column */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-zinc-950 leading-tight">
          {newspaper.articleHeadline}
        </h2>
        
        <p className="text-zinc-605 text-sm italic border-l-2 border-emerald-600 pl-3 leading-relaxed">
          {newspaper.articleSubtitle}
        </p>

        {/* Featured Editorial Photo */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 group">
          <img
            src={newspaper.mainImage}
            alt="Tablet Articolo Cover"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
            <span className="text-[10px] font-mono tracking-wider opacity-90 uppercase">
              Inquadratura da Piazza Celli — Archivio Servizio Stampa
            </span>
          </div>
        </div>

        {/* Multi-column Article Copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-[13.5px] leading-relaxed text-zinc-800 text-justify">
          <div className="space-y-4 font-serif">
            <p className="first-letter:text-4xl first-letter:font-black first-letter:text-emerald-700 first-letter:float-left first-letter:mr-2">
              {newspaper.paragraphs[0] || 'Nessun paragrafo configurato per l\'articolo.'}
            </p>
          </div>
          <div className="space-y-4 font-serif text-zinc-700">
            {newspaper.paragraphs.slice(1).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col gap-2 mt-4">
              <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">
                📢 AGGIORNAMENTO DI REDAZIONE
              </span>
              <p className="text-xs text-emerald-900 leading-normal font-sans">
                La capofila degli attivisti Anna Calligaris ha ribadito che il flashmob di domani alle 18:00 a Piazza Celli non arrecherà intralcio alla cittadinanza ordinaria ed è finalizzato a sensibilizzare sullo spreco di risorse biologiche.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-zinc-200 mt-8 pt-4 text-center font-mono text-[9px] text-zinc-400 uppercase">
        Fine Articolo • Riproduzione Riservata © {new Date().getFullYear()} Il Secolo Eco
      </div>
    </div>
  );
}
