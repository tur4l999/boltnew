import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { IconButton } from '../ui/IconButton';
import { showToast } from '../../lib/utils';
import { StarIcon, HandWaveIcon, BellIcon, BotIcon, GlobeIcon } from '../icons/modern';
import { MegaphoneIcon } from '../icons';

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
                <StarIcon size={10} className="text-yellow-900" filled />
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
              <span className="flex items-center gap-1">
                {t.hello}, {userName} <HandWaveIcon size={16} className="text-emerald-600" />
              </span>
            </div>
          </div>
          <IconButton
            onClick={() => showToast(<div className="flex items-center gap-2"><MegaphoneIcon size={20} /> Push (demo): Bu gün 15 dəq məşq et!</div>)}
            label={t.notifications}
          >
            <BellIcon size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
          </IconButton>
          <IconButton
            onClick={() => navigate('AIChat')}
            label={t.assistant}
          >
            <BotIcon size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
          </IconButton>
          <IconButton 
            onClick={() => setLanguage(language === 'az' ? 'ru' : 'az')} 
            label={t.language}
          >
            <GlobeIcon size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}