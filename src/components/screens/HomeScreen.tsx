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
    { key: 'certificate', label: 'Şəhadətnamə', action: () => navigate('CertificateApplication'), emoji: '🎓' },
    { key: 'practiceLab', label: t.drivingPractice, action: () => navigate('DrivingPractice'), emoji: '🚗' },
    { key: 'appeals', label: 'Apellyasiyalar', action: () => navigate('Appeals'), emoji: '📮' },
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
    <div className={`p-4 pb-24 min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
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
        <Card className={`mb-4 p-5 transition-all duration-300 hover:shadow-lg group ${
          isDarkMode 
            ? 'bg-gradient-to-r from-gray-800/80 to-slate-800/80 border-gray-700/50' 
            : 'bg-gradient-to-r from-white/80 to-gray-50/80 border-gray-200/50'
        } backdrop-blur-sm`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {t.progress}
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${
              isDarkMode ? 'bg-emerald-900/50 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
            }`}>
              42%
            </div>
          </div>
          <Progress value={42} className="h-2 mb-3" />
          <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.continue} → <span className={`font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>M8: Yol nişanları</span>
          </div>
        </Card>
      </FadeInUp>

      {/* Enhanced Primary Section */}
      <Card className={`mb-4 transition-all duration-300 hover:shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      } backdrop-blur-sm`}>
        <div className="flex items-center justify-between mb-4 p-1">
          <div className={`text-sm uppercase tracking-wider font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Əsas bölmələr
          </div>
          <div className={`h-px flex-1 ml-4 bg-gradient-to-r ${
            isDarkMode ? 'from-gray-700 to-transparent' : 'from-gray-300 to-transparent'
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
                    className={`rounded-2xl border-2 shadow-sm p-4 flex items-center gap-3 transition-all duration-300 min-h-[60px] transform hover:scale-[1.02] hover:shadow-lg group ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-gray-800/50 to-slate-800/50 border-gray-700/50 hover:border-gray-600 text-gray-100'
                        : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50 hover:border-gray-300 text-gray-900'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/80'
                    }`}>
                      <EmojiIcon emoji={item.emoji} size={20} />
                    </div>
                    <div className={`text-left font-bold text-sm leading-tight transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>
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
        <div className="mt-4">
          <button
            onClick={() => navigate('ExamConfig', { mode: 'simulator' })}
            className="w-full rounded-3xl p-5 flex items-center gap-4 min-h-[70px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 relative z-10">
              <EmojiIcon emoji="🧪" size={24} className="text-white" />
            </div>
            <div className="text-left font-black text-lg leading-tight relative z-10">
              {`${t.examSimulator}`}
              <div className="text-sm font-medium opacity-90">Sınaq imtahanı</div>
            </div>
            <div className="ml-auto">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm transition-transform duration-300 group-hover:translate-x-1">
                →
              </div>
            </div>
          </button>
        </div>
      </ScaleIn>

      {/* Enhanced Secondary Section */}
      {secondaryRows.length > 0 && (
        <Card className={`mt-4 transition-all duration-300 hover:shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800/80 border-gray-700/50' 
            : 'bg-white/80 border-gray-200/50'
        } backdrop-blur-sm`}>
          <div className="flex items-center justify-between mb-4 p-1">
            <div className={`text-sm uppercase tracking-wider font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Əlavə bölmələr
            </div>
            <div className={`h-px flex-1 ml-4 bg-gradient-to-r ${
              isDarkMode ? 'from-gray-700 to-transparent' : 'from-gray-300 to-transparent'
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
                      className={`rounded-2xl border-2 shadow-sm p-4 flex items-center gap-3 transition-all duration-300 min-h-[60px] transform hover:scale-[1.02] hover:shadow-lg group ${
                        isDarkMode
                          ? 'bg-gradient-to-br from-gray-800/50 to-slate-800/50 border-gray-700/50 hover:border-gray-600 text-gray-100'
                          : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50 hover:border-gray-300 text-gray-900'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 ${
                        isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/80'
                      }`}>
                        <EmojiIcon emoji={item.emoji} size={20} />
                      </div>
                      <div className={`text-left font-bold text-sm leading-tight transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-800'
                      }`}>
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
          className="w-full h-44 rounded-3xl p-6 flex flex-col justify-between mt-6 bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-700 hover:from-emerald-700 hover:via-green-600 hover:to-emerald-800 text-white font-black relative overflow-hidden transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl group"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-white/20"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
              <span className="text-white text-2xl">▶</span>
            </div>
            <div className="text-left">
              <div className="text-sm font-medium opacity-90">Video dərslik</div>
              <div className="text-lg font-black">Necə İstifadə Edilir</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="text-sm font-medium opacity-80">5 dəqiqəlik təlimat</div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg transition-transform duration-300 group-hover:translate-x-2">
              →
            </div>
          </div>
        </button>
      </ScaleIn>
    </div>
  );
}