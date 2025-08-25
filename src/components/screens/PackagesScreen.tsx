import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Package {
  id: string;
  name: string;
  basePrice: number;
  features: string[];
  popular?: boolean;
  color: string;
}

interface DayOption {
  days: number;
  label: string;
  multiplier: number;
}

export function PackagesScreen() {
  const { t, goBack, balance, purchasePackage, isDarkMode } = useApp();
  const [selectedDays, setSelectedDays] = useState<Record<string, number>>({
    basic: 30,
    standart: 30,
    pro: 45
  });
  
  const dayOptions: DayOption[] = [
    { days: 30, label: '30 gün', multiplier: 1 },
    { days: 45, label: '45 gün', multiplier: 1.4 },
    { days: 60, label: '60 gün', multiplier: 1.8 }
  ];
  
  const packages: Package[] = [
    {
      id: 'basic',
      name: 'Sadə Paket',
      basePrice: 15,
      color: 'gray',
      features: [
        '3D video dərslər',
        'Dərs materialları',
        'Mövzu üzrə testlər',
        'Mövzu üzrə imtahanlar',
        'İmtahan simulyatoru - 5 bilet',
        'Müəllimlə sual-cavab',
        'Sualların video izahı'
      ]
    },
    {
      id: 'standart',
      name: 'Standart Paket',
      basePrice: 25,
      color: 'emerald',
      features: [
        'Sadə paketdəki hər şey',
        'İmtahan simulyatoru - 5 bilet (əlavə)',
        'İmtahanlara hazirliq vəsaiti 2025 Ə.Talıbov (kitab)',
        'Test-imtahan çalışmaları kitabı 2025 (kitab)',
      ],
      popular: true
    },
    {
      id: 'pro',
      name: 'Premium Paket',
      basePrice: 40,
      color: 'blue',
      features: [
        'Standart paketdəki hər şey',
        'Əziz Talıbovla (kitabların müəllifi) əyani və onlayn dərslər',
        '"A", "B" və ya "C" kateqoriyası üzrə şəhadətnamə*',
        'Ekskluziv materiallar'
      ]
    }
  ];

  function calculatePrice(packageId: string): number {
    const pkg = packages.find(p => p.id === packageId);
    const days = selectedDays[packageId];
    const dayOption = dayOptions.find(d => d.days === days);
    
    if (!pkg || !dayOption) return 0;
    
    return Math.round(pkg.basePrice * dayOption.multiplier);
  }

  function getPricePair(packageId: string): { oldPrice: number; newPrice: number; discountPercent: number } {
    const newPrice = calculatePrice(packageId);
    const oldPrice = Math.max(newPrice + 10, Math.round(newPrice * 1.25));
    const discountPercent = Math.max(1, Math.round((1 - newPrice / oldPrice) * 100));
    return { oldPrice, newPrice, discountPercent };
  }

  function handlePurchasePackage(packageId: string) {
    const pkg = packages.find(p => p.id === packageId);
    const price = calculatePrice(packageId);
    const days = selectedDays[packageId];
    
    if (pkg) {
      const success = purchasePackage(packageId, pkg.name, price, days);
      if (success) {
        alert(`${pkg.name} (${price} AZN - ${days} gün) uğurla satın alındı!`);
        goBack();
      } else {
        alert('Balansınız kifayət etmir. Balansınızı artırın.');
      }
    }
  }

  function getPackageCardClass(pkg: Package): string {
    if (pkg.popular) {
      return `relative ring-2 ring-emerald-500 ${isDarkMode ? 'bg-emerald-900/10' : 'bg-gradient-to-br from-emerald-50 to-green-50'} shadow-lg transform scale-105`;
    }
    return `relative ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`;
  }

  function getButtonClass(pkg: Package): string {
    if (pkg.popular) {
      return 'w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold shadow-lg';
    }
    return 'w-full';
  }

  return (
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    } pt-11`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={goBack}
          className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors duration-200 ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-200' 
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700'
          }`}
        >
          ←
        </button>
        <h1 className={`text-lg font-bold transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>Təlim Paketləri</h1>
      </div>

      <div className="mb-6 text-center">
        <p className={`text-sm transition-colors duration-200 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Bütün funksiyalardan istifadə etmək üçün uyğun paketi seçin
        </p>
        <div className="mt-2 text-lg font-bold text-emerald-600">
          Balans: {balance} AZN
        </div>
      </div>

      <div className="space-y-4">
        {packages.map((pkg) => (
          <Card key={pkg.id} className={`${getPackageCardClass(pkg)} transition-colors duration-200 ${
            isDarkMode && !pkg.popular ? 'bg-gray-800 border-gray-700' : ''
          }`}>
            {pkg.popular && (
              <>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  ⭐ Ən Populyar
                </div>
                <div className="absolute top-2 right-2 text-2xl">
                  🔥
                </div>
              </>
            )}
            
            <div className="space-y-4 pt-2">
              <div className="text-center">
                <h3 className={`text-xl font-bold transition-colors duration-200 ${
                  pkg.popular 
                    ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-700') 
                    : isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {pkg.name}
                </h3>
                {(() => {
                  const { oldPrice, newPrice, discountPercent } = getPricePair(pkg.id);
                  return (
                    <div className="mt-2 flex items-baseline justify-center gap-2">
                      <span className={`line-through text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{oldPrice} AZN</span>
                      <span className={`text-3xl font-black ${pkg.popular ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-600') : (isDarkMode ? 'text-gray-100' : 'text-gray-900')}`}>{newPrice} AZN</span>
                      <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">-{discountPercent}%</span>
                    </div>
                  );
                })()}
                <p className={`text-sm mt-1 transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {selectedDays[pkg.id]} gün müddətinə
                </p>
              </div>

              {/* Day Selection */}
              <div className="space-y-2">
                <h4 className={`font-medium text-sm text-center transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>Müddət seçin:</h4>
                {(() => {
                  const options = pkg.id === 'pro' ? dayOptions.filter(o => o.days === 45) : dayOptions;
                  return (
                    <div className={`grid ${options.length === 1 ? 'grid-cols-1 place-items-center' : 'grid-cols-3'} gap-2`}>
                      {options.map((option) => (
                        <button
                          key={option.days}
                          onClick={() => setSelectedDays(prev => ({ ...prev, [pkg.id]: option.days }))}
                          className={`p-2 rounded-lg text-xs font-medium transition-all ${
                            selectedDays[pkg.id] === option.days
                              ? pkg.popular
                                ? 'bg-emerald-600 text-white shadow-md'
                                : 'bg-gray-800 text-white'
                              : isDarkMode
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h4 className={`font-medium text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>Daxil olan xidmətlər:</h4>
                <div className="grid grid-cols-1 gap-1">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span className={'text-emerald-500'}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => handlePurchasePackage(pkg.id)}
                className={getButtonClass(pkg)}
                variant={pkg.popular ? 'primary' : 'secondary'}
              >
                {pkg.popular ? '🚀 ' : ''}Paketi Al - {calculatePrice(pkg.id)} AZN
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Payment Methods */}
      <Card className={`mt-6 transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`font-bold mb-3 text-center transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>Ödəniş üsulları</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className={`p-3 border rounded-lg text-center transition-colors duration-200 ${
            isDarkMode 
              ? 'border-gray-600 hover:bg-gray-700' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}>
            <div className="text-2xl mb-1">💳</div>
            <div className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Kart</div>
          </div>
          <div className={`p-3 border rounded-lg text-center transition-colors duration-200 ${
            isDarkMode 
              ? 'border-gray-600 hover:bg-gray-700' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}>
            <div className="text-2xl mb-1">📱</div>
            <div className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Mobil</div>
          </div>
          <div className={`p-3 border rounded-lg text-center transition-colors duration-200 ${
            isDarkMode 
              ? 'border-gray-600 hover:bg-gray-700' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}>
            <div className="text-2xl mb-1">🏦</div>
            <div className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Bank</div>
          </div>
        </div>
      </Card>

      {/* Trust Indicators */}
      <div className="mt-4 text-center">
        <div className={`flex items-center justify-center gap-4 text-xs transition-colors duration-200 ${
          isDarkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          <span className="flex items-center gap-1">
            🔒 Təhlükəsiz ödəniş
          </span>
          <span className="flex items-center gap-1">
            ⚡ Ani aktivləşmə
          </span>
          <span className="flex items-center gap-1">
            🎯 7/24 dəstək
          </span>
        </div>
      </div>
    </div>
  );
}

