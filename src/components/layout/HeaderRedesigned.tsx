import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { IconButton } from '../ui/IconButton';
import { showToast } from '../../lib/utils';
import { EmojiIcon } from '../ui/EmojiIcon';

export function HeaderRedesigned() {
  const { t, language, setLanguage, navigate, isDarkMode } = useApp();
  const userName = "Tural Qarayev";
  
  return (
    <div className="sticky top-0 z-30">
      <div className={`max-w-md mx-auto glass-comfort transition-all duration-300 ${
        isDarkMode 
          ? 'border-b border-gray-700/30' 
          : 'border-b border-gray-200/30'
      }`}>
        
        {/* Main Header Content */}
        <div className="content-padding py-3">
          
          {/* Top Row - Brand & Actions */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center text-white text-sm font-black shadow-md">
                D
              </div>
              <div className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent font-black text-lg tracking-tight">
                DDA.az
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('AIChat')}
                className="relative p-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-600 button-press comfort-hover focus-ring"
                aria-label="AI Köməkçisi"
              >
                <EmojiIcon emoji="🤖" size={16} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </button>
              
              <IconButton
                onClick={() => showToast('📣 Bildiriş: Bu gün 15 dəq məşq et!')}
                label={t.notifications}
                className="relative"
              >
                <EmojiIcon emoji="🔔" size={16} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </IconButton>
            </div>
          </div>

          {/* User Greeting */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-comfort-secondary">
                {new Date().getHours() < 12 ? 'Sabahınız xeyir' : new Date().getHours() < 18 ? 'Gününüz xeyir' : 'Axşamınız xeyir'} 👋
              </div>
              <div className="visual-hierarchy-2 text-comfort-primary">
                {userName.split(' ')[0]}
              </div>
            </div>
            
            <button
              onClick={() => navigate('Settings')}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-600 text-white flex items-center justify-center font-black text-lg button-press comfort-hover focus-ring shadow-lg group"
              aria-label="Parametrlər"
            >
              <span className="group-hover:rotate-90 transition-transform duration-300">
                {userName.charAt(0).toUpperCase()}
              </span>
            </button>
          </div>

        </div>
        
        {/* Dynamic Sub-header */}
        <div className={`px-4 py-2 border-t ${
          isDarkMode ? 'border-gray-700/30 bg-gray-800/20' : 'border-gray-200/30 bg-gray-50/20'
        } backdrop-blur-sm`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-comfort-secondary font-medium">Onlayn</span>
              </div>
              <div className="text-xs text-comfort-secondary">
                Son aktivlik: 2 dəq əvvəl
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('AIChat')}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-600 text-xs font-medium button-press hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-200 focus-ring flex items-center gap-1.5"
              >
                <EmojiIcon emoji="✨" size={12} />
                AI
              </button>
              
              <button
                onClick={() => setLanguage(language === 'az' ? 'ru' : 'az')}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-gray-100/50 to-gray-200/50 text-comfort-secondary text-xs font-medium button-press hover:from-emerald-100/50 hover:to-green-100/50 hover:text-emerald-600 transition-all duration-200 focus-ring"
              >
                {language.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}