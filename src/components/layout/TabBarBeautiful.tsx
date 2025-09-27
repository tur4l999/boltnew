import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { EmojiIcon } from '../ui/EmojiIcon';

export function TabBarBeautiful() {
  const { t, currentTab, switchTab, navigate, currentScreen, isDarkMode } = useApp();
  
  const tabs = [
    { 
      key: 'Home', 
      label: 'Ana səhifə', 
      emoji: '🏠', 
      color: 'emerald',
      action: () => switchTab('Home')
    },
    { 
      key: 'Topics', 
      label: 'Mövzular', 
      emoji: '📚', 
      color: 'blue',
      action: () => switchTab('Topics')
    },
    { 
      key: 'Exam', 
      label: 'İmtahan', 
      emoji: '🎯', 
      color: 'purple',
      action: () => {
        switchTab('Home');
        navigate('Exam');
      }
    },
    { 
      key: 'Store', 
      label: 'Mağaza', 
      emoji: '🛍️', 
      color: 'orange',
      action: () => switchTab('Store')
    },
  ];

  // Hide TabBar on certain screens
  if (currentScreen?.screen === 'QuickTest' || currentScreen?.screen === 'ExamRun') {
    return null;
  }

  const getTabColors = (color: string, isActive: boolean) => {
    const colors = {
      emerald: {
        bg: isActive ? 'bg-emerald-500' : isDarkMode ? 'hover:bg-emerald-500/20' : 'hover:bg-emerald-50',
        text: isActive ? 'text-white' : isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
        icon: isActive ? 'bg-white/20' : isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-100',
      },
      blue: {
        bg: isActive ? 'bg-blue-500' : isDarkMode ? 'hover:bg-blue-500/20' : 'hover:bg-blue-50',
        text: isActive ? 'text-white' : isDarkMode ? 'text-blue-400' : 'text-blue-600',
        icon: isActive ? 'bg-white/20' : isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100',
      },
      purple: {
        bg: isActive ? 'bg-purple-500' : isDarkMode ? 'hover:bg-purple-500/20' : 'hover:bg-purple-50',
        text: isActive ? 'text-white' : isDarkMode ? 'text-purple-400' : 'text-purple-600',
        icon: isActive ? 'bg-white/20' : isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100',
      },
      orange: {
        bg: isActive ? 'bg-orange-500' : isDarkMode ? 'hover:bg-orange-500/20' : 'hover:bg-orange-50',
        text: isActive ? 'text-white' : isDarkMode ? 'text-orange-400' : 'text-orange-600',
        icon: isActive ? 'bg-white/20' : isDarkMode ? 'bg-orange-500/20' : 'bg-orange-100',
      },
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-950/95' 
        : 'bg-white/95'
    } backdrop-blur-2xl border-t ${
      isDarkMode ? 'border-gray-800/50' : 'border-gray-200/50'
    }`}>
      <div className="beautiful-container">
        
        {/* Tab Navigation */}
        <div className="py-3">
          <div className={`p-1 rounded-3xl ${
            isDarkMode 
              ? 'bg-gray-900/60 border border-gray-800/50' 
              : 'bg-gray-100/60 border border-gray-200/30'
          } backdrop-blur-lg shadow-lg`}>
            <div className="grid grid-cols-4">
              {tabs.map((tab) => {
                const isActive = currentScreen.screen === tab.key;
                const tabColors = getTabColors(tab.color, isActive);
                
                return (
                  <button
                    key={tab.key}
                    onClick={tab.action}
                    className={`relative p-3 rounded-2xl transition-all duration-300 group min-h-[60px] flex flex-col items-center justify-center beautiful-focus ${
                      isActive 
                        ? `${tabColors.bg} ${tabColors.text} shadow-lg transform scale-105` 
                        : `${tabColors.text} ${tabColors.bg}`
                    }`}
                    aria-label={tab.label}
                  >
                    
                    {/* Icon Container */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1 transition-all duration-300 ${
                      tabColors.icon
                    } ${isActive ? '' : 'group-hover:scale-110'}`}>
                      <EmojiIcon emoji={tab.emoji} size={18} />
                    </div>
                    
                    {/* Label */}
                    <div className={`beautiful-caption font-semibold transition-all duration-200 ${
                      isActive ? 'font-bold' : ''
                    }`}>
                      {tab.label}
                    </div>
                    
                    {/* Active glow */}
                    {isActive && (
                      <div className={`absolute inset-0 rounded-2xl ${tabColors.bg} opacity-20 blur-lg scale-110 animate-pulse-beautiful`}></div>
                    )}
                    
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating AI Assistant */}
        <div className="absolute -top-6 right-4">
          <button
            onClick={() => navigate('AIChat')}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl hover:shadow-3xl beautiful-hover-lift beautiful-focus group relative overflow-hidden"
            aria-label="AI Köməkçisi"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <EmojiIcon emoji="🤖" size={20} />
            </div>
            
            {/* Status indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse-beautiful">
              <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </button>
        </div>

        {/* Safe area for iPhone */}
        <div className="h-2 sm:h-0"></div>
        
      </div>
    </div>
  );
}