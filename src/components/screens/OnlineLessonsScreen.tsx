import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { MODULES } from '../../lib/data';

type LessonStatus = 'scheduled' | 'live' | 'completed';

type LessonItem = {
  id: string;
  moduleId: string;
  title: string;
  instructor: string;
  date: string; // ISO string
  durationMin: number;
  status?: LessonStatus;
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

  // Use real module titles
  const lessons: LessonItem[] = useMemo(() => [
    // Completed lesson (2 hours ago)
    { id: 'l0', moduleId: 'M1',  title: getTitleFor('M1'),  instructor: 'R.Hüseynov', date: new Date(Date.now() - 2  * 60 * 60 * 1000).toISOString(), durationMin: 60 },
    // Live lesson (started 10 minutes ago, 50 minutes remaining)
    { id: 'l1', moduleId: 'M3',  title: getTitleFor('M3'),  instructor: 'Ə.Talıbov',  date: new Date(Date.now() - 10 * 60 * 1000).toISOString(),      durationMin: 60 },
    // Upcoming lessons
    { id: 'l5', moduleId: 'QA',  title: 'Sual-Cavab',       instructor: 'Moderator',   date: new Date(Date.now() + 2  * 60 * 60 * 1000).toISOString(),  durationMin: 45 },
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

  // Get lesson status based on date and time
  const getLessonStatus = (lesson: LessonItem): LessonStatus => {
    const now = new Date();
    const lessonDate = new Date(lesson.date);
    const lessonEnd = new Date(lessonDate.getTime() + lesson.durationMin * 60 * 1000);
    
    if (lessonDate > now) {
      return 'scheduled';
    } else if (now >= lessonDate && now <= lessonEnd) {
      return 'live';
    } else {
      return 'completed';
    }
  };

  // Get status display info
  const getStatusDisplay = (status: LessonStatus) => {
    switch (status) {
      case 'scheduled':
        return {
          text: 'Planlaşdırılıb',
          emoji: '📅',
          bgColor: isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100',
          textColor: isDarkMode ? 'text-blue-300' : 'text-blue-700',
          borderColor: isDarkMode ? 'border-blue-700' : 'border-blue-300'
        };
      case 'live':
        return {
          text: 'Davam edir',
          emoji: '🔴',
          bgColor: isDarkMode ? 'bg-red-900/20' : 'bg-red-100',
          textColor: isDarkMode ? 'text-red-300' : 'text-red-700',
          borderColor: isDarkMode ? 'border-red-700' : 'border-red-300'
        };
      case 'completed':
        return {
          text: 'Bitib',
          emoji: '✅',
          bgColor: isDarkMode ? 'bg-green-900/20' : 'bg-green-100',
          textColor: isDarkMode ? 'text-green-300' : 'text-green-700',
          borderColor: isDarkMode ? 'border-green-700' : 'border-green-300'
        };
    }
  };

  // Enhanced emoji selection based on module type
  const getModuleEmoji = (moduleId: string): string => {
    const emojiMap: Record<string, string> = {
      'M1': '🚗', 'M2': '⚙️', 'M3': '🛣️', 'M4': '🚦', 'M5': '🏁',
      'M6': '🚸', 'M7': '🌧️', 'M8': '🏔️', 'M9': '🌃', 'M10': '⛑️',
      'M11': '🚨', 'M12': '🔧', 'M13': '🛡️', 'M14': '🌍', 'M15': '🚌',
      'M16': '🚜', 'M17': '🏍️', 'M18': '♿', 'M19': '📋', 'M20': '🎯',
      'QA': '❓', 'default': '📚'
    };
    return emojiMap[moduleId] || emojiMap['default'];
  };

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
        <div className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm font-extrabold flex items-center gap-2`}>
          <span>🎯</span>
          <span>{t.upcomingLessons}</span>
        </div>
        {upcoming.map((l, idx) => {
          const d = new Date(l.date);
          const status = getLessonStatus(l);
          const statusDisplay = getStatusDisplay(status);
          const moduleEmoji = getModuleEmoji(l.moduleId);
          
          return (
            <div
              key={l.id}
              className={`rounded-2xl border-2 p-4 shadow-lg transition-all duration-200 hover:shadow-xl cursor-pointer ${
                status === 'live' 
                  ? `${isDarkMode ? 'bg-red-900/20 border-red-600' : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-400'}`
                  : `${isDarkMode ? 'bg-emerald-900/10 border-emerald-700' : 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-300'}`
              }`}
              onClick={() => { setSelectedLesson(l); setSelectedSource('upcoming'); }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md ${
                  isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}>
                  {moduleEmoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className={`text-base font-black leading-tight mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {truncate(l.title, 64)}
                      </div>
                      
                      {/* Enhanced date/time display */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">📅</span>
                          <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {d.toLocaleDateString('az-AZ', { weekday: 'long', day: 'numeric', month: 'long' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🕐</span>
                          <span className={`text-lg font-extrabold ${
                            status === 'live' 
                              ? 'text-red-600 animate-pulse' 
                              : isDarkMode ? 'text-emerald-400' : 'text-emerald-700'
                          }`}>
                            {d.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <span className="text-base">👨‍🏫</span>
                          <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {l.instructor}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-base">⏱️</span>
                          <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {l.durationMin} dəqiqə
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status badge */}
                    <div className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 ${statusDisplay.bgColor} ${statusDisplay.borderColor} border`}>
                      <span className="text-sm">{statusDisplay.emoji}</span>
                      <span className={`text-xs font-bold ${statusDisplay.textColor}`}>
                        {statusDisplay.text}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action button */}
                  <div className="mt-3">
                    {status === 'live' ? (
                      <button
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap shadow-lg animate-pulse ${
                          isDarkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                        onClick={(e) => { e.stopPropagation(); alert('Qoşulma linki (demo)'); }}
                      >
                        🔴 İndi Qoşul
                      </button>
                    ) : status === 'scheduled' ? (
                      <button
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap shadow ${
                          isDarkMode ? 'bg-emerald-700 text-emerald-100 hover:bg-emerald-600' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                        onClick={(e) => { e.stopPropagation(); alert('Qoşulma linki (demo)'); }}
                      >
                        Qoşul
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Schedule */}
      <div className="mt-6">
        <div className={`text-sm font-extrabold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          <span>📚</span>
          <span>{t.classSchedule}</span>
        </div>
        <div className="space-y-4">
          {groupedByDay.map(([dayLabel, items]) => (
            <div key={dayLabel} className="space-y-2">
              <div className={`sticky top-0 z-10 -mx-3 px-4 py-2 text-xs font-extrabold tracking-wide flex items-center gap-2 ${
                isDarkMode ? 'bg-gray-800/95 text-gray-200 border-b border-gray-700' : 'bg-white/95 text-gray-700 border-b border-gray-200'
              } backdrop-blur-sm`}>
                <span>📆</span>
                <span>{dayLabel}</span>
              </div>
              {items.map((l) => {
                const d = new Date(l.date);
                const status = getLessonStatus(l);
                const statusDisplay = getStatusDisplay(status);
                const moduleEmoji = getModuleEmoji(l.moduleId);
                
                return (
                  <div
                    key={l.id}
                    className={`rounded-xl border p-4 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer ${
                      status === 'completed'
                        ? `${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-300'}`
                        : `${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`
                    }`}
                    onClick={() => { setSelectedLesson(l); setSelectedSource('schedule'); }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm ${
                        status === 'completed'
                          ? `${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`
                          : `${isDarkMode ? 'bg-gray-700' : 'bg-gray-50 border border-gray-200'}`
                      }`}>
                        {moduleEmoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className={`text-sm font-extrabold truncate mb-1 ${
                              status === 'completed'
                                ? `${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`
                                : `${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`
                            }`}>
                              {truncate(l.title, 48)}
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                              <div className="flex items-center gap-1">
                                <span className="text-sm">🕐</span>
                                <span className={`text-xs font-semibold ${
                                  status === 'live'
                                    ? 'text-red-600 animate-pulse'
                                    : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                  {d.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-sm">👨‍🏫</span>
                                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {l.instructor}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-sm">⏱️</span>
                                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {l.durationMin} dəq
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Status badge */}
                          <div className={`px-2.5 py-1 rounded-full flex items-center gap-1 ${statusDisplay.bgColor} ${statusDisplay.borderColor} border`}>
                            <span className="text-xs">{statusDisplay.emoji}</span>
                            <span className={`text-[10px] font-bold ${statusDisplay.textColor}`}>
                              {statusDisplay.text}
                            </span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setSelectedLesson(null); setSelectedSource(null); }} />
          <div className={`relative z-10 w-[92%] max-w-md rounded-3xl p-6 shadow-2xl border-2 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            {(() => {
              const status = getLessonStatus(selectedLesson);
              const statusDisplay = getStatusDisplay(status);
              const moduleEmoji = getModuleEmoji(selectedLesson.moduleId);
              const d = new Date(selectedLesson.date);
              
              return (
                <>
                  {/* Header with emoji and status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg ${
                        isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'
                      }`}>
                        {moduleEmoji}
                      </div>
                      <div className="flex-1">
                        <div className={`text-lg font-black mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                          {selectedLesson.title}
                        </div>
                        <div className={`px-3 py-1 rounded-full inline-flex items-center gap-1.5 ${statusDisplay.bgColor} ${statusDisplay.borderColor} border`}>
                          <span className="text-sm">{statusDisplay.emoji}</span>
                          <span className={`text-xs font-bold ${statusDisplay.textColor}`}>
                            {statusDisplay.text}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Close button */}
                    <button
                      onClick={() => { setSelectedLesson(null); setSelectedSource(null); }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      ✕
                    </button>
                  </div>
                  
                  {/* Lesson details */}
                  <div className={`rounded-2xl p-4 mb-4 ${
                    isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📅</span>
                        <div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tarix</div>
                          <div className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {d.toLocaleDateString('az-AZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🕐</span>
                        <div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Vaxt</div>
                          <div className={`text-lg font-extrabold ${
                            status === 'live' 
                              ? 'text-red-600 animate-pulse' 
                              : isDarkMode ? 'text-emerald-400' : 'text-emerald-700'
                          }`}>
                            {d.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">👨‍🏫</span>
                        <div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Müəllim</div>
                          <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {selectedLesson.instructor}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">⏱️</span>
                        <div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Müddət</div>
                          <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {selectedLesson.durationMin} dəqiqə
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  {selectedSource === 'upcoming' && status !== 'completed' ? (
                    <div className="flex items-center justify-center">
                      {status === 'live' ? (
                        <button
                          onClick={() => alert('Qoşulma linki (demo)')}
                          className="px-6 py-3 rounded-xl font-bold shadow-lg animate-pulse bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                        >
                          <span className="text-lg">🔴</span>
                          <span>İndi Qoşul</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => alert('Qoşulma linki (demo)')}
                          className="px-6 py-3 rounded-xl font-bold shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                        >
                          <span>Qoşul</span>
                        </button>
                      )}
                    </div>
                  ) : status === 'completed' ? (
                    <div className={`text-center py-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="text-2xl">✅</span>
                      <p className="text-sm mt-1">Bu dərs artıq tamamlanıb</p>
                    </div>
                  ) : null}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

