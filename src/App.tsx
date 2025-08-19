import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { Header } from './components/layout/Header';
import { TabBar } from './components/layout/TabBar';
import { ScreenRenderer } from './components/navigation/ScreenRenderer';
import { InspectPage } from './pages/inspect';
import { LoginScreen } from './components/screens/LoginScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/inspect" element={<InspectPage />} />
          <Route path="/*" element={<LoginScreen onLogin={() => setIsLoggedIn(true)} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/inspect" element={<InspectPage />} />
        <Route path="/*" element={
          <AppProvider>
            <AppContent />
          </AppProvider>
        } />
      </Routes>
    </Router>
  );
}

function AppContent() {
  const { currentScreen } = useApp();
  const isAIChat = currentScreen.screen === 'AIChat';

  if (isAIChat) {
    return <ScreenRenderer />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-md mx-auto min-h-screen relative bg-gray-50">
        <Header />
        <ScreenRenderer />
        <TabBar />
      </div>
    </div>
  );
}