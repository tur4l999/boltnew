import React, { createContext, useContext, useState, ReactNode } from 'react';
import { dictionaries } from '../lib/i18n';
import type { Language, NavigationScreen } from '../lib/types';
import { STORE_PRODUCTS } from '../lib/products';
import type { ExamAttempt, ExamType } from '../lib/types';

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

type CartItem = { productId: string; qty: number };

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
  // Results
  results: ExamAttempt[];
  addResult: (attempt: Omit<ExamAttempt, 'id'>) => ExamAttempt;
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
  const [tickets, setTickets] = useState(3); // Demo starts with 3 tickets
  const [activePackage, setActivePackage] = useState<UserPackage | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('locker');
  // Results store (demo seeded)
  const [results, setResults] = useState<ExamAttempt[]>([
    { id: 'r1', type: 'simulator', title: 'Simulyator', date: new Date(Date.now() - 86400000 * 1), score: 8, total: 10, durationSec: 12 * 60 },
    { id: 'r2', type: 'final', title: 'Yekun imtahan', date: new Date(Date.now() - 86400000 * 3), score: 17, total: 20, durationSec: 18 * 60 },
    { id: 'r3', type: 'tickets', title: 'Bilet 1', date: new Date(Date.now() - 86400000 * 5), score: 18, total: 20, durationSec: 22 * 60 },
    { id: 'r4', type: 'topics', title: 'Mövzu M8', date: new Date(Date.now() - 86400000 * 8), score: 14, total: 20, durationSec: 25 * 60 },
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
  
  const currentScreen = navigationStack[navigationStack.length - 1];

  // Cart helpers
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
  
  // Results API
  const addResult = (attempt: Omit<ExamAttempt, 'id'>): ExamAttempt => {
    const newAttempt: ExamAttempt = {
      ...attempt,
      id: Date.now().toString(),
      date: attempt.date ? new Date(attempt.date) : new Date(),
    } as ExamAttempt;
    setResults(prev => [newAttempt, ...prev]);
    return newAttempt;
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
      , results, addResult
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