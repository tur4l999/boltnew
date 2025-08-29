import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';

interface CalendarProps {
  initialDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange: (date: Date) => void;
}

// Week starts on Monday: Mon..Sun
const WEEKDAY_LABELS = ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'Bazar'];

export function Calendar({ initialDate, minDate, maxDate, onChange }: CalendarProps) {
  const { isDarkMode } = useApp();
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState<number>((initialDate || today).getFullYear());
  const [viewMonth, setViewMonth] = useState<number>((initialDate || today).getMonth()); // 0-11
  const [selected, setSelected] = useState<Date | null>(initialDate || null);

  function isDisabled(date: Date): boolean {
    if (minDate && date < stripTime(minDate)) return true;
    if (maxDate && date > stripTime(maxDate)) return true;
    return false;
  }

  function stripTime(d: Date): Date {
    const nd = new Date(d);
    nd.setHours(0, 0, 0, 0);
    return nd;
  }

  function buildCalendarCells(year: number, month: number): (Date | null)[] {
    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);

    // JS getDay(): 0=Sun..6=Sat; We want Mon..Sun
    let leadingEmpty = firstOfMonth.getDay() - 1; // Mon=0
    if (leadingEmpty < 0) leadingEmpty = 6; // if Sunday

    const daysInMonth = lastOfMonth.getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < leadingEmpty; i++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(new Date(year, month, day));
    }
    // pad to full weeks (multiple of 7)
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }

  const cells = useMemo(() => buildCalendarCells(viewYear, viewMonth), [viewYear, viewMonth]);

  function goPrevMonth() {
    const d = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }
  function goNextMonth() {
    const d = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }

  function handleSelect(date: Date) {
    if (isDisabled(date)) return;
    const clean = stripTime(date);
    setSelected(clean);
    onChange(clean);
  }

  const monthYearLabel = useMemo(() => {
    const date = new Date(viewYear, viewMonth, 1);
    return date.toLocaleDateString('az-AZ', { month: 'long', year: 'numeric' });
  }, [viewYear, viewMonth]);

  return (
    <div className={`w-full max-w-sm select-none ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={goPrevMonth}
          className={`px-2 py-1 rounded border text-xs ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}
        >
          ←
        </button>
        <div className="font-semibold text-sm capitalize">{monthYearLabel}</div>
        <button
          onClick={goNextMonth}
          className={`px-2 py-1 rounded border text-xs ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-[11px] mb-1">
        {WEEKDAY_LABELS.map((lbl) => (
          <div key={lbl} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center font-medium`}>{lbl}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, idx) => {
          if (!date) return <div key={idx} className="h-8" />;
          const disabled = isDisabled(date);
          const isToday = stripTime(date).getTime() === stripTime(today).getTime();
          const isSelected = selected && stripTime(date).getTime() === stripTime(selected).getTime();
          return (
            <button
              key={idx}
              onClick={() => handleSelect(date)}
              disabled={disabled}
              className={
                `h-8 w-full rounded text-sm transition-colors ${
                  disabled
                    ? isDarkMode ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isSelected
                      ? 'bg-emerald-600 text-white'
                      : isDarkMode
                        ? (isToday ? 'bg-gray-700 text-gray-100' : 'bg-gray-800 hover:bg-gray-700 text-gray-200')
                        : (isToday ? 'bg-gray-200 text-gray-900' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200')
                }`
              }
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

