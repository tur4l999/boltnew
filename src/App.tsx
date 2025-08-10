import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { Header } from './components/layout/Header';
import { TabBar } from './components/layout/TabBar';
import { ScreenRenderer } from './components/navigation/ScreenRenderer';
import { MoreSheet } from './components/sheets/MoreSheet';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-md mx-auto min-h-screen relative bg-gray-50">
          <Header />
          <ScreenRenderer />
          <TabBar />
          <MoreSheet />
        </div>
      </div>
    </AppProvider>
  );
}