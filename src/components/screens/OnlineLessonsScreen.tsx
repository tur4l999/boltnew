import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { MODULES } from '../../lib/data';

type LessonItem = {
  id: string;
  moduleId: string;
  title: string;
  instructor: string;
  date: string; // ISO string
  durationMin: number;
};

export function OnlineLessonsScreen() {
  const { t, isDarkMode, goBack } = useApp();
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);

  const truncate = (text: string, max: number): string => {
    if (!text) return '';
    return text.length > max ? text.slice(0, Math.max(0, max - 1)) + '…' : text;
  };

  const getTitleFor = (moduleId: string): string => {
    return MODULES.find(m => m.id === moduleId)?.title || moduleId;
  };

  // Use real module titles
  const lessons: LessonItem[] = useMemo(() => [
    { id: 'l1', moduleId: 'M3',  title: getTitleFor('M3'),  instructor: 'Ə.Talıbov',  date: new Date(Date.now() + 2  * 60 * 60 * 1000).toISOString(),  durationMin: 60 },
    { id: 'l2', moduleId: 'M13', title: getTitleFor('M13'), instructor: 'R.Məmmədov', date: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(), durationMin: 75 },
    { id: 'l3', moduleId: 'M10', title: getTitleFor('M10'), instructor: 'Ə.Talıbov',  date: new Date(Date.now() + 50 * 60 * 60 * 1000).toISOString(), durationMin: 50 },
    { id: 'l4', moduleId: 'M12', title: getTitleFor('M12'), instructor: 'N.Quliyev',  date: new Date(Date.now() + 3  * 24 * 60 * 60 * 1000).toISOString(), durationMin: 55 },
  ], []);

  const upcoming = useMemo(() => {
    const now = new Date();
    return lessons
      .filter(l => new Date(l.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 2);
  }, [lessons]);

  const groupedByDay = useMemo(() => {
    const map = new Map<string, LessonItem[]>();
    for (const l of lessons.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())) {
      const d = new Date(l.date);
      const key = d.toLocaleDateString('az-AZ', { weekday: 'long', day: '2-digit', month: 'long' });
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(l);
    }
    return Array.from(map.entries());
  }, [lessons]);

  return (
    <div className={`p-3 pb-6 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="-mx-3 -mt-2 mb-3 px-3 py-3 flex items-center gap-3">
        <button
          onClick={goBack}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700 border border-gray-200'}`}
        >
          ← {t.home}
        </button>
        <div className={`text-lg font-extrabold tracking-tight ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{t.onlineLesson}</div>
      </div>

      {/* Upcoming (top 2) */}
      <div className="space-y-3">
        <div className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm font-extrabold`}>{t.upcomingLessons}</div>
        {upcoming.map((l, idx) => {
          const d = new Date(l.date);
          return (
            <div
              key={l.id}
              className={`rounded-2xl border p-4 flex items-start gap-4 shadow-sm ${
                isDarkMode ? 'bg-emerald-900/10 border-emerald-800' : 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200'
              }`}
              onClick={() => setSelectedLesson(l)}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                isDarkMode ? 'bg-emerald-800 text-emerald-200' : 'bg-white text-emerald-700 border border-emerald-200 shadow'
              }`}>📡</div>
              <div className="flex-1">
                <div className={`text-base font-black leading-tight ${isDarkMode ? 'text-emerald-100' : 'text-emerald-900'}`}>{truncate(l.title, 64)}</div>
                <div className={`text-xs mt-1 ${isDarkMode ? 'text-emerald-200' : 'text-emerald-800'}`}>
                  {d.toLocaleString('az-AZ', { weekday: 'long', hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                  {' • '}{l.instructor}{' • '}{l.durationMin} dəq
                </div>
              </div>
              <button
                className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap shadow ${
                  isDarkMode ? 'bg-emerald-700 text-emerald-100 hover:bg-emerald-600' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
                onClick={() => alert('Dərs qoşulma linki (demo)')}
              >
                Canlı qoşul
              </button>
            </div>
          );
        })}
      </div>

      {/* Schedule */}
      <div className="mt-4">
        <div className={`text-sm font-extrabold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t.classSchedule}</div>
        <div className="space-y-3">
          {groupedByDay.map(([dayLabel, items]) => (
            <div key={dayLabel} className="space-y-2">
              <div className={`sticky top-0 z-10 -mx-3 px-3 py-1.5 text-[11px] font-extrabold tracking-wide ${
                isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-600'
              }`}>{dayLabel}</div>
              {items.map((l) => {
                const d = new Date(l.date);
                return (
                  <div
                    key={l.id}
                    className={`rounded-xl border p-3 flex items-center gap-3 shadow-sm ${
                      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}
                    onClick={() => setSelectedLesson(l)}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                      isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'
                    }`}>🎓</div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-extrabold truncate ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{truncate(l.title, 48)}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {d.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })} • {l.instructor} • {l.durationMin} dəq
                      </div>
                    </div>
                    <button
                      onClick={() => alert('Yadda saxlandı (demo)')}
                      className={`px-2 py-1 rounded text-[11px] font-semibold shadow-sm ${
                        isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Planla
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedLesson(null)} />
          <div className={`relative z-10 w-[92%] max-w-sm rounded-2xl p-5 shadow-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className={`text-base font-extrabold mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {selectedLesson.title}
            </div>
            <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-xs mb-4`}>
              {new Date(selectedLesson.date).toLocaleString('az-AZ', { weekday: 'long', day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' })}
              {' • '}{selectedLesson.instructor}{' • '}{selectedLesson.durationMin} dəq
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => alert('Qoşulma linki (demo)')}
                className="px-4 py-2 rounded-xl font-bold min-h-[40px] bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Canlı qoşul
              </button>
              <button
                onClick={() => alert('Təqvimə əlavə edildi (demo)')}
                className={`px-4 py-2 rounded-xl font-bold min-h-[40px] border ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Planla
              </button>
              <button
                onClick={() => setSelectedLesson(null)}
                className={`col-span-2 mt-1 px-4 py-2 rounded-xl font-bold min-h-[40px] border ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

