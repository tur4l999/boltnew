import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { EmojiIcon } from '../ui/EmojiIcon';

interface MoreItem {
  key: string;
  label: string;
  emoji: string;
  action: () => void;
  badge?: string;
}

export function MoreScreen() {
  const { navigate, balance, tickets, activePackage, hasActivePackage, isDarkMode } = useApp();
  
  const moreItems: MoreItem[] = [
    { key: 'packages', label: 'Təlim paketləri', emoji: '📦', action: () => navigate('Packages') },
    { key: 'books', label: 'PDF (kitablar)', emoji: '📚', action: () => navigate('SecurePdf'), badge: 'Premium' },
    { key: 'balance', label: 'Daxili balans', emoji: '💰', action: () => navigate('Transactions') },
    { key: 'partner-schools', label: 'Digər Məktəblər', emoji: '🏫', action: () => navigate('PartnerSchools') },
    { key: 'certificate', label: 'Şəhadətnamə', emoji: '🏆', action: () => navigate('CertificateApplication') },
    { key: 'practice', label: 'Praktiki təcrübə', emoji: '🚗', action: () => navigate('DrivingPractice') },
    { key: 'results', label: 'Nəticələrim', emoji: '📊', action: () => navigate('Results') },
    { key: 'appeal', label: 'Apellyasiyalarım', emoji: '📮', action: () => navigate('Appeals') },
    { key: 'qa', label: 'Sual-cavab', emoji: '❓', action: () => navigate('QA') },
    { key: 'notifications', label: 'Bildirişlər', emoji: '🔔', action: () => navigate('Settings') },
    { key: 'settings', label: 'Parametrlər', emoji: '⚙️', action: () => navigate('Settings') },
    { key: 'help', label: 'Dəstək', emoji: '🆘', action: () => alert('Köməkçi (demo)') },
  ];

  return (
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Balance and Tickets Info */}
      <div className={`flex items-center justify-between mb-3 p-3 rounded-xl border transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h1 className={`text-base font-bold transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>Daha çox</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Balans:</span>
            <span className={`text-xs font-medium transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>{balance} AZN</span>
          </div>
          <div className="flex items-center gap-1">
            <span className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Bilet:</span>
            <span className={`text-xs font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-black'
            }`}>{tickets}</span>
          </div>
        </div>
      </div>
      
      {/* Active Package Info */}
      {hasActivePackage() && activePackage && (
        <div className={`mb-2 p-2 rounded-xl border transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-green-900/20 border-green-700' 
            : 'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base transition-colors duration-200 ${
              isDarkMode ? 'bg-green-800' : 'bg-green-100'
            }`}>
              ✅
            </div>
            <div className="flex-1">
              <div className={`font-medium text-xs transition-colors duration-200 ${
                isDarkMode ? 'text-green-300' : 'text-green-900'
              }`}>Aktiv Paket</div>
              <div className={`text-[10px] transition-colors duration-200 ${
                isDarkMode ? 'text-green-400' : 'text-green-700'
              }`}>{activePackage.name}</div>
              <div className={`text-[10px] transition-colors duration-200 ${
                isDarkMode ? 'text-green-500' : 'text-green-600'
              }`}>
                Bitmə tarixi: {activePackage.expiryDate.toLocaleDateString('az-AZ')}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-1.5">
        {moreItems.map((item) => (
          <button
            key={item.key}
            onClick={item.action}
            className={`w-full p-2 flex items-center gap-2 text-left transition-colors min-h-[44px] rounded-lg border ${
              isDarkMode 
                ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-100' 
                : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-900'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <EmojiIcon emoji={item.emoji} size={14} />
            </div>
            <div className="flex-1">
              <div className="font-medium text-xs">{item.label}</div>
              {item.key === 'books' && (
                <div className={`text-[10px] mt-0.5 transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Təhlükəsiz oxuma sistemi
                </div>
              )}
            </div>
            {item.badge && (
              <div className="px-1.5 py-0.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[9px] font-semibold rounded-full">
                {item.badge}
              </div>
            )}
            <div className={`text-sm transition-colors duration-200 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>›</div>
          </button>
        ))}
      </div>
    </div>
  );
}