import React from 'react';
import { useApp } from '../../contexts/AppContext';

export function MoreSheet() {
  const { moreSheetVisible, setMoreSheetVisible, navigate } = useApp();
  
  const moreItems = [
    { key: 'mistakes', label: 'Səhvlərim', emoji: '⚠️', action: () => { setMoreSheetVisible(false); navigate('Mistakes'); } },
    { key: 'practice', label: 'Praktiki təcrübə', emoji: '🚗', action: () => { setMoreSheetVisible(false); alert('Praktiki təcrübə (demo)'); } },
    { key: 'qa', label: 'Sual-cavab', emoji: '❓', action: () => { setMoreSheetVisible(false); alert('Sual-cavab (demo)'); } },
    { key: 'appeal', label: 'Apellyasiya', emoji: '📝', action: () => { setMoreSheetVisible(false); alert('Apellyasiya (demo)'); } },
    { key: 'payments', label: 'Ödənişlər', emoji: '💳', action: () => { setMoreSheetVisible(false); alert('Ödənişlər (demo)'); } },
    { key: 'balance', label: 'Daxili balans', emoji: '💰', action: () => { setMoreSheetVisible(false); alert('Daxili balans (demo)'); } },
    { key: 'settings', label: 'Parametrlər', emoji: '⚙️', action: () => { setMoreSheetVisible(false); alert('Parametrlər (demo)'); } },
    { key: 'notifications', label: 'Bildirişlər', emoji: '🔔', action: () => { setMoreSheetVisible(false); alert('Bildirişlər (demo)'); } },
    { key: 'help', label: 'Köməkçi', emoji: '🆘', action: () => { setMoreSheetVisible(false); alert('Köməkçi (demo)'); } },
  ];

  if (!moreSheetVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={() => setMoreSheetVisible(false)}
      />
      
      {/* Sheet */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl p-4 pb-8 max-h-[80vh] overflow-y-auto">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
        
        <h2 className="text-lg font-bold text-gray-900 mb-4">Daha çox</h2>
        
        <div className="space-y-2">
          {moreItems.map((item) => (
            <button
              key={item.key}
              onClick={item.action}
              className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors min-h-[56px] rounded-xl"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                {item.emoji}
              </div>
              <div className="font-medium text-gray-900">{item.label}</div>
              <div className="ml-auto text-gray-400">›</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}