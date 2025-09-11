import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const SettingsIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="settingsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <filter id="settingsShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
      </filter>
    </defs>
    
    <g filter="url(#settingsShadow)">
      <g className="animate-spin-slow" style={{ transformOrigin: 'center' }}>
        <circle
          cx="12"
          cy="12"
          r="3"
          stroke="url(#settingsGrad)"
          strokeWidth="2.5"
          fill="url(#settingsGrad)"
          fillOpacity="0.2"
        />
        <path
          d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
          stroke="url(#settingsGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
        <circle cx="12" cy="2" r="1.5" fill="url(#settingsGrad)" />
        <circle cx="12" cy="22" r="1.5" fill="url(#settingsGrad)" />
        <circle cx="2" cy="12" r="1.5" fill="url(#settingsGrad)" />
        <circle cx="22" cy="12" r="1.5" fill="url(#settingsGrad)" />
        <circle cx="4.93" cy="4.93" r="1.2" fill="url(#settingsGrad)" opacity="0.8" />
        <circle cx="19.07" cy="19.07" r="1.2" fill="url(#settingsGrad)" opacity="0.8" />
        <circle cx="4.93" cy="19.07" r="1.2" fill="url(#settingsGrad)" opacity="0.8" />
        <circle cx="19.07" cy="4.93" r="1.2" fill="url(#settingsGrad)" opacity="0.8" />
      </g>
    </g>
  </svg>
);