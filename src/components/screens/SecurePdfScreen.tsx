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

interface Book {
  id: string;
  title: string;
  pages: number;
  price: number;
}

const BOOKS: Book[] = [
  {
    id: 'book-01',
    title: 'Sürücülük Nəzəriyyəsi - Tam Kurs',
    pages: 240,
    price: 15, // 15 AZN
  },
  {
    id: 'book-02',
    title: 'Yol Hərəkəti Qaydaları - 2024',
    pages: 180,
    price: 12, // 12 AZN
  },
];

export const SecurePdfScreen: React.FC<SecurePdfScreenProps> = ({
  userId = 'user_123',
  userName = 'Əli Məmmədov',
  userPhone = '+994501234567',
  userEmail = 'ali@example.com',
  language = 'az',
}) => {
  const { goBack, isDarkMode, balance, purchaseBook, isBookPurchased } = useApp();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReader, setShowReader] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  
  const handleBookClick = (book: Book) => {
    if (isBookPurchased(book.id)) {
      // Already purchased, open directly
      setSelectedBook(book);
      setShowReader(true);
    } else {
      // Show payment modal
      setSelectedBook(book);
      setShowPaymentModal(true);
      setPaymentError('');
    }
  };
  
  const handlePurchase = () => {
    if (!selectedBook) return;
    
    const success = purchaseBook(selectedBook.id, selectedBook.title, selectedBook.price);
    
    if (success) {
      setShowPaymentModal(false);
      setShowReader(true);
    } else {
      setPaymentError(language === 'az' 
        ? 'Balansınızda kifayət qədər məbləğ yoxdur' 
        : 'Insufficient balance');
    }
  };
  
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
            padding: '24px',
            boxShadow: isDarkMode 
              ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
              : '0 4px 12px rgba(0, 0, 0, 0.1)',
            margin: '0 auto',
            boxSizing: 'border-box',
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
            {language === 'az' ? 'PDF (kitablar)' : 'PDF (books)'}
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
            {BOOKS.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                pages={book.pages}
                price={book.price}
                language={language}
                onOpen={() => handleBookClick(book)}
                isDarkMode={isDarkMode}
                isPurchased={isBookPurchased(book.id)}
              />
            ))}
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
        
        {/* Payment Modal */}
        {showPaymentModal && selectedBook && (
          <PaymentModal
            book={selectedBook}
            balance={balance}
            language={language}
            isDarkMode={isDarkMode}
            error={paymentError}
            onPurchase={handlePurchase}
            onClose={() => {
              setShowPaymentModal(false);
              setPaymentError('');
            }}
          />
        )}
      </div>
    );
  }
  
  return (
    <PdfReader
      bookId={selectedBook?.id || 'book-01'}
      userId={userId}
      userName={userName}
      userPhone={userPhone}
      userEmail={userEmail}
      language={language}
      onExit={() => {
        setShowReader(false);
        setSelectedBook(null);
      }}
      showCopyrightNotice={true}
    />
  );
};

// Payment Modal Component
interface PaymentModalProps {
  book: Book;
  balance: number;
  language: 'az' | 'en';
  isDarkMode: boolean;
  error: string;
  onPurchase: () => void;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  book,
  balance,
  language,
  isDarkMode,
  error,
  onPurchase,
  onClose,
}) => {
  const hasEnoughBalance = balance >= book.price;
  
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: isDarkMode ? '#1f2937' : 'white',
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔒</div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '700', 
            color: isDarkMode ? '#f9fafb' : '#1a1a1a',
            marginBottom: '8px',
          }}>
            {language === 'az' ? 'Kitab Alın' : 'Purchase Book'}
          </h2>
          <p style={{ 
            fontSize: '14px', 
            color: isDarkMode ? '#9ca3af' : '#6b7280',
            lineHeight: '1.4',
          }}>
            {book.title}
          </p>
        </div>
        
        <div style={{
          backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px',
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}>
            <span style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: '14px' }}>
              {language === 'az' ? 'Qiymət:' : 'Price:'}
            </span>
            <span style={{ 
              fontWeight: '700', 
              fontSize: '16px',
              color: isDarkMode ? '#f9fafb' : '#1a1a1a',
            }}>
              {book.price} AZN
            </span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`,
          }}>
            <span style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: '14px' }}>
              {language === 'az' ? 'Balansınız:' : 'Your Balance:'}
            </span>
            <span style={{ 
              fontWeight: '700', 
              fontSize: '16px',
              color: hasEnoughBalance 
                ? (isDarkMode ? '#34d399' : '#059669')
                : (isDarkMode ? '#f87171' : '#dc2626'),
            }}>
              {balance.toFixed(2)} AZN
            </span>
          </div>
        </div>
        
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
          }}>
            <p style={{ 
              fontSize: '13px', 
              color: '#dc2626',
              margin: 0,
              textAlign: 'center',
            }}>
              ⚠️ {error}
            </p>
          </div>
        )}
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '15px',
              fontWeight: '600',
              color: isDarkMode ? '#9ca3af' : '#6b7280',
              backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {language === 'az' ? 'Ləğv et' : 'Cancel'}
          </button>
          <button
            onClick={onPurchase}
            disabled={!hasEnoughBalance}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '15px',
              fontWeight: '600',
              color: 'white',
              backgroundColor: hasEnoughBalance ? '#2563eb' : '#9ca3af',
              border: 'none',
              borderRadius: '8px',
              cursor: hasEnoughBalance ? 'pointer' : 'not-allowed',
              opacity: hasEnoughBalance ? 1 : 0.6,
            }}
          >
            {language === 'az' ? 'Al' : 'Purchase'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Book Card Component
interface BookCardProps {
  id: string;
  title: string;
  pages: number;
  price: number;
  language: 'az' | 'en';
  onOpen: () => void;
  isDarkMode?: boolean;
  isPurchased?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ 
  title, 
  pages, 
  price, 
  language, 
  onOpen, 
  isDarkMode = false,
  isPurchased = false,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
        borderRadius: '12px',
        border: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`,
        cursor: 'pointer',
        transition: 'all 0.2s',
        width: '100%',
        boxSizing: 'border-box',
        maxWidth: '100%',
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
          width: '50px',
          height: '65px',
          backgroundColor: isPurchased ? '#10b981' : '#6b7280',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        {isPurchased ? '📖' : '🔒'}
      </div>
      
      <div style={{ 
        flex: 1, 
        minWidth: 0,
        overflow: 'hidden',
        paddingRight: '8px',
      }}>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: isDarkMode ? '#f9fafb' : '#1a1a1a',
            marginBottom: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.3',
            maxHeight: '2.6em',
            wordBreak: 'break-word',
          }}
        >
          {title}
        </h3>
        <p style={{ 
          fontSize: '12px', 
          color: isDarkMode ? '#9ca3af' : '#6b7280',
          margin: 0,
        }}>
          {pages} {language === 'az' ? 'səhifə' : 'pages'}
        </p>
        {!isPurchased && (
          <p style={{ 
            fontSize: '13px', 
            color: '#2563eb',
            fontWeight: '700',
            margin: '4px 0 0 0',
          }}>
            {price} AZN
          </p>
        )}
      </div>
      
      <div
        style={{
          padding: '10px 14px',
          backgroundColor: isPurchased ? '#2563eb' : '#f59e0b',
          color: 'white',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {isPurchased 
          ? (language === 'az' ? 'Oxu' : 'Read')
          : (language === 'az' ? 'Al' : 'Buy')
        }
      </div>
    </div>
  );
};

export default SecurePdfScreen;