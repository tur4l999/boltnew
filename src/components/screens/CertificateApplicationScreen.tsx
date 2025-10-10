import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { SlideTransition } from '../ui/SlideTransition';
import { ScaleIn } from '../ui/ScaleIn';

type CertificateType = 'A' | 'B' | 'C' | 'D' | 'E' | 'AB' | 'AC' | 'BC' | 'ABC' | 'BE' | 'CE' | 'DE';


export function CertificateApplicationScreen() {
  const { isDarkMode, goBack, navigate } = useApp();
  const [selectedTypes, setSelectedTypes] = useState<CertificateType[]>([]);
  const applicationButtonRef = useRef<HTMLButtonElement>(null);

  const certificateOptions: { type: CertificateType; label: string; description: string; emoji: string }[] = [
    { type: 'A', label: 'A kateqoriyası', description: 'Motosikl, moped', emoji: '🏍️' },
    { type: 'B', label: 'B kateqoriyası', description: 'Yüngül avtomobil', emoji: '🚗' },
    { type: 'C', label: 'C kateqoriyası', description: 'Yük avtomobili', emoji: '🚛' },
    { type: 'D', label: 'D kateqoriyası', description: 'Avtobus', emoji: '🚌' },
    // E tək verilmir, yalnız kombinasiyalarla
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
    navigate('ApplicationForm', { selectedTypes });
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
                className="w-full py-5 rounded-3xl font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                📝 Müraciət Et ({selectedTypes.length} kateqoriya seçildi)
              </button>
            </div>
          </ScaleIn>
        )}
      </div>

    </div>
  );
}
