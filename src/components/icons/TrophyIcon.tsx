import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const TrophyIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9H4.5C3.83696 9 3.20107 8.73661 2.73223 8.26777C2.26339 7.79893 2 7.16304 2 6.5C2 5.83696 2.26339 5.20107 2.73223 4.73223C3.20107 4.26339 3.83696 4 4.5 4H6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 9H19.5C20.163 9 20.7989 8.73661 21.2678 8.26777C21.7366 7.79893 22 7.16304 22 6.5C22 5.83696 21.7366 5.20107 21.2678 4.73223C20.7989 4.26339 20.163 4 19.5 4H18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 4H18V13C18 14.5913 17.3679 16.1174 16.2426 17.2426C15.1174 18.3679 13.5913 19 12 19C10.4087 19 8.88258 18.3679 7.75736 17.2426C6.63214 16.1174 6 14.5913 6 13V4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 19V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 22H14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);