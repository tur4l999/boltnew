import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const categories: Category[] = [
  { id: 'A', name: 'categoryA', description: 'Motosikl və moped', icon: '🏍️' },
  { id: 'B', name: 'categoryB', description: 'Avtomobil (3500 kq-a qədər)', icon: '🚗' },
  { id: 'C', name: 'categoryC', description: 'Yük avtomobili (3500 kq-dan çox)', icon: '🚛' },
  { id: 'D', name: 'categoryD', description: 'Avtobus', icon: '🚌' },
  { id: 'E', name: 'categoryE', description: 'Qoşqu', icon: '🚐' },
  { id: 'AB', name: 'categoryAB', description: 'A + B kateqoriyaları', icon: '🏍️🚗' },
  { id: 'AC', name: 'categoryAC', description: 'A + C kateqoriyaları', icon: '🏍️🚛' },
  { id: 'BC', name: 'categoryBC', description: 'B + C kateqoriyaları', icon: '🚗🚛' },
  { id: 'ABC', name: 'categoryABC', description: 'A + B + C kateqoriyaları', icon: '🏍️🚗🚛' },
  { id: 'BE', name: 'categoryBE', description: 'B + E kateqoriyaları', icon: '🚗🚐' },
  { id: 'CE', name: 'categoryCE', description: 'C + E kateqoriyaları', icon: '🚛🚐' },
  { id: 'DE', name: 'categoryDE', description: 'D + E kateqoriyaları', icon: '🚌🚐' },
];

export function CertificateApplicationScreen() {
  const { t, isDarkMode, navigate } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSubmit = () => {
    if (!selectedCategory) return;
    setIsSubmitted(true);
  };

  const handleBackToHome = () => {
    navigate('Home');
  };

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
    </div>
  );
}