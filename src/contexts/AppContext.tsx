import React, { createContext, useContext, useState, ReactNode } from 'react';
import { dictionaries } from '../lib/i18n';
import type { Language, NavigationScreen } from '../lib/types';

type ThemeMode = 'light' | 'dark' | 'system';

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
  activePackage: UserPackage | null;
  transactions: Transaction[];
  purchasePackage: (packageId: string, packageName: string, price: number, days: number, activationDate?: Date) => boolean;
  purchasePackageByCard: (packageId: string, packageName: string, price: number, days: number, activationDate?: Date) => boolean;
  tickets: number;
  purchaseTickets: (count: number, price: number, title?: string) => boolean;
  hasActivePackage: () => boolean;
  isModuleUnlocked: (moduleId: string) => boolean;
  activatePackageNow: () => void;
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