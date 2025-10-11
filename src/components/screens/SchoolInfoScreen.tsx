import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Icon } from '../icons/Icon';
import { EmojiIcon } from '../ui/EmojiIcon';

export function SchoolInfoScreen() {
  const { goBack, isDarkMode } = useApp();
  
  // Məktəb/Kurs məlumatları (gələcəkdə dinamik olaraq gələ bilər)
  const schoolInfo = {
    name: 'DDA',
    fullName: 'Driving Development Academy',
    type: 'Sürücülük Kursları və Təlim Mərkəzi',
    address: 'Bakı, Azərbaycan',
    phone: '+994 12 345 67 89',
    email: 'info@dda.az',
    website: 'www.dda.az',
    established: '2020',
    students: '5000+',
    instructors: '50+',
    description: 'DDA - Azərbaycanda sürücülük təhsilinin lider təşkilatı. Biz modern təlim metodları və peşəkar müəllimlər heyəti ilə təhlükəsiz sürücülər yetişdiririk.',
    features: [
      'Peşəkar müəllimlər heyəti',
      'Müasir avtomobil parkı',
      'İnteraktiv video dərslər',
      'Online imtahan simulyatoru',
      'Premium kitablar və materiallar',
      '24/7 dəstək xidməti'
    ],
    licenses: [
      'B kateqoriya',
      'C kateqoriya',
      'D kateqoriya',
      'BE kateqoriya'
    ],
    socialMedia: {
      facebook: '@dda.az',
      instagram: '@dda.az',
      youtube: '@DDA.Azerbaijan'
    }
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
        <div className={`absolute bottom-20 left-10 w-32 h-32 rounded-full blur-2xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-400/10'
        }`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 p-4 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={goBack}
            className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isDarkMode 
                ? 'border-gray-600/50 bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 backdrop-blur-sm' 
                : 'border-gray-300/50 bg-white/80 hover:bg-gray-50/80 text-gray-700 backdrop-blur-sm'
            }`}
          >
            <span className="text-lg">←</span>
          </button>
          <div className="flex-1">
            <h1 className={`text-2xl font-black transition-colors duration-200 bg-gradient-to-r ${
              isDarkMode ? 'from-emerald-400 to-green-400' : 'from-emerald-600 to-green-600'
            } bg-clip-text text-transparent`}>
              Məktəb/Kurs Məlumatları
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {schoolInfo.name} haqqında ətraflı
            </p>
          </div>
        </div>

        {/* School Logo/Header */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp">
          <div className="flex flex-col items-center text-center">
            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center font-black text-4xl shadow-xl transition-all duration-300 mb-4 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-500 text-white' 
                : 'bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-500 text-white'
            }`}>
              {schoolInfo.name}
            </div>
            <h2 className={`text-xl font-bold mb-2 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {schoolInfo.fullName}
            </h2>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {schoolInfo.type}
            </p>
          </div>
        </Card>

        {/* About */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
            }`}>
              <Icon name="info" size={20} className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} />
            </div>
            <h3 className={`font-bold text-lg ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Haqqında
            </h3>
          </div>
          <p className={`text-sm leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {schoolInfo.description}
          </p>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3 mb-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <Card variant="elevated" padding="md">
            <div className="text-center">
              <div className={`text-2xl font-bold mb-1 ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                {schoolInfo.established}
              </div>
              <div className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Təsis ili
              </div>
            </div>
          </Card>
          <Card variant="elevated" padding="md">
            <div className="text-center">
              <div className={`text-2xl font-bold mb-1 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {schoolInfo.students}
              </div>
              <div className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Tələbə
              </div>
            </div>
          </Card>
          <Card variant="elevated" padding="md">
            <div className="text-center">
              <div className={`text-2xl font-bold mb-1 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                {schoolInfo.instructors}
              </div>
              <div className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Müəllim
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Information */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <Icon name="phone" size={20} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
            </div>
            <h3 className={`font-bold text-lg ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Əlaqə məlumatları
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Icon name="map-pin" size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {schoolInfo.address}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="phone" size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              <a href={`tel:${schoolInfo.phone}`} className={`text-sm ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {schoolInfo.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="mail" size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              <a href={`mailto:${schoolInfo.email}`} className={`text-sm ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {schoolInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="globe" size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              <a href={`https://${schoolInfo.website}`} target="_blank" rel="noopener noreferrer" className={`text-sm ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {schoolInfo.website}
              </a>
            </div>
          </div>
        </Card>

        {/* Features */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
            }`}>
              <Icon name="star" size={20} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
            </div>
            <h3 className={`font-bold text-lg ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Xüsusiyyətlər
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {schoolInfo.features.map((feature, index) => (
              <div key={index} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100'
              }`}>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
                  isDarkMode ? 'bg-emerald-600/30 text-emerald-400' : 'bg-emerald-200 text-emerald-700'
                }`}>
                  ✓
                </div>
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* License Categories */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-orange-600/20' : 'bg-orange-100'
            }`}>
              <Icon name="award" size={20} className={isDarkMode ? 'text-orange-400' : 'text-orange-600'} />
            </div>
            <h3 className={`font-bold text-lg ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Sürücülük kateqoriyaları
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {schoolInfo.licenses.map((license, index) => (
              <div key={index} className={`p-4 rounded-xl text-center font-bold border-2 transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700 text-gray-200' 
                  : 'bg-gray-50 border-gray-200 text-gray-800'
              }`}>
                {license}
              </div>
            ))}
          </div>
        </Card>

        {/* Social Media */}
        <Card variant="elevated" padding="lg" className="animate-fadeInUp" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-pink-600/20' : 'bg-pink-100'
            }`}>
              <Icon name="share-2" size={20} className={isDarkMode ? 'text-pink-400' : 'text-pink-600'} />
            </div>
            <h3 className={`font-bold text-lg ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Sosial şəbəkələr
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105 ${
              isDarkMode ? 'bg-blue-900/30 hover:bg-blue-900/50' : 'bg-blue-50 hover:bg-blue-100'
            }`}>
              <EmojiIcon emoji="📘" size={24} />
              <span className={`text-xs font-medium ${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                Facebook
              </span>
            </button>
            <button className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105 ${
              isDarkMode ? 'bg-pink-900/30 hover:bg-pink-900/50' : 'bg-pink-50 hover:bg-pink-100'
            }`}>
              <EmojiIcon emoji="📷" size={24} />
              <span className={`text-xs font-medium ${
                isDarkMode ? 'text-pink-300' : 'text-pink-700'
              }`}>
                Instagram
              </span>
            </button>
            <button className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105 ${
              isDarkMode ? 'bg-red-900/30 hover:bg-red-900/50' : 'bg-red-50 hover:bg-red-100'
            }`}>
              <EmojiIcon emoji="📹" size={24} />
              <span className={`text-xs font-medium ${
                isDarkMode ? 'text-red-300' : 'text-red-700'
              }`}>
                YouTube
              </span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
