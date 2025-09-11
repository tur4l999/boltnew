import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ClockIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <filter id="clockShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
      </filter>
    </defs>
    
    <g filter="url(#clockShadow)">
      {/* Clock face */}
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="white"
        stroke="url(#clockGrad)"
        strokeWidth="2.5"
      />
      
      {/* Inner circle */}
      <circle
        cx="12"
        cy="12"
        r="7"
        fill="url(#clockGrad)"
        fillOpacity="0.1"
      />
      
      {/* Hour marks */}
      <g>
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <rect
            key={i}
            x="11.5"
            y="4"
            width="1"
            height={i % 3 === 0 ? "3" : "2"}
            rx="0.5"
            fill="url(#clockGrad)"
            fillOpacity={i % 3 === 0 ? "0.8" : "0.4"}
            transform={`rotate(${angle} 12 12)`}
          />
        ))}
      </g>
      
      {/* Clock hands */}
      <g className="animate-clock" style={{ transformOrigin: '12px 12px' }}>
        <rect
          x="11.5"
          y="7"
          width="1"
          height="5"
          rx="0.5"
          fill="url(#clockGrad)"
          fillOpacity="0.9"
        />
        <rect
          x="11.5"
          y="12"
          width="1"
          height="6"
          rx="0.5"
          fill="url(#clockGrad)"
          fillOpacity="0.7"
          transform="rotate(90 12 12)"
        />
      </g>
      
      {/* Center dot */}
      <circle cx="12" cy="12" r="1.5" fill="url(#clockGrad)" />
      
      {/* Alarm bell */}
      <g transform="translate(15, 3)">
        <path
          d="M0 0L2 -2L4 0"
          stroke="url(#clockGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        >
          <animate attributeName="d" 
            values="M0 0L2 -2L4 0;M0 0L2 -3L4 0;M0 0L2 -2L4 0" 
            dur="1s" 
            repeatCount="indefinite" />
        </path>
        <circle cx="2" cy="0" r="1.5" fill="url(#clockGrad)">
          <animate attributeName="r" values="1.5;2;1.5" dur="1s" repeatCount="indefinite" />
        </circle>
      </g>
    </g>
    
    <style>
      {`
        @keyframes clock {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-clock {
          animation: clock 60s linear infinite;
        }
      `}
    </style>
  </svg>
);