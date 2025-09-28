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

// Q&A System Types
export interface QAUser {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  avatar?: string;
}

export interface QAMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  attachments?: string[];
  isAnswer?: boolean;
}

export interface QAQuestion {
  id: string;
  authorId: string;
  title: string;
  content: string;
  tags: string[];
  category: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
  status: 'open' | 'answered' | 'closed';
  viewCount: number;
  likeCount: number;
  isLiked?: boolean;
  messages: QAMessage[];
  teacherAssigned?: string;
}