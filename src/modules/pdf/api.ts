import axios from 'axios';
import { 
  SecuredPdfResponse, 
  PdfIssueRequest, 
  PdfRevokeRequest, 
  SearchResult, 
  SearchRequest 
} from './types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.dda.az';

// Mock API for development
const USE_MOCK_API = process.env.EXPO_PUBLIC_USE_MOCK_API === 'true';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data for development
const mockPdfResponse: SecuredPdfResponse = {
  url: 'https://example.com/secured-pdf-sample.pdf',
  checksumSha256: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz',
  expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
  totalPages: 240,
};

const mockSearchResults: SearchResult[] = [
  { page: 15, snippet: 'Bu mətn nümunəsi axtarış nəticəsidir...' },
  { page: 42, snippet: 'Başqa bir axtarış nəticəsi burada...' },
  { page: 78, snippet: 'Üçüncü axtarış nəticəsi məzmunu...' },
];

export const issueSecuredPdf = async (request: PdfIssueRequest): Promise<SecuredPdfResponse> => {
  if (USE_MOCK_API) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockPdfResponse;
  }

  try {
    const response = await api.post<SecuredPdfResponse>('/api/pdf/issue', request);
    return response.data;
  } catch (error) {
    console.error('Failed to issue secured PDF:', error);
    throw new Error('PDF yükləmə xətası baş verdi');
  }
};

export const revokeSession = async (request: PdfRevokeRequest): Promise<{ ok: boolean }> => {
  if (USE_MOCK_API) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ok: true };
  }

  try {
    const response = await api.post<{ ok: boolean }>('/api/pdf/revoke', request);
    return response.data;
  } catch (error) {
    console.error('Failed to revoke session:', error);
    throw new Error('Sessiya ləğv edilə bilmədi');
  }
};

export const searchInPdf = async (request: SearchRequest): Promise<SearchResult[]> => {
  if (USE_MOCK_API) {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockSearchResults.filter(result => 
      result.snippet.toLowerCase().includes(request.q.toLowerCase())
    );
  }

  try {
    const response = await api.get<SearchResult[]>('/api/pdf/search', {
      params: request,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to search in PDF:', error);
    throw new Error('Axtarış xətası baş verdi');
  }
};

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = process.env.EXPO_PUBLIC_API_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access - session expired');
    } else if (error.response?.status === 403) {
      // Handle forbidden access
      console.error('Forbidden access - insufficient permissions');
    }
    return Promise.reject(error);
  }
);