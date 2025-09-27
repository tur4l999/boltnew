import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { StatusBar } from './components/layout/StatusBar';
import { Header } from './components/layout/Header';
import { TabBar } from './components/layout/TabBar';
import { ScreenRenderer } from './components/navigation/ScreenRenderer';
import { InspectPage } from './pages/inspect';
import { LoginScreen } from './components/screens/LoginScreen';
import { PageTransition } from './components/navigation/PageTransition';

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
  const { currentScreen, isDarkMode } = useApp();

  const isAIChat = currentScreen.screen === 'AIChat';
  const hideHeader = currentScreen.screen !== 'Home';
  const hideTabBar = currentScreen.screen === 'ExamRun' || currentScreen.screen === 'ProductDetail' || currentScreen.screen === 'Cart';

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-gray-100' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 text-gray-900'
    }`}>
      <div className={`max-w-md mx-auto h-screen relative transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-900/95 to-slate-900/95' 
          : 'bg-gradient-to-b from-white/95 to-gray-50/95'
      } overflow-y-auto backdrop-blur-sm`}
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
              {!hideTabBar && <TabBar />}
            </>
          )
        ) : (
          <PageTransition transitionKey="login">
            <LoginScreen onLogin={() => setIsLoggedIn(true)} />
          </PageTransition>
        )}
      </div>
    </div>
  );
}