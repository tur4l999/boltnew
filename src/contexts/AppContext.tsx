import React, { createContext, useContext, useState, ReactNode } from 'react';
import { dictionaries } from '../lib/i18n';
import type { Language, NavigationScreen } from '../lib/types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof dictionaries.az;
  currentTab: string;
  currentScreen: NavigationScreen;
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
  switchTab: (tab: string) => void;
  moreSheetVisible: boolean;
  setMoreSheetVisible: (visible: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('az');
  const [currentTab, setCurrentTab] = useState('Home');
  const [navigationStack, setNavigationStack] = useState<NavigationScreen[]>([
    { screen: 'Home', params: {} }
  ]);
  const [moreSheetVisible, setMoreSheetVisible] = useState(false);
  
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
  
  const currentScreen = navigationStack[navigationStack.length - 1];
  
  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      t,
      currentTab,
      currentScreen,
      navigate,
      goBack,
      switchTab,
      moreSheetVisible,
      setMoreSheetVisible
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