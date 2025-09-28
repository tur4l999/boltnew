import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Region {
  id: string;
  name: string;
  districts: string[];
}

const categories: Category[] = [
  { id: 'A', name: 'categoryA', description: 'Motosikl və moped', icon: '🏍️' },
  { id: 'B', name: 'categoryB', description: 'Avtomobil (3500 kq-a qədər)', icon: '🚗' },
  { id: 'C', name: 'categoryC', description: 'Yük avtomobili (3500 kq-dan çox)', icon: '🚛' },
  { id: 'D', name: 'categoryD', description: 'Avtobus', icon: '🚌' },
  { id: 'E', name: 'categoryE', description: 'Qoşqu', icon: '🚗‍💨' },
  { id: 'AB', name: 'categoryAB', description: 'A + B kateqoriyaları', icon: '🏍️🚗' },
  { id: 'AC', name: 'categoryAC', description: 'A + C kateqoriyaları', icon: '🏍️🚛' },
  { id: 'BC', name: 'categoryBC', description: 'B + C kateqoriyaları', icon: '🚗🚛' },
  { id: 'ABC', name: 'categoryABC', description: 'A + B + C kateqoriyaları', icon: '🏍️🚗🚛' },
  { id: 'BE', name: 'categoryBE', description: 'B + E kateqoriyaları', icon: '🚗🚚' },
  { id: 'CE', name: 'categoryCE', description: 'C + E kateqoriyaları', icon: '🚛🚚' },
  { id: 'DE', name: 'categoryDE', description: 'D + E kateqoriyaları', icon: '🚌🚚' },
];

const regions: Region[] = [
  {
    id: 'baku',
    name: 'Bakı',
    districts: ['Binəqədi', 'Nərimanov', 'Nəsimi', 'Sabunçu', 'Səbail', 'Suraxanı', 'Xətai', 'Yasamal']
  },
  {
    id: 'ganja',
    name: 'Gəncə',
    districts: ['Kəpəz', 'Nizami']
  },
  {
    id: 'sumgayit',
    name: 'Sumqayıt',
    districts: ['Sumqayıt şəhəri']
  },
  {
    id: 'mingachevir',
    name: 'Mingəçevir',
    districts: ['Mingəçevir şəhəri']
  },
  {
    id: 'shaki',
    name: 'Şəki',
    districts: ['Şəki şəhəri']
  },
  {
    id: 'lankaran',
    name: 'Lənkəran',
    districts: ['Lənkəran şəhəri']
  },
  {
    id: 'nakhchivan',
    name: 'Naxçıvan',
    districts: ['Naxçıvan şəhəri']
  },
  {
    id: 'shirvan',
    name: 'Şirvan',
    districts: ['Şirvan şəhəri']
  },
  {
    id: 'absheron',
    name: 'Abşeron',
    districts: ['Xırdalan', 'Masazır', 'Mehdiabad', 'Saray', 'Ceyranbatan', 'Digah', 'Fatmayı', 'Görədil', 'Hökməli', 'Məmmədli', 'Novxanı', 'Pirəkəşkül', 'Qobu', 'Qobuüstü', 'Qurd dərəsi', 'Türkan', 'Ümid', 'Zabrat', 'Zirə']
  },
  {
    id: 'goychay',
    name: 'Göyçay',
    districts: ['Göyçay şəhəri']
  },
  {
    id: 'agdam',
    name: 'Ağdam',
    districts: ['Ağdam şəhəri']
  },
  {
    id: 'agjabadi',
    name: 'Ağcabədi',
    districts: ['Ağcabədi şəhəri']
  },
  {
    id: 'agstafa',
    name: 'Ağstafa',
    districts: ['Ağstafa şəhəri']
  },
  {
    id: 'agsu',
    name: 'Ağsu',
    districts: ['Ağsu şəhəri']
  },
  {
    id: 'astara',
    name: 'Astara',
    districts: ['Astara şəhəri']
  },
  {
    id: 'barda',
    name: 'Bərdə',
    districts: ['Bərdə şəhəri']
  },
  {
    id: 'beylagan',
    name: 'Beyləqan',
    districts: ['Beyləqan şəhəri']
  },
  {
    id: 'bilasuvar',
    name: 'Biləsuvar',
    districts: ['Biləsuvar şəhəri']
  },
  {
    id: 'gabala',
    name: 'Qəbələ',
    districts: ['Qəbələ şəhəri']
  },
  {
    id: 'gadabay',
    name: 'Gədəbəy',
    districts: ['Gədəbəy şəhəri']
  },
  {
    id: 'goranboy',
    name: 'Goranboy',
    districts: ['Goranboy şəhəri']
  },
  {
    id: 'goygol',
    name: 'Göygöl',
    districts: ['Göygöl şəhəri']
  },
  {
    id: 'hajigabul',
    name: 'Hacıqabul',
    districts: ['Hacıqabul şəhəri']
  },
  {
    id: 'imishli',
    name: 'İmişli',
    districts: ['İmişli şəhəri']
  },
  {
    id: 'ismayilli',
    name: 'İsmayıllı',
    districts: ['İsmayıllı şəhəri']
  },
  {
    id: 'jalilabad',
    name: 'Cəlilabad',
    districts: ['Cəlilabad şəhəri']
  },
  {
    id: 'julfa',
    name: 'Culfa',
    districts: ['Culfa şəhəri']
  },
  {
    id: 'kalbajar',
    name: 'Kəlbəcər',
    districts: ['Kəlbəcər şəhəri']
  },
  {
    id: 'kurdamir',
    name: 'Kürdəmir',
    districts: ['Kürdəmir şəhəri']
  },
  {
    id: 'lachin',
    name: 'Laçın',
    districts: ['Laçın şəhəri']
  },
  {
    id: 'lerik',
    name: 'Lerik',
    districts: ['Lerik şəhəri']
  },
  {
    id: 'masalli',
    name: 'Masallı',
    districts: ['Masallı şəhəri']
  },
  {
    id: 'neftchala',
    name: 'Neftçala',
    districts: ['Neftçala şəhəri']
  },
  {
    id: 'oguz',
    name: 'Oğuz',
    districts: ['Oğuz şəhəri']
  },
  {
    id: 'ordubad',
    name: 'Ordubad',
    districts: ['Ordubad şəhəri']
  },
  {
    id: 'qabala',
    name: 'Qəbələ',
    districts: ['Qəbələ şəhəri']
  },
  {
    id: 'qakh',
    name: 'Qax',
    districts: ['Qax şəhəri']
  },
  {
    id: 'qazakh',
    name: 'Qazax',
    districts: ['Qazax şəhəri']
  },
  {
    id: 'qobustan',
    name: 'Qobustan',
    districts: ['Qobustan şəhəri']
  },
  {
    id: 'quba',
    name: 'Quba',
    districts: ['Quba şəhəri']
  },
  {
    id: 'qubadli',
    name: 'Qubadlı',
    districts: ['Qubadlı şəhəri']
  },
  {
    id: 'qusar',
    name: 'Qusar',
    districts: ['Qusar şəhəri']
  },
  {
    id: 'saatli',
    name: 'Saatlı',
    districts: ['Saatlı şəhəri']
  },
  {
    id: 'sabirabad',
    name: 'Sabirabad',
    districts: ['Sabirabad şəhəri']
  },
  {
    id: 'sadarak',
    name: 'Sədərək',
    districts: ['Sədərək şəhəri']
  },
  {
    id: 'salyan',
    name: 'Salyan',
    districts: ['Salyan şəhəri']
  },
  {
    id: 'samukh',
    name: 'Samux',
    districts: ['Samux şəhəri']
  },
  {
    id: 'shahbuz',
    name: 'Şahbuz',
    districts: ['Şahbuz şəhəri']
  },
  {
    id: 'shamakhi',
    name: 'Şamaxı',
    districts: ['Şamaxı şəhəri']
  },
  {
    id: 'shamkir',
    name: 'Şəmkir',
    districts: ['Şəmkir şəhəri']
  },
  {
    id: 'sharur',
    name: 'Şərur',
    districts: ['Şərur şəhəri']
  },
  {
    id: 'siazan',
    name: 'Siyəzən',
    districts: ['Siyəzən şəhəri']
  },
  {
    id: 'tartar',
    name: 'Tərtər',
    districts: ['Tərtər şəhəri']
  },
  {
    id: 'tovuz',
    name: 'Tovuz',
    districts: ['Tovuz şəhəri']
  },
  {
    id: 'ujar',
    name: 'Ucar',
    districts: ['Ucar şəhəri']
  },
  {
    id: 'yardimli',
    name: 'Yardımlı',
    districts: ['Yardımlı şəhəri']
  },
  {
    id: 'yevlakh',
    name: 'Yevlax',
    districts: ['Yevlax şəhəri']
  },
  {
    id: 'zagatala',
    name: 'Zaqatala',
    districts: ['Zaqatala şəhəri']
  },
  {
    id: 'zardab',
    name: 'Zərdab',
    districts: ['Zərdab şəhəri']
  }
];

export function CertificateApplicationScreen() {
  const { t, isDarkMode, navigate } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // Auto scroll to submit button after a short delay
    setTimeout(() => {
      if (submitButtonRef.current) {
        submitButtonRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 300);
  };

  const handleSubmit = () => {
    if (!selectedCategory) return;
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedRegion('');
    setSelectedDistrict('');
    setAddress('');
    setTermsAccepted(false);
  };

  const handlePopupBackdropClick = (e: React.MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      handlePopupClose();
    }
  };

  const handleRegionChange = (regionId: string) => {
    setSelectedRegion(regionId);
    setSelectedDistrict(''); // Reset district when region changes
  };

  const handleFinalSubmit = () => {
    if (!selectedRegion || !address || !termsAccepted) return;
    
    setShowPopup(false);
    setShowNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
      setIsSubmitted(true);
    }, 3000);
  };

  const handleBackToHome = () => {
    navigate('Home');
  };

  const selectedRegionData = regions.find(r => r.id === selectedRegion);
  const isFormValid = selectedRegion && address.trim() && termsAccepted;

  if (isSubmitted) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className={`max-w-md w-full rounded-3xl p-8 text-center shadow-2xl ${
          isDarkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}>
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          {/* Success Message */}
          <h2 className={`text-2xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {t.applicationSubmitted}
          </h2>
          
          <p className={`text-lg mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t.applicationSuccess}
          </p>
          
          {/* Back Button */}
          <button
            onClick={handleBackToHome}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 shadow-lg"
          >
            {t.backToHome}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {t.certificateApplication}
          </h1>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t.selectCategory}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`p-6 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? isDarkMode
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                    : 'bg-blue-600 border-blue-500 text-white shadow-lg'
                  : isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-3">{category.icon}</div>
                <div className="font-semibold text-sm mb-1">
                  {t[category.name as keyof typeof t]}
                </div>
                <div className={`text-xs ${
                  selectedCategory === category.id
                    ? 'text-blue-100'
                    : isDarkMode
                      ? 'text-gray-400'
                      : 'text-gray-500'
                }`}>
                  {category.description}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          ref={submitButtonRef}
          onClick={handleSubmit}
          disabled={!selectedCategory}
          className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-200 ${
            selectedCategory
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg transform hover:scale-105'
              : isDarkMode
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedCategory ? t.applyForCertificate : t.selectCategoryFirst}
        </button>

        {/* Selected Category Info */}
        {selectedCategory && (
          <div className={`mt-6 p-4 rounded-2xl ${
            isDarkMode 
              ? 'bg-blue-900/30 border border-blue-700' 
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <div className="flex items-center justify-center">
              <span className="text-2xl mr-3">
                {categories.find(c => c.id === selectedCategory)?.icon}
              </span>
              <div className="text-center">
                <div className={`font-semibold ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-700'
                }`}>
                  {t[categories.find(c => c.id === selectedCategory)?.name as keyof typeof t]}
                </div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {categories.find(c => c.id === selectedCategory)?.description}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handlePopupBackdropClick}
        >
          <div 
            ref={popupRef}
            className={`w-full max-w-md rounded-3xl p-6 max-h-[90vh] overflow-y-auto ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Müraciət məlumatları
              </h2>
              <button
                onClick={handlePopupClose}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Selected Category Display */}
            <div className={`mb-6 p-4 rounded-2xl ${
              isDarkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200'
            }`}>
              <div className="flex items-center">
                <span className="text-2xl mr-3">
                  {categories.find(c => c.id === selectedCategory)?.icon}
                </span>
                <div>
                  <div className={`font-semibold ${
                    isDarkMode ? 'text-blue-300' : 'text-blue-700'
                  }`}>
                    {t[categories.find(c => c.id === selectedCategory)?.name as keyof typeof t]}
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {categories.find(c => c.id === selectedCategory)?.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Region Selection */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Qeydiyyat ünvanınızı seçin:
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => handleRegionChange(e.target.value)}
                className={`w-full p-3 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">Bölgə seçin</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District Selection */}
            {selectedRegionData && (
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Rayon seçin:
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className={`w-full p-3 rounded-xl border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Rayon seçin</option>
                  {selectedRegionData.districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Address Input */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Tam ünvan:
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Küçə, ev nömrəsi, mənzil nömrəsi və s."
                rows={3}
                className={`w-full p-3 rounded-xl border resize-none ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Terms Acceptance */}
            <div className="mb-6">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className={`mt-1 w-5 h-5 rounded ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                />
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Şərtlərlə tanış oldum və razıyam
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleFinalSubmit}
              disabled={!isFormValid}
              className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                isFormValid
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg transform hover:scale-105'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Müraciət göndər
            </button>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`p-4 rounded-2xl shadow-lg flex items-center gap-3 ${
            isDarkMode ? 'bg-green-800 border border-green-700' : 'bg-green-100 border border-green-200'
          }`}>
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className={`font-semibold ${
                isDarkMode ? 'text-green-200' : 'text-green-800'
              }`}>
                Müraciət göndərildi!
              </div>
              <div className={`text-sm ${
                isDarkMode ? 'text-green-300' : 'text-green-600'
              }`}>
                Sorğunuz uğurla qəbul edildi
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}