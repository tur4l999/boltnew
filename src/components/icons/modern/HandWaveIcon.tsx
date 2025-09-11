import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const HandWaveIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="handGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <filter id="handGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#handGlow)">
      <g className="animate-wave" style={{ transformOrigin: '70% 70%' }}>
        {/* Palm */}
        <path
          d="M11 21C16 21 20 17 20 12V8C20 7.44772 19.5523 7 19 7C18.4477 7 18 7.44772 18 8V4C18 3.44772 17.5523 3 17 3C16.4477 3 16 3.44772 16 4V3C16 2.44772 15.5523 2 15 2C14.4477 2 14 2.44772 14 3V4C14 3.44772 13.5523 3 13 3C12.4477 3 12 3.44772 12 4V12L10 10C9.44772 10 9 10.4477 9 11C9 11.5523 9.44772 12 10 12L11 13V21Z"
          fill="url(#handGrad)"
          stroke="url(#handGrad)"
          strokeWidth="1"
        />
        
        {/* Thumb */}
        <rect
          x="8"
          y="10"
          width="4"
          height="8"
          rx="2"
          fill="url(#handGrad)"
          transform="rotate(-30 10 14)"
        />
        
        {/* Motion lines */}
        <path
          d="M22 10C22.5 10 23 10.5 23 11"
          stroke="url(#handGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        >
          <animate attributeName="opacity" values="0;0.6;0" dur="1.5s" repeatCount="indefinite" />
        </path>
        <path
          d="M22 14C22.5 14 23 14.5 23 15"
          stroke="url(#handGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        >
          <animate attributeName="opacity" values="0;0.6;0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
        </path>
      </g>
      
      {/* Sparkles */}
      <circle cx="6" cy="6" r="0.5" fill="#fbbf24" opacity="0">
        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="22" cy="6" r="0.5" fill="#f59e0b" opacity="0">
        <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.7s" repeatCount="indefinite" />
      </circle>
    </g>
    
    <style>
      {`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-20deg); }
          75% { transform: rotate(20deg); }
        }
        .animate-wave {
          animation: wave 1.5s ease-in-out infinite;
        }
      `}
    </style>
  </svg>
);