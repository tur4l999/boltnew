import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

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

function ScheduleActivationModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (mode: 'now' | 'schedule', when?: Date) => void;
}) {
  const today = new Date();
  const [step, setStep] = useState<1 | 2>(1);
  const [mode, setMode] = useState<'now' | 'schedule'>('now');
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth()); // 0-based
  const [day, setDay] = useState<number>(today.getDate());
  const [timeStr, setTimeStr] = useState<string>('10:00');

  const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn', 'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek'];
  const weekdays = ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B'];

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayWeekIdx = new Date(year, month, 1).getDay(); // 0=Sun
  const offset = (firstDayWeekIdx + 6) % 7; // convert to Mon=0

  const grid: Array<number | null> = [];
  for (let i = 0; i < offset; i++) grid.push(null);
  for (let d = 1; d <= daysInMonth; d++) grid.push(d);

  const parsedWhen = () => {
    const [h, m] = timeStr.split(':').map(v => parseInt(v, 10));
    return new Date(year, month, day, isNaN(h) ? 0 : h, isNaN(m) ? 0 : m, 0, 0);
  };

  const handleNext = () => {
    if (mode === 'now') {
      setStep(2);
      return;
    }
    setStep(2);
  };

  const handlePay = () => {
    if (mode === 'now') {
      onConfirm('now');
    } else {
      onConfirm('schedule', parsedWhen());
    }
  };

  const handleBack = () => setStep(1);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="overflow-hidden">
        <div className={`transition-transform duration-300 ease-out ${step === 1 ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="min-w-full">
            <div className="text-base font-bold mb-1">Aktivləşdirmə vaxtını seç</div>
            <div className="text-sm text-gray-600 mb-3">Paketi indi aktivləşdirə və ya tarix/saat seçib planlaşdıra bilərsiniz.</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <label className="flex items-center gap-1">
                  <input type="radio" checked={mode === 'now'} onChange={() => setMode('now')} /> İndi aktivləşdir
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" checked={mode === 'schedule'} onChange={() => setMode('schedule')} /> Tarix/saat seç
                </label>
              </div>

              {mode === 'schedule' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <select className="border rounded-xl px-3 py-2 text-sm" value={month} onChange={e => setMonth(parseInt(e.target.value, 10))}>
                      {months.map((m, idx) => (
                        <option key={idx} value={idx}>{m}</option>
                      ))}
                    </select>
                    <select className="border rounded-xl px-3 py-2 text-sm" value={year} onChange={e => setYear(parseInt(e.target.value, 10))}>
                      {Array.from({ length: 3 }).map((_, i) => {
                        const y = today.getFullYear() + i;
                        return <option key={y} value={y}>{y}</option>;
                      })}
                    </select>
                  </div>
                  <div>
                    <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-1">
                      {weekdays.map((w) => (<div key={w} className="text-center">{w}</div>))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {grid.map((d, idx) => (
                        <button
                          key={idx}
                          disabled={d === null}
                          onClick={() => d && setDay(d)}
                          className={`text-sm px-2 py-2 rounded-xl ${d === day ? 'bg-emerald-600 text-white' : 'bg-gray-100'} ${d === null ? 'opacity-0 pointer-events-none' : ''}`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input className="border rounded-xl px-3 py-2 w-24 text-sm" value={timeStr} onChange={e => setTimeStr(e.target.value)} placeholder="SS:dd" />
                    <select className="border rounded-xl px-3 py-2 text-sm" onChange={e => setTimeStr(e.target.value)} value={timeStr}>
                      {['08:00','09:00','10:00','11:00','12:00','14:00','16:00','18:00','20:00'].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button onClick={handleNext} className="px-3 py-2 text-sm rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">Davam et</button>
              </div>
            </div>
          </div>
        </div>

        <div className={`transition-transform duration-300 ease-out ${step === 2 ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="min-w-full">
            <div className="flex items-center gap-2 mb-2">
              <button onClick={handleBack} className="px-2 py-1 text-sm rounded-lg border">Geri</button>
              <div className="text-base font-bold">Təsdiq</div>
            </div>
            <div className="text-sm mb-3">
              Seçilən vaxt: {mode === 'now' ? 'İndi' : `${day}.${month + 1}.${year} ${timeStr}`}
            </div>
            <div className="flex items-center justify-end gap-2">
              <button onClick={onClose} className="px-3 py-2 text-sm rounded-xl border">Ləğv et</button>
              <button onClick={handlePay} className="px-3 py-2 text-sm rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">Ödəniş et</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function PackagesScreen() {
  const { t, goBack, balance, purchasePackage, schedulePackageActivation, isDarkMode } = useApp();
  const [selectedDays, setSelectedDays] = useState<Record<string, number>>({
    basic: 30,
    standart: 45,
    pro: 60
  });
  const [modalOpenFor, setModalOpenFor] = useState<string | null>(null);
  
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

  function onConfirmSchedule(mode: 'now' | 'schedule', when?: Date) {
    if (!modalOpenFor) return;
    const pkg = packages.find(p => p.id === modalOpenFor);
    if (!pkg) return;
    const price = calculatePrice(pkg.id);
    const days = selectedDays[pkg.id];
    if (mode === 'now') {
      const success = purchasePackage(pkg.id, pkg.name, price, days);
      if (success) goBack();
    } else if (when) {
      schedulePackageActivation(pkg.id, pkg.name, price, days, when);
    }
    setModalOpenFor(null);
  }

  function getPackageCardClass(pkg: Package): string {
    if (pkg.popular) {
      return isDarkMode
        ? 'relative ring-2 ring-emerald-600 bg-gradient-to-br from-emerald-900/30 to-green-900/20 border border-emerald-800 shadow-lg'
        : 'relative ring-2 ring-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg';
    }
    return isDarkMode ? 'relative bg-gray-800 border border-gray-700' : 'relative bg-white';
  }

  function getButtonClass(pkg: Package): string {
    if (pkg.popular) {
      return 'w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold shadow-lg';
    }
    return isDarkMode ? 'w-full bg-gray-700 text-gray-100 hover:bg-gray-600' : 'w-full';
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
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Bütün funksiyalardan istifadə etmək üçün uyğun paketi seçin
        </p>
        <div className="mt-2 text-lg font-bold text-emerald-500">
          Balans: {balance} AZN
        </div>
      </div>

      <div className="space-y-4">
        {packages.map((pkg) => (
          <Card key={pkg.id} className={`${getPackageCardClass(pkg)} transition-colors duration-200`}>
            {pkg.popular && (
              <>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  ⭐ Ən çox seçilən
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
                    ? (isDarkMode ? 'text-emerald-300' : 'text-emerald-700') 
                    : isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {pkg.name}
                </h3>
                <div className={`text-3xl font-black mt-2 transition-colors duration-200 ${
                  pkg.popular 
                    ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-600') 
                    : isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {calculatePrice(pkg.id)} AZN
                </div>
                <p className={`text-sm mt-1 transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {selectedDays[pkg.id]} gün müddətinə
                </p>
                {pkg.popular && (
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    Ən yaxşı qiymət/performans
                  </p>
                )}
              </div>

              {/* Day Selection */}
              <div className="space-y-2">
                <h4 className={`font-medium text-sm text-center transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>Müddət seçin:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {dayOptions.map((option) => (
                    <button
                      key={option.days}
                      onClick={() => setSelectedDays(prev => ({ ...prev, [pkg.id]: option.days }))}
                      className={`p-2 rounded-lg text-xs font-medium transition-all ${
                        selectedDays[pkg.id] === option.days
                          ? pkg.popular
                            ? 'bg-emerald-600 text-white shadow-md'
                            : (isDarkMode ? 'bg-gray-200 text-gray-900' : 'bg-gray-800 text-white')
                          : isDarkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
                <h4 className={`font-medium text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>Daxil olan xidmətlər:</h4>
                <div className="grid grid-cols-1 gap-1">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <span className={pkg.popular ? 'text-emerald-500' : 'text-emerald-500'}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setModalOpenFor(pkg.id)}
                className={getButtonClass(pkg)}
                variant={pkg.popular ? 'primary' : 'secondary'}
              >
                {pkg.popular ? '🚀 ' : ''}Paketi Al - {calculatePrice(pkg.id)} AZN
              </Button>

              {!pkg.popular && (
                <p className={`text-[11px] text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Daha çox xüsusiyyət üçün Standart paketi yoxlayın
                </p>
              )}
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

      <ScheduleActivationModal
        open={!!modalOpenFor}
        onClose={() => setModalOpenFor(null)}
        onConfirm={onConfirmSchedule}
      />
    </div>
  );
}