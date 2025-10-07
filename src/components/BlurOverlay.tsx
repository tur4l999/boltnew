import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  BlurView,
} from 'react-native';
import { usePdfStore } from '../modules/pdf/usePdfStore';

interface BlurOverlayProps {
  isVisible: boolean;
  reason: 'screenshot' | 'recording' | 'background' | 'session_expired' | 'security_violation';
  onDismiss?: () => void;
  onExit?: () => void;
}

const BlurOverlay: React.FC<BlurOverlayProps> = ({
  isVisible,
  reason,
  onDismiss,
  onExit,
}) => {
  const { sessionRevoked, screenshotDetected } = usePdfStore();

  const getTitle = () => {
    switch (reason) {
      case 'screenshot':
        return 'Ekran Görüntüsü Aşkarlandı';
      case 'recording':
        return 'Ekran Yazısı Aşkarlandı';
      case 'session_expired':
        return 'Sessiya Vaxtı Bitdi';
      case 'security_violation':
        return 'Təhlükəsizlik Pozuntusu';
      default:
        return 'Məzmun Qorunur';
    }
  };

  const getMessage = () => {
    switch (reason) {
      case 'screenshot':
        return 'Təhlükəsizlik səbəbiylə ekran görüntüsü çəkmək qadağandır. Sessiyanız ləğv edildi.';
      case 'recording':
        return 'Təhlükəsizlik səbəbiylə ekran yazısı qadağandır. Sessiyanız ləğv edildi.';
      case 'session_expired':
        return 'Oxuma müddətiniz bitdi. Yenidən daxil olmaq üçün kitabı yenidən açın.';
      case 'security_violation':
        return 'Təhlükəsizlik pozuntusu aşkarlandı. Oxuma dayandırıldı.';
      default:
        return 'Bu məzmun müəllif hüquqları ilə qorunur.';
    }
  };

  const getActions = () => {
    if (reason === 'background') {
      return null; // No actions for background blur
    }

    return (
      <View style={styles.actions}>
        {(reason === 'session_expired' && !sessionRevoked) && (
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={onDismiss}
          >
            <Text style={styles.primaryButtonText}>Yenilə</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={onExit}
        >
          <Text style={styles.secondaryButtonText}>
            {sessionRevoked || screenshotDetected ? 'Çıxış' : 'Bağla'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Blur background */}
        <View style={styles.blurBackground} />
        
        {/* Content overlay */}
        <View style={styles.overlay}>
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🔒</Text>
            </View>
            
            <Text style={styles.title}>{getTitle()}</Text>
            <Text style={styles.message}>{getMessage()}</Text>
            
            {reason !== 'background' && (
              <View style={styles.warning}>
                <Text style={styles.warningText}>
                  ⚠️ Bu materiallar müəllif hüquqları ilə qorunur. 
                  Hər səhifədə şəxsi vatermark mövcuddur.
                </Text>
              </View>
            )}
            
            {getActions()}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    maxWidth: Dimensions.get('window').width - 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  warning: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeaa7',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BlurOverlay;