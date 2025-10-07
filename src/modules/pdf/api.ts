/**
 * API Layer for Secure PDF Reader
 * Handles PDF issuance, session management, and search
 */

import type {
  PdfSecurityConfig,
  PdfIssuedData,
  RevokeSessionRequest,
  SearchResult,
  ApiResponse,
} from './types';

// Configuration
const API_BASE_URL = import.meta.env.VITE_PDF_API_URL || '/api';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_PDF_API !== 'false';

/**
 * Mock data for development
 */
const MOCK_BOOKS = {
  'book-01': {
    title: 'Sürücülük Nəzəriyyəsi - Tam Kurs',
    totalPages: 240,
    pdfUrl: '/sample-book-1.pdf', // Replace with actual PDF
  },
  'book-02': {
    title: 'Yol Hərəkəti Qaydaları - 2024',
    totalPages: 180,
    pdfUrl: '/sample-book-2.pdf', // Replace with actual PDF
  },
};

/**
 * Generate mock signed URL (expires in 30 minutes)
 */
function generateMockSignedUrl(bookId: string): string {
  const book = MOCK_BOOKS[bookId as keyof typeof MOCK_BOOKS];
  if (!book) return '';
  
  const expiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes
  const signature = btoa(`${bookId}:${expiresAt}`);
  
  return `${book.pdfUrl}?signature=${signature}&expires=${expiresAt}`;
}

/**
 * Generate mock checksum for file
 */
async function generateMockChecksum(data: string): Promise<string> {
  // Simple mock checksum - in production this comes from server
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Issue a secured PDF with signed URL and watermarking
 * POST /api/pdf/issue
 */
export async function issueSecuredPdf(
  config: PdfSecurityConfig
): Promise<ApiResponse<PdfIssuedData>> {
  if (USE_MOCK_API) {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(async () => {
        const book = MOCK_BOOKS[config.bookId as keyof typeof MOCK_BOOKS];
        
        if (!book) {
          resolve({
            success: false,
            error: 'Book not found',
          });
          return;
        }
        
        const url = generateMockSignedUrl(config.bookId);
        const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 min
        const checksumSha256 = await generateMockChecksum(
          `${config.bookId}:${config.userId}:${config.deviceId}`
        );
        
        resolve({
          success: true,
          data: {
            url,
            checksumSha256,
            expiresAt,
            totalPages: book.totalPages,
            bookTitle: book.title,
            bookId: config.bookId,
          },
        });
      }, 1000); // Simulate network delay
    });
  }
  
  // Real API implementation
  try {
    const response = await fetch(`${API_BASE_URL}/pdf/issue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers
        // 'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(config),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to issue PDF',
    };
  }
}

/**
 * Revoke a PDF session (on security violation)
 * POST /api/pdf/revoke
 */
export async function revokeSession(
  request: RevokeSessionRequest
): Promise<ApiResponse<{ ok: boolean }>> {
  if (USE_MOCK_API) {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('[Mock API] Session revoked:', request);
        
        resolve({
          success: true,
          data: { ok: true },
          message: 'Session revoked successfully',
        });
      }, 500);
    });
  }
  
  // Real API implementation
  try {
    const response = await fetch(`${API_BASE_URL}/pdf/revoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      success: true,
      data: { ok: true },
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to revoke session',
    };
  }
}

/**
 * Search within PDF
 * GET /api/pdf/search?bookId=&q=&from=&to=
 */
export async function searchInPdf(
  bookId: string,
  query: string,
  pageRange?: { from: number; to: number }
): Promise<ApiResponse<SearchResult[]>> {
  if (USE_MOCK_API) {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!query || query.length < 2) {
          resolve({
            success: true,
            data: [],
          });
          return;
        }
        
        // Mock search results
        const mockResults: SearchResult[] = [
          {
            page: 15,
            snippet: `...Yol hərəkəti iştirakçıları ${query} haqqında əsas məlumatlar...`,
            matchCount: 2,
          },
          {
            page: 42,
            snippet: `...${query} tələblərinə əməl edilməsi zəruridir...`,
            matchCount: 1,
          },
          {
            page: 78,
            snippet: `...Təhlükəsizlik qaydaları və ${query} prinsipləri...`,
            matchCount: 1,
          },
        ];
        
        // Filter by page range if provided
        let results = mockResults;
        if (pageRange) {
          results = results.filter(
            r => r.page >= pageRange.from && r.page <= pageRange.to
          );
        }
        
        resolve({
          success: true,
          data: results,
        });
      }, 800);
    });
  }
  
  // Real API implementation
  try {
    const params = new URLSearchParams({
      bookId,
      q: query,
      ...(pageRange ? { from: String(pageRange.from), to: String(pageRange.to) } : {}),
    });
    
    const response = await fetch(`${API_BASE_URL}/pdf/search?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      success: true,
      data: data.results || [],
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Search failed',
      data: [],
    };
  }
}

/**
 * Renew PDF session (extend expiry)
 * POST /api/pdf/renew
 */
export async function renewSession(
  bookId: string,
  userId: string,
  deviceId: string
): Promise<ApiResponse<PdfIssuedData>> {
  // Essentially same as issueSecuredPdf
  return issueSecuredPdf({
    bookId,
    userId,
    deviceId,
    userName: '', // Get from context/store
    userPhone: '',
    userEmail: '',
  });
}

/**
 * Log analytics event
 */
export async function logPdfEvent(
  bookId: string,
  event: 'open' | 'close' | 'page_view' | 'search' | 'security_violation',
  metadata?: Record<string, any>
): Promise<void> {
  if (USE_MOCK_API) {
    console.log('[Mock API] PDF Event:', { bookId, event, metadata });
    return;
  }
  
  try {
    await fetch(`${API_BASE_URL}/pdf/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId,
        event,
        timestamp: new Date().toISOString(),
        metadata,
      }),
    });
  } catch (error) {
    console.error('Failed to log PDF event:', error);
  }
}