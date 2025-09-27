import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { StatusBar } from './components/layout/StatusBar';
import { HeaderBeautiful } from './components/layout/HeaderBeautiful';
import { TabBarBeautiful } from './components/layout/TabBarBeautiful';
import { ScreenRenderer } from './components/navigation/ScreenRenderer';
import { InspectPage } from './pages/inspect';
import { LoginScreenBeautiful } from './components/screens/LoginScreenBeautiful';
import { HomeScreenBeautiful } from './components/screens/HomeScreenBeautiful';
import { PageTransition } from './components/navigation/PageTransition';

export default function AppBeautiful() {
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
        : 'bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 text-gray-900'
    }`}>
      
      {/* Beautiful App Container */}
      <div className={`beautiful-container h-screen relative transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-950/95 to-slate-950/95' 
          : 'bg-gradient-to-b from-white/95 to-gray-50/95'
      } overflow-y-auto backdrop-blur-sm`}
      id="app-scroll-container"
      >
        
        {/* Status Bar */}
        <div className="sticky top-0 z-50">
          <StatusBar />
        </div>

        {isLoggedIn ? (
          <>
            {/* Dynamic Header */}
            {currentScreen.screen === 'Home' && <HeaderBeautiful />}
            
            {/* Main Content */}
            <div className="relative z-10">
              {currentScreen.screen === 'Home' ? (
                <HomeScreenBeautiful />
              ) : isAIChat ? (
                <div className="pt-4">
                  <ScreenRenderer />
                </div>
              ) : (
                <>
                  {!hideHeader && currentScreen.screen !== 'Home' && <HeaderBeautiful />}
                  <div className="pt-4">
                    <ScreenRenderer />
                  </div>
                </>
              )}
            </div>

            {/* Beautiful Tab Bar */}
            {!hideTabBar && <TabBarBeautiful />}
          </>
        ) : (
          <PageTransition transitionKey="login">
            <LoginScreenBeautiful onLogin={() => setIsLoggedIn(true)} />
          </PageTransition>
        )}
      </div>
    </div>
  );
}