/**
 * Localization strings for Secure PDF Reader
 * Azerbaijani (AZ) and English (EN)
 */

export type Language = 'az' | 'en';

export const pdfI18n = {
  az: {
    // Header & Navigation
    page: 'Səhifə',
    of: '/',
    search: 'Axtarış',
    menu: 'Menyu',
    close: 'Bağla',
    
    // Actions
    jumpToPage: 'Səhifəyə keç',
    readingRules: 'Oxu qaydaları',
    exit: 'Çıxış',
    refresh: 'Yenilə',
    retry: 'Yenidən cəhd',
    
    // Page Navigation
    previousPage: 'Əvvəlki səhifə',
    nextPage: 'Növbəti səhifə',
    firstPage: 'İlk səhifə',
    lastPage: 'Son səhifə',
    goToPage: 'Səhifəyə get',
    enterPageNumber: 'Səhifə nömrəsini daxil edin',
    
    // Zoom
    zoomIn: 'Yaxınlaşdır',
    zoomOut: 'Uzaqlaşdır',
    fitWidth: 'Enə sığdır',
    fitHeight: 'Hündürlüyə sığdır',
    resetZoom: 'Sıfırla',
    
    // Search
    searchInBook: 'Kitabda axtar',
    searchResults: 'Axtarış nəticələri',
    noResults: 'Nəticə tapılmadı',
    searching: 'Axtarılır...',
    foundResults: '{count} nəticə tapıldı',
    
    // Loading states
    loading: 'Yüklənir...',
    loadingBook: 'Kitab yüklənir...',
    preparingBook: 'Kitab hazırlanır...',
    verifying: 'Yoxlanılır...',
    
    // Errors
    error: 'Xəta',
    errorOccurred: 'Xəta baş verdi',
    offlineError: 'İnternet əlaqəsi yoxdur – yenidən cəhd edin',
    checksumError: 'Fayl korlanıb – yenidən yükləyin',
    expiryError: 'Sessiya bitdi – yeniləyin',
    integrityError: 'Fayl bütövlüyü pozulub',
    loadError: 'Kitab yüklənə bilmədi',
    sessionError: 'Sessiya xətası baş verdi',
    jailbreakError: 'Bu cihazda oxu mümkün deyil',
    
    // Security warnings
    securityWarning: 'Təhlükəsizlik xəbərdarlığı',
    screenshotWarning: 'Ekran şəkli və ya yazı aşkarlandı',
    screenshotMessage: 'Bu material müəllif hüquqları ilə qorunur. Ekran şəkli çəkmək qadağandır. Sessiyanız ləğv edildi.',
    jailbreakWarning: 'Cihaz təhlükəsizliyi pozulub',
    jailbreakMessage: 'Bu kitab təhlükəsizlik səbəbindən root/jailbreak edilmiş cihazlarda oxuna bilməz.',
    sessionRevokedWarning: 'Sessiya ləğv edildi',
    sessionRevokedMessage: 'Oxu sessiyası təhlükəsizlik səbəblərinə görə ləğv edildi.',
    
    // Copyright notice
    copyrightTitle: 'Müəllif hüquqları',
    copyrightMessage: 'Bu materiallar müəllif hüquqları ilə qorunur. Hər səhifədə şəxsi vatermark yerləşdirilib. İcazəsiz paylaşmaq, çap etmək və ya kənar tətbiqlərdə açmaq qadağandır.',
    understood: 'Başa düşdüm',
    
    // Session expiry
    sessionExpiring: 'Sessiya bitmək üzrədir',
    sessionExpiresIn: '{time} sonra bitəcək',
    sessionExpired: 'Sessiya bitdi',
    renewSession: 'Sessiyanı yenilə',
    
    // Watermark
    watermarkNote: 'Bu səhifə şəxsi identifikasiya vatermarkı ilə qorunan',
    
    // Background protection
    backgroundWarning: 'Məlumat təhlükəsizliyi',
    returnToApp: 'Tətbiqə qayıt',
    
    // Menu items
    thumbnails: 'Miniatürlər',
    showThumbnails: 'Miniatürləri göstər',
    hideThumbnails: 'Miniatürləri gizlət',
    
    // Page picker
    selectPage: 'Səhifə seç',
    pageNumber: 'Səhifə nömrəsi',
    invalidPage: 'Yanlış səhifə nömrəsi',
  },
  
  en: {
    // Header & Navigation
    page: 'Page',
    of: 'of',
    search: 'Search',
    menu: 'Menu',
    close: 'Close',
    
    // Actions
    jumpToPage: 'Jump to Page',
    readingRules: 'Reading Rules',
    exit: 'Exit',
    refresh: 'Refresh',
    retry: 'Retry',
    
    // Page Navigation
    previousPage: 'Previous Page',
    nextPage: 'Next Page',
    firstPage: 'First Page',
    lastPage: 'Last Page',
    goToPage: 'Go to Page',
    enterPageNumber: 'Enter page number',
    
    // Zoom
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    fitWidth: 'Fit Width',
    fitHeight: 'Fit Height',
    resetZoom: 'Reset Zoom',
    
    // Search
    searchInBook: 'Search in Book',
    searchResults: 'Search Results',
    noResults: 'No Results Found',
    searching: 'Searching...',
    foundResults: 'Found {count} results',
    
    // Loading states
    loading: 'Loading...',
    loadingBook: 'Loading Book...',
    preparingBook: 'Preparing Book...',
    verifying: 'Verifying...',
    
    // Errors
    error: 'Error',
    errorOccurred: 'An Error Occurred',
    offlineError: 'No internet connection – please retry',
    checksumError: 'File corrupted – please reload',
    expiryError: 'Session expired – please refresh',
    integrityError: 'File integrity compromised',
    loadError: 'Failed to load book',
    sessionError: 'Session error occurred',
    jailbreakError: 'Reading not available on this device',
    
    // Security warnings
    securityWarning: 'Security Warning',
    screenshotWarning: 'Screenshot or Recording Detected',
    screenshotMessage: 'This material is copyright protected. Screenshots are prohibited. Your session has been revoked.',
    jailbreakWarning: 'Device Security Compromised',
    jailbreakMessage: 'This book cannot be read on rooted/jailbroken devices for security reasons.',
    sessionRevokedWarning: 'Session Revoked',
    sessionRevokedMessage: 'Your reading session has been revoked for security reasons.',
    
    // Copyright notice
    copyrightTitle: 'Copyright Notice',
    copyrightMessage: 'These materials are protected by copyright. Each page contains personal watermark. Unauthorized sharing, printing, or opening in external apps is prohibited.',
    understood: 'Understood',
    
    // Session expiry
    sessionExpiring: 'Session Expiring',
    sessionExpiresIn: 'Expires in {time}',
    sessionExpired: 'Session Expired',
    renewSession: 'Renew Session',
    
    // Watermark
    watermarkNote: 'This page is protected with personal identification watermark',
    
    // Background protection
    backgroundWarning: 'Data Security',
    returnToApp: 'Return to App',
    
    // Menu items
    thumbnails: 'Thumbnails',
    showThumbnails: 'Show Thumbnails',
    hideThumbnails: 'Hide Thumbnails',
    
    // Page picker
    selectPage: 'Select Page',
    pageNumber: 'Page Number',
    invalidPage: 'Invalid page number',
  },
};

export const t = (key: keyof typeof pdfI18n.az, lang: Language = 'az', params?: Record<string, string | number>): string => {
  let text = pdfI18n[lang][key] || pdfI18n.az[key];
  
  // Replace placeholders like {count}, {time}, etc.
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      text = text.replace(`{${key}}`, String(value));
    });
  }
  
  return text;
};