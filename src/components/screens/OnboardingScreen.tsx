import { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Users, Trophy, Star, Zap, Shield } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const { isDarkMode } = useApp();

  const pages = [
    {
      id: 1,
      title: "Sürücülük Biliklərinizi\nTəkmilləşdirin",
      subtitle: "Müasir metodlarla və interaktiv dərslər vasitəsilə sürücülük imtahanına hazırlaşın",
      icon: BookOpen,
      color: "from-blue-500 to-purple-600",
      features: [
        { icon: Star, text: "Ekspert müəllimlər tərəfindən hazırlanan dərslər" },
        { icon: Zap, text: "İnteraktiv təlim materialları" },
        { icon: Shield, text: "Yüksək keyfiyyətli məzmun" }
      ]
    },
    {
      id: 2,
      title: "Dostlarınızla Birlikdə\nÖyrənin",
      subtitle: "Komanda halında çalışın, bir-birinizə kömək edin və uğura birlikdə çatın",
      icon: Users,
      color: "from-emerald-500 to-teal-600",
      features: [
        { icon: Users, text: "Qrup dərsləri və müzakirələr" },
        { icon: Star, text: "Təcrübə mübadiləsi" },
        { icon: Zap, text: "Motivasiya və dəstək" }
      ]
    },
    {
      id: 3,
      title: "İmtahanda Uğur\nQazanın",
      subtitle: "Real imtahan şəraitində praktika edin və özünüzə inamınızı artırın",
      icon: Trophy,
      color: "from-orange-500 to-red-500",
      features: [
        { icon: Trophy, text: "Real imtahan simulyatoru" },
        { icon: Star, text: "Nəticə analizi və təkmilləşdirmə" },
        { icon: Shield, text: "100% uğur zəmanəti" }
      ]
    }
  ];

  const currentPageData = pages[currentPage];
  const IconComponent = currentPageData.icon;

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentPageData.color} opacity-10 transition-all duration-700`} />
      
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${currentPageData.color} rounded-full opacity-20 animate-pulse`} />
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr ${currentPageData.color} rounded-full opacity-15 animate-pulse delay-1000`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r ${currentPageData.color} rounded-full opacity-10 animate-ping delay-2000`} />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Skip button */}
        <div className="flex justify-end p-6">
          <button
            onClick={handleSkip}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Keçin
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          {/* Icon with animated background */}
          <div className="relative mb-8">
            <div className={`absolute inset-0 bg-gradient-to-r ${currentPageData.color} rounded-full blur-xl opacity-30 animate-pulse`} />
            <div className={`relative w-24 h-24 bg-gradient-to-r ${currentPageData.color} rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-700 hover:scale-110`}>
              <IconComponent className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className={`text-3xl font-bold mb-4 leading-tight transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {currentPageData.title}
          </h1>

          {/* Subtitle */}
          <p className={`text-lg mb-8 max-w-sm leading-relaxed transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {currentPageData.subtitle}
          </p>

          {/* Features */}
          <div className="space-y-4 mb-12">
            {currentPageData.features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-800/50 backdrop-blur-sm' 
                      : 'bg-white/70 backdrop-blur-sm shadow-lg'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${currentPageData.color} rounded-full flex items-center justify-center`}>
                    <FeatureIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {feature.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="px-8 pb-12">
          {/* Page indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? `bg-gradient-to-r ${currentPageData.color} shadow-lg transform scale-125`
                    : isDarkMode
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${
                currentPage === 0
                  ? 'opacity-0 pointer-events-none'
                  : isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Geri</span>
            </button>

            <button
              onClick={handleNext}
              className={`flex items-center space-x-2 px-8 py-4 bg-gradient-to-r ${currentPageData.color} text-white rounded-full font-semibold shadow-2xl transform transition-all duration-200 hover:scale-105 hover:shadow-3xl active:scale-95`}
            >
              <span>{currentPage === pages.length - 1 ? 'Başlayın' : 'Növbəti'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}