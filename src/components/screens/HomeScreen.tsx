import React, { useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Progress } from '../ui/Progress';
import { FadeInUp } from '../ui/FadeInUp';
import { SlideTransition } from '../ui/SlideTransition';
import { ScaleIn } from '../ui/ScaleIn';

export function HomeScreen() {
  const { t, navigate, hasActivePackage, isDarkMode, activatePackageNow } = useApp();
  
  const gridItems = [
    // 1) 3D video dərs
    { key: 'video3d', label: t.videoLessons, action: () => navigate('Lesson', { moduleId: 'M8', tab: 'video3d' }), emoji: '🎬' },
    // 2) Sürətli test
    { key: 'quick', label: t.quickTest, action: () => navigate('Practice'), emoji: '📝' },
    // 3) Onlayn dərslər
    { key: 'onlineLesson', label: t.onlineLesson, action: () => navigate('OnlineLessons'), emoji: '🌐' },
    // 4) Nəticələrim
    { key: 'results', label: t.myResults, action: () => navigate('Results', { result: { score: 16, total: 20 } }), emoji: '📊' },
    // 5) Testlər
    { key: 'tests', label: t.tests, action: () => navigate('Practice'), emoji: '📄' },
    // 6) Maddələr
    { key: 'articles', label: t.articles, action: () => alert('Maddələr (demo)'), emoji: '📜' },
    // 7) Cərimələr
    { key: 'fines', label: t.fines, action: () => alert('Cərimələr (demo)'), emoji: '💸' },
    // 8) Konspektlər
    { key: 'notes', label: t.notes, action: () => navigate('Lesson', { moduleId: 'M8', tab: 'materials' }), emoji: '🗒️' },
    // 9) Yekun imtahan
    { key: 'finalExam', label: 'Yekun imtahan', action: () => navigate('ExamConfig', { mode: 'final' }), emoji: '📋' },
  ];
  
  const primaryItems = gridItems.slice(0, 6);
  const secondaryItems = gridItems.slice(6);

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
    <div className={`p-3 pb-6 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Package Status (hidden if scheduled activation exists) */}
      {!hasActivePackage() && !(useApp().activePackage && new Date() < useApp().activePackage.activationDate) && (
        <SlideTransition direction="down" delay={100}>
          <div className={`mb-3 p-3 rounded-lg border flex items-center gap-3 transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-blue-900/20 border-blue-700' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
              isDarkMode ? 'bg-blue-800' : 'bg-blue-100'
            }`}>
              <span className={`text-xs transition-colors duration-200 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-600'
              }`}>📦</span>
            </div>
            <div className="flex-1">
              <div className={`text-xs font-medium transition-colors duration-200 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-900'
              }`}>
                Aktiv paketiniz yoxdur
              </div>
            </div>
            <button
              onClick={() => navigate('Packages')}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors min-h-[24px] ${
                isDarkMode 
                  ? 'bg-blue-700 text-blue-100 hover:bg-blue-600' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Paket al
            </button>
          </div>
        </SlideTransition>
      )}

      {/* Scheduled package info */}
      {!hasActivePackage() && useApp().activePackage && new Date() < useApp().activePackage.activationDate && (
        <SlideTransition direction="down" delay={100}>
          <div className={`mb-3 p-3 rounded-lg border flex items-center gap-3 transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-amber-900/20 border-amber-700' 
              : 'bg-amber-50 border-amber-200'
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
              isDarkMode ? 'bg-amber-800' : 'bg-amber-100'
            }`}>
              <span className={`text-xs transition-colors duration-200 ${
                isDarkMode ? 'text-amber-300' : 'text-amber-600'
              }`}>⏰</span>
            </div>
            <div className="flex-1">
              <div className={`text-xs font-medium transition-colors duration-200 ${
                isDarkMode ? 'text-amber-300' : 'text-amber-900'
              }`}>
                Paket {useApp().activePackage?.activationDate.toLocaleString('az-AZ')} tarixində aktivləşəcək
              </div>
            </div>
            <button
              onClick={() => activatePackageNow()}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors min-h-[24px] ${
                isDarkMode 
                  ? 'bg-amber-700 text-amber-100 hover:bg-amber-600' 
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              İndi aktivləşdir
            </button>
          </div>
        </SlideTransition>
      )}

      {hasActivePackage() && (
        <ScaleIn delay={100}>
          <div className="-mx-3 -mt-2 mb-3 px-3 py-2 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-200 rounded-t-none flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <span className="text-emerald-600 text-[10px]">👑</span>
            </div>
            <div className="flex-1">
              <div className="text-emerald-900 text-[11px] font-medium">
                {useApp().activePackage?.name} • Bitmə: {useApp().activePackage?.expiryDate.toLocaleDateString('az-AZ')}
              </div>
            </div>
          </div>
        </ScaleIn>
      )}

      {/* Progress Card */}
      <FadeInUp delay={200}>
        <Card className="mb-3">
          <div className="text-xs text-gray-500 mb-2">{t.progress}</div>
          <Progress value={42} />
          <div className="text-xs mt-2 text-gray-700">
            {t.continue} → <span className="font-bold">M8: Yol nişanları</span>
          </div>
        </Card>
      </FadeInUp>

      {/* Primary Section */}
      <div className="space-y-2">
        <div className={`text-[11px] uppercase tracking-wide font-bold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Əsas bölmələr</div>
        {primaryRows.map((row, idx) => (
          <SlideTransition key={idx} direction="right" delay={300 + (idx * 100)}>
            <div className="grid grid-cols-2 gap-2">
              {row.map((item) => (
                <button
                  key={item.key}
                  onClick={item.action}
                  className={`rounded-xl border shadow-sm p-3 flex items-center gap-3 transition-colors min-h-[48px] ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-100'
                      : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg text-emerald-600 flex items-center justify-center text-lg transition-colors duration-200 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    {item.emoji}
                  </div>
                  <div className={`text-left font-bold text-sm leading-tight transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {item.label}
                  </div>
                </button>
              ))}
            </div>
          </SlideTransition>
        ))}
      </div>

      {/* Long CTA */}
      <ScaleIn delay={500}>
        <div className="mt-2">
          <button
            onClick={() => navigate('ExamConfig', { mode: 'simulator' })}
            className="w-full rounded-2xl p-3 flex items-center gap-3 min-h-[56px] bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-lg">
              🧪
            </div>
            <div className="text-left font-black text-base leading-tight whitespace-nowrap">
              {`${t.examSimulator} (sınaq imtahanı)`}
            </div>
          </button>
        </div>
      </ScaleIn>

      {/* Secondary Section */}
      {secondaryRows.length > 0 && (
        <div className="space-y-2 mt-3">
          <div className={`text-[11px] uppercase tracking-wide font-bold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Digər bölmələr</div>
          {secondaryRows.map((row, idx) => (
            <SlideTransition key={idx} direction="right" delay={300 + (idx * 100)}>
              <div className="grid grid-cols-2 gap-2">
                {row.map((item) => (
                  <button
                    key={item.key}
                    onClick={item.action}
                    className={`rounded-xl border shadow-sm p-3 flex items-center gap-3 transition-colors min-h-[48px] ${
                      isDarkMode
                        ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-100'
                        : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg text-emerald-600 flex items-center justify-center text-lg transition-colors duration-200 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      {item.emoji}
                    </div>
                    <div className={`text-left font-bold text-sm leading-tight transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {item.label}
                    </div>
                  </button>
                ))}
              </div>
            </SlideTransition>
          ))}
        </div>
      )}

      {/* (CTA is now inserted after 3rd row) */}

      {/* Tutorial Card (bottom) */}
      <ScaleIn delay={600}>
        <button
          onClick={() => alert("Tətbiqdən Necə İstifadə Edilir")}
          className="w-full h-36 rounded-2xl p-4 flex items-end justify-end mt-3 bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-700 text-white font-black relative overflow-hidden transform hover:scale-105 transition-transform duration-200"
        >
          <div className="absolute left-4 top-4 w-12 h-12 rounded-full bg-white/25 border border-white/35 flex items-center justify-center">
            <span className="text-white text-base">▶</span>
          </div>
          <span className="text-base">Tətbiqdən Necə İstifadə Edilir</span>
        </button>
      </ScaleIn>
    </div>
  );
}