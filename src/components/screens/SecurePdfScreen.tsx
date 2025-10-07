/**
 * Secure PDF Reader Screen
 * Demo integration for DDA.az mobile app
 */

import React, { useState } from 'react';
import { PdfReader } from '../../modules/pdf';
import { useApp } from '../../contexts/AppContext';

interface SecurePdfScreenProps {
  bookId?: string;
  // In real app, get these from auth context
  userId?: string;
  userName?: string;
  userPhone?: string;
  userEmail?: string;
  language?: 'az' | 'en';
}

export const SecurePdfScreen: React.FC<SecurePdfScreenProps> = ({
  bookId = 'book-01',
  userId = 'user_123',
  userName = 'Əli Məmmədov',
  userPhone = '+994501234567',
  userEmail = 'ali@example.com',
  language = 'az',
}) => {
  const { goBack, isDarkMode } = useApp();
  const [showReader, setShowReader] = useState(false);
  
  if (!showReader) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: isDarkMode ? '#111827' : '#f9fafb',
          padding: '20px',
        }}
      >
        {/* Back button */}
        <button
          onClick={goBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            marginBottom: '20px',
            backgroundColor: 'transparent',
            border: 'none',
            color: isDarkMode ? '#e5e7eb' : '#374151',
            fontSize: '15px',
            fontWeight: '500',
            cursor: 'pointer',
            alignSelf: 'flex-start',
          }}
        >
          <span style={{ fontSize: '20px' }}>←</span>
          {language === 'az' ? 'Geri' : 'Back'}
        </button>

        <div
          style={{
            maxWidth: '500px',
            width: '100%',
            backgroundColor: isDarkMode ? '#1f2937' : 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: isDarkMode 
              ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
              : '0 4px 12px rgba(0, 0, 0, 0.1)',
            margin: '0 auto',
          }}
        >
          <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '16px' }}>
            📚
          </div>
          
          <h1
            style={{
              fontSize: '24px',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '12px',
              color: isDarkMode ? '#f9fafb' : '#1a1a1a',
            }}
          >
            {language === 'az' ? 'Ödənişli Kitablar' : 'Premium Books'}
          </h1>
          
          <p
            style={{
              fontSize: '15px',
              color: isDarkMode ? '#9ca3af' : '#6b7280',
              textAlign: 'center',
              lineHeight: '1.6',
              marginBottom: '24px',
            }}
          >
            {language === 'az'
              ? 'Təhlükəsiz oxu sistemi ilə qorunan kitablarınızı oxuyun'
              : 'Read your books protected with secure reading system'}
          </p>
          
          <div
            style={{
              display: 'grid',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            {/* Book 1 */}
            <BookCard
              id="book-01"
              title="Sürücülük Nəzəriyyəsi - Tam Kurs"
              pages={240}
              language={language}
              onOpen={() => setShowReader(true)}
              isDarkMode={isDarkMode}
            />
            
            {/* Book 2 */}
            <BookCard
              id="book-02"
              title="Yol Hərəkəti Qaydaları - 2024"
              pages={180}
              language={language}
              onOpen={() => setShowReader(true)}
              isDarkMode={isDarkMode}
            />
          </div>
          
          <div
            style={{
              backgroundColor: isDarkMode ? '#1e3a8a' : '#eff6ff',
              border: `1px solid ${isDarkMode ? '#3b82f6' : '#bfdbfe'}`,
              borderRadius: '8px',
              padding: '12px',
              fontSize: '13px',
              color: isDarkMode ? '#bfdbfe' : '#1e40af',
              lineHeight: '1.5',
            }}
          >
            <strong>ℹ️ {language === 'az' ? 'Qeyd' : 'Note'}:</strong>{' '}
            {language === 'az'
              ? 'Hər kitab şəxsi vatermark ilə qorunur. Ekran şəkli və paylaşma qadağandır.'
              : 'Each book is protected with personal watermark. Screenshots and sharing are prohibited.'}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <PdfReader
      bookId={bookId}
      userId={userId}
      userName={userName}
      userPhone={userPhone}
      userEmail={userEmail}
      language={language}
      onExit={() => setShowReader(false)}
      showCopyrightNotice={true}
    />
  );
};

// Book Card Component
interface BookCardProps {
  id: string;
  title: string;
  pages: number;
  language: 'az' | 'en';
  onOpen: () => void;
  isDarkMode?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ title, pages, language, onOpen, isDarkMode = false }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
        borderRadius: '12px',
        border: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onClick={onOpen}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isDarkMode ? '#4b5563' : '#f3f4f6';
        e.currentTarget.style.borderColor = '#2563eb';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isDarkMode ? '#374151' : '#f9fafb';
        e.currentTarget.style.borderColor = isDarkMode ? '#4b5563' : '#e5e7eb';
      }}
    >
      <div
        style={{
          width: '60px',
          height: '80px',
          backgroundColor: '#2563eb',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          flexShrink: 0,
        }}
      >
        📖
      </div>
      
      <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <h3
          style={{
            fontSize: '15px',
            fontWeight: '600',
            color: isDarkMode ? '#f9fafb' : '#1a1a1a',
            marginBottom: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </h3>
        <p style={{ 
          fontSize: '13px', 
          color: isDarkMode ? '#9ca3af' : '#6b7280',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {pages} {language === 'az' ? 'səhifə' : 'pages'}
        </p>
      </div>
      
      <div
        style={{
          padding: '8px 16px',
          backgroundColor: '#2563eb',
          color: 'white',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '600',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {language === 'az' ? 'Oxu' : 'Read'}
      </div>
    </div>
  );
};

export default SecurePdfScreen;