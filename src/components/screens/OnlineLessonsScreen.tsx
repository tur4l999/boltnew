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

// Modul növlərinə görə emojilər
const moduleEmojis: Record<string, string> = {
  'M1': '🧮',   // Əsas Matematika
  'M2': '📊',   // Statistika
  'M3': '🧠',   // Psixometriya  
  'M4': '📈',   // Ədəd Ardıcıllığı
  'M5': '🔤',   // Söz Ardıcıllığı
  'M6': '🎨',   // Figura Tamamlama
  'M7': '🔷',   // Fiqur Ardıcıllığı
  'M8': '⚖️',   // Analogiya
  'M9': '🧩',   // Məntiqi Nəticə
  'M10': '📐',  // Həndəsə
  'M11': '🎲',  // Ehtimal
  'M12': '🔢',  // Say və Ədəd
  'M13': '📏',  // Nisbi Məsələlər
  'M14': '🚀',  // Hərəkət Məsələləri
  'M15': '💧',  // Qarışıq Məsələlər
  'M16': '💰',  // Alqı-Satqı
  'M17': '👥',  // Birgə İş
  'M18': '🏊',  // Hovuz Məsələləri
  'M19': '🌳',  // Yaş Məsələləri
  'M20': '🔄',  // Kombinatorika
  'M21': '💡',  // Oxuma Bacarığı
  'M22': '📖',  // Lüğət Bilgisi
  'M23': '✍️',  // Qrammatika
  'M24': '🗣️',  // Danışıq Mədəniyyəti
  'M25': '🌍',  // Cümləni Tamamlama
  'M26': '🔍',  // Mətn Analizi
  'M27': '🏛️',  // Tarix
  'M28': '🗺️',  // Coğrafiya
  'M29': '🎭',  // Ədəbiyyat
  'M30': '🎵',  // Mədəniyyət və İncəsənət
  'M31': '🏆',  // İdman
  'M32': '🔬',  // Ümumi Elmi Biliklər
  'M33': '⚡',  // Fizika
  'M34': '🧪',  // Kimya
  'M35': '🌿',  // Biologiya
  'M36': '🖥️',  // İnformatika
  'QA': '💬',   // Sual-Cavab
  'default': '📚' // Digər
};

const getModuleEmoji = (moduleId: string): string => {
  return moduleEmojis[moduleId] || moduleEmojis.default;
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
      <div className="space-y-4">
        <div className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm font-extrabold`}>{t.upcomingLessons}</div>
        {upcoming.map((l, idx) => {
          const d = new Date(l.date);
          const status = getLessonStatus(l.date);
          return (
            <div
              key={l.id}
              className={`relative rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-gray-800 to-gray-750 border-gray-700' 
                  : 'bg-white border-gray-200 shadow-sm'
              }`}
              onClick={() => { setSelectedLesson(l); setSelectedSource('upcoming'); }}
            >
              {/* Sol taraf - Tarix/Saat bölümü */}
              <div className={`absolute left-0 top-0 bottom-0 w-32 flex flex-col items-center justify-center ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-700 to-gray-800' 
                  : 'bg-gradient-to-br from-gray-50 to-white border-r border-gray-100'
              }`}>
                <div className={`text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {d.getDate()}
                </div>
                <div className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {getAzMonthName(d)}
                </div>
                <div className={`mt-2 text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  {d.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {/* Sağ taraf - Dərs məlumatları */}
              <div className="ml-32 p-4 flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-emerald-800 to-emerald-900' 
                    : 'bg-gradient-to-br from-emerald-100 to-emerald-200'
                }`}>
                  {getModuleEmoji(l.moduleId)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className={`text-base font-extrabold leading-tight mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {truncate(l.title, 64)}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-medium">{l.instructor}</span>
                        <span className="mx-2">•</span>
                        <span>{l.durationMin} dəqiqə</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        status.isActive
                          ? isDarkMode 
                            ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800' 
                            : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          : isDarkMode
                            ? 'bg-gray-800 text-gray-400 border border-gray-700'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}>
                        {status.text}
                      </div>
                      
                      {status.isActive && (
                        <button
                          className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap shadow-sm transition-all duration-200 ${
                            isDarkMode 
                              ? 'bg-emerald-700 text-emerald-100 hover:bg-emerald-600 hover:shadow-md' 
                              : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md'
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
            </div>
          );
        })}
      </div>

      {/* Schedule */}
      <div className="mt-6">
        <div className={`text-sm font-extrabold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t.classSchedule}</div>
        <div className="space-y-4">
          {groupedByDay.map(([dayLabel, items]) => (
            <div key={dayLabel} className="space-y-3">
              <div className={`sticky top-0 z-10 -mx-3 px-3 py-2 text-xs font-extrabold tracking-wide uppercase backdrop-blur-sm ${
                isDarkMode 
                  ? 'bg-gray-900/90 text-gray-300 border-b border-gray-800' 
                  : 'bg-gray-50/90 text-gray-600 border-b border-gray-200'
              }`}>{dayLabel}</div>
              {items.map((l) => {
                const d = new Date(l.date);
                const status = getLessonStatus(l.date);
                return (
                  <div
                    key={l.id}
                    className={`relative rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-md ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-gray-800 to-gray-750 border-gray-700' 
                        : 'bg-white border-gray-200 shadow-sm'
                    }`}
                    onClick={() => { setSelectedLesson(l); setSelectedSource('schedule'); }}
                  >
                    {/* Sol taraf - Saat */}
                    <div className={`absolute left-0 top-0 bottom-0 w-24 flex flex-col items-center justify-center ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-gray-700 to-gray-800' 
                        : 'bg-gradient-to-br from-gray-50 to-white border-r border-gray-100'
                    }`}>
                      <div className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {d.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {l.durationMin} dəq
                      </div>
                    </div>

                    {/* Sağ taraf - Dərs məlumatları */}
                    <div className="ml-24 p-3 flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm ${
                        isDarkMode 
                          ? 'bg-gradient-to-br from-gray-700 to-gray-800' 
                          : 'bg-gradient-to-br from-gray-100 to-gray-200'
                      }`}>
                        {getModuleEmoji(l.moduleId)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <div className={`text-sm font-extrabold leading-tight ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                              {truncate(l.title, 48)}
                            </div>
                            <div className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {l.instructor}
                            </div>
                          </div>
                          
                          <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            status.isActive
                              ? isDarkMode 
                                ? 'bg-blue-900/30 text-blue-400 border border-blue-800' 
                                : 'bg-blue-100 text-blue-700 border border-blue-200'
                              : isDarkMode
                                ? 'bg-gray-800 text-gray-500 border border-gray-700'
                                : 'bg-gray-100 text-gray-500 border border-gray-200'
                          }`}>
                            {status.text}
                          </div>
                        </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setSelectedLesson(null); setSelectedSource(null); }} />
          <div className={`relative z-10 w-full max-w-md rounded-3xl shadow-2xl border overflow-hidden ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            {/* Başlıq bölümü */}
            <div className={`p-6 border-b ${
              isDarkMode ? 'bg-gradient-to-br from-gray-750 to-gray-800 border-gray-700' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-emerald-800 to-emerald-900' 
                    : 'bg-gradient-to-br from-emerald-100 to-emerald-200'
                }`}>
                  {getModuleEmoji(selectedLesson.moduleId)}
                </div>
                <div className="flex-1">
                  <div className={`text-lg font-extrabold mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {selectedLesson.title}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {selectedLesson.instructor}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Məlumat bölümü */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">
                    {new Date(selectedLesson.date).getDate()} {getAzMonthName(new Date(selectedLesson.date))}
                  </span>
                </div>
                <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">
                    {new Date(selectedLesson.date).toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm font-medium">{selectedLesson.durationMin} dəqiqə</span>
                </div>
              </div>
              
              {/* Status */}
              <div className="flex justify-center">
                {(() => {
                  const status = getLessonStatus(selectedLesson.date);
                  return (
                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                      status.isActive
                        ? isDarkMode 
                          ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800' 
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : isDarkMode
                          ? 'bg-gray-800 text-gray-400 border border-gray-700'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}>
                      {status.text}
                    </div>
                  );
                })()}
              </div>
            </div>
            
            {/* Düymələr */}
            <div className={`p-6 border-t ${isDarkMode ? 'bg-gray-850 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              {selectedSource === 'upcoming' && getLessonStatus(selectedLesson.date).isActive ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => alert('Qoşulma linki (demo)')}
                    className={`flex-1 px-5 py-3 rounded-xl font-bold transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-emerald-700 text-emerald-100 hover:bg-emerald-600 hover:shadow-md' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md'
                    }`}
                  >
                    Dərsə Qoşul
                  </button>
                  <button
                    onClick={() => { setSelectedLesson(null); setSelectedSource(null); }}
                    className={`px-5 py-3 rounded-xl font-bold border transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' 
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Bağla
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setSelectedLesson(null); setSelectedSource(null); }}
                  className={`w-full px-5 py-3 rounded-xl font-bold border transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Bağla
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

