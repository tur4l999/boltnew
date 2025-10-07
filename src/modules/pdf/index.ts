/**
 * Secure PDF Reader Module
 * Main exports for easy integration
 */

// Main component
export { PdfReader } from './PdfReader';

// Components
export { Watermark, AdaptiveWatermark } from './Watermark';
export { BlurOverlay } from './components/BlurOverlay';
export { PagePicker } from './components/PagePicker';
export { SearchBar } from './components/SearchBar';
export { PageThumbs } from './components/PageThumbs';

// Store & hooks
export { usePdfStore, usePdfSession, usePdfPage, usePdfZoom, usePdfLoading, usePdfError, usePdfSearch, usePdfSecurity } from './usePdfStore';

// API functions
export { issueSecuredPdf, revokeSession, searchInPdf, renewSession, logPdfEvent } from './api';

// Security guards
export {
  startScreenshotMonitoring,
  preventScreenCapture,
  allowScreenCapture,
  addScreenshotListener,
  setupBackgroundProtection,
  checkJailbreak,
  clearSecureCache,
  logSecurityEvent,
} from './guards';

// Utilities
export {
  sha256,
  verifyFileChecksum,
  isSessionExpired,
  getTimeRemaining,
  formatTimeRemaining,
  debounce,
  getDeviceId,
  downloadFile,
  formatFileSize,
  clamp,
  createWatermarkText,
} from './utils';

// i18n
export { pdfI18n, t } from './i18n';
export type { Language } from './i18n';

// Types
export type {
  PdfSecurityConfig,
  PdfIssuedData,
  PdfSession,
  SearchResult,
  WatermarkConfig,
  PdfState,
  PdfAction,
  RevokeSessionRequest,
  ApiResponse,
  PageThumbnail,
} from './types';