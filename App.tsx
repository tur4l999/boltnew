import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Alert,
} from 'react-native';
import PdfReader from './src/modules/pdf/PdfReader';
import { colors, spacing, typography, t } from './src/styles/tokens';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
}

const DEMO_BOOKS: Book[] = [
  {
    id: 'book-01',
    title: 'Azərbaycan Tarixi',
    author: 'Müəllif 1',
    description: 'Azərbaycanın qədim tarixindən müasir dövrə qədər',
  },
  {
    id: 'book-02',
    title: 'Ədəbiyyat Nümunələri',
    author: 'Müəllif 2',
    description: 'Klassik və müasir Azərbaycan ədəbiyyatından seçmələr',
  },
];

const DEMO_USER = {
  id: 'demo-user-123',
  name: 'Əli Məmmədov',
  phone: '+994501234567',
  email: 'ali.memmedov@example.com',
};

const App: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  const handleBookSelect = (bookId: string) => {
    Alert.alert(
      'Kitabı Aç',
      'Bu kitabı təhlükəsiz PDF oxuyucuda açmaq istəyirsiniz?',
      [
        {
          text: 'Ləğv et',
          style: 'cancel',
        },
        {
          text: 'Aç',
          onPress: () => {
            setSelectedBook(bookId);
            setIsReaderOpen(true);
          },
        },
      ]
    );
  };

  const handleReaderExit = () => {
    setIsReaderOpen(false);
    setSelectedBook(null);
  };

  const renderBookItem = (book: Book) => (
    <TouchableOpacity
      key={book.id}
      style={[
        styles.bookItem,
        {
          backgroundColor: isDarkMode ? colors.surfaceDark : colors.surface,
          borderColor: isDarkMode ? colors.borderDark : colors.border,
        },
      ]}
      onPress={() => handleBookSelect(book.id)}
      activeOpacity={0.7}
    >
      <View style={styles.bookIcon}>
        <Text style={styles.bookIconText}>📚</Text>
      </View>
      
      <View style={styles.bookInfo}>
        <Text style={[
          styles.bookTitle,
          { color: isDarkMode ? colors.textDark : colors.text }
        ]}>
          {book.title}
        </Text>
        <Text style={[
          styles.bookAuthor,
          { color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary }
        ]}>
          {book.author}
        </Text>
        <Text style={[
          styles.bookDescription,
          { color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary }
        ]}>
          {book.description}
        </Text>
      </View>
      
      <View style={styles.bookAction}>
        <Text style={styles.bookActionText}>▶</Text>
      </View>
    </TouchableOpacity>
  );

  if (isReaderOpen && selectedBook) {
    return (
      <PdfReader
        bookId={selectedBook}
        userId={DEMO_USER.id}
        userName={DEMO_USER.name}
        userPhone={DEMO_USER.phone}
        onExit={handleReaderExit}
      />
    );
  }

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? colors.backgroundDark : colors.background }
    ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={[
        styles.header,
        { backgroundColor: isDarkMode ? colors.surfaceDark : colors.surface }
      ]}>
        <View style={styles.headerContent}>
          <Text style={[
            styles.appTitle,
            { color: isDarkMode ? colors.textDark : colors.text }
          ]}>
            {t('app.title')}
          </Text>
          <Text style={[
            styles.appSubtitle,
            { color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary }
          ]}>
            Təhlükəsiz PDF Oxuyucu
          </Text>
        </View>
        
        <View style={styles.userInfo}>
          <Text style={[
            styles.userName,
            { color: isDarkMode ? colors.textDark : colors.text }
          ]}>
            {DEMO_USER.name}
          </Text>
          <Text style={[
            styles.userPhone,
            { color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary }
          ]}>
            {DEMO_USER.phone}
          </Text>
        </View>
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={[
            styles.sectionTitle,
            { color: isDarkMode ? colors.textDark : colors.text }
          ]}>
            Ödənişli Kitablar
          </Text>
          <Text style={[
            styles.sectionSubtitle,
            { color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary }
          ]}>
            Təhlükəsiz oxuma üçün kitabı seçin
          </Text>
        </View>
        
        <View style={styles.booksList}>
          {DEMO_BOOKS.map(renderBookItem)}
        </View>
        
        {/* Security Notice */}
        <View style={[
          styles.securityNotice,
          { backgroundColor: isDarkMode ? colors.surfaceDark : '#fff3cd' }
        ]}>
          <Text style={styles.securityIcon}>🔒</Text>
          <View style={styles.securityContent}>
            <Text style={[
              styles.securityTitle,
              { color: isDarkMode ? colors.textDark : '#856404' }
            ]}>
              Təhlükəsizlik Xəbərdarlığı
            </Text>
            <Text style={[
              styles.securityText,
              { color: isDarkMode ? colors.textSecondaryDark : '#856404' }
            ]}>
              Bu materiallar müəllif hüquqları ilə qorunur. Hər səhifədə şəxsi vatermark mövcuddur. 
              Ekran görüntüsü və ya yazı çəkmək qadağandır.
            </Text>
          </View>
        </View>
      </View>
      
      {/* Footer */}
      <View style={[
        styles.footer,
        { borderTopColor: isDarkMode ? colors.borderDark : colors.border }
      ]}>
        <Text style={[
          styles.footerText,
          { color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary }
        ]}>
          DDA.az © 2024 - Təhlükəsiz PDF Oxuyucu v1.0.0
        </Text>
        <Text style={[
          styles.footerNote,
          { color: isDarkMode ? colors.textSecondaryDark : colors.textSecondary }
        ]}>
          Demo rejimi aktiv
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    flex: 1,
  },
  appTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  appSubtitle: {
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
  },
  userInfo: {
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  userPhone: {
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  sectionHeader: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  sectionSubtitle: {
    fontSize: typography.sizes.md,
    marginTop: spacing.xs,
  },
  booksList: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
  },
  bookIcon: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  bookIconText: {
    fontSize: 24,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.xs,
  },
  bookAuthor: {
    fontSize: typography.sizes.md,
    marginBottom: spacing.xs,
  },
  bookDescription: {
    fontSize: typography.sizes.sm,
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
  },
  bookAction: {
    padding: spacing.md,
  },
  bookActionText: {
    fontSize: typography.sizes.lg,
    color: colors.primary,
  },
  securityNotice: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  securityIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  securityContent: {
    flex: 1,
  },
  securityTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.xs,
  },
  securityText: {
    fontSize: typography.sizes.sm,
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.sizes.sm,
    textAlign: 'center',
  },
  footerNote: {
    fontSize: typography.sizes.xs,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});

export default App;