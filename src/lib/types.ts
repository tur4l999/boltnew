export type Language = 'az' | 'ru';

export interface NavigationScreen {
  screen: string;
  params: Record<string, any>;
}

export interface Module {
  id: string;
  title: string;
  progress: number;
  description?: string;
}

// API-dən gələn SchoolSubject strukturu
export interface SchoolSubject {
  id: string; // UUID
  name: string; // Ad
  parent?: string | null; // Ana mövzu UUID (nullable)
  description?: string | null; // Təsvir (nullable)
  is_demo: boolean; // Demo - qeyri-tələbələr üçün
  is_passed?: string; // readonly
  children?: SchoolSubject[]; // recursive
  progress?: number; // Frontend üçün əlavə
  video_url?: string; // Video URL (əgər varsa)
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  moduleId: string;
  text: string;
  imageUrl?: string;
  videoUrl?: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
}

export interface ExamConfig {
  mode: 'mixed' | string;
  questionsCount: number;
  timeLimit?: number;
}

export interface ExamResult {
  score: number;
  total: number;
  timeSpent: number;
  weakTopics: string[];
}

export type ExamType = 'tickets' | 'topics' | 'simulator' | 'final';

export interface StoredExamResult {
  id: string;
  type: ExamType;
  score: number;
  total: number;
  timeSpent: number;
  weakTopics: string[];
  date: Date;
  passed: boolean;
  details?: {
    moduleId?: string;
    ticketNumber?: number;
    questions?: string[];
    userAnswers?: Record<string, string>; // questionId -> selectedOptionId
  };
}

export interface Product {
  id: string;
  title: string;
  price: number;
  image?: string;
  description?: string;
}

export type AppealStatus = 'pending' | 'under_review' | 'accepted' | 'rejected' | 'resolved';

export interface Appeal {
  id: string;
  code: string; // Unique 5-character code (letters + numbers)
  questionId: string;
  questionText: string;
  questionImageUrl?: string;
  questionOptions: QuestionOption[];
  questionCorrectOptionId: string;
  questionExplanation: string;
  questionSource: 'ticket' | 'topic' | 'simulator';
  questionSourceId?: string; // ticket number or topic/module ID
  userComment: string;
  status: AppealStatus;
  submittedDate: Date;
  reviewedDate?: Date;
  adminResponse?: string;
  adminName?: string;
  isResolved: boolean;
}

export interface AppealFormData {
  questionId: string;
  questionText: string;
  questionImageUrl?: string;
  questionSource: 'ticket' | 'topic' | 'simulator';
  questionSourceId?: string;
  userComment: string;
}

// Q&A Chat System Types (WhatsApp-like)
export interface QAUser {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: Date;
}

export interface QAMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  attachments?: string[];
  messageType: 'text' | 'image' | 'file';
  isRead?: boolean;
}

export interface QAChat {
  id: string;
  studentId: string;
  teacherId?: string;
  subject: string; // Sualın mövzusu
  category: string;
  messages: QAMessage[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  unreadCount: number;
  lastMessage?: QAMessage;
  teacherAssigned?: boolean;
}