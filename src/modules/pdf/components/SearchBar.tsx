/**
 * Search Bar Component
 * Search within PDF with results list
 */

import React, { useState, useEffect } from 'react';
import { t, type Language } from '../i18n';
import type { SearchResult } from '../types';
import { debounce } from '../utils';

interface SearchBarProps {
  visible: boolean;
  onSearch: (query: string) => void;
  onResultClick: (page: number) => void;
  onClose: () => void;
  results: SearchResult[];
  isSearching: boolean;
  language?: Language;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  visible,
  onSearch,
  onResultClick,
  onClose,
  results,
  isSearching,
  language = 'az',
}) => {
  const [query, setQuery] = useState('');
  
  // Debounced search
  const debouncedSearch = debounce((q: string) => {
    if (q.length >= 2) {
      onSearch(q);
    }
  }, 500);
  
  useEffect(() => {
    debouncedSearch(query);
  }, [query]);
  
  if (!visible) return null;
  
  return (
    <div
      className="search-bar-container"
      style={{
        position: 'absolute',
        top: '110px', // Header-dən sonra (50px notch + 60px header)
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Search Input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          gap: '12px',
        }}
      >
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchInBook', language)}
            autoFocus
            style={{
              width: '100%',
              padding: '10px 12px',
              paddingRight: '36px',
              fontSize: '15px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#2563eb';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
            }}
          />
          
          {isSearching && (
            <div
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <div
                className="spinner"
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #e5e7eb',
                  borderTopColor: '#2563eb',
                  borderRadius: '50%',
                  animation: 'spin 0.6s linear infinite',
                }}
              />
            </div>
          )}
        </div>
        
        <button
          onClick={onClose}
          style={{
            padding: '10px',
            fontSize: '20px',
            color: '#6b7280',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>
      
      {/* Results */}
      {query.length >= 2 && (
        <div
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
            borderTop: '1px solid #e5e7eb',
          }}
        >
          {results.length === 0 && !isSearching && (
            <div
              style={{
                padding: '20px',
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '14px',
              }}
            >
              {t('noResults', language)}
            </div>
          )}
          
          {results.map((result, index) => (
            <div
              key={index}
              onClick={() => {
                onResultClick(result.page);
                onClose();
              }}
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #f3f4f6',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#2563eb',
                  marginBottom: '4px',
                }}
              >
                {t('page', language)} {result.page}
                {result.matchCount > 1 && (
                  <span style={{ marginLeft: '8px', color: '#6b7280' }}>
                    ({result.matchCount} {language === 'az' ? 'nəticə' : 'matches'})
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#374151',
                  lineHeight: '1.4',
                }}
                dangerouslySetInnerHTML={{
                  __html: result.snippet.replace(
                    new RegExp(query, 'gi'),
                    (match) => `<mark style="background-color: #fef08a; padding: 2px 4px; border-radius: 2px;">${match}</mark>`
                  ),
                }}
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Add spinner animation */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SearchBar;