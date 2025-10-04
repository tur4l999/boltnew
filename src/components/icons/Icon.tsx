import React from 'react';

// Icon component props
interface IconProps {
  name: string;
  size?: number | string;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

// Navigation Icons
const HomeIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BooksIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TestTubeIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10a1 1 0 011-1h4a1 1 0 011 1v1a1 1 0 01-.293.707l-2.414 2.414a1 1 0 00-.293.707V17a1 1 0 01-1 1H11a1 1 0 01-1-1v-2.172a1 1 0 00-.293-.707L7.293 11.707A1 1 0 017 11v-1z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="6" r="2" stroke={color} strokeWidth="2.5" />
  </svg>
);

const ShoppingBagIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10H6L5 9z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Interface Icons
const BellIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RobotIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="11" width="18" height="10" rx="2" stroke={color} strokeWidth="2.5" />
    <circle cx="12" cy="5" r="2" stroke={color} strokeWidth="2.5" />
    <path d="M12 7v4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="9" cy="16" r="1" fill={color} />
    <circle cx="15" cy="16" r="1" fill={color} />
  </svg>
);

const GlobeIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" />
    <path
      d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WaveIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M7 13l3-3 3 3 3-3"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 7C7.5 7 9.5 9 11.5 9s4-2 6-2"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StarIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      fill={color}
    />
  </svg>
);

// Content Icons
const VideoIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DocumentIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TeacherIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 14l9-5-9-5-9 5 9 5z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NotesIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChartIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ScrollIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M10 2v20M14 2v20M4 7l4-4 4 4M20 17l-4 4-4-4"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6h12v12H6V6z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoneyIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Action Icons
const CheckIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const XIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M6 18L18 6M6 6l12 12"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Theme Icons
const SunIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2.5" />
    <path
      d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke={color} strokeWidth="2.5" />
    <path d="M12 18h.01" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// System Icons
const PaletteIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.15-.59-1.56-.36-.41-.59-.94-.59-1.56 0-1.38 1.12-2.5 2.5-2.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6.5" cy="10.5" r="1.5" fill={color} />
    <circle cx="9.5" cy="7.5" r="1.5" fill={color} />
    <circle cx="14.5" cy="7.5" r="1.5" fill={color} />
    <circle cx="17.5" cy="10.5" r="1.5" fill={color} />
  </svg>
);

const RocketIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BoltIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TargetIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" />
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2.5" />
    <circle cx="12" cy="12" r="2" stroke={color} strokeWidth="2.5" />
  </svg>
);

// Additional specialized icons
const CreditCardIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke={color} strokeWidth="2.5" />
    <path d="M1 10h22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const BankIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M3 21h18M12 2l9 5v2H3V7l9-5zM5 10v8M9 10v8M15 10v8M19 10v8"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={color} strokeWidth="2.5" />
    <path d="M7 11V7a5 5 0 0110 0v4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RefreshIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M1 4v6h6M23 20v-6h-6"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const QuestionIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" />
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 17h.01" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ContactIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChatIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" />
    <path d="M12 16v-4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 8h.01" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SettingsIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2.5" />
    <path
      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HelpIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" />
    <path d="M12 6v6l4 2" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarningIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 9v4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 17h.01" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PackageIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrophyIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 9h12v3a6 6 0 11-12 0V9zM12 18v3"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8 21h8" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CarIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    {/* Təkərlər */}
    <circle cx="7" cy="17" r="2" stroke={color} strokeWidth="2.5" fill="none" />
    <circle cx="17" cy="17" r="2" stroke={color} strokeWidth="2.5" fill="none" />
    
    {/* Maşın kuzovu - yandan görünüş */}
    <path
      d="M3 12h2l2-4h8l3 4h2v3a1 1 0 0 1-1 1h-1a3 3 0 0 0-6 0H9a3 3 0 0 0-6 0H2a1 1 0 0 1-1-1v-3z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Pəncərələr */}
    <path
      d="M7 8h6l2 2H9l-2-2z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Qapı xətti */}
    <path
      d="M12 8v4"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WalletIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M21 12V7H5a2 2 0 010-4h14v4"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 5v14a2 2 0 002 2h16v-5"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 12a2 2 0 012 2v2a2 2 0 01-2 2"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ImageIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2.5" />
    <circle cx="8.5" cy="8.5" r="1.5" stroke={color} strokeWidth="2.5" />
    <path d="M21 15l-5-5L5 21" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MenuIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 12h18M3 6h18M3 18h18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MedalIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    {/* Medal dairəsi */}
    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2.5" fill="none" />
    <circle cx="12" cy="8" r="1.5" fill={color} />
    
    {/* Medal lentləri */}
    <path
      d="M9 12v8l3-2 3 2v-8"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Ulduz */}
    <path
      d="M12 6l.5 1.5h1.5l-1.2.9.5 1.5L12 9l-1.3.9.5-1.5-1.2-.9h1.5L12 6z"
      fill={color}
    />
  </svg>
);

const MailIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="22,6 12,13 2,6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Arrow Icons
const ArrowLeftIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M19 12H5M5 12l7 7M5 12l7-7"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M5 12h14M19 12l-7 7M19 12l-7-7"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M9 18l6-6-6-6"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDownIcon = ({ size = 24, className = '', color = 'currentColor' }: Omit<IconProps, 'name'>) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M6 9l6 6 6-6"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Icon mapping
const iconMap = {
  // Navigation
  home: HomeIcon,
  books: BooksIcon,
  'test-tube': TestTubeIcon,
  'shopping-bag': ShoppingBagIcon,
  plus: PlusIcon,
  
  // Interface
  bell: BellIcon,
  robot: RobotIcon,
  globe: GlobeIcon,
  wave: WaveIcon,
  star: StarIcon,
  
  // Content
  video: VideoIcon,
  document: DocumentIcon,
  teacher: TeacherIcon,
  notes: NotesIcon,
  chart: ChartIcon,
  scroll: ScrollIcon,
  money: MoneyIcon,
  
  // Actions
  check: CheckIcon,
  x: XIcon,
  close: CloseIcon,
  search: SearchIcon,
  
  // Arrows
  'arrow-left': ArrowLeftIcon,
  'arrow-right': ArrowRightIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-down': ChevronDownIcon,
  
  // Theme
  sun: SunIcon,
  moon: MoonIcon,
  phone: PhoneIcon,
  
  // System
  palette: PaletteIcon,
  rocket: RocketIcon,
  bolt: BoltIcon,
  target: TargetIcon,
  
  // Additional
  'credit-card': CreditCardIcon,
  bank: BankIcon,
  lock: LockIcon,
  shield: ShieldIcon,
  user: UserIcon,
  trash: TrashIcon,
  refresh: RefreshIcon,
  question: QuestionIcon,
  contact: ContactIcon,
  chat: ChatIcon,
  info: InfoIcon,
  settings: SettingsIcon,
  help: HelpIcon,
  warning: WarningIcon,
  package: PackageIcon,
  trophy: TrophyIcon,
  car: CarIcon,
  wallet: WalletIcon,
  image: ImageIcon,
  menu: MenuIcon,
  medal: MedalIcon,
  mail: MailIcon,
};

// Main Icon component
export const Icon: React.FC<IconProps> = ({ name, size = 24, className = '', color, style }) => {
  const IconComponent = iconMap[name as keyof typeof iconMap];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return (
    <IconComponent
      size={size}
      className={className}
      color={color}
      style={style}
    />
  );
};

export default Icon;

// Export individual icons for direct use
export {
  HomeIcon,
  BooksIcon,
  TestTubeIcon,
  ShoppingBagIcon,
  PlusIcon,
  BellIcon,
  RobotIcon,
  GlobeIcon,
  WaveIcon,
  StarIcon,
  VideoIcon,
  DocumentIcon,
  TeacherIcon,
  NotesIcon,
  ChartIcon,
  ScrollIcon,
  MoneyIcon,
  CheckIcon,
  XIcon,
  CloseIcon,
  SearchIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  PhoneIcon,
  PaletteIcon,
  RocketIcon,
  BoltIcon,
  TargetIcon,
  CreditCardIcon,
  BankIcon,
  LockIcon,
  ShieldIcon,
  UserIcon,
  TrashIcon,
  RefreshIcon,
  QuestionIcon,
  ContactIcon,
  ChatIcon,
  InfoIcon,
  SettingsIcon,
  HelpIcon,
  WarningIcon,
  PackageIcon,
  TrophyIcon,
  CarIcon,
  WalletIcon,
  ImageIcon,
  MenuIcon,
  MedalIcon,
  MailIcon,
};