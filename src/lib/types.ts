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

export interface Product {
  id: string;
  title: string;
  price: number;
  image?: string;
  description?: string;
}

export interface ProductVariation {
  id: string;
  name: string;
  priceDelta?: number;
}

export type DeliveryMethod = 'post' | 'locker' | 'courier' | 'pickup';

export type PickupLocation = 'Bakıxanov Mall' | '4 saylı DOST mərkəzi';

export interface CartItem {
  id: string; // unique cart item id
  productId: string;
  title: string;
  unitPrice: number; // base price + variation delta already applied
  image?: string;
  variationId?: string;
  variationName?: string;
  quantity: number;
}

export interface CartTotals {
  subTotal: number;
  deliveryFee: number; // can be negative for pickup discount per product handled separately in total
  pickupDiscount: number;
  grandTotal: number;
}