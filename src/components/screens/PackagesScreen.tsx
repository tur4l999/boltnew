import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Calendar } from '../ui/Calendar';
import { EmojiIcon } from '../ui/EmojiIcon';

interface Package {
  id: string;
  name: string;
  basePrice: number;
  features: string[];
  popular?: boolean;
  color: string;
  icon: string;
  gradient: string;
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
  
  // Swipe state
  const [currentPackageIndex, setCurrentPackageIndex] = useState(1);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
      icon: '🎯',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
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
      icon: '⭐',
      gradient: 'from-emerald-500 via-green-500 to-teal-500',
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
      icon: '👑',
      gradient: 'from-blue-500 via-purple-500 to-indigo-500',
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentTouch = e.touches[0].clientX;
    const diff = currentTouch - touchStart;
    setDragOffset(diff);
    setTouchEnd(currentTouch);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const minSwipeDistance = 50;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0 && currentPackageIndex < packages.length - 1) {
        setCurrentPackageIndex(prev => prev + 1);
      } else if (distance < 0 && currentPackageIndex > 0) {
        setCurrentPackageIndex(prev => prev - 1);
      }
    }
    setDragOffset(0);
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handlePurchasePackage = (packageId: string) => {
    setActivationModalOpen({ packageId });
    setActivationMode('now');
    setActivationDate(null);
  };

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

  const currentPackage = packages[currentPackageIndex];
  const { oldPrice, newPrice, discountPercent } = getPricePair(currentPackage.id);

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
        isDarkMode ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-200'
      }`}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={goBack} className={`w-10 h-10 rounded-xl ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            } shadow-lg`}>
              ←
            </button>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('training')}
                className={`px-3 py-2 rounded-lg text-xs font-bold ${
                  activeTab === 'training'
                    ? 'bg-emerald-500 text-white'
                    : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                🎓
              </button>
              <button
                onClick={() => setActiveTab('other')}
                className={`px-3 py-2 rounded-lg text-xs font-bold ${
                  activeTab === 'other'
                    ? 'bg-purple-500 text-white'
                    : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                📦
              </button>
              
              <div className={`px-3 py-1.5 rounded-lg ${
                isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'
              }`}>
                <span className={`text-xs font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  {balance} AZN
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'training' && (
        <div className="relative h-[calc(100vh-130px)]">
          <div
            ref={containerRef}
            className="h-full overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex h-full gap-6 transition-transform duration-300 ease-out px-3 py-6"
              style={{
                transform: `translateX(calc(-${currentPackageIndex * 100}% - ${currentPackageIndex * 24}px + ${dragOffset}px))`
              }}
            >
              {packages.map((pkg, index) => {
                const isActive = index === currentPackageIndex;
                const { oldPrice, newPrice, discountPercent } = getPricePair(pkg.id);
                
                return (
                  <div
                    key={pkg.id}
                    className="flex-shrink-0 h-full"
                    style={{ width: 'calc(94vw - 12px)', maxWidth: '420px' }}
                  >
                    <div className={`h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${
                      isActive ? 'scale-100 opacity-100' : 'scale-85 opacity-20 blur-sm'
                    } ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      
                      {/* Left Color Panel */}
                      <div className={`absolute left-0 top-0 bottom-0 w-[38%] bg-gradient-to-br ${pkg.gradient} flex flex-col items-center justify-center p-6`}>
                        <div className="text-8xl mb-8 filter drop-shadow-2xl">
                          {pkg.icon}
                        </div>
                        
                        <div className="bg-black/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                          <div className="text-white/60 text-xs font-bold line-through mb-1 text-center">{oldPrice}</div>
                          <div className="text-white text-5xl font-black text-center">{newPrice}</div>
                          <div className="text-white/90 text-base font-bold text-center">AZN</div>
                        </div>
                      </div>

                      {/* Right Content Panel */}
                      <div className="absolute left-[38%] right-0 top-0 bottom-0 flex flex-col">
                        
                        {/* Badges */}
                        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 items-end">
                          {pkg.popular && (
                            <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-lg">
                              ⭐ POPULYAR
                            </div>
                          )}
                          {pkg.id === 'basic' && (
                            <div className="bg-red-500 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-lg animate-pulse">
                              🔥 -{discountPercent}%
                            </div>
                          )}
                        </div>

                        {/* Header */}
                        <div className="px-6 pt-8 pb-4">
                          <h2 className={`text-2xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {pkg.name}
                          </h2>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {selectedDays[pkg.id]} günlük giriş
                          </div>
                          
                          {pkg.id === 'basic' && (
                            <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/30">
                              <span className="text-[10px] font-bold text-red-500">⏰</span>
                              <span className="text-[10px] font-black text-red-600">{formatRemaining(promoEndsAt - nowTs)}</span>
                            </div>
                          )}
                        </div>

                        {/* Duration Pills */}
                        <div className="px-6 py-3">
                          {(() => {
                            const options = pkg.id === 'pro' ? dayOptions.filter(o => o.days === 45) : dayOptions;
                            return (
                              <div className="flex gap-2">
                                {options.map((option) => (
                                  <button
                                    key={option.days}
                                    onClick={() => setSelectedDays(prev => ({ ...prev, [pkg.id]: option.days }))}
                                    className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                                      selectedDays[pkg.id] === option.days
                                        ? isDarkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
                                        : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                                    }`}
                                  >
                                    {option.days} gün
                                  </button>
                                ))}
                              </div>
                            );
                          })()}
                        </div>

                        {/* Features */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
                          <div className="space-y-2">
                            {pkg.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <div className={`flex-shrink-0 w-4 h-4 rounded-md bg-gradient-to-br ${pkg.gradient} flex items-center justify-center text-white text-[8px] font-black mt-0.5`}>
                                  ✓
                                </div>
                                <span className={`text-xs leading-tight ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <div className="p-6 pt-4">
                          <button
                            onClick={() => handlePurchasePackage(pkg.id)}
                            className={`w-full py-4 rounded-2xl font-black text-base transition-all ${
                              isDarkMode ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'
                            } shadow-xl`}
                          >
                            İNDİ ALIN • {newPrice} AZN
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-0 right-0 z-30">
            <div className="flex items-center justify-center gap-2">
              {packages.map((pkg, index) => (
                <button
                  key={pkg.id}
                  onClick={() => setCurrentPackageIndex(index)}
                  className={`rounded-full transition-all ${
                    index === currentPackageIndex ? 'w-8 h-2 bg-emerald-500' : 'w-2 h-2 bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'other' && (
        <div className="px-4 py-6">
          <div className="grid grid-cols-2 gap-3">
            {otherItems.map(item => {
              const discountPercent = Math.max(1, Math.round((1 - item.newPrice / item.oldPrice) * 100));
              return (
                <div key={item.id} className={`rounded-2xl border p-4 text-center ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className="text-3xl mb-2">🎟️</div>
                  <div className={`font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-sm line-through text-gray-500">{item.oldPrice}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-500 text-white">-{discountPercent}%</span>
                  </div>
                  <div className="text-2xl font-black text-purple-500 mb-3">{item.newPrice} AZN</div>
                  <button
                    onClick={() => handlePurchaseOther(item)}
                    className="w-full py-2 px-3 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  >
                    Əldə et
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setActivationModalOpen(null)} />
          <div className={`relative z-10 w-full max-w-md rounded-2xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Aktivləşdirmə</h2>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => setActivationMode('now')}
                className={`p-4 rounded-xl font-bold ${
                  activationMode === 'now' ? 'bg-emerald-500 text-white' : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}
              >
                🚀 İndi
              </button>
              <button
                onClick={() => setActivationMode('date')}
                className={`p-4 rounded-xl font-bold ${
                  activationMode === 'date' ? 'bg-blue-500 text-white' : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}
              >
                📅 Tarix
              </button>
            </div>

            {activationMode === 'date' && (
              <div className={`p-3 rounded-xl mb-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <Calendar initialDate={new Date()} minDate={new Date()} onChange={(d) => setActivationDate(d)} />
                <div className="mt-2 flex gap-2">
                  <select value={activationHour} onChange={(e) => setActivationHour(e.target.value)} className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                    {Array.from({ length: 24 }).map((_, i) => {
                      const v = String(i).padStart(2, '0');
                      return <option key={v} value={v}>{v}</option>;
                    })}
                  </select>
                  <select value={activationMinute} onChange={(e) => setActivationMinute(e.target.value)} className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                    {['00','15','30','45'].map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setActivationModalOpen(null)} className={`py-3 rounded-xl font-bold ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}>
                Bağla
              </button>
              <button
                onClick={() => activationModalOpen && openPaymentFor(activationModalOpen.packageId)}
                disabled={activationMode === 'date' && !activationDate}
                className={`py-3 rounded-xl font-bold ${
                  activationMode === 'date' && !activationDate
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600'
                }`}
              >
                Davam
              </button>
            </div>
          </div>
        </div>
      )}

      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setPaymentModalOpen(null)} />
          <div className={`relative z-10 w-full max-w-md rounded-2xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Ödəniş</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`py-3 rounded-xl font-bold ${paymentMethod === 'card' ? 'bg-emerald-500 text-white' : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100'}`}
              >
                Kart
              </button>
              <button
                onClick={() => setPaymentMethod('balance')}
                className={`py-3 rounded-xl font-bold ${paymentMethod === 'balance' ? 'bg-emerald-500 text-white' : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100'}`}
              >
                Balans
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setPaymentModalOpen(null)} className={`py-3 rounded-xl font-bold ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}>
                Bağla
              </button>
              <button onClick={handleConfirmPayment} className="py-3 rounded-xl font-bold bg-emerald-500 text-white">
                Təsdiq
              </button>
            </div>
          </div>
        </div>
      )}

      {scheduledPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => { setScheduledPopupOpen(false); switchTab('Home'); }} />
          <div className={`relative z-10 w-full max-w-md rounded-2xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-4xl mb-2">⏰</div>
            <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Aktivləşdirmə planlaşdırıldı
            </h2>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {scheduledName} - {scheduledAt?.toLocaleString('az-AZ')}
            </p>
            <button
              onClick={() => { setScheduledPopupOpen(false); switchTab('Home'); }}
              className="w-full py-3 rounded-xl font-bold bg-emerald-500 text-white"
            >
              Bağla
            </button>
          </div>
        </div>
      )}

      {otherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOtherModalOpen(null)} />
          <div className={`relative z-10 w-full max-w-md rounded-2xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {otherModalStage === 'confirm' && (
              <>
                <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Təsdiq</h2>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {otherModalOpen.title} - {otherModalOpen.newPrice} AZN
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setOtherModalOpen(null)} className={`py-3 rounded-xl font-bold ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}>
                    Bağla
                  </button>
                  <button
                    onClick={() => {
                      const success = purchaseTickets(otherModalOpen.count, otherModalOpen.newPrice, otherModalOpen.title);
                      setOtherModalStage(success ? 'success' : 'insufficient');
                    }}
                    className="py-3 rounded-xl font-bold bg-emerald-500 text-white"
                  >
                    Təsdiq
                  </button>
                </div>
              </>
            )}
            {otherModalStage === 'success' && (
              <>
                <div className="text-4xl mb-2">✅</div>
                <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Uğurlu</h2>
                <button onClick={() => setOtherModalOpen(null)} className="w-full py-3 rounded-xl font-bold bg-emerald-500 text-white">
                  Bağla
                </button>
              </>
            )}
            {otherModalStage === 'insufficient' && (
              <>
                <div className="text-4xl mb-2">⚠️</div>
                <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Balans kifayət etmir</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setOtherModalOpen(null)} className={`py-3 rounded-xl font-bold ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}>
                    Bağla
                  </button>
                  <button onClick={() => { setOtherModalOpen(null); navigate('Transactions'); }} className="py-3 rounded-xl font-bold bg-emerald-500 text-white">
                    Balans artır
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {insufficientTrainingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setInsufficientTrainingOpen(false)} />
          <div className={`relative z-10 w-full max-w-md rounded-2xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-4xl mb-2">⚠️</div>
            <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Balans kifayət etmir</h2>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {insufficientTrainingName} ({insufficientTrainingPrice} AZN)
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setInsufficientTrainingOpen(false)} className={`py-3 rounded-xl font-bold ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}>
                Bağla
              </button>
              <button onClick={() => { setInsufficientTrainingOpen(false); navigate('Transactions'); }} className="py-3 rounded-xl font-bold bg-emerald-500 text-white">
                Balans artır
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
