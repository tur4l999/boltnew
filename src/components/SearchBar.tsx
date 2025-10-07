import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { usePdfStore } from '../modules/pdf/usePdfStore';
import { searchInPdf } from '../modules/pdf/api';
import { debounce } from '../modules/pdf/utils';
import { SearchResult } from '../modules/pdf/types';

interface SearchBarProps {
  isVisible: boolean;
  onResultSelect: (page: number) => void;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isVisible,
  onResultSelect,
  onClose,
}) => {
  const { bookId, searchQuery, searchResults, setSearchQuery, setSearchResults } = usePdfStore();
  const [isSearching, setIsSearching] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim() || !bookId) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      try {
        setIsSearching(true);
        const results = await searchInPdf({
          bookId,
          q: query.trim(),
        });
        setSearchResults(results);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500),
    [bookId, setSearchResults]
  );

  // Handle search query changes
  useEffect(() => {
    setSearchQuery(localQuery);
    debouncedSearch(localQuery);
  }, [localQuery, setSearchQuery, debouncedSearch]);

  const handleResultPress = useCallback((result: SearchResult) => {
    onResultSelect(result.page);
    Keyboard.dismiss();
  }, [onResultSelect]);

  const handleClear = useCallback(() => {
    setLocalQuery('');
    setSearchResults([]);
  }, [setSearchResults]);

  const renderSearchResult = useCallback(({ item, index }: { item: SearchResult; index: number }) => {
    return (
      <TouchableOpacity
        style={styles.resultItem}
        onPress={() => handleResultPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.resultHeader}>
          <Text style={styles.pageNumber}>Səhifə {item.page}</Text>
        </View>
        <Text style={styles.snippet} numberOfLines={3}>
          {item.snippet}
        </Text>
      </TouchableOpacity>
    );
  }, [handleResultPress]);

  const keyExtractor = useCallback((item: SearchResult, index: number) => `${item.page}-${index}`, []);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            value={localQuery}
            onChangeText={setLocalQuery}
            placeholder="Mətnlərdə axtarış..."
            placeholderTextColor="#999"
            autoFocus
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          
          {localQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.closeButtonText}>Bağla</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContent}>
        {isSearching && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#2196f3" />
            <Text style={styles.loadingText}>Axtarılır...</Text>
          </View>
        )}
        
        {!isSearching && localQuery.trim() && searchResults.length === 0 && (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>
              "{localQuery}" üçün nəticə tapılmadı
            </Text>
          </View>
        )}
        
        {!isSearching && searchResults.length > 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsHeader}>
              {searchResults.length} nəticə tapıldı
            </Text>
            
            <FlatList
              data={searchResults}
              renderItem={renderSearchResult}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.resultsList}
              ItemSeparatorComponent={() => <View style={styles.resultSeparator} />}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )}
        
        {!localQuery.trim() && (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateIcon}>🔍</Text>
            <Text style={styles.emptyStateTitle}>Mətn axtarışı</Text>
            <Text style={styles.emptyStateDescription}>
              PDF-də axtarmaq istədiyiniz sözü və ya cümləni yazın
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 1000,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: '#333',
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#999',
  },
  closeButton: {
    marginLeft: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#2196f3',
    fontWeight: '500',
  },
  searchContent: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    fontSize: 14,
    color: '#666',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  resultsList: {
    paddingBottom: 16,
  },
  resultItem: {
    padding: 16,
    backgroundColor: 'white',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pageNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196f3',
  },
  snippet: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  resultSeparator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 16,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default React.memo(SearchBar);