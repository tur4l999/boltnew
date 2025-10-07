/**
 * Type definitions for Secure PDF Reader Module
 * DDA.az - Secure Book Reading System
 */

export interface PdfSecurityConfig {
  bookId: string;
  userId: string;
  deviceId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
}

export interface PdfIssuedData {
  url: string;
  checksumSha256: string;
  expiresAt: string; // ISO timestamp
  totalPages: number;
  bookTitle: string;
  bookId: string;
}

export interface PdfSession {
  bookId: string;
  userId: string;
  deviceId: string;
  issuedAt: string;
  expiresAt: string;
  url: string;
  checksum: string;
  totalPages: number;
  bookTitle: string;
  lastPage?: number;
  zoomLevel?: number;
}

export interface SearchResult {
  page: number;
  snippet: string;
  matchCount: number;
}

export interface WatermarkConfig {
  userName: string;
  userPhone: string;
  userId: string;
  deviceId: string;
  currentPage: number;
  totalPages: number;
  opacity?: number;
  angle?: number;
  fontSize?: number;
}

export interface PdfState {
  // Session
  session: PdfSession | null;
  
  // Reading state
  currentPage: number;
  totalPages: number;
  zoomLevel: number;
  
  // Loading & errors
  isLoading: boolean;
  error: string | null;
  
  // File integrity
  fileChecksum: string | null;
  isChecksumValid: boolean;
  
  // Search
  searchQuery: string;
  searchResults: SearchResult[];
  isSearching: boolean;
  
  // Security status
  screenshotDetected: boolean;
  isJailbroken: boolean;
  sessionRevoked: boolean;
  
  // UI state
  showPagePicker: boolean;
  showThumbnails: boolean;
  showBlur: boolean;
}

export type PdfAction =
  | { type: 'SET_SESSION'; payload: PdfSession }
  | { type: 'CLEAR_SESSION' }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CHECKSUM'; payload: { checksum: string; isValid: boolean } }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SEARCH_RESULTS'; payload: SearchResult[] }
  | { type: 'SET_SEARCHING'; payload: boolean }
  | { type: 'SCREENSHOT_DETECTED' }
  | { type: 'REVOKE_SESSION'; payload: string }
  | { type: 'TOGGLE_PAGE_PICKER' }
  | { type: 'TOGGLE_THUMBNAILS' }
  | { type: 'SET_BLUR'; payload: boolean }
  | { type: 'SET_JAILBROKEN'; payload: boolean };

export interface RevokeSessionRequest {
  bookId: string;
  userId: string;
  deviceId: string;
  reason: 'capture' | 'expiry' | 'integrity' | 'user_request' | 'jailbreak';
  metadata?: Record<string, any>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PageThumbnail {
  pageNumber: number;
  thumbnailUrl?: string;
  isLoaded: boolean;
}