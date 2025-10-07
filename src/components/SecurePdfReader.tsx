import React, { useState, useEffect, useRef } from 'react';
import './SecurePdfReader.css';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  pages: number;
}

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface SecurePdfReaderProps {
  book: Book;
  user: User;
  onExit: () => void;
  isDarkMode?: boolean;
}

const SecurePdfReader: React.FC<SecurePdfReaderProps> = ({
  book,
  user,
  onExit,
  isDarkMode = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [showPagePicker, setShowPagePicker] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{page: number, snippet: string}>>([]);
  const [isBlurred, setIsBlurred] = useState(false);
  const [securityViolation, setSecurityViolation] = useState<string | null>(null);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(25 * 60); // 25 minutes
  const [watermarkTimestamp, setWatermarkTimestamp] = useState(new Date());

  const pdfViewerRef = useRef<HTMLDivElement>(null);

  // Update watermark timestamp every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWatermarkTimestamp(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTimeLeft(prev => {
        if (prev <= 0) {
          handleSecurityViolation('session_expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Screenshot detection simulation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Simulate screenshot detection (Cmd+Shift+3/4 on Mac, PrtScr on Windows)
      if ((e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4')) || 
          e.key === 'PrintScreen') {
        e.preventDefault();
        handleSecurityViolation('screenshot');
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // Disable right-click
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const handleSecurityViolation = (type: string) => {
    setIsBlurred(true);
    setSecurityViolation(type);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const generateWatermarkText = () => {
    const timestamp = watermarkTimestamp.toLocaleString('az-AZ', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    return `DDA.az • ${user.name} • ${user.phone} • ${user.id.substring(0, 8)} • ${timestamp} • Səhifə ${currentPage}/${book.pages}`;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Mock search results
      const mockResults = [
        { page: 15, snippet: `Bu mətn nümunəsi "${query}" axtarış nəticəsidir...` },
        { page: 42, snippet: `Başqa bir "${query}" axtarış nəticəsi burada...` },
        { page: 78, snippet: `Üçüncü "${query}" axtarış nəticəsi məzmunu...` },
      ];
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  };

  const renderSecurityOverlay = () => {
    if (!isBlurred) return null;

    const getTitle = () => {
      switch (securityViolation) {
        case 'screenshot': return 'Ekran Görüntüsü Aşkarlandı';
        case 'session_expired': return 'Sessiya Vaxtı Bitdi';
        default: return 'Təhlükəsizlik Pozuntusu';
      }
    };

    const getMessage = () => {
      switch (securityViolation) {
        case 'screenshot': return 'Təhlükəsizlik səbəbiylə ekran görüntüsü çəkmək qadağandır. Sessiyanız ləğv edildi.';
        case 'session_expired': return 'Oxuma müddətiniz bitdi. Yenidən daxil olmaq üçün kitabı yenidən açın.';
        default: return 'Təhlükəsizlik pozuntusu aşkarlandı. Oxuma dayandırıldı.';
      }
    };

    return (
      <div className="security-overlay">
        <div className="security-modal">
          <div className="security-icon">🔒</div>
          <h3 className="security-title">{getTitle()}</h3>
          <p className="security-message">{getMessage()}</p>
          <div className="security-warning">
            ⚠️ Bu materiallar müəllif hüquqları ilə qorunur. Hər səhifədə şəxsi vatermark mövcuddur.
          </div>
          <div className="security-actions">
            <button onClick={onExit} className="security-button exit">
              Çıxış
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderWatermark = () => (
    <div className="watermark-overlay">
      <svg width="100%" height="100%" className="watermark-svg">
        <defs>
          <pattern id="watermarkPattern" x="0" y="0" width="300" height="200" patternUnits="userSpaceOnUse">
            <text
              x="150"
              y="100"
              fontSize="14"
              fill={isDarkMode ? '#ffffff' : '#000000'}
              opacity="0.12"
              textAnchor="middle"
              transform="rotate(-15 150 100)"
              fontFamily="system-ui"
            >
              {generateWatermarkText()}
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#watermarkPattern)" />
      </svg>
    </div>
  );

  return (
    <div className={`pdf-reader ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <header className="pdf-header">
        <div className="pdf-title">
          <h2>{book.title}</h2>
          <span className="page-info">Səhifə {currentPage} / {book.pages}</span>
        </div>
        
        <div className="session-timer">
          Qalan vaxt: {formatTime(sessionTimeLeft)}
        </div>
        
        <div className="header-actions">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="header-btn"
            title="Axtarış"
          >
            🔍
          </button>
          <button 
            onClick={() => setShowPagePicker(!showPagePicker)}
            className="header-btn"
            title="Səhifəyə keç"
          >
            📄
          </button>
          <button 
            onClick={() => setShowThumbnails(!showThumbnails)}
            className="header-btn"
            title="Səhifələr"
          >
            📋
          </button>
          <button 
            onClick={onExit}
            className="header-btn exit"
            title="Çıxış"
          >
            ✕
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="pdf-content">
        {/* PDF Viewer */}
        <div 
          ref={pdfViewerRef}
          className="pdf-viewer"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Mock PDF Page */}
          <div className="pdf-page">
            <div className="page-content">
              <h1>Səhifə {currentPage}</h1>
              <p>Bu {book.title} kitabının {currentPage}-ci səhifəsidir.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              
              {searchQuery && (
                <div className="search-highlight">
                  <p>Axtarış nəticəsi: "<mark>{searchQuery}</mark>" bu səhifədə tapıldı.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Watermark */}
          {renderWatermark()}
        </div>

        {/* Thumbnails Sidebar */}
        {showThumbnails && (
          <div className="thumbnails-sidebar">
            <div className="thumbnails-header">
              <h3>Səhifələr</h3>
              <button onClick={() => setShowThumbnails(false)}>✕</button>
            </div>
            <div className="thumbnails-list">
              {Array.from({ length: book.pages }, (_, i) => i + 1).map(page => (
                <div
                  key={page}
                  className={`thumbnail ${page === currentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  <div className="thumbnail-page">📄</div>
                  <span className="thumbnail-number">{page}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Page Picker Modal */}
      {showPagePicker && (
        <div className="modal-overlay">
          <div className="page-picker-modal">
            <div className="modal-header">
              <h3>Səhifəyə keç</h3>
              <button onClick={() => setShowPagePicker(false)}>✕</button>
            </div>
            <div className="modal-content">
              <p>Cari səhifə: {currentPage} / {book.pages}</p>
              <input
                type="range"
                min="1"
                max={book.pages}
                value={currentPage}
                onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                className="page-slider"
              />
              <div className="quick-jump">
                <button onClick={() => setCurrentPage(1)}>Başlanğıc</button>
                <button onClick={() => setCurrentPage(Math.floor(book.pages / 2))}>Orta</button>
                <button onClick={() => setCurrentPage(book.pages)}>Son</button>
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowPagePicker(false)}>Bağla</button>
            </div>
          </div>
        </div>
      )}

      {/* Search Panel */}
      {showSearch && (
        <div className="search-panel">
          <div className="search-header">
            <input
              type="text"
              placeholder="Mətnlərdə axtarış..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
            <button onClick={() => setShowSearch(false)}>Bağla</button>
          </div>
          
          {searchResults.length > 0 && (
            <div className="search-results">
              <h4>{searchResults.length} nəticə tapıldı</h4>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="search-result"
                  onClick={() => setCurrentPage(result.page)}
                >
                  <div className="result-page">Səhifə {result.page}</div>
                  <div className="result-snippet">{result.snippet}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="pdf-controls">
        <button 
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          ← Əvvəlki
        </button>
        
        <div className="zoom-controls">
          <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>-</button>
          <span>{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(Math.min(3, zoom + 0.1))}>+</button>
        </div>
        
        <button 
          onClick={() => setCurrentPage(Math.min(book.pages, currentPage + 1))}
          disabled={currentPage === book.pages}
        >
          Növbəti →
        </button>
      </div>

      {/* Security Overlay */}
      {renderSecurityOverlay()}

      {/* Demo Instructions */}
      <div className="demo-instructions">
        <p><strong>Demo təlimatları:</strong></p>
        <p>• Screenshot cəhdi üçün: Cmd+Shift+3/4 (Mac) və ya PrtScr (Windows)</p>
        <p>• Sağ klik qadağandır</p>
        <p>• Sessiya 25 dəqiqə sonra bitəcək</p>
        <p>• Vatermark hər dəqiqə yenilənir</p>
      </div>
    </div>
  );
};

export default SecurePdfReader;