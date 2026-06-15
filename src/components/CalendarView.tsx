import React from 'react';
import { ChevronLeft, FileSpreadsheet, Plus, Trash2 } from 'lucide-react';
import { CalendarShift } from '../data';

interface CalendarViewProps {
  rows: CalendarShift[];
  onBackFeed?: () => void;
  onUpdateRows?: (rows: CalendarShift[]) => void;
}

const MONTHS = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

const parseCellValue = (value: string) => {
  const normalized = value.replace(',', '.').trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatTotal = (value: number) =>
  new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);

export default function CalendarView({ rows, onBackFeed, onUpdateRows }: CalendarViewProps) {
  const readonly = !onUpdateRows;

  const updateCell = (rowId: string, columnIndex: number, value: string) => {
    if (!onUpdateRows) return;

    onUpdateRows(rows.map(row => {
      if (row.id !== rowId) return row;

      const values = [...row.values];
      values[columnIndex] = value;
      return { ...row, values };
    }));
  };

  const updateLabel = (rowId: string, label: string) => {
    if (!onUpdateRows) return;
    onUpdateRows(rows.map(row => row.id === rowId ? { ...row, label } : row));
  };

  const addRow = () => {
    if (!onUpdateRows) return;

    onUpdateRows([
      ...rows,
      {
        id: `ledger_${Date.now()}`,
        label: 'Nuova voce',
        values: Array.from({ length: MONTHS.length }, () => '')
      }
    ]);
  };

  const deleteRow = (rowId: string) => {
    if (!onUpdateRows || rows.length <= 1) return;
    onUpdateRows(rows.filter(row => row.id !== rowId));
  };

  const rowTotals = rows.map(row => row.values.reduce((sum, value) => sum + parseCellValue(value), 0));
  const columnTotals = MONTHS.map((_, columnIndex) =>
    rows.reduce((sum, row) => sum + parseCellValue(row.values[columnIndex] ?? ''), 0)
  );
  const grandTotal = rowTotals.reduce((sum, value) => sum + value, 0);

  return (
    <div className="max-w-[1080px] mx-auto bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-sm font-sans">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-200 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-mono text-[10px] font-black uppercase tracking-wider">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Foglio contabilità</span>
          </div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight font-display mt-0.5">
            Prima Nota Mauro
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">Anno 2026 • Celle modificabili</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={addRow}
            disabled={readonly}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-extrabold text-white bg-emerald-700 hover:bg-emerald-800 disabled:bg-zinc-300 rounded-lg transition"
            title="Aggiungi riga"
          >
            <Plus className="w-4 h-4" />
            <span>Riga</span>
          </button>

          {onBackFeed && (
            <button
              onClick={onBackFeed}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Esci</span>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto border border-zinc-200 rounded-xl">
        <table className="min-w-[980px] w-full border-collapse text-xs">
          <thead className="bg-zinc-100 text-zinc-600">
            <tr>
              <th className="sticky left-0 z-10 bg-zinc-100 w-[210px] border-r border-zinc-200 px-3 py-2 text-left font-black uppercase tracking-wider">
                Voce
              </th>
              {MONTHS.map(month => (
                <th key={month} className="w-[70px] border-r border-zinc-200 px-2 py-2 text-right font-black uppercase tracking-wider">
                  {month}
                </th>
              ))}
              <th className="w-[92px] border-r border-zinc-200 px-3 py-2 text-right font-black uppercase tracking-wider">
                Totale
              </th>
              <th className="w-[44px] px-2 py-2" />
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.id} className="odd:bg-white even:bg-zinc-50/70 hover:bg-emerald-50/50">
                <td className="sticky left-0 z-10 bg-inherit border-t border-r border-zinc-200 p-0">
                  <input
                    type="text"
                    value={row.label}
                    readOnly={readonly}
                    onChange={(event) => updateLabel(row.id, event.target.value)}
                    className="w-full h-10 bg-transparent px-3 text-zinc-900 font-bold outline-hidden focus:bg-white focus:ring-2 focus:ring-inset focus:ring-emerald-600"
                  />
                </td>

                {MONTHS.map((month, columnIndex) => (
                  <td key={`${row.id}-${month}`} className="border-t border-r border-zinc-200 p-0">
                    <input
                      inputMode="decimal"
                      value={row.values[columnIndex] ?? ''}
                      readOnly={readonly}
                      onChange={(event) => updateCell(row.id, columnIndex, event.target.value)}
                      className="w-full h-10 bg-transparent px-2 text-right font-mono text-zinc-800 outline-hidden focus:bg-white focus:ring-2 focus:ring-inset focus:ring-emerald-600"
                      aria-label={`${row.label} ${month}`}
                    />
                  </td>
                ))}

                <td className="border-t border-r border-zinc-200 bg-zinc-100 px-3 py-2 text-right font-mono font-black text-zinc-900">
                  {formatTotal(rowTotals[rowIndex])}
                </td>

                <td className="border-t border-zinc-200 text-center">
                  <button
                    type="button"
                    onClick={() => deleteRow(row.id)}
                    disabled={readonly || rows.length <= 1}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 hover:bg-rose-100 hover:text-rose-700 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-400"
                    title="Elimina riga"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className="bg-zinc-900 text-white">
            <tr>
              <td className="sticky left-0 z-10 bg-zinc-900 border-t border-r border-zinc-700 px-3 py-3 font-black uppercase tracking-wider">
                Totale
              </td>
              {columnTotals.map((total, index) => (
                <td key={MONTHS[index]} className="border-t border-r border-zinc-700 px-2 py-3 text-right font-mono font-black">
                  {formatTotal(total)}
                </td>
              ))}
              <td className="border-t border-r border-zinc-700 px-3 py-3 text-right font-mono font-black text-emerald-300">
                {formatTotal(grandTotal)}
              </td>
              <td className="border-t border-zinc-700" />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
