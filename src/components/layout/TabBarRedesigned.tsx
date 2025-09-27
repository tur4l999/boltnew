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
    <div className={`tabbar-stable z-30 border-t transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900/98 border-gray-700/40 shadow-2xl' 
        : 'bg-white/98 border-gray-200/40 shadow-2xl'
    } backdrop-blur-xl`}>
      <div className="max-w-md mx-auto">
        
        {/* Stable Tab Container */}
        <div className="px-4 py-2">
          <div className="grid grid-cols-4 gap-1">
            
            {tabs.map((tab) => {
              const isActive = currentScreen.screen === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={tab.action}
                  className={`tab-button-stable relative px-2 py-3 rounded-2xl group min-h-[56px] flex flex-col items-center justify-center ${
                    isActive 
                      ? `bg-gradient-to-br ${tab.gradient} text-white shadow-md` 
                      : isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
                  }`}
                  aria-label={tab.label}
                >
                  
                  {/* Subtle glow for active tab */}
                  {isActive && (
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tab.gradient} opacity-15 blur-md transition-all duration-300`}></div>
                  )}
                  
                  <div className="relative z-10 gap-2">
                    <div className={`transition-all duration-200 ${
                      isActive ? '' : 'group-hover:scale-105'
                    }`}>
                      <EmojiIcon emoji={tab.emoji} size={20} />
                    </div>
                    <div className={`text-xs font-semibold mt-1 transition-all duration-200 ${
                      isActive ? 'font-bold' : ''
                    }`}>
                      {tab.label}
                    </div>
                  </div>
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/80 shadow-sm"></div>
                  )}
                  
                </button>
              );
            })}
          </div>
        </div>

        {/* Safe area for iPhone home indicator */}
        <div className="h-safe-area-inset-bottom"></div>
        
      </div>
    </div>
  );
}