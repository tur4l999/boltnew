import React from 'react';
import {
  Home,
  BookOpen,
  Beaker,
  ShoppingBag,
  Plus,
  Bell,
  Bot,
  Globe,
  PlayCircle,
  PencilLine,
  FileText,
  Banknote,
  ScrollText,
  Package,
  Crown,
  Clock3,
  Play,
  HelpCircle,
  Settings as SettingsIcon,
  AlertTriangle,
  Trash2,
  Shield,
  Phone,
  User,
  Lock,
  RefreshCw,
  Smartphone,
  CreditCard,
  Landmark,
  Zap,
  Target,
  Check,
  ShoppingCart,
  Trophy,
  Car,
  MessageCircleQuestion,
  Info,
  Wifi,
  Sparkles,
  Unlock,
  ClipboardList,
  GraduationCap,
  Square
} from 'lucide-react';

const ICONS = {
  home: Home,
  topics: BookOpen,
  exam: Beaker,
  store: ShoppingBag,
  more: Plus,
  bell: Bell,
  assistant: Bot,
  language: Globe,
  video: PlayCircle,
  onlineLesson: Wifi,
  quick: PencilLine,
  tests: FileText,
  fines: Banknote,
  articles: ScrollText,
  package: Package,
  crown: Crown,
  clock: Clock3,
  play: Play,
  question: HelpCircle,
  settings: SettingsIcon,
  alert: AlertTriangle,
  trash: Trash2,
  shield: Shield,
  phone: Phone,
  user: User,
  lock: Lock,
  unlock: Unlock,
  refresh: RefreshCw,
  mobile: Smartphone,
  creditCard: CreditCard,
  bank: Landmark,
  lightning: Zap,
  target: Target,
  check: Check,
  cart: ShoppingCart,
  trophy: Trophy,
  car: Car,
  message: MessageCircleQuestion,
  info: Info,
  sparkles: Sparkles,
  clipboard: ClipboardList,
  graduationCap: GraduationCap
} as const;

export type AppIconName = keyof typeof ICONS;

interface AppIconProps {
  name: AppIconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function AppIcon({ name, size = 18, strokeWidth = 2, className = '' }: AppIconProps) {
  const Icon = (ICONS as Record<string, React.ComponentType<any>>)[name] || Square;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} aria-hidden />;
}

