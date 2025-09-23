import { 
  Home, 
  BookOpen, 
  TestTube, 
  ShoppingBag, 
  Plus,
  Star,
  Bell,
  Globe,
  User,
  Bot,
  Check,
  X,
  Image,
  CreditCard,
  Smartphone,
  Building2,
  Shield,
  Zap,
  Target,
  Lock,
  Unlock,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Folder,
  FileText,
  ShoppingCart,
  AlertTriangle,
  Lightbulb,
  Settings,
  LogOut,
  Palette,
  Sun,
  Moon,
  UserCircle,
  Trash2,
  RotateCcw,
  HelpCircle,
  Phone,
  MessageCircle,
  Info,
  Trophy,
  Car,
  Search,
  Calendar,
  Clock,
  Users,
  MapPin,
  Play,
  Video,
  PenTool,
  BarChart3,
  Clipboard,
  Gift,
  Flame,
  Rocket,
  CheckCircle,
  Eye,
  EyeOff,
  Menu,
  Bookmark,
  Download,
  Upload,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Wifi,
  Battery,
  Signal,
  Camera,
  Mic,
  MicOff,
  Headphones,
  Speaker,
  Calculator
} from 'lucide-react';

// Comprehensive emoji to icon mapping
export const emojiToIcon = {
  // Navigation & Basic
  '🏠': Home,
  '📚': BookOpen,
  '🧪': TestTube,
  '🛍️': ShoppingBag,
  '➕': Plus,
  '⭐': Star,
  '★': Star,
  '☆': Star,
  '🔔': Bell,
  '🌐': Globe,
  '👤': User,
  '🤖': Bot,
  
  // Actions & Status
  '✅': Check,
  '✓': Check,
  '❌': X,
  '✕': X,
  '🖼️': Image,
  '💳': CreditCard,
  '📱': Smartphone,
  '🏦': Building2,
  '🔒': Lock,
  '🔓': Unlock,
  '🛡️': Shield,
  '⚡': Zap,
  '🎯': Target,
  '✨': Sparkles,
  
  // Navigation arrows & controls
  '▼': ChevronDown,
  '▶': ChevronRight,
  '◀': ChevronLeft,
  '→': ArrowRight,
  '←': ArrowLeft,
  '↑': ArrowUp,
  '↓': ArrowDown,
  
  // Files & Content
  '📁': Folder,
  '📄': FileText,
  '📋': Clipboard,
  '📖': BookOpen,
  '📘': BookOpen,
  '📜': FileText,
  '🗒️': FileText,
  
  // Commerce & Shopping
  '🛒': ShoppingCart,
  '🎁': Gift,
  
  // Alerts & Status
  '⚠️': AlertTriangle,
  '💡': Lightbulb,
  '🔥': Flame,
  '🚀': Rocket,
  
  // Settings & Tools
  '⚙️': Settings,
  '🎨': Palette,
  '☀️': Sun,
  '🌙': Moon,
  '🗑️': Trash2,
  '🔄': RotateCcw,
  '🚪': LogOut,
  
  // Help & Support
  '❓': HelpCircle,
  '📞': Phone,
  '💬': MessageCircle,
  'ℹ️': Info,
  
  // Achievement & Progress
  '🏆': Trophy,
  '🎖️': Trophy,
  '🥇': Trophy,
  
  // Transportation & Practice
  '🚗': Car,
  '🚦': Target, // Traffic light as target/practice
  
  // Search & Discovery
  '🔎': Search,
  '🔍': Search,
  
  // Time & Calendar
  '📅': Calendar,
  '📆': Calendar,
  '⏱️': Clock,
  '⏰': Clock,
  
  // People & Social
  '👨‍🏫': Users, // Teacher as users/group
  '👋': User, // Wave as user greeting
  '👁️': Eye,
  '🙈': EyeOff,
  
  // Interface Elements
  '☰': Menu,
  '📌': MapPin,
  '🔴': Play, // Red circle as play/live
  '🎬': Video,
  '🎥': Video,
  
  // Academic & Learning
  '📊': BarChart3,
  '📈': BarChart3,
  '🧮': Calculator,
  '🔬': Search, // Microscope as research/search
  '🏗️': Settings, // Construction as tools/settings
  '💼': ShoppingBag, // Briefcase as business/store
  
  // Miscellaneous
  '🎪': Sparkles, // Circus as fun/sparkles
  '🎭': Palette, // Theater masks as art/design
  '🎮': Settings, // Game controller as interactive settings
  '🌟': Star,
  '💫': Sparkles,
  '🔮': Sparkles, // Crystal ball as magic/sparkles
  '〰️': Menu, // Wavy dash as menu lines
  '🛠️': Settings, // Tools as settings
};

// Get icon component by emoji
export const getIconByEmoji = (emoji: string) => {
  return emojiToIcon[emoji as keyof typeof emojiToIcon] || Settings; // Default fallback
};

// Common icon sizes for consistent usage
export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

// Icon variants with consistent styling
export const getIconProps = (size: keyof typeof iconSizes = 'md', className?: string) => ({
  size: iconSizes[size],
  className: className || '',
  strokeWidth: 2,
});