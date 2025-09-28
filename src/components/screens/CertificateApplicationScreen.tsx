import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { FadeInUp } from '../ui/FadeInUp';
import { SlideTransition } from '../ui/SlideTransition';
import { ScaleIn } from '../ui/ScaleIn';
import { EmojiIcon } from '../ui/EmojiIcon';

// Azerbaijan regions for dropdown
const AZERBAIJAN_REGIONS = [
  'Bakı',
  'Abşeron',
  'Ağcabədi',
  'Ağdam',
  'Ağdaş',
  'Ağstafa',
  'Ağsu',
  'Astara',
  'Balakən',
  'Bərdə',
  'Beyləqan',
  'Biləsuvar',
  'Cəbrayıl',
  'Cəlilabad',
  'Culfa',
  'Daşkəsən',
  'Füzuli',
  'Gədəbəy',
  'Gəncə',
  'Goranboy',
  'Göyçay',
  'Göygöl',
  'Hacıqabul',
  'Xankəndi',
  'Xaçmaz',
  'Xırdalan',
  'Xocalı',
  'Xocavənd',
  'İmişli',
  'İsmayıllı',
  'Kəlbəcər',
  'Kürdəmir',
  'Laçın',
  'Lənkəran',
  'Lerik',
  'Masallı',
  'Mingəçevir',
  'Naftalan',
  'Naxçıvan',
  'Neftçala',
  'Oğuz',
  'Ordubad',
  'Qəbələ',
  'Qax',
  'Qazax',
  'Qobustan',
  'Quba',
  'Qubadlı',
  'Qusar',
  'Saatlı',
  'Sabirabad',
  'Şəki',
  'Salyan',
  'Şəmkir',
  'Şirvan',
  'Siyəzən',
  'Sumqayıt',
  'Şuşa',
  'Tərtər',
  'Tovuz',
  'Ucar',
  'Yardımlı',
  'Yevlax',
  'Zəngilan',
  'Zərdab'
];

type CertificateType = 'A' | 'B' | 'C' | 'D' | 'E' | 'AB' | 'AC' | 'BC' | 'ABC' | 'BE' | 'CE' | 'DE';

interface ApplicationFormData {
  selectedTypes: CertificateType[];
  region: string;
  fullAddress: string;
  termsAgreed: boolean;
}

export function CertificateApplicationScreen() {
  const { isDarkMode, goBack } = useApp();
  const [selectedTypes, setSelectedTypes] = useState<CertificateType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<ApplicationFormData>({
    selectedTypes: [],
    region: '',
    fullAddress: '',
    termsAgreed: false
  });
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const applicationButtonRef = useRef<HTMLButtonElement>(null);

  const certificateOptions: { type: CertificateType; label: string; description: string; emoji: string }[] = [
    { type: 'A', label: 'A kateqoriyası', description: 'Motosikl, moped', emoji: '🏍️' },
    { type: 'B', label: 'B kateqoriyası', description: 'Yüngül avtomobil', emoji: '🚗' },
    { type: 'C', label: 'C kateqoriyası', description: 'Yük avtomobili', emoji: '🚛' },
    { type: 'D', label: 'D kateqoriyası', description: 'Avtobus', emoji: '🚌' },
    { type: 'E', label: 'E kateqoriyası', description: 'Qoşqu ilə', emoji: '🚚' },
    { type: 'AB', label: 'A+B kateqoriyası', description: 'Motosikl və avtomobil', emoji: '🏍️🚗' },
    { type: 'AC', label: 'A+C kateqoriyası', description: 'Motosikl və yük avtomobili', emoji: '🏍️🚛' },
    { type: 'BC', label: 'B+C kateqoriyası', description: 'Avtomobil və yük avtomobili', emoji: '🚗🚛' },
    { type: 'ABC', label: 'A+B+C kateqoriyası', description: 'Motosikl, avtomobil və yük avtomobili', emoji: '🏍️🚗🚛' },
    { type: 'BE', label: 'B+E kateqoriyası', description: 'Avtomobil və qoşqu', emoji: '🚗🚚' },
    { type: 'CE', label: 'C+E kateqoriyası', description: 'Yük avtomobili və qoşqu', emoji: '🚛🚚' },
    { type: 'DE', label: 'D+E kateqoriyası', description: 'Avtobus və qoşqu', emoji: '🚌🚚' }
  ];

  const handleTypeSelection = (type: CertificateType) => {
    setSelectedTypes((prev: CertificateType[]) => {
      if (prev.includes(type)) {
        return prev.filter((t: CertificateType) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleApplicationClick = () => {
    setFormData((prev: ApplicationFormData) => ({ ...prev, selectedTypes }));
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!formData.region || !formData.fullAddress || !formData.termsAgreed) {
      return;
    }
    
    setShowModal(false);
    setShowSuccessNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 3000);
    
    // Reset form
    setSelectedTypes([]);
    setFormData({
      selectedTypes: [],
      region: '',
      fullAddress: '',
      termsAgreed: false
    });
  };

  // Auto-scroll to application button when selections are made
  useEffect(() => {
    if (selectedTypes.length > 0 && applicationButtonRef.current) {
      const buttonRect = applicationButtonRef.current.getBoundingClientRect();
      const isVisible = buttonRect.bottom <= window.innerHeight && buttonRect.top >= 0;
      
      if (!isVisible) {
        applicationButtonRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }
  }, [selectedTypes]);

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
    } pt-11`}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-400/10'
        }`}></div>
        <div className={`absolute bottom-20 left-10 w-32 h-32 rounded-full blur-2xl animate-pulse ${
          isDarkMode ? 'bg-emerald-500/5' : 'bg-emerald-400/10'
        }`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 p-4 pb-24">
        {/* Enhanced Header */}
        <div className="flex items-center gap-4 mb-8">
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
              isDarkMode ? 'from-blue-400 to-indigo-400' : 'from-blue-600 to-indigo-600'
            } bg-clip-text text-transparent`}>
              Şəhadətnamə Müraciəti
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Kateqoriya seçin və müraciət edin
            </p>
          </div>
        </div>

        {/* Certificate Types Selection Header */}
        <div className="mb-4">
          <h3 className={`text-xl font-black mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Kateqoriya Seçin
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Bir və ya bir neçə kateqoriya seçə bilərsiniz
          </p>
        </div>

        {/* Certificate Types Selection */}
        <SlideTransition direction="up" delay={100}>
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-3">
              {certificateOptions.map((option, index) => (
                <ScaleIn key={option.type} delay={200 + (index * 30)}>
                  <button
                    onClick={() => handleTypeSelection(option.type)}
                    className={`relative w-full h-32 p-4 rounded-3xl border transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      selectedTypes.includes(option.type)
                        ? isDarkMode
                          ? 'bg-gradient-to-br from-emerald-600 to-green-600 border-emerald-500 shadow-lg text-white'
                          : 'bg-gradient-to-br from-emerald-500 to-green-500 border-emerald-400 shadow-lg text-white'
                        : isDarkMode
                          ? 'bg-gray-800/60 border-gray-700/50 hover:border-gray-600 text-gray-200'
                          : 'bg-white/80 border-gray-200 hover:border-gray-300 text-gray-800'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-1 h-full text-center">
                      <div className="text-xl">
                        {option.emoji}
                      </div>
                      <div className={`font-bold text-sm leading-tight ${
                        selectedTypes.includes(option.type)
                          ? 'text-white'
                          : isDarkMode ? 'text-gray-200' : 'text-gray-800'
                      }`}>
                        {option.label}
                      </div>
                      <div className={`text-xs leading-tight opacity-80 ${
                        selectedTypes.includes(option.type)
                          ? 'text-white/90'
                          : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {option.description}
                      </div>
                    </div>
                    {selectedTypes.includes(option.type) && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                  </button>
                </ScaleIn>
              ))}
            </div>
          </div>
        </SlideTransition>

        {/* Application Button */}
        {selectedTypes.length > 0 && (
          <ScaleIn delay={500}>
            <div className="mt-6">
              <button
                ref={applicationButtonRef}
                onClick={handleApplicationClick}
                className="w-full rounded-3xl p-6 flex items-center gap-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 relative z-10">
                  <EmojiIcon emoji="📝" size={24} className="text-white" />
                </div>
                <div className="text-left font-black text-lg leading-tight relative z-10 flex-1">
                  Müraciət Et
                  <div className="text-sm font-medium opacity-90">
                    {selectedTypes.length} kateqoriya seçildi
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm transition-transform duration-300 group-hover:translate-x-1">
                  →
                </div>
              </button>
            </div>
          </ScaleIn>
        )}
      </div>

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          
          {/* Modal */}
          <ScaleIn delay={0}>
            <div className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800 to-slate-800 border border-gray-700/50' 
                : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200/50'
            }`}>
              {/* Modal Header */}
              <div className={`sticky top-0 z-10 backdrop-blur-lg border-b p-6 flex items-center justify-between ${
                isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
              }`}>
                <div>
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Müraciət Formu
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Məlumatları doldurun
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Selected Categories */}
                <div>
                  <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Seçilmiş Kateqoriyalar:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedTypes.map((type: CertificateType) => {
                      const option = certificateOptions.find(opt => opt.type === type);
                      return (
                        <div 
                          key={type}
                          className={`px-3 py-2 rounded-xl text-sm font-medium ${
                            isDarkMode 
                              ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700/50' 
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {option?.label}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Region Selection */}
                <div>
                  <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Qeydiyyat ünvanınızı seçin:
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData((prev: ApplicationFormData) => ({ ...prev, region: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-emerald-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                    }`}
                  >
                    <option value="">Bölgə seçin</option>
                    {AZERBAIJAN_REGIONS.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                {/* Full Address */}
                <div>
                  <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Tam ünvan:
                  </label>
                  <textarea
                    value={formData.fullAddress}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData((prev: ApplicationFormData) => ({ ...prev, fullAddress: e.target.value }))}
                    placeholder="Tam ünvanınızı daxil edin..."
                    rows={3}
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-emerald-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                    }`}
                  />
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => setFormData((prev: ApplicationFormData) => ({ ...prev, termsAgreed: !prev.termsAgreed }))}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                      formData.termsAgreed
                        ? 'bg-emerald-500 border-emerald-500'
                        : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                    }`}
                  >
                    {formData.termsAgreed && (
                      <span className="text-white text-sm">✓</span>
                    )}
                  </button>
                  <label className={`text-sm leading-relaxed cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Şərtlərlə tanış oldum və qəbul edirəm
                  </label>
                </div>

                {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.region || !formData.fullAddress || !formData.termsAgreed}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      formData.region && formData.fullAddress && formData.termsAgreed
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                        : isDarkMode 
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                  Müraciət Göndər
                </button>
              </div>
            </div>
          </ScaleIn>
        </div>
      )}

      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="fixed top-4 left-4 right-4 z-50">
          <ScaleIn delay={0}>
            <div className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-all duration-300 shadow-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-emerald-900/90 to-green-900/90 border-emerald-700/50 backdrop-blur-lg' 
                : 'bg-gradient-to-r from-emerald-50/90 to-green-50/90 border-emerald-200/50 backdrop-blur-lg'
            }`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isDarkMode ? 'bg-emerald-800/50' : 'bg-emerald-100/80'
              }`}>
                <EmojiIcon emoji="✅" size={24} />
              </div>
              <div className="flex-1">
                <div className={`text-sm font-bold mb-1 ${
                  isDarkMode ? 'text-emerald-200' : 'text-emerald-900'
                }`}>
                  Müraciət Göndərildi!
                </div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-emerald-300/80' : 'text-emerald-700/80'
                }`}>
                  Müraciətiniz uğurla qəbul edildi və emal ediləcək.
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>
      )}
    </div>
  );
}