import React, { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Calendar } from '../ui/Calendar';
import { EmojiIcon } from '../ui/EmojiIcon';

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
  const { t, goBack, balance, purchasePackage, purchasePackageByCard, purchaseTickets, isDarkMode, navigate, switchTab } = useApp();
  const [selectedDays, setSelectedDays] = useState<Record<string, number>>({
    basic: 30,
    standart: 30,
    pro: 45
  });
  const [nowTs, setNowTs] = useState<number>(Date.now());
  const [promoEndsAt] = useState<number>(() => Date.now() + 10 * 24 * 60 * 60 * 1000);
  const [activeTab, setActiveTab] = useState<'training' | 'other'>('training');
  const [activationModalOpen, setActivationModalOpen] = useState<null | { packageId: string }>(null);
  const [activationMode, setActivationMode] = useState<'now' | 'date'>('now');
  const [activationDate, setActivationDate] = useState<Date | null>(null);
  const [activationHour, setActivationHour] = useState<string>('09');
  const [activationMinute, setActivationMinute] = useState<string>('00');
  const [scheduledPopupOpen, setScheduledPopupOpen] = useState<boolean>(false);
  const [scheduledAt, setScheduledAt] = useState<Date | null>(null);
  const [scheduledName, setScheduledName] = useState<string>('');
  const [otherModalOpen, setOtherModalOpen] = useState<null | { id: string; title: string; count: number; newPrice: number }>(null);
  const [otherModalStage, setOtherModalStage] = useState<'confirm' | 'success' | 'insufficient'>('confirm');
  const [insufficientTrainingOpen, setInsufficientTrainingOpen] = useState<boolean>(false);
  const [insufficientTrainingName, setInsufficientTrainingName] = useState<string>('');
  const [insufficientTrainingPrice, setInsufficientTrainingPrice] = useState<number>(0);
  const [paymentModalOpen, setPaymentModalOpen] = useState<null | { packageId: string; scheduledAt: Date }>(null);
  const [paymentMethod, setPaymentMethod] = useState<'balance' | 'card'>('balance');

  useEffect(() => {
    const id = setInterval(() => setNowTs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  function formatRemaining(ms: number): string {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const dd = String(days).padStart(2, '0');
    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    return `${dd} gün ${hh}:${mm}:${ss}`;
  }
  
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

  const otherItems: { id: string; title: string; count: number; oldPrice: number; newPrice: number; description?: string }[] = [
    { id: 'tickets-5', title: '5 bilet', count: 5, oldPrice: 10, newPrice: 8, description: 'İmtahan bileti' },
    { id: 'tickets-10', title: '10 bilet', count: 10, oldPrice: 20, newPrice: 14, description: 'İmtahan bileti' },
    { id: 'tickets-15', title: '15 bilet', count: 15, oldPrice: 30, newPrice: 20, description: 'İmtahan bileti' },
    { id: 'tickets-20', title: '20 bilet', count: 20, oldPrice: 40, newPrice: 25, description: 'İmtahan bileti' }
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
    setActivationModalOpen({ packageId });
    setActivationMode('now');
    setActivationDate(null);
  }

  function confirmPurchase(packageId: string) {
    const pkg = packages.find(p => p.id === packageId);
    const price = calculatePrice(packageId);
    const days = selectedDays[packageId];
    
    if (pkg) {
      let scheduled: Date | undefined = undefined;
      if (activationMode === 'date' && activationDate) {
        const d = new Date(activationDate);
        d.setHours(parseInt(activationHour, 10), parseInt(activationMinute, 10), 0, 0);
        scheduled = d;
      }
      const success = purchasePackage(packageId, pkg.name, price, days, scheduled);
      if (success) {
        setActivationModalOpen(null);
        if (activationMode === 'date' && scheduled) {
          // show scheduled confirmation popup in-place
          setScheduledName(pkg.name);
          setScheduledAt(scheduled);
          setScheduledPopupOpen(true);
        } else {
          alert(`${pkg.name} (${price} AZN - ${days} gün) uğurla satın alındı!`);
          goBack();
        }
      } else {
        setInsufficientTrainingName(pkg.name);
        setInsufficientTrainingPrice(price);
        setInsufficientTrainingOpen(true);
      }
    }
  }

  function openPaymentFor(packageId: string) {
    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return;
    let scheduled = new Date();
    if (activationMode === 'date' && activationDate) {
      const d = new Date(activationDate);
      d.setHours(parseInt(activationHour, 10), parseInt(activationMinute, 10), 0, 0);
      scheduled = d;
    }
    setPaymentMethod('balance');
    setPaymentModalOpen({ packageId, scheduledAt: scheduled });
    setActivationModalOpen(null);
  }

  function handleConfirmPayment() {
    if (!paymentModalOpen) return;
    const { packageId, scheduledAt: scheduled } = paymentModalOpen;
    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return;
    const price = calculatePrice(packageId);
    const days = selectedDays[packageId];
    const success = paymentMethod === 'balance'
      ? purchasePackage(packageId, pkg.name, price, days, scheduled)
      : purchasePackageByCard(packageId, pkg.name, price, days, scheduled);
    if (success) {
      setPaymentModalOpen(null);
      setScheduledName(pkg.name);
      setScheduledAt(scheduled);
      setScheduledPopupOpen(true);
    } else {
      // balance insufficient case
      setPaymentModalOpen(null);
      setInsufficientTrainingName(pkg.name);
      setInsufficientTrainingPrice(price);
      setInsufficientTrainingOpen(true);
    }
  }

  function handlePurchaseOther(item: { id: string; title: string; count: number; newPrice: number }) {
    setOtherModalOpen(item);
    setOtherModalStage('confirm');
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
    <div className={`relative p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    } pt-6`}>
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
        <div className="ml-auto px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow">
          Balans: {balance} AZN
        </div>
      </div>
      {/* Tabs */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => setActiveTab('training')}
          className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
            activeTab === 'training'
              ? 'bg-emerald-600 text-white shadow'
              : isDarkMode
                ? 'bg-gray-800 text-gray-200 border border-gray-700'
                : 'bg-white text-gray-800 border border-gray-200'
          }`}
        >
          Təlim paketləri
        </button>
        <button
          onClick={() => setActiveTab('other')}
          className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
            activeTab === 'other'
              ? 'bg-emerald-600 text-white shadow'
              : isDarkMode
                ? 'bg-gray-800 text-gray-200 border border-gray-700'
                : 'bg-white text-gray-800 border border-gray-200'
          }`}
        >
          Digər Paketlər
        </button>
      </div>

      {activeTab === 'training' && (
        <div className="mb-6 text-center">
          <p className={`text-sm transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Bütün funksiyalardan istifadə etmək üçün uyğun paketi seçin
          </p>
        </div>
      )}
      {activeTab === 'training' && (
        <div className="space-y-4">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={`${getPackageCardClass(pkg)} transition-colors duration-200 ${
              isDarkMode && !pkg.popular ? 'bg-gray-800 border-gray-700' : ''
            }`}>
              {pkg.id === 'basic' && (
                <div className="mb-2 -mt-1">
                  <div className="w-full rounded-xl p-2 text-center font-bold border bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-sm">
                    ⏳ 10 günlük endirim! Bitməyə qalıb: {formatRemaining(promoEndsAt - nowTs)}
                  </div>
                </div>
              )}
              {pkg.popular && (
                <>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    <EmojiIcon emoji="⭐" size={14} className="inline-block mr-1" />Ən Populyar
                  </div>
                  <div className="absolute top-2 right-2 text-2xl">
                    <EmojiIcon emoji="🔥" size={24} />
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
                        <span className={`line-through text-base ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{oldPrice} AZN</span>
                        <span className={`text-4xl font-black ${isDarkMode ? 'text-red-500' : 'text-red-600'} drop-shadow-sm tracking-tight`}>{newPrice} AZN</span>
                        <span className="ml-1 -mt-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">-{discountPercent}%</span>
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
                                ? 'bg-emerald-600 text-white shadow-md'
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
                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] leading-none">✓</span>
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
                  {pkg.popular ? <><EmojiIcon emoji="🚀" size={16} className="inline-block mr-1" /></> : ''}Paketi Al - {calculatePrice(pkg.id)} AZN
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'other' && (
        <div className="space-y-4">
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} transition-colors`}>
            <h3 className={`text-center font-bold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Digər Paketlər
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {otherItems.map(item => {
                const discountPercent = Math.max(1, Math.round((1 - item.newPrice / item.oldPrice) * 100));
                return (
                  <div key={item.id} className={`p-3 rounded-lg border flex flex-col items-center text-center ${isDarkMode ? 'border-gray-700 bg-gray-900/30' : 'border-gray-200 bg-gray-50'}`}>
                    <div className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{item.title}</div>
                    {item.description && (
                      <div className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.description}</div>
                    )}
                    <div className="mt-2 flex flex-col items-center gap-1">
                      <div className="flex items-baseline gap-1">
                        <span className={`line-through text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{item.oldPrice} AZN</span>
                        <span className={`text-xl font-extrabold ${isDarkMode ? 'text-red-500' : 'text-red-600'} tracking-tight`}>{item.newPrice} AZN</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">-{discountPercent}%</span>
                    </div>
                    <Button onClick={() => handlePurchaseOther(item)} size="sm" variant="ghost" className="mt-2">
                      Əldə et
                    </Button>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

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
            <EmojiIcon emoji="⚡" size={16} className="inline-block mr-2" />Ani aktivləşmə
          </span>
          <span className="flex items-center gap-1">
            <EmojiIcon emoji="🎯" size={16} className="inline-block mr-2" />7/24 dəstək
          </span>
        </div>
      </div>

      {activationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setActivationModalOpen(null)} />
          <div className={`relative z-10 w-[92%] max-w-md rounded-2xl p-4 shadow-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className={`text-base font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Aktivləşdirmə seçimi</div>
            <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-3`}>
              İndi aktivləşdirin və ya aktivləşdirmə tarixini seçin.
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => setActivationMode('now')}
                className={`px-3 py-2 rounded-xl font-bold min-h-[40px] text-sm flex items-center justify-center gap-2 ${
                  activationMode === 'now'
                    ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                    : isDarkMode
                      ? 'border border-gray-600 text-gray-200 hover:bg-gray-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <EmojiIcon emoji="🚀" size={16} />
                <span>İndi başla</span>
              </button>
              <button
                onClick={() => setActivationMode('date')}
                className={`px-3 py-2 rounded-xl font-bold min-h-[40px] text-sm flex items-center justify-center gap-2 ${
                  activationMode === 'date'
                    ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                    : isDarkMode
                      ? 'border border-gray-600 text-gray-200 hover:bg-gray-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>📅</span>
                <span>Tarixi seç</span>
              </button>
            </div>

            {activationMode === 'date' && (
              <div className={`p-2 rounded-xl border mb-3 ${isDarkMode ? 'border-gray-700 bg-gray-900/30' : 'border-gray-200 bg-gray-50'}`}>
                <Calendar
                  initialDate={new Date()}
                  minDate={new Date()}
                  onChange={(d) => setActivationDate(d)}
                />
                <div className="mt-2 flex items-center gap-2">
                  <select
                    value={activationHour}
                    onChange={(e) => setActivationHour(e.target.value)}
                    className={`px-2 py-1 rounded border text-sm ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                  >
                    {Array.from({ length: 24 }).map((_, i) => {
                      const v = String(i).padStart(2, '0');
                      return <option key={v} value={v}>{v}</option>;
                    })}
                  </select>
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>:</span>
                  <select
                    value={activationMinute}
                    onChange={(e) => setActivationMinute(e.target.value)}
                    className={`px-2 py-1 rounded border text-sm ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                  >
                    {['00','15','30','45'].map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-3">
                  <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs`}>Seçilən tarix</div>
                  <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-lg font-extrabold`}>
                    {activationDate ? `${activationDate.toLocaleDateString('az-AZ')} ${activationHour}:${activationMinute}` : '—'}
                  </div>
                  <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs mt-2`}>
                    Paketin aktivləşdiriləcəyi tarix: {activationDate ? `${activationDate.toLocaleDateString('az-AZ')} ${activationHour}:${activationMinute}` : '—'}
                  </div>
                </div>
              </div>
            )}

            {/* Summary (package and chosen time) */}
            {(() => {
              const modalPkg = activationModalOpen ? packages.find(p => p.id === activationModalOpen.packageId) : null;
              const dt = new Date(activationMode === 'date' && activationDate ? activationDate : new Date());
              if (activationMode === 'date' && activationDate) {
                dt.setHours(parseInt(activationHour, 10), parseInt(activationMinute, 10), 0, 0);
              }
              const whenStr = dt.toLocaleString('az-AZ');
              const pkgDays = modalPkg ? selectedDays[modalPkg.id] : undefined;
              return (
                <div className={`mt-3 p-3 rounded-lg ${isDarkMode ? 'bg-gray-900/30 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs mb-1`}>Seçilən paket</div>
                  <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-base font-semibold`}>
                    {modalPkg ? `${modalPkg.name}${pkgDays ? ` • ${pkgDays} gün` : ''}` : '—'}
                  </div>
                  <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs mt-2`}>Aktivləşdirmə</div>
                  <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-xl font-extrabold`}>{whenStr}</div>
                </div>
              );
            })()}

            <div className={`grid grid-cols-2 gap-3 mt-4 pt-3 ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}` }>
              <button
                onClick={() => setActivationModalOpen(null)}
                className={`px-4 py-2 rounded-xl font-bold min-h-[40px] border ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Bağla
              </button>
              <button
                onClick={() => activationModalOpen && openPaymentFor(activationModalOpen.packageId)}
                disabled={activationMode === 'date' && !activationDate}
                className={`px-4 py-2 rounded-xl font-bold min-h-[40px] ${
                  activationMode === 'date' && !activationDate
                    ? 'bg-emerald-600/50 text-white cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                Davam et
              </button>
            </div>
          </div>
        </div>
      )}

      {scheduledPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setScheduledPopupOpen(false); switchTab('Home'); }} />
          <div className={`relative z-10 w-[92%] max-w-md rounded-2xl p-5 shadow-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <button
              onClick={() => { setScheduledPopupOpen(false); switchTab('Home'); }}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm border ${
                isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-600'
              }`}
              aria-label="Bağla"
            >
              ✕
            </button>
            <div className="text-4xl mb-2">⏰</div>
            <div className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Aktivləşdirmə planlaşdırıldı
            </div>
            <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-3`}>
              Seçdiyiniz tarixdə paket aktivləşəcəkdir.
            </div>
            <div className="space-y-1 mb-4">
              <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs`}>Seçilən paket</div>
              <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-sm font-semibold`}>{scheduledName || '—'}</div>
              <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs mt-2`}>Aktivləşdirmə tarixi</div>
              <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-base font-extrabold`}>{scheduledAt ? scheduledAt.toLocaleString('az-AZ') : '—'}</div>
            </div>
            <button
              onClick={() => { setScheduledPopupOpen(false); switchTab('Home'); }}
              className={`w-full px-4 py-2 rounded-xl font-bold min-h-[44px] ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
            >
              Bağla
            </button>
          </div>
        </div>
      )}

      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setPaymentModalOpen(null)} />
          <div className={`relative z-10 w-[92%] max-w-md rounded-2xl p-5 shadow-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <button
              onClick={() => setPaymentModalOpen(null)}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm border ${
                isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-600'
              }`}
              aria-label="Bağla"
            >
              ✕
            </button>
            {(() => {
              const pkg = packages.find(p => p.id === paymentModalOpen.packageId);
              const price = pkg ? calculatePrice(pkg.id) : 0;
              const days = pkg ? selectedDays[pkg.id] : 0;
              return (
                <>
                  <div className="text-2xl mb-2">💳</div>
                  <div className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Ödəniş üsulu</div>
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-3`}>
                    Alacağınız paket: <span className="font-semibold">{pkg?.name}</span> • <span className="font-semibold">{days} gün</span> • <span className="font-semibold">{price} AZN</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`px-3 py-2 rounded-xl font-bold min-h-[40px] text-sm ${paymentMethod === 'card' ? 'bg-emerald-600 text-white' : (isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800')}`}
                    >
                      Kartla ödə
                    </button>
                    <button
                      onClick={() => setPaymentMethod('balance')}
                      className={`px-3 py-2 rounded-xl font-bold min-h-[40px] text-sm ${paymentMethod === 'balance' ? 'bg-emerald-600 text-white' : (isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800')}`}
                    >
                      Balansla ödə
                    </button>
                  </div>
                  {paymentMethod === 'balance' && (
                    <div className={`mb-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Cari balans: <span className="font-semibold text-emerald-600">{balance} AZN</span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPaymentModalOpen(null)}
                      className={`px-4 py-2 rounded-xl font-bold min-h-[40px] border ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Bağla
                    </button>
                    <button
                      onClick={handleConfirmPayment}
                      className={`px-4 py-2 rounded-xl font-bold min-h-[40px] bg-emerald-600 hover:bg-emerald-700 text-white`}
                    >
                      Təsdiq et
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {otherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOtherModalOpen(null)} />
          <div className={`relative z-10 w-[92%] max-w-md rounded-2xl p-5 shadow-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <button
              onClick={() => setOtherModalOpen(null)}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm border ${
                isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-600'
              }`}
              aria-label="Bağla"
            >
              ✕
            </button>

            {otherModalStage === 'confirm' && (
              <>
                <div className="text-2xl mb-2"><EmojiIcon emoji="🛍️" size={24} /></div>
                <div className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Alışı təsdiqlə</div>
                <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-3`}>
                  Aşağıdakı məhsulu almaq istəyirsiniz?
                </div>
                <div className={`p-3 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-900/30 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs`}>Məhsul</div>
                  <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-base font-semibold`}>{otherModalOpen.title}</div>
                  <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs mt-2`}>Miqdar</div>
                  <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-xl font-extrabold`}>{otherModalOpen.count} ədəd</div>
                  <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs mt-2`}>Qiymət</div>
                  <div className={`text-emerald-600 text-lg font-black`}>{otherModalOpen.newPrice} AZN</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOtherModalOpen(null)}
                    className={`px-4 py-2 rounded-xl font-bold min-h-[40px] border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Bağla
                  </button>
                  <button
                    onClick={() => {
                      const success = purchaseTickets(otherModalOpen.count, otherModalOpen.newPrice, otherModalOpen.title);
                      setOtherModalStage(success ? 'success' : 'insufficient');
                    }}
                    className={`px-4 py-2 rounded-xl font-bold min-h-[40px] bg-emerald-600 hover:bg-emerald-700 text-white`}
                  >
                    Təsdiq et
                  </button>
                </div>
              </>
            )}

            {otherModalStage === 'success' && (
              <>
                <div className="text-4xl mb-2">✅</div>
                <div className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Uğurlu əməliyyat</div>
                <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-4`}>
                  {otherModalOpen?.title} ({otherModalOpen?.count} ədəd) alındı.
                </div>
                <button
                  onClick={() => setOtherModalOpen(null)}
                  className={`w-full px-4 py-2 rounded-xl font-bold min-h-[44px] ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                >
                  Bağla
                </button>
              </>
            )}

            {otherModalStage === 'insufficient' && (
              <>
                <div className="text-4xl mb-2"><EmojiIcon emoji="⚠️" size={32} /></div>
                <div className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Balans kifayət etmir</div>
                <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-4`}>
                  Balansınızı artırmağınız tövsiyə olunur.
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOtherModalOpen(null)}
                    className={`px-4 py-2 rounded-xl font-bold min-h-[40px] border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Bağla
                  </button>
                  <button
                    onClick={() => { setOtherModalOpen(null); navigate('Transactions'); }}
                    className={`px-4 py-2 rounded-xl font-bold min-h-[40px] bg-emerald-600 hover:bg-emerald-700 text-white`}
                  >
                    Balans artır
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {insufficientTrainingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setInsufficientTrainingOpen(false)} />
          <div className={`relative z-10 w-[92%] max-w-md rounded-2xl p-5 shadow-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="text-4xl mb-2"><EmojiIcon emoji="⚠️" size={32} /></div>
            <div className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Balans kifayət etmir</div>
            <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-4`}>
              {insufficientTrainingName} ({insufficientTrainingPrice} AZN) üçün balansınız yetərli deyil.
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setInsufficientTrainingOpen(false)}
                className={`px-4 py-2 rounded-xl font-bold min-h-[40px] border ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Bağla
              </button>
              <button
                onClick={() => { setInsufficientTrainingOpen(false); navigate('Transactions'); }}
                className={`px-4 py-2 rounded-xl font-bold min-h-[40px] bg-emerald-600 hover:bg-emerald-700 text-white`}
              >
                Balans artır
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

