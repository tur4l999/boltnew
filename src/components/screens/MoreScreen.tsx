import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { AppIcon } from '../ui/AppIcon';

export function MoreScreen() {
  const { navigate, balance, tickets, activePackage, hasActivePackage, isDarkMode } = useApp();
  
  const moreItems = [
    { key: 'packages', label: 'Təlim paketləri', icon: 'package' as const, action: () => navigate('Packages') },
    { key: 'balance', label: 'Daxili balans', icon: 'cart' as const, action: () => navigate('Transactions') },
    { key: 'certificate', label: 'Şəhadətnamə almaq', icon: 'trophy' as const, action: () => alert('Şəhadətnamə almaq (demo)') },
    { key: 'practice', label: 'Praktiki təcrübə', icon: 'car' as const, action: () => alert('Praktiki təcrübə (demo)') },
    { key: 'mistakes', label: 'Səhvlərim', icon: 'alert' as const, action: () => navigate('Mistakes') },
    { key: 'qa', label: 'Sual-cavab', icon: 'question' as const, action: () => alert('Sual-cavab (demo)') },
    { key: 'appeal', label: 'Apellyasiyalarım', icon: 'quick' as const, action: () => alert('Apellyasiya (demo)') },
    { key: 'notifications', label: 'Bildirişlər', icon: 'bell' as const, action: () => navigate('Settings') },
    { key: 'settings', label: 'Parametrlər', icon: 'settings' as const, action: () => navigate('Settings') },
    { key: 'help', label: 'Dəstək', icon: 'message' as const, action: () => alert('Köməkçi (demo)') },
  ];

  return (
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Balance and Tickets Info */}
      <div className={`flex items-center justify-between mb-4 p-4 rounded-xl border transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h1 className={`text-lg font-bold transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>Daha çox</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className={`text-sm transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Balans:</span>
            <span className={`text-sm font-medium transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>{balance} AZN</span>
          </div>
          <div className="flex items-center gap-1">
            <span className={`text-sm transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Bilet:</span>
            <span className={`text-sm font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-black'
            }`}>{tickets}</span>
          </div>
        </div>
      </div>
      
      {/* Active Package Info */}
      {hasActivePackage() && activePackage && (
        <div className={`mb-3 p-3 rounded-xl border transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-green-900/20 border-green-700' 
            : 'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors duration-200 ${
              isDarkMode ? 'bg-green-800' : 'bg-green-100'
            }`}>
              <AppIcon name="check" />
            </div>
            <div className="flex-1">
              <div className={`font-medium text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-green-300' : 'text-green-900'
              }`}>Aktiv Paket</div>
              <div className={`text-xs transition-colors duration-200 ${
                isDarkMode ? 'text-green-400' : 'text-green-700'
              }`}>{activePackage.name}</div>
              <div className={`text-xs transition-colors duration-200 ${
                isDarkMode ? 'text-green-500' : 'text-green-600'
              }`}>
                Bitmə tarixi: {activePackage.expiryDate.toLocaleDateString('az-AZ')}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        {moreItems.map((item) => (
          <button
            key={item.key}
            onClick={item.action}
            className={`w-full p-3 flex items-center gap-3 text-left transition-colors min-h-[56px] rounded-xl border ${
              isDarkMode 
                ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-100' 
                : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-900'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <AppIcon name={item.icon} />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">{item.label}</div>
            </div>
            <div className={`text-base transition-colors duration-200 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>›</div>
          </button>
        ))}
      </div>
    </div>
  );
}