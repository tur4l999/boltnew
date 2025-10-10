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
  const { t, goBack, balance, simulatorBalance, purchasePackage, purchasePackageByCard, purchaseTickets, isDarkMode, navigate, switchTab } = useApp();
  const [selectedDays, setSelectedDays] = useState<Record<string, number>>({
    basic: 45,
    standart: 45,
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
  const [otherPaymentMethod, setOtherPaymentMethod] = useState<'balance' | 'card'>('balance');
  const [insufficientTrainingOpen, setInsufficientTrainingOpen] = useState<boolean>(false);
  const [insufficientTrainingName, setInsufficientTrainingName] = useState<string>('');
  const [insufficientTrainingPrice, setInsufficientTrainingPrice] = useState<number>(0);
  const [paymentModalOpen, setPaymentModalOpen] = useState<null | { packageId: string; scheduledAt: Date }>(null);
  const [paymentMethod, setPaymentMethod] = useState<'balance' | 'card'>('balance');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  
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
  
  function formatDateTime(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
  
  const dayOptions: DayOption[] = [
    { days: 45, label: '45 gün', multiplier: 1 },
    { days: 60, label: '60 gün', multiplier: 1.25 },
    { days: 75, label: '75 gün', multiplier: 1.5 }
  ];
  
  const packages: Package[] = [
    {
      id: 'basic',
      name: 'Sadə Paket',
      basePrice: 39.99,
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
      basePrice: 49.99,
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
      basePrice: 200,
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
    
    return parseFloat((pkg.basePrice * dayOption.multiplier).toFixed(2));
  }

  function getPricePair(packageId: string): { oldPrice: number; newPrice: number; discountPercent: number } {
    const newPrice = calculatePrice(packageId);
    const pkg = packages.find(p => p.id === packageId);
    const days = selectedDays[packageId];
    
    let oldPrice = newPrice;
    
    // Sadə Paket
    if (packageId === 'basic') {
      if (days === 45) oldPrice = 50;
      else if (days === 60) oldPrice = 79;
      else if (days === 75) oldPrice = 99;
    }
    // Standart Paket
    else if (packageId === 'standart') {
      if (days === 45) oldPrice = 70;
      else if (days === 60) oldPrice = 99;
      else if (days === 75) oldPrice = 119;
    }
    // Premium Paket
    else if (packageId === 'pro') {
      if (days === 45) oldPrice = 400;
      else if (days === 60) oldPrice = 500;
      else if (days === 75) oldPrice = 600;
    }
    
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
            <div className="flex items-center gap-2">
              {/* Premium Balance */}
              <div className={`relative px-3 py-2 rounded-2xl border-2 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-emerald-900/30 border-emerald-500/40' 
                  : 'bg-emerald-50 border-emerald-300/50'
              }`}>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                    isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'
                  }`}></div>
                  <span className={`text-[10px] font-medium ${
                    isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
                  }`}>Balans</span>
                </div>
                <div className={`text-base font-black ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  {balance} ₼
                </div>
              </div>
              
              {/* Simulator Balance */}
              <div className={`relative px-3 py-2 rounded-2xl border-2 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-blue-900/30 border-blue-500/40' 
                  : 'bg-blue-50 border-blue-300/50'
              }`}>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                    isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                  }`}></div>
                  <span className={`text-[10px] font-medium ${
                    isDarkMode ? 'text-blue-300' : 'text-blue-700'
                  }`}>Bilet</span>
                </div>
                <div className={`text-base font-black ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {simulatorBalance} 🎫
                </div>
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
            {/* Carousel Container with Edge Previews */}
            <div 
              className={`relative transition-all duration-300 ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{ overflow: 'visible' }}
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
                  transform: `translateX(calc(-${currentPackageIndex * 100}% + ${currentPackageIndex * 24}px + ${dragOffset}px))`,
                  transition: isDragging ? 'none' : 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  paddingLeft: '12px',
                  paddingRight: '12px'
                }}
              >
                {packages.map((pkg, index) => (
                  <div key={pkg.id} className="w-full flex-shrink-0 px-3">
                    <div 
                      className="relative group pointer-events-auto transition-all duration-500"
                      style={{
                        opacity: index === currentPackageIndex ? 1 : 0.3,
                        transform: index === currentPackageIndex ? 'scale(1)' : 'scale(0.85)',
                        filter: index === currentPackageIndex ? 'none' : 'blur(2px)'
                      }}
                    >
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
                                <div className="text-center w-full">
                                  {/* Qiymətlər eyni sətirdə */}
                                  <div className="flex items-center justify-center gap-2 mb-1">
                                    {discountPercent > 0 && (
                                      <>
                                        <span className="text-lg font-bold line-through opacity-70">{oldPrice} AZN</span>
                                        <div className={`px-2.5 py-1 rounded-lg ${
                                          pkg.id === 'basic'
                                            ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                                            : pkg.popular
                                              ? 'bg-gradient-to-r from-green-400 to-emerald-400'
                                              : 'bg-gradient-to-r from-blue-400 to-purple-400'
                                        }`}>
                                          <span className="text-xs font-black text-gray-900">-{discountPercent}%</span>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-end justify-center gap-1.5">
                                    <span className="text-5xl font-black drop-shadow-2xl">
                                      {newPrice}
                                    </span>
                                    <span className="text-2xl font-bold pb-1">AZN</span>
                                  </div>
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


            {/* Sadə Indikatorlar */}
            <div className="flex justify-center items-center gap-2 mt-3">
              {packages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  onClick={() => goToPackage(index)}
                  className={`transition-all duration-300 cursor-pointer ${
                    currentPackageIndex === index
                      ? 'w-8 rounded-lg bg-gradient-to-r from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/50'
                      : isDarkMode
                        ? 'w-2 h-2 rounded-full bg-gray-600'
                        : 'w-2 h-2 rounded-full bg-gray-400'
                  }`}
                  style={currentPackageIndex === index ? { height: '4px' } : {}}
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
          <div className="flex items-center justify-center gap-4 text-xs">
            {[
              { icon: '🔒', text: 'Təhlükəsiz', color: 'text-green-500' },
              { icon: '⚡', text: 'Ani aktivləşmə', color: 'text-yellow-500' },
              { icon: '💬', text: 'Dəstək xidməti', color: 'text-blue-500' }
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

        {/* Modern FAQ Section */}
        <div className={`mt-6 rounded-3xl border-2 overflow-hidden transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800/60 border-gray-700/50' 
            : 'bg-white/60 border-gray-200/50'
        }`}>
          {/* FAQ Header */}
          <div className={`p-6 border-b-2 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-gray-700/50' 
              : 'bg-gradient-to-br from-purple-50/40 to-blue-50/40 border-gray-200/50'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="text-3xl">❓</div>
              <h3 className={`text-2xl font-black ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Tez-tez verilən suallar
              </h3>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Paketlər haqqında ətraflı məlumat
            </p>
          </div>

          {/* FAQ Items */}
          <div className="p-4">
            {[
              {
                question: 'Paket nə vaxt aktivləşir?',
                answer: 'Paketi satın aldıqdan dərhal sonra və ya seçdiyiniz tarixdə aktivləşə bilər. "İndi başla" seçimi ilə paket dərhal aktivləşir, "Tarixi seç" seçimi ilə istədiyiniz gün və saatı planlaşdıra bilərsiniz.'
              },
              {
                question: 'Paket müddəti necə hesablanır?',
                answer: 'Paket müddəti aktivləşmə tarixindən etibarən hesablanır. Məsələn, 45 günlük paket seçsəniz, aktivləşmə tarixindən sonra 45 gün ərzində bütün xüsusiyyətlərdən istifadə edə bilərsiniz.'
              },
              {
                question: 'Ödəniş üsulları hansılardır?',
                answer: 'Balans və ya kartla ödəniş edə bilərsiniz. Balansla ödəniş üçün hesabınızda kifayət qədər məbləğ olmalıdır. Kart ödənişi üçün istənilən bank kartından istifadə edə bilərsiniz.'
              },
              {
                question: 'Endirim nə vaxtadək etibarlıdır?',
                answer: 'Flash Sale endirimi məhdud müddətlidir. Yuxarıdakı sayğacda qalan vaxtı izləyə bilərsiniz. Endirim başa çatdıqdan sonra qiymətlər normal səviyyəyə qayıdacaq.'
              },
              {
                question: 'Paketi geri qaytara bilərəmmi?',
                answer: 'Əgər paket hələ aktivləşməyibsə və 24 saat keçməyibsə, ödənilmiş məbləği geri qaytara bilərsiniz. Aktivləşmiş paketlər üçün geri qaytarma mümkün deyil.'
              },
              {
                question: 'Bir neçə paket eyni vaxtda ola bilərmi?',
                answer: 'Xeyr, eyni anda yalnız bir təlim paketi aktiv ola bilər. Yeni paket almaq istəyirsinizsə, mövcud paketin müddəti bitməlidir və ya ləğv etməlisiniz.'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className={`mb-3 rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-900/40 border-gray-700/50' 
                    : 'bg-white/40 border-gray-200/50'
                } ${faqOpen === index ? 'shadow-lg' : ''}`}
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className="w-full p-4 flex items-center justify-between group"
                >
                  <div className="flex items-start gap-3 flex-1 text-left">
                    <div className={`text-xl transition-transform duration-300 ${
                      faqOpen === index ? 'rotate-90' : ''
                    }`}>
                      ▶
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold text-sm ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {faq.question}
                      </div>
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    faqOpen === index
                      ? isDarkMode
                        ? 'bg-purple-500/30 text-purple-400'
                        : 'bg-purple-100 text-purple-600'
                      : isDarkMode
                        ? 'bg-gray-800/50 text-gray-400'
                        : 'bg-gray-100/50 text-gray-600'
                  }`}>
                    {faqOpen === index ? '−' : '+'}
                  </div>
                </button>
                
                {faqOpen === index && (
                  <div className={`px-4 pb-4 pl-[52px] ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } text-sm leading-relaxed animate-in slide-in-from-top-2 duration-300`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* FAQ Footer */}
          <div className={`p-4 border-t-2 ${
            isDarkMode 
              ? 'bg-gray-900/30 border-gray-700/50' 
              : 'bg-gray-50/30 border-gray-200/50'
          }`}>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-xl">💬</span>
              <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Başqa sualınız var?
              </span>
              <button className={`font-bold underline ${
                isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
              }`}>
                Dəstək ilə əlaqə
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra Modern Activation Modal */}
      {activationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-sm" onClick={() => setActivationModalOpen(null)} />
          
          {(() => {
            const modalPkg = activationModalOpen ? packages.find(p => p.id === activationModalOpen.packageId) : null;
            const dt = new Date(activationMode === 'date' && activationDate ? activationDate : new Date());
            if (activationMode === 'date' && activationDate) {
              dt.setHours(parseInt(activationHour, 10), parseInt(activationMinute, 10), 0, 0);
            }
            
            return (
              <div className={`relative z-10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
              }`}>
                
                {/* Header with gradient */}
                <div className={`relative p-5 ${
                  modalPkg?.id === 'basic'
                    ? 'bg-gradient-to-br from-orange-500 to-red-600'
                    : modalPkg?.popular
                      ? 'bg-gradient-to-br from-emerald-500 to-green-600'
                      : 'bg-gradient-to-br from-purple-500 to-blue-600'
                } text-white`}>
                  <button
                    onClick={() => setActivationModalOpen(null)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    <span className="text-lg font-bold">✕</span>
                  </button>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-2">⚡</div>
                    <h2 className="text-xl font-black mb-1">Aktivləşdirmə</h2>
                    <p className="text-xs opacity-90">Paketin başlama vaxtını seçin</p>
                  </div>
                </div>

                <div className="p-4 overflow-y-auto scrollbar-hide">
                  {/* Package Info */}
                  <div className={`p-3 rounded-2xl mb-4 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    <div className="text-center">
                      <div className={`text-xs uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Seçilən Paket
                      </div>
                      <div className={`text-xl font-black ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {modalPkg?.name}
                      </div>
                      <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {modalPkg ? selectedDays[modalPkg.id] : 0} gün • {modalPkg ? calculatePrice(modalPkg.id) : 0} AZN
                      </div>
                    </div>
                  </div>

                  {/* Activation Mode Buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={() => setActivationMode('now')}
                      className={`relative p-4 rounded-2xl border-2 font-bold transition-all duration-300 ${
                        activationMode === 'now'
                          ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white border-emerald-400 shadow-xl shadow-emerald-500/30 scale-105'
                          : isDarkMode
                            ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-emerald-500/50'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-400/50'
                      } hover:scale-105 active:scale-95`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl">🚀</span>
                        <span className="text-sm">İndi başla</span>
                      </div>
                      {activationMode === 'now' && (
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-sm font-black text-gray-900">✓</span>
                        </div>
                      )}
                    </button>
                    
                    <button
                      onClick={() => setActivationMode('date')}
                      className={`relative p-4 rounded-2xl border-2 font-bold transition-all duration-300 ${
                        activationMode === 'date'
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white border-blue-400 shadow-xl shadow-blue-500/30 scale-105'
                          : isDarkMode
                            ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500/50'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400/50'
                      } hover:scale-105 active:scale-95`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl">📅</span>
                        <span className="text-sm">Tarixi seç</span>
                      </div>
                      {activationMode === 'date' && (
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-sm font-black text-gray-900">✓</span>
                        </div>
                      )}
                    </button>
                  </div>

                  {activationMode === 'date' && (
                    <div className="space-y-3 mb-4">
                      {/* Calendar */}
                      <div className={`p-3 rounded-2xl border-2 ${
                        isDarkMode ? 'border-blue-500/30 bg-gray-800/50' : 'border-blue-300/30 bg-blue-50/30'
                      }`}>
                        <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          📅 Tarix seçin
                        </div>
                        <Calendar
                          initialDate={new Date()}
                          minDate={new Date()}
                          onChange={(d) => setActivationDate(d)}
                        />
                      </div>
                      
                      {/* Time Picker - Modern */}
                      <div className={`p-3 rounded-2xl border-2 ${
                        isDarkMode ? 'border-purple-500/30 bg-gray-800/50' : 'border-purple-300/30 bg-purple-50/30'
                      }`}>
                        <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                          🕐 Saat seçin
                        </div>
                        <div className="flex items-center justify-center gap-3">
                          <select
                            value={activationHour}
                            onChange={(e) => setActivationHour(e.target.value)}
                            className={`flex-1 px-4 py-3 rounded-xl border-2 text-center text-lg font-bold ${
                              isDarkMode 
                                ? 'bg-gray-900 border-gray-700 text-gray-100' 
                                : 'bg-white border-gray-200 text-gray-900'
                            }`}
                          >
                            {Array.from({ length: 24 }).map((_, i) => {
                              const v = String(i).padStart(2, '0');
                              return <option key={v} value={v}>{v}</option>;
                            })}
                          </select>
                          <span className={`text-2xl font-black ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>:</span>
                          <select
                            value={activationMinute}
                            onChange={(e) => setActivationMinute(e.target.value)}
                            className={`flex-1 px-4 py-3 rounded-xl border-2 text-center text-lg font-bold ${
                              isDarkMode 
                                ? 'bg-gray-900 border-gray-700 text-gray-100' 
                                : 'bg-white border-gray-200 text-gray-900'
                            }`}
                          >
                            {['00','15','30','45'].map((v) => (
                              <option key={v} value={v}>{v}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      {/* Selected Date Display */}
                      {activationDate && (
                        <div className={`p-3 rounded-2xl ${
                          isDarkMode 
                            ? 'bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-2 border-emerald-500/40' 
                            : 'bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-300/40'
                        }`}>
                          <div className="flex items-center gap-2">
                            <div className="text-2xl">✓</div>
                            <div className="flex-1">
                              <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                              }`}>
                                Aktivləşmə tarixi
                              </div>
                              <div className={`text-base font-black ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                {(() => {
                                  const dt = new Date(activationDate);
                                  dt.setHours(parseInt(activationHour, 10), parseInt(activationMinute, 10), 0, 0);
                                  return formatDateTime(dt);
                                })()}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => activationModalOpen && openPaymentFor(activationModalOpen.packageId)}
                      disabled={activationMode === 'date' && !activationDate}
                      className={`w-full py-3 rounded-2xl font-black text-base transition-all duration-300 shadow-xl ${
                        activationMode === 'date' && !activationDate
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white hover:scale-[1.02] active:scale-95 shadow-emerald-500/30'
                      }`}
                    >
                      {activationMode === 'now' ? '🚀 İndi Aktivləşdir' : '📅 Planlaşdır və Davam et'}
                    </button>
                    
                    <button
                      onClick={() => setActivationModalOpen(null)}
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
              <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-base font-extrabold`}>{scheduledAt ? formatDateTime(scheduledAt) : '—'}</div>
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
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs opacity-80 uppercase tracking-wider">Aktivləşmə</span>
                      <span className="font-bold text-sm">
                        {paymentModalOpen?.scheduledAt ? formatDateTime(paymentModalOpen.scheduledAt) : 'İndi'}
                      </span>
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

      {/* Modern Bilet Purchase Modal */}
      {otherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-sm" onClick={() => setOtherModalOpen(null)} />
          
          <div className={`relative z-10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          }`}>
            
            {otherModalStage === 'confirm' && (
              <>
                {/* Header with gradient */}
                <div className="relative p-5 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                  <button
                    onClick={() => setOtherModalOpen(null)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    <span className="text-lg font-bold">✕</span>
                  </button>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎫</div>
                    <h2 className="text-xl font-black mb-1">Bilet Alışı</h2>
                    <p className="text-xs opacity-90">Ödəniş üsulunu seçin</p>
                  </div>
                </div>

                <div className="p-4">
                  {/* Bilet Info */}
                  <div className={`p-3 rounded-2xl mb-4 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    <div className="text-center">
                      <div className={`text-xs uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Seçilən Məhsul
                      </div>
                      <div className={`text-xl font-black ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {otherModalOpen.title}
                      </div>
                      <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {otherModalOpen.count} ədəd • {otherModalOpen.newPrice} AZN
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="mb-4">
                    <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      💳 Ödəniş üsulu
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={() => setOtherPaymentMethod('balance')}
                        className={`w-full relative p-4 rounded-2xl border-2 font-bold transition-all duration-300 ${
                          otherPaymentMethod === 'balance'
                            ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white border-emerald-400 shadow-xl shadow-emerald-500/30'
                            : isDarkMode
                              ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-emerald-500/50'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-400/50'
                        } hover:scale-[1.02] active:scale-95`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">💰</span>
                            <div className="text-left">
                              <div className="text-sm font-bold">Balans</div>
                              <div className={`text-xs ${otherPaymentMethod === 'balance' ? 'text-white/80' : isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                {balance} AZN mövcuddur
                              </div>
                            </div>
                          </div>
                          {otherPaymentMethod === 'balance' && (
                            <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-sm font-black text-gray-900">✓</span>
                            </div>
                          )}
                        </div>
                      </button>
                      
                      <button
                        onClick={() => setOtherPaymentMethod('card')}
                        className={`w-full relative p-4 rounded-2xl border-2 font-bold transition-all duration-300 ${
                          otherPaymentMethod === 'card'
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white border-blue-400 shadow-xl shadow-blue-500/30'
                            : isDarkMode
                              ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500/50'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400/50'
                        } hover:scale-[1.02] active:scale-95`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">💳</span>
                            <div className="text-left">
                              <div className="text-sm font-bold">Kart</div>
                              <div className={`text-xs ${otherPaymentMethod === 'card' ? 'text-white/80' : isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                Visa / Mastercard
                              </div>
                            </div>
                          </div>
                          {otherPaymentMethod === 'card' && (
                            <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-sm font-black text-gray-900">✓</span>
                            </div>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        const success = otherPaymentMethod === 'balance' 
                          ? purchaseTickets(otherModalOpen.count, otherModalOpen.newPrice, otherModalOpen.title)
                          : true; // Card payment always succeeds in demo
                        setOtherModalStage(success ? 'success' : 'insufficient');
                      }}
                      className="w-full py-3 rounded-2xl font-black text-base transition-all duration-300 shadow-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white hover:scale-[1.02] active:scale-95 shadow-emerald-500/30"
                    >
                      {otherPaymentMethod === 'balance' ? '💰 Balansdan ödə' : '💳 Kartla ödə'}
                    </button>
                    
                    <button
                      onClick={() => setOtherModalOpen(null)}
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
              </>
            )}

            {otherModalStage === 'success' && (
              <>
                <div className="relative p-5 bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                  <div className="text-center">
                    <div className="text-5xl mb-2">✅</div>
                    <h2 className="text-xl font-black mb-1">Uğurlu əməliyyat</h2>
                    <p className="text-xs opacity-90">Bilet uğurla əldə edildi</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className={`p-4 rounded-2xl mb-4 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    <div className="text-center">
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                        Aldığınız biletlər
                      </div>
                      <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        {otherModalOpen?.count} 🎫
                      </div>
                      <div className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                        {otherModalOpen?.title}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => { setOtherModalOpen(null); setOtherModalStage('confirm'); }}
                    className="w-full py-3 rounded-2xl font-bold transition-all duration-300 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
                  >
                    Bağla
                  </button>
                </div>
              </>
            )}

            {otherModalStage === 'insufficient' && (
              <>
                <div className="relative p-5 bg-gradient-to-br from-red-500 to-orange-600 text-white">
                  <div className="text-center">
                    <div className="text-5xl mb-2">⚠️</div>
                    <h2 className="text-xl font-black mb-1">Balans kifayət etmir</h2>
                    <p className="text-xs opacity-90">Hesabınızda kifayət qədər balans yoxdur</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className={`p-4 rounded-2xl mb-4 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mövcud balans:</span>
                      <span className={`text-base font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{balance} AZN</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Lazım olan:</span>
                      <span className="text-base font-bold text-red-500">{otherModalOpen?.newPrice} AZN</span>
                    </div>
                    <div className={`pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Çatışmayan:</span>
                        <span className="text-lg font-black text-red-600">
                          {otherModalOpen ? (otherModalOpen.newPrice - balance).toFixed(2) : 0} AZN
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => { setOtherModalOpen(null); setOtherModalStage('confirm'); navigate('Transactions'); }}
                      className="w-full py-3 rounded-2xl font-bold transition-all duration-300 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
                    >
                      💰 Balans artır
                    </button>
                    <button
                      onClick={() => { setOtherModalOpen(null); setOtherModalStage('confirm'); }}
                      className={`w-full py-3 rounded-2xl font-bold transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Bağla
                    </button>
                  </div>
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

