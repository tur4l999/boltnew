import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

export function ProfileScreen() {
  const { goBack, isDarkMode } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Tural',
    lastName: 'Qarayev',
    email: 'tural.qarayev@example.com',
    phone: '+994 XX XXX XX XX',
    birthDate: '1995-01-01',
    address: 'Bakı, Azərbaycan',
    gender: 'male'
  });

  const handleSave = () => {
    setIsEditing(false);
    alert('✅ Profil məlumatları yadda saxlanıldı!');
  };

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
    } pt-11`}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-emerald-500/5' : 'bg-emerald-400/10'
        }`}></div>
      </div>

      <div className="relative z-10 p-4 pb-24">
        {/* Header */}
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
          <div className="flex-1">
            <h1 className={`text-base font-black transition-colors duration-200 bg-gradient-to-r ${
              isDarkMode ? 'from-emerald-400 to-green-400' : 'from-emerald-600 to-green-600'
            } bg-clip-text text-transparent`}>
              Profil məlumatları
            </h1>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Şəxsi məlumatlarınızı idarə edin
            </p>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 transform hover:scale-105 ${
              isEditing
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isEditing ? '💾 Saxla' : '✏️ Düzəliş'}
          </button>
        </div>

        {/* Profile Avatar */}
        <Card variant="elevated" padding="sm" className="mb-4 animate-fadeInUp">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-500 text-white flex items-center justify-center font-black text-2xl shadow-xl transition-all duration-300 group-hover:scale-105">
                {formData.firstName.charAt(0).toUpperCase()}
              </div>
              <button className={`absolute bottom-0 right-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-all duration-300 transform hover:scale-110 ${
                isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700'
              } shadow-lg border-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                📷
              </button>
            </div>
            <p className={`mt-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Profil şəklini dəyişmək üçün klikləyin
            </p>
          </div>
        </Card>

        {/* Personal Information */}
        <Card variant="elevated" padding="sm" className="mb-4 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
            }`}>
              <EmojiIcon emoji="👤" size={16} />
            </div>
            <h2 className={`font-black text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Şəxsi məlumatlar
            </h2>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`block text-xs font-bold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Ad
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full px-2 py-1.5 text-xs rounded-lg border-2 transition-all duration-300 ${
                    isEditing
                      ? isDarkMode
                        ? 'border-emerald-500 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-emerald-500'
                        : 'border-emerald-500 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500'
                      : isDarkMode
                        ? 'border-gray-700 bg-gray-800/50 text-gray-300'
                        : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-xs font-bold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Soyad
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full px-2 py-1.5 text-xs rounded-lg border-2 transition-all duration-300 ${
                    isEditing
                      ? isDarkMode
                        ? 'border-emerald-500 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-emerald-500'
                        : 'border-emerald-500 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500'
                      : isDarkMode
                        ? 'border-gray-700 bg-gray-800/50 text-gray-300'
                        : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={!isEditing}
                className={`w-full px-2 py-1.5 text-xs rounded-lg border-2 transition-all duration-300 ${
                  isEditing
                    ? isDarkMode
                      ? 'border-emerald-500 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-emerald-500'
                      : 'border-emerald-500 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500'
                    : isDarkMode
                      ? 'border-gray-700 bg-gray-800/50 text-gray-300'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Telefon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                disabled={!isEditing}
                className={`w-full px-2 py-1.5 text-xs rounded-lg border-2 transition-all duration-300 ${
                  isEditing
                    ? isDarkMode
                      ? 'border-emerald-500 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-emerald-500'
                      : 'border-emerald-500 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500'
                    : isDarkMode
                      ? 'border-gray-700 bg-gray-800/50 text-gray-300'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Doğum tarixi
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                disabled={!isEditing}
                className={`w-full px-2 py-1.5 text-xs rounded-lg border-2 transition-all duration-300 ${
                  isEditing
                    ? isDarkMode
                      ? 'border-emerald-500 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-emerald-500'
                      : 'border-emerald-500 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500'
                    : isDarkMode
                      ? 'border-gray-700 bg-gray-800/50 text-gray-300'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Ünvan
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                disabled={!isEditing}
                className={`w-full px-2 py-1.5 text-xs rounded-lg border-2 transition-all duration-300 ${
                  isEditing
                    ? isDarkMode
                      ? 'border-emerald-500 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-emerald-500'
                      : 'border-emerald-500 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500'
                    : isDarkMode
                      ? 'border-gray-700 bg-gray-800/50 text-gray-300'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Cins
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                disabled={!isEditing}
                className={`w-full px-2 py-1.5 text-xs rounded-lg border-2 transition-all duration-300 ${
                  isEditing
                    ? isDarkMode
                      ? 'border-emerald-500 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-emerald-500'
                      : 'border-emerald-500 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500'
                    : isDarkMode
                      ? 'border-gray-700 bg-gray-800/50 text-gray-300'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                }`}
              >
                <option value="male">Kişi</option>
                <option value="female">Qadın</option>
                <option value="other">Digər</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Account Stats */}
        <Card variant="elevated" padding="sm" className="mb-4 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <EmojiIcon emoji="📊" size={16} />
            </div>
            <h2 className={`font-black text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Hesab statistikası
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
              <div className={`text-lg font-black ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                47
              </div>
              <div className={`text-[10px] ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                Tamamlanmış dərslər
              </div>
            </div>
            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
              <div className={`text-lg font-black ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                12
              </div>
              <div className={`text-[10px] ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                İmtahan cəhdləri
              </div>
            </div>
            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
              <div className={`text-lg font-black ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                85%
              </div>
              <div className={`text-[10px] ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                Uğur faizi
              </div>
            </div>
            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
              <div className={`text-lg font-black ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                23
              </div>
              <div className={`text-[10px] ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                Aktiv günlər
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
