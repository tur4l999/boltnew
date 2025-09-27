import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { IconButton } from '../ui/IconButton';
import { showToast } from '../../lib/utils';
import { EmojiIcon } from '../ui/EmojiIcon';

export function HeaderBeautiful() {
  const { t, language, setLanguage, navigate, isDarkMode } = useApp();
  const userName = "Tural Qarayev";
  
  return (
    <div className="sticky top-0 z-40">
      <div className={`beautiful-container beautiful-glass transition-all duration-300 ${
        isDarkMode 
          ? 'border-b border-gray-800/30' 
          : 'border-b border-gray-200/30'
      } shadow-xl`}>
        
        {/* Main Header */}
        <div className="py-4 beautiful-space-y">
          
          {/* Top Row */}
          <div className="flex items-center justify-between">
            
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl beautiful-gradient-primary text-white flex items-center justify-center font-black text-lg shadow-lg beautiful-hover-glow">
                D
              </div>
              <div>
                <div className="beautiful-subheading bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                  DDA.az
                </div>
                <div className="beautiful-caption beautiful-text-secondary">
                  Sürücülük hazırlığı
                </div>
              </div>
            </div>
            
            {/* User Profile */}
            <button
              onClick={() => navigate('Settings')}
              className="flex items-center gap-3 p-2 rounded-2xl beautiful-glass beautiful-hover-lift beautiful-focus group"
            >
              <div className="w-10 h-10 rounded-xl beautiful-gradient-primary text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:shadow-lg transition-all duration-300">
                {userName.charAt(0)}
              </div>
              <div className="text-left hidden sm:block">
                <div className="beautiful-caption beautiful-text-secondary">Salam,</div>
                <div className="beautiful-subheading beautiful-text-primary">{userName.split(' ')[0]}</div>
              </div>
            </button>
            
          </div>

          {/* Quick Actions Row */}
          <div className="flex items-center justify-between">
            
            {/* Status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-beautiful"></div>
                <span className="beautiful-caption beautiful-text-secondary font-medium">Online</span>
              </div>
              {hasActivePackage() && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-orange-600">
                  <EmojiIcon emoji="⭐" size={12} />
                  <span className="beautiful-caption font-semibold">Premium</span>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              
              {/* Notifications */}
              <button
                onClick={() => showToast('📣 Bildiriş: Bu gün 15 dəq məşq et!')}
                className="relative p-2 rounded-xl beautiful-glass beautiful-hover-lift beautiful-focus group"
                aria-label="Bildirişlər"
              >
                <EmojiIcon emoji="🔔" size={16} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white animate-pulse-beautiful">
                  <div className="w-1 h-1 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </button>
              
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'az' ? 'ru' : 'az')}
                className="px-3 py-2 rounded-xl beautiful-glass beautiful-hover-lift beautiful-focus beautiful-caption font-semibold beautiful-text-secondary hover:beautiful-text-primary transition-colors"
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