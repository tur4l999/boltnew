import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { StatusBar } from './components/layout/StatusBar';
import { HeaderRedesigned } from './components/layout/HeaderRedesigned';
import { TabBarRedesigned } from './components/layout/TabBarRedesigned';
import { ScreenRenderer } from './components/navigation/ScreenRenderer';
import { InspectPage } from './pages/inspect';
import { LoginScreenRedesigned } from './components/screens/LoginScreenRedesigned';
import { HomeScreenRedesigned } from './components/screens/HomeScreenRedesigned';
import { PageTransition } from './components/navigation/PageTransition';

export default function AppRedesigned() {
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
  const { currentScreen, isDarkMode } = useApp();

  const isAIChat = currentScreen.screen === 'AIChat';
  const hideHeader = currentScreen.screen !== 'Home';
  const hideTabBar = currentScreen.screen === 'ExamRun' || currentScreen.screen === 'ProductDetail' || currentScreen.screen === 'Cart';

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 text-gray-900'
    }`}>
      
      {/* Main App Container */}
      <div className={`redesigned-container h-screen relative transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-950/90 to-slate-950/90' 
          : 'bg-gradient-to-b from-white/90 to-gray-50/90'
      } overflow-y-auto backdrop-blur-sm`}
      id="app-scroll-container"
      >
        
        {/* Status Bar */}
        <div className="sticky top-0 z-50">
          <StatusBar />
        </div>

        {isLoggedIn ? (
          <>
            {/* Header - Always show on Home, conditional on others */}
            {currentScreen.screen === 'Home' && <HeaderRedesigned />}
            
            {/* Main Content */}
            <div className="relative z-10">
              {currentScreen.screen === 'Home' ? (
                <HomeScreenRedesigned />
              ) : isAIChat ? (
                <ScreenRenderer />
              ) : (
                <>
                  {!hideHeader && currentScreen.screen !== 'Home' && <HeaderRedesigned />}
                  <ScreenRenderer />
                </>
              )}
            </div>

            {/* Tab Bar */}
            {!hideTabBar && <TabBarRedesigned />}
          </>
        ) : (
          <PageTransition transitionKey="login">
            <LoginScreenRedesigned onLogin={() => setIsLoggedIn(true)} />
          </PageTransition>
        )}
      </div>
    </div>
  );
}