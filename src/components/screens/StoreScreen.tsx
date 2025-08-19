import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Package {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

export function StoreScreen() {
  const { t } = useApp();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  const packages: Package[] = [
    {
      id: 'basic',
      name: 'Əsas Paket',
      price: 15,
      duration: '1 ay',
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
      price: 35,
      duration: '3 ay',
      features: [
        'Bütün video dərslər',
        'Test sualları',
        'İmtahan simulyatoru',
        'Səhvlərin analizi',
        '3D video dərslər',
        'Müəllimlə əlaqə',
        'Praktiki təcrübə'
      ],
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro Paket',
      price: 60,
      duration: '6 ay',
      features: [
        'Bütün funksiyalar',
        'Limitsiz test',
        'Şəxsi məsləhətçi',
        'Praktiki təcrübə',
        'Apellyasiya dəstəyi',
        'Offline məzmun'
      ]
    }
  ];

  function purchasePackage(packageId: string) {
    const pkg = packages.find(p => p.id === packageId);
    if (pkg) {
      alert(`${pkg.name} (${pkg.price} AZN) satın alındı! (Demo)`);
      setSelectedPackage(null);
    }
  }

  return (
    <div className="p-3 pb-24">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Paketlər</h1>
        <p className="text-sm text-gray-600">
          Bütün funksiyalardan istifadə etmək üçün uyğun paketi seçin
        </p>
      </div>

      <div className="space-y-3">
        {packages.map((pkg) => (
          <Card key={pkg.id} className={`relative ${pkg.popular ? 'ring-2 ring-emerald-500' : ''}`}>
            {pkg.popular && (
              <div className="absolute -top-2 left-4 bg-emerald-500 text-white px-2 py-1 rounded text-xs font-bold">
                Ən Populyar
              </div>
            )}
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">{pkg.name}</h3>
                  <p className="text-sm text-gray-600">{pkg.duration}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{pkg.price} AZN</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 text-sm">Daxil olan xidmətlər:</h4>
                <ul className="space-y-1">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-emerald-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => purchasePackage(pkg.id)}
                className={`w-full ${pkg.popular ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
                variant={pkg.popular ? 'primary' : 'secondary'}
              >
                Paketi Al - {pkg.price} AZN
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Payment Methods */}
      <Card className="mt-6">
        <h3 className="font-bold text-gray-900 mb-3">Ödəniş üsulları</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl mb-1">💳</div>
            <div className="text-xs text-gray-600">Kart</div>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl mb-1">📱</div>
            <div className="text-xs text-gray-600">Mobil</div>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl mb-1">🏦</div>
            <div className="text-xs text-gray-600">Bank</div>
          </div>
        </div>
      </Card>
    </div>
  );
}