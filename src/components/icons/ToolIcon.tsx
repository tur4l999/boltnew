import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ToolIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.7 6.3C14.5 5.5 13.7 5 12.8 5C11.4 5 10.2 6.1 10.2 7.5C10.2 8.4 10.7 9.2 11.5 9.6L7.91 18.07C7.66 18.67 8.33 19.34 8.93 19.09L17.38 15.5C17.8 16.3 18.6 16.8 19.5 16.8C20.9 16.8 22 15.7 22 14.3C22 13.4 21.5 12.6 20.7 12.1L14.7 6.3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L2 10L9 17L7 19L1 13L5 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);