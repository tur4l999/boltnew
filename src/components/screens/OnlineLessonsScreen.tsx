import React, { useMemo, useState } from 'react';
import { Bell, Calendar, Clock, User, X, ArrowLeft, Sparkles, Video } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { MODULES } from '../../lib/data';

type LessonStatus = 'scheduled' | 'ongoing' | 'completed' | 'cancelled';

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
  const [showCourseDetailsPopup, setShowCourseDetailsPopup] = useState<LessonItem | null>(null);

  const truncate = (text: string, max: number): string => {
    if (!text) return '';
    return text.length > max ? text.slice(0, Math.max(0, max - 1)) + '…' : text;
  };

  const getTitleFor = (moduleId: string): string => {
    return MODULES.find(m => m.id === moduleId)?.title || moduleId;
  };

  const getLessonStatus = (lesson: LessonItem): LessonStatus | null => {
    if (lesson.status) {
      return lesson.status;
    }
    
    const now = new Date();
    const date = new Date(lesson.date);
    const endTime = new Date(date.getTime() + 60 * 60 * 1000);
    
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
          label: 'Planlaşdırılıb',
          bgColor: isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50',
          borderColor: isDarkMode ? 'border-blue-500/30' : 'border-blue-200',
          textColor: isDarkMode ? 'text-blue-400' : 'text-blue-700',
          gradientFrom: 'from-blue-500',
          gradientTo: 'to-blue-600',
          icon: '⏰'
        };
      case 'ongoing':
        return {
          label: 'Canlı Yayım',
          bgColor: isDarkMode ? 'bg-green-500/10' : 'bg-green-50',
          borderColor: isDarkMode ? 'border-green-500/30' : 'border-green-200',
          textColor: isDarkMode ? 'text-green-400' : 'text-green-700',
          gradientFrom: 'from-green-500',
          gradientTo: 'to-emerald-600',
          icon: '🔴'
        };
      case 'completed':
        return {
          label: 'Başa Çatıb',
          bgColor: isDarkMode ? 'bg-gray-500/10' : 'bg-gray-100',
          borderColor: isDarkMode ? 'border-gray-500/30' : 'border-gray-300',
          textColor: isDarkMode ? 'text-gray-400' : 'text-gray-600',
          gradientFrom: 'from-gray-500',
          gradientTo: 'to-gray-600',
          icon: '✅'
        };
      case 'cancelled':
        return {
          label: 'Ləğv Edilib',
          bgColor: isDarkMode ? 'bg-red-500/10' : 'bg-red-50',
          borderColor: isDarkMode ? 'border-red-500/30' : 'border-red-200',
          textColor: isDarkMode ? 'text-red-400' : 'text-red-700',
          gradientFrom: 'from-red-500',
          gradientTo: 'to-red-600',
          icon: '🚫'
        };
    }
  };


  const formatDateTime = (d: Date): string => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = String(d.getFullYear()).slice(-2);
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${dd}.${mm}.${yy} ${hh}:${min}`;
  };

  const formatDateTimeModern = (d: Date): { date: string; time: string; month: string; year: string; weekday: string } => {
    const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
    const weekdays = ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'];
    const dd = d.getDate();
    const month = months[d.getMonth()];
    const weekday = weekdays[d.getDay()];
    const year = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return {
      date: `${dd}`,
      time: `${hh}:${min}`,
      month: month,
      year: `${year}`,
      weekday: weekday
    };
  };

  const getAzWeekdayShort = (d: Date): string => {
    const map = ['B.', 'B.e', 'Ç.a', 'Ç.', 'C.a', 'C.', 'Ş.'];
    return map[d.getDay()] || '';
  };

  const lessons: LessonItem[] = useMemo(() => [
    { id: 'l1', moduleId: 'M3',  title: getTitleFor('M3'),  instructor: 'Ə.Talıbov',  date: new Date(Date.now() + 2  * 60 * 60 * 1000).toISOString(),  durationMin: 60, status: 'scheduled' },
    { id: 'l5', moduleId: 'QA',  title: 'Sual-Cavab Sessiyası',      instructor: 'Moderator',   date: new Date(Date.now() + 5  * 60 * 60 * 1000).toISOString(),  durationMin: 45, status: 'ongoing' },
    { id: 'l2', moduleId: 'M13', title: getTitleFor('M13'), instructor: 'R.Məmmədov', date: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(), durationMin: 75, status: 'completed' },
    { id: 'l3', moduleId: 'M10', title: getTitleFor('M10'), instructor: 'Ə.Talıbov',  date: new Date(Date.now() + 50 * 60 * 60 * 1000).toISOString(), durationMin: 50, status: 'cancelled' },
    { id: 'l4', moduleId: 'M12', title: getTitleFor('M12'), instructor: 'N.Quliyev',  date: new Date(Date.now() + 3  * 24 * 60 * 60 * 1000).toISOString(), durationMin: 55, status: 'scheduled' },
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

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Modern Header with Gradient */}
      <div className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-800' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={goBack}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {t.home}
              </button>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
                  <Video className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h1 className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {t.onlineLesson}
                  </h1>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Canlı və ya planlaşdırılmış dərslər
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {/* Yaxınlaşan Dərslər - Premium Style */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gradient-to-br from-orange-500/20 to-red-500/20' : 'bg-gradient-to-br from-orange-50 to-red-50'}`}>
              <Sparkles className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
            <div>
              <h2 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Yaxınlaşan Dərslər
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Ən yaxın 2 dərs
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-5">
            {upcoming.map((l, idx) => {
              const d = new Date(l.date);
              const dateInfo = formatDateTimeModern(d);
              const status = getLessonStatus(l);
              const statusInfo = getStatusInfo(status);
              
              return (
                <div
                  key={l.id}
                  className={`group relative overflow-hidden rounded-3xl border-2 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] ${
                    status === 'ongoing'
                      ? isDarkMode 
                        ? 'bg-gradient-to-br from-green-900/20 via-gray-800 to-gray-800 border-green-500/50' 
                        : 'bg-gradient-to-br from-green-50 via-white to-white border-green-300'
                      : isDarkMode 
                        ? 'bg-gradient-to-br from-gray-800 via-gray-800/95 to-gray-800/90 border-gray-700' 
                        : 'bg-gradient-to-br from-white via-white to-gray-50 border-gray-200'
                  }`}
                  onClick={() => { setSelectedLesson(l); setSelectedSource('upcoming'); }}
                >
                  {/* Animated gradient border for ongoing */}
                  {status === 'ongoing' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 animate-pulse"></div>
                  )}
                  
                  {/* Decorative corner accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30 ${
                    status === 'ongoing' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  
                  <div className="relative p-6">
                    <div className="flex gap-5">
                      {/* Date Card - Modern Design */}
                      <div className={`relative flex flex-col items-center justify-center rounded-2xl px-5 py-4 min-w-[90px] ${
                        status === 'ongoing'
                          ? isDarkMode 
                            ? 'bg-gradient-to-br from-green-600 to-emerald-700 shadow-lg shadow-green-900/50' 
                            : 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30'
                          : isDarkMode 
                            ? 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-900/50' 
                            : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30'
                      }`}>
                        <div className="text-4xl font-black text-white mb-1">
                          {dateInfo.date}
                        </div>
                        <div className="text-xs font-bold text-white/80 uppercase tracking-wider">
                          {dateInfo.month.slice(0, 3)}
                        </div>
                        <div className="mt-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                          <div className={`text-sm font-bold text-white flex items-center gap-1`}>
                            <Clock className="w-3.5 h-3.5" />
                            {dateInfo.time}
                          </div>
                        </div>
                        {status === 'ongoing' && (
                          <div className="absolute -top-1 -right-1">
                            <span className="relative flex h-4 w-4">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className={`text-xl font-black leading-tight mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {truncate(l.title, 50)}
                            </h3>
                            
                            <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
                              <div className="flex items-center gap-1.5">
                                <User className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                <span className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {l.instructor}
                                </span>
                              </div>
                              <span className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                              <div className="flex items-center gap-1.5">
                                <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {l.durationMin} dəqiqə
                                </span>
                              </div>
                            </div>
                            
                            {/* Status Badge - Premium */}
                            {statusInfo && (
                              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 ${
                                statusInfo.bgColor} ${statusInfo.borderColor} ${statusInfo.textColor} font-bold text-sm backdrop-blur-sm`}>
                                <span className="text-base">{statusInfo.icon}</span>
                                <span>{statusInfo.label}</span>
                                {status === 'ongoing' && (
                                  <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-current"></span>
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 mt-4">
                          {status !== 'completed' && status !== 'cancelled' && (
                            <button
                              className={`flex-1 px-5 py-3 rounded-xl font-bold text-sm shadow-lg transition-all duration-300 transform hover:scale-105 ${
                                status === 'ongoing'
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-green-500/50'
                                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-blue-500/50'
                              }`}
                              onClick={(e) => { e.stopPropagation(); setShowCourseDetailsPopup(l); }}
                            >
                              {status === 'ongoing' ? (
                                <span className="flex items-center justify-center gap-2">
                                  <Video className="w-4 h-4" />
                                  Canlı Dərsə Qoşul
                                </span>
                              ) : (
                                <span className="flex items-center justify-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  Ətraflı Bax
                                </span>
                              )}
                            </button>
                          )}
                          
                          <button
                            className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                              notificationLessons.has(l.id)
                                ? isDarkMode
                                  ? 'bg-green-600 text-white shadow-lg shadow-green-900/50'
                                  : 'bg-green-500 text-white shadow-lg shadow-green-500/30'
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dərs Cədvəli - Clean Modern Grid */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' : 'bg-gradient-to-br from-purple-50 to-pink-50'}`}>
              <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <div>
              <h2 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Dərs Cədvəli
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Bütün planlaşdırılmış dərslər
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            {groupedByDay.map(([dayLabel, items]) => (
              <div key={dayLabel}>
                <div className={`sticky top-20 z-30 -mx-4 px-6 py-3 mb-4 backdrop-blur-xl border-y transition-all ${
                  isDarkMode 
                    ? 'bg-gray-900/90 border-gray-800' 
                    : 'bg-white/90 border-gray-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-6 rounded-full ${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
                    <span className={`text-sm font-black uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {dayLabel}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {items.map((l) => {
                    const d = new Date(l.date);
                    const dateInfo = formatDateTimeModern(d);
                    const status = getLessonStatus(l);
                    const statusInfo = getStatusInfo(status);
                    
                    return (
                      <div
                        key={l.id}
                        className={`group relative rounded-2xl border-2 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                          isDarkMode 
                            ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600 hover:bg-gray-800' 
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => { setSelectedLesson(l); setSelectedSource('schedule'); }}
                      >
                        <div className="p-5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <div className="flex-1 min-w-0">
                                <h4 className={`text-base font-bold truncate mb-1.5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {truncate(l.title, 45)}
                                </h4>
                                <div className="flex flex-wrap items-center gap-3 text-xs">
                                  <div className="flex items-center gap-1">
                                    <Clock className={`w-3.5 h-3.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <span className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                      {dateInfo.time}
                                    </span>
                                  </div>
                                  <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>•</span>
                                  <div className="flex items-center gap-1">
                                    <User className={`w-3.5 h-3.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                      {l.instructor}
                                    </span>
                                  </div>
                                  <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>•</span>
                                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {l.durationMin} dəq
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Status */}
                            {statusInfo && (
                              <div className={`px-3 py-1.5 rounded-lg border ${
                                statusInfo.bgColor} ${statusInfo.textColor} ${statusInfo.borderColor} font-bold text-xs flex items-center gap-1.5 flex-shrink-0`}>
                                <span>{statusInfo.icon}</span>
                                <span className="hidden sm:inline">{statusInfo.label}</span>
                              </div>
                            )}
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
      </div>

      {/* Selected Lesson Modal - Legacy (kept for compatibility) */}
      {selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => { setSelectedLesson(null); setSelectedSource(null); }} />
          <div className={`relative z-10 w-full max-w-lg rounded-3xl shadow-2xl border-2 overflow-hidden animate-in zoom-in-95 duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            {/* Header */}
            <div className={`p-6 pb-4 ${
              isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-gray-50 to-white'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`text-2xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedLesson.title}
                  </h3>
                  {(() => {
                    const modalStatusInfo = getStatusInfo(getLessonStatus(selectedLesson));
                    return modalStatusInfo ? (
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border ${
                        modalStatusInfo.bgColor} ${modalStatusInfo.textColor} ${modalStatusInfo.borderColor}`}>
                        <span>{modalStatusInfo.icon}</span>
                        <span>{modalStatusInfo.label}</span>
                      </div>
                    ) : null;
                  })()}
                </div>
                <button
                  onClick={() => { setSelectedLesson(null); setSelectedSource(null); }}
                  className={`p-2 rounded-xl transition-all ${
                    isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 pt-3 space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <div className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Tarix və Saat
                    </div>
                    <div className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formatDateTimeModern(new Date(selectedLesson.date)).date} {formatDateTimeModern(new Date(selectedLesson.date)).month}, {formatDateTimeModern(new Date(selectedLesson.date)).time}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <User className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                  <div>
                    <div className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Müəllim
                    </div>
                    <div className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedLesson.instructor}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <Clock className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                  <div>
                    <div className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Müddət
                    </div>
                    <div className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedLesson.durationMin} dəqiqə
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className={`p-6 pt-2 space-y-3 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              {selectedSource === 'upcoming' && getLessonStatus(selectedLesson) !== 'completed' && (
                <button
                  onClick={() => alert('Qoşulma linki (demo)')}
                  className={`w-full px-6 py-4 rounded-2xl font-bold text-base shadow-lg transition-all duration-200 ${
                    getLessonStatus(selectedLesson) === 'ongoing'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                  }`}
                >
                  {getLessonStatus(selectedLesson) === 'ongoing' ? (
                    <span className="flex items-center justify-center gap-2">
                      <Video className="w-5 h-5" />
                      Canlı Dərsə Qoşul
                    </span>
                  ) : (
                    '📅 Dərsə Qoşul'
                  )}
                </button>
              )}
              <button
                onClick={() => { setSelectedLesson(null); setSelectedSource(null); }}
                className={`w-full px-6 py-3 rounded-2xl font-bold text-base border-2 transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Popup - Premium Design */}
      {showNotificationPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowNotificationPopup(null)} />
          <div className={`relative z-10 w-full max-w-sm rounded-3xl shadow-2xl border-2 overflow-hidden animate-in zoom-in-95 duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className={`p-6 ${
              isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-gray-50 to-white'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  isDarkMode ? 'bg-gradient-to-br from-green-600 to-emerald-700' : 'bg-gradient-to-br from-green-500 to-emerald-600'
                }`}>
                  <Bell className="w-7 h-7 text-white" />
                </div>
                <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Bildiriş Ayarları
                </h3>
              </div>
              
              <p className={`text-sm mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Dərs başlama vaxtına yaxın sizə bildiriş göndəriləcək. Bildirişləri aktivləşdirmək istəyirsiniz?
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (showNotificationPopup) {
                      setNotificationLessons(prev => new Set(prev).add(showNotificationPopup.lessonId));
                    }
                    setShowNotificationPopup(null);
                  }}
                  className={`flex-1 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 shadow-green-900/50'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-green-500/30'
                  }`}
                >
                  Aktivləşdir
                </button>
                <button
                  onClick={() => setShowNotificationPopup(null)}
                  className={`flex-1 px-5 py-3 rounded-xl font-bold text-sm border-2 transition-all duration-200 ${
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

      {/* Course Details Popup - Ultra Premium */}
      {showCourseDetailsPopup && (() => {
        const courseStatus = getLessonStatus(showCourseDetailsPopup);
        const courseStatusInfo = getStatusInfo(courseStatus);
        
        const getNotificationMessage = (status: LessonStatus | null) => {
          switch (status) {
            case 'scheduled':
              return 'Dərs planlaşdırılıb. Başlama vaxtı yaxınlaşdıqda sizə bildiriş göndəriləcək.';
            case 'ongoing':
              return 'Dərs hazırda canlı yayımdadır! İndi qoşularaq iştirak edə bilərsiniz.';
            case 'completed':
              return 'Dərs artıq başa çatıb. Növbəti dərslərdə görüşənədək!';
            case 'cancelled':
              return 'Dərs ləğv edilib. Təəssüf ki, bu dərsə qoşula bilməzsiniz.';
            default:
              return 'Dərs haqqında məlumat əldə edilə bilmədi.';
          }
        };
        
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowCourseDetailsPopup(null)} />
            <div className={`relative z-10 w-full max-w-lg rounded-3xl shadow-2xl border-2 overflow-hidden animate-in zoom-in-95 duration-300 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              {/* Header with Gradient */}
              <div className={`relative p-8 pb-6 ${
                courseStatus === 'ongoing'
                  ? isDarkMode 
                    ? 'bg-gradient-to-br from-green-900/40 via-gray-800 to-gray-800' 
                    : 'bg-gradient-to-br from-green-50 via-blue-50 to-white'
                  : isDarkMode 
                    ? 'bg-gradient-to-br from-blue-900/40 via-gray-800 to-gray-800' 
                    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-white'
              }`}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-blue-500 to-purple-500"></div>
                
                <div className="relative flex items-start justify-between mb-4">
                  <div className="flex-1 pr-4">
                    <h3 className={`text-2xl font-black leading-tight mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {showCourseDetailsPopup.title}
                    </h3>
                    {courseStatusInfo && (
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border-2 ${
                        courseStatusInfo.bgColor} ${courseStatusInfo.textColor} ${courseStatusInfo.borderColor} backdrop-blur-sm`}>
                        <span className="text-base">{courseStatusInfo.icon}</span>
                        <span>{courseStatusInfo.label}</span>
                        {courseStatus === 'ongoing' && (
                          <span className="relative flex h-2.5 w-2.5 ml-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-current"></span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setShowCourseDetailsPopup(null)}
                    className={`p-2.5 rounded-xl transition-all ${
                      isDarkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-5">
                {/* Information Cards */}
                <div className={`p-5 rounded-2xl space-y-4 ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                  <h4 className={`text-sm font-black uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Dərs Məlumatları
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
                      }`}>
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Tarix və Saat
                        </div>
                        <div className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {formatDateTimeModern(new Date(showCourseDetailsPopup.date)).date} {formatDateTimeModern(new Date(showCourseDetailsPopup.date)).month}, {formatDateTimeModern(new Date(showCourseDetailsPopup.date)).time}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        isDarkMode ? 'bg-purple-600' : 'bg-purple-500'
                      }`}>
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Müəllim
                        </div>
                        <div className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {showCourseDetailsPopup.instructor}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        isDarkMode ? 'bg-green-600' : 'bg-green-500'
                      }`}>
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Müddət
                        </div>
                        <div className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {showCourseDetailsPopup.durationMin} dəqiqə
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Status Notification */}
                <div className={`p-5 rounded-2xl border-2 ${
                  courseStatus === 'scheduled' 
                    ? isDarkMode ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                    : courseStatus === 'ongoing'
                    ? isDarkMode ? 'bg-green-500/10 border-green-500/30' : 'bg-green-50 border-green-200'
                    : courseStatus === 'completed'
                    ? isDarkMode ? 'bg-gray-500/10 border-gray-500/30' : 'bg-gray-100 border-gray-300'
                    : courseStatus === 'cancelled'
                    ? isDarkMode ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200'
                    : isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      courseStatus === 'scheduled' 
                        ? 'bg-blue-500'
                        : courseStatus === 'ongoing'
                        ? 'bg-green-500'
                        : courseStatus === 'completed'
                        ? 'bg-gray-500'
                        : courseStatus === 'cancelled'
                        ? 'bg-red-500'
                        : 'bg-gray-500'
                    }`}>
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-black mb-2 ${
                        courseStatus === 'scheduled'
                          ? isDarkMode ? 'text-blue-400' : 'text-blue-700'
                          : courseStatus === 'ongoing'
                          ? isDarkMode ? 'text-green-400' : 'text-green-700'
                          : courseStatus === 'completed'
                          ? isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          : courseStatus === 'cancelled'
                          ? isDarkMode ? 'text-red-400' : 'text-red-700'
                          : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Bildiriş
                      </h4>
                      <p className={`text-sm leading-relaxed ${
                        courseStatus === 'scheduled'
                          ? isDarkMode ? 'text-blue-300' : 'text-blue-600'
                          : courseStatus === 'ongoing'
                          ? isDarkMode ? 'text-green-300' : 'text-green-600'
                          : courseStatus === 'completed'
                          ? isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          : courseStatus === 'cancelled'
                          ? isDarkMode ? 'text-red-300' : 'text-red-600'
                          : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {getNotificationMessage(courseStatus)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className={`p-6 pt-3 space-y-3 ${
                isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
              }`}>
                {courseStatus === 'ongoing' && (
                  <button
                    onClick={() => {
                      alert('Qoşulma linki (demo)');
                      setShowCourseDetailsPopup(null);
                    }}
                    className="w-full px-6 py-4 rounded-2xl font-bold text-base shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-green-500/50"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Video className="w-5 h-5" />
                      Canlı Dərsə Qoşul
                    </span>
                  </button>
                )}
                {courseStatus === 'scheduled' && (
                  <button
                    onClick={() => {
                      setNotificationLessons(prev => new Set(prev).add(showCourseDetailsPopup.id));
                      alert('Bildiriş aktivləşdirildi!');
                      setShowCourseDetailsPopup(null);
                    }}
                    className={`w-full px-6 py-4 rounded-2xl font-bold text-base shadow-xl transition-all duration-300 transform hover:scale-105 ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-900/50'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-blue-500/30'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Bell className="w-5 h-5" />
                      Bildiriş Aktivləşdir
                    </span>
                  </button>
                )}
                <button
                  onClick={() => setShowCourseDetailsPopup(null)}
                  className={`w-full px-6 py-3.5 rounded-2xl font-bold text-base border-2 transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Bağla
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
