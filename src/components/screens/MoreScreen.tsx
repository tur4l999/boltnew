import React from 'react';
import { useApp } from '../../contexts/AppContext';

export function MoreScreen() {
  const { navigate } = useApp();
  
  const moreItems = [
    { key: 'mistakes', label: 'Səhvlərim', emoji: '⚠️', action: () => navigate('Mistakes') },
    { key: 'practice', label: 'Praktiki təcrübə', emoji: '🚗', action: () => alert('Praktiki təcrübə (demo)') },
    { key: 'qa', label: 'Sual-cavab', emoji: '❓', action: () => alert('Sual-cavab (demo)') },
    { key: 'appeal', label: 'Apellyasiya', emoji: '📝', action: () => alert('Apellyasiya (demo)') },
    { key: 'payments', label: 'Ödənişlər', emoji: '💳', action: () => alert('Ödənişlər (demo)') },
    { key: 'balance', label: 'Daxili balans', emoji: '💰', action: () => alert('Daxili balans (demo)') },
    { key: 'settings', label: 'Parametrlər', emoji: '⚙️', action: () => alert('Parametrlər (demo)') },
    { key: 'notifications', label: 'Bildirişlər', emoji: '🔔', action: () => alert('Bildirişlər (demo)') },
    { key: 'help', label: 'Köməkçi', emoji: '🆘', action: () => alert('Köməkçi (demo)') },
  ];

  return (
    <div className="p-4 pb-24">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Daha çox</h1>
      
      <div className="space-y-3">
        {moreItems.map((item) => (
          <button
            key={item.key}
            onClick={item.action}
            className="w-full p-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors min-h-[60px] rounded-xl border border-gray-200 bg-white"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
              {item.emoji}
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 text-base">{item.label}</div>
            </div>
            <div className="text-gray-400 text-lg">›</div>
          </button>
        ))}
      </div>
    </div>
  );
}