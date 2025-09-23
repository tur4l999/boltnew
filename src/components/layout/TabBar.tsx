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
    <div className={`fixed bottom-0 left-0 right-0 z-30 backdrop-blur-xl border-t-2 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-800/95 border-gray-700/50 shadow-2xl' 
        : 'bg-white/95 border-gray-200/50 shadow-2xl'
    }`}>
      <div className="max-w-md mx-auto grid grid-cols-5 px-2 py-2">
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
              className={`p-2 flex flex-col items-center gap-2 min-h-[60px] transition-all duration-300 transform hover:scale-105 active:scale-95 relative group ${
                isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r ${tab.gradient} animate-pulse`}></div>
              )}
              
              <div className={`relative p-2 rounded-2xl transition-all duration-300 transform ${
                isActive
                  ? `bg-gradient-to-br ${tab.gradient} text-white shadow-lg scale-110`
                  : isDarkMode 
                    ? 'bg-gray-700/50 hover:bg-gray-600/50' 
                    : 'bg-gray-100/50 hover:bg-gray-200/50'
              }`}>
                {/* Glow effect for active tab */}
                {isActive && (
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tab.gradient} opacity-30 blur-md scale-125 group-hover:opacity-50 transition-opacity duration-300`}></div>
                )}
                
                <EmojiIcon emoji={tab.emoji} size={18} className="relative z-10" />
              </div>
              
              <div className={`text-xs font-bold transition-all duration-200 ${
                isActive ? 'transform scale-110 font-black' : ''
              }`}>
                {tab.label}
              </div>
            </button>
          );
        })}
        
        <button
          onClick={() => switchTab('More')}
          className={`p-2 flex flex-col items-center gap-2 min-h-[60px] transition-all duration-300 transform hover:scale-105 active:scale-95 relative group ${
            currentTab === 'More' ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          {/* Active indicator */}
          {currentTab === 'More' && (
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 animate-pulse"></div>
          )}
          
          <div className={`relative p-2 rounded-2xl transition-all duration-300 transform ${
            currentTab === 'More' 
              ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-lg scale-110'
              : isDarkMode 
                ? 'bg-gray-700/50 hover:bg-gray-600/50' 
                : 'bg-gray-100/50 hover:bg-gray-200/50'
          }`}>
            {/* Glow effect for active tab */}
            {currentTab === 'More' && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 opacity-30 blur-md scale-125 group-hover:opacity-50 transition-opacity duration-300"></div>
            )}
            
            <EmojiIcon emoji="➕" size={18} className="relative z-10" />
          </div>
          
          <div className={`text-xs font-bold transition-all duration-200 ${
            currentTab === 'More' ? 'transform scale-110 font-black' : ''
          }`}>
            {t.more}
          </div>
        </button>
      </div>
    </div>
  );
}