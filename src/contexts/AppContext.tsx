import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dictionaries } from '../lib/i18n';
import type { Language, NavigationScreen, StoredExamResult, ExamType, Appeal, AppealFormData, QAChat, QAMessage, QAUser, SchoolSubject } from '../lib/types';
import { fetchSchoolSubjects, getCachedSubjects, setCachedSubjects, buildSubjectHierarchy, flattenSubjectHierarchy, saveSubjectProgress } from '../lib/api';

type ThemeMode = 'light' | 'dark' | 'system';
type DeliveryMethod = 'locker' | 'courier' | 'post' | 'pickup';

interface UserPackage {
  id: string;
  name: string;
  price: number;
  days: number;
  activationDate: Date;
  purchaseDate: Date;
  expiryDate: Date;
}

interface Transaction {
  id: string;
  type: 'purchase' | 'refund';
  amount: number;
  description: string;
  date: Date;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDarkMode: boolean;
  t: typeof dictionaries.az;
  currentTab: string;
  currentScreen: NavigationScreen;
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
  switchTab: (tab: string) => void;
  moreSheetVisible: boolean;
  setMoreSheetVisible: (visible: boolean) => void;
  balance: number;
  simulatorBalance: number;
  activePackage: UserPackage | null;
  transactions: Transaction[];
  purchasePackage: (packageId: string, packageName: string, price: number, days: number, activationDate?: Date) => boolean;
  purchasePackageByCard: (packageId: string, packageName: string, price: number, days: number, activationDate?: Date) => boolean;
  tickets: number;
  purchaseTickets: (count: number, price: number, title?: string) => boolean;
  hasActivePackage: () => boolean;
  isModuleUnlocked: (moduleId: string) => boolean;
  activatePackageNow: () => void;
  cart: CartItem[];
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  checkoutByBalance: (deliveryAddress: string, method: DeliveryMethod) => boolean;
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (m: DeliveryMethod) => void;
  checkoutByCard: (deliveryAddress: string, method: DeliveryMethod) => boolean;
  examResults: StoredExamResult[];
  addExamResult: (type: ExamType, score: number, total: number, timeSpent: number, weakTopics: string[], details?: any) => void;
  appeals: Appeal[];
  submitAppeal: (formData: AppealFormData) => boolean;
  getAppealsByStatus: (status?: string) => Appeal[];
  // Q&A Chat System (WhatsApp-like)
  qaChats: QAChat[];
  qaUsers: { [key: string]: QAUser };
  qaTeachers: QAUser[];
  startNewChat: (subject: string, category: string, teacherId?: string) => string | null;
  sendMessage: (chatId: string, content: string, attachments?: string[], messageType?: 'text' | 'image' | 'file') => boolean;
  getChatById: (id: string) => QAChat | undefined;
  markChatAsRead: (chatId: string) => void;
  getActiveChatsList: () => QAChat[];
  // School Subjects API
  schoolSubjects: SchoolSubject[];
  schoolSubjectsLoading: boolean;
  schoolSubjectsError: string | null;
  loadSchoolSubjects: () => Promise<void>;
  refreshSchoolSubjects: () => Promise<void>;
  updateSubjectProgress: (subjectId: string, progress: number) => void;
  isSubjectUnlocked: (subject: SchoolSubject) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('az');
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [currentTab, setCurrentTab] = useState('Home');
  const [navigationStack, setNavigationStack] = useState<NavigationScreen[]>([
    { screen: 'Home', params: {} }
  ]);
  const [moreSheetVisible, setMoreSheetVisible] = useState(false);
  const [balance, setBalance] = useState(100); // Demo account starts with 100 AZN
  const [simulatorBalance, setSimulatorBalance] = useState(5); // Demo starts with 5 simulator tickets
  const [tickets, setTickets] = useState(3); // Demo starts with 3 tickets
  const [activePackage, setActivePackage] = useState<UserPackage | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('locker');
  const [examResults, setExamResults] = useState<StoredExamResult[]>([
    // Demo data
    {
      id: '1',
      type: 'simulator',
      score: 28,
      total: 30,
      timeSpent: 25 * 60,
      weakTopics: ['M1', 'M5'],
      date: new Date('2025-09-10T14:30:00'),
      passed: true,
      details: {}
    },
    {
      id: '2',
      type: 'tickets',
      score: 18,
      total: 20,
      timeSpent: 15 * 60,
      weakTopics: ['M8'],
      date: new Date('2025-09-09T10:15:00'),
      passed: true,
      details: { ticketNumber: 5 }
    },
    {
      id: '3',
      type: 'topics',
      score: 9,
      total: 10,
      timeSpent: 8 * 60,
      weakTopics: [],
      date: new Date('2025-09-08T16:45:00'),
      passed: true,
      details: { moduleId: '8ci' }
    },
    {
      id: '4',
      type: 'tickets',
      score: 6,
      total: 20,
      timeSpent: 20 * 60,
      weakTopics: ['M1', 'M3', 'M15'],
      date: new Date('2025-09-05T09:00:00'),
      passed: false,
      details: { ticketNumber: 12 }
    },
    {
      id: '5',
      type: 'topics',
      score: 7,
      total: 10,
      timeSpent: 12 * 60,
      weakTopics: ['M19', 'M23'],
      date: new Date('2025-09-03T11:30:00'),
      passed: false,
      details: { moduleId: '15ci' }
    }
  ]);
  
  const [appeals, setAppeals] = useState<Appeal[]>([
    // Demo appeals data
    {
      id: '1',
      code: 'A4K7X',
      questionId: '1',
      questionText: 'Yol nişanları nə vaxt tətbiq edilir?',
      questionOptions: [
        { id: 'a1', text: 'Həmişə' },
        { id: 'a2', text: 'Yalnız gecə' },
        { id: 'a3', text: 'Yalnız gündüz' },
        { id: 'a4', text: 'Yol şəraitindən asılı olaraq' }
      ],
      questionCorrectOptionId: 'a4',
      questionExplanation: 'Yol nişanları yol şəraitindən asılı olaraq müxtəlif vaxtlarda tətbiq edilir. Bəzi nişanlar həmişə, bəziləri isə müəyyən şəraitdə tətbiq edilir.',
      questionSource: 'ticket',
      questionSourceId: '5',
      userComment: 'Bu sualda bəzi nişanların tətbiq vaxtı dəqiq göstərilməyib. Daha aydın olmalıdır.',
      status: 'accepted',
      submittedDate: new Date('2025-01-15T10:30:00'),
      reviewedDate: new Date('2025-01-16T14:20:00'),
      adminResponse: 'Sual yenidən nəzərdən keçirildi və daha aydın şəkildə yenidən yazıldı. Təşəkkürlər.',
      adminName: 'Admin Əli',
      isResolved: true
    },
    {
      id: '2',
      code: 'B9M2T',
      questionId: '2',
      questionText: 'Bu nişan nə deməkdir?',
      questionImageUrl: '/public/image.png',
      questionOptions: [
        { id: 'b1', text: 'Sürət məhdudiyyəti' },
        { id: 'b2', text: 'Dayanma qadağandır' },
        { id: 'b3', text: 'Sağa dönmək qadağandır' },
        { id: 'b4', text: 'Sol dönmək qadağandır' }
      ],
      questionCorrectOptionId: 'b1',
      questionExplanation: 'Bu nişan sürət məhdudiyyətini göstərir. Sürücü bu nişanı gördükdə sürətini məhdudlaşdırmalıdır.',
      questionSource: 'ticket',
      questionSourceId: '12',
      userComment: 'Bu sualda şəhər daxilində sürət məhdudiyyəti haqqında məlumat natamamdır.',
      status: 'under_review',
      submittedDate: new Date('2025-01-14T16:45:00'),
      isResolved: false
    },
    {
      id: '3',
      code: 'C5N8P',
      questionId: '3',
      questionText: 'Park etmək qadağandır nişanı nə deməkdir?',
      questionOptions: [
        { id: 'c1', text: 'Park etmək icazə verilir' },
        { id: 'c2', text: 'Park etmək qadağandır' },
        { id: 'c3', text: 'Yalnız yük maşınları park edə bilər' },
        { id: 'c4', text: 'Yalnız avtobuslar park edə bilər' }
      ],
      questionCorrectOptionId: 'c2',
      questionExplanation: 'Park etmək qadağandır nişanı o sahədə avtomobil park etməyin qadağan olduğunu göstərir.',
      questionSource: 'topic',
      questionSourceId: 'M8',
      userComment: 'Bu sualda park etmək qadağandır nişanının tətbiq sahəsi dəqiq göstərilməyib.',
      status: 'rejected',
      submittedDate: new Date('2025-01-13T09:15:00'),
      reviewedDate: new Date('2025-01-13T11:30:00'),
      adminResponse: 'Sual düzgündür və qaydalara uyğundur. Əlavə dəyişiklik tələb olunmur.',
      adminName: 'Admin Leyla',
      isResolved: true
    },
    {
      id: '4',
      code: 'D1Q6R',
      questionId: '4',
      questionText: 'Yol keçidində piyadalar üçün nə vaxt dayanmaq lazımdır?',
      questionImageUrl: '/public/image copy.png',
      questionOptions: [
        { id: 'd1', text: 'Həmişə' },
        { id: 'd2', text: 'Piyadalar yol keçidində olduqda' },
        { id: 'd3', text: 'Yalnız qırmızı işıqda' },
        { id: 'd4', text: 'Heç vaxt' }
      ],
      questionCorrectOptionId: 'b2',
      questionExplanation: 'Sürücü piyadaların yol keçidində olduğunu gördükdə dayanmalıdır və onların keçməsini gözləməlidir.',
      questionSource: 'simulator',
      userComment: 'Bu sualda piyadaların yol keçidində olması halında dayanma vaxtı dəqiq göstərilməyib.',
      status: 'pending',
      submittedDate: new Date('2025-01-12T14:20:00'),
      isResolved: false
    },
    {
      id: '5',
      code: 'E3V7W',
      questionId: '5',
      questionText: 'Bu yol nişanı nə mənasını verir?',
      questionImageUrl: '/public/book-1.svg',
      questionOptions: [
        { id: 'e1', text: 'Sağa dönmək icazə verilir' },
        { id: 'e2', text: 'Sola dönmək icazə verilir' },
        { id: 'e3', text: 'Düz getmək icazə verilir' },
        { id: 'e4', text: 'Geri dönmək icazə verilir' }
      ],
      questionCorrectOptionId: 'e1',
      questionExplanation: 'Bu nişan sağa dönməyin icazə verildiyini göstərir. Sürücü bu nişanı gördükdə sağa dönə bilər.',
      questionSource: 'topic',
      questionSourceId: 'M15',
      userComment: 'Bu nişanın mənası dəqiq göstərilməyib. Daha aydın izah olmalıdır.',
      status: 'accepted',
      submittedDate: new Date('2025-01-11T08:30:00'),
      reviewedDate: new Date('2025-01-11T15:45:00'),
      adminResponse: 'Nişanın mənası əlavə edildi və daha aydın şəkildə izah edildi.',
      adminName: 'Admin Rəşad',
      isResolved: true
    }
  ]);

  // Q&A Chat System State
  const [qaUsers] = useState<{ [key: string]: QAUser }>({
    'current': { id: 'current', name: 'Siz', role: 'student', avatar: '😊', isOnline: true },
    'teacher1': { id: 'teacher1', name: 'Müəllim Səbinə', role: 'teacher', avatar: '👩‍🏫', isOnline: true, lastSeen: new Date() },
    'teacher2': { id: 'teacher2', name: 'Müəllim Ramil', role: 'teacher', avatar: '👨‍🏫', isOnline: false, lastSeen: new Date(Date.now() - 30 * 60 * 1000) },
    'teacher3': { id: 'teacher3', name: 'Müəllim Aysel', role: 'teacher', avatar: '👩‍🏫', isOnline: true, lastSeen: new Date() },
    'teacher4': { id: 'teacher4', name: 'Müəllim Elşad', role: 'teacher', avatar: '👨‍🏫', isOnline: false, lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000) }
  });

  const [qaTeachers] = useState<QAUser[]>([
    { id: 'teacher1', name: 'Müəllim Səbinə', role: 'teacher', avatar: '👩‍🏫', isOnline: true },
    { id: 'teacher2', name: 'Müəllim Ramil', role: 'teacher', avatar: '👨‍🏫', isOnline: false },
    { id: 'teacher3', name: 'Müəllim Aysel', role: 'teacher', avatar: '👩‍🏫', isOnline: true },
    { id: 'teacher4', name: 'Müəllim Elşad', role: 'teacher', avatar: '👨‍🏫', isOnline: false }
  ]);

  // School Subjects API State
  const [schoolSubjects, setSchoolSubjects] = useState<SchoolSubject[]>([]);
  const [schoolSubjectsLoading, setSchoolSubjectsLoading] = useState<boolean>(false);
  const [schoolSubjectsError, setSchoolSubjectsError] = useState<string | null>(null);

  const [qaChats, setQaChats] = useState<QAChat[]>([
    {
      id: 'chat1',
      studentId: 'current',
      teacherId: 'teacher1',
      subject: 'Şəhər daxilində sürət məhdudiyyəti',
      category: 'traffic-rules',
      createdAt: new Date('2025-01-15T10:30:00'),
      updatedAt: new Date('2025-01-15T16:45:00'),
      isActive: true,
      unreadCount: 0,
      teacherAssigned: true,
      messages: [
        {
          id: 'm1',
          senderId: 'current',
          content: 'Salam müəllim! Şəhər daxilində sürət məhdudiyyəti 50 km/s-dir, amma bəzi yerlərdə 60 km/s göstərilir. Bu necə başa düşməli?',
          timestamp: new Date('2025-01-15T10:30:00'),
          messageType: 'text',
          isRead: true
        },
        {
          id: 'm2',
          senderId: 'teacher1',
          content: 'Salam! Bu çox yaxşı sualdır. Şəhər daxilində ümumi sürət məhdudiyyəti 50 km/s-dir, lakin bəzi magistral yollarda və geniş küçələrdə xüsusi nişanlarla 60 km/s icazə verilir.',
          timestamp: new Date('2025-01-15T14:20:00'),
          messageType: 'text',
          isRead: true
        },
        {
          id: 'm3',
          senderId: 'current',
          content: 'Təşəkkürlər! Yəni əsas qayda odur ki, əgər nişanla başqa sürət göstərilirsə, onu izləməliyik?',
          timestamp: new Date('2025-01-15T15:30:00'),
          messageType: 'text',
          isRead: true
        },
        {
          id: 'm4',
          senderId: 'teacher1',
          content: 'Düz dedin! Yol nişanları həmişə prioritetdir. Həmişə yol nişanlarına diqqət yetirin.',
          timestamp: new Date('2025-01-15T16:45:00'),
          messageType: 'text',
          isRead: true
        }
      ]
    },
    {
      id: 'chat2', 
      studentId: 'current',
      teacherId: 'teacher2',
      subject: 'Park etmə qaydaları',
      category: 'parking',
      createdAt: new Date('2025-01-14T16:45:00'),
      updatedAt: new Date('2025-01-14T17:30:00'),
      isActive: true,
      unreadCount: 1,
      teacherAssigned: true,
      messages: [
        {
          id: 'm5',
          senderId: 'current',
          content: 'Park etmək qadağandır nişanı neçə metr ərzində təsir edir?',
          timestamp: new Date('2025-01-14T16:45:00'),
          messageType: 'text',
          isRead: true
        },
        {
          id: 'm6',
          senderId: 'teacher2',
          content: 'Bu nişan növbəti nişana qədər və ya yolun sonuna qədər keçərlidir. Adətən əlavə lövhə ilə məsafə göstərilir.',
          timestamp: new Date('2025-01-14T17:30:00'),
          messageType: 'text',
          isRead: false
        }
      ]
    },
    {
      id: 'chat3',
      studentId: 'current',
      subject: 'İmtahan həyəcanı',
      category: 'exam-prep',
      createdAt: new Date('2025-01-13T09:15:00'),
      updatedAt: new Date('2025-01-13T09:15:00'),
      isActive: true,
      unreadCount: 0,
      teacherAssigned: false,
      messages: [
        {
          id: 'm7',
          senderId: 'current',
          content: 'İmtahan zamanı çox həyəcanlanıram və səhv cavablar verirəm. Bu vəziyyətdə nə etməli?',
          timestamp: new Date('2025-01-13T09:15:00'),
          messageType: 'text',
          isRead: false
        }
      ]
    }
  ]);
  
  // Determine if dark mode should be active
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const t = dictionaries[language];
  
  const navigate = (screen: string, params = {}) => {
    setNavigationStack(prev => [...prev, { screen, params }]);
  };
  
  const goBack = () => {
    setNavigationStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };
  
  const switchTab = (tab: string) => {
    setCurrentTab(tab);
    setNavigationStack([{ screen: tab, params: {} }]);
  };
  
  const purchasePackage = (packageId: string, packageName: string, price: number, days: number, activationDate?: Date): boolean => {
    if (balance < price) {
      return false; // Insufficient balance
    }
    
    const purchaseDate = new Date();
    const activation = activationDate ? new Date(activationDate) : new Date();
    const expiryDate = new Date(activation);
    expiryDate.setDate(activation.getDate() + days);
    
    const newPackage: UserPackage = {
      id: packageId,
      name: packageName,
      price,
      days,
      activationDate: activation,
      purchaseDate,
      expiryDate
    };
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'purchase',
      amount: price,
      description: `${packageName} paketi (${days} gün)`,
      date: purchaseDate
    };
    
    setBalance(prev => prev - price);
    setActivePackage(newPackage);
    setTransactions(prev => [transaction, ...prev]);
    
    return true;
  };

  const purchaseTickets = (count: number, price: number, title: string = 'İmtahan bileti'): boolean => {
    if (balance < price) {
      return false;
    }
    const purchaseDate = new Date();
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'purchase',
      amount: price,
      description: `${title} (${count} ədəd)`,
      date: purchaseDate
    };
    setBalance(prev => prev - price);
    setTickets(prev => prev + count);
    setTransactions(prev => [transaction, ...prev]);
    return true;
  };

  // Card payment simulation: does not deduct balance, but activates package and records a transaction
  const purchasePackageByCard = (packageId: string, packageName: string, price: number, days: number, activationDate?: Date): boolean => {
    const purchaseDate = new Date();
    const activation = activationDate ? new Date(activationDate) : new Date();
    const expiryDate = new Date(activation);
    expiryDate.setDate(activation.getDate() + days);
    const newPackage: UserPackage = {
      id: packageId,
      name: packageName,
      price,
      days,
      activationDate: activation,
      purchaseDate,
      expiryDate
    };
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'purchase',
      amount: price,
      description: `${packageName} paketi (${days} gün) • Kart`,
      date: purchaseDate
    };
    setActivePackage(newPackage);
    setTransactions(prev => [transaction, ...prev]);
    return true;
  };
  
  const hasActivePackage = (): boolean => {
    if (!activePackage) return false;
    const now = new Date();
    return now >= activePackage.activationDate && now < activePackage.expiryDate;
  };
  
  const isModuleUnlocked = (moduleId: string): boolean => {
    // Modules 8 and 11 are always free
    if (moduleId === 'M8' || moduleId === 'M11') {
      return true;
    }
    
    // All other modules require active package
    return hasActivePackage();
  };
  
  const activatePackageNow = (): void => {
    if (!activePackage) return;
    const now = new Date();
    const newExpiry = new Date(now);
    newExpiry.setDate(now.getDate() + activePackage.days);
    setActivePackage({ ...activePackage, activationDate: now, expiryDate: newExpiry });
  };

  const addExamResult = (type: ExamType, score: number, total: number, timeSpent: number, weakTopics: string[], details: any = {}): void => {
    const newResult: StoredExamResult = {
      id: Date.now().toString(),
      type,
      score,
      total,
      timeSpent,
      weakTopics,
      date: new Date(),
      passed: score >= Math.ceil(total * 0.8),
      details
    };
    setExamResults(prev => [newResult, ...prev]);
  };

  // Generate unique 5-character code (letters + numbers)
  const generateAppealCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const submitAppeal = (formData: AppealFormData): boolean => {
    try {
      const newAppeal: Appeal = {
        id: Date.now().toString(),
        code: generateAppealCode(),
        questionId: formData.questionId,
        questionText: formData.questionText,
        questionImageUrl: formData.questionImageUrl,
        questionOptions: [],
        questionCorrectOptionId: '',
        questionExplanation: '',
        questionSource: formData.questionSource,
        questionSourceId: formData.questionSourceId,
        userComment: formData.userComment,
        status: 'pending',
        submittedDate: new Date(),
        isResolved: false
      };
      setAppeals(prev => [newAppeal, ...prev]);
      return true;
    } catch {
      return false;
    }
  };

  const getAppealsByStatus = (status?: string): Appeal[] => {
    if (!status) return appeals;
    return appeals.filter(appeal => appeal.status === status);
  };

  // Q&A Chat System Functions
  const startNewChat = (subject: string, category: string, teacherId?: string): string | null => {
    try {
      const newChat: QAChat = {
        id: `chat_${Date.now()}`,
        studentId: 'current',
        teacherId,
        subject,
        category,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        unreadCount: 0,
        teacherAssigned: !!teacherId,
        messages: []
      };
      setQaChats(prev => [newChat, ...prev]);
      return newChat.id;
    } catch {
      return null;
    }
  };

  const sendMessage = (chatId: string, content: string, attachments?: string[], messageType: 'text' | 'image' | 'file' = 'text'): boolean => {
    try {
      const newMessage: QAMessage = {
        id: `m_${Date.now()}`,
        senderId: 'current',
        content,
        timestamp: new Date(),
        attachments,
        messageType,
        isRead: false
      };

      setQaChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? { 
              ...chat, 
              messages: [...chat.messages, newMessage],
              updatedAt: new Date(),
              lastMessage: newMessage
            }
          : chat
      ));
      return true;
    } catch {
      return false;
    }
  };

  const getChatById = (id: string): QAChat | undefined => {
    return qaChats.find(chat => chat.id === id);
  };

  const markChatAsRead = (chatId: string): void => {
    setQaChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, unreadCount: 0 }
        : chat
    ));
  };

  const getActiveChatsList = (): QAChat[] => {
    return qaChats.filter(chat => chat.isActive).sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  };

  // School Subjects Functions
  const loadSchoolSubjects = async (): Promise<void> => {
    // Əvvəlcə cache yoxlayırıq
    const cached = getCachedSubjects();
    if (cached && cached.length > 0) {
      setSchoolSubjects(cached);
      return;
    }

    setSchoolSubjectsLoading(true);
    setSchoolSubjectsError(null);

    try {
      const subjects = await fetchSchoolSubjects();
      
      // Hierarxik strukturu qururuq (əgər lazımdırsa)
      // Lakin flat list də işləyir
      const flatSubjects = flattenSubjectHierarchy(subjects);
      
      setSchoolSubjects(flatSubjects);
      setCachedSubjects(flatSubjects);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Naməlum xəta baş verdi';
      setSchoolSubjectsError(errorMessage);
      console.error('Mövzular yüklənmədi:', error);
    } finally {
      setSchoolSubjectsLoading(false);
    }
  };

  const refreshSchoolSubjects = async (): Promise<void> => {
    // Cache-i təmizləyirik və yenidən yükləyirik
    setSchoolSubjectsLoading(true);
    setSchoolSubjectsError(null);

    try {
      const subjects = await fetchSchoolSubjects();
      const flatSubjects = flattenSubjectHierarchy(subjects);
      
      setSchoolSubjects(flatSubjects);
      setCachedSubjects(flatSubjects);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Naməlum xəta baş verdi';
      setSchoolSubjectsError(errorMessage);
      console.error('Mövzular yenilənmədi:', error);
    } finally {
      setSchoolSubjectsLoading(false);
    }
  };

  const updateSubjectProgress = (subjectId: string, progress: number): void => {
    // LocalStorage-a saxlayırıq
    saveSubjectProgress(subjectId, progress);
    
    // State-i yeniləyirik
    setSchoolSubjects(prev => 
      prev.map(subject => 
        subject.id === subjectId 
          ? { ...subject, progress } 
          : subject
      )
    );
  };

  const isSubjectUnlocked = (subject: SchoolSubject): boolean => {
    // Əgər demo mövzudursa, həmişə açıqdır
    if (subject.is_demo) {
      return true;
    }
    
    // Aktiv paket varsa, bütün mövzular açıqdır
    return hasActivePackage();
  };

  // Component mount olduqda mövzuları yükləyirik
  useEffect(() => {
    loadSchoolSubjects();
  }, []);
  
  const currentScreen = navigationStack[navigationStack.length - 1];

  // Cart helpers
  type CartItem = { productId: string; qty: number };
  const addToCart = (productId: string, qty: number = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i.productId === productId);
      if (exists) {
        return prev.map(i => i.productId === productId ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { productId, qty }];
    });
  };
  const removeFromCart = (productId: string) => setCart(prev => prev.filter(i => i.productId !== productId));
  const updateCartQty = (productId: string, qty: number) => setCart(prev => prev.map(i => i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i));
  const clearCart = () => setCart([]);
  const checkoutByBalance = (deliveryAddress: string, method: DeliveryMethod): boolean => {
    // Simple balance deduction based on mock prices found in products module at runtime
    try {
      const { STORE_PRODUCTS } = require('../lib/products');
      const getDeliveryFee = (m: DeliveryMethod): number => {
        switch (m) {
          case 'locker': return 2.5; // Kargomat
          case 'courier': return 5;  // Kuryerlə
          case 'post': return 3;     // Poçtla
          default: return 0;
        }
      };
      const subtotal = cart.reduce((sum: number, item: CartItem) => {
        const p = STORE_PRODUCTS.find((x: any) => x.id === item.productId);
        if (!p) return sum;
        const price = p.discountPercent ? Math.round((p.price * (100 - p.discountPercent))) / 100 : p.price;
        return sum + price * item.qty;
      }, 0);
      const fee = getDeliveryFee(method);
      const total = subtotal + fee;
      if (total <= 0) return false;
      if (balance < total) return false;
      const trans: Transaction = {
        id: Date.now().toString(),
        type: 'purchase',
        amount: total,
        description: `Mağaza sifarişi • ${cart.length} məhsul • Çatdırılma: ${deliveryAddress} • Üsul: ${method}`,
        date: new Date(),
      };
      setBalance(prev => prev - total);
      setTransactions(prev => [trans, ...prev]);
      clearCart();
      return true;
    } catch {
      return false;
    }
  };

  // Card checkout simulation (same as balance, but does not change balance)
  const checkoutByCard = (deliveryAddress: string, method: DeliveryMethod): boolean => {
    try {
      const { STORE_PRODUCTS } = require('../lib/products');
      const getDeliveryFee = (m: DeliveryMethod): number => {
        switch (m) {
          case 'locker': return 2.5;
          case 'courier': return 5;
          case 'post': return 3;
          case 'pickup': return 0;
          default: return 0;
        }
      };
      const subtotal = cart.reduce((sum: number, item: any) => {
        const p = STORE_PRODUCTS.find((x: any) => x.id === item.productId);
        if (!p) return sum;
        const price = p.discountPercent ? Math.round((p.price * (100 - p.discountPercent))) / 100 : p.price;
        return sum + price * item.qty;
      }, 0);
      const total = subtotal + getDeliveryFee(method);
      if (total <= 0) return false;
      const transaction: Transaction = {
        id: Date.now().toString(),
        type: 'purchase',
        amount: total,
        description: `Kartla • ${cart.length} məhsul • Çatdırılma: ${deliveryAddress} • Üsul: ${method}`,
        date: new Date()
      };
      setTransactions(prev => [transaction, ...prev]);
      clearCart();
      return true;
    } catch {
      return false;
    }
  };
  
  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      theme,
      setTheme,
      isDarkMode,
      t,
      currentTab,
      currentScreen,
      navigate,
      goBack,
      switchTab,
      moreSheetVisible,
      setMoreSheetVisible,
      balance,
      simulatorBalance,
      tickets,
      activePackage,
      transactions,
      purchasePackage,
      purchasePackageByCard,
      purchaseTickets,
      hasActivePackage,
      isModuleUnlocked,
      activatePackageNow
      , cart, addToCart, removeFromCart, updateCartQty, clearCart, checkoutByBalance
      , checkoutByCard
      , deliveryMethod, setDeliveryMethod
      , examResults, addExamResult
      , appeals, submitAppeal, getAppealsByStatus
      , qaChats, qaUsers, qaTeachers, startNewChat, sendMessage, getChatById, markChatAsRead, getActiveChatsList
      , schoolSubjects, schoolSubjectsLoading, schoolSubjectsError, loadSchoolSubjects, refreshSchoolSubjects, updateSubjectProgress, isSubjectUnlocked
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}