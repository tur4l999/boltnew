import React, { useState, useEffect } from 'react';
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
import SecurePdfReader from './components/SecurePdfReader';
import './App.css';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  pages: number;
}

const DEMO_BOOKS: Book[] = [
  {
    id: 'book-01',
    title: 'Azərbaycan Tarixi',
    author: 'Müəllif 1',
    description: 'Azərbaycanın qədim tarixindən müasir dövrə qədər',
    pages: 240,
  },
  {
    id: 'book-02',
    title: 'Ədəbiyyat Nümunələri',
    author: 'Müəllif 2',
    description: 'Klassik və müasir Azərbaycan ədəbiyyatından seçmələr',
    pages: 180,
  },
];

const DEMO_USER = {
  id: 'demo-user-123',
  name: 'Əli Məmmədov',
  phone: '+994501234567',
  email: 'ali.memmedov@example.com',
};

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
        <Route path="/pdf-demo" element={<PdfDemoApp />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </AppProvider>
  );
}

function PdfDemoApp() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const handleBookSelect = (bookId: string) => {
    if (window.confirm('Bu kitabı təhlükəsiz PDF oxuyucuda açmaq istəyirsiniz?')) {
      setSelectedBook(bookId);
      setIsReaderOpen(true);
    }
  };

  const handleReaderExit = () => {
    setIsReaderOpen(false);
    setSelectedBook(null);
  };

  const selectedBookData = DEMO_BOOKS.find(book => book.id === selectedBook);

  if (isReaderOpen && selectedBook && selectedBookData) {
    return (
      <SecurePdfReader
        book={selectedBookData}
        user={DEMO_USER}
        onExit={handleReaderExit}
        isDarkMode={isDarkMode}
      />
    );
  }

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1 className="app-title">DDA.az Təhlükəsiz PDF Oxuyucu</h1>
            <p className="app-subtitle">Secure PDF Reader - Web Demo</p>
          </div>
          
          <div className="user-info">
            <div className="user-name">{DEMO_USER.name}</div>
            <div className="user-phone">{DEMO_USER.phone}</div>
          </div>
        </div>
      </header>
      
      {/* Content */}
      <main className="app-content">
        <section className="section-header">
          <h2 className="section-title">Ödənişli Kitablar</h2>
          <p className="section-subtitle">Təhlükəsiz oxuma üçün kitabı seçin</p>
        </section>
        
        <div className="books-list">
          {DEMO_BOOKS.map((book) => (
            <div
              key={book.id}
              className="book-item"
              onClick={() => handleBookSelect(book.id)}
            >
              <div className="book-icon">
                <span className="book-icon-text">📚</span>
              </div>
              
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <p className="book-description">{book.description}</p>
                <p className="book-pages">{book.pages} səhifə</p>
              </div>
              
              <div className="book-action">
                <span className="book-action-text">▶</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Security Notice */}
        <div className="security-notice">
          <span className="security-icon">🔒</span>
          <div className="security-content">
            <h3 className="security-title">Təhlükəsizlik Xəbərdarlığı</h3>
            <p className="security-text">
              Bu materiallar müəllif hüquqları ilə qorunur. Hər səhifədə şəxsi vatermark mövcuddur. 
              Ekran görüntüsü və ya yazı çəkmək qadağandır.
            </p>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="demo-notice">
          <span className="demo-icon">⚠️</span>
          <div className="demo-content">
            <h3 className="demo-title">Web Demo Qeydi</h3>
            <p className="demo-text">
              Bu StackBlitz-də işləyən web demo versiyasıdır. Real mobil tətbiq React Native + Expo ilə hazırlanmışdır 
              və daha güclü təhlükəsizlik xüsusiyyətlərinə malikdir (screenshot protection, device security checks və s.).
            </p>
          </div>
        </div>

        {/* Back to Main App */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a 
            href="/" 
            style={{ 
              color: 'var(--primary-color)', 
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            ← Əsas tətbiqə qayıt
          </a>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="app-footer">
        <p className="footer-text">DDA.az © 2024 - Təhlükəsiz PDF Oxuyucu v1.0.0</p>
        <p className="footer-note">Web Demo Rejimi</p>
      </footer>
    </div>
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
                     currentScreen.screen === 'QAForm';

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
                  
                  {/* PDF Demo Link */}
                  <div style={{ 
                    position: 'fixed', 
                    bottom: '100px', 
                    right: '20px', 
                    zIndex: 1000,
                    background: '#2196f3',
                    color: 'white',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)'
                  }}>
                    <a 
                      href="/pdf-demo" 
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      📚 PDF Demo
                    </a>
                  </div>
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