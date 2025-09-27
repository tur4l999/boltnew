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
      <div className={`max-w-md mx-auto backdrop-blur-xl border-b transition-all duration-300 glass-comfort ${
        isDarkMode 
          ? 'border-gray-700/30 shadow-xl' 
          : 'border-gray-200/30 shadow-xl'
      }`}>
        <div className="content-padding py-3 flex items-center gap-3">
          <div className="relative group">
            <button
              onClick={() => navigate('Settings')}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-500 text-white flex items-center justify-center font-black text-base hover:from-emerald-700 hover:via-green-700 hover:to-emerald-600 transition-all duration-300 button-press comfort-hover shadow-lg hover:shadow-xl focus-ring"
              aria-label="İstifadəçi parametrləri"
            >
              {userName.charAt(0).toUpperCase()}
            </button>
            {useApp().hasActivePackage() && (
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 text-[10px] leading-none grid place-items-center border-2 border-white shadow-lg animate-pulse">
                <EmojiIcon emoji="⭐" size={10} />
              </div>
            )}
            
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-600 opacity-20 blur-lg scale-110 group-hover:opacity-40 transition-all duration-300"></div>
          </div>
          
          <div className="flex-1 leading-relaxed">
            <div className={`text-xs font-medium transition-colors duration-200 text-comfort-secondary`}>
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent font-bold tracking-wide">DDA.az</span>
            </div>
            <div className={`visual-hierarchy-3 font-semibold transition-colors duration-200 text-comfort-primary`}>
              {t.hello}, {userName.split(' ')[0]} <EmojiIcon emoji="👋" size={14} className="inline-block ml-1" />
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <IconButton
              onClick={() => showToast('📣 Push (demo): Bu gün 15 dəq məşq et!')}
              label={t.notifications}
              className="button-press comfort-hover focus-ring p-2.5 rounded-xl"
            >
              <span className="relative">
                <EmojiIcon emoji="🔔" size={16} />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-sm"></span>
              </span>
            </IconButton>
            
            <IconButton
              onClick={() => navigate('AIChat')}
              label={t.assistant}
              className="button-press comfort-hover focus-ring p-2.5 rounded-xl"
            >
              <EmojiIcon emoji="🤖" size={16} />
            </IconButton>
            
            <IconButton 
              onClick={() => setLanguage(language === 'az' ? 'ru' : 'az')} 
              label={t.language}
              className="button-press comfort-hover focus-ring p-2.5 rounded-xl"
            >
              <EmojiIcon emoji="🌐" size={16} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}