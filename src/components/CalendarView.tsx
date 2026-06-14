import React, { useState } from 'react';
import { Calendar, Plus, Clock, MapPin, ChevronLeft, CalendarDays, RefreshCw } from 'lucide-react';
import { CalendarShift } from '../data';

interface CalendarViewProps {
  shifts: CalendarShift[];
  onBackFeed?: () => void;
  onAddShift?: (newShift: Omit<CalendarShift, 'id'>) => void;
}

export default function CalendarView({ shifts, onBackFeed, onAddShift }: CalendarViewProps) {
  const [newTitle, setNewTitle] = useState('');
  const [newDay, setNewDay] = useState(1);
  const [newTime, setNewTime] = useState('08:00 - 16:00');
  const [newType, setNewType] = useState<'night' | 'day' | 'on-call' | 'rest'>('day');
  const [newLoc, setNewLoc] = useState('Clinica San Raffaele');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !onAddShift) return;
    onAddShift({
      day: Number(newDay),
      title: newTitle,
      time: newTime,
      type: newType,
      location: newLoc
    });
    setNewTitle('');
  };

  const getShiftBadge = (type: string) => {
    switch (type) {
      case 'night':
        return 'bg-purple-100 text-purple-850 border border-purple-200';
      case 'on-call':
        return 'bg-amber-100 text-amber-850 border border-amber-200';
      case 'rest':
        return 'bg-zinc-100 text-zinc-650 border border-zinc-200';
      case 'day':
      default:
        return 'bg-emerald-100 text-emerald-850 border border-emerald-200';
    }
  };

  return (
    <div className="max-w-[900px] mx-auto bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm font-sans select-none">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-200 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-mono text-[10px] font-black uppercase tracking-wider">
            <CalendarDays className="w-4 h-4 animate-pulse" />
            <span>Gestione Orari Clinica San Raffaele</span>
          </div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight font-display mt-0.5">
            Turni Lavorativi di Mauro
          </h1>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">Giugno 2026 • Portale Personale Sanitario</p>
        </div>

        <div className="flex gap-2">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Weekly Grid */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xs font-black uppercase text-zinc-400 tracking-wider">
            Tabella Turni Attivi
          </h2>

          <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-black uppercase tracking-widest text-zinc-450 border-b border-zinc-100 pb-2">
            <div>Lun</div>
            <div>Mar</div>
            <div>Mer</div>
            <div>Gio</div>
            <div>Ven</div>
            <div>Sab</div>
            <div>Dom</div>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {/* Days 1 to 7 offset empty or mock spacer if June begins on Monday */}
            {Array.from({ length: 30 }).map((_, i) => {
              const dayNum = i + 1;
              const matches = shifts.filter(s => s.day === dayNum);

              return (
                <div
                  key={dayNum}
                  className={`min-h-[75px] p-1.5 border border-zinc-100 rounded-xl flex flex-col justify-between transition-colors bg-zinc-50/50 hover:bg-zinc-100/40`}
                >
                  <span className="text-[10px] font-mono font-bold text-zinc-400">{dayNum}</span>
                  
                  <div className="space-y-1">
                    {matches.map((shift, idx) => (
                      <div
                        key={shift.id || idx}
                        className={`p-1 rounded text-[7px] leading-tight font-bold truncate ${getShiftBadge(shift.type)}`}
                        title={`${shift.title} (${shift.time})`}
                      >
                        {shift.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Mini Form to add customized shift on the workstation */}
        <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-zinc-100 lg:pl-6">
          <div>
            <h2 className="text-xs font-black uppercase text-zinc-400 tracking-wider mb-1">
              Aggiungi Reperibilità / Turno
            </h2>
            <p className="text-[11px] text-zinc-400 font-medium">Aggiungi o modifica i turni lavorativi della clinica con un clic.</p>
          </div>

          {onAddShift ? (
            <form onSubmit={handleCreate} className="space-y-4 text-xs font-medium bg-zinc-50/70 p-4 rounded-2xl border border-zinc-200">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-505 block font-bold uppercase">Giorno del Mese (Giugno)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={newDay}
                  onChange={(e) => setNewDay(Number(e.target.value))}
                  className="w-full bg-white border border-zinc-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500 focus:outline-hidden font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-505 block font-bold uppercase">Descrizione / Servizio</label>
                <input
                  type="text"
                  placeholder="es. Reparto Trapianti o Guardia"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-505 block font-bold uppercase">Fascia Oraria</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500 focus:outline-hidden font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-505 block font-bold uppercase">Tipologia</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-white border border-zinc-200 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="day">🌿 Clinica Giorno</option>
                    <option value="night">🌙 Notte / Notturno</option>
                    <option value="on-call">📞 Reperibilità</option>
                    <option value="rest">🏠 Riposo</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-505 block font-bold uppercase font-sans">Lab / Locazione Ospedaliera</label>
                <input
                  type="text"
                  value={newLoc}
                  onChange={(e) => setNewLoc(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-lg flex items-center justify-center gap-1.5 uppercase tracking-wide cursor-pointer transition shadow-sm text-[11px]"
              >
                <Plus className="w-4 h-4" />
                <span>Salva sul Calendario Clinica</span>
              </button>
            </form>
          ) : (
            <p className="text-[11px] text-zinc-400 italic">Interfaccia solo lettura in questa inquadratura artistica.</p>
          )}

          {/* List views of active shifts */}
          <div className="space-y-3.5 pt-2">
            <h3 className="text-[10px] font-black uppercase tracking-wider text-zinc-450 flex items-center justify-between">
              <span>Riepilogo Turnazione Ordinata</span>
              <span className="text-zinc-500 hover:text-zinc-800 cursor-pointer font-mono font-medium flex items-center gap-0.5 text-[8.5px]">
                <RefreshCw className="w-3 h-3" /> Aggiorna Rete
              </span>
            </h3>

            <div className="space-y-2 max-h-[180px] overflow-y-auto no-scrollbar">
              {shifts.map((shift, idx) => (
                <div
                  key={shift.id || idx}
                  className="p-3 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-200 flex justify-between items-center text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-extrabold text-zinc-900 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        shift.type === 'night' ? 'bg-purple-500' : shift.type === 'on-call' ? 'bg-amber-500' : shift.type === 'rest' ? 'bg-zinc-400' : 'bg-emerald-500'
                      }`} />
                      {shift.title}
                    </p>
                    <span className="text-[10px] text-zinc-550 block font-mono">
                      {shift.time}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] bg-white border border-zinc-200 px-2 py-0.5 rounded-md font-mono text-zinc-500 block">
                      Giorno {shift.day}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
