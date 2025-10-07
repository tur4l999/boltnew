import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Slider,
  Dimensions,
} from 'react-native';
import { usePdfStore } from '../modules/pdf/usePdfStore';

interface PagePickerProps {
  isVisible: boolean;
  onPageSelect: (page: number) => void;
  onClose: () => void;
}

const PagePicker: React.FC<PagePickerProps> = ({
  isVisible,
  onPageSelect,
  onClose,
}) => {
  const { totalPages, currentPage } = usePdfStore();
  const [selectedPage, setSelectedPage] = useState(currentPage);
  const [inputValue, setInputValue] = useState(currentPage.toString());

  const handleSliderChange = useCallback((value: number) => {
    const page = Math.round(value);
    setSelectedPage(page);
    setInputValue(page.toString());
  }, []);

  const handleInputChange = useCallback((text: string) => {
    setInputValue(text);
    const page = parseInt(text, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setSelectedPage(page);
    }
  }, [totalPages]);

  const handleConfirm = useCallback(() => {
    if (selectedPage >= 1 && selectedPage <= totalPages) {
      onPageSelect(selectedPage);
      onClose();
    }
  }, [selectedPage, totalPages, onPageSelect, onClose]);

  const handleCancel = useCallback(() => {
    setSelectedPage(currentPage);
    setInputValue(currentPage.toString());
    onClose();
  }, [currentPage, onClose]);

  // Quick jump buttons
  const quickJumpPages = [1, Math.ceil(totalPages * 0.25), Math.ceil(totalPages * 0.5), Math.ceil(totalPages * 0.75), totalPages];

  const handleQuickJump = useCallback((page: number) => {
    setSelectedPage(page);
    setInputValue(page.toString());
  }, []);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleCancel}
        />
        
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Səhifəyə keç</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCancel}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            {/* Current page info */}
            <View style={styles.currentPageInfo}>
              <Text style={styles.currentPageText}>
                Cari səhifə: {currentPage} / {totalPages}
              </Text>
            </View>
            
            {/* Page input */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>Səhifə nömrəsi:</Text>
              <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={handleInputChange}
                keyboardType="numeric"
                placeholder="1"
                maxLength={totalPages.toString().length}
                selectTextOnFocus
              />
            </View>
            
            {/* Slider */}
            <View style={styles.sliderSection}>
              <Text style={styles.label}>Sürüşdürücü:</Text>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={totalPages}
                value={selectedPage}
                onValueChange={handleSliderChange}
                step={1}
                minimumTrackTintColor="#2196f3"
                maximumTrackTintColor="#e0e0e0"
                thumbStyle={styles.sliderThumb}
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>1</Text>
                <Text style={styles.sliderLabel}>{selectedPage}</Text>
                <Text style={styles.sliderLabel}>{totalPages}</Text>
              </View>
            </View>
            
            {/* Quick jump buttons */}
            <View style={styles.quickJumpSection}>
              <Text style={styles.label}>Sürətli keçid:</Text>
              <View style={styles.quickJumpButtons}>
                {quickJumpPages.map((page, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.quickJumpButton,
                      selectedPage === page && styles.activeQuickJumpButton,
                    ]}
                    onPress={() => handleQuickJump(page)}
                  >
                    <Text style={[
                      styles.quickJumpButtonText,
                      selectedPage === page && styles.activeQuickJumpButtonText,
                    ]}>
                      {page === 1 ? 'Başlanğıc' :
                       page === totalPages ? 'Son' :
                       page === Math.ceil(totalPages * 0.5) ? 'Orta' :
                       `${Math.round((page / totalPages) * 100)}%`}
                    </Text>
                    <Text style={[
                      styles.quickJumpPageNumber,
                      selectedPage === page && styles.activeQuickJumpPageNumber,
                    ]}>
                      {page}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Preview */}
            <View style={styles.previewSection}>
              <Text style={styles.label}>Seçilmiş səhifə:</Text>
              <View style={styles.preview}>
                <Text style={styles.previewText}>
                  Səhifə {selectedPage} / {totalPages}
                </Text>
                <Text style={styles.previewPercentage}>
                  ({Math.round((selectedPage / totalPages) * 100)}%)
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Ləğv et</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.button,
                styles.confirmButton,
                (selectedPage < 1 || selectedPage > totalPages) && styles.disabledButton,
              ]}
              onPress={handleConfirm}
              disabled={selectedPage < 1 || selectedPage > totalPages}
            >
              <Text style={[
                styles.confirmButtonText,
                (selectedPage < 1 || selectedPage > totalPages) && styles.disabledButtonText,
              ]}>
                Keç
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: Dimensions.get('window').height * 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
  },
  content: {
    padding: 16,
  },
  currentPageInfo: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  currentPageText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  sliderSection: {
    marginBottom: 24,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#2196f3',
    width: 20,
    height: 20,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#666',
  },
  quickJumpSection: {
    marginBottom: 24,
  },
  quickJumpButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickJumpButton: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeQuickJumpButton: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  quickJumpButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeQuickJumpButtonText: {
    color: '#2196f3',
  },
  quickJumpPageNumber: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginTop: 2,
  },
  activeQuickJumpPageNumber: {
    color: '#2196f3',
  },
  previewSection: {
    marginBottom: 8,
  },
  preview: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  previewText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  previewPercentage: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  confirmButton: {
    backgroundColor: '#2196f3',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  confirmButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  disabledButtonText: {
    color: '#999',
  },
});

export default React.memo(PagePicker);