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
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
  };

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

  const handleMouseDown = (e: React.MouseEvent) => {
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
    <div className={`relative min-h-screen transition-all duration-500 overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-black' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-30 animate-pulse ${
          isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-300/40'
        }`} style={{ animationDuration: '4s' }}></div>
        <div className={`absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
          isDarkMode ? 'bg-purple-500/20' : 'bg-purple-300/40'
        }`} style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10 animate-pulse ${
          isDarkMode ? 'bg-blue-500/20' : 'bg-blue-300/40'
        }`} style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
      </div>

      {/* Ultra Modern Header with Glassmorphism */}
      <div className={`sticky top-0 z-50 backdrop-blur-2xl border-b transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gray-900/70 border-gray-700/30 shadow-xl shadow-black/20' 
          : 'bg-white/70 border-gray-200/40 shadow-xl shadow-gray-300/20'
      }`}>
        <div className="px-5 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={goBack}
                className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 group backdrop-blur-xl ${
                  isDarkMode 
                    ? 'border-gray-600/40 bg-gradient-to-br from-gray-800/60 to-gray-900/60 hover:from-gray-700/80 hover:to-gray-800/80 hover:border-emerald-500/50 text-gray-200 shadow-lg shadow-black/30' 
                    : 'border-gray-300/40 bg-gradient-to-br from-white/60 to-gray-50/60 hover:from-gray-50/80 hover:to-white/80 hover:border-emerald-400/50 text-gray-700 shadow-lg shadow-gray-400/30'
                } hover:scale-110 active:scale-95`}
              >
                <span className="text-xl font-bold group-hover:translate-x-[-3px] transition-transform duration-300">←</span>
              </button>
              <div>
                <h1 className={`text-2xl font-black tracking-tight transition-colors duration-300 bg-gradient-to-r bg-clip-text ${
                  isDarkMode 
                    ? 'from-emerald-400 via-green-400 to-teal-400 text-transparent' 
                    : 'from-emerald-600 via-green-600 to-teal-600 text-transparent'
                }`}>Təlim Paketləri</h1>
                <p className={`text-sm font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>✨ Premium təhsil həlləri</p>
              </div>
            </div>
            
            {/* Premium Balance Display */}
            <div className={`relative px-5 py-3 rounded-2xl border-2 backdrop-blur-xl transition-all duration-500 overflow-hidden group hover:scale-105 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-emerald-500/40 shadow-lg shadow-emerald-500/20' 
                : 'bg-gradient-to-br from-emerald-50/80 to-green-50/80 border-emerald-300/60 shadow-lg shadow-emerald-500/20'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-lg ${
                    isDarkMode ? 'bg-emerald-400 shadow-emerald-400/50' : 'bg-emerald-500 shadow-emerald-500/50'
                  }`}></div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
                  }`}>Balans</span>
                </div>
                <div className={`text-xl font-black ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  {balance} AZN
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 pb-20 pt-4">
        {/* Ultra Modern Filter Buttons */}
        <div className="flex items-center justify-center mb-6 relative z-10">
          <div className={`flex items-center gap-3 p-1.5 rounded-3xl border-2 backdrop-blur-2xl transition-all duration-500 shadow-2xl ${
            isDarkMode 
              ? 'bg-gray-900/60 border-gray-700/40 shadow-black/30' 
              : 'bg-white/60 border-gray-200/40 shadow-gray-400/20'
          }`}>
            <button
              onClick={() => setActiveTab('training')}
              className={`px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-wider transition-all duration-500 flex items-center gap-2 ${
                activeTab === 'training'
                  ? isDarkMode 
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/40 scale-105' 
                    : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/40 scale-105'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-gray-200 hover:scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:scale-105'
              }`}
            >
              <span className="text-lg">🎓</span>
              <span>Təlim</span>
            </button>
            
            <button
              onClick={() => setActiveTab('other')}
              className={`px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-wider transition-all duration-500 flex items-center gap-2 ${
                activeTab === 'other'
                  ? isDarkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/40 scale-105' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/40 scale-105'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-gray-200 hover:scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:scale-105'
              }`}
            >
              <span className="text-lg">🎁</span>
              <span>Digər</span>
            </button>
          </div>
        </div>

        {activeTab === 'training' && (
          <div className="relative">
            {/* Modern Carousel Container with Enhanced Effects */}
            <div 
              className={`relative overflow-visible transition-all duration-300 perspective-1000 ${
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
                    <div className="relative group">
                      {/* Ultra Modern Package Card with 3D Effects */}
                      <div className={`relative overflow-hidden rounded-[2rem] border-2 backdrop-blur-xl transition-all duration-700 transform hover:scale-[1.02] ${
                        pkg.id === 'basic'
                          ? isDarkMode
                            ? 'bg-gradient-to-br from-red-950/80 via-orange-950/70 to-red-900/80 border-red-500/60 shadow-2xl shadow-red-500/40 min-h-[420px]'
                            : 'bg-gradient-to-br from-red-100 via-orange-50 to-red-50 border-red-400/60 shadow-2xl shadow-red-500/40 min-h-[420px]'
                          : pkg.popular 
                            ? isDarkMode 
                              ? 'bg-gradient-to-br from-emerald-950/80 via-green-950/70 to-emerald-900/80 border-emerald-500/60 shadow-2xl shadow-emerald-500/40'
                              : 'bg-gradient-to-br from-emerald-100 via-green-50 to-emerald-50 border-emerald-400/60 shadow-2xl shadow-emerald-500/40'
                            : isDarkMode
                              ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-600/50 hover:border-gray-500/70 shadow-xl shadow-gray-900/30'
                              : 'bg-gradient-to-br from-white to-gray-50 border-gray-300/50 hover:border-gray-400/70 shadow-xl shadow-gray-400/30'
                      }`}>
                  

                  {/* Ultra Modern Popular Badge */}
                  {pkg.popular && (
                    <>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30 animate-pulse">
                        <div className={`px-8 py-3 rounded-t-none rounded-b-3xl text-sm font-black shadow-2xl border-2 border-t-0 transition-all duration-500 backdrop-blur-xl ${
                          isDarkMode 
                            ? 'bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 text-white border-emerald-400/60 shadow-emerald-500/60'
                            : 'bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 text-white border-emerald-300/60 shadow-emerald-500/60'
                        }`}>
                          <div className="flex items-center gap-2">
                            <span className="text-xl animate-bounce">⭐</span>
                            <span className="whitespace-nowrap tracking-widest">ƏN POPULYAR</span>
                            <span className="text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>⭐</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-6 right-4 text-4xl z-20">
                        <div className="animate-bounce" style={{ animationDuration: '1s' }}>🔥</div>
                      </div>
                    </>
                  )}
                  
                  {/* Ultra Modern Discount for Basic Package */}
                  {pkg.id === 'basic' && (
                    <>
                      {/* Premium Flash Sale Banner */}
                      <div className="absolute top-0 left-0 right-0 z-20 overflow-hidden rounded-t-[2rem]">
                        <div className="relative bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white text-center py-4 px-4 shadow-2xl">
                          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-[shimmer_2s_infinite]"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/40 to-yellow-400/20 animate-pulse"></div>
                          <div className="relative flex items-center justify-center gap-3">
                            <span className="text-3xl animate-bounce drop-shadow-2xl">🔥</span>
                            <div className="flex flex-col">
                              <span className="text-base font-black tracking-[0.2em] drop-shadow-xl">FLASH ENDİRİM</span>
                              <span className="text-xs font-extrabold opacity-95 tracking-wider">MƏHDUD VAXT!</span>
                            </div>
                            <span className="text-3xl animate-bounce drop-shadow-2xl" style={{ animationDelay: '0.15s' }}>⚡</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Ultra Modern Countdown Timer */}
                      <div className="absolute top-20 left-4 right-4 z-20">
                        <div className="bg-gradient-to-br from-gray-950/95 via-black/95 to-gray-900/95 text-white text-center py-3 px-4 rounded-2xl shadow-2xl border-2 border-red-400/60 backdrop-blur-xl">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-sm font-extrabold text-red-400 animate-pulse">⏰ BİTİR:</span>
                            <span className="text-base font-black text-yellow-300 tracking-wider animate-pulse drop-shadow-lg">
                              {formatRemaining(promoEndsAt - nowTs)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Premium Scarcity Indicator */}
                      <div className="absolute top-[7.5rem] right-4 z-20">
                        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white px-4 py-2 rounded-full text-xs font-black shadow-2xl border-2 border-yellow-400/60 animate-pulse backdrop-blur-sm">
                          <span className="flex items-center gap-2">
                            <span className="text-lg animate-bounce">⚠️</span>
                            <span className="tracking-wider">SON ŞANS</span>
                          </span>
                        </div>
                      </div>

                      {/* Enhanced Animated sparkles */}
                      <div className="absolute top-8 left-6 text-yellow-300 animate-ping z-15 drop-shadow-2xl">
                        <span className="text-2xl">✨</span>
                      </div>
                      <div className="absolute top-16 right-8 text-yellow-300 animate-ping z-15 drop-shadow-2xl" style={{animationDelay: '0.5s'}}>
                        <span className="text-2xl">✨</span>
                      </div>
                      <div className="absolute top-[6.5rem] left-8 text-yellow-300 animate-ping z-15 drop-shadow-2xl" style={{animationDelay: '1s'}}>
                        <span className="text-xl">💫</span>
                      </div>
                    </>
                  )}

                  {/* Enhanced Decorative Elements */}
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-16 translate-x-16 transition-all duration-700 group-hover:scale-150 ${
                    pkg.popular 
                      ? 'bg-gradient-to-br from-emerald-400/30 to-green-400/30'
                      : pkg.id === 'basic'
                        ? 'bg-gradient-to-br from-red-400/25 to-orange-400/25 group-hover:from-red-300/35 group-hover:to-orange-300/35'
                        : 'bg-gradient-to-br from-blue-400/20 to-purple-400/20'
                  }`}></div>
                  
                  {/* Additional glow for discounted basic package */}
                  {pkg.id === 'basic' && (
                    <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl translate-y-12 -translate-x-12 bg-gradient-to-tr from-orange-400/15 to-red-400/15 transition-all duration-700 group-hover:scale-125"></div>
                  )}
                  
                  {/* Card Content */}
                  <div className={`relative z-10 p-4 ${pkg.popular ? 'pt-16' : pkg.id === 'basic' ? 'pt-36' : 'pt-4'}`}>
                    
                    {/* Package Header */}
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                          pkg.popular 
                            ? isDarkMode 
                              ? 'bg-emerald-500/20 border border-emerald-400/30'
                              : 'bg-emerald-100 border border-emerald-300/50'
                            : isDarkMode
                              ? 'bg-gray-700/50 border border-gray-600/30'
                              : 'bg-gray-100 border border-gray-200/50'
                        }`}>
{pkg.id === 'basic' ? '🎯' : pkg.id === 'standart' ? '⭐' : '👑'}
                        </div>
                        <div>
                          <h3 className={`text-lg font-bold tracking-tight ${
                            pkg.popular 
                              ? (isDarkMode ? 'text-emerald-300' : 'text-emerald-700') 
                              : isDarkMode ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {pkg.name}
                          </h3>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {selectedDays[pkg.id]} gün müddətinə
                          </p>
                        </div>
                      </div>

                      {/* Ultra Modern Pricing Display */}
                      <div className="relative">
                        {(() => {
                          const { oldPrice, newPrice, discountPercent } = getPricePair(pkg.id);
                          return (
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-3 mb-3">
                                <span className={`text-base line-through font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                  {oldPrice} AZN
                                </span>
                                <span className={`px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider shadow-xl ${
                                  pkg.popular 
                                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                                    : pkg.id === 'basic'
                                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse'
                                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                }`}>
                                  -{discountPercent}%
                                </span>
                              </div>
                              <div className="flex items-baseline justify-center gap-2">
                                <span className={`text-5xl font-black tracking-tighter drop-shadow-2xl ${
                                  pkg.popular 
                                    ? isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                                    : pkg.id === 'basic'
                                      ? isDarkMode ? 'text-orange-400' : 'text-orange-600'
                                      : isDarkMode ? 'text-gray-100' : 'text-gray-900'
                                }`}>
                                  {newPrice}
                                </span>
                                <span className={`text-xl font-extrabold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  AZN
                                </span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Modern Day Selection */}
                    <div className="mb-4">
                      <h4 className={`font-medium text-center mb-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Müddət seçin
                      </h4>
                      {(() => {
                        const options = pkg.id === 'pro' ? dayOptions.filter(o => o.days === 45) : dayOptions;
                        return (
                          <div className={`grid ${options.length === 1 ? 'grid-cols-1' : 'grid-cols-3'} gap-2`}>
                            {options.map((option) => (
                              <button
                                key={option.days}
                                onClick={() => setSelectedDays(prev => ({ ...prev, [pkg.id]: option.days }))}
                                className={`relative p-2 rounded-xl border font-medium text-xs transition-all duration-300 group ${
                                  selectedDays[pkg.id] === option.days
                                    ? pkg.popular
                                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/25'
                                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-400 shadow-lg shadow-blue-500/25'
                                    : isDarkMode
                                      ? 'bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500/70'
                                      : 'bg-white/50 border-gray-300/50 text-gray-700 hover:bg-gray-50/80 hover:border-gray-400/70'
                                } hover:scale-105 active:scale-95`}
                              >
                                <div className="flex items-center justify-center">
                                  <span className="font-bold">{option.days} gün</span>
                                </div>
                                {selectedDays[pkg.id] === option.days && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <span className="text-[10px]">✓</span>
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Compact Features List - 2 Column Layout */}
                    <div className="mb-4">
                      <h4 className={`font-medium text-center mb-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Daxil olan xidmətlər
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {pkg.features.map((feature, index) => (
                          <div key={index} className={`flex items-start gap-2 text-xs ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] mt-0.5 ${
                              pkg.popular 
                                ? 'bg-emerald-500'
                                : 'bg-blue-500'
                            }`}>
                              ✓
                            </div>
                            <span className="font-medium leading-tight">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ultra Modern CTA Button with Premium Effects */}
                    <button
                      onClick={() => handlePurchasePackage(pkg.id)}
                      className={`w-full relative overflow-hidden rounded-2xl py-5 px-6 font-black text-base transition-all duration-500 group hover:scale-[1.08] active:scale-[0.92] shadow-2xl ${
                        pkg.popular 
                          ? 'bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-700 text-white shadow-emerald-500/50 border-2 border-emerald-400/60'
                          : pkg.id === 'basic'
                            ? isDarkMode
                              ? 'bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-700 hover:via-orange-700 hover:to-red-700 text-white shadow-red-500/60 border-2 border-yellow-400/60'
                              : 'bg-gradient-to-r from-red-500 via-orange-500 to-red-500 hover:from-red-600 hover:via-orange-600 hover:to-red-600 text-white shadow-red-500/60 border-2 border-yellow-400/60'
                            : isDarkMode
                              ? 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700 hover:from-gray-600 hover:via-gray-700 hover:to-gray-600 text-white shadow-gray-900/40 border-2 border-gray-600/50'
                              : 'bg-gradient-to-br from-gray-200 via-white to-gray-200 hover:from-gray-300 hover:via-gray-50 hover:to-gray-300 text-gray-900 border-2 border-gray-300 shadow-gray-400/40'
                      }`}
                    >
                      {/* Premium Shimmer Effect */}
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      
                      {/* Enhanced Special overlay for basic package */}
                      {pkg.id === 'basic' && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-transparent to-yellow-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        </>
                      )}
                      
                      {/* Popular package glow */}
                      {pkg.popular && (
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                      )}
                      
                      <div className="relative flex items-center justify-center gap-3">
                        <span className={`text-2xl drop-shadow-2xl ${pkg.id === 'basic' ? 'animate-bounce' : pkg.popular ? 'animate-pulse' : ''}`}>
                          {pkg.id === 'basic' ? '🔥' : pkg.id === 'standart' ? '⭐' : '👑'}
                        </span>
                        <div className="flex flex-col items-center">
                          <span className={`text-sm font-black tracking-[0.15em] uppercase drop-shadow-xl ${
                            pkg.id === 'basic' 
                              ? 'text-yellow-100 animate-pulse' 
                              : pkg.popular 
                                ? 'text-emerald-100' 
                                : isDarkMode ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {pkg.id === 'basic' ? 'İNDİ AL!' : pkg.popular ? 'ƏN SEÇİLƏN' : 'PAKETİ AL'}
                          </span>
                          <span className={`text-2xl font-black tracking-tight drop-shadow-2xl ${
                            pkg.id === 'basic' ? 'text-yellow-50' : pkg.popular ? 'text-white' : ''
                          }`}>
                            {calculatePrice(pkg.id)} AZN
                          </span>
                          {pkg.id === 'basic' && (
                            <span className="text-xs font-extrabold text-yellow-100 animate-bounce mt-1 drop-shadow-lg uppercase tracking-wider">
                              💰 Qənaət: {(() => {
                                const { oldPrice, newPrice } = getPricePair(pkg.id);
                                return `${oldPrice - newPrice} AZN`;
                              })()} 
                            </span>
                          )}
                        </div>
                        <span className={`text-2xl drop-shadow-2xl ${pkg.id === 'basic' ? 'animate-bounce' : pkg.popular ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.2s' }}>
                          {pkg.id === 'basic' ? '⚡' : pkg.id === 'standart' ? '✨' : '🌟'}
                        </span>
                      </div>
                    </button>
                  </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ultra Modern Navigation Arrows */}
            <button
              onClick={prevPackage}
              disabled={currentPackageIndex === 0}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group ${
                currentPackageIndex === 0
                  ? 'opacity-0 pointer-events-none scale-50'
                  : isDarkMode
                    ? 'bg-gradient-to-br from-gray-800/95 to-gray-900/95 hover:from-emerald-600/95 hover:to-green-600/95 text-gray-200 hover:text-white border-2 border-gray-600/60 hover:border-emerald-400/60'
                    : 'bg-gradient-to-br from-white/95 to-gray-50/95 hover:from-emerald-500/95 hover:to-green-500/95 text-gray-700 hover:text-white border-2 border-gray-300/60 hover:border-emerald-400/60'
              } backdrop-blur-2xl hover:scale-125 active:scale-95 shadow-2xl hover:shadow-emerald-500/50`}
              aria-label="Əvvəlki paket"
            >
              <span className="text-3xl font-black group-hover:translate-x-[-3px] transition-transform duration-300">‹</span>
            </button>

            <button
              onClick={nextPackage}
              disabled={currentPackageIndex === packages.length - 1}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group ${
                currentPackageIndex === packages.length - 1
                  ? 'opacity-0 pointer-events-none scale-50'
                  : isDarkMode
                    ? 'bg-gradient-to-br from-gray-800/95 to-gray-900/95 hover:from-emerald-600/95 hover:to-green-600/95 text-gray-200 hover:text-white border-2 border-gray-600/60 hover:border-emerald-400/60'
                    : 'bg-gradient-to-br from-white/95 to-gray-50/95 hover:from-emerald-500/95 hover:to-green-500/95 text-gray-700 hover:text-white border-2 border-gray-300/60 hover:border-emerald-400/60'
              } backdrop-blur-2xl hover:scale-125 active:scale-95 shadow-2xl hover:shadow-emerald-500/50`}
              aria-label="Növbəti paket"
            >
              <span className="text-3xl font-black group-hover:translate-x-[3px] transition-transform duration-300">›</span>
            </button>

            {/* Ultra Modern Package Indicators */}
            <div className="flex justify-center items-center gap-3 mt-8">
              {packages.map((pkg, index) => (
                <button
                  key={pkg.id}
                  onClick={() => goToPackage(index)}
                  className={`transition-all duration-500 rounded-full hover:scale-110 ${
                    currentPackageIndex === index
                      ? pkg.popular
                        ? 'w-12 h-4 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 shadow-2xl shadow-emerald-500/50 border-2 border-emerald-300/60'
                        : pkg.id === 'basic'
                          ? 'w-12 h-4 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 shadow-2xl shadow-red-500/50 border-2 border-orange-300/60 animate-pulse'
                          : 'w-12 h-4 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 shadow-2xl shadow-blue-500/50 border-2 border-purple-300/60'
                      : isDarkMode
                        ? 'w-4 h-4 bg-gray-700 hover:bg-gray-600 border-2 border-gray-600/50'
                        : 'w-4 h-4 bg-gray-300 hover:bg-gray-400 border-2 border-gray-300/50'
                  }`}
                  aria-label={`${pkg.name} paketinə get`}
                />
              ))}
            </div>

            {/* Ultra Modern Package Name Indicator */}
            <div className="text-center mt-6">
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-3xl border-2 backdrop-blur-2xl transition-all duration-500 shadow-xl ${
                packages[currentPackageIndex]?.popular
                  ? isDarkMode
                    ? 'bg-gradient-to-r from-emerald-900/50 to-green-900/50 border-emerald-500/60 text-emerald-300 shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-emerald-100 to-green-100 border-emerald-400/60 text-emerald-700 shadow-emerald-500/30'
                  : packages[currentPackageIndex]?.id === 'basic'
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-500/60 text-red-300 shadow-red-500/30 animate-pulse'
                      : 'bg-gradient-to-r from-red-100 to-orange-100 border-red-400/60 text-red-700 shadow-red-500/30 animate-pulse'
                    : isDarkMode
                      ? 'bg-gray-800/60 border-gray-600/60 text-gray-300 shadow-gray-900/30'
                      : 'bg-white/60 border-gray-300/60 text-gray-700 shadow-gray-400/30'
              }`}>
                <span className="text-2xl">
                  {packages[currentPackageIndex]?.id === 'basic' ? '🎯' : packages[currentPackageIndex]?.id === 'standart' ? '⭐' : '👑'}
                </span>
                <span className="font-black text-base tracking-wide">
                  {packages[currentPackageIndex]?.name}
                </span>
              </div>
            </div>

            {/* Modern Swipe Hint */}
            <div className="text-center mt-5 animate-pulse">
              <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl backdrop-blur-xl text-sm font-bold shadow-lg ${
                isDarkMode 
                  ? 'bg-gray-800/60 text-gray-400 border border-gray-700/50' 
                  : 'bg-white/60 text-gray-500 border border-gray-300/50'
              }`}>
                <span className="text-lg">←</span>
                <span>Sürüşdürün</span>
                <span className="text-lg">→</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'other' && (
          <div className="space-y-6 relative z-10">
            {/* Ultra Modern Other Packages Section */}
            <div className={`rounded-[2rem] border-2 backdrop-blur-2xl p-6 transition-all duration-500 shadow-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/60 shadow-black/30' 
                : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-300/60 shadow-gray-400/20'
            }`}>

              <div className="grid grid-cols-2 gap-4">
                {otherItems.map(item => (
                  <div key={item.id} className={`relative group rounded-2xl border-2 p-4 text-center transition-all duration-500 hover:scale-[1.05] shadow-lg ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700/50 hover:border-purple-500/70 shadow-purple-900/20' 
                      : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300/50 hover:border-purple-400/70 shadow-purple-400/20'
                  }`}>
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🎟️</div>
                    <div className={`font-black text-base mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {item.title}
                    </div>
                    {item.description && (
                      <div className={`text-xs mb-3 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.description}
                      </div>
                    )}
                    
                    <div className="mb-4">
                      {(() => {
                        const discountPercent = Math.max(1, Math.round((1 - item.newPrice / item.oldPrice) * 100));
                        return (
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <span className={`text-sm line-through font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                {item.oldPrice} AZN
                              </span>
                              <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                                -{discountPercent}%
                              </span>
                            </div>
                            <div className="flex items-baseline justify-center gap-1">
                              <span className={`text-3xl font-black drop-shadow-lg ${
                                isDarkMode ? 'text-purple-400' : 'text-purple-600'
                              }`}>
                                {item.newPrice}
                              </span>
                              <span className={`text-sm font-extrabold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                AZN
                              </span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                    
                    <button 
                      onClick={() => handlePurchaseOther(item)}
                      className={`w-full relative overflow-hidden py-3 px-4 rounded-xl font-black text-sm transition-all duration-500 hover:scale-110 active:scale-95 group shadow-2xl border-2 ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white border-purple-400/60 shadow-purple-500/50'
                          : 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white border-purple-300/60 shadow-purple-500/50'
                      }`}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <span className="relative">Əldə et ✨</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ultra Modern Footer Info */}
        <div className={`mt-8 rounded-[2rem] border-2 backdrop-blur-2xl p-6 transition-all duration-500 shadow-2xl relative z-10 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/60 shadow-black/30' 
            : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-300/60 shadow-gray-400/20'
        }`}>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: '💳', title: 'Kart', gradient: 'from-blue-500 to-cyan-500' },
              { icon: '📱', title: 'Mobil', gradient: 'from-purple-500 to-pink-500' },
              { icon: '🏦', title: 'Bank', gradient: 'from-emerald-500 to-green-500' }
            ].map((method, index) => (
              <div key={index} className={`relative group p-4 rounded-2xl text-center transition-all duration-500 hover:scale-110 border-2 shadow-lg ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-gray-700/50 hover:border-gray-600/70 shadow-gray-900/20' 
                  : 'bg-gradient-to-br from-white/60 to-gray-50/60 border-gray-300/50 hover:border-gray-400/70 shadow-gray-400/20'
              }`}>
                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">{method.icon}</div>
                <div className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {method.title}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center flex-wrap gap-4 text-sm">
            {[
              { icon: '🔒', text: 'Təhlükəsiz', color: isDarkMode ? 'text-green-400' : 'text-green-600' },
              { icon: '⚡', text: 'Ani aktivləşmə', color: isDarkMode ? 'text-yellow-400' : 'text-yellow-600' },
              { icon: '🎯', text: '7/24 dəstək', color: isDarkMode ? 'text-blue-400' : 'text-blue-600' }
            ].map((item, index) => (
              <div key={index} className={`flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                isDarkMode 
                  ? 'bg-gray-800/60 border-gray-700/50' 
                  : 'bg-white/60 border-gray-300/50'
              }`}>
                <span className={`text-lg ${item.color}`}>{item.icon}</span>
                <span className={`font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
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

