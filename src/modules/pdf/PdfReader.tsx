import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import Pdf from 'react-native-pdf';
import { usePdfStore } from './usePdfStore';
import { issueSecuredPdf, revokeSession } from './api';
import { SecurityGuard, FileIntegrity } from './guards';
import { 
  downloadSecurePdf, 
  calculateFileChecksum, 
  getDeviceInfo, 
  formatTimeLeft,
  getErrorMessage 
} from './utils';
import Watermark from './Watermark';
import BlurOverlay from '../../components/BlurOverlay';
import PageThumbs from '../../components/PageThumbs';
import PagePicker from '../../components/PagePicker';
import SearchBar from '../../components/SearchBar';
import { colors, spacing, typography, t } from '../../styles/tokens';

interface PdfReaderProps {
  bookId: string;
  userId?: string;
  userName?: string;
  userPhone?: string;
  onExit?: () => void;
}

const PdfReader: React.FC<PdfReaderProps> = ({
  bookId,
  userId = 'demo-user',
  userName = 'Demo User',
  userPhone = '+994501234567',
  onExit,
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const pdfRef = useRef<Pdf>(null);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [pdfSource, setPdfSource] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  
  const {
    totalPages,
    currentPage,
    zoom,
    isLoading,
    error,
    isSecured,
    expiresAt,
    checksumSha256,
    filePath,
    showThumbnails,
    showPagePicker,
    showSearch,
    screenshotDetected,
    sessionRevoked,
    isBlurred,
    setCurrentPage,
    setZoom,
    setLoading,
    setError,
    setPdfInfo,
    toggleThumbnails,
    togglePagePicker,
    toggleSearch,
    setBlurred,
    clearSession,
    reset,
  } = usePdfStore();

  // Initialize security and load PDF
  useEffect(() => {
    initializePdfReader();
    
    return () => {
      cleanup();
    };
  }, [bookId]);

  // Monitor session expiry
  useEffect(() => {
    if (expiresAt && isSecured) {
      const checkExpiry = () => {
        const timeLeft = new Date(expiresAt).getTime() - Date.now();
        if (timeLeft <= 0) {
          handleSessionExpired();
        }
      };
      
      const interval = setInterval(checkExpiry, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [expiresAt, isSecured]);

  const initializePdfReader = async () => {
    try {
      setIsInitializing(true);
      setError(null);
      
      // Get device info
      const deviceData = await getDeviceInfo();
      setDeviceInfo(deviceData);
      
      // Initialize security guards
      await SecurityGuard.initialize();
      
      // Issue secured PDF
      setLoading(true);
      const pdfData = await issueSecuredPdf({
        bookId,
        userId,
        deviceId: deviceData.deviceId,
      });
      
      // Download PDF
      const downloadedPath = await downloadSecurePdf(pdfData.url, bookId);
      
      // Verify file integrity
      const actualChecksum = await calculateFileChecksum(downloadedPath);
      const isValid = await FileIntegrity.verifyChecksum(downloadedPath, pdfData.checksumSha256);
      
      if (!isValid) {
        throw new Error(t('error.checksumFailed'));
      }
      
      // Set PDF info
      setPdfInfo(
        bookId,
        pdfData.totalPages,
        downloadedPath,
        pdfData.checksumSha256,
        pdfData.expiresAt
      );
      
      // Set PDF source for react-native-pdf
      setPdfSource({
        uri: downloadedPath,
        cache: true,
      });
      
    } catch (error) {
      console.error('Failed to initialize PDF reader:', error);
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
      setIsInitializing(false);
    }
  };

  const cleanup = async () => {
    await SecurityGuard.cleanup();
    if (filePath) {
      await FileIntegrity.secureDelete(filePath);
    }
  };

  const handleSessionExpired = useCallback(async () => {
    setBlurred(true);
    setError(t('security.sessionExpiredMessage'));
    
    if (deviceInfo) {
      try {
        await revokeSession({
          bookId,
          userId,
          deviceId: deviceInfo.deviceId,
          reason: 'session_expired',
        });
      } catch (error) {
        console.error('Failed to revoke expired session:', error);
      }
    }
  }, [bookId, userId, deviceInfo, setBlurred, setError]);

  const handlePageChanged = useCallback((page: number, numberOfPages: number) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const handleLoadComplete = useCallback((numberOfPages: number, filePath: string) => {
    console.log('PDF loaded successfully:', { numberOfPages, filePath });
  }, []);

  const handleLoadProgress = useCallback((percent: number) => {
    // Progress is handled by the loading state
  }, []);

  const handleError = useCallback((error: any) => {
    console.error('PDF load error:', error);
    setError(getErrorMessage(error));
  }, [setError]);

  const handleZoomChanged = useCallback((zoom: number) => {
    setZoom(zoom);
  }, [setZoom]);

  const handlePageSelect = useCallback((page: number) => {
    if (pdfRef.current) {
      pdfRef.current.setPage(page);
    }
    setCurrentPage(page);
  }, [setCurrentPage]);

  const handleExit = useCallback(async () => {
    try {
      if (deviceInfo && isSecured) {
        await revokeSession({
          bookId,
          userId,
          deviceId: deviceInfo.deviceId,
          reason: 'user_exit',
        });
      }
    } catch (error) {
      console.error('Failed to revoke session on exit:', error);
    } finally {
      clearSession();
      reset();
      onExit?.();
    }
  }, [bookId, userId, deviceInfo, isSecured, clearSession, reset, onExit]);

  const handleRefresh = useCallback(() => {
    reset();
    initializePdfReader();
  }, [reset]);

  const getBlurReason = (): 'screenshot' | 'recording' | 'background' | 'session_expired' | 'security_violation' => {
    if (screenshotDetected) return 'screenshot';
    if (sessionRevoked) return 'session_expired';
    return 'background';
  };

  // Show loading screen during initialization
  if (isInitializing || isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.backgroundDark : colors.background }]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: isDarkMode ? colors.textDark : colors.text }]}>
            {t('pdf.loading')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show error screen
  if (error && !pdfSource) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.backgroundDark : colors.background }]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>❌</Text>
          <Text style={[styles.errorTitle, { color: isDarkMode ? colors.textDark : colors.text }]}>
            {t('common.error')}
          </Text>
          <Text style={[styles.errorMessage, { color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary }]}>
            {error}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>{t('common.retry')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
            <Text style={styles.exitButtonText}>{t('common.exit')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.backgroundDark : colors.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDarkMode ? colors.surfaceDark : colors.surface }]}>
        <Text style={[styles.headerTitle, { color: isDarkMode ? colors.textDark : colors.text }]}>
          {t('pdf.page')} {currentPage} / {totalPages}
        </Text>
        
        {expiresAt && (
          <Text style={[styles.timeLeft, { color: colors.warning }]}>
            {t('time.timeLeft', { time: formatTimeLeft(expiresAt) })}
          </Text>
        )}
        
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={toggleSearch}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.headerButtonText}>🔍</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.headerButton}
            onPress={togglePagePicker}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.headerButtonText}>📄</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.headerButton}
            onPress={toggleThumbnails}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.headerButtonText}>📋</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleExit}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.headerButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* PDF Viewer */}
      <View style={styles.pdfContainer}>
        {pdfSource && (
          <Pdf
            ref={pdfRef}
            source={pdfSource}
            onLoadComplete={handleLoadComplete}
            onPageChanged={handlePageChanged}
            onError={handleError}
            onLoadProgress={handleLoadProgress}
            onScaleChanged={handleZoomChanged}
            style={styles.pdf}
            trustAllCerts={false}
            enablePaging={true}
            enableRTL={false}
            enableAnnotationRendering={false}
            enableDoubleTapZoom={true}
            enableAntialiasing={true}
            fitPolicy={0} // Fit width
            spacing={10}
            minScale={0.5}
            maxScale={3.0}
            scale={zoom}
            page={currentPage}
          />
        )}
        
        {/* Watermark Overlay */}
        {isSecured && deviceInfo && (
          <Watermark
            userName={userName}
            phone={userPhone}
            userId={userId}
            deviceId={deviceInfo.deviceId}
            timestamp={new Date().toISOString()}
            page={currentPage}
            totalPages={totalPages}
            opacity={0.12}
            isDarkMode={isDarkMode}
            isVisible={!isBlurred}
          />
        )}
      </View>
      
      {/* Page Thumbnails */}
      {showThumbnails && (
        <PageThumbs
          isVisible={showThumbnails}
          onPageSelect={handlePageSelect}
          onClose={toggleThumbnails}
        />
      )}
      
      {/* Page Picker */}
      <PagePicker
        isVisible={showPagePicker}
        onPageSelect={handlePageSelect}
        onClose={togglePagePicker}
      />
      
      {/* Search */}
      <SearchBar
        isVisible={showSearch}
        onResultSelect={handlePageSelect}
        onClose={toggleSearch}
      />
      
      {/* Blur Overlay */}
      <BlurOverlay
        isVisible={isBlurred}
        reason={getBlurReason()}
        onDismiss={sessionRevoked ? undefined : handleRefresh}
        onExit={handleExit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
  },
  loadingText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxxl,
    gap: spacing.lg,
  },
  errorIcon: {
    fontSize: 48,
  },
  errorTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
  },
  errorMessage: {
    fontSize: typography.sizes.md,
    textAlign: 'center',
    lineHeight: typography.sizes.md * typography.lineHeights.relaxed,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 8,
    marginTop: spacing.lg,
  },
  retryButtonText: {
    color: 'white',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  exitButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.sm,
  },
  exitButtonText: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    flex: 1,
  },
  timeLeft: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    marginHorizontal: spacing.md,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  headerButton: {
    padding: spacing.sm,
  },
  headerButtonText: {
    fontSize: typography.sizes.lg,
  },
  pdfContainer: {
    flex: 1,
    position: 'relative',
  },
  pdf: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default React.memo(PdfReader);