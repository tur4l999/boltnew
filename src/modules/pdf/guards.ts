/**
 * Security guards for PDF Reader
 * Screenshot detection, jailbreak detection, integrity checks
 */

import { detectJailbreak } from './utils';

/**
 * Screenshot detection state
 */
let screenshotListeners: Array<(detected: boolean) => void> = [];
let isMonitoring = false;

/**
 * Start monitoring for screenshot attempts
 * Web implementation: visibility change detection
 * React Native: use expo-screen-capture
 */
export function startScreenshotMonitoring(
  onScreenshotDetected: () => void
): () => void {
  // Web implementation - detect visibility change patterns
  // This is a simplified version; true detection needs native modules
  
  const handleVisibilityChange = () => {
    // Pattern detection: rapid visibility changes might indicate screenshot
    // This is NOT foolproof - proper implementation needs native modules
    if (document.hidden) {
      // Log for analytics
      console.warn('[Security] Visibility changed - potential screenshot');
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent) => {
    // Detect common screenshot shortcuts
    const isScreenshotShortcut =
      // Windows: Win + PrintScreen, PrintScreen
      e.key === 'PrintScreen' ||
      // Mac: Cmd + Shift + 3/4/5
      (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) ||
      // Windows: Win + Shift + S (Snipping Tool)
      (e.key === 'S' && e.shiftKey && (e.metaKey || e.ctrlKey));
    
    // Block developer tools
    const isDevToolsShortcut =
      // F12
      e.key === 'F12' ||
      // Ctrl+Shift+I / Cmd+Option+I
      (e.key === 'I' && e.shiftKey && (e.ctrlKey || e.metaKey)) ||
      // Ctrl+Shift+C / Cmd+Option+C
      (e.key === 'C' && e.shiftKey && (e.ctrlKey || e.metaKey)) ||
      // Ctrl+Shift+J / Cmd+Option+J
      (e.key === 'J' && e.shiftKey && (e.ctrlKey || e.metaKey));
    
    if (isScreenshotShortcut) {
      e.preventDefault();
      console.warn('[Security] Screenshot shortcut detected');
      onScreenshotDetected();
    }
    
    if (isDevToolsShortcut) {
      e.preventDefault();
      console.warn('[Security] Developer tools shortcut blocked');
    }
  };
  
  const handleContextMenu = (e: MouseEvent) => {
    // Prevent right-click menu (save image, etc.)
    e.preventDefault();
    return false;
  };
  
  // Add listeners
  document.addEventListener('visibilitychange', handleVisibilityChange);
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('contextmenu', handleContextMenu);
  
  isMonitoring = true;
  
  // Prevent text selection and copying
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  
  // Return cleanup function
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('contextmenu', handleContextMenu);
    
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
    
    isMonitoring = false;
  };
}

/**
 * Prevent screenshots (React Native expo-screen-capture)
 * Web: Limited prevention, use CSS and event blocking
 */
export async function preventScreenCapture(): Promise<void> {
  // Web: Add CSS to make screenshotting harder
  const style = document.createElement('style');
  style.id = 'pdf-security-style';
  style.textContent = `
    .pdf-reader-protected {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      pointer-events: auto;
    }
    
    .pdf-reader-protected * {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-user-drag: none;
      user-drag: none;
    }
    
    /* Print qadağası */
    @media print {
      .pdf-reader-protected {
        display: none !important;
      }
    }
  `;
  
  if (!document.getElementById('pdf-security-style')) {
    document.head.appendChild(style);
  }
  
  // Disable right-click context menu globally for PDF
  const preventContextMenu = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target?.closest('.pdf-reader-protected')) {
      e.preventDefault();
      return false;
    }
  };
  
  document.addEventListener('contextmenu', preventContextMenu);
  
  // React Native implementation:
  // import * as ScreenCapture from 'expo-screen-capture';
  // await ScreenCapture.preventScreenCaptureAsync();
}

/**
 * Allow screenshots (cleanup)
 */
export async function allowScreenCapture(): Promise<void> {
  const style = document.getElementById('pdf-security-style');
  if (style) {
    style.remove();
  }
  
  // React Native:
  // import * as ScreenCapture from 'expo-screen-capture';
  // await ScreenCapture.allowScreenCaptureAsync();
}

/**
 * Add screenshot listener
 * React Native: ScreenCapture.addScreenshotListener()
 */
export function addScreenshotListener(
  callback: () => void
): () => void {
  screenshotListeners.push(callback);
  
  // React Native implementation:
  // import * as ScreenCapture from 'expo-screen-capture';
  // const subscription = ScreenCapture.addScreenshotListener(() => {
  //   callback();
  // });
  // return () => subscription.remove();
  
  return () => {
    screenshotListeners = screenshotListeners.filter(cb => cb !== callback);
  };
}

/**
 * Check if device is jailbroken/rooted
 */
export async function checkJailbreak(): Promise<boolean> {
  return await detectJailbreak();
}

/**
 * Background protection - blur content when app goes to background
 * React Native: AppState listener
 */
export function setupBackgroundProtection(
  onBackground: () => void,
  onForeground: () => void
): () => void {
  // Web implementation using Page Visibility API
  const handleVisibilityChange = () => {
    if (document.hidden) {
      onBackground();
    } else {
      onForeground();
    }
  };
  
  const handleBlur = () => {
    onBackground();
  };
  
  const handleFocus = () => {
    onForeground();
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('blur', handleBlur);
  window.addEventListener('focus', handleFocus);
  
  // React Native implementation:
  // import { AppState } from 'react-native';
  // const subscription = AppState.addEventListener('change', (nextAppState) => {
  //   if (nextAppState === 'background') {
  //     onBackground();
  //   } else if (nextAppState === 'active') {
  //     onForeground();
  //   }
  // });
  // return () => subscription.remove();
  
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('blur', handleBlur);
    window.removeEventListener('focus', handleFocus);
  };
}

/**
 * Secure storage check (verify file hasn't been tampered)
 */
export async function verifySecureStorage(
  fileContent: ArrayBuffer,
  expectedChecksum: string
): Promise<boolean> {
  // Import sha256 from utils
  const { sha256 } = await import('./utils');
  const actualChecksum = await sha256(fileContent);
  return actualChecksum === expectedChecksum;
}

/**
 * Clear secure cache when session is revoked
 */
export async function clearSecureCache(bookId: string): Promise<void> {
  // Web: Clear from localStorage/IndexedDB
  const cacheKeys = [
    `pdf_file_${bookId}`,
    `pdf_session_${bookId}`,
    `pdf_checksum_${bookId}`,
  ];
  
  cacheKeys.forEach(key => {
    localStorage.removeItem(key);
  });
  
  // React Native:
  // import * as FileSystem from 'expo-file-system';
  // const fileUri = `${FileSystem.documentDirectory}pdf_${bookId}.pdf`;
  // await FileSystem.deleteAsync(fileUri, { idempotent: true });
}

/**
 * Device fingerprinting for additional security
 */
export function getDeviceFingerprint(): string {
  const components = [
    navigator.userAgent,
    navigator.language,
    navigator.hardwareConcurrency,
    screen.colorDepth,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset(),
  ];
  
  return components.join('|');
}

/**
 * Integrity check - verify app hasn't been modified
 */
export async function checkAppIntegrity(): Promise<boolean> {
  // Web: Limited capability
  // Check if running in expected domain
  const isValidDomain = window.location.hostname.includes('dda.az') || 
                       window.location.hostname === 'localhost';
  
  // React Native with EAS:
  // import * as Updates from 'expo-updates';
  // Check manifest integrity, signature verification
  
  return isValidDomain;
}

/**
 * Log security event for monitoring
 */
export function logSecurityEvent(
  event: 'screenshot' | 'jailbreak' | 'integrity' | 'session_revoke',
  metadata?: Record<string, any>
): void {
  const logEntry = {
    event,
    timestamp: new Date().toISOString(),
    deviceId: localStorage.getItem('dda_device_id'),
    metadata,
  };
  
  console.warn('[Security Event]', logEntry);
  
  // Send to backend analytics
  // fetch('/api/security/log', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(logEntry),
  // }).catch(console.error);
}