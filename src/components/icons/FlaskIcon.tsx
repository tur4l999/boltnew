import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const FlaskIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 2V8L8 12L4 20C3.72386 20.6045 3.95517 21.3137 4.53416 21.6382C4.72415 21.7476 4.93645 21.8117 5.155 21.825C5.21696 21.8289 5.27928 21.8309 5.342 21.831H18.659C19.3112 21.831 19.855 21.3445 19.9295 20.6973C19.9624 20.4161 19.9041 20.1312 19.763 19.885L16 12V2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 2H15.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 14.5C8 15 9.5 15.5 11.5 15.5C13.5 15.5 15 15 16 14.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);