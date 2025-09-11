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
  const [selectedSource, setSelectedSource] = useState<'upcoming' | 'schedule' | null>(null);
  // Scheduling visuals removed per requirements

  const truncate = (text: string, max: number): string => {
    if (!text) return '';
    return text.length > max ? text.slice(0, Math.max(0, max - 1)) + '…' : text;
  };

  const getTitleFor = (moduleId: string): string => {
    return MODULES.find(m => m.id === moduleId)?.title || moduleId;
  };

  const getLessonEmoji = (lesson: LessonItem): string => {
    if (lesson.moduleId === 'QA') return '❓';
    switch (lesson.moduleId) {
      case 'M3': return '🚦'; // Yol nişanları
      case 'M10': return '🏎️'; // Hərəkət sürəti
      case 'M12': return '🅿️'; // Parklanma
      case 'M13': return '🔀'; // Yolu keçmə
      default: return '🧑‍🏫'; // Müəllim
    }
  };

  type LessonStatus = 'planned' | 'live' | 'ended';

  const getLessonStatus = (lesson: LessonItem): LessonStatus => {
    const start = new Date(lesson.date).getTime();
    const end = start + lesson.durationMin * 60 * 1000;
    const now = Date.now();
    if (now < start) return 'planned';
    if (now >= start && now <= end) return 'live';
    return 'ended';
  };

  const getStatusMeta = (status: LessonStatus): { label: string; cls: string } => {
    if (status === 'planned') {
      return {
        label: t.statusPlanned,
        cls: isDarkMode ? 'bg-amber-900/30 text-amber-200 border-amber-700' : 'bg-amber-50 text-amber-700 border-amber-200',
      };
    }
    if (status === 'live') {
      return {
        label: t.statusLive,
        cls: isDarkMode ? 'bg-red-900/40 text-red-200 border-red-700 animate-glow' : 'bg-red-50 text-red-700 border-red-200 animate-glow',
      };
    }
    return {
      label: t.statusEnded,
      cls: isDarkMode ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-gray-50 text-gray-600 border-gray-200',
    };
  };

  const formatDateTime = (d: Date): string => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${dd}.${mm}.${yyyy} ${hh}:${min}`;
  };

  const getAzWeekdayShort = (d: Date): string => {
    // 0=Sun..6=Sat
    const map = ['B.', 'B.e', 'Ç.a', 'Ç.', 'C.a', 'C.', 'Ş.'];
    return map[d.getDay()] || '';
  };

  // Use real module titles
  const lessons: LessonItem[] = useMemo(() => [
    { id: 'l1', moduleId: 'M3',  title: getTitleFor('M3'),  instructor: 'Ə.Talıbov',  date: new Date(Date.now() + 2  * 60 * 60 * 1000).toISOString(),  durationMin: 60 },
    // Eyni gündə ikinci onlayn dərs (Sual-Cavab)
    { id: 'l5', moduleId: 'QA',  title: 'Sual- Cavab',      instructor: 'Moderator',   date: new Date(Date.now() + 5  * 60 * 60 * 1000).toISOString(),  durationMin: 45 },
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
    const upcomingIds = new Set(upcoming.map((u: LessonItem) => u.id));
    const remaining = lessons
      .filter(l => !upcomingIds.has(l.id))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const map = new Map<string, LessonItem[]>();
    for (const l of remaining) {
      const d = new Date(l.date);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const key = `${getAzWeekdayShort(d)} ${dd}.${mm}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(l);
    }
    return Array.from(map.entries());
  }, [lessons, upcoming]);

  return (
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
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
        {upcoming.map((l) => {
          const d: Date = new Date(l.date);
          const status: LessonStatus = getLessonStatus(l);
          const meta = getStatusMeta(status);
          return (
            <div
              key={l.id}
              className={`rounded-2xl border p-4 flex items-start gap-4 shadow-sm ${
                isDarkMode ? 'bg-emerald-900/10 border-emerald-800' : 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200'
              }`}
              onClick={() => { setSelectedLesson(l); setSelectedSource('upcoming'); }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                isDarkMode ? 'bg-emerald-800 text-emerald-200' : 'bg-white text-emerald-700 border border-emerald-200 shadow'
              }`}>{getLessonEmoji(l)}</div>
              <div className="flex-1">
                <div className={`text-base font-black leading-tight ${isDarkMode ? 'text-emerald-100' : 'text-emerald-900'}`}>{truncate(l.title, 64)}</div>
                <div className={`text-xs mt-1 ${isDarkMode ? 'text-emerald-200' : 'text-emerald-800'}`}>{l.instructor} • {l.durationMin} dəq</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${meta.cls}`}>{meta.label}</div>
                <div className={`flex flex-col items-end ${isDarkMode ? 'text-emerald-200' : 'text-emerald-800'}`}>
                  <div className="text-xl leading-none font-black">
                    {d.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-[10px] opacity-80">{d.toLocaleDateString('az-AZ')}</div>
                </div>
                <button
                  className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap shadow ${
                    isDarkMode ? 'bg-emerald-700 text-emerald-100 hover:bg-emerald-600' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); alert('Qoşulma linki (demo)'); }}
                >
                  Qoşul
                </button>
              </div>
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
              {items.map((l: LessonItem) => {
                const d: Date = new Date(l.date);
                const status: LessonStatus = getLessonStatus(l);
                const meta = getStatusMeta(status);
                return (
                  <div
                    key={l.id}
                    className={`rounded-xl border p-3 flex items-center gap-3 shadow-sm ${
                      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}
                    onClick={() => { setSelectedLesson(l); setSelectedSource('schedule'); }}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                      isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'
                    }`}>{getLessonEmoji(l)}</div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-extrabold truncate ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{truncate(l.title, 48)}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{l.instructor} • {l.durationMin} dəq</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded-full text-[10px] font-extrabold border ${meta.cls}`}>{meta.label}</div>
                      <div className={`px-2 py-1 rounded-md text-xs font-black ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-50 text-gray-800'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                        {d.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setSelectedLesson(null); setSelectedSource(null); }} />
          <div className={`relative z-10 w-[92%] max-w-sm rounded-2xl p-5 shadow-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className={`text-base font-extrabold mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {selectedLesson.title}
            </div>
            <div className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm leading-relaxed mb-4`}>
              {formatDateTime(new Date(selectedLesson.date))}{' • '}{selectedLesson.instructor}{' • '}{selectedLesson.durationMin} dəq
            </div>
            {selectedSource === 'upcoming' ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => alert('Qoşulma linki (demo)')}
                  className="px-5 py-3 rounded-xl font-bold min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Qoşul
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                {/* No Qoşul for schedule; informational only */}
              </div>
            )}
            <div className="mt-3 flex items-center justify-center">
              <button
                onClick={() => { setSelectedLesson(null); setSelectedSource(null); }}
                className={`px-4 py-2 rounded-xl font-bold min-h-[40px] border ${
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

