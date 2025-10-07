/**
 * Page Picker Modal Component
 * Jump to specific page with input and slider
 */

import React, { useState, useEffect } from 'react';
import { t, type Language } from '../i18n';

interface PagePickerProps {
  visible: boolean;
  currentPage: number;
  totalPages: number;
  onPageSelect: (page: number) => void;
  onClose: () => void;
  language?: Language;
}

export const PagePicker: React.FC<PagePickerProps> = ({
  visible,
  currentPage,
  totalPages,
  onPageSelect,
  onClose,
  language = 'az',
}) => {
  const [selectedPage, setSelectedPage] = useState(currentPage);
  const [inputValue, setInputValue] = useState(String(currentPage));
  
  useEffect(() => {
    setSelectedPage(currentPage);
    setInputValue(String(currentPage));
  }, [currentPage, visible]);
  
  if (!visible) return null;
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(e.target.value, 10);
    setSelectedPage(page);
    setInputValue(String(page));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const page = parseInt(value, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setSelectedPage(page);
    }
  };
  
  const handleSubmit = () => {
    const page = parseInt(inputValue, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageSelect(page);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };
  
  return (
    <div
      className="page-picker-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
        className="page-picker-content"
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '8px',
            }}
          >
            {t('selectPage', language)}
          </h3>
          <p style={{ fontSize: '14px', color: '#666' }}>
            {t('page', language)} 1-{totalPages}
          </p>
        </div>
        
        {/* Page number display */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#2563eb',
              fontFamily: 'monospace',
            }}
          >
            {selectedPage}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            {t('of', language)} {totalPages}
          </div>
        </div>
        
        {/* Slider */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="range"
            min="1"
            max={totalPages}
            value={selectedPage}
            onChange={handleSliderChange}
            style={{
              width: '100%',
              height: '6px',
              borderRadius: '3px',
              outline: 'none',
              cursor: 'pointer',
            }}
          />
        </div>
        
        {/* Number input */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px',
            }}
          >
            {t('pageNumber', language)}
          </label>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={t('enterPageNumber', language)}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            autoFocus
          />
        </div>
        
        {/* Actions */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
          }}
        >
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '15px',
              fontWeight: '600',
              color: '#6b7280',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {t('close', language)}
          </button>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '15px',
              fontWeight: '600',
              color: 'white',
              backgroundColor: '#2563eb',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {t('goToPage', language)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagePicker;