/**
 * Zustand Store for PDF Reader State Management
 * Manages session, reading progress, UI state, and security
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PdfState, PdfSession, SearchResult } from './types';

interface PdfStore extends PdfState {
  // Session management
  setSession: (session: PdfSession) => void;
  clearSession: () => void;
  updateSessionExpiry: (expiresAt: string) => void;
  
  // Reading state
  setPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setZoom: (zoom: number) => void;
  
  // Loading & errors
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // File integrity
  setChecksum: (checksum: string, isValid: boolean) => void;
  
  // Search
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: SearchResult[]) => void;
  setSearching: (searching: boolean) => void;
  clearSearch: () => void;
  
  // Security
  markScreenshotDetected: () => void;
  setJailbroken: (isJailbroken: boolean) => void;
  revokeSession: (reason: string) => void;
  
  // UI state
  togglePagePicker: () => void;
  toggleThumbnails: () => void;
  setBlur: (blur: boolean) => void;
  
  // Persistence
  saveReadingProgress: () => void;
  restoreReadingProgress: (bookId: string) => { page: number; zoom: number } | null;
}

// Initial state
const initialState: PdfState = {
  session: null,
  currentPage: 1,
  totalPages: 0,
  zoomLevel: 1.0,
  isLoading: false,
  error: null,
  fileChecksum: null,
  isChecksumValid: false,
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  screenshotDetected: false,
  isJailbroken: false,
  sessionRevoked: false,
  showPagePicker: false,
  showThumbnails: false,
  showBlur: false,
};

/**
 * Main PDF Store
 */
export const usePdfStore = create<PdfStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Session management
      setSession: (session) =>
        set({
          session,
          totalPages: session.totalPages,
          currentPage: session.lastPage || 1,
          zoomLevel: session.zoomLevel || 1.0,
          error: null,
          sessionRevoked: false,
        }),
      
      clearSession: () =>
        set({
          session: null,
          currentPage: 1,
          totalPages: 0,
          zoomLevel: 1.0,
          fileChecksum: null,
          isChecksumValid: false,
          sessionRevoked: false,
        }),
      
      updateSessionExpiry: (expiresAt) =>
        set((state) => ({
          session: state.session ? { ...state.session, expiresAt } : null,
        })),
      
      // Reading state
      setPage: (page) => {
        const { totalPages } = get();
        const validPage = Math.max(1, Math.min(page, totalPages));
        set({ currentPage: validPage, showPagePicker: false });
        
        // Save progress
        get().saveReadingProgress();
      },
      
      nextPage: () => {
        const { currentPage, totalPages } = get();
        if (currentPage < totalPages) {
          get().setPage(currentPage + 1);
        }
      },
      
      previousPage: () => {
        const { currentPage } = get();
        if (currentPage > 1) {
          get().setPage(currentPage - 1);
        }
      },
      
      setZoom: (zoom) => {
        const validZoom = Math.max(0.5, Math.min(zoom, 3.0));
        set({ zoomLevel: validZoom });
        
        // Save progress
        get().saveReadingProgress();
      },
      
      // Loading & errors
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      // File integrity
      setChecksum: (fileChecksum, isChecksumValid) =>
        set({ fileChecksum, isChecksumValid }),
      
      // Search
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      
      setSearchResults: (searchResults) => set({ searchResults }),
      
      setSearching: (isSearching) => set({ isSearching }),
      
      clearSearch: () =>
        set({
          searchQuery: '',
          searchResults: [],
          isSearching: false,
        }),
      
      // Security
      markScreenshotDetected: () =>
        set({
          screenshotDetected: true,
          showBlur: true,
        }),
      
      setJailbroken: (isJailbroken) => set({ isJailbroken }),
      
      revokeSession: (reason) => {
        console.warn('[PDF Security] Session revoked:', reason);
        set({
          sessionRevoked: true,
          showBlur: true,
          error: `Session revoked: ${reason}`,
        });
        
        // Clear session after delay
        setTimeout(() => {
          get().clearSession();
        }, 2000);
      },
      
      // UI state
      togglePagePicker: () =>
        set((state) => ({
          showPagePicker: !state.showPagePicker,
        })),
      
      toggleThumbnails: () =>
        set((state) => ({
          showThumbnails: !state.showThumbnails,
        })),
      
      setBlur: (showBlur) => set({ showBlur }),
      
      // Persistence
      saveReadingProgress: () => {
        const { session, currentPage, zoomLevel } = get();
        if (!session) return;
        
        const progress = {
          bookId: session.bookId,
          page: currentPage,
          zoom: zoomLevel,
          timestamp: new Date().toISOString(),
        };
        
        localStorage.setItem(
          `pdf_progress_${session.bookId}`,
          JSON.stringify(progress)
        );
      },
      
      restoreReadingProgress: (bookId) => {
        try {
          const stored = localStorage.getItem(`pdf_progress_${bookId}`);
          if (!stored) return null;
          
          const progress = JSON.parse(stored);
          return {
            page: progress.page || 1,
            zoom: progress.zoom || 1.0,
          };
        } catch {
          return null;
        }
      },
    }),
    {
      name: 'pdf-reader-storage',
      partialize: (state) => ({
        // Only persist necessary state
        currentPage: state.currentPage,
        zoomLevel: state.zoomLevel,
      }),
    }
  )
);

/**
 * Selectors for optimized re-renders
 */
export const usePdfSession = () => usePdfStore((state) => state.session);
export const usePdfPage = () => usePdfStore((state) => state.currentPage);
export const usePdfZoom = () => usePdfStore((state) => state.zoomLevel);
export const usePdfLoading = () => usePdfStore((state) => state.isLoading);
export const usePdfError = () => usePdfStore((state) => state.error);
export const usePdfSearch = () => usePdfStore((state) => ({
  query: state.searchQuery,
  results: state.searchResults,
  isSearching: state.isSearching,
}));
export const usePdfSecurity = () => usePdfStore((state) => ({
  screenshotDetected: state.screenshotDetected,
  isJailbroken: state.isJailbroken,
  sessionRevoked: state.sessionRevoked,
  showBlur: state.showBlur,
}));