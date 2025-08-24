import React, { useState } from 'react';
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

  if (!isLoggedIn) {
    return (
      <PageTransition transitionKey="login">
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      </PageTransition>
    );
  }

  const isAIChat = currentScreen.screen === 'AIChat';

  if (isAIChat) {
    return <ScreenRenderer />;
  }

  return (
    <div className={`min-h-screen flex items-start justify-center transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="relative" style={{ width: 393, height: 852 }}>
        <StatusBar />
        {/* Scrollable content area between 59px top and 56px bottom */}
        <div className={`absolute left-0 right-0 overflow-auto transition-colors duration-200 app-viewport ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`} style={{ top: 59, bottom: 56 }}>
          <Header />
          <div className="px-4 pt-2 pb-20">
            <ScreenRenderer />
          </div>
        </div>
        <TabBar />
      </div>
    </div>
  );
}