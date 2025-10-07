import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { usePdfStore } from '../modules/pdf/usePdfStore';

interface PageThumbsProps {
  isVisible: boolean;
  onPageSelect: (page: number) => void;
  onClose: () => void;
}

interface ThumbnailItem {
  page: number;
  isActive: boolean;
}

const PageThumbs: React.FC<PageThumbsProps> = ({
  isVisible,
  onPageSelect,
  onClose,
}) => {
  const { totalPages, currentPage } = usePdfStore();

  const thumbnailData = useMemo(() => {
    const items: ThumbnailItem[] = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push({
        page: i,
        isActive: i === currentPage,
      });
    }
    return items;
  }, [totalPages, currentPage]);

  const handlePagePress = useCallback((page: number) => {
    onPageSelect(page);
    onClose();
  }, [onPageSelect, onClose]);

  const renderThumbnail = useCallback(({ item }: { item: ThumbnailItem }) => {
    return (
      <TouchableOpacity
        style={[
          styles.thumbnail,
          item.isActive && styles.activeThumbnail,
        ]}
        onPress={() => handlePagePress(item.page)}
        activeOpacity={0.7}
      >
        <View style={styles.thumbnailContent}>
          {/* Placeholder for PDF page thumbnail */}
          <View style={styles.pagePlaceholder}>
            <Text style={styles.pageIcon}>📄</Text>
          </View>
          
          <Text style={[
            styles.pageNumber,
            item.isActive && styles.activePageNumber,
          ]}>
            {item.page}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }, [handlePagePress]);

  const keyExtractor = useCallback((item: ThumbnailItem) => item.page.toString(), []);

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: 100,
    offset: 100 * index,
    index,
  }), []);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Səhifələr</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={thumbnailData}
        renderItem={renderThumbnail}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        initialScrollIndex={Math.max(0, currentPage - 3)}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
      />
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {currentPage} / {totalPages} səhifə
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    padding: 8,
  },
  thumbnail: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  activeThumbnail: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  thumbnailContent: {
    alignItems: 'center',
  },
  pagePlaceholder: {
    width: 60,
    height: 80,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 4,
  },
  pageIcon: {
    fontSize: 24,
    opacity: 0.6,
  },
  pageNumber: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activePageNumber: {
    color: '#2196f3',
    fontWeight: '600',
  },
  separator: {
    height: 4,
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
});

export default React.memo(PageThumbs);