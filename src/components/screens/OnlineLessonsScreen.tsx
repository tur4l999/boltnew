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

// Dərs növünə görə emoji
const getLessonTypeEmoji = (moduleId: string): string => {
  if (moduleId === 'QA') return '💬'; // Sual-Cavab
  return '📚'; // Normal dərs
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

  // Dərsin statusunu müəyyən edən funksiya
  const getLessonStatus = (lessonDate: string): { text: string; isActive: boolean } => {
    const now = new Date();
    const lessonDateTime = new Date(lessonDate);
    
    // Eyni günün sonuna qədər olan dərslər
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);
    
    if (lessonDateTime <= todayEnd) {
      return { text: 'Bitib', isActive: false };
    }
    
    return { text: 'Davam edir', isActive: true };
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

  const getAzMonthName = (d: Date): string => {
    const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 
                   'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
    return months[d.getMonth()];
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
        <div className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm font-bold`}>{t.upcomingLessons}</div>
        {upcoming.map((l, idx) => {
          const d = new Date(l.date);
          const status = getLessonStatus(l.date);
          return (
            <div
              key={l.id}
              className={`rounded-xl border p-4 transition-all duration-200 hover:shadow-md cursor-pointer ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => { setSelectedLesson(l); setSelectedSource('upcoming'); }}
            >
              <div className="flex items-start gap-4">
                {/* Emoji */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                  isDarkMode 
                    ? 'bg-gray-700' 
                    : 'bg-gray-100'
                }`}>
                  {getLessonTypeEmoji(l.moduleId)}
                </div>
                
                {/* Məlumatlar */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`font-bold text-base ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {truncate(l.title, 50)}
                      </h3>
                      <p className={`text-sm mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {l.instructor}
                      </p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      status.isActive
                        ? isDarkMode 
                          ? 'bg-emerald-900/20 text-emerald-400' 
                          : 'bg-emerald-50 text-emerald-700'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-gray-100 text-gray-500'
                    }`}>
                      {status.text}
                    </span>
                  </div>
                  
                  {/* Tarix və saat */}
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {d.getDate()} {getAzMonthName(d).slice(0, 3)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {d.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {l.durationMin} dəq
                      </span>
                    </div>
                    
                    {status.isActive && (
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          isDarkMode 
                            ? 'bg-emerald-700 text-emerald-100 hover:bg-emerald-600' 
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                        onClick={(e) => { e.stopPropagation(); alert('Qoşulma linki (demo)'); }}
                      >
                        Qoşul
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Schedule */}
      <div className="mt-5">
        <div className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t.classSchedule}</div>
        <div className="space-y-3">
          {groupedByDay.map(([dayLabel, items]) => (
            <div key={dayLabel}>
              <div className={`text-xs font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {dayLabel}
              </div>
              <div className="space-y-2">
                {items.map((l) => {
                  const d = new Date(l.date);
                  const status = getLessonStatus(l.date);
                  return (
                    <div
                      key={l.id}
                      className={`rounded-lg border p-3 transition-all duration-200 hover:shadow cursor-pointer ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => { setSelectedLesson(l); setSelectedSource('schedule'); }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Emoji */}
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                          isDarkMode 
                            ? 'bg-gray-700' 
                            : 'bg-gray-100'
                        }`}>
                          {getLessonTypeEmoji(l.moduleId)}
                        </div>
                        
                        {/* Məlumatlar */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className={`font-semibold text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                {truncate(l.title, 40)}
                              </h4>
                              <div className={`text-xs mt-0.5 flex items-center gap-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <span>{d.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}</span>
                                <span>•</span>
                                <span>{l.instructor}</span>
                                <span>•</span>
                                <span>{l.durationMin} dəq</span>
                              </div>
                            </div>
                            
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              status.isActive
                                ? isDarkMode 
                                  ? 'bg-blue-900/20 text-blue-400' 
                                  : 'bg-blue-50 text-blue-600'
                                : isDarkMode
                                  ? 'bg-gray-700 text-gray-400'
                                  : 'bg-gray-100 text-gray-500'
                            }`}>
                              {status.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setSelectedLesson(null); setSelectedSource(null); }} />
          <div className={`relative z-10 w-full max-w-sm rounded-2xl shadow-xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-5">
              {/* Başlıq */}
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  {getLessonTypeEmoji(selectedLesson.moduleId)}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-base ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {selectedLesson.title}
                  </h3>
                  <p className={`text-sm mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedLesson.instructor}
                  </p>
                </div>
              </div>
              
              {/* Məlumatlar */}
              <div className={`space-y-2 mb-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(selectedLesson.date).getDate()} {getAzMonthName(new Date(selectedLesson.date))}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{new Date(selectedLesson.date).toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>{selectedLesson.durationMin} dəqiqə</span>
                </div>
              </div>
              
              {/* Status */}
              <div className="flex items-center justify-center mb-5">
                {(() => {
                  const status = getLessonStatus(selectedLesson.date);
                  return (
                    <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                      status.isActive
                        ? isDarkMode 
                          ? 'bg-emerald-900/20 text-emerald-400' 
                          : 'bg-emerald-50 text-emerald-700'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-gray-100 text-gray-500'
                    }`}>
                      {status.text}
                    </span>
                  );
                })()}
              </div>
              
              {/* Düymələr */}
              <div className="flex gap-3">
                {selectedSource === 'upcoming' && getLessonStatus(selectedLesson.date).isActive && (
                  <button
                    onClick={() => alert('Qoşulma linki (demo)')}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors ${
                      isDarkMode 
                        ? 'bg-emerald-700 text-emerald-100 hover:bg-emerald-600' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    Dərsə Qoşul
                  </button>
                )}
                <button
                  onClick={() => { setSelectedLesson(null); setSelectedSource(null); }}
                  className={`${selectedSource === 'upcoming' && getLessonStatus(selectedLesson.date).isActive ? '' : 'flex-1'} px-4 py-2.5 rounded-lg font-semibold border transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' 
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Bağla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

