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

export function StoreScreen() {
  const { t } = useApp();
  const [selectedDays, setSelectedDays] = useState<Record<string, number>>({
    basic: 30,
    premium: 45,
    pro: 60
  });
  
  const dayOptions: DayOption[] = [
    { days: 30, label: '30 gün', multiplier: 1 },
    { days: 45, label: '45 gün', multiplier: 1.4 },
    { days: 60, label: '60 gün', multiplier: 1.8 }
  ];
  
  const packages: Package[] = [
    {
      id: 'basic',
      name: 'Əsas Paket',
      basePrice: 15,
      color: 'gray',
      features: [
        'Bütün video dərslər',
        'Test sualları',
        'İmtahan simulyatoru',
        'Səhvlərin analizi'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Paket',
      basePrice: 25,
      color: 'emerald',
      features: [
        'Bütün video dərslər',
        'Test sualları',
        'İmtahan simulyatoru',
        'Səhvlərin analizi',
        '3D video dərslər',
        'Müəllimlə əlaqə',
        'Praktiki təcrübə',
        'Prioritet dəstək'
      ],
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro Paket',
      basePrice: 40,
      color: 'blue',
      features: [
        'Bütün funksiyalar',
        'Limitsiz test',
        'Şəxsi məsləhətçi',
        'Praktiki təcrübə',
        'Apellyasiya dəstəyi',
        'Offline məzmun',
        'VIP dəstək',
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

  function purchasePackage(packageId: string) {
    const pkg = packages.find(p => p.id === packageId);
    const price = calculatePrice(packageId);
    const days = selectedDays[packageId];
    
    if (pkg) {
      alert(`${pkg.name} (${price} AZN - ${days} gün) satın alındı! (Demo)`);
    }
  }

  function getPackageCardClass(pkg: Package): string {
    if (pkg.popular) {
      return 'relative ring-2 ring-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg transform scale-105';
    }
    return 'relative bg-white';
  }

  function getButtonClass(pkg: Package): string {
    if (pkg.popular) {
      return 'w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold shadow-lg';
    }
    return 'w-full';
  }

  return (
    <div className="p-3 pb-24">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Paketlər</h1>
        <p className="text-sm text-gray-600">
          Bütün funksiyalardan istifadə etmək üçün uyğun paketi seçin
        </p>
      </div>

      <div className="space-y-4">
        {packages.map((pkg) => (
          <Card key={pkg.id} className={getPackageCardClass(pkg)}>
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
                <h3 className={`text-xl font-bold ${pkg.popular ? 'text-emerald-700' : 'text-gray-900'}`}>
                  {pkg.name}
                </h3>
                <div className={`text-3xl font-black mt-2 ${pkg.popular ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {calculatePrice(pkg.id)} AZN
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedDays[pkg.id]} gün müddətinə
                </p>
              </div>

              {/* Day Selection */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 text-sm text-center">Müddət seçin:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {dayOptions.map((option) => (
                    <button
                      key={option.days}
                      onClick={() => setSelectedDays(prev => ({ ...prev, [pkg.id]: option.days }))}
                      className={`p-2 rounded-lg text-xs font-medium transition-all ${
                        selectedDays[pkg.id] === option.days
                          ? pkg.popular
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 text-sm">Daxil olan xidmətlər:</h4>
                <div className="grid grid-cols-1 gap-1">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className={pkg.popular ? 'text-emerald-500' : 'text-emerald-500'}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => purchasePackage(pkg.id)}
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
      <Card className="mt-6">
        <h3 className="font-bold text-gray-900 mb-3 text-center">Ödəniş üsulları</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-1">💳</div>
            <div className="text-xs text-gray-600">Kart</div>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-1">📱</div>
            <div className="text-xs text-gray-600">Mobil</div>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-1">🏦</div>
            <div className="text-xs text-gray-600">Bank</div>
          </div>
        </div>
      </Card>

      {/* Trust Indicators */}
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
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