import * as ScreenCapture from 'expo-screen-capture';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';
import DeviceInfo from 'react-native-device-info';
import { AppState, AppStateStatus } from 'react-native';
import { usePdfStore } from './usePdfStore';
import { revokeSession } from './api';

// Screenshot and Screen Recording Protection
export class ScreenProtection {
  private static isListening = false;
  private static screenshotListener: any = null;
  private static recordingListener: any = null;
  private static appStateListener: any = null;

  static async initialize() {
    if (this.isListening) return;

    try {
      // Prevent screen capture on supported platforms
      await ScreenCapture.preventScreenCaptureAsync();
      
      // Set up screenshot detection
      this.screenshotListener = ScreenCapture.addScreenshotListener(() => {
        this.handleScreenshotDetected();
      });

      // Set up screen recording detection
      this.recordingListener = ScreenCapture.addScreenRecordingChangeListener(({ isRecording }) => {
        if (isRecording) {
          this.handleScreenRecordingDetected();
        }
      });

      // Set up app state listener for background blur
      this.appStateListener = AppState.addEventListener('change', this.handleAppStateChange);

      this.isListening = true;
      console.log('Screen protection initialized');
    } catch (error) {
      console.error('Failed to initialize screen protection:', error);
    }
  }

  static async cleanup() {
    try {
      await ScreenCapture.allowScreenCaptureAsync();
      
      if (this.screenshotListener) {
        this.screenshotListener.remove();
        this.screenshotListener = null;
      }
      
      if (this.recordingListener) {
        this.recordingListener.remove();
        this.recordingListener = null;
      }

      if (this.appStateListener) {
        this.appStateListener.remove();
        this.appStateListener = null;
      }

      this.isListening = false;
      console.log('Screen protection cleaned up');
    } catch (error) {
      console.error('Failed to cleanup screen protection:', error);
    }
  }

  private static async handleScreenshotDetected() {
    console.warn('Screenshot detected!');
    
    const store = usePdfStore.getState();
    store.setScreenshotDetected(true);
    store.setBlurred(true);
    store.logSecurityEvent({
      type: 'screenshot',
      timestamp: new Date().toISOString(),
    });

    // Revoke session
    if (store.bookId && store.isSecured) {
      try {
        const deviceId = await DeviceInfo.getUniqueId();
        await revokeSession({
          bookId: store.bookId,
          userId: 'current-user-id', // Get from auth context
          deviceId,
          reason: 'screenshot_detected',
        });
        store.setSessionRevoked(true);
      } catch (error) {
        console.error('Failed to revoke session after screenshot:', error);
      }
    }
  }

  private static async handleScreenRecordingDetected() {
    console.warn('Screen recording detected!');
    
    const store = usePdfStore.getState();
    store.setBlurred(true);
    store.logSecurityEvent({
      type: 'recording',
      timestamp: new Date().toISOString(),
    });

    // Revoke session
    if (store.bookId && store.isSecured) {
      try {
        const deviceId = await DeviceInfo.getUniqueId();
        await revokeSession({
          bookId: store.bookId,
          userId: 'current-user-id', // Get from auth context
          deviceId,
          reason: 'recording_detected',
        });
        store.setSessionRevoked(true);
      } catch (error) {
        console.error('Failed to revoke session after recording detection:', error);
      }
    }
  }

  private static handleAppStateChange = (nextAppState: AppStateStatus) => {
    const store = usePdfStore.getState();
    
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      // Blur content when app goes to background
      if (store.isSecured) {
        store.setBlurred(true);
      }
    } else if (nextAppState === 'active') {
      // Remove blur when app becomes active (if no security violations)
      if (store.isSecured && !store.screenshotDetected && !store.sessionRevoked) {
        store.setBlurred(false);
      }
    }
  };
}

// File Integrity Protection
export class FileIntegrity {
  static async verifyChecksum(filePath: string, expectedChecksum: string): Promise<boolean> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        console.error('File does not exist:', filePath);
        return false;
      }

      const fileUri = fileInfo.uri;
      const actualChecksum = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 })
      );

      const isValid = actualChecksum === expectedChecksum;
      
      if (!isValid) {
        console.error('File integrity check failed');
        // Delete corrupted file
        await FileSystem.deleteAsync(filePath, { idempotent: true });
        
        const store = usePdfStore.getState();
        store.logSecurityEvent({
          type: 'integrity_failed',
          timestamp: new Date().toISOString(),
          details: { filePath, expectedChecksum, actualChecksum },
        });
      }

      return isValid;
    } catch (error) {
      console.error('Failed to verify file checksum:', error);
      return false;
    }
  }

  static async secureDelete(filePath: string): Promise<void> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(filePath, { idempotent: true });
        console.log('Securely deleted file:', filePath);
      }
    } catch (error) {
      console.error('Failed to securely delete file:', error);
    }
  }
}

// Root/Jailbreak Detection
export class RootDetection {
  static async isDeviceCompromised(): Promise<boolean> {
    try {
      // Check if device is rooted/jailbroken
      const isRooted = await DeviceInfo.isEmulator() || 
                      await this.checkForRootIndicators();
      
      if (isRooted) {
        const store = usePdfStore.getState();
        store.logSecurityEvent({
          type: 'root_detected',
          timestamp: new Date().toISOString(),
        });
      }

      return isRooted;
    } catch (error) {
      console.error('Failed to check device security:', error);
      return false;
    }
  }

  private static async checkForRootIndicators(): Promise<boolean> {
    // Basic root detection - in production use a more comprehensive library
    try {
      // Check for common root/jailbreak indicators
      const suspiciousApps = [
        'com.noshufou.android.su',
        'com.thirdparty.superuser',
        'eu.chainfire.supersu',
        'com.koushikdutta.superuser',
        'com.zachspong.temprootremovejb',
        'com.ramdroid.appquarantine',
      ];

      // This is a simplified check - use react-native-root-detection for production
      return false; // Placeholder
    } catch (error) {
      return false;
    }
  }
}

// Session Management
export class SessionManager {
  private static sessionCheckInterval: NodeJS.Timeout | null = null;

  static startSessionMonitoring() {
    if (this.sessionCheckInterval) return;

    this.sessionCheckInterval = setInterval(() => {
      const store = usePdfStore.getState();
      if (store.isSecured && !store.sessionRevoked) {
        const isExpired = store.checkSessionExpiry();
        if (isExpired) {
          store.logSecurityEvent({
            type: 'session_expired',
            timestamp: new Date().toISOString(),
          });
        }
      }
    }, 60000); // Check every minute
  }

  static stopSessionMonitoring() {
    if (this.sessionCheckInterval) {
      clearInterval(this.sessionCheckInterval);
      this.sessionCheckInterval = null;
    }
  }
}

// Main Security Guard
export class SecurityGuard {
  static async initialize() {
    console.log('Initializing security guards...');
    
    // Check if device is compromised
    const isCompromised = await RootDetection.isDeviceCompromised();
    if (isCompromised) {
      throw new Error('Bu cihazda təhlükəsizlik riski aşkarlandı. Oxuma bloklandı.');
    }

    // Initialize screen protection
    await ScreenProtection.initialize();
    
    // Start session monitoring
    SessionManager.startSessionMonitoring();
    
    console.log('Security guards initialized successfully');
  }

  static async cleanup() {
    console.log('Cleaning up security guards...');
    
    await ScreenProtection.cleanup();
    SessionManager.stopSessionMonitoring();
    
    console.log('Security guards cleaned up');
  }
}