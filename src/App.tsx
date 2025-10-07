import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { StatusBar } from './components/layout/StatusBar';
import { Header } from './components/layout/Header';
import { TabBar } from './components/layout/TabBar';
import { ScreenRenderer } from './components/navigation/ScreenRenderer';
import { InspectPage } from './pages/inspect';
import { LoginScreen } from './components/screens/LoginScreen';
import { PageTransition } from './components/navigation/PageTransition';
import { OnboardingWrapper } from './onboarding/OnboardingWrapper';

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route
          path="/inspect"
          element={
            <PageTransition transitionKey="inspect">
              <InspectPage />
            </PageTransition>
          }
        />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </AppProvider>
  );
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { currentScreen, isDarkMode, language } = useApp();

  const isAIChat = currentScreen.screen === 'AIChat';
  const hideHeader = currentScreen.screen !== 'Home';
  const hideTabBar = currentScreen.screen === 'ExamRun' || 
                     currentScreen.screen === 'ProductDetail' || 
                     currentScreen.screen === 'Cart' ||
                     currentScreen.screen === 'QADetail' ||
                     currentScreen.screen === 'QAForm' ||
                     currentScreen.screen === 'SecurePdf';

  return (
    <OnboardingWrapper 
      language={language as 'az' | 'en' | 'ru'}
      isDark={isDarkMode}
      testMode={true} // ← TEST REJIMI: Production-da false edin!
    >
      <div className={`min-h-screen transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-900 text-gray-100' 
          : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="max-w-md mx-auto h-screen relative">
          <div className={`h-full transition-colors duration-200 ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
          } overflow-y-auto ${!hideTabBar ? 'pb-20' : ''}`}
          id="app-scroll-container"
          >
            {/* Sticky iPhone-like status bar inside the scroll container */}
            <div className="sticky top-0 z-40">
              <StatusBar />
            </div>

            {isLoggedIn ? (
              isAIChat ? (
                <ScreenRenderer />
              ) : (
                <>
                  {!hideHeader && <Header />}
                  <ScreenRenderer />
                </>
              )
            ) : (
              <PageTransition transitionKey="login">
                <LoginScreen onLogin={() => setIsLoggedIn(true)} />
              </PageTransition>
            )}
          </div>
          
          {/* TabBar fixed outside the scrollable container */}
          {isLoggedIn && !isAIChat && !hideTabBar && <TabBar />}
        </div>
      </div>
    </OnboardingWrapper>
  );
}