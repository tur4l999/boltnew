import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const PlusIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="plusGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <filter id="plusShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
      </filter>
    </defs>
    
    {/* Background circle with shadow */}
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="url(#plusGrad1)"
      fillOpacity="0.1"
      filter="url(#plusShadow)"
    />
    
    {/* Main circle */}
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="url(#plusGrad1)"
      strokeWidth="1.5"
      fill="none"
    />
    
    {/* Plus sign */}
    <path
      d="M12 7V17M7 12H17"
      stroke="url(#plusGrad1)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    
    {/* Corner accents */}
    <circle cx="12" cy="7" r="0.5" fill="url(#plusGrad1)" />
    <circle cx="12" cy="17" r="0.5" fill="url(#plusGrad1)" />
    <circle cx="7" cy="12" r="0.5" fill="url(#plusGrad1)" />
    <circle cx="17" cy="12" r="0.5" fill="url(#plusGrad1)" />
    
    {/* Subtle inner glow */}
    <circle
      cx="12"
      cy="12"
      r="6"
      fill="url(#plusGrad1)"
      fillOpacity="0.05"
    />
  </svg>
);