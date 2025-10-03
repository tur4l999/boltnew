import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { IconButton } from '../ui/IconButton';
import { showToast } from '../../lib/utils';
import { EmojiIcon } from '../ui/EmojiIcon';

export function Header() {
  const { t, language, setLanguage, navigate, isDarkMode } = useApp();
  const userName = "Tural Qarayev";
  
  return (
    <div className="sticky top-0 z-30 mt-0">
      <div className={`max-w-md mx-auto backdrop-blur-xl border-b-2 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-800/90 border-gray-700/50 shadow-lg' 
          : 'bg-white/90 border-gray-200/50 shadow-lg'
      }`}>
        <div className="px-4 py-3 flex items-center gap-4">
          <div className="relative group">
            <button
              onClick={() => navigate('Settings')}
              className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-500 text-white flex items-center justify-center font-black text-base hover:from-emerald-700 hover:via-green-700 hover:to-emerald-600 transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
            >
              {userName.charAt(0).toUpperCase()}
            </button>
            {useApp().hasActivePackage() && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 text-[10px] leading-none grid place-items-center border-2 border-white shadow-lg animate-pulse">
                <EmojiIcon emoji="⭐" size={10} />
              </div>
            )}
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-600 opacity-20 blur-lg scale-110 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>
          
          <div className="flex-1 leading-tight">
            <div className={`text-xs font-medium transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent font-bold">DDA.az</span>
            </div>
            <div className={`text-sm font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {t.hello}, {userName.split(' ')[0]} <EmojiIcon emoji="👋" size={14} className="inline-block" />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <IconButton
              onClick={() => navigate('Notifications')}
              label={t.notifications}
              className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <span className="relative">
                <EmojiIcon emoji="🔔" size={16} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </span>
            </IconButton>
            
            <IconButton
              onClick={() => navigate('AIChat')}
              label={t.assistant}
              className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <EmojiIcon emoji="🤖" size={16} />
            </IconButton>
            
            <IconButton 
              onClick={() => setLanguage(language === 'az' ? 'ru' : 'az')} 
              label={t.language}
              className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <EmojiIcon emoji="🌐" size={16} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}