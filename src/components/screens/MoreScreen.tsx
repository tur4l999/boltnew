import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';

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
    <div className="p-3 pb-24">
      <div className="space-y-2">
        {moreItems.map((item) => (
          <Card key={item.key} className="p-0">
            <button
              onClick={item.action}
              className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors min-h-[56px]"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                {item.emoji}
              </div>
              <div className="font-medium text-gray-900">{item.label}</div>
              <div className="ml-auto text-gray-400">›</div>
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}