import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import type { ExamAttempt, ExamType } from '../../lib/types';

type TypeFilter = 'all' | ExamType;

export function ResultsHistoryScreen() {
  const { isDarkMode, results, t } = useApp();
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const typeOptions: Array<{ value: TypeFilter; label: string }> = [
    { value: 'all', label: t.all },
    { value: 'tickets', label: t.ticketsType },
    { value: 'topics', label: t.topicsType },
    { value: 'simulator', label: t.simulatorType },
    { value: 'final', label: t.finalType },
  ];

  const filtered: ExamAttempt[] = useMemo(() => {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    if (to) {
      // include whole day for 'to'
      to.setHours(23, 59, 59, 999);
    }
    const list = (results as ExamAttempt[]).filter((r: ExamAttempt) => {
      if (typeFilter !== 'all' && r.type !== typeFilter) return false;
      if (from && r.date < from) return false;
      if (to && r.date > to) return false;
      return true;
    });
    return list.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [results, typeFilter, fromDate, toDate]);

  function formatDate(d: Date): string {
    try {
      return d.toLocaleString('az-AZ');
    } catch {
      return new Date(d).toLocaleString('az-AZ');
    }
  }

  function percent(a: ExamAttempt): number {
    return Math.round((a.score / a.total) * 100);
  }

  return (
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Card className="mb-3">
        <div className="grid grid-cols-1 gap-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={`text-[11px] block mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.dateFrom}</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFromDate(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
            <div>
              <label className={`text-[11px] block mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.dateTo}</label>
              <input
                type="date"
                value={toDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToDate(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
          </div>
          <div>
            <label className={`text-[11px] block mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.examType}</label>
            <div className="grid grid-cols-2 gap-2">
              {typeOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTypeFilter(opt.value)}
                  className={`px-3 py-2 rounded-xl text-sm font-bold border ${
                    typeFilter === opt.value
                      ? isDarkMode
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-emerald-600 text-white border-emerald-700'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-100 border-gray-700'
                        : 'bg-white text-gray-800 border-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <Card>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nəticə tapılmadı.</div>
          </Card>
        )}

        {filtered.map((a) => {
          const isPass = percent(a) >= 80;
          return (
            <div
              key={a.id}
              className={`rounded-xl border p-3 flex items-center gap-3 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                isPass ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {isPass ? '✅' : '❌'}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-bold truncate ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {a.title || labelForType(a.type)}
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {formatDate(a.date)} • {a.score}/{a.total} • {percent(a)}%
                </div>
              </div>
              <div className={`text-xs font-semibold ${isPass ? 'text-emerald-600' : 'text-red-600'}`}>
                {isPass ? t.pass : t.fail}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  function labelForType(type: ExamType): string {
    switch (type) {
      case 'tickets': return 'Biletlər üzrə';
      case 'topics': return 'Mövzular üzrə';
      case 'simulator': return 'Simulyator İmtahanı';
      case 'final': return 'Yekun imtahan';
      default: return 'İmtahan';
    }
  }
}

