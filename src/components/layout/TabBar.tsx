import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { HomeIcon, BookIcon, FlaskIcon, ShoppingBagIcon, PlusIcon } from '../icons';

export function TabBar() {
  const { t, currentTab, switchTab, navigate, currentScreen, setMoreSheetVisible, isDarkMode } = useApp();
  
  const tabs = [
    { key: 'Home', label: t.home, icon: HomeIcon },
    { key: 'Topics', label: 'Mövzular', icon: BookIcon },
    { key: 'Exam', label: t.exam, icon: FlaskIcon },
    { key: 'Store', label: t.store, icon: ShoppingBagIcon },
  ];

  // Hide TabBar on Quick Test screen
  if (currentScreen?.screen === 'QuickTest') {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-30 backdrop-blur-sm border-t transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-800/90 border-gray-700' 
        : 'bg-white/90 border-gray-200'
    }`}>
      <div className="max-w-md mx-auto grid grid-cols-5">
        {tabs.map((tab) => (
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
            className={`p-2 flex flex-col items-center gap-1 min-h-[56px] transition-all duration-300 transform hover:scale-110 ${
              (currentScreen.screen === tab.key)
                ? 'text-emerald-600' : 'text-gray-500'
            }`}
          >
            <div className={`p-1.5 rounded-lg transition-all duration-300 transform ${
              (currentScreen.screen === tab.key)
                ? isDarkMode ? 'bg-gray-700 scale-110' : 'bg-gray-50 scale-110'
                : 'bg-transparent'
            }`}>
              <tab.icon 
                size={20} 
                className={`transition-colors duration-200 ${
                  (currentScreen.screen === tab.key)
                    ? 'text-emerald-600' 
                    : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              />
            </div>
            <div className={`text-xs font-semibold transition-all duration-200 ${
              (currentScreen.screen === tab.key)
                ? 'transform scale-105' : ''
            }`}>{tab.label}</div>
          </button>
        ))}
        <button
          onClick={() => switchTab('More')}
          className={`p-2 flex flex-col items-center gap-1 min-h-[56px] transition-all duration-300 transform hover:scale-110 ${
            currentTab === 'More' ? 'text-emerald-600' : 'text-gray-500'
          }`}
        >
          <div className={`p-1.5 rounded-lg transition-all duration-300 transform ${
            currentTab === 'More' 
              ? isDarkMode ? 'bg-gray-700 scale-110' : 'bg-gray-50 scale-110' 
              : 'bg-transparent'
          }`}>
            <PlusIcon 
              size={20} 
              className={`transition-colors duration-200 ${
                currentTab === 'More' 
                  ? 'text-emerald-600' 
                  : isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            />
          </div>
          <div className={`text-xs font-semibold transition-all duration-200 ${
            currentTab === 'More' ? 'transform scale-105' : ''
          }`}>{t.more}</div>
        </button>
      </div>
    </div>
  );
}