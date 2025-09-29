import React, { useMemo, useState } from 'react';
import { Bell } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { MODULES } from '../../lib/data';

type LessonStatus = 'scheduled' | 'ongoing' | 'completed';

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
  const [notificationLessons, setNotificationLessons] = useState<Set<string>>(new Set());
  const [showNotificationPopup, setShowNotificationPopup] = useState<{ lessonId: string; show: boolean } | null>(null);
  // Scheduling visuals removed per requirements

  const truncate = (text: string, max: number): string => {
    if (!text) return '';
    return text.length > max ? text.slice(0, Math.max(0, max - 1)) + '…' : text;
  };

  const getTitleFor = (moduleId: string): string => {
    return MODULES.find(m => m.id === moduleId)?.title || moduleId;
  };

  const getLessonStatus = (lessonDate: string): LessonStatus | null => {
    const now = new Date();
    const date = new Date(lessonDate);
    const endTime = new Date(date.getTime() + 60 * 60 * 1000); // Dərs bitməsi (1 saat sonra)
    
    // Yalnız bu günün tarixi üçün status göstərilir
    const today = new Date();
    if (date.toDateString() !== today.toDateString()) {
      return null;
    }
    
    if (now < date) return 'scheduled';
    if (now >= date && now <= endTime) return 'ongoing';
    return 'completed';
  };

  const getStatusInfo = (status: LessonStatus | null) => {
    if (!status) return null;
    
    switch (status) {
      case 'scheduled':
        return {
          label: 'Başlayacaq',
          bgColor: isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50',
          borderColor: isDarkMode ? 'border-blue-700' : 'border-blue-200',
          textColor: isDarkMode ? 'text-blue-400' : 'text-blue-700',
          dotColor: isDarkMode ? 'bg-blue-500' : 'bg-blue-500',
          icon: '⏰'
        };
      case 'ongoing':
        return {
          label: 'Davam edir',
          bgColor: isDarkMode ? 'bg-green-900/20' : 'bg-green-50',
          borderColor: isDarkMode ? 'border-green-700' : 'border-green-200',
          textColor: isDarkMode ? 'text-green-400' : 'text-green-700',
          dotColor: isDarkMode ? 'bg-green-500' : 'bg-green-500',
          icon: '🔴'
        };
      case 'completed':
        return {
          label: 'Bitib',
          bgColor: isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100',
          borderColor: isDarkMode ? 'border-gray-700' : 'border-gray-300',
          textColor: isDarkMode ? 'text-gray-400' : 'text-gray-600',
          dotColor: isDarkMode ? 'bg-gray-500' : 'bg-gray-400',
          icon: '✅'
        };
    }
  };

  const getLessonEmoji = (moduleId: string): string => {
    const emojiMap: { [key: string]: string } = {
      'M1': '📚', 'M2': '🔍', 'M3': '🧮', 'M4': '📊', 
      'M5': '🎯', 'M6': '💡', 'M7': '🔬', 'M8': '🎨',
      'M9': '🏗️', 'M10': '📈', 'M11': '🌟', 'M12': '🏆',
      'M13': '🚀', 'M14': '💼', 'M15': '🌐', 'QA': '❓'
    };
    return emojiMap[moduleId] || '📖';
  };

  const formatDateTime = (d: Date): string => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = String(d.getFullYear()).slice(-2);
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${dd}.${mm}.${yy} ${hh}:${min}`;
  };

  const formatDateTimeModern = (d: Date): { date: string; time: string; month: string } => {
    const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn', 'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek'];
    const dd = d.getDate();
    const month = months[d.getMonth()];
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return {
      date: `${dd}`,
      time: `${hh}:${min}`,
      month: month
    };
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
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <div className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-base font-extrabold`}>Yaxınlaşan Dərslər</div>
        </div>
        {upcoming.map((l, idx) => {
          const d = new Date(l.date);
          const dateInfo = formatDateTimeModern(d);
          const status = getLessonStatus(l.date);
          const statusInfo = getStatusInfo(status);
          const emoji = getLessonEmoji(l.moduleId);
          
          return (
            <div
              key={l.id}
              className={`relative overflow-hidden rounded-2xl border shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
                status === 'ongoing' && statusInfo
                  ? `${statusInfo.bgColor} ${statusInfo.borderColor} border-2` 
                  : isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
              }`}
              onClick={() => { setSelectedLesson(l); setSelectedSource('upcoming'); }}
            >
              {status === 'ongoing' && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-green-400 to-green-500 animate-pulse"></div>
              )}
              
              <div className="flex flex-col h-full">
                {/* Top Section */}
                <div className="p-5 pb-3">
                  <div className="flex items-start gap-4">
                    {/* Sol tərəf - Tarix və Saat */}
                    <div className={`flex flex-col items-center justify-center rounded-2xl px-4 py-3 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-gray-50 to-gray-100'
                    }`}>
                      <div className={`text-3xl font-black ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {dateInfo.date}
                      </div>
                      <div className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {dateInfo.month}
                      </div>
                      <div className={`mt-2 text-sm font-bold ${
                        status === 'ongoing' 
                          ? 'text-green-500' 
                          : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {dateInfo.time}
                      </div>
                    </div>
                    
                    {/* Mərkəz - Dərs məlumatları */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <div className={`text-lg font-black leading-tight mb-1 ${
                            isDarkMode ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {truncate(l.title, 50)}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-lg">👨‍🏫</span>
                            <span className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {l.instructor}
                            </span>
                            <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {l.durationMin} dəq
                            </span>
                          </div>
                          
                          {/* Status Badge */}
                          {statusInfo && (
                            <div className="mt-3 flex items-center gap-2">
                              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                                statusInfo.bgColor} ${statusInfo.borderColor} ${statusInfo.textColor} border`}>
                                <span>{statusInfo.icon}</span>
                                <span>{statusInfo.label}</span>
                                {status === 'ongoing' && (
                                  <div className="w-2 h-2 rounded-full animate-pulse bg-current"></div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Sağ tərəf - Bildiriş ikonu */}
                    <div className="flex flex-col items-end">
                      <button
                        className={`p-2 rounded-xl transition-all duration-200 ${
                          notificationLessons.has(l.id)
                            ? isDarkMode
                              ? 'bg-green-700 hover:bg-green-600 text-green-300'
                              : 'bg-green-100 hover:bg-green-200 text-green-600'
                            : isDarkMode 
                              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                        }`}
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setShowNotificationPopup({ lessonId: l.id, show: true });
                        }}
                      >
                        <Bell className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Section - Button */}
                {status !== 'completed' && (
                  <div className="px-5 pb-4 mt-auto">
                    <button
                      className={`w-full px-6 py-3 rounded-xl text-base font-bold shadow-lg transition-all duration-200 ${
                        status === 'ongoing'
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 animate-pulse'
                          : isDarkMode 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                      onClick={(e) => { e.stopPropagation(); alert('Qoşulma linki (demo)'); }}
                    >
                      {status === 'ongoing' ? '🔴 Qoşul' : '📅 Qoşul'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Schedule */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📅</span>
          <div className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-base font-extrabold`}>Dərs Cədvəli</div>
        </div>
        <div className="space-y-4">
          {groupedByDay.map(([dayLabel, items]) => (
            <div key={dayLabel} className="space-y-3">
              <div className={`sticky top-0 z-10 -mx-3 px-3 py-2 backdrop-blur-md text-sm font-extrabold tracking-wide flex items-center gap-2 ${
                isDarkMode ? 'bg-gray-900/80 text-gray-300' : 'bg-gray-50/80 text-gray-700'
              }`}>
                <span className="text-lg">📌</span>
                {dayLabel}
              </div>
              {items.map((l) => {
                const d = new Date(l.date);
                const dateInfo = formatDateTimeModern(d);
                const status = getLessonStatus(l.date);
                const statusInfo = getStatusInfo(status);
                const emoji = getLessonEmoji(l.moduleId);
                
                return (
                  <div
                    key={l.id}
                    className={`rounded-xl border shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden ${
                      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}
                    onClick={() => { setSelectedLesson(l); setSelectedSource('schedule'); }}
                  >
                    <div className="p-4">
                      <div className="flex items-center">
                        {/* Məlumatlar */}
                        <div className="flex-1 min-w-0">
                          <div className={`text-base font-bold truncate mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            {truncate(l.title, 45)}
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1">
                              <span className="text-base">⏰</span>
                              <span className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {dateInfo.time}
                              </span>
                            </div>
                            <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                            <div className="flex items-center gap-1">
                              <span className="text-base">👤</span>
                              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {l.instructor}
                              </span>
                            </div>
                            <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {l.durationMin} dəq
                            </span>
                          </div>
                        </div>
                        
                        {/* Status */}
                        {statusInfo && (
                          <div className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                            statusInfo.bgColor} ${statusInfo.textColor} ${statusInfo.borderColor} border`}>
                            <span className="text-xs">{statusInfo.icon}</span>
                            <span className="text-[10px]">{statusInfo.label}</span>
                          </div>
                        )}
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
            {/* Header */}
            <div className={`p-6 pb-4 ${
              isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-gray-50 to-white'
            }`}>
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className={`text-xl font-black mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {selectedLesson.title}
                  </h3>
                  {(() => {
                    const modalStatusInfo = getStatusInfo(getLessonStatus(selectedLesson.date));
                    return modalStatusInfo ? (
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                        modalStatusInfo.bgColor} ${modalStatusInfo.textColor} ${modalStatusInfo.borderColor} border`}>
                        <span>{modalStatusInfo.icon}</span>
                        <span>{modalStatusInfo.label}</span>
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 pt-2 space-y-4">
              {/* Tarix və Saat */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <span className="text-xl">📆</span>
                </div>
                <div>
                  <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Tarix və Saat
                  </div>
                  <div className={`text-base font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {formatDateTimeModern(new Date(selectedLesson.date)).date} {formatDateTimeModern(new Date(selectedLesson.date)).month}, {formatDateTimeModern(new Date(selectedLesson.date)).time}
                  </div>
                </div>
              </div>
              
              {/* Müəllim */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <span className="text-xl">👨‍🏫</span>
                </div>
                <div>
                  <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Müəllim
                  </div>
                  <div className={`text-base font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {selectedLesson.instructor}
                  </div>
                </div>
              </div>
              
              {/* Müddət */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <span className="text-xl">⏱️</span>
                </div>
                <div>
                  <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Müddət
                  </div>
                  <div className={`text-base font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {selectedLesson.durationMin} dəqiqə
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className={`p-6 pt-2 space-y-3 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              {selectedSource === 'upcoming' && getLessonStatus(selectedLesson.date) !== 'completed' && (
                <button
                  onClick={() => alert('Qoşulma linki (demo)')}
                  className={`w-full px-6 py-3.5 rounded-2xl font-bold text-base shadow-lg transition-all duration-200 ${
                    getLessonStatus(selectedLesson.date) === 'ongoing'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 animate-pulse'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                  }`}
                >
                  {getLessonStatus(selectedLesson.date) === 'ongoing' ? '🔴 Dərsə Qoşul' : '📅 Dərsə Qoşul'}
                </button>
              )}
              <button
                onClick={() => { setSelectedLesson(null); setSelectedSource(null); }}
                className={`w-full px-6 py-3 rounded-2xl font-bold text-base border transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Popup */}
      {showNotificationPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowNotificationPopup(null)} />
          <div className={`relative z-10 w-full max-w-sm rounded-2xl shadow-2xl border overflow-hidden ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className={`p-6 ${
              isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-gray-50 to-white'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Bell className="w-6 h-6 text-green-500" />
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Bildiriş ayarları
                </h3>
              </div>
              
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Dərs başlama zamanına yaxın sizə bildiriş göndəriləcək
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (showNotificationPopup) {
                      setNotificationLessons(prev => new Set(prev).add(showNotificationPopup.lessonId));
                    }
                    setShowNotificationPopup(null);
                  }}
                  className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  Təsdiq et
                </button>
                <button
                  onClick={() => setShowNotificationPopup(null)}
                  className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-sm border transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Ləğv et
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

