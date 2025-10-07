import { create } from 'zustand';
import { PdfState, SearchResult, SecurityEvent } from './types';

interface PdfActions {
  // PDF Management
  setPdfInfo: (bookId: string, totalPages: number, filePath: string, checksumSha256: string, expiresAt: string) => void;
  setCurrentPage: (page: number) => void;
  setZoom: (zoom: number) => void;
  
  // Loading & Error States
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // UI State
  toggleThumbnails: () => void;
  togglePagePicker: () => void;
  toggleSearch: () => void;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: SearchResult[]) => void;
  
  // Security
  setSecured: (secured: boolean) => void;
  setBlurred: (blurred: boolean) => void;
  setScreenshotDetected: (detected: boolean) => void;
  setSessionRevoked: (revoked: boolean) => void;
  logSecurityEvent: (event: SecurityEvent) => void;
  
  // Session Management
  checkSessionExpiry: () => boolean;
  clearSession: () => void;
  
  // Reset
  reset: () => void;
}

const initialState: PdfState = {
  bookId: null,
  totalPages: 0,
  currentPage: 1,
  zoom: 1.0,
  isLoading: false,
  error: null,
  isSecured: false,
  expiresAt: null,
  checksumSha256: null,
  filePath: null,
  showThumbnails: false,
  showPagePicker: false,
  showSearch: false,
  searchResults: [],
  searchQuery: '',
  screenshotDetected: false,
  sessionRevoked: false,
  isBlurred: false,
};

export const usePdfStore = create<PdfState & PdfActions>((set, get) => ({
  ...initialState,

  setPdfInfo: (bookId, totalPages, filePath, checksumSha256, expiresAt) => 
    set({ 
      bookId, 
      totalPages, 
      filePath, 
      checksumSha256, 
      expiresAt, 
      isSecured: true,
      currentPage: 1,
      error: null 
    }),

  setCurrentPage: (page) => {
    const { totalPages } = get();
    if (page >= 1 && page <= totalPages) {
      set({ currentPage: page });
    }
  },

  setZoom: (zoom) => {
    const clampedZoom = Math.max(0.5, Math.min(3.0, zoom));
    set({ zoom: clampedZoom });
  },

  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error, isLoading: false }),

  toggleThumbnails: () => set((state) => ({ 
    showThumbnails: !state.showThumbnails,
    showPagePicker: false,
    showSearch: false 
  })),

  togglePagePicker: () => set((state) => ({ 
    showPagePicker: !state.showPagePicker,
    showThumbnails: false,
    showSearch: false 
  })),

  toggleSearch: () => set((state) => ({ 
    showSearch: !state.showSearch,
    showThumbnails: false,
    showPagePicker: false 
  })),

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  
  setSearchResults: (searchResults) => set({ searchResults }),

  setSecured: (isSecured) => set({ isSecured }),
  
  setBlurred: (isBlurred) => set({ isBlurred }),
  
  setScreenshotDetected: (screenshotDetected) => set({ screenshotDetected }),
  
  setSessionRevoked: (sessionRevoked) => set({ sessionRevoked }),

  logSecurityEvent: (event: SecurityEvent) => {
    console.warn('Security Event:', event);
    // In production, send to analytics/monitoring service
  },

  checkSessionExpiry: () => {
    const { expiresAt } = get();
    if (!expiresAt) return false;
    
    const now = new Date();
    const expiry = new Date(expiresAt);
    const isExpired = now >= expiry;
    
    if (isExpired) {
      set({ 
        sessionRevoked: true, 
        error: 'Sessiya vaxtı bitdi - yenidən daxil olun',
        isBlurred: true 
      });
    }
    
    return isExpired;
  },

  clearSession: () => set({
    bookId: null,
    filePath: null,
    checksumSha256: null,
    expiresAt: null,
    isSecured: false,
    sessionRevoked: false,
    screenshotDetected: false,
    isBlurred: false,
    currentPage: 1,
    searchResults: [],
    searchQuery: '',
    error: null,
  }),

  reset: () => set(initialState),
}));

// Auto-check session expiry every minute
setInterval(() => {
  const store = usePdfStore.getState();
  if (store.isSecured && !store.sessionRevoked) {
    store.checkSessionExpiry();
  }
}, 60000);