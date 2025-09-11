import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ChartIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="chartGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#34d399" />
      </linearGradient>
      <linearGradient id="chartGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
      <linearGradient id="chartGrad3" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
    
    {/* Grid lines */}
    <path d="M4 20H20" stroke="#e5e7eb" strokeWidth="0.5" />
    <path d="M4 16H20" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="2 2" />
    <path d="M4 12H20" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="2 2" />
    <path d="M4 8H20" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="2 2" />
    
    {/* Axes */}
    <path d="M4 4V20H20" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Bars with animation */}
    <rect x="6" y="14" width="3" height="6" rx="1.5" fill="url(#chartGrad1)">
      <animate attributeName="y" values="20;14;20" dur="3s" repeatCount="indefinite" />
      <animate attributeName="height" values="0;6;0" dur="3s" repeatCount="indefinite" />
    </rect>
    
    <rect x="11" y="10" width="3" height="10" rx="1.5" fill="url(#chartGrad2)">
      <animate attributeName="y" values="20;10;20" dur="3s" begin="0.5s" repeatCount="indefinite" />
      <animate attributeName="height" values="0;10;0" dur="3s" begin="0.5s" repeatCount="indefinite" />
    </rect>
    
    <rect x="16" y="6" width="3" height="14" rx="1.5" fill="url(#chartGrad3)">
      <animate attributeName="y" values="20;6;20" dur="3s" begin="1s" repeatCount="indefinite" />
      <animate attributeName="height" values="0;14;0" dur="3s" begin="1s" repeatCount="indefinite" />
    </rect>
    
    {/* Trend line */}
    <path
      d="M7.5 16L12.5 12L17.5 8"
      stroke="#ef4444"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      strokeDasharray="50"
      strokeDashoffset="50"
    >
      <animate 
        attributeName="stroke-dashoffset" 
        values="50;0;50" 
        dur="3s" 
        begin="1.5s" 
        repeatCount="indefinite" 
      />
    </path>
    
    {/* Data points */}
    <circle cx="7.5" cy="16" r="2" fill="#ef4444" opacity="0">
      <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="12.5" cy="12" r="2" fill="#ef4444" opacity="0">
      <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1.7s" repeatCount="indefinite" />
    </circle>
    <circle cx="17.5" cy="8" r="2" fill="#ef4444" opacity="0">
      <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1.9s" repeatCount="indefinite" />
    </circle>
  </svg>
);