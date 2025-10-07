/**
 * Main Secure PDF Reader Component
 * Integrates all security features, UI components, and PDF viewing
 */

import React, { useEffect, useState, useRef } from 'react';
import { usePdfStore } from './usePdfStore';
import { AdaptiveWatermark } from './Watermark';
import { BlurOverlay } from './components/BlurOverlay';
import { PagePicker } from './components/PagePicker';
import { SearchBar } from './components/SearchBar';
import { PageThumbs } from './components/PageThumbs';
import { issueSecuredPdf, revokeSession, searchInPdf, logPdfEvent } from './api';
import {
  startScreenshotMonitoring,
  preventScreenCapture,
  allowScreenCapture,
  addScreenshotListener,
  setupBackgroundProtection,
  checkJailbreak,
} from './guards';
import { getDeviceId, isSessionExpired, formatTimeRemaining } from './utils';
import { t, type Language } from './i18n';
import type { PdfSecurityConfig } from './types';

interface PdfReaderProps {
  bookId: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  language?: Language;
  onExit?: () => void;
  showCopyrightNotice?: boolean;
}

export const PdfReader: React.FC<PdfReaderProps> = ({
  bookId,
  userId,
  userName,
  userPhone,
  userEmail,
  language = 'az',
  onExit,
  showCopyrightNotice = true,
}) => {
  const store = usePdfStore();
  const [deviceId] = useState(getDeviceId());
  const [showSearch, setShowSearch] = useState(false);
  const [showCopyright, setShowCopyright] = useState(showCopyrightNotice);
  const [expiryWarning, setExpiryWarning] = useState(false);
  const cleanupRef = useRef<(() => void)[]>([]);
  
  // Initialize PDF session
  useEffect(() => {
    initializeSession();
    
    return () => {
      // Cleanup on unmount
      cleanupRef.current.forEach(cleanup => cleanup());
      allowScreenCapture();
    };
  }, [bookId]);
  
  // Check for jailbreak on mount
  useEffect(() => {
    checkJailbreak().then(isJailbroken => {
      if (isJailbroken) {
        store.setJailbroken(true);
        store.setBlur(true);
      }
    });
  }, []);
  
  // Setup security monitoring
  useEffect(() => {
    if (!store.session || store.sessionRevoked || store.isJailbroken) return;
    
    // Prevent screenshots
    preventScreenCapture();
    
    // Monitor screenshot attempts
    const cleanupMonitoring = startScreenshotMonitoring(() => {
      handleSecurityViolation('screenshot');
    });
    cleanupRef.current.push(cleanupMonitoring);
    
    // Add screenshot listener
    const cleanupListener = addScreenshotListener(() => {
      handleSecurityViolation('screenshot');
    });
    cleanupRef.current.push(cleanupListener);
    
    // Background protection
    const cleanupBackground = setupBackgroundProtection(
      () => store.setBlur(true),
      () => store.setBlur(false)
    );
    cleanupRef.current.push(cleanupBackground);
    
  }, [store.session, store.sessionRevoked, store.isJailbroken]);
  
  // Monitor session expiry
  useEffect(() => {
    if (!store.session) return;
    
    const interval = setInterval(() => {
      if (isSessionExpired(store.session!.expiresAt)) {
        handleSessionExpired();
      } else {
        // Show warning 5 minutes before expiry
        const timeLeft = new Date(store.session!.expiresAt).getTime() - Date.now();
        if (timeLeft < 5 * 60 * 1000 && timeLeft > 0) {
          setExpiryWarning(true);
        }
      }
    }, 10000); // Check every 10 seconds
    
    cleanupRef.current.push(() => clearInterval(interval));
    
    return () => clearInterval(interval);
  }, [store.session]);
  
  const initializeSession = async () => {
    store.setLoading(true);
    store.setError(null);
    
    try {
      const config: PdfSecurityConfig = {
        bookId,
        userId,
        deviceId,
        userName,
        userPhone,
        userEmail,
      };
      
      const response = await issueSecuredPdf(config);
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to load PDF');
      }
      
      const { url, checksumSha256, expiresAt, totalPages, bookTitle } = response.data;
      
      store.setSession({
        bookId,
        userId,
        deviceId,
        issuedAt: new Date().toISOString(),
        expiresAt,
        url,
        checksum: checksumSha256,
        totalPages,
        bookTitle,
      });
      
      // Log open event
      await logPdfEvent(bookId, 'open', { userId, deviceId });
      
    } catch (error) {
      store.setError(
        error instanceof Error ? error.message : t('loadError', language)
      );
    } finally {
      store.setLoading(false);
    }
  };
  
  const handleSecurityViolation = async (reason: 'screenshot' | 'jailbreak') => {
    store.markScreenshotDetected();
    
    // Revoke session
    await revokeSession({
      bookId,
      userId,
      deviceId,
      reason: reason === 'screenshot' ? 'capture' : 'jailbreak',
      metadata: {
        timestamp: new Date().toISOString(),
      },
    });
    
    // Log security event
    await logPdfEvent(bookId, 'security_violation', { reason, userId, deviceId });
    
    store.revokeSession(reason);
  };
  
  const handleSessionExpired = async () => {
    store.setError(t('expiryError', language));
    
    // Optionally auto-renew
    // await initializeSession();
  };
  
  const handleSearch = async (query: string) => {
    if (!store.session) return;
    
    store.setSearching(true);
    
    try {
      const response = await searchInPdf(bookId, query);
      
      if (response.success && response.data) {
        store.setSearchResults(response.data);
        
        // Log search event
        await logPdfEvent(bookId, 'search', { query, resultsCount: response.data.length });
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      store.setSearching(false);
    }
  };
  
  const handleExit = async () => {
    // Log close event
    if (store.session) {
      await logPdfEvent(bookId, 'close', {
        userId,
        deviceId,
        lastPage: store.currentPage,
        duration: Date.now() - new Date(store.session.issuedAt).getTime(),
      });
    }
    
    if (onExit) {
      onExit();
    } else {
      window.history.back();
    }
  };
  
  // If jailbroken, show warning
  if (store.isJailbroken) {
    return (
      <BlurOverlay
        visible={true}
        reason="jailbreak"
        language={language}
        onDismiss={handleExit}
      />
    );
  }
  
  // If session revoked, show warning
  if (store.sessionRevoked) {
    return (
      <BlurOverlay
        visible={true}
        reason={store.screenshotDetected ? 'screenshot' : 'session_revoked'}
        language={language}
        onDismiss={handleExit}
      />
    );
  }
  
  // Loading state
  if (store.isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f9fafb',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              border: '4px solid #e5e7eb',
              borderTopColor: '#2563eb',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <div style={{ fontSize: '16px', color: '#6b7280' }}>
            {t('loadingBook', language)}
          </div>
        </div>
        <style>
          {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }
  
  // Error state
  if (store.error) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f9fafb',
          padding: '20px',
        }}
      >
        <div
          style={{
            maxWidth: '400px',
            textAlign: 'center',
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
            {t('error', language)}
          </h2>
          <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '20px' }}>
            {store.error}
          </p>
          <button
            onClick={initializeSession}
            style={{
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: '600',
              color: 'white',
              backgroundColor: '#2563eb',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {t('retry', language)}
          </button>
        </div>
      </div>
    );
  }
  
  if (!store.session) return null;
  
  return (
    <div
      className="pdf-reader-protected"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#1f2937',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          zIndex: 100,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1a1a1a',
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {store.session.bookTitle}
          </h1>
          <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>
            {t('page', language)} {store.currentPage} {t('of', language)} {store.totalPages}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowSearch(!showSearch)}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              color: '#6b7280',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
            title={t('search', language)}
          >
            🔍
          </button>
          
          <button
            onClick={handleExit}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              color: '#dc2626',
              backgroundColor: '#fef2f2',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            {t('exit', language)}
          </button>
        </div>
      </div>
      
      {/* Search Bar */}
      <SearchBar
        visible={showSearch}
        onSearch={handleSearch}
        onResultClick={(page) => store.setPage(page)}
        onClose={() => setShowSearch(false)}
        results={store.searchResults}
        isSearching={store.isSearching}
        language={language}
      />
      
      {/* PDF Viewer */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Placeholder for PDF content */}
        <div
          style={{
            width: '100%',
            maxWidth: `${800 * store.zoomLevel}px`,
            aspectRatio: '210 / 297',
            backgroundColor: 'white',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* PDF page content goes here */}
          {/* In React Native, use react-native-pdf */}
          {/* <Pdf source={{ uri: store.session.url }} page={store.currentPage} /> */}
          
          <div
            style={{
              fontSize: `${48 * store.zoomLevel}px`,
              fontWeight: '300',
              color: '#d1d5db',
            }}
          >
            {t('page', language)} {store.currentPage}
          </div>
          
          {/* Watermark Overlay */}
          <AdaptiveWatermark
            config={{
              userName,
              userPhone,
              userId,
              deviceId,
              currentPage: store.currentPage,
              totalPages: store.totalPages,
            }}
            zoomLevel={store.zoomLevel}
          />
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e5e7eb',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={store.previousPage}
            disabled={store.currentPage === 1}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              color: store.currentPage === 1 ? '#d1d5db' : '#374151',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '6px',
              cursor: store.currentPage === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            ←
          </button>
          
          <button
            onClick={store.togglePagePicker}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              color: '#374151',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            {store.currentPage} / {store.totalPages}
          </button>
          
          <button
            onClick={store.nextPage}
            disabled={store.currentPage === store.totalPages}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              color: store.currentPage === store.totalPages ? '#d1d5db' : '#374151',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '6px',
              cursor: store.currentPage === store.totalPages ? 'not-allowed' : 'pointer',
            }}
          >
            →
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => store.toggleThumbnails()}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              color: '#374151',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            ☰
          </button>
          
          <button
            onClick={() => store.setZoom(Math.max(0.5, store.zoomLevel - 0.25))}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              color: '#374151',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            −
          </button>
          
          <span
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              color: '#6b7280',
            }}
          >
            {Math.round(store.zoomLevel * 100)}%
          </span>
          
          <button
            onClick={() => store.setZoom(Math.min(3.0, store.zoomLevel + 0.25))}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              color: '#374151',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            +
          </button>
        </div>
      </div>
      
      {/* Page Picker Modal */}
      <PagePicker
        visible={store.showPagePicker}
        currentPage={store.currentPage}
        totalPages={store.totalPages}
        onPageSelect={store.setPage}
        onClose={store.togglePagePicker}
        language={language}
      />
      
      {/* Page Thumbnails Sidebar */}
      <PageThumbs
        visible={store.showThumbnails}
        currentPage={store.currentPage}
        totalPages={store.totalPages}
        onPageClick={store.setPage}
        onClose={store.toggleThumbnails}
        language={language}
      />
      
      {/* Blur Overlay (background protection) */}
      <BlurOverlay
        visible={store.showBlur && !store.sessionRevoked && !store.screenshotDetected}
        reason="background"
        language={language}
        onDismiss={() => store.setBlur(false)}
      />
      
      {/* Copyright Notice */}
      {showCopyright && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '500px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📖</div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
              {t('copyrightTitle', language)}
            </h2>
            <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.6', marginBottom: '24px' }}>
              {t('copyrightMessage', language)}
            </p>
            <button
              onClick={() => setShowCopyright(false)}
              style={{
                padding: '12px 32px',
                fontSize: '15px',
                fontWeight: '600',
                color: 'white',
                backgroundColor: '#2563eb',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              {t('understood', language)}
            </button>
          </div>
        </div>
      )}
      
      {/* Expiry Warning */}
      {expiryWarning && !store.sessionRevoked && (
        <div
          style={{
            position: 'fixed',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#fef3c7',
            color: '#92400e',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: 10001,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          ⏰ {t('sessionExpiresIn', language, {
            time: formatTimeRemaining(store.session.expiresAt, language),
          })}
        </div>
      )}
    </div>
  );
};

export default PdfReader;