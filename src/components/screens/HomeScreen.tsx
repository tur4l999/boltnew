/** @jsxImportSource react */
import React, { useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Progress } from '../ui/Progress';
import { FadeInUp } from '../ui/FadeInUp';
import { SlideTransition } from '../ui/SlideTransition';
import { ScaleIn } from '../ui/ScaleIn';
import { EmojiIcon } from '../ui/EmojiIcon';

export function HomeScreen() {
  const { t, navigate, hasActivePackage, isDarkMode, activatePackageNow, activePackage } = useApp();
  
  const gridItems = [
    // Əsas bölmələr (8 ədəd):
    { key: 'video3d', label: t.videoLessons, action: () => navigate('Lesson', { moduleId: 'M8', tab: 'video3d' }), emoji: '🎬' },
    { key: 'quick', label: 'Sürətli test', action: () => navigate('QuickTest', { ticket: 1 }), emoji: '📝' },
    { key: 'onlineLesson', label: t.onlineLesson, action: () => navigate('OnlineLessons'), emoji: '👨‍🏫' },
    { key: 'notes', label: t.notes, action: () => navigate('Lesson', { moduleId: 'M8', tab: 'materials' }), emoji: '🗒️' },
    { key: 'results', label: t.myResults, action: () => navigate('Results'), emoji: '📊' },
    { key: 'tests', label: t.tests, action: () => navigate('Exam', { defaultTab: 'byTickets' }), emoji: '📄' },
    { key: 'articles', label: t.articles, action: () => navigate('Rules'), emoji: '📜' },
    { key: 'signs', label: 'Nişanlar', action: () => navigate('Signs'), emoji: '🛑' },
    { key: 'fines', label: t.fines, action: () => navigate('Fines'), emoji: '💸' },

    // Əlavə bölmələr (secondary):
    { key: 'packages', label: 'Təlim paketləri', action: () => navigate('Packages'), emoji: '📦' },
    { key: 'certificate', label: 'Şəhadətnamə', action: () => alert('Şəhadətnamə (demo)'), emoji: '🎓' },
    { key: 'practiceLab', label: 'Praktiki təcrübə', action: () => alert('Praktiki təcrübə (demo)'), emoji: '🛠️' },
    { key: 'appeals', label: 'Appeliyasiya', action: () => alert('Appeliyasiyalarım (demo)'), emoji: '📮' },
    { key: 'blogs', label: 'Bloglar', action: () => navigate('Blogs'), emoji: '📰' },

    // Bölmə sonu: Yekun imtahan
    { key: 'finalExam', label: 'Yekun imtahan', action: () => navigate('ExamConfig', { mode: 'final' }), emoji: '📋' },
  ];
  
  const primaryItems = gridItems.slice(0, 8);
  const secondaryItems = gridItems.slice(8);

  function toRows(items: typeof gridItems) {
    const result = [] as typeof gridItems[];
    for (let i = 0; i < items.length; i += 2) {
      result.push(items.slice(i, i + 2));
    }
    return result;
  }

  const primaryRows = useMemo(() => toRows(primaryItems), [primaryItems]);
  const secondaryRows = useMemo(() => toRows(secondaryItems), [secondaryItems]);

  return (
    <div className={`content-padding pb-24 min-h-screen transition-all duration-300 relative overflow-hidden space-comfortable ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900/50 via-gray-900/50 to-slate-800/50' 
        : 'bg-gradient-to-br from-gray-50/50 via-white/50 to-emerald-50/30'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-emerald-500/5' : 'bg-emerald-400/10'
        }`}></div>
        <div className={`absolute bottom-20 left-10 w-32 h-32 rounded-full blur-2xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-400/10'
        }`} style={{ animationDelay: '2s' }}></div>
      </div>
      {/* Enhanced Package Status */}

      {/* Enhanced Scheduled package info */}
      {!hasActivePackage() && activePackage && new Date() < activePackage.activationDate && (
        <SlideTransition direction="down" delay={100}>
          <div className={`mb-4 p-4 rounded-2xl border-2 flex items-center gap-4 transition-all duration-300 group ${
            isDarkMode 
              ? 'bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-700/50' 
              : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200/50'
          } backdrop-blur-sm`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${
              isDarkMode ? 'bg-amber-800/50' : 'bg-amber-100/80'
            }`}>
              <span className={`text-2xl transition-colors duration-200 ${
                isDarkMode ? 'text-amber-300' : 'text-amber-600'
              }`}>⏰</span>
            </div>
            <div className="flex-1">
              <div className={`text-sm font-bold mb-1 transition-colors duration-200 ${
                isDarkMode ? 'text-amber-200' : 'text-amber-900'
              }`}>
                Paket gözləmədədir
              </div>
              <div className={`text-xs transition-colors duration-200 ${
                isDarkMode ? 'text-amber-300/80' : 'text-amber-700/80'
              }`}>
                {activePackage?.activationDate.toLocaleString('az-AZ')} tarixində aktivləşəcək
              </div>
            </div>
            <button
              onClick={() => activatePackageNow()}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                isDarkMode 
                  ? 'bg-amber-700 text-amber-100 hover:bg-amber-600' 
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              } shadow-lg hover:shadow-xl`}
            >
              İndi aktivləşdir
            </button>
          </div>
        </SlideTransition>
      )}

      {hasActivePackage() && (
        <ScaleIn delay={100}>
          <div className={`-mx-4 -mt-4 mb-4 px-4 py-4 rounded-2xl flex items-center gap-3 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-emerald-900/40 to-green-900/40 border border-emerald-700/50' 
              : 'bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/50'
          } backdrop-blur-sm`}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-emerald-800/50' : 'bg-emerald-100/80'
            }`}>
              <span className={`text-lg ${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>👑</span>
            </div>
            <div className="flex-1">
              <div className={`text-sm font-bold mb-1 ${
                isDarkMode ? 'text-emerald-200' : 'text-emerald-900'
              }`}>
                {activePackage?.name}
              </div>
              <div className={`text-xs ${
                isDarkMode ? 'text-emerald-300/80' : 'text-emerald-700/80'
              }`}>
                Bitmə: {activePackage?.expiryDate.toLocaleDateString('az-AZ')}
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              isDarkMode ? 'bg-emerald-700/50 text-emerald-200' : 'bg-emerald-200 text-emerald-800'
            }`}>
              Aktiv
            </div>
          </div>
        </ScaleIn>
      )}

      {/* Enhanced Progress Card */}
      <FadeInUp delay={200}>
        <Card 
          variant="glass" 
          padding="lg"
          className="card-comfortable group hover:scale-[1.01] transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="visual-hierarchy-3 text-comfort-primary">
              {t.progress}
            </div>
            <div className={`text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm ${
              isDarkMode ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
            }`}>
              42%
            </div>
          </div>
          <Progress value={42} className="h-3 mb-4" />
          <div className="text-sm font-medium text-comfort-secondary">
            {t.continue} → <span className={`font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} high-contrast-text`}>M8: Yol nişanları</span>
          </div>
        </Card>
      </FadeInUp>

      {/* Enhanced Primary Section */}
      <Card 
        variant="glass" 
        padding="lg"
        className="card-comfortable group hover:scale-[1.005] transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="visual-hierarchy-2 text-comfort-primary">
            Əsas bölmələr
          </div>
          <div className={`h-px flex-1 ml-4 bg-gradient-to-r ${
            isDarkMode ? 'from-gray-600/50 to-transparent' : 'from-gray-300/50 to-transparent'
          }`} />
        </div>
        <div className="space-y-3">
          {primaryRows.map((row, idx) => (
            <SlideTransition key={idx} direction="right" delay={300 + (idx * 100)}>
              <div className="grid grid-cols-2 gap-3">
                {row.map((item) => (
                  <button
                    key={item.key}
                    onClick={item.action}
                    className={`rounded-2xl border comfort-surface p-4 flex items-center gap-3 transition-all duration-300 min-h-[68px] button-press comfort-hover focus-ring group ${
                      isDarkMode
                        ? 'hover:border-gray-600/60 text-gray-100'
                        : 'hover:border-gray-300/60 text-gray-900'
                    }`}
                    aria-label={item.label}
                  >
                    <div className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                      isDarkMode ? 'bg-gray-700/40 group-hover:bg-gray-600/50' : 'bg-gray-100/70 group-hover:bg-gray-200/80'
                    } shadow-sm`}>
                      <EmojiIcon emoji={item.emoji} size={22} />
                    </div>
                    <div className="text-left visual-hierarchy-3 leading-tight text-comfort-primary flex-1">
                      {item.label}
                    </div>
                  </button>
                ))}
              </div>
            </SlideTransition>
          ))}
        </div>
      </Card>

      {/* Enhanced CTA */}
      <ScaleIn delay={500}>
        <div className="mt-6">
          <button
            onClick={() => navigate('ExamConfig', { mode: 'simulator' })}
            className="w-full rounded-3xl p-6 flex items-center gap-5 min-h-[80px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 button-press comfort-hover focus-ring group relative overflow-hidden"
            aria-label="Sınaq imtahanına başla"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10 shadow-lg">
              <EmojiIcon emoji="🧪" size={26} className="text-white" />
            </div>
            <div className="text-left font-black leading-tight relative z-10 flex-1">
              <div className="visual-hierarchy-2 text-white mb-1">
                {`${t.examSimulator}`}
              </div>
              <div className="text-sm font-medium opacity-85">Sınaq imtahanı</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center text-lg transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110 shadow-md">
                →
              </div>
              <div className="text-xs font-medium opacity-75">Başla</div>
            </div>
          </button>
        </div>
      </ScaleIn>

      {/* Enhanced Secondary Section */}
      {secondaryRows.length > 0 && (
        <Card 
          variant="glass" 
          padding="lg"
          className="card-comfortable group hover:scale-[1.005] transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="visual-hierarchy-2 text-comfort-primary">
              Əlavə bölmələr
            </div>
            <div className={`h-px flex-1 ml-4 bg-gradient-to-r ${
              isDarkMode ? 'from-gray-600/50 to-transparent' : 'from-gray-300/50 to-transparent'
            }`} />
          </div>
          <div className="space-y-3">
            {secondaryRows.map((row, idx) => (
              <SlideTransition key={idx} direction="right" delay={300 + (idx * 100)}>
                <div className="grid grid-cols-2 gap-3">
                  {row.map((item) => (
                    <button
                      key={item.key}
                      onClick={item.action}
                      className={`rounded-2xl border comfort-surface p-4 flex items-center gap-3 transition-all duration-300 min-h-[68px] button-press comfort-hover focus-ring group ${
                        isDarkMode
                          ? 'hover:border-gray-600/60 text-gray-100'
                          : 'hover:border-gray-300/60 text-gray-900'
                      }`}
                      aria-label={item.label}
                    >
                      <div className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                        isDarkMode ? 'bg-gray-700/40 group-hover:bg-gray-600/50' : 'bg-gray-100/70 group-hover:bg-gray-200/80'
                      } shadow-sm`}>
                        <EmojiIcon emoji={item.emoji} size={22} />
                      </div>
                      <div className="text-left visual-hierarchy-3 leading-tight text-comfort-primary flex-1">
                        {item.label}
                      </div>
                    </button>
                  ))}
                </div>
              </SlideTransition>
            ))}
          </div>
        </Card>
      )}

      {/* (CTA is now inserted after 3rd row) */}

      {/* Enhanced Tutorial Card */}
      <ScaleIn delay={600}>
        <button
          onClick={() => alert("Tətbiqdən Necə İstifadə Edilir")}
          className="w-full h-48 rounded-3xl p-6 flex flex-col justify-between mt-6 bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-700 hover:from-emerald-700 hover:via-green-600 hover:to-emerald-800 text-white font-black relative overflow-hidden button-press comfort-hover focus-ring shadow-xl hover:shadow-2xl group"
          aria-label="Video dərslik: Tətbiqdən necə istifadə edilir"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-white/20"></div>
          
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/25 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
              <span className="text-white text-3xl">▶</span>
            </div>
            <div className="text-left flex-1">
              <div className="text-sm font-medium opacity-85 mb-1">Video dərslik</div>
              <div className="visual-hierarchy-2 text-white leading-tight">Necə İstifadə Edilir</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="text-sm font-medium opacity-80">5 dəqiqəlik təlimat</div>
            <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center text-xl transition-transform duration-300 group-hover:translate-x-3 group-hover:scale-110 shadow-md">
              →
            </div>
          </div>
        </button>
      </ScaleIn>
    </div>
  );
}