import React from 'react';
import {
  House,
  Books,
  Flask,
  ShoppingBag as PhShoppingBag,
  Plus,
  Bell,
  Robot,
  Globe,
  PlayCircle,
  PencilSimpleLine,
  FileText,
  Bank,
  Scroll,
  Package,
  Crown,
  Clock,
  Play,
  Question,
  Gear,
  WarningCircle,
  Trash,
  Shield,
  Phone,
  User,
  Lock,
  ArrowCounterClockwise,
  DeviceMobile,
  CreditCard,
  Bank as BankBuilding,
  Lightning,
  Target,
  Check,
  ShoppingCart,
  Trophy,
  Car,
  ChatCircle,
  Info,
  WifiHigh,
  Sparkle,
  LockOpen,
  ClipboardText,
  GraduationCap,
  Radio,
} from 'phosphor-react';

const ICONS = {
  home: House,
  topics: Books,
  exam: Flask,
  store: PhShoppingBag,
  more: Plus,
  bell: Bell,
  assistant: Robot,
  language: Globe,
  video: PlayCircle,
  onlineLesson: Radio,
  quick: PencilSimpleLine,
  tests: FileText,
  fines: Bank,
  articles: Scroll,
  package: Package,
  crown: Crown,
  clock: Clock,
  play: Play,
  question: Question,
  settings: Gear,
  alert: WarningCircle,
  trash: Trash,
  shield: Shield,
  phone: Phone,
  user: User,
  lock: Lock,
  unlock: LockOpen,
  refresh: ArrowCounterClockwise,
  mobile: DeviceMobile,
  creditCard: CreditCard,
  bank: BankBuilding,
  lightning: Lightning,
  target: Target,
  check: Check,
  cart: ShoppingCart,
  trophy: Trophy,
  car: Car,
  message: ChatCircle,
  info: Info,
  sparkles: Sparkle,
  clipboard: ClipboardText,
  graduationCap: GraduationCap
} as const;

export type AppIconName = keyof typeof ICONS;

interface AppIconProps {
  name: AppIconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function AppIcon({ name, size = 18, strokeWidth = 1.25, className = '' }: AppIconProps) {
  const Icon = (ICONS as Record<string, React.ComponentType<any>>)[name] || Info;
  return (
    <Icon
      size={size}
      weight="light"
      className={`text-emerald-600 ${className}`}
      aria-hidden
    />
  );
}

