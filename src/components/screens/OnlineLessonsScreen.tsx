import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { MODULES } from '../../lib/data';

type LessonStatus = 'scheduled' | 'in_progress' | 'completed';

type LessonItem = {
  id: string;
  moduleId: string;
  title: string;
  instructor: string;
  date: string; // ISO string
  durationMin: number;
  status: LessonStatus;
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

  // Helper functions for status and emojis
  const getStatusText = (status: LessonStatus): string => {
    switch (status) {
      case 'scheduled': return 'Planlaşdırılıb';
      case 'in_progress': return 'Davam edir';
      case 'completed': return 'Tamamlandı';
      default: return 'Planlaşdırılıb';
    }
  };

  const getStatusColor = (status: LessonStatus, isDark: boolean): string => {
    switch (status) {
      case 'scheduled': return isDark ? 'bg-blue-900/20 text-blue-300 border-blue-700' : 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in_progress': return isDark ? 'bg-emerald-900/20 text-emerald-300 border-emerald-700' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'completed': return isDark ? 'bg-gray-700/50 text-gray-400 border-gray-600' : 'bg-gray-100 text-gray-600 border-gray-300';
      default: return isDark ? 'bg-blue-900/20 text-blue-300 border-blue-700' : 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getLessonEmoji = (moduleId: string, status: LessonStatus): string => {
    if (status === 'completed') return '✅';
    if (status === 'in_progress') return '🔴';
    
    // Different emojis for different lesson types
    switch (moduleId) {
      case 'M3': return '🚦'; // Traffic rules
      case 'M10': return '🛣️'; // Road signs
      case 'M12': return '⚠️'; // Safety
      case 'M13': return '🚗'; // Vehicle operation
      case 'QA': return '💬'; // Q&A sessions
      default: return '📚';
    }
  };

  // Use real module titles with status
  const lessons: LessonItem[] = useMemo(() => [
    { id: 'l1', moduleId: 'M3',  title: getTitleFor('M3'),  instructor: 'Ə.Talıbov',  date: new Date(Date.now() + 2  * 60 * 60 * 1000).toISOString(),  durationMin: 60, status: 'in_progress' },
    // Eyni gündə ikinci onlayn dərs (Sual-Cavab)
    { id: 'l5', moduleId: 'QA',  title: 'Sual-Cavab',      instructor: 'Moderator',   date: new Date(Date.now() + 5  * 60 * 60 * 1000).toISOString(),  durationMin: 45, status: 'scheduled' },
    { id: 'l2', moduleId: 'M13', title: getTitleFor('M13'), instructor: 'R.Məmmədov', date: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(), durationMin: 75, status: 'scheduled' },
    { id: 'l3', moduleId: 'M10', title: getTitleFor('M10'), instructor: 'Ə.Talıbov',  date: new Date(Date.now() + 50 * 60 * 60 * 1000).toISOString(), durationMin: 50, status: 'scheduled' },
    { id: 'l4', moduleId: 'M12', title: getTitleFor('M12'), instructor: 'N.Quliyev',  date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), durationMin: 55, status: 'completed' },
  ], []);

  const upcoming = useMemo(() => {
    const now = new Date();
    return lessons
      .filter(l => new Date(l.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 2);
  }, [lessons]);

  const groupedByDay = useMemo(() => {
    const upcomingIds = new Set(upcoming.map(u => u.id));
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

  const shouldShowPlanInsteadOfJoin = (_lesson: LessonItem): boolean => false;

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
        {upcoming.map((l, idx) => {
          const d = new Date(l.date);
          return (
            <div
              key={l.id}
              className={`rounded-2xl border p-4 flex items-start gap-4 shadow-sm transition-all duration-200 hover:shadow-md ${
                l.status === 'in_progress' 
                  ? (isDarkMode ? 'bg-emerald-900/20 border-emerald-700 ring-1 ring-emerald-600' : 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-300 ring-1 ring-emerald-200')
                  : (isDarkMode ? 'bg-blue-900/10 border-blue-800' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200')
              }`}
              onClick={() => { setSelectedLesson(l); setSelectedSource('upcoming'); }}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-sm ${
                l.status === 'in_progress'
                  ? (isDarkMode ? 'bg-emerald-800 text-emerald-200 border border-emerald-700' : 'bg-white text-emerald-700 border border-emerald-200')
                  : (isDarkMode ? 'bg-blue-800 text-blue-200 border border-blue-700' : 'bg-white text-blue-700 border border-blue-200')
              }`}>{getLessonEmoji(l.moduleId, l.status)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`text-base font-black leading-tight ${
                    l.status === 'in_progress' 
                      ? (isDarkMode ? 'text-emerald-100' : 'text-emerald-900') 
                      : (isDarkMode ? 'text-blue-100' : 'text-blue-900')
                  }`}>{truncate(l.title, 50)}</div>
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(l.status, isDarkMode)}`}>
                    {getStatusText(l.status)}
                  </div>
                </div>
                <div className={`text-sm font-bold mb-1 ${
                  l.status === 'in_progress' 
                    ? (isDarkMode ? 'text-emerald-200' : 'text-emerald-800') 
                    : (isDarkMode ? 'text-blue-200' : 'text-blue-800')
                }`}>
                  📅 {formatDateTime(d)}
                </div>
                <div className={`text-xs ${
                  l.status === 'in_progress' 
                    ? (isDarkMode ? 'text-emerald-300' : 'text-emerald-700') 
                    : (isDarkMode ? 'text-blue-300' : 'text-blue-700')
                }`}>
                  👨‍🏫 {l.instructor} • ⏱️ {l.durationMin} dəq
                </div>
              </div>
              {
                <button
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap shadow-sm transition-all duration-200 ${
                    l.status === 'in_progress'
                      ? (isDarkMode ? 'bg-emerald-700 text-emerald-100 hover:bg-emerald-600 ring-1 ring-emerald-600' : 'bg-emerald-600 text-white hover:bg-emerald-700 ring-1 ring-emerald-500')
                      : (isDarkMode ? 'bg-blue-700 text-blue-100 hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700')
                  }`}
                  onClick={(e) => { e.stopPropagation(); alert('Qoşulma linki (demo)'); }}
                >
                  {l.status === 'in_progress' ? '🔴 Qoşul' : '📋 Planla'}
                </button>
              }
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
                    className={`rounded-xl border p-3 flex items-center gap-3 shadow-sm transition-all duration-200 hover:shadow-md ${
                      l.status === 'completed' 
                        ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 opacity-75' : 'bg-gray-50 border-gray-300 opacity-75')
                        : l.status === 'in_progress'
                        ? (isDarkMode ? 'bg-emerald-900/10 border-emerald-700' : 'bg-emerald-50 border-emerald-200')
                        : (isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')
                    }`}
                    onClick={() => { setSelectedLesson(l); setSelectedSource('schedule'); }}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl shadow-sm ${
                      l.status === 'completed'
                        ? (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500')
                        : l.status === 'in_progress'
                        ? (isDarkMode ? 'bg-emerald-800 text-emerald-200' : 'bg-emerald-100 text-emerald-700')
                        : (isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700')
                    }`}>{getLessonEmoji(l.moduleId, l.status)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`text-sm font-extrabold truncate ${
                          l.status === 'completed' 
                            ? (isDarkMode ? 'text-gray-400' : 'text-gray-500') 
                            : (isDarkMode ? 'text-gray-100' : 'text-gray-900')
                        }`}>{truncate(l.title, 40)}</div>
                        <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${getStatusColor(l.status, isDarkMode)}`}>
                          {getStatusText(l.status)}
                        </div>
                      </div>
                      <div className={`text-sm font-bold mb-0.5 ${
                        l.status === 'completed' 
                          ? (isDarkMode ? 'text-gray-500' : 'text-gray-400') 
                          : (isDarkMode ? 'text-gray-200' : 'text-gray-700')
                      }`}>
                        🕐 {d.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className={`text-xs ${
                        l.status === 'completed' 
                          ? (isDarkMode ? 'text-gray-500' : 'text-gray-400') 
                          : (isDarkMode ? 'text-gray-300' : 'text-gray-600')
                      }`}>
                        👨‍🏫 {l.instructor} • ⏱️ {l.durationMin} dəq
                      </div>
                    </div>
                    {l.status === 'in_progress' && (
                      <div className={`w-3 h-3 rounded-full animate-pulse ${
                        isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'
                      }`} />
                    )}
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
          <div className={`relative z-10 w-[92%] max-w-sm rounded-2xl p-6 shadow-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm ${
                selectedLesson.status === 'completed'
                  ? (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500')
                  : selectedLesson.status === 'in_progress'
                  ? (isDarkMode ? 'bg-emerald-800 text-emerald-200' : 'bg-emerald-100 text-emerald-700')
                  : (isDarkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-700')
              }`}>{getLessonEmoji(selectedLesson.moduleId, selectedLesson.status)}</div>
              <div className="flex-1">
                <div className={`text-lg font-extrabold mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {selectedLesson.title}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-bold border inline-block ${getStatusColor(selectedLesson.status, isDarkMode)}`}>
                  {getStatusText(selectedLesson.status)}
                </div>
              </div>
            </div>
            
            <div className={`${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'} rounded-xl p-3 mb-4`}>
              <div className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm leading-relaxed space-y-1`}>
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span className="font-bold">{formatDateTime(new Date(selectedLesson.date))}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👨‍🏫</span>
                  <span>{selectedLesson.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>{selectedLesson.durationMin} dəqiqə</span>
                </div>
              </div>
            </div>

            {selectedSource === 'upcoming' && selectedLesson.status !== 'completed' ? (
              <div className="flex items-center justify-center mb-3">
                <button
                  onClick={() => alert('Qoşulma linki (demo)')}
                  className={`px-6 py-3 rounded-xl font-bold min-h-[44px] transition-all duration-200 ${
                    selectedLesson.status === 'in_progress'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-500/50'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {selectedLesson.status === 'in_progress' ? '🔴 Qoşul' : '📋 Planla'}
                </button>
              </div>
            ) : selectedLesson.status === 'completed' ? (
              <div className={`text-center py-2 mb-3 rounded-xl ${isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                <span className="text-sm font-medium">✅ Dərs tamamlandı</span>
              </div>
            ) : null}

            <div className="flex items-center justify-center">
              <button
                onClick={() => { setSelectedLesson(null); setSelectedSource(null); }}
                className={`px-6 py-2 rounded-xl font-bold min-h-[40px] border transition-all duration-200 ${
                  isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
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

