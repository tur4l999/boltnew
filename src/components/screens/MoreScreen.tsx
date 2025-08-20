import React from 'react';
import { useApp } from '../../contexts/AppContext';

export function MoreScreen() {
  const { navigate, balance, activePackage, hasActivePackage } = useApp();
  
  const moreItems = [
    { key: 'packages', label: 'Təlim paketləri', emoji: '📦', action: () => navigate('Packages') },
    { key: 'balance', label: 'Daxili balans', emoji: '💰', action: () => navigate('Transactions') },
    { key: 'certificate', label: 'Şəhadətnamə almaq', emoji: '🏆', action: () => alert('Şəhadətnamə almaq (demo)') },
    { key: 'practice', label: 'Praktiki təcrübə', emoji: '🚗', action: () => alert('Praktiki təcrübə (demo)') },
    { key: 'mistakes', label: 'Səhvlərim', emoji: '⚠️', action: () => navigate('Mistakes') },
    { key: 'qa', label: 'Sual-cavab', emoji: '❓', action: () => alert('Sual-cavab (demo)') },
    { key: 'appeal', label: 'Apellyasiyalarım', emoji: '📝', action: () => alert('Apellyasiya (demo)') },
    { key: 'notifications', label: 'Bildirişlər', emoji: '🔔', action: () => alert('Bildirişlər (demo)') },
    { key: 'settings', label: 'Parametrlər', emoji: '⚙️', action: () => alert('Parametrlər (demo)') },
    { key: 'help', label: 'Dəstək', emoji: '🆘', action: () => alert('Köməkçi (demo)') },
  ];

  return (
    <div className="p-4 pb-24">
      {/* Title with Balance and Tickets in same row */}
      <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-xl">
        <h1 className="text-xl font-bold text-gray-900">...</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">Balans:</span>
            <span className="text-sm font-medium text-gray-900">{balance} AZN</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">Simulyator Bileti:</span>
            <span className="text-sm font-bold text-black">3</span>
          </div>
        </div>
      </div>
      
      {/* Active Package Info */}
      {hasActivePackage() && activePackage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-xl">
              ✅
            </div>
            <div className="flex-1">
              <div className="font-medium text-green-900 text-base">Aktiv Paket</div>
              <div className="text-sm text-green-700">{activePackage.name}</div>
              <div className="text-xs text-green-600">
                Bitmə tarixi: {activePackage.expiryDate.toLocaleDateString('az-AZ')}
              </div>
            </div>
          </div>
        </div>
      )}
      
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