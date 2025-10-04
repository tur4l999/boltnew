/**
 * API Service - Məktəb Mövzuları
 * Təhlükəsiz və peşəkar API inteqrasiyası
 */

export interface SchoolSubject {
  id: string; // UUID
  name: string; // Ad
  parent?: string | null; // Ana mövzu UUID (nullable)
  description?: string | null; // Təsvir (nullable)
  is_demo: boolean; // Demo - qeyri-tələbələr üçün
  is_passed?: string; // readonly
  children?: SchoolSubject[]; // recursive
  progress?: number; // Frontend üçün əlavə
}

export interface ApiError {
  message: string;
  status?: number;
  details?: unknown;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
}

/**
 * API Configuration
 * Environment variables üçün dəstək
 */
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  endpoints: {
    subjects: '/api/school-subjects',
  },
  timeout: 10000, // 10 saniyə
  headers: {
    'Content-Type': 'application/json',
  }
};

/**
 * Get authentication token
 * LocalStorage və ya session-dan token alır
 */
function getAuthToken(): string | null {
  try {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  } catch (error) {
    console.error('Token əldə edilə bilmədi:', error);
    return null;
  }
}

/**
 * Create headers with authentication
 */
function createHeaders(): HeadersInit {
  const headers: HeadersInit = { ...API_CONFIG.headers };
  const token = getAuthToken();
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

/**
 * Fetch with timeout
 * Timeout dəstəyi ilə fetch funksiyası
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = API_CONFIG.timeout
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Sorğu vaxtı keçdi. Zəhmət olmasa yenidən cəhd edin.');
    }
    throw error;
  }
}

/**
 * Handle API errors
 * Səhvləri düzgün işləyir və istifadəçiyə anlaşılan mesaj qaytarır
 */
export function handleApiError(error: unknown): ApiError {
  if (error instanceof Error) {
    // Network xətası
    if (error.message.includes('Failed to fetch')) {
      return {
        message: 'İnternet bağlantısı yoxdur. Zəhmət olmasa bağlantınızı yoxlayın.',
        details: error.message,
      };
    }
    
    // Timeout xətası
    if (error.message.includes('vaxtı keçdi')) {
      return {
        message: error.message,
        details: 'Timeout error',
      };
    }

    return {
      message: 'Gözlənilməz xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.',
      details: error.message,
    };
  }

  return {
    message: 'Naməlum xəta',
    details: error,
  };
}

/**
 * Fetch School Subjects from API
 * Məktəb mövzularını API-dan çəkir
 * 
 * @returns Promise<SchoolSubject[]>
 */
export async function fetchSchoolSubjects(): Promise<SchoolSubject[]> {
  try {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.subjects}`;
    
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: createHeaders(),
    });

    // HTTP status yoxlama
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('İcazə rədd edildi. Zəhmət olmasa yenidən giriş edin.');
      }
      if (response.status === 403) {
        throw new Error('Bu əməliyyat üçün icazəniz yoxdur.');
      }
      if (response.status === 404) {
        throw new Error('Mövzular tapılmadı.');
      }
      if (response.status >= 500) {
        throw new Error('Server xətası. Zəhmət olmasa daha sonra yenidən cəhd edin.');
      }
      
      throw new Error(`HTTP xətası: ${response.status}`);
    }

    const data = await response.json();
    
    // Data validasiya
    if (!Array.isArray(data)) {
      throw new Error('Yanlış data formatı alındı.');
    }

    // Data transformasiya - progress əlavə edirik
    const subjects: SchoolSubject[] = data.map((subject: Record<string, unknown>) => ({
      id: subject.id || '',
      name: subject.name || 'Adsız mövzu',
      parent: subject.parent || null,
      description: subject.description || null,
      is_demo: Boolean(subject.is_demo),
      is_passed: subject.is_passed || '',
      children: subject.children || [],
      progress: calculateProgress(subject),
    }));

    return subjects;
  } catch (error) {
    console.error('API xətası:', error);
    throw error;
  }
}

/**
 * Calculate progress for a subject
 * Mövzunun proqresini hesablayır
 */
function calculateProgress(subject: Record<string, unknown>): number {
  // Əgər is_passed varsa və "true" göstərirsə 100% qaytarırıq
  if (subject.is_passed === 'true' || subject.is_passed === true) {
    return 100;
  }
  
  // Əgər children varsa, onların proqresinin ortasını alırıq
  if (subject.children && Array.isArray(subject.children) && subject.children.length > 0) {
    const childrenProgress = subject.children.map((child: Record<string, unknown>) => calculateProgress(child));
    const avgProgress = childrenProgress.reduce((sum: number, p: number) => sum + p, 0) / childrenProgress.length;
    return Math.round(avgProgress);
  }
  
  // LocalStorage-dan proqres yoxlayırıq (istifadəçi əvvəllər təlim keçibsə)
  try {
    const savedProgress = localStorage.getItem(`subject_progress_${subject.id}`);
    if (savedProgress) {
      const progress = parseInt(savedProgress, 10);
      if (!isNaN(progress) && progress >= 0 && progress <= 100) {
        return progress;
      }
    }
  } catch (error) {
    console.error('Progress oxunmadı:', error);
  }
  
  // Default 0
  return 0;
}

/**
 * Save subject progress to localStorage
 * Mövzu proqresini saxlayır
 */
export function saveSubjectProgress(subjectId: string, progress: number): void {
  try {
    if (progress >= 0 && progress <= 100) {
      localStorage.setItem(`subject_progress_${subjectId}`, progress.toString());
    }
  } catch (error) {
    console.error('Progress saxlanmadı:', error);
  }
}

/**
 * Build hierarchical structure from flat list
 * Flat list-dən hierarxik struktur qurur
 */
export function buildSubjectHierarchy(subjects: SchoolSubject[]): SchoolSubject[] {
  const subjectMap = new Map<string, SchoolSubject>();
  const rootSubjects: SchoolSubject[] = [];

  // Əvvəlcə bütün mövzuları map-ə əlavə edirik
  subjects.forEach(subject => {
    subjectMap.set(subject.id, { ...subject, children: [] });
  });

  // Parent-child əlaqələrini qururuq
  subjects.forEach(subject => {
    const currentSubject = subjectMap.get(subject.id);
    if (!currentSubject) return;

    if (subject.parent) {
      const parentSubject = subjectMap.get(subject.parent);
      if (parentSubject) {
        if (!parentSubject.children) {
          parentSubject.children = [];
        }
        parentSubject.children.push(currentSubject);
      } else {
        // Parent tapılmadısa, root olaraq əlavə edirik
        rootSubjects.push(currentSubject);
      }
    } else {
      // Parent yoxdursa, root-dur
      rootSubjects.push(currentSubject);
    }
  });

  return rootSubjects;
}

/**
 * Flatten hierarchical structure
 * Hierarxik strukturu flat list-ə çevirir
 */
export function flattenSubjectHierarchy(subjects: SchoolSubject[]): SchoolSubject[] {
  const result: SchoolSubject[] = [];
  
  function traverse(subject: SchoolSubject) {
    result.push(subject);
    if (subject.children && subject.children.length > 0) {
      subject.children.forEach(child => traverse(child));
    }
  }
  
  subjects.forEach(subject => traverse(subject));
  return result;
}

/**
 * Get subject by ID
 * ID-yə görə mövzu tapır
 */
export function getSubjectById(subjects: SchoolSubject[], id: string): SchoolSubject | null {
  const flatList = flattenSubjectHierarchy(subjects);
  return flatList.find(s => s.id === id) || null;
}

/**
 * Filter demo subjects
 * Demo mövzuları filtrələyir
 */
export function getDemoSubjects(subjects: SchoolSubject[]): SchoolSubject[] {
  return subjects.filter(s => s.is_demo);
}

/**
 * Cache management
 * Cache-i idarə edir
 */
const CACHE_KEY = 'school_subjects_cache';
const CACHE_TIMESTAMP_KEY = 'school_subjects_cache_timestamp';
const CACHE_DURATION = 1000 * 60 * 30; // 30 dəqiqə

export function getCachedSubjects(): SchoolSubject[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (!cached || !timestamp) return null;
    
    const now = Date.now();
    const cacheAge = now - parseInt(timestamp, 10);
    
    if (cacheAge > CACHE_DURATION) {
      // Cache köhnəlib
      clearSubjectsCache();
      return null;
    }
    
    return JSON.parse(cached);
  } catch (error) {
    console.error('Cache oxunmadı:', error);
    return null;
  }
}

export function setCachedSubjects(subjects: SchoolSubject[]): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(subjects));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
  } catch (error) {
    console.error('Cache saxlanmadı:', error);
  }
}

export function clearSubjectsCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
  } catch (error) {
    console.error('Cache təmizlənmədi:', error);
  }
}
