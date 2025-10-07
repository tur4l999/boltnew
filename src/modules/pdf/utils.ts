import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';
import DeviceInfo from 'react-native-device-info';

// Debounce utility for search and other operations
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Time utilities
export const formatTimeLeft = (expiresAt: string): string => {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diff = expiry.getTime() - now.getTime();
  
  if (diff <= 0) return 'Vaxt bitdi';
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} gün`;
  if (hours > 0) return `${hours} saat`;
  return `${minutes} dəqiqə`;
};

export const isSessionExpired = (expiresAt: string): boolean => {
  const now = new Date();
  const expiry = new Date(expiresAt);
  return now >= expiry;
};

// File utilities
export const getSecureCacheDir = async (): Promise<string> => {
  const cacheDir = `${FileSystem.cacheDirectory}secure_pdfs/`;
  const dirInfo = await FileSystem.getInfoAsync(cacheDir);
  
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(cacheDir, { intermediates: true });
  }
  
  return cacheDir;
};

export const generateSecureFileName = (bookId: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return `${bookId}_${timestamp}_${random}.pdf`;
};

export const downloadSecurePdf = async (
  url: string, 
  bookId: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    const cacheDir = await getSecureCacheDir();
    const fileName = generateSecureFileName(bookId);
    const filePath = `${cacheDir}${fileName}`;
    
    const downloadResult = await FileSystem.downloadAsync(url, filePath, {
      sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
    });
    
    if (downloadResult.status !== 200) {
      throw new Error(`Download failed with status: ${downloadResult.status}`);
    }
    
    return downloadResult.uri;
  } catch (error) {
    console.error('Failed to download secure PDF:', error);
    throw new Error('PDF yükləmə xətası');
  }
};

export const calculateFileChecksum = async (filePath: string): Promise<string> => {
  try {
    const fileContent = await FileSystem.readAsStringAsync(filePath, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      fileContent
    );
  } catch (error) {
    console.error('Failed to calculate file checksum:', error);
    throw new Error('Fayl yoxlanması xətası');
  }
};

// Device utilities
export const getDeviceInfo = async () => {
  try {
    const deviceId = await DeviceInfo.getUniqueId();
    const deviceName = await DeviceInfo.getDeviceName();
    const systemName = DeviceInfo.getSystemName();
    const systemVersion = DeviceInfo.getSystemVersion();
    const appVersion = DeviceInfo.getVersion();
    const buildNumber = DeviceInfo.getBuildNumber();
    
    return {
      deviceId,
      deviceName,
      systemName,
      systemVersion,
      appVersion,
      buildNumber,
    };
  } catch (error) {
    console.error('Failed to get device info:', error);
    return {
      deviceId: 'unknown',
      deviceName: 'unknown',
      systemName: 'unknown',
      systemVersion: 'unknown',
      appVersion: 'unknown',
      buildNumber: 'unknown',
    };
  }
};

// Watermark utilities
export const generateWatermarkText = (
  userName: string,
  phone: string,
  userId: string,
  deviceId: string,
  page: number,
  totalPages: number
): string => {
  const timestamp = new Date().toLocaleString('az-AZ', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return `DDA.az • ${userName} • ${phone} • ${userId}/${deviceId.substring(0, 8)} • ${timestamp} • Səhifə ${page}/${totalPages}`;
};

export const calculateWatermarkPositions = (
  containerWidth: number,
  containerHeight: number,
  textWidth: number,
  textHeight: number,
  spacing: number = 150
): Array<{ x: number; y: number }> => {
  const positions: Array<{ x: number; y: number }> = [];
  
  // Calculate diagonal pattern
  const cols = Math.ceil(containerWidth / spacing) + 2;
  const rows = Math.ceil(containerHeight / spacing) + 2;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * spacing - (row % 2) * (spacing / 2);
      const y = row * spacing;
      
      if (x > -textWidth && x < containerWidth + textWidth &&
          y > -textHeight && y < containerHeight + textHeight) {
        positions.push({ x, y });
      }
    }
  }
  
  return positions;
};

// Validation utilities
export const validateBookId = (bookId: string): boolean => {
  return /^[a-zA-Z0-9-_]{3,50}$/.test(bookId);
};

export const validateUserId = (userId: string): boolean => {
  return /^[a-zA-Z0-9-_]{3,50}$/.test(userId);
};

export const validatePageNumber = (page: number, totalPages: number): boolean => {
  return Number.isInteger(page) && page >= 1 && page <= totalPages;
};

// Error handling utilities
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  return 'Naməlum xəta baş verdi';
};

// Storage utilities
export const clearSecureCache = async (): Promise<void> => {
  try {
    const cacheDir = await getSecureCacheDir();
    const files = await FileSystem.readDirectoryAsync(cacheDir);
    
    for (const file of files) {
      await FileSystem.deleteAsync(`${cacheDir}${file}`, { idempotent: true });
    }
    
    console.log('Secure cache cleared');
  } catch (error) {
    console.error('Failed to clear secure cache:', error);
  }
};

// Performance utilities
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};