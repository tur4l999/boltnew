import React, { createContext, useContext, useState, ReactNode } from 'react';
import { dictionaries } from '../lib/i18n';
import type { Language, NavigationScreen, StoredExamResult, ExamType, Appeal, AppealFormData } from '../lib/types';

type ThemeMode = 'light' | 'dark' | 'system';
type DeliveryMethod = 'locker' | 'courier' | 'post' | 'pickup';

interface UserPackage {
  id: string;
  name: string;
  price: number;
  days: number;
  activationDate: Date;
  purchaseDate: Date;
  expiryDate: Date;
}

interface Transaction {
  id: string;
  type: 'purchase' | 'refund';
  amount: number;
  description: string;
  date: Date;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDarkMode: boolean;
  t: typeof dictionaries.az;
  currentTab: string;
  currentScreen: NavigationScreen;
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
  switchTab: (tab: string) => void;
  moreSheetVisible: boolean;
  setMoreSheetVisible: (visible: boolean) => void;
  balance: number;
  simulatorBalance: number;
  activePackage: UserPackage | null;
  transactions: Transaction[];
  purchasePackage: (packageId: string, packageName: string, price: number, days: number, activationDate?: Date) => boolean;
  purchasePackageByCard: (packageId: string, packageName: string, price: number, days: number, activationDate?: Date) => boolean;
  tickets: number;
  purchaseTickets: (count: number, price: number, title?: string) => boolean;
  hasActivePackage: () => boolean;
  isModuleUnlocked: (moduleId: string) => boolean;
  activatePackageNow: () => void;
  cart: CartItem[];
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  checkoutByBalance: (deliveryAddress: string, method: DeliveryMethod) => boolean;
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (m: DeliveryMethod) => void;
  checkoutByCard: (deliveryAddress: string, method: DeliveryMethod) => boolean;
  examResults: StoredExamResult[];
  addExamResult: (type: ExamType, score: number, total: number, timeSpent: number, weakTopics: string[], details?: any) => void;
  appeals: Appeal[];
  submitAppeal: (formData: AppealFormData) => boolean;
  getAppealsByStatus: (status?: string) => Appeal[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('az');
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [currentTab, setCurrentTab] = useState('Home');
  const [navigationStack, setNavigationStack] = useState<NavigationScreen[]>([
    { screen: 'Home', params: {} }
  ]);
  const [moreSheetVisible, setMoreSheetVisible] = useState(false);
  const [balance, setBalance] = useState(100); // Demo account starts with 100 AZN
  const [simulatorBalance, setSimulatorBalance] = useState(5); // Demo starts with 5 simulator tickets
  const [tickets, setTickets] = useState(3); // Demo starts with 3 tickets
  const [activePackage, setActivePackage] = useState<UserPackage | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('locker');
  const [examResults, setExamResults] = useState<StoredExamResult[]>([
    // Demo data
    {
      id: '1',
      type: 'simulator',
      score: 28,
      total: 30,
      timeSpent: 25 * 60,
      weakTopics: ['M1', 'M5'],
      date: new Date('2025-09-10T14:30:00'),
      passed: true,
      details: {}
    },
    {
      id: '2',
      type: 'tickets',
      score: 18,
      total: 20,
      timeSpent: 15 * 60,
      weakTopics: ['M8'],
      date: new Date('2025-09-09T10:15:00'),
      passed: true,
      details: { ticketNumber: 5 }
    },
    {
      id: '3',
      type: 'topics',
      score: 9,
      total: 10,
      timeSpent: 8 * 60,
      weakTopics: [],
      date: new Date('2025-09-08T16:45:00'),
      passed: true,
      details: { moduleId: '8ci' }
    },
    {
      id: '4',
      type: 'tickets',
      score: 6,
      total: 20,
      timeSpent: 20 * 60,
      weakTopics: ['M1', 'M3', 'M15'],
      date: new Date('2025-09-05T09:00:00'),
      passed: false,
      details: { ticketNumber: 12 }
    },
    {
      id: '5',
      type: 'topics',
      score: 7,
      total: 10,
      timeSpent: 12 * 60,
      weakTopics: ['M19', 'M23'],
      date: new Date('2025-09-03T11:30:00'),
      passed: false,
      details: { moduleId: '15ci' }
    }
  ]);
  
  const [appeals, setAppeals] = useState<Appeal[]>([
    // Demo appeals data
    {
      id: '1',
      questionId: '1',
      questionText: 'Yol nişanları nə vaxt tətbiq edilir?',
      questionOptions: [
        { id: 'a1', text: 'Həmişə' },
        { id: 'a2', text: 'Yalnız gecə' },
        { id: 'a3', text: 'Yalnız gündüz' },
        { id: 'a4', text: 'Yol şəraitindən asılı olaraq' }
      ],
      questionCorrectOptionId: 'a4',
      questionExplanation: 'Yol nişanları yol şəraitindən asılı olaraq müxtəlif vaxtlarda tətbiq edilir. Bəzi nişanlar həmişə, bəziləri isə müəyyən şəraitdə tətbiq edilir.',
      questionSource: 'ticket',
      questionSourceId: '5',
      userComment: 'Bu sualda bəzi nişanların tətbiq vaxtı dəqiq göstərilməyib. Daha aydın olmalıdır.',
      status: 'accepted',
      submittedDate: new Date('2025-01-15T10:30:00'),
      reviewedDate: new Date('2025-01-16T14:20:00'),
      adminResponse: 'Sual yenidən nəzərdən keçirildi və daha aydın şəkildə yenidən yazıldı. Təşəkkürlər.',
      adminName: 'Admin Əli',
      isResolved: true
    },
    {
      id: '2',
      questionId: '2',
      questionText: 'Bu nişan nə deməkdir?',
      questionImageUrl: '/public/image.png',
      questionOptions: [
        { id: 'b1', text: 'Sürət məhdudiyyəti' },
        { id: 'b2', text: 'Dayanma qadağandır' },
        { id: 'b3', text: 'Sağa dönmək qadağandır' },
        { id: 'b4', text: 'Sol dönmək qadağandır' }
      ],
      questionCorrectOptionId: 'b1',
      questionExplanation: 'Bu nişan sürət məhdudiyyətini göstərir. Sürücü bu nişanı gördükdə sürətini məhdudlaşdırmalıdır.',
      questionSource: 'ticket',
      questionSourceId: '12',
      userComment: 'Bu sualda şəhər daxilində sürət məhdudiyyəti haqqında məlumat natamamdır.',
      status: 'under_review',
      submittedDate: new Date('2025-01-14T16:45:00'),
      isResolved: false
    },
    {
      id: '3',
      questionId: '3',
      questionText: 'Park etmək qadağandır nişanı nə deməkdir?',
      questionOptions: [
        { id: 'c1', text: 'Park etmək icazə verilir' },
        { id: 'c2', text: 'Park etmək qadağandır' },
        { id: 'c3', text: 'Yalnız yük maşınları park edə bilər' },
        { id: 'c4', text: 'Yalnız avtobuslar park edə bilər' }
      ],
      questionCorrectOptionId: 'c2',
      questionExplanation: 'Park etmək qadağandır nişanı o sahədə avtomobil park etməyin qadağan olduğunu göstərir.',
      questionSource: 'topic',
      questionSourceId: 'M8',
      userComment: 'Bu sualda park etmək qadağandır nişanının tətbiq sahəsi dəqiq göstərilməyib.',
      status: 'rejected',
      submittedDate: new Date('2025-01-13T09:15:00'),
      reviewedDate: new Date('2025-01-13T11:30:00'),
      adminResponse: 'Sual düzgündür və qaydalara uyğundur. Əlavə dəyişiklik tələb olunmur.',
      adminName: 'Admin Leyla',
      isResolved: true
    },
    {
      id: '4',
      questionId: '4',
      questionText: 'Yol keçidində piyadalar üçün nə vaxt dayanmaq lazımdır?',
      questionImageUrl: '/public/image copy.png',
      questionOptions: [
        { id: 'd1', text: 'Həmişə' },
        { id: 'd2', text: 'Piyadalar yol keçidində olduqda' },
        { id: 'd3', text: 'Yalnız qırmızı işıqda' },
        { id: 'd4', text: 'Heç vaxt' }
      ],
      questionCorrectOptionId: 'b2',
      questionExplanation: 'Sürücü piyadaların yol keçidində olduğunu gördükdə dayanmalıdır və onların keçməsini gözləməlidir.',
      questionSource: 'simulator',
      userComment: 'Bu sualda piyadaların yol keçidində olması halında dayanma vaxtı dəqiq göstərilməyib.',
      status: 'pending',
      submittedDate: new Date('2025-01-12T14:20:00'),
      isResolved: false
    },
    {
      id: '5',
      questionId: '5',
      questionText: 'Bu yol nişanı nə mənasını verir?',
      questionImageUrl: '/public/book-1.svg',
      questionOptions: [
        { id: 'e1', text: 'Sağa dönmək icazə verilir' },
        { id: 'e2', text: 'Sola dönmək icazə verilir' },
        { id: 'e3', text: 'Düz getmək icazə verilir' },
        { id: 'e4', text: 'Geri dönmək icazə verilir' }
      ],
      questionCorrectOptionId: 'e1',
      questionExplanation: 'Bu nişan sağa dönməyin icazə verildiyini göstərir. Sürücü bu nişanı gördükdə sağa dönə bilər.',
      questionSource: 'topic',
      questionSourceId: 'M15',
      userComment: 'Bu nişanın mənası dəqiq göstərilməyib. Daha aydın izah olmalıdır.',
      status: 'accepted',
      submittedDate: new Date('2025-01-11T08:30:00'),
      reviewedDate: new Date('2025-01-11T15:45:00'),
      adminResponse: 'Nişanın mənası əlavə edildi və daha aydın şəkildə izah edildi.',
      adminName: 'Admin Rəşad',
      isResolved: true
    }
  ]);
  
  // Determine if dark mode should be active
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const t = dictionaries[language];
  
  const navigate = (screen: string, params = {}) => {
    setNavigationStack(prev => [...prev, { screen, params }]);
  };
  
  const goBack = () => {
    setNavigationStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };
  
  const switchTab = (tab: string) => {
    setCurrentTab(tab);
    setNavigationStack([{ screen: tab, params: {} }]);
  };
  
  const purchasePackage = (packageId: string, packageName: string, price: number, days: number, activationDate?: Date): boolean => {
    if (balance < price) {
      return false; // Insufficient balance
    }
    
    const purchaseDate = new Date();
    const activation = activationDate ? new Date(activationDate) : new Date();
    const expiryDate = new Date(activation);
    expiryDate.setDate(activation.getDate() + days);
    
    const newPackage: UserPackage = {
      id: packageId,
      name: packageName,
      price,
      days,
      activationDate: activation,
      purchaseDate,
      expiryDate
    };
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'purchase',
      amount: price,
      description: `${packageName} paketi (${days} gün)`,
      date: purchaseDate
    };
    
    setBalance(prev => prev - price);
    setActivePackage(newPackage);
    setTransactions(prev => [transaction, ...prev]);
    
    return true;
  };

  const purchaseTickets = (count: number, price: number, title: string = 'İmtahan bileti'): boolean => {
    if (balance < price) {
      return false;
    }
    const purchaseDate = new Date();
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'purchase',
      amount: price,
      description: `${title} (${count} ədəd)`,
      date: purchaseDate
    };
    setBalance(prev => prev - price);
    setTickets(prev => prev + count);
    setTransactions(prev => [transaction, ...prev]);
    return true;
  };

  // Card payment simulation: does not deduct balance, but activates package and records a transaction
  const purchasePackageByCard = (packageId: string, packageName: string, price: number, days: number, activationDate?: Date): boolean => {
    const purchaseDate = new Date();
    const activation = activationDate ? new Date(activationDate) : new Date();
    const expiryDate = new Date(activation);
    expiryDate.setDate(activation.getDate() + days);
    const newPackage: UserPackage = {
      id: packageId,
      name: packageName,
      price,
      days,
      activationDate: activation,
      purchaseDate,
      expiryDate
    };
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'purchase',
      amount: price,
      description: `${packageName} paketi (${days} gün) • Kart`,
      date: purchaseDate
    };
    setActivePackage(newPackage);
    setTransactions(prev => [transaction, ...prev]);
    return true;
  };
  
  const hasActivePackage = (): boolean => {
    if (!activePackage) return false;
    const now = new Date();
    return now >= activePackage.activationDate && now < activePackage.expiryDate;
  };
  
  const isModuleUnlocked = (moduleId: string): boolean => {
    // Modules 8 and 11 are always free
    if (moduleId === 'M8' || moduleId === 'M11') {
      return true;
    }
    
    // All other modules require active package
    return hasActivePackage();
  };
  
  const activatePackageNow = (): void => {
    if (!activePackage) return;
    const now = new Date();
    const newExpiry = new Date(now);
    newExpiry.setDate(now.getDate() + activePackage.days);
    setActivePackage({ ...activePackage, activationDate: now, expiryDate: newExpiry });
  };

  const addExamResult = (type: ExamType, score: number, total: number, timeSpent: number, weakTopics: string[], details: any = {}): void => {
    const newResult: StoredExamResult = {
      id: Date.now().toString(),
      type,
      score,
      total,
      timeSpent,
      weakTopics,
      date: new Date(),
      passed: score >= Math.ceil(total * 0.8),
      details
    };
    setExamResults(prev => [newResult, ...prev]);
  };

  const submitAppeal = (formData: AppealFormData): boolean => {
    try {
      const newAppeal: Appeal = {
        id: Date.now().toString(),
        questionId: formData.questionId,
        questionText: formData.questionText,
        userComment: formData.userComment,
        status: 'pending',
        submittedDate: new Date(),
        isResolved: false
      };
      setAppeals(prev => [newAppeal, ...prev]);
      return true;
    } catch {
      return false;
    }
  };

  const getAppealsByStatus = (status?: string): Appeal[] => {
    if (!status) return appeals;
    return appeals.filter(appeal => appeal.status === status);
  };
  
  const currentScreen = navigationStack[navigationStack.length - 1];

  // Cart helpers
  type CartItem = { productId: string; qty: number };
  const addToCart = (productId: string, qty: number = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i.productId === productId);
      if (exists) {
        return prev.map(i => i.productId === productId ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { productId, qty }];
    });
  };
  const removeFromCart = (productId: string) => setCart(prev => prev.filter(i => i.productId !== productId));
  const updateCartQty = (productId: string, qty: number) => setCart(prev => prev.map(i => i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i));
  const clearCart = () => setCart([]);
  const checkoutByBalance = (deliveryAddress: string, method: DeliveryMethod): boolean => {
    // Simple balance deduction based on mock prices found in products module at runtime
    try {
      const { STORE_PRODUCTS } = require('../lib/products');
      const getDeliveryFee = (m: DeliveryMethod): number => {
        switch (m) {
          case 'locker': return 2.5; // Kargomat
          case 'courier': return 5;  // Kuryerlə
          case 'post': return 3;     // Poçtla
          default: return 0;
        }
      };
      const subtotal = cart.reduce((sum: number, item: CartItem) => {
        const p = STORE_PRODUCTS.find((x: any) => x.id === item.productId);
        if (!p) return sum;
        const price = p.discountPercent ? Math.round((p.price * (100 - p.discountPercent))) / 100 : p.price;
        return sum + price * item.qty;
      }, 0);
      const fee = getDeliveryFee(method);
      const total = subtotal + fee;
      if (total <= 0) return false;
      if (balance < total) return false;
      const trans: Transaction = {
        id: Date.now().toString(),
        type: 'purchase',
        amount: total,
        description: `Mağaza sifarişi • ${cart.length} məhsul • Çatdırılma: ${deliveryAddress} • Üsul: ${method}`,
        date: new Date(),
      };
      setBalance(prev => prev - total);
      setTransactions(prev => [trans, ...prev]);
      clearCart();
      return true;
    } catch {
      return false;
    }
  };

  // Card checkout simulation (same as balance, but does not change balance)
  const checkoutByCard = (deliveryAddress: string, method: DeliveryMethod): boolean => {
    try {
      const { STORE_PRODUCTS } = require('../lib/products');
      const getDeliveryFee = (m: DeliveryMethod): number => {
        switch (m) {
          case 'locker': return 2.5;
          case 'courier': return 5;
          case 'post': return 3;
          case 'pickup': return 0;
          default: return 0;
        }
      };
      const subtotal = cart.reduce((sum: number, item: any) => {
        const p = STORE_PRODUCTS.find((x: any) => x.id === item.productId);
        if (!p) return sum;
        const price = p.discountPercent ? Math.round((p.price * (100 - p.discountPercent))) / 100 : p.price;
        return sum + price * item.qty;
      }, 0);
      const total = subtotal + getDeliveryFee(method);
      if (total <= 0) return false;
      const transaction: Transaction = {
        id: Date.now().toString(),
        type: 'purchase',
        amount: total,
        description: `Kartla • ${cart.length} məhsul • Çatdırılma: ${deliveryAddress} • Üsul: ${method}`,
        date: new Date()
      };
      setTransactions(prev => [transaction, ...prev]);
      clearCart();
      return true;
    } catch {
      return false;
    }
  };
  
  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      theme,
      setTheme,
      isDarkMode,
      t,
      currentTab,
      currentScreen,
      navigate,
      goBack,
      switchTab,
      moreSheetVisible,
      setMoreSheetVisible,
      balance,
      simulatorBalance,
      tickets,
      activePackage,
      transactions,
      purchasePackage,
      purchasePackageByCard,
      purchaseTickets,
      hasActivePackage,
      isModuleUnlocked,
      activatePackageNow
      , cart, addToCart, removeFromCart, updateCartQty, clearCart, checkoutByBalance
      , checkoutByCard
      , deliveryMethod, setDeliveryMethod
      , examResults, addExamResult
      , appeals, submitAppeal, getAppealsByStatus
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}