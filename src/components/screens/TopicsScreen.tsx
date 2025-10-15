import React, { useState, useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { MODULES } from '../../lib/data';
import { FadeIn } from '../ui/FadeIn';
import { EmojiIcon } from '../ui/EmojiIcon';

export function TopicsScreen() {
  const { t, navigate, isModuleUnlocked, hasActivePackage, isDarkMode } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);
  
  const filteredModules = useMemo(
    () => MODULES.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const handleModuleClick = (module: any) => {
    if (isModuleUnlocked(module.id)) {
      navigate('Lesson', { moduleId: module.id });
    } else {
      setShowPurchasePopup(true);
    }
  };

  return (
    <>
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Enhanced Package Status */}
      {!hasActivePackage() && (
        <div
          className={`mb-4 p-4 rounded-2xl border-2 flex items-center gap-4 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-lg group ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-blue-700/50 hover:border-blue-600' 
            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/50 hover:border-blue-300'
        } backdrop-blur-sm`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${
            isDarkMode ? 'bg-blue-800/50' : 'bg-blue-100/80'
          }`}>
            <EmojiIcon emoji="📦" size={24} className={`transition-colors duration-200 ${
              isDarkMode ? 'text-blue-300' : 'text-blue-600'
            }`} />
          </div>
          <div className="flex-1">
            <div className={`text-sm font-bold mb-1 transition-colors duration-200 ${
              isDarkMode ? 'text-blue-200' : 'text-blue-900'
            }`}>
              Aktiv paketiniz yoxdur
            </div>
            <div className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-blue-300/80' : 'text-blue-700/80'
            }`}>
              Öyrənməyə başlamaq üçün paket seçin
            </div>
          </div>
          <button
            onClick={() => navigate('Packages')}
            className="px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl"
          >
            Paket al
          </button>
        </div>
      )}

      {hasActivePackage() && (
        <div className="mb-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <span className="text-emerald-600 text-xs">🔓</span>
          </div>
          <div className="flex-1">
            <div className="text-emerald-900 text-xs font-medium">
              Bütün təlimlər açıq - {useApp().activePackage?.name}
            </div>
            <div className="text-emerald-700 text-xs">
              Bitmə tarixi: {useApp().activePackage?.expiryDate.toLocaleDateString('az-AZ')}
            </div>
          </div>
          <div className="text-emerald-600 text-sm">
            ✨
          </div>
        </div>
      )}

      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t.filterByTopic}
        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm min-h-[44px] mb-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400' 
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
        }`}
      />
      <div className="space-y-2">
        {filteredModules.map((module) => {
          const unlocked = isModuleUnlocked(module.id);
          return (
            <div
              key={module.id}
              onClick={() => {
                if (!unlocked) setShowPurchasePopup(true);
              }}
              className={!unlocked ? 'cursor-pointer' : ''}
            >
            <Card className={!unlocked ? 'opacity-60' : ''}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {!unlocked && (
                    <span className="text-gray-400 text-lg animate-pulse">🔒</span>
                  )}
                  <div>
                  <div className={`font-bold text-sm transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    <span className="block max-w-[240px] truncate">{module.title}</span>
                  </div>
                  <div className={`text-xs transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {t.progress}: {module.progress}%
                  </div>
                  </div>
                </div>
                <Button 
                  onClick={() => handleModuleClick(module)}
                  size="sm"
                >
                  {unlocked ? t.startLesson : 'Kilidli'}
                </Button>
              </div>
              <div className="relative overflow-hidden rounded-lg">
                <Progress value={unlocked ? module.progress : 0} />
                {unlocked && module.progress > 0 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                )}
              </div>
            </Card>
            </div>
          );
        })}
      </div>
    </div>
    {showPurchasePopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={() => setShowPurchasePopup(false)} />
        <div className={`relative z-10 w-[90%] max-w-iphone16 rounded-2xl p-5 shadow-xl border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className={`text-base font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Mövzu kilidlidir
          </div>
          <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4`}>
            Bu mövzunu açmaq üçün paket tələb olunur. Paket almaq istəyirsiniz?
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowPurchasePopup(false)}
              className={`px-4 py-2 rounded-xl font-bold min-h-[40px] border ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bağla
            </button>
            <button
              onClick={() => {
                setShowPurchasePopup(false);
                navigate('Packages');
              }}
              className="px-4 py-2 rounded-xl font-bold min-h-[40px] bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Paket al
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}