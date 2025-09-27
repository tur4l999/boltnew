import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { EmojiIcon } from '../ui/EmojiIcon';

export function TabBarRedesigned() {
  const { t, currentTab, switchTab, navigate, currentScreen, isDarkMode } = useApp();
  
  const tabs = [
    { 
      key: 'Home', 
      label: 'Ana səhifə', 
      emoji: '🏠', 
      gradient: 'from-emerald-500 to-green-500',
      action: () => switchTab('Home')
    },
    { 
      key: 'Topics', 
      label: 'Mövzular', 
      emoji: '📚', 
      gradient: 'from-blue-500 to-cyan-500',
      action: () => switchTab('Topics')
    },
    { 
      key: 'Exam', 
      label: 'İmtahan', 
      emoji: '🎯', 
      gradient: 'from-purple-500 to-pink-500',
      action: () => {
        switchTab('Home');
        navigate('Exam');
      }
    },
    { 
      key: 'Store', 
      label: 'Mağaza', 
      emoji: '🛍️', 
      gradient: 'from-orange-500 to-red-500',
      action: () => switchTab('Store')
    },
  ];

  // Hide TabBar on certain screens
  if (currentScreen?.screen === 'QuickTest' || currentScreen?.screen === 'ExamRun') {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-30 backdrop-blur-xl transition-all duration-300 ${
      isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
    }`}>
      <div className="max-w-md mx-auto">
        
        {/* Modern Tab Container */}
        <div className="content-padding py-3">
          <div className={`grid grid-cols-4 gap-2 p-2 rounded-3xl ${
            isDarkMode 
              ? 'bg-gray-800/60 border border-gray-700/40' 
              : 'bg-gray-100/60 border border-gray-200/40'
          } backdrop-blur-lg shadow-xl`}>
            
            {tabs.map((tab) => {
              const isActive = currentScreen.screen === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={tab.action}
                  className={`relative p-3 rounded-2xl transition-all duration-300 button-press group ${
                    isActive 
                      ? `bg-gradient-to-br ${tab.gradient} text-white shadow-lg scale-105` 
                      : isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/40' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/40'
                  }`}
                  aria-label={tab.label}
                >
                  
                  {/* Background glow for active tab */}
                  {isActive && (
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tab.gradient} opacity-20 blur-lg scale-125 group-hover:opacity-30 transition-all duration-300`}></div>
                  )}
                  
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`transition-all duration-300 ${
                      isActive ? 'scale-110' : 'group-hover:scale-110'
                    }`}>
                      <EmojiIcon emoji={tab.emoji} size={20} />
                    </div>
                    <div className={`text-xs font-semibold transition-all duration-200 ${
                      isActive ? 'scale-105' : ''
                    }`}>
                      {tab.label}
                    </div>
                  </div>
                  
                  {/* Active indicator line */}
                  {isActive && (
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 rounded-full bg-white/50 animate-pulse`}></div>
                  )}
                  
                </button>
              );
            })}
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="absolute -top-8 right-6">
          <button
            onClick={() => navigate('AIChat')}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl hover:shadow-3xl button-press comfort-hover focus-ring group relative overflow-hidden"
            aria-label="AI Köməkçisi"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <EmojiIcon emoji="✨" size={24} />
            </div>
            
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 opacity-30 animate-ping"></div>
          </button>
        </div>

        {/* Safe area for iPhone home indicator */}
        <div className="h-2"></div>
        
      </div>
    </div>
  );
}