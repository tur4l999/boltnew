import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <Router>
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
      </Router>
    </AppProvider>
  );
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { currentScreen, isDarkMode } = useApp();

  const isAIChat = currentScreen.screen === 'AIChat';

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Fixed iPhone-like status bar rendered at document.body to avoid transform stacking issues */}
      {typeof document !== 'undefined' && createPortal(
        <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
          <StatusBar />
        </div>,
        document.body
      )}

      <div className={`max-w-md mx-auto min-h-screen relative transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      } pt-[44px]`}>
        {isLoggedIn ? (
          isAIChat ? (
            <ScreenRenderer />
          ) : (
            <>
              <Header />
              <ScreenRenderer />
              <TabBar />
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