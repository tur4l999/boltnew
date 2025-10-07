export interface SecuredPdfResponse {
  url: string;
  checksumSha256: string;
  expiresAt: string;
  totalPages: number;
}

export interface PdfIssueRequest {
  bookId: string;
  userId: string;
  deviceId: string;
}

export interface PdfRevokeRequest {
  bookId: string;
  userId: string;
  deviceId: string;
  reason: string;
}

export interface SearchResult {
  page: number;
  snippet: string;
}

export interface SearchRequest {
  bookId: string;
  q: string;
  from?: number;
  to?: number;
}

export interface WatermarkProps {
  userName: string;
  phone: string;
  userId: string;
  deviceId: string;
  timestamp: string;
  page: number;
  totalPages: number;
  opacity?: number;
}

export interface PdfState {
  // PDF Info
  bookId: string | null;
  totalPages: number;
  currentPage: number;
  
  // View State
  zoom: number;
  isLoading: boolean;
  error: string | null;
  
  // Security State
  isSecured: boolean;
  expiresAt: string | null;
  checksumSha256: string | null;
  filePath: string | null;
  
  // UI State
  showThumbnails: boolean;
  showPagePicker: boolean;
  showSearch: boolean;
  searchResults: SearchResult[];
  searchQuery: string;
  
  // Security Events
  screenshotDetected: boolean;
  sessionRevoked: boolean;
  isBlurred: boolean;
}

export interface SecurityEvent {
  type: 'screenshot' | 'recording' | 'root_detected' | 'integrity_failed' | 'session_expired';
  timestamp: string;
  details?: any;
}

export type Language = 'az' | 'en';

export interface LocalizedStrings {
  az: Record<string, string>;
  en: Record<string, string>;
}