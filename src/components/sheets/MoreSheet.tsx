import React from 'react';
import { useApp } from '../../contexts/AppContext';

export function MoreSheet() {
  const { moreSheetVisible, setMoreSheetVisible } = useApp();
  
  if (!moreSheetVisible) return null;

  const items = [
    'Səhvlərim', 'Praktiki təcrübə', 'Sual-cavab', 
    'Apellyasiya', 'Ödənişlər', 'Daxili balans', 
    'Parametrlər', 'Bildirişlər', 'Köməkçi'
  ];

  return (
    <div className="fixed inset-0 z-40">
      <div
        onClick={() => setMoreSheetVisible(false)}
        className="absolute inset-0 bg-black/40"
      />
      <div className="absolute left-0 right-0 bottom-0 max-w-md mx-auto bg-white rounded-t-2xl p-3 border-t border-gray-200 shadow-2xl">
        <div className="w-10 h-1.5 rounded-full bg-gray-300 mx-auto mb-4" />
        <div className="grid grid-cols-3 gap-2">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                if (item === 'Səhvlərim') {
                  // Navigate to mistakes screen
                  console.log('Navigate to Mistakes');
                } else {
                  console.log('More item clicked:', item);
                }
                setMoreSheetVisible(false);
              }}
              className="p-3 rounded-lg border border-gray-300 text-center text-sm text-gray-700 min-h-[44px] flex items-center justify-center hover:bg-gray-50"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}