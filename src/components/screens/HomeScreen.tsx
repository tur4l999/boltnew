/** @jsxImportSource react */
import React, { useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Progress } from '../ui/Progress';
import { FadeInUp } from '../ui/FadeInUp';
import { SlideTransition } from '../ui/SlideTransition';
import { ScaleIn } from '../ui/ScaleIn';
import { 
  VideoIcon, DocumentIcon, GlobeIcon, ChartIcon, PackageIcon, StarIcon,
  NoteIcon, FileTextIcon, DollarIcon, NewspaperIcon
} from '../icons/modern';
import {
  GraduationIcon, ToolIcon, MailIcon, ClipboardIcon, FlaskIcon, PlayIcon, ClockIcon
} from '../icons';

export function HomeScreen() {
  const { t, navigate, hasActivePackage, isDarkMode, activatePackageNow, activePackage } = useApp();
  
  const gridItems = [
    // Əsas bölmələr (8 ədəd):
    { key: 'video3d', label: t.videoLessons, action: () => navigate('Lesson', { moduleId: 'M8', tab: 'video3d' }), icon: VideoIcon },
    { key: 'quick', label: 'Sürətli test', action: () => navigate('QuickTest', { ticket: 1 }), icon: DocumentIcon },
    { key: 'onlineLesson', label: t.onlineLesson, action: () => navigate('OnlineLessons'), icon: GlobeIcon },
    { key: 'notes', label: t.notes, action: () => navigate('Lesson', { moduleId: 'M8', tab: 'materials' }), icon: NoteIcon },
    { key: 'results', label: t.myResults, action: () => navigate('Results'), icon: ChartIcon },
    { key: 'tests', label: t.tests, action: () => navigate('Practice'), icon: FileTextIcon },
    { key: 'articles', label: t.articles, action: () => navigate('Rules'), icon: NewspaperIcon },
    { key: 'fines', label: t.fines, action: () => navigate('Fines'), icon: DollarIcon },

    // Əlavə bölmələr (secondary):
    { key: 'packages', label: 'Təlim paketləri', action: () => navigate('Packages'), icon: PackageIcon },
    { key: 'certificate', label: 'Şəhadətnamə', action: () => alert('Şəhadətnamə (demo)'), icon: GraduationIcon },
    { key: 'practiceLab', label: 'Praktiki təcrübə', action: () => alert('Praktiki təcrübə (demo)'), icon: ToolIcon },
    { key: 'appeals', label: 'Appeliyasiya', action: () => alert('Appeliyasiyalarım (demo)'), icon: MailIcon },
    { key: 'blogs', label: 'Bloglar', action: () => navigate('Blogs'), icon: NewspaperIcon },

    // Bölmə sonu: Yekun imtahan
    { key: 'finalExam', label: 'Yekun imtahan', action: () => navigate('ExamConfig', { mode: 'final' }), icon: ClipboardIcon },
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
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Package Status (hidden if scheduled activation exists) */}
      {!hasActivePackage() && !(activePackage && new Date() < activePackage.activationDate) && (
        <SlideTransition direction="down" delay={100}>
          <div
            onClick={() => navigate('Packages')}
            className={`mb-3 p-2 rounded-lg border flex items-center gap-2 transition-colors duration-200 cursor-pointer ${
            isDarkMode 
              ? 'bg-blue-900/20 border-blue-700' 
              : 'bg-blue-50 border-blue-200'
          }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
              isDarkMode ? 'bg-blue-800' : 'bg-blue-100'
            }`}>
              <span className={`text-xs transition-colors duration-200 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-600'
              }`}>
                <PackageIcon size={12} />
              </span>
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
              className={
                `px-4 py-2 rounded-xl text-sm font-bold transition-colors min-h-[28px] bg-emerald-600 hover:bg-emerald-700 text-white text-center flex items-center justify-center`
              }
            >
              Paket al
            </button>
          </div>
        </SlideTransition>
      )}

      {/* Scheduled package info */}
      {!hasActivePackage() && activePackage && new Date() < activePackage.activationDate && (
        <SlideTransition direction="down" delay={100}>
          <div className={`mb-3 p-3 rounded-lg border flex items-center gap-3 transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-amber-900/20 border-amber-700' 
              : 'bg-amber-50 border-amber-200'
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
              isDarkMode ? 'bg-amber-800' : 'bg-amber-100'
            }`}>
              <ClockIcon 
                size={12} 
                className={`transition-colors duration-200 ${
                  isDarkMode ? 'text-amber-300' : 'text-amber-600'
                }`} 
              />
            </div>
            <div className="flex-1">
              <div className={`text-xs font-medium transition-colors duration-200 ${
                isDarkMode ? 'text-amber-300' : 'text-amber-900'
              }`}>
                Paket {activePackage?.activationDate.toLocaleString('az-AZ')} tarixində aktivləşəcək
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
              <span className="text-emerald-600 text-[10px]">★</span>
            </div>
            <div className="flex-1">
              <div className="text-emerald-900 text-[11px] font-medium">
                {activePackage?.name} • Bitmə: {activePackage?.expiryDate.toLocaleDateString('az-AZ')}
              </div>
            </div>
          </div>
        </ScaleIn>
      )}

      {/* Progress Card */}
      <FadeInUp delay={200}>
        <Card className="mb-2 p-2">
          <div className="text-[11px] text-gray-500 mb-1">{t.progress}</div>
          <Progress value={42} className="h-1" />
          <div className="text-[11px] mt-1 text-gray-700">
            {t.continue} → <span className="font-bold">M8: Yol nişanları</span>
          </div>
        </Card>
      </FadeInUp>

      {/* Primary Section */}
      <Card className="mb-2">
        <div className="flex items-center justify-between mb-2">
          <div className={`text-xs uppercase tracking-wide font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Əsas bölmələr</div>
          <div className={`h-px flex-1 ml-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        </div>
        <div className="space-y-2">
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
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <item.icon 
                        size={22} 
                        className={`transition-colors duration-200 ${
                          isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                        }`}
                      />
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
      </Card>

      {/* Long CTA */}
      <ScaleIn delay={500}>
        <div className="mt-2">
          <button
            onClick={() => navigate('ExamConfig', { mode: 'simulator' })}
            className="w-full rounded-2xl p-3 flex items-center gap-3 min-h-[56px] bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <FlaskIcon size={22} className="text-white" />
            </div>
            <div className="text-left font-black text-base leading-tight whitespace-nowrap">
              {`${t.examSimulator} (sınaq imtahanı)`}
            </div>
          </button>
        </div>
      </ScaleIn>

      {/* Secondary Section */}
      {secondaryRows.length > 0 && (
        <Card className="mt-3">
          <div className="flex items-center justify-between mb-2">
            <div className={`text-xs uppercase tracking-wide font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Əlavə bölmələr</div>
            <div className={`h-px flex-1 ml-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
          </div>
          <div className="space-y-2">
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
                        <item.icon 
                          size={22} 
                          className={`transition-colors duration-200 ${
                            isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                          }`}
                        />
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
        </Card>
      )}

      {/* (CTA is now inserted after 3rd row) */}

      {/* Tutorial Card (bottom) */}
      <ScaleIn delay={600}>
        <button
          onClick={() => alert("Tətbiqdən Necə İstifadə Edilir")}
          className="w-full h-36 rounded-2xl p-4 flex items-end justify-end mt-3 bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-700 text-white font-black relative overflow-hidden transform hover:scale-105 transition-transform duration-200"
        >
          <div className="absolute left-4 top-4 w-12 h-12 rounded-full bg-white/25 border border-white/35 flex items-center justify-center">
            <PlayIcon size={24} className="text-white" />
          </div>
          <span className="text-base">Tətbiqdən Necə İstifadə Edilir</span>
        </button>
      </ScaleIn>
    </div>
  );
}