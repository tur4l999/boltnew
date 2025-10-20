import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Icon } from '../icons/Icon';

export function PrivacyScreen() {
  const { goBack, isDarkMode } = useApp();
  const [settings, setSettings] = useState({
    profileVisibility: 'private'
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [countdown, setCountdown] = useState(7);
  const [canDelete, setCanDelete] = useState(false);

  // Countdown effect
  useEffect(() => {
    if (showDeleteModal && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showDeleteModal && countdown === 0) {
      setCanDelete(true);
    }
  }, [showDeleteModal, countdown]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setCountdown(7);
    setCanDelete(false);
  };

  const handleDeleteConfirm = () => {
    alert('✅ Hesab silmə sorğusu göndərildi (demo)\n\nBütün məlumatlarınız qalıcı olaraq silinəcək.');
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setCountdown(7);
    setCanDelete(false);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
    } pt-11`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-purple-500/5' : 'bg-purple-400/10'
        }`}></div>
      </div>

      <div className="relative z-10 p-4 pb-24">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={goBack}
            className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isDarkMode 
                ? 'border-gray-600/50 bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 backdrop-blur-sm' 
                : 'border-gray-300/50 bg-white/80 hover:bg-gray-50/80 text-gray-700 backdrop-blur-sm'
            }`}
          >
            <span className="text-base">←</span>
          </button>
          <div>
            <h1 className={`text-base font-black transition-colors duration-200 bg-gradient-to-r ${
              isDarkMode ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'
            } bg-clip-text text-transparent`}>
              Məxfilik
            </h1>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Məlumat paylaşımını idarə edin
            </p>
          </div>
        </div>

        {/* Account Visibility */}
        <Card variant="elevated" padding="sm" className="mb-4 animate-fadeInUp">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
            }`}>
              <Icon name="user" size={16} className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} />
            </div>
            <h2 className={`font-black text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Profil görünməsi
            </h2>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setSettings(prev => ({ ...prev, profileVisibility: 'public' }))}
              className={`w-full p-2.5 rounded-xl border-2 flex items-center gap-2 transition-all duration-300 ${
                settings.profileVisibility === 'public'
                  ? isDarkMode
                    ? 'border-emerald-500 bg-emerald-900/20'
                    : 'border-emerald-500 bg-emerald-50'
                  : isDarkMode
                    ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="text-left flex-1">
                <div className={`font-bold text-xs mb-0.5 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Açıq</div>
                <div className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Hər kəs profilinizi görə bilər
                </div>
              </div>
              {settings.profileVisibility === 'public' && (
                <div className={`text-lg ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>✓</div>
              )}
            </button>

            <button
              onClick={() => setSettings(prev => ({ ...prev, profileVisibility: 'private' }))}
              className={`w-full p-2.5 rounded-xl border-2 flex items-center gap-2 transition-all duration-300 ${
                settings.profileVisibility === 'private'
                  ? isDarkMode
                    ? 'border-emerald-500 bg-emerald-900/20'
                    : 'border-emerald-500 bg-emerald-50'
                  : isDarkMode
                    ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="text-left flex-1">
                <div className={`font-bold text-xs mb-0.5 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Məxfi</div>
                <div className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Profiliniz digərləri tərəfindən görünməyəcək
                </div>
              </div>
              {settings.profileVisibility === 'private' && (
                <div className={`text-lg ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>✓</div>
              )}
            </button>
          </div>
        </Card>

        {/* Data Export & Delete */}
        <Card variant="elevated" padding="sm" className="mb-4 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-yellow-600/20' : 'bg-yellow-100'
            }`}>
              <Icon name="shield" size={16} className={isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} />
            </div>
            <h2 className={`font-black text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Məlumatlarınız
            </h2>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleDeleteClick}
              className={`w-full p-2.5 rounded-xl border-2 flex items-center justify-between transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'border-red-500/50 bg-red-900/20 hover:bg-red-900/30 text-red-300' 
                  : 'border-red-300 bg-red-50 hover:bg-red-100 text-red-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon name="trash" size={18} className={isDarkMode ? 'text-red-400' : 'text-red-600'} />
                <div className="text-left">
                  <div className="font-bold text-xs">Hesabı sil</div>
                  <div className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Bütün məlumatlarınızı qalıcı olaraq silin
                  </div>
                </div>
              </div>
              <div className="text-lg">→</div>
            </button>
          </div>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div 
            className={`max-w-iphone16 w-full rounded-2xl p-4 shadow-2xl ${
              isDarkMode ? 'bg-gray-800 border-2 border-red-500/30' : 'bg-white border-2 border-red-300'
            }`}
            style={{ animation: 'scaleIn 0.3s ease-out' }}
          >
            {/* Warning Icon */}
            <div className="flex justify-center mb-3">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-red-900/30' : 'bg-red-100'
              }`}>
                <Icon name="warning" size={28} className={isDarkMode ? 'text-red-400' : 'text-red-600'} />
              </div>
            </div>

            {/* Title */}
            <h2 className={`text-base font-black text-center mb-3 ${
              isDarkMode ? 'text-red-300' : 'text-red-700'
            }`}>
              Hesabı silmək istəyirsiniz?
            </h2>

            {/* Warning Message */}
            <div className={`p-3 rounded-xl mb-4 ${
              isDarkMode ? 'bg-red-900/20 border-2 border-red-500/30' : 'bg-red-50 border-2 border-red-200'
            }`}>
              <p className={`text-xs font-bold mb-2 ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}>
                ⚠️ Xəbardarlıq: Bu əməliyyat geri qaytarıla bilməz!
              </p>
              <ul className={`text-[10px] space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li className="flex items-start gap-2">
                  <span className={isDarkMode ? 'text-red-400' : 'text-red-600'}>•</span>
                  <span>Edilən bütün ödənişlər geri qaytarılmayacaq</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={isDarkMode ? 'text-red-400' : 'text-red-600'}>•</span>
                  <span>Balansdakı məbləğ ləğv ediləcək</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={isDarkMode ? 'text-red-400' : 'text-red-600'}>•</span>
                  <span>Aktiv paket və xidmətlər dayandırılacaq</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={isDarkMode ? 'text-red-400' : 'text-red-600'}>•</span>
                  <span>Bütün məlumat və nəticələr silinəcək</span>
                </li>
              </ul>
            </div>

            {/* Countdown Timer */}
            {!canDelete && (
              <div className={`text-center mb-4 p-3 rounded-xl ${
                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
              }`}>
                <div className={`text-2xl font-black mb-1 ${
                  isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`}>
                  {countdown}
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Düyməni aktivləşdirmək üçün gözləyin...
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleDeleteCancel}
                className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Ləğv et
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={!canDelete}
                className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                  canDelete
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:scale-105 cursor-pointer'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {canDelete ? 'Hesabı sil' : 'Gözləyin...'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}