import React from 'react';
import { useApp } from '../../contexts/AppContext';

export function TabBar() {
  const { t, currentTab, switchTab, setMoreSheetVisible } = useApp();
  
  const tabs = [
    { key: 'Home', label: t.home, emoji: '🏠' },
    { key: 'Topics', label: t.topics, emoji: '📚' },
    { key: 'Exam', label: t.exam, emoji: '🧪' },
    { key: 'Mistakes', label: t.mistakes, emoji: '⚠️' },
    { key: 'Store', label: t.store, emoji: '🛍️' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-sm border-t border-gray-200">
      <div className="max-w-md mx-auto grid grid-cols-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => switchTab(tab.key)}
            className={`p-2 flex flex-col items-center gap-1 min-h-[56px] ${
              currentTab === tab.key ? 'text-emerald-600' : 'text-gray-500'
            }`}
          >
            <div className={`p-1.5 rounded-lg ${
              currentTab === tab.key ? 'bg-gray-50' : 'bg-transparent'
            }`}>
              <span className="text-base">{tab.emoji}</span>
            </div>
            <div className="text-xs font-semibold">{tab.label}</div>
          </button>
        ))}
        <button
          onClick={() => setMoreSheetVisible(true)}
          className="p-2 flex flex-col items-center gap-1 min-h-[56px] text-gray-500"
        >
          <div className="p-1.5 rounded-lg">
            <span className="text-base">➕</span>
          </div>
          <div className="text-xs font-semibold">{t.more}</div>
        </button>
      </div>
    </div>
  );
}