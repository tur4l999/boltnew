import { LocalizedStrings, Language } from '../modules/pdf/types';

// Design tokens
export const colors = {
  primary: '#2196f3',
  primaryDark: '#1976d2',
  secondary: '#ff9800',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  
  background: '#ffffff',
  backgroundDark: '#121212',
  surface: '#f9f9f9',
  surfaceDark: '#1e1e1e',
  
  text: '#333333',
  textDark: '#ffffff',
  textSecondary: '#666666',
  textSecondaryDark: '#cccccc',
  
  border: '#e0e0e0',
  borderDark: '#333333',
  
  overlay: 'rgba(0, 0, 0, 0.5)',
  blur: 'rgba(255, 255, 255, 0.1)',
  
  watermark: '#000000',
  watermarkDark: '#ffffff',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

// Localized strings
export const strings: LocalizedStrings = {
  az: {
    // General
    'app.title': 'DDA.az Təhlükəsiz PDF Oxuyucu',
    'common.loading': 'Yüklənir...',
    'common.error': 'Xəta',
    'common.ok': 'Tamam',
    'common.cancel': 'Ləğv et',
    'common.close': 'Bağla',
    'common.retry': 'Yenidən cəhd et',
    'common.exit': 'Çıxış',
    
    // PDF Reader
    'pdf.title': 'PDF Oxuyucu',
    'pdf.page': 'Səhifə',
    'pdf.of': '/',
    'pdf.totalPages': 'səhifə',
    'pdf.loading': 'PDF yüklənir...',
    'pdf.loadingProgress': 'Yüklənir: {progress}%',
    
    // Navigation
    'nav.previousPage': 'Əvvəlki səhifə',
    'nav.nextPage': 'Növbəti səhifə',
    'nav.firstPage': 'İlk səhifə',
    'nav.lastPage': 'Son səhifə',
    'nav.goToPage': 'Səhifəyə keç',
    'nav.jumpToPage': 'Səhifəyə keç',
    
    // Page Picker
    'pagePicker.title': 'Səhifəyə keç',
    'pagePicker.currentPage': 'Cari səhifə: {current} / {total}',
    'pagePicker.pageNumber': 'Səhifə nömrəsi:',
    'pagePicker.slider': 'Sürüşdürücü:',
    'pagePicker.quickJump': 'Sürətli keçid:',
    'pagePicker.beginning': 'Başlanğıc',
    'pagePicker.middle': 'Orta',
    'pagePicker.end': 'Son',
    'pagePicker.selectedPage': 'Seçilmiş səhifə:',
    'pagePicker.go': 'Keç',
    
    // Thumbnails
    'thumbnails.title': 'Səhifələr',
    'thumbnails.pages': '{current} / {total} səhifə',
    
    // Search
    'search.title': 'Axtarış',
    'search.placeholder': 'Mətnlərdə axtarış...',
    'search.searching': 'Axtarılır...',
    'search.noResults': '"{query}" üçün nəticə tapılmadı',
    'search.resultsFound': '{count} nəticə tapıldı',
    'search.emptyTitle': 'Mətn axtarışı',
    'search.emptyDescription': 'PDF-də axtarmaq istədiyiniz sözü və ya cümləni yazın',
    
    // Security
    'security.screenshotDetected': 'Ekran Görüntüsü Aşkarlandı',
    'security.recordingDetected': 'Ekran Yazısı Aşkarlandı',
    'security.sessionExpired': 'Sessiya Vaxtı Bitdi',
    'security.securityViolation': 'Təhlükəsizlik Pozuntusu',
    'security.contentProtected': 'Məzmun Qorunur',
    'security.screenshotMessage': 'Təhlükəsizlik səbəbiylə ekran görüntüsü çəkmək qadağandır. Sessiyanız ləğv edildi.',
    'security.recordingMessage': 'Təhlükəsizlik səbəbiylə ekran yazısı qadağandır. Sessiyanız ləğv edildi.',
    'security.sessionExpiredMessage': 'Oxuma müddətiniz bitdi. Yenidən daxil olmaq üçün kitabı yenidən açın.',
    'security.violationMessage': 'Təhlükəsizlik pozuntusu aşkarlandı. Oxuma dayandırıldı.',
    'security.protectedMessage': 'Bu məzmun müəllif hüquqları ilə qorunur.',
    'security.warning': '⚠️ Bu materiallar müəllif hüquqları ilə qorunur. Hər səhifədə şəxsi vatermark mövcuddur.',
    'security.rootDetected': 'Bu cihazda təhlükəsizlik riski aşkarlandı. Oxuma bloklandı.',
    'security.refresh': 'Yenilə',
    
    // Errors
    'error.downloadFailed': 'PDF yükləmə xətası baş verdi',
    'error.checksumFailed': 'Fayl korlanıb - yenidən yüklə',
    'error.sessionRevoked': 'Sessiya ləğv edildi',
    'error.fileNotFound': 'Fayl tapılmadı',
    'error.networkError': 'İnternet bağlantısı xətası',
    'error.unknownError': 'Naməlum xəta baş verdi',
    'error.offline': 'Offline - yenidən cəhd et',
    
    // Menu
    'menu.title': 'Menyu',
    'menu.goToPage': 'Səhifəyə keç',
    'menu.search': 'Axtarış',
    'menu.thumbnails': 'Səhifələr',
    'menu.readingRules': 'Oxu qaydaları',
    'menu.exit': 'Çıxış',
    
    // Zoom
    'zoom.zoomIn': 'Böyüt',
    'zoom.zoomOut': 'Kiçilt',
    'zoom.fitWidth': 'Enə sığdır',
    'zoom.fitHeight': 'Hündürlüyə sığdır',
    'zoom.fitPage': 'Səhifəyə sığdır',
    
    // Time
    'time.expired': 'Vaxt bitdi',
    'time.days': 'gün',
    'time.hours': 'saat',
    'time.minutes': 'dəqiqə',
    'time.timeLeft': 'Qalan vaxt: {time}',
  },
  en: {
    // General
    'app.title': 'DDA.az Secure PDF Reader',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.ok': 'OK',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.retry': 'Retry',
    'common.exit': 'Exit',
    
    // PDF Reader
    'pdf.title': 'PDF Reader',
    'pdf.page': 'Page',
    'pdf.of': 'of',
    'pdf.totalPages': 'pages',
    'pdf.loading': 'Loading PDF...',
    'pdf.loadingProgress': 'Loading: {progress}%',
    
    // Navigation
    'nav.previousPage': 'Previous page',
    'nav.nextPage': 'Next page',
    'nav.firstPage': 'First page',
    'nav.lastPage': 'Last page',
    'nav.goToPage': 'Go to page',
    'nav.jumpToPage': 'Jump to page',
    
    // Page Picker
    'pagePicker.title': 'Go to page',
    'pagePicker.currentPage': 'Current page: {current} / {total}',
    'pagePicker.pageNumber': 'Page number:',
    'pagePicker.slider': 'Slider:',
    'pagePicker.quickJump': 'Quick jump:',
    'pagePicker.beginning': 'Beginning',
    'pagePicker.middle': 'Middle',
    'pagePicker.end': 'End',
    'pagePicker.selectedPage': 'Selected page:',
    'pagePicker.go': 'Go',
    
    // Thumbnails
    'thumbnails.title': 'Pages',
    'thumbnails.pages': '{current} / {total} pages',
    
    // Search
    'search.title': 'Search',
    'search.placeholder': 'Search in text...',
    'search.searching': 'Searching...',
    'search.noResults': 'No results found for "{query}"',
    'search.resultsFound': '{count} results found',
    'search.emptyTitle': 'Text search',
    'search.emptyDescription': 'Enter a word or phrase to search in the PDF',
    
    // Security
    'security.screenshotDetected': 'Screenshot Detected',
    'security.recordingDetected': 'Screen Recording Detected',
    'security.sessionExpired': 'Session Expired',
    'security.securityViolation': 'Security Violation',
    'security.contentProtected': 'Content Protected',
    'security.screenshotMessage': 'Screenshots are prohibited for security reasons. Your session has been revoked.',
    'security.recordingMessage': 'Screen recording is prohibited for security reasons. Your session has been revoked.',
    'security.sessionExpiredMessage': 'Your reading time has expired. Please reopen the book to continue.',
    'security.violationMessage': 'Security violation detected. Reading has been stopped.',
    'security.protectedMessage': 'This content is protected by copyright.',
    'security.warning': '⚠️ This material is protected by copyright. Each page contains a personal watermark.',
    'security.rootDetected': 'Security risk detected on this device. Reading is blocked.',
    'security.refresh': 'Refresh',
    
    // Errors
    'error.downloadFailed': 'PDF download failed',
    'error.checksumFailed': 'File corrupted - please reload',
    'error.sessionRevoked': 'Session revoked',
    'error.fileNotFound': 'File not found',
    'error.networkError': 'Network connection error',
    'error.unknownError': 'Unknown error occurred',
    'error.offline': 'Offline - please retry',
    
    // Menu
    'menu.title': 'Menu',
    'menu.goToPage': 'Go to page',
    'menu.search': 'Search',
    'menu.thumbnails': 'Pages',
    'menu.readingRules': 'Reading rules',
    'menu.exit': 'Exit',
    
    // Zoom
    'zoom.zoomIn': 'Zoom in',
    'zoom.zoomOut': 'Zoom out',
    'zoom.fitWidth': 'Fit width',
    'zoom.fitHeight': 'Fit height',
    'zoom.fitPage': 'Fit page',
    
    // Time
    'time.expired': 'Expired',
    'time.days': 'days',
    'time.hours': 'hours',
    'time.minutes': 'minutes',
    'time.timeLeft': 'Time left: {time}',
  },
};

// Localization utility
export const t = (key: string, params?: Record<string, string | number>, language: Language = 'az'): string => {
  let text = strings[language][key] || strings.az[key] || key;
  
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, String(value));
    });
  }
  
  return text;
};