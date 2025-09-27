import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { EmojiIcon } from '../ui/EmojiIcon';

export function TabBar() {
  const { t, currentTab, switchTab, navigate, currentScreen, setMoreSheetVisible, isDarkMode } = useApp();
  
  const tabs = [
    { key: 'Home', label: t.home, emoji: '🏠', gradient: 'from-emerald-500 to-green-500' },
    { key: 'Topics', label: 'Mövzular', emoji: '📚', gradient: 'from-blue-500 to-cyan-500' },
    { key: 'Exam', label: t.exam, emoji: '🧪', gradient: 'from-purple-500 to-pink-500' },
    { key: 'Store', label: t.store, emoji: '🛍️', gradient: 'from-orange-500 to-red-500' },
  ];

  // Hide TabBar on Quick Test screen
  if (currentScreen?.screen === 'QuickTest') {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-30 backdrop-blur-xl border-t transition-all duration-300 glass-comfort ${
      isDarkMode 
        ? 'border-gray-700/30 shadow-2xl' 
        : 'border-gray-200/30 shadow-2xl'
    }`}>
      <div className="max-w-md mx-auto grid grid-cols-5 content-padding py-2 gap-1">
        {tabs.map((tab) => {
          const isActive = currentScreen.screen === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                if (tab.key === 'Exam') {
                  switchTab('Home');
                  navigate('Exam');
                } else if (tab.key === 'Topics' || tab.key === 'Home' || tab.key === 'Store') {
                  switchTab(tab.key);
                }
              }}
              className={`p-2 flex flex-col items-center gap-1.5 min-h-[64px] transition-all duration-300 button-press comfort-hover focus-ring relative group rounded-xl ${
                isActive 
                  ? 'text-emerald-600' 
                  : isDarkMode 
                    ? 'text-gray-400 hover:text-gray-200' 
                    : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-label={tab.label}
            >
              {/* Active indicator */}
              {isActive && (
                <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r ${tab.gradient} animate-pulse`}></div>
              )}
              
              <div className={`relative p-2.5 rounded-2xl transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-br ${tab.gradient} text-white shadow-lg scale-105`
                  : isDarkMode 
                    ? 'bg-gray-700/40 hover:bg-gray-600/60' 
                    : 'bg-gray-100/60 hover:bg-gray-200/80'
              }`}>
                {/* Enhanced glow effect for active tab */}
                {isActive && (
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tab.gradient} opacity-25 blur-lg scale-125 group-hover:opacity-40 transition-all duration-300`}></div>
                )}
                
                <EmojiIcon emoji={tab.emoji} size={18} className="relative z-10" />
              </div>
              
              <div className={`text-xs font-semibold transition-all duration-200 high-contrast-text ${
                isActive ? 'transform scale-105 font-bold text-emerald-600' : ''
              }`}>
                {tab.label}
              </div>
            </button>
          );
        })}
        
        <button
          onClick={() => switchTab('More')}
          className={`p-2 flex flex-col items-center gap-1.5 min-h-[64px] transition-all duration-300 button-press comfort-hover focus-ring relative group rounded-xl ${
            currentTab === 'More' 
              ? 'text-emerald-600' 
              : isDarkMode 
                ? 'text-gray-400 hover:text-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
          }`}
          aria-label={t.more}
        >
          {/* Active indicator */}
          {currentTab === 'More' && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 animate-pulse"></div>
          )}
          
          <div className={`relative p-2.5 rounded-2xl transition-all duration-300 ${
            currentTab === 'More' 
              ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-lg scale-105'
              : isDarkMode 
                ? 'bg-gray-700/40 hover:bg-gray-600/60' 
                : 'bg-gray-100/60 hover:bg-gray-200/80'
          }`}>
            {/* Enhanced glow effect for active tab */}
            {currentTab === 'More' && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 opacity-25 blur-lg scale-125 group-hover:opacity-40 transition-all duration-300"></div>
            )}
            
            <EmojiIcon emoji="➕" size={18} className="relative z-10" />
          </div>
          
          <div className={`text-xs font-semibold transition-all duration-200 high-contrast-text ${
            currentTab === 'More' ? 'transform scale-105 font-bold text-emerald-600' : ''
          }`}>
            {t.more}
          </div>
        </button>
      </div>
    </div>
  );
}