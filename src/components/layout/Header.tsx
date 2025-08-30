import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { IconButton } from '../ui/IconButton';
import { showToast } from '../../lib/utils';
import { AppIcon } from '../ui/AppIcon';

export function Header() {
  const { t, language, setLanguage, navigate, isDarkMode } = useApp();
  const userName = "Tural Qarayev";
  
  return (
    <div className="sticky top-0 z-30 mt-0">
      <div className={`max-w-md mx-auto backdrop-blur-sm border-b transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="px-4 py-2 flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => navigate('Settings')}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 text-white flex items-center justify-center font-bold text-sm hover:from-emerald-700 hover:to-emerald-600 transition-all duration-200"
            >
              {userName.charAt(0).toUpperCase()}
            </button>
            {useApp().hasActivePackage() && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 text-yellow-900 grid place-items-center border-2 border-white">
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-yellow-900">
                  <path d="M12 2.5l2.98 6.04 6.67.97-4.82 4.7 1.14 6.65L12 17.77l-5.97 3.14 1.14-6.65L2.35 9.5l6.67-.97L12 2.5z"/>
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 leading-tight">
            <div className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>DDA.az</div>
            <div className={`text-sm font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {t.hello}, {userName} 👋
            </div>
          </div>
          <IconButton
            onClick={() => showToast('Push (demo): Bu gün 15 dəq məşq et!')}
            label={t.notifications}
          >
            <AppIcon name="bell" />
          </IconButton>
          <IconButton
            onClick={() => navigate('AIChat')}
            label={t.assistant}
          >
            <AppIcon name="assistant" />
          </IconButton>
          <IconButton 
            onClick={() => setLanguage(language === 'az' ? 'ru' : 'az')} 
            label={t.language}
          >
            <AppIcon name="language" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}