/**
 * Utility functions for Secure PDF Reader
 * Hash verification, time calculations, debouncing, etc.
 */

/**
 * Compute SHA-256 hash of a string or ArrayBuffer
 * Web Crypto API implementation (for React Native use expo-crypto)
 */
export async function sha256(data: string | ArrayBuffer): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = typeof data === 'string' ? encoder.encode(data) : data;
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * Verify file integrity by comparing checksums
 */
export async function verifyFileChecksum(
  fileContent: ArrayBuffer,
  expectedChecksum: string
): Promise<boolean> {
  const actualChecksum = await sha256(fileContent);
  return actualChecksum.toLowerCase() === expectedChecksum.toLowerCase();
}

/**
 * Check if session has expired
 */
export function isSessionExpired(expiresAt: string): boolean {
  return new Date(expiresAt) <= new Date();
}

/**
 * Get time remaining until session expires
 */
export function getTimeRemaining(expiresAt: string): {
  total: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
} {
  const total = new Date(expiresAt).getTime() - Date.now();
  const isExpired = total <= 0;
  
  return {
    total,
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / 1000 / 60) % 60),
    seconds: Math.floor((total / 1000) % 60),
    isExpired,
  };
}

/**
 * Format time remaining as human-readable string
 */
export function formatTimeRemaining(expiresAt: string, lang: 'az' | 'en' = 'az'): string {
  const { hours, minutes, isExpired } = getTimeRemaining(expiresAt);
  
  if (isExpired) {
    return lang === 'az' ? 'Bitib' : 'Expired';
  }
  
  if (hours > 0) {
    return `${hours}${lang === 'az' ? 's' : 'h'} ${minutes}${lang === 'az' ? 'dəq' : 'min'}`;
  }
  
  return `${minutes}${lang === 'az' ? 'dəq' : 'min'}`;
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generate unique device ID (for web, use fingerprint; for RN use expo-device)
 */
export function generateDeviceId(): string {
  // Web implementation - create persistent ID from browser characteristics
  const nav = navigator;
  const screen = window.screen;
  
  const components = [
    nav.userAgent,
    nav.language,
    screen.colorDepth,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset(),
    !!window.sessionStorage,
    !!window.localStorage,
  ];
  
  const fingerprint = components.join('|||');
  
  // Simple hash (in production use crypto.subtle.digest)
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return `web_${Math.abs(hash).toString(16)}`;
}

/**
 * Get or create persistent device ID from localStorage
 */
export function getDeviceId(): string {
  const STORAGE_KEY = 'dda_device_id';
  
  let deviceId = localStorage.getItem(STORAGE_KEY);
  
  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem(STORAGE_KEY, deviceId);
  }
  
  return deviceId;
}

/**
 * Download file as ArrayBuffer with progress tracking
 */
export async function downloadFile(
  url: string,
  onProgress?: (progress: number) => void
): Promise<ArrayBuffer> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const contentLength = response.headers.get('content-length');
  const total = contentLength ? parseInt(contentLength, 10) : 0;
  
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('Response body is null');
  }
  
  const chunks: Uint8Array[] = [];
  let receivedLength = 0;
  
  while (true) {
    const { done, value } = await reader.read();
    
    if (done) break;
    
    chunks.push(value);
    receivedLength += value.length;
    
    if (onProgress && total > 0) {
      onProgress((receivedLength / total) * 100);
    }
  }
  
  // Concatenate chunks into single Uint8Array
  const allChunks = new Uint8Array(receivedLength);
  let position = 0;
  for (const chunk of chunks) {
    allChunks.set(chunk, position);
    position += chunk.length;
  }
  
  return allChunks.buffer;
}

/**
 * Format file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Clamp number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Format current timestamp for watermark
 */
export function formatWatermarkTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Create watermark text string
 */
export function createWatermarkText(config: {
  userName: string;
  userPhone: string;
  userId: string;
  deviceId: string;
  currentPage: number;
  totalPages?: number;
}): string {
  const { userName, userPhone, userId, deviceId, currentPage, totalPages } = config;
  const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  const pageInfo = totalPages ? `${currentPage}/${totalPages}` : `${currentPage}`;
  
  return `DDA.az • ${userName} • ${userPhone} • ${userId}/${deviceId} • ${timestamp} • Page ${pageInfo}`;
}

/**
 * Detect if running on jailbroken/rooted device (web version - always false)
 * For React Native, use react-native-jailbreak-detection
 */
export async function detectJailbreak(): Promise<boolean> {
  // Web version - not applicable
  // In React Native:
  // import JailMonkey from 'jail-monkey';
  // return JailMonkey.isJailBroken();
  
  return false;
}

/**
 * Simple retry mechanism for failed operations
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }
  
  throw lastError;
}

/**
 * Check if online (for offline error handling)
 */
export function isOnline(): boolean {
  return navigator.onLine;
}