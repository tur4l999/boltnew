import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { StatusBar } from './components/layout/StatusBar';
import { Header } from './components/layout/Header';
import { TabBar } from './components/layout/TabBar';
import { ScreenRenderer } from './components/navigation/ScreenRenderer';
import { InspectPage } from './pages/inspect';
import { LoginScreen } from './components/screens/LoginScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
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
  const { currentScreen, isDarkMode, hasCompletedOnboarding, completeOnboarding } = useApp();

  const isAIChat = currentScreen.screen === 'AIChat';
  const hideHeader = currentScreen.screen !== 'Home';
  const hideTabBar = currentScreen.screen === 'ExamRun' || currentScreen.screen === 'ProductDetail' || currentScreen.screen === 'Cart';

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className={`max-w-md mx-auto h-screen relative transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      } overflow-y-auto`}
      id="app-scroll-container"
      >
        {/* Sticky iPhone-like status bar inside the scroll container */}
        <div className="sticky top-0 z-40">
          <StatusBar />
        </div>

        {!hasCompletedOnboarding ? (
          <PageTransition transitionKey="onboarding">
            <OnboardingScreen onComplete={completeOnboarding} />
          </PageTransition>
        ) : isLoggedIn ? (
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