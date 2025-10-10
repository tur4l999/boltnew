import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ScaleIn } from '../ui/ScaleIn';
import { EmojiIcon } from '../ui/EmojiIcon';

// Azerbaijan regions for dropdown
const AZERBAIJAN_REGIONS = [
  'Bakı', 'Abşeron', 'Ağcabədi', 'Ağdam', 'Ağdaş', 'Ağstafa', 'Ağsu',
  'Astara', 'Balakən', 'Bərdə', 'Beyləqan', 'Biləsuvar', 'Cəbrayıl',
  'Cəlilabad', 'Culfa', 'Daşkəsən', 'Füzuli', 'Gədəbəy', 'Gəncə',
  'Goranboy', 'Göyçay', 'Göygöl', 'Hacıqabul', 'Xankəndi', 'Xaçmaz',
  'Xırdalan', 'Xocalı', 'Xocavənd', 'İmişli', 'İsmayıllı', 'Kəlbəcər',
  'Kürdəmir', 'Laçın', 'Lənkəran', 'Lerik', 'Masallı', 'Mingəçevir',
  'Naftalan', 'Naxçıvan', 'Neftçala', 'Oğuz', 'Ordubad', 'Qəbələ',
  'Qax', 'Qazax', 'Qobustan', 'Quba', 'Qubadlı', 'Qusar', 'Saatlı',
  'Sabirabad', 'Şəki', 'Salyan', 'Şəmkir', 'Şirvan', 'Siyəzən',
  'Sumqayıt', 'Şuşa', 'Tərtər', 'Tovuz', 'Ucar', 'Yardımlı',
  'Yevlax', 'Zəngilan', 'Zərdab'
];

type CertificateType = 'A' | 'B' | 'C' | 'D' | 'E' | 'AB' | 'AC' | 'BC' | 'ABC' | 'BE' | 'CE' | 'DE';

interface LicenseRequirement {
  age: number;
  experience?: {
    type: string;
    years: number;
  };
  additionalRequirements?: {
    id: string;
    text: string;
  }[];
}

const LICENSE_REQUIREMENTS: Record<CertificateType, LicenseRequirement> = {
  'A': { age: 18 },
  'B': { age: 18 },
  'C': { age: 18 },
  'D': { 
    age: 23, 
    experience: { type: 'B və ya C', years: 5 },
    additionalRequirements: [
      { id: 'd_car_ownership', text: 'Son 5 il ərzində adıma avtomobil olub (Etibarnamə qəbul edilir, lakin sonradan başqasına etibarnamə verilməməlidir)' },
      { id: 'd_no_accidents', text: 'Son 2 il ərzində qəza törədib bədən xəsarəti vurmamışam' },
      { id: 'd_no_alcohol', text: 'Son 2 il ərzində spirtli içki ilə avtomobil sürməmişəm' },
      { id: 'd_no_drugs', text: 'Son 2 il ərzində narkotik maddə istifadə edərək avtomobil sürməmişəm' }
    ]
  },
  'E': { age: 18 },
  'AB': { age: 18 },
  'AC': { age: 18 },
  'BC': { age: 18 },
  'ABC': { age: 18 },
  'BE': { 
    age: 19, 
    experience: { type: 'B', years: 1 }
  },
  'CE': { 
    age: 21, 
    experience: { type: 'C', years: 3 }
  },
  'DE': { 
    age: 26, 
    experience: { type: 'D', years: 3 },
    additionalRequirements: [
      { id: 'de_bus_ownership', text: 'Adıma avtobus olub və ya təşkilatdan avtobus sürmə haqqında arayış var' }
    ]
  }
};

interface ApplicationFormScreenProps {
  selectedTypes: CertificateType[];
}

interface RequirementConfirmations {
  [key: string]: boolean;
}

export function ApplicationFormScreen({ selectedTypes }: ApplicationFormScreenProps) {
  const { isDarkMode, goBack } = useApp();
  const [region, setRegion] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [requirementConfirmations, setRequirementConfirmations] = useState<RequirementConfirmations>({});
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const certificateLabels: Record<CertificateType, { label: string; emoji: string }> = {
    'A': { label: 'A kateqoriyası', emoji: '🏍️' },
    'B': { label: 'B kateqoriyası', emoji: '🚗' },
    'C': { label: 'C kateqoriyası', emoji: '🚛' },
    'D': { label: 'D kateqoriyası', emoji: '🚌' },
    'E': { label: 'E kateqoriyası', emoji: '🚚' },
    'AB': { label: 'A+B kateqoriyası', emoji: '🏍️🚗' },
    'AC': { label: 'A+C kateqoriyası', emoji: '🏍️🚛' },
    'BC': { label: 'B+C kateqoriyası', emoji: '🚗🚛' },
    'ABC': { label: 'A+B+C kateqoriyası', emoji: '🏍️🚗🚛' },
    'BE': { label: 'B+E kateqoriyası', emoji: '🚗🚚' },
    'CE': { label: 'C+E kateqoriyası', emoji: '🚛🚚' },
    'DE': { label: 'D+E kateqoriyası', emoji: '🚌🚚' }
  };

  const handleSubmit = () => {
    if (!region || !fullAddress || !termsAgreed) {
      return;
    }
    
    // Check if all required checkboxes are checked
    const allRequirementsConfirmed = selectedTypes.every((type) => {
      const requirements = LICENSE_REQUIREMENTS[type];
      if (!requirements.additionalRequirements || requirements.additionalRequirements.length === 0) {
        return true;
      }
      return requirements.additionalRequirements.every((req) => requirementConfirmations[req.id]);
    });
    
    if (!allRequirementsConfirmed) {
      return;
    }
    
    setShowSuccessNotification(true);
    
    // Hide notification and go back after 2 seconds
    setTimeout(() => {
      setShowSuccessNotification(false);
      goBack();
    }, 2000);
  };

  const allRequirementsConfirmed = selectedTypes.every((type) => {
    const requirements = LICENSE_REQUIREMENTS[type];
    if (!requirements.additionalRequirements || requirements.additionalRequirements.length === 0) {
      return true;
    }
    return requirements.additionalRequirements.every((req) => requirementConfirmations[req.id]);
  });
  
  const isFormValid = region && fullAddress && termsAgreed && allRequirementsConfirmed;

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

      <div className="relative z-10 p-4 pb-24 max-w-2xl mx-auto">
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
              isDarkMode ? 'from-blue-400 to-indigo-400' : 'from-blue-600 to-indigo-600'
            } bg-clip-text text-transparent`}>
              Müraciət Forması
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Məlumatları doldurun
            </p>
          </div>
        </div>

        {/* Selected Categories */}
        <ScaleIn delay={100}>
          <div className={`rounded-2xl p-4 mb-4 ${
            isDarkMode ? 'bg-gray-800/60' : 'bg-white/80'
          }`}>
            <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Seçilmiş Kateqoriyalar
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedTypes.map((type) => {
                const info = certificateLabels[type];
                return (
                  <div
                    key={type}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium flex items-center gap-2 ${
                      isDarkMode 
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50' 
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    <span>{info?.emoji}</span>
                    <span>{info?.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </ScaleIn>

        {/* Requirements Section */}
        <ScaleIn delay={200}>
          <div className={`rounded-2xl border-2 p-4 mb-4 ${
            isDarkMode 
              ? 'bg-blue-900/20 border-blue-700/50' 
              : 'bg-blue-50/50 border-blue-200'
          }`}>
            <h4 className={`text-sm font-bold mb-3 flex items-center gap-2 ${
              isDarkMode ? 'text-blue-300' : 'text-blue-800'
            }`}>
              <span>📋</span>
              <span>Tələblər</span>
            </h4>
            
            <div className="space-y-3">
              {selectedTypes.map((type) => {
                const requirements = LICENSE_REQUIREMENTS[type];
                const hasAdditionalReqs = requirements.additionalRequirements && requirements.additionalRequirements.length > 0;
                
                return (
                  <div key={type} className={`rounded-xl p-3 ${
                    isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'
                  }`}>
                    <div className={`font-semibold mb-1.5 text-xs ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {type} kateqoriyası:
                    </div>
                    
                    <div className={`text-xs mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      • Yaş: <strong>{requirements.age}</strong>
                      {requirements.experience && (
                        <span> | <strong>{requirements.experience.type}</strong> üzrə <strong>{requirements.experience.years} il</strong> təcrübə</span>
                      )}
                    </div>
                    
                    {hasAdditionalReqs && (
                      <div className="mt-2 pt-2 border-t border-gray-600/20 space-y-2">
                        {requirements.additionalRequirements!.map((req) => (
                          <div key={req.id} className="flex items-start gap-2">
                            <button
                              onClick={() => {
                                setRequirementConfirmations((prev) => ({
                                  ...prev,
                                  [req.id]: !prev[req.id]
                                }));
                              }}
                              className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                                requirementConfirmations[req.id]
                                  ? 'bg-emerald-500 border-emerald-500'
                                  : isDarkMode ? 'border-gray-600' : 'border-gray-400'
                              }`}
                            >
                              {requirementConfirmations[req.id] && (
                                <span className="text-white text-[10px]">✓</span>
                              )}
                            </button>
                            <span className={`text-xs leading-relaxed ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </ScaleIn>

        {/* Region Selection */}
        <ScaleIn delay={300}>
          <div className={`rounded-2xl p-4 mb-4 ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/80'}`}>
            <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Rayon/Şəhər
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border-2 text-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              }`}
            >
              <option value="">Seçin</option>
              {AZERBAIJAN_REGIONS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </ScaleIn>

        {/* Full Address */}
        <ScaleIn delay={400}>
          <div className={`rounded-2xl p-4 mb-4 ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/80'}`}>
            <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Tam Ünvan
            </label>
            <textarea
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              placeholder="Dəqiq ünvanınızı daxil edin..."
              rows={3}
              className={`w-full px-3 py-2.5 rounded-xl border-2 text-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 resize-none ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              }`}
            />
          </div>
        </ScaleIn>

        {/* Terms Agreement */}
        <ScaleIn delay={500}>
          <div className={`rounded-2xl p-4 mb-4 ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/80'}`}>
            <div className="flex items-start gap-3">
              <button
                onClick={() => setTermsAgreed(!termsAgreed)}
                className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                  termsAgreed
                    ? 'bg-emerald-500 border-emerald-500'
                    : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                }`}
              >
                {termsAgreed && (
                  <span className="text-white text-xs">✓</span>
                )}
              </button>
              <div className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Şərtlərlə tanış oldum və qəbul edirəm
              </div>
            </div>
          </div>
        </ScaleIn>

        {/* Submit Button */}
        <ScaleIn delay={600}>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full py-3.5 rounded-2xl font-bold text-base transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              isFormValid
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                : isDarkMode 
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-gray-200 text-gray-500'
            }`}
          >
            Müraciət Göndər
          </button>
        </ScaleIn>
      </div>

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
