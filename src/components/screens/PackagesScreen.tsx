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
  
  // Carousel state
  const [currentPackageIndex, setCurrentPackageIndex] = useState<number>(1); // Start with popular (standart)
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => setNowTs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'training') return;
      
      if (e.key === 'ArrowLeft') {
        prevPackage();
      } else if (e.key === 'ArrowRight') {
        nextPackage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPackageIndex, activeTab]);

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

  // Carousel handlers
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.touches[0].clientX);
    const offset = e.touches[0].clientX - touchStart;
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const swipeThreshold = 50;
    const distance = touchStart - touchEnd;
    
    if (Math.abs(distance) > swipeThreshold) {
      if (distance > 0 && currentPackageIndex < packages.length - 1) {
        // Swipe left - next package
        setCurrentPackageIndex(prev => prev + 1);
      } else if (distance < 0 && currentPackageIndex > 0) {
        // Swipe right - previous package
        setCurrentPackageIndex(prev => prev - 1);
      }
    }
    
    setDragOffset(0);
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Əgər event button və ya interactive elementdən gəlirsə, swipe-i başlatma
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Əgər event button və ya interactive elementdən gəlirsə, drag-i başlatma
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
    const offset = e.clientX - touchStart;
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const swipeThreshold = 50;
    const distance = touchStart - touchEnd;
    
    if (Math.abs(distance) > swipeThreshold) {
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

  const goToPackage = (index: number) => {
    setCurrentPackageIndex(index);
  };

  const nextPackage = () => {
    if (currentPackageIndex < packages.length - 1) {
      setCurrentPackageIndex(prev => prev + 1);
    }
  };

  const prevPackage = () => {
    if (currentPackageIndex > 0) {
      setCurrentPackageIndex(prev => prev - 1);
    }
  };

  return (
    <div className={`relative min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-gray-50'
    }`}>

      {/* Modern Header */}
      <div className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-900 border-gray-700/50' 
          : 'bg-white border-gray-200/50'
      }`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={goBack}
                className={`w-11 h-11 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 group ${
                  isDarkMode 
                    ? 'border-gray-600/50 bg-gray-800 hover:bg-gray-700 hover:border-gray-500 text-gray-200' 
                    : 'border-gray-300/50 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700'
                } hover:scale-105 active:scale-95`}
              >
                <span className="text-lg group-hover:translate-x-[-2px] transition-transform duration-200">←</span>
              </button>
              <div>
                <h1 className={`text-2xl font-black tracking-tight transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>Təlim Paketləri</h1>
                <p className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Premium təlim həlləri</p>
              </div>
            </div>
            
            {/* Balance Display */}
            <div className={`relative px-4 py-2.5 rounded-2xl border-2 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-emerald-900/30 border-emerald-500/40' 
                : 'bg-emerald-50 border-emerald-300/50'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'
                }`}></div>
                <span className={`text-xs font-medium ${
                  isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
                }`}>Balans</span>
              </div>
              <div className={`text-lg font-black ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                {balance} AZN
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 pb-20 pt-4">
        {/* Filter Buttons */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {activeTab === 'training' ? 'Təlim Paketləri' : 'Digər Paketlər'}
          </h2>
          
          <div className={`flex items-center gap-2 p-1 rounded-2xl border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-700/50' 
              : 'bg-white border-gray-200/50'
          }`}>
            <button
              onClick={() => setActiveTab('training')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeTab === 'training'
                  ? isDarkMode 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'bg-emerald-500 text-white shadow-md'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🎓 Təlim
            </button>
            
            <button
              onClick={() => setActiveTab('other')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeTab === 'other'
                  ? isDarkMode 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'bg-purple-500 text-white shadow-md'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📦 Digər
            </button>
          </div>
        </div>

        {activeTab === 'training' && (
          <div className="relative pb-4">
            {/* Carousel Container */}
            <div 
              className={`relative overflow-visible transition-all duration-300 ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => {
                if (isDragging) {
                  handleMouseUp();
                }
              }}
            >
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(calc(-${currentPackageIndex * 100}% + ${dragOffset}px))`,
                  transition: isDragging ? 'none' : 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {packages.map((pkg, index) => (
                  <div key={pkg.id} className="w-full flex-shrink-0 px-3">
                    <div className="relative group pointer-events-auto">
                      {/* Tamamilə Yeni Premium Kart Dizaynı */}
                      <div 
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
                        pkg.id === 'basic'
                          ? isDarkMode
                            ? 'bg-gradient-to-b from-orange-600 via-red-600 to-red-700'
                            : 'bg-gradient-to-b from-orange-400 via-red-500 to-red-600'
                          : pkg.popular 
                            ? isDarkMode 
                              ? 'bg-gradient-to-b from-emerald-500 via-green-600 to-teal-700'
                              : 'bg-gradient-to-b from-emerald-400 via-green-500 to-teal-600'
                            : isDarkMode
                              ? 'bg-gradient-to-b from-purple-600 via-blue-700 to-indigo-800'
                              : 'bg-gradient-to-b from-purple-500 via-blue-600 to-indigo-700'
                      } shadow-2xl`}>
                  

                        {/* Dekorativ Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-white/20 blur-3xl"></div>
                          <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-white/10 blur-3xl"></div>
                        </div>

                        {/* Məzmun Container */}
                        <div className="relative flex flex-col p-4 text-white">
                          
                          {/* Üst Badge */}
                          {pkg.popular && (
                            <div className="flex justify-end mb-2">
                              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                <span className="text-xs font-bold text-white">⭐ POPULYAR</span>
                              </div>
                            </div>
                          )}
                          
                          {pkg.id === 'basic' && (
                            <div className="mb-3">
                              {/* Modern Countdown Timer */}
                              <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-0.5 rounded-2xl">
                                <div className="bg-gray-900 rounded-2xl px-4 py-3">
                                  <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-yellow-400 text-sm">⚡</span>
                                      <span className="text-xs font-bold text-yellow-300 uppercase tracking-wide">
                                        Məhdud Təklif
                                      </span>
                                      <span className="text-yellow-400 text-sm">⚡</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1">
                                      {(() => {
                                        const ms = promoEndsAt - nowTs;
                                        const totalSeconds = Math.max(0, Math.floor(ms / 1000));
                                        const days = Math.floor(totalSeconds / (24 * 3600));
                                        const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
                                        const minutes = Math.floor((totalSeconds % 3600) / 60);
                                        const seconds = totalSeconds % 60;
                                        
                                        return (
                                          <>
                                            <div className="bg-white/10 px-2 py-1 rounded-lg min-w-[32px] text-center">
                                              <span className="text-white text-base font-black">{String(days).padStart(2, '0')}</span>
                                            </div>
                                            <span className="text-white/50 text-xs">:</span>
                                            <div className="bg-white/10 px-2 py-1 rounded-lg min-w-[32px] text-center">
                                              <span className="text-white text-base font-black">{String(hours).padStart(2, '0')}</span>
                                            </div>
                                            <span className="text-white/50 text-xs">:</span>
                                            <div className="bg-white/10 px-2 py-1 rounded-lg min-w-[32px] text-center">
                                              <span className="text-white text-base font-black">{String(minutes).padStart(2, '0')}</span>
                                            </div>
                                            <span className="text-white/50 text-xs">:</span>
                                            <div className="bg-white/10 px-2 py-1 rounded-lg min-w-[32px] text-center">
                                              <span className="text-white text-base font-black">{String(seconds).padStart(2, '0')}</span>
                                            </div>
                                          </>
                                        );
                                      })()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                  
                          {/* Paket İnfo */}
                          <div className="flex flex-col items-center space-y-2">
                            
                            {/* Kiçik Emoji İkon */}
                            <div className="text-4xl drop-shadow-2xl">
                              {pkg.id === 'basic' ? '🎯' : pkg.id === 'standart' ? '⭐' : '👑'}
                            </div>
                            
                            {/* Paket Adı */}
                            <div className="text-center">
                              <h3 className="text-xl font-black tracking-tight drop-shadow-lg">
                                {pkg.name}
                              </h3>
                            </div>

                            {/* Müddət Seçimi */}
                            <div className="w-full">
                              <p className="text-center text-xs font-semibold mb-1 opacity-90">Müddət seçin</p>
                              <div className="flex justify-center gap-1.5">
                                {(() => {
                                  const options = pkg.id === 'pro' ? dayOptions.filter(o => o.days === 45) : dayOptions;
                                  return options.map((option) => (
                                    <button
                                      key={option.days}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedDays(prev => ({ ...prev, [pkg.id]: option.days }));
                                      }}
                                      onMouseDown={(e) => e.stopPropagation()}
                                      onTouchStart={(e) => e.stopPropagation()}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                        selectedDays[pkg.id] === option.days
                                          ? 'bg-white text-gray-900 scale-105'
                                          : 'bg-white/20 border border-white/30 hover:bg-white/30'
                                      }`}
                                    >
                                      {option.days} gün
                                    </button>
                                  ));
                                })()}
                              </div>
                            </div>

                            {/* Qiymət */}
                            {(() => {
                              const { oldPrice, newPrice, discountPercent } = getPricePair(pkg.id);
                              return (
                                <div className="text-center space-y-1 w-full">
                                  {discountPercent > 0 && (
                                    <div className="flex items-center justify-center gap-2">
                                      <span className="text-xs font-bold line-through opacity-70">{oldPrice} AZN</span>
                                      <div className={`px-2.5 py-1 rounded-lg ${
                                        pkg.id === 'basic'
                                          ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                                          : pkg.popular
                                            ? 'bg-gradient-to-r from-green-400 to-emerald-400'
                                            : 'bg-gradient-to-r from-blue-400 to-purple-400'
                                      }`}>
                                        <span className="text-xs font-black text-gray-900">-{discountPercent}%</span>
                                      </div>
                                    </div>
                                  )}
                                  
                                  <div className="flex items-end justify-center gap-1.5 py-1">
                                    <span className="text-5xl font-black drop-shadow-2xl">
                                      {newPrice}
                                    </span>
                                    <span className="text-2xl font-bold pb-1">AZN</span>
                                  </div>
                                  
                                  <p className="text-xs opacity-75">{selectedDays[pkg.id]} günlük</p>
                                </div>
                              );
                            })()}
                          </div>

                          {/* Features - Kompakt */}
                          <div className="mt-3">
                            <h4 className="text-center font-bold text-xs mb-2 opacity-90">Daxil olan xidmətlər</h4>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                              <div className="space-y-1.5">
                                {pkg.features.map((feature, index) => (
                                  <div key={index} className="flex items-start gap-1.5 text-xs">
                                    <span className="text-white/90 flex-shrink-0">✓</span>
                                    <span className="font-medium opacity-95 leading-snug">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* CTA Button */}
                          <div className="mt-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePurchasePackage(pkg.id);
                              }}
                              onMouseDown={(e) => e.stopPropagation()}
                              onTouchStart={(e) => e.stopPropagation()}
                              className="w-full bg-white text-gray-900 py-3 rounded-xl font-black text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl"
                            >
                              {pkg.id === 'basic' ? '🔥 İndi Al' : pkg.popular ? '⭐ Paketi Al' : '👑 Premium Al'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sadə Navigation Arrows */}
            <button
              onClick={prevPackage}
              disabled={currentPackageIndex === 0}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
                currentPackageIndex === 0
                  ? 'opacity-0 pointer-events-none'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-200 border border-gray-600/50'
                    : 'bg-white text-gray-700 border border-gray-300/50'
              } hover:scale-110 active:scale-95`}
            >
              <span className="text-xl">‹</span>
            </button>

            <button
              onClick={nextPackage}
              disabled={currentPackageIndex === packages.length - 1}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
                currentPackageIndex === packages.length - 1
                  ? 'opacity-0 pointer-events-none'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-200 border border-gray-600/50'
                    : 'bg-white text-gray-700 border border-gray-300/50'
              } hover:scale-110 active:scale-95`}
            >
              <span className="text-xl">›</span>
            </button>

            {/* Sadə Indikatorlar */}
            <div className="flex justify-center items-center gap-2 mt-6">
              {packages.map((pkg, index) => (
                <button
                  key={pkg.id}
                  onClick={() => goToPackage(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentPackageIndex === index
                      ? 'w-8 h-2 bg-white'
                      : isDarkMode
                        ? 'w-2 h-2 bg-gray-600'
                        : 'w-2 h-2 bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'other' && (
          <div className="space-y-4">
            {/* Modern Other Packages Section */}
            <div className={`rounded-2xl border p-4 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700/50' 
                : 'bg-white border-gray-200/50'
            }`}>

              <div className="grid grid-cols-2 gap-3">
                {otherItems.map(item => (
                  <div key={item.id} className={`relative group rounded-xl border p-3 text-center transition-all duration-300 hover:scale-[1.02] ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600/50 hover:border-gray-500' 
                      : 'bg-gray-50 border-gray-200/50 hover:border-gray-300'
                  }`}>
                    <div className="text-2xl mb-2">🎟️</div>
                    <div className={`font-bold text-sm mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {item.title}
                    </div>
                    {item.description && (
                      <div className={`text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.description}
                      </div>
                    )}
                    
                    <div className="mb-3">
                      {(() => {
                        const discountPercent = Math.max(1, Math.round((1 - item.newPrice / item.oldPrice) * 100));
                        return (
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <span className={`text-xs line-through ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                {item.oldPrice} AZN
                              </span>
                              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500 text-white">
                                -{discountPercent}%
                              </span>
                            </div>
                            <div className="flex items-baseline justify-center gap-1">
                              <span className={`text-xl font-black ${
                                isDarkMode ? 'text-purple-400' : 'text-purple-600'
                              }`}>
                                {item.newPrice}
                              </span>
                              <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                AZN
                              </span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                    
                    <button 
                      onClick={() => handlePurchaseOther(item)}
                      className={`w-full py-2 px-3 rounded-lg font-bold text-xs transition-all duration-300 hover:scale-105 active:scale-95 ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                      } shadow-md`}
                    >
                      Əldə et
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className={`mt-6 rounded-2xl border backdrop-blur-sm p-4 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800/60 border-gray-700/50' 
            : 'bg-white/60 border-gray-200/50'
        }`}>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {[
              { icon: '💳', title: 'Kart' },
              { icon: '📱', title: 'Mobil' },
              { icon: '🏦', title: 'Bank' }
            ].map((method, index) => (
              <div key={index} className={`p-2 rounded-xl text-center transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/40 hover:bg-gray-700/50' 
                  : 'bg-white/40 hover:bg-gray-50/50'
              }`}>
                <div className="text-xl mb-1">{method.icon}</div>
                <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {method.title}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-4 text-xs">
            {[
              { icon: '🔒', text: 'Təhlükəsiz', color: 'text-green-500' },
              { icon: '⚡', text: 'Ani aktivləşmə', color: 'text-yellow-500' },
              { icon: '🎯', text: '7/24 dəstək', color: 'text-blue-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className={`${item.color}`}>{item.icon}</span>
                <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Activation Modal */}
      {activationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setActivationModalOpen(null)} />
          <div className={`relative z-10 w-full max-w-md rounded-3xl p-6 shadow-2xl border-2 backdrop-blur-xl transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-900/90 border-gray-700/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">⚡</div>
              <h2 className={`text-2xl font-black mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Aktivləşdirmə seçimi
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                İndi aktivləşdirin və ya aktivləşdirmə tarixini seçin
              </p>
            </div>

            {/* Modern Activation Mode Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setActivationMode('now')}
                className={`relative p-4 rounded-2xl border-2 font-bold text-sm transition-all duration-300 group ${
                  activationMode === 'now'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/25'
                    : isDarkMode
                      ? 'bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:border-emerald-500/50'
                      : 'bg-white/50 border-gray-300/50 text-gray-700 hover:bg-emerald-50/50 hover:border-emerald-400/50'
                } hover:scale-105 active:scale-95`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  <span>İndi başla</span>
                </div>
                {activationMode === 'now' && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-black">✓</span>
                  </div>
                )}
              </button>
              
              <button
                onClick={() => setActivationMode('date')}
                className={`relative p-4 rounded-2xl border-2 font-bold text-sm transition-all duration-300 group ${
                  activationMode === 'date'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-400 shadow-lg shadow-blue-500/25'
                    : isDarkMode
                      ? 'bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:border-blue-500/50'
                      : 'bg-white/50 border-gray-300/50 text-gray-700 hover:bg-blue-50/50 hover:border-blue-400/50'
                } hover:scale-105 active:scale-95`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl">📅</span>
                  <span>Tarixi seç</span>
                </div>
                {activationMode === 'date' && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-black">✓</span>
                  </div>
                )}
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

            {/* Modern Action Buttons */}
            <div className={`grid grid-cols-2 gap-4 mt-6 pt-6 ${isDarkMode ? 'border-t border-gray-700/50' : 'border-t border-gray-200/50'}`}>
              <button
                onClick={() => setActivationModalOpen(null)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isDarkMode 
                    ? 'bg-gray-800/80 border-2 border-gray-600/50 text-gray-200 hover:bg-gray-700/80' 
                    : 'bg-gray-100/80 border-2 border-gray-300/50 text-gray-700 hover:bg-gray-200/80'
                }`}
              >
                Bağla
              </button>
              <button
                onClick={() => activationModalOpen && openPaymentFor(activationModalOpen.packageId)}
                disabled={activationMode === 'date' && !activationDate}
                className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                  activationMode === 'date' && !activationDate
                    ? 'bg-gray-400/50 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" onClick={() => setPaymentModalOpen(null)} />
          {(() => {
            const pkg = packages.find(p => p.id === paymentModalOpen.packageId);
            const price = pkg ? calculatePrice(pkg.id) : 0;
            const days = pkg ? selectedDays[pkg.id] : 0;
            
            return (
              <div className={`relative z-10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
              }`}>
                
                {/* Header with gradient */}
                <div className={`relative p-6 ${
                  pkg?.id === 'basic'
                    ? 'bg-gradient-to-br from-orange-500 to-red-600'
                    : pkg?.popular
                      ? 'bg-gradient-to-br from-emerald-500 to-green-600'
                      : 'bg-gradient-to-br from-purple-500 to-blue-600'
                } text-white`}>
                  <button
                    onClick={() => setPaymentModalOpen(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    <span className="text-xl font-bold">✕</span>
                  </button>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-5xl">💳</div>
                    <div>
                      <h3 className="text-2xl font-black">Ödəniş</h3>
                      <p className="text-sm opacity-90">Ödəniş üsulunu seçin</p>
                    </div>
                  </div>
                  
                  {/* Package Info Card */}
                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs opacity-80 uppercase tracking-wider">Paket</span>
                      <span className="text-lg font-black">{pkg?.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs opacity-80 uppercase tracking-wider">Müddət</span>
                      <span className="font-bold">{days} gün</span>
                    </div>
                    <div className="h-px bg-white/20 my-3"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">Ödəniləcək məbləğ</span>
                      <span className="text-3xl font-black">{price} ₼</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="p-6">
                  <h4 className={`text-sm font-bold mb-4 uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Ödəniş üsulu
                  </h4>
                  
                  <div className="space-y-3 mb-6">
                    {/* Balance Payment */}
                    <button
                      onClick={() => setPaymentMethod('balance')}
                      className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 ${
                        paymentMethod === 'balance'
                          ? isDarkMode
                            ? 'bg-emerald-900/30 border-emerald-500 shadow-lg shadow-emerald-500/20'
                            : 'bg-emerald-50 border-emerald-500 shadow-lg shadow-emerald-500/20'
                          : isDarkMode
                            ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                            : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            paymentMethod === 'balance' ? 'bg-emerald-500' : isDarkMode ? 'bg-gray-700' : 'bg-white'
                          }`}>
                            <span className="text-2xl">{paymentMethod === 'balance' ? '✓' : '💰'}</span>
                          </div>
                          <div className="text-left">
                            <div className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                              Balansla ödə
                            </div>
                            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Cari balans: <span className="font-bold text-emerald-600">{balance} AZN</span>
                            </div>
                          </div>
                        </div>
                        {paymentMethod === 'balance' && (
                          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Card Payment */}
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 ${
                        paymentMethod === 'card'
                          ? isDarkMode
                            ? 'bg-blue-900/30 border-blue-500 shadow-lg shadow-blue-500/20'
                            : 'bg-blue-50 border-blue-500 shadow-lg shadow-blue-500/20'
                          : isDarkMode
                            ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                            : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            paymentMethod === 'card' ? 'bg-blue-500' : isDarkMode ? 'bg-gray-700' : 'bg-white'
                          }`}>
                            <span className="text-2xl">{paymentMethod === 'card' ? '✓' : '💳'}</span>
                          </div>
                          <div className="text-left">
                            <div className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                              Kartla ödə
                            </div>
                            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Debet və ya kredit kart
                            </div>
                          </div>
                        </div>
                        {paymentMethod === 'card' && (
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleConfirmPayment}
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 rounded-2xl font-black text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-emerald-500/30"
                    >
                      Ödənişi Tamamla
                    </button>
                    
                    <button
                      onClick={() => setPaymentModalOpen(null)}
                      className={`w-full py-3 rounded-2xl font-bold transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Ləğv et
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
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

