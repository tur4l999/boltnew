import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { 
  BookIcon, PackageIcon, WalletIcon, TrophyIcon, CarIcon, AlertIcon, 
  QuestionIcon, DocumentIcon, BellIcon, SettingsIcon, HelpIcon, CheckIcon 
} from '../icons';

export function MoreScreen() {
  const { navigate, balance, tickets, activePackage, hasActivePackage, isDarkMode } = useApp();
  
  const moreItems = [
    { key: 'rules', label: 'Qaydalar', icon: BookIcon, action: () => navigate('Rules') },
    { key: 'packages', label: 'Təlim paketləri', icon: PackageIcon, action: () => navigate('Packages') },
    { key: 'balance', label: 'Daxili balans', icon: WalletIcon, action: () => navigate('Transactions') },
    { key: 'certificate', label: 'Şəhadətnamə almaq', icon: TrophyIcon, action: () => alert('Şəhadətnamə almaq (demo)') },
    { key: 'practice', label: 'Praktiki təcrübə', icon: CarIcon, action: () => alert('Praktiki təcrübə (demo)') },
    { key: 'mistakes', label: 'Səhvlərim', icon: AlertIcon, action: () => navigate('Mistakes') },
    { key: 'qa', label: 'Sual-cavab', icon: QuestionIcon, action: () => alert('Sual-cavab (demo)') },
    { key: 'appeal', label: 'Apellyasiyalarım', icon: DocumentIcon, action: () => alert('Apellyasiya (demo)') },
    { key: 'notifications', label: 'Bildirişlər', icon: BellIcon, action: () => navigate('Settings') },
    { key: 'settings', label: 'Parametrlər', icon: SettingsIcon, action: () => navigate('Settings') },
    { key: 'help', label: 'Dəstək', icon: HelpIcon, action: () => alert('Köməkçi (demo)') },
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
              <CheckIcon size={24} className="text-green-500" />
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
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <item.icon 
                size={20} 
                className={`transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              />
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