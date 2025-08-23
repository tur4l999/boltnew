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
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <StatusBar />
      <div className={`mx-auto min-h-screen relative transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      } pt-[59px]`} style={{ maxWidth: 393 }}>
        <Header />
        {/* Content viewport under fixed status bar and above tab bar */}
        <div className="px-4 pt-2 pb-20" style={{ minHeight: 'calc(100vh - 59px - 56px)' }}>
          <ScreenRenderer />
        </div>
        <TabBar />
      </div>
    </div>
  );
}