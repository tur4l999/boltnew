import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

interface PartnerSchool {
  id: string;
  name: string;
  logo: string;
  description: string;
  languages: string[];
  specialties: string[];
  location: string;
  contact: string;
  website?: string;
}

export function PartnerSchoolsScreen() {
  const { goBack, isDarkMode } = useApp();
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

  const partnerSchools: PartnerSchool[] = [
    {
      id: '1',
      name: 'Avto Məktəb "Sürücü"',
      logo: '🚗',
      description: 'Bakının ən yaxşı sürücülük məktəblərindən biri. 20 illik təcrübə və peşəkar müəllimlər.',
      languages: ['Azərbaycan dili', 'Rus dili', 'İngilis dili'],
      specialties: ['B kateqoriya', 'C kateqoriya', 'D kateqoriya'],
      location: 'Bakı şəhəri, Nəsimi rayonu',
      contact: '+994 50 123 45 67'
    },
    {
      id: '2',
      name: 'Driving Academy "Əsas"',
      logo: '🏫',
      description: 'Müasir avadanlıq və innovativ tədris metodları ilə təchiz olunmuş məktəb.',
      languages: ['Azərbaycan dili', 'Rus dili'],
      specialties: ['B kateqoriya', 'Moto', 'Avtomat transmissiya'],
      location: 'Bakı şəhəri, Yasamal rayonu',
      contact: '+994 55 234 56 78',
      website: 'www.drivingacademy.az'
    },
    {
      id: '3',
      name: 'Pro Driving School',
      logo: '🎓',
      description: 'Beynəlxalq standartlara uyğun təhsil və sertifikatlaşdırma.',
      languages: ['Azərbaycan dili', 'İngilis dili', 'Türk dili'],
      specialties: ['B kateqoriya', 'C kateqoriya', 'Təhlükəsizlik təlimi'],
      location: 'Bakı şəhəri, Xətai rayonu',
      contact: '+994 51 345 67 89',
      website: 'www.prodrive.az'
    },
    {
      id: '4',
      name: 'Auto Master Academy',
      logo: '🏆',
      description: 'Yüksək keçid faizi və fərdi yanaşma ilə tanınan məktəb.',
      languages: ['Azərbaycan dili', 'Rus dili', 'İngilis dili', 'Türk dili'],
      specialties: ['B kateqoriya', 'Avtomat transmissiya', 'VIP təlim'],
      location: 'Bakı şəhəri, Nərimanov rayonu',
      contact: '+994 70 456 78 90',
      website: 'www.automaster.az'
    },
    {
      id: '5',
      name: 'Sürücülük Mərkəzi "Qafqaz"',
      logo: '🚙',
      description: 'Əsas və əlavə kateqoriyalar üzrə geniş təlim proqramları.',
      languages: ['Azərbaycan dili', 'Rus dili'],
      specialties: ['B kateqoriya', 'C kateqoriya', 'D kateqoriya', 'E kateqoriya'],
      location: 'Bakı şəhəri, Sabunçu rayonu',
      contact: '+994 55 567 89 01'
    },
    {
      id: '6',
      name: 'Smart Drive School',
      logo: '🌟',
      description: 'Virtual simulyatorlar və interaktiv təlim sistemləri ilə təchiz edilmiş müasir məktəb.',
      languages: ['Azərbaycan dili', 'İngilis dili'],
      specialties: ['B kateqoriya', 'Avtomat transmissiya', 'Elektromobil təlimi'],
      location: 'Bakı şəhəri, Binəqədi rayonu',
      contact: '+994 50 678 90 12',
      website: 'www.smartdrive.az'
    }
  ];

  const toggleSchool = (schoolId: string) => {
    setSelectedSchool(selectedSchool === schoolId ? null : schoolId);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
    } pt-11`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-400/10'
        }`}></div>
        <div className={`absolute bottom-20 left-10 w-32 h-32 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-green-500/5' : 'bg-green-400/10'
        }`}></div>
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
          <div>
            <h1 className={`text-2xl font-black transition-colors duration-200 bg-gradient-to-r ${
              isDarkMode ? 'from-blue-400 to-green-400' : 'from-blue-600 to-green-600'
            } bg-clip-text text-transparent`}>
              Digər Məktəblər
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Əməkdaşlıq etdiyimiz məktəblər
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp">
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <EmojiIcon emoji="🤝" size={24} />
            </div>
            <div>
              <h3 className={`font-bold text-base mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Tərəfdaş Məktəblər
              </h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Bu məktəblərlə əməkdaşlıq edirik. Hər birinin xüsusiyyətlərini öyrənmək üçün üzərinə klikləyin.
              </p>
            </div>
          </div>
        </Card>

        {/* Schools Grid */}
        <div className="space-y-4">
          {partnerSchools.map((school, index) => (
            <Card
              key={school.id}
              variant="elevated"
              className={`overflow-hidden transition-all duration-300 cursor-pointer animate-fadeInUp ${
                selectedSchool === school.id ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{ animationDelay: `${(index + 1) * 50}ms` }}
              onClick={() => toggleSchool(school.id)}
            >
              {/* School Header */}
              <div className="p-4 flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
                }`}>
                  {school.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-base mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {school.name}
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
                    {school.description}
                  </p>
                </div>
                <div className={`text-2xl transition-transform duration-300 ${
                  selectedSchool === school.id ? 'rotate-90' : ''
                }`}>
                  →
                </div>
              </div>

              {/* Expanded Details */}
              {selectedSchool === school.id && (
                <div className={`border-t px-4 pb-4 pt-3 space-y-3 animate-fadeInUp ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  {/* Languages */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <EmojiIcon emoji="🗣️" size={16} />
                      <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Dillər:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {school.languages.map((lang, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isDarkMode 
                              ? 'bg-blue-900/30 text-blue-300' 
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <EmojiIcon emoji="📋" size={16} />
                      <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        İxtisaslar:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {school.specialties.map((spec, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isDarkMode 
                              ? 'bg-green-900/30 text-green-300' 
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-2">
                    <EmojiIcon emoji="📍" size={16} />
                    <div className="flex-1">
                      <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Ünvan:
                      </span>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {school.location}
                      </p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center gap-2">
                    <EmojiIcon emoji="📞" size={16} />
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Əlaqə:
                    </span>
                    <a 
                      href={`tel:${school.contact}`}
                      className={`text-xs font-medium ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      } hover:underline`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {school.contact}
                    </a>
                  </div>

                  {/* Website */}
                  {school.website && (
                    <div className="flex items-center gap-2">
                      <EmojiIcon emoji="🌐" size={16} />
                      <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Website:
                      </span>
                      <a 
                        href={`https://${school.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-medium ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        } hover:underline`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {school.website}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Bottom Info */}
        <Card variant="elevated" padding="lg" className="mt-6 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <div className="text-center">
            <div className="text-3xl mb-3">💼</div>
            <h3 className={`font-bold text-base mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Əməkdaşlıq
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Məktəbiniz də bizimlə əməkdaşlıq etmək istəyirsə, bizimlə əlaqə saxlayın.
            </p>
            <button
              onClick={() => alert('Əlaqə forması (demo)')}
              className={`mt-4 px-6 py-2 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
              }`}
            >
              Əlaqə saxlayın
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
