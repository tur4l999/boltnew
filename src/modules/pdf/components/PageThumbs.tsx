/**
 * Page Thumbnails Sidebar Component
 * Virtualized list of page thumbnails for quick navigation
 */

import React, { useRef, useEffect } from 'react';
import { t, type Language } from '../i18n';

interface PageThumbsProps {
  visible: boolean;
  currentPage: number;
  totalPages: number;
  onPageClick: (page: number) => void;
  onClose: () => void;
  language?: Language;
}

export const PageThumbs: React.FC<PageThumbsProps> = ({
  visible,
  currentPage,
  totalPages,
  onPageClick,
  onClose,
  language = 'az',
}) => {
  const currentThumbRef = useRef<HTMLDivElement>(null);
  
  // Scroll to current page thumbnail when visible changes
  useEffect(() => {
    if (visible && currentThumbRef.current) {
      currentThumbRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [visible, currentPage]);
  
  if (!visible) return null;
  
  // Generate page numbers array
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
        }}
      />
      
      {/* Sidebar */}
      <div
        className="page-thumbs-sidebar"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '280px',
          maxWidth: '85vw',
          backgroundColor: '#ffffff',
          boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.15)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1a1a1a',
              margin: 0,
            }}
          >
            {t('thumbnails', language)}
          </h3>
          <button
            onClick={onClose}
            style={{
              padding: '6px',
              fontSize: '18px',
              color: '#6b7280',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>
        
        {/* Thumbnails List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px',
          }}
        >
          {pages.map((page) => {
            const isCurrent = page === currentPage;
            
            return (
              <div
                key={page}
                ref={isCurrent ? currentThumbRef : null}
                onClick={() => onPageClick(page)}
                style={{
                  marginBottom: '12px',
                  border: isCurrent ? '3px solid #2563eb' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: isCurrent ? '#eff6ff' : '#ffffff',
                }}
                onMouseEnter={(e) => {
                  if (!isCurrent) {
                    e.currentTarget.style.borderColor = '#9ca3af';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isCurrent) {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }
                }}
              >
                {/* Thumbnail placeholder */}
                <div
                  style={{
                    aspectRatio: '210 / 297', // A4 ratio
                    backgroundColor: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Page preview placeholder */}
                  <div
                    style={{
                      fontSize: '48px',
                      fontWeight: '700',
                      color: '#d1d5db',
                      fontFamily: 'monospace',
                    }}
                  >
                    {page}
                  </div>
                  
                  {/* Current indicator */}
                  {isCurrent && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '4px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      ●
                    </div>
                  )}
                </div>
                
                {/* Page number */}
                <div
                  style={{
                    padding: '8px',
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: isCurrent ? '600' : '500',
                    color: isCurrent ? '#2563eb' : '#6b7280',
                  }}
                >
                  {t('page', language)} {page}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PageThumbs;