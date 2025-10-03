/**
 * Onboarding Illustrations
 * SVG illustrations for each onboarding slide
 * 
 * AZ: Onboarding illüstrasiyaları
 * EN: Onboarding illustrations
 * RU: Иллюстрации онбординга
 */

import React from 'react';

interface IllustrationProps {
  className?: string;
  isDark?: boolean;
}

/**
 * Slide 1: 3D Learning Illustration
 * AZ: 3D öyrənmə illüstrasiyası
 */
export function LearningIllustration({ className = '', isDark = false }: IllustrationProps) {
  const primaryColor = '#10B981';
  const secondaryColor = isDark ? '#D1FAE5' : '#047857';
  
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="3D video learning illustration"
    >
      {/* Background circle */}
      <circle cx="120" cy="120" r="100" fill={primaryColor} opacity="0.1" />
      
      {/* 3D cube/book */}
      <g transform="translate(70, 70)">
        <path
          d="M50 20 L80 35 L80 75 L50 90 L20 75 L20 35 Z"
          fill={primaryColor}
          opacity="0.8"
        />
        <path
          d="M50 20 L80 35 L80 75 L50 60 Z"
          fill={secondaryColor}
          opacity="0.6"
        />
        <path
          d="M50 20 L20 35 L20 75 L50 60 Z"
          fill={primaryColor}
        />
        
        {/* Play icon */}
        <circle cx="50" cy="50" r="15" fill="white" opacity="0.9" />
        <path
          d="M45 43 L45 57 L57 50 Z"
          fill={primaryColor}
        />
      </g>
      
      {/* Floating elements */}
      <circle cx="40" cy="50" r="4" fill={primaryColor} opacity="0.5" />
      <circle cx="200" cy="70" r="6" fill={primaryColor} opacity="0.3" />
      <circle cx="180" cy="180" r="5" fill={primaryColor} opacity="0.4" />
    </svg>
  );
}

/**
 * Slide 2: Exam Simulator Illustration
 * AZ: İmtahan simulyatoru illüstrasiyası
 */
export function ExamIllustration({ className = '', isDark = false }: IllustrationProps) {
  const primaryColor = '#10B981';
  const accentColor = '#06B6D4';
  
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Exam simulator illustration"
    >
      {/* Background circle */}
      <circle cx="120" cy="120" r="100" fill={accentColor} opacity="0.1" />
      
      {/* Clipboard/document */}
      <g transform="translate(60, 50)">
        <rect x="20" y="0" width="80" height="120" rx="8" fill="white" stroke={primaryColor} strokeWidth="2" />
        
        {/* Checkmarks */}
        <g transform="translate(30, 20)">
          <circle cx="0" cy="0" r="8" fill={primaryColor} />
          <path d="M-3 0 L-1 2 L3 -2" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </g>
        
        <g transform="translate(30, 50)">
          <circle cx="0" cy="0" r="8" fill={primaryColor} />
          <path d="M-3 0 L-1 2 L3 -2" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </g>
        
        <g transform="translate(30, 80)">
          <circle cx="0" cy="0" r="8" stroke={primaryColor} strokeWidth="2" fill="none" />
        </g>
        
        {/* Lines */}
        <line x1="50" y1="20" x2="90" y2="20" stroke={primaryColor} strokeWidth="2" opacity="0.3" />
        <line x1="50" y1="50" x2="90" y2="50" stroke={primaryColor} strokeWidth="2" opacity="0.3" />
        <line x1="50" y1="80" x2="90" y2="80" stroke={primaryColor} strokeWidth="2" opacity="0.3" />
      </g>
      
      {/* Timer icon */}
      <g transform="translate(170, 60)">
        <circle cx="0" cy="0" r="20" fill={accentColor} opacity="0.2" />
        <circle cx="0" cy="0" r="12" stroke={accentColor} strokeWidth="2" fill="none" />
        <path d="M0 -8 L0 0 L6 0" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/**
 * Slide 3: Packages Illustration
 * AZ: Paketlər illüstrasiyası
 */
export function PackagesIllustration({ className = '', isDark = false }: IllustrationProps) {
  const primaryColor = '#10B981';
  const gold = '#F59E0B';
  const silver = '#94A3B8';
  
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Package selection illustration"
    >
      {/* Three package boxes */}
      <g transform="translate(40, 80)">
        {/* Package 1 - Basic */}
        <rect x="0" y="40" width="50" height="60" rx="6" fill={silver} opacity="0.3" />
        <rect x="5" y="30" width="40" height="10" rx="4" fill={silver} opacity="0.5" />
        
        {/* Package 2 - Standard (elevated) */}
        <rect x="70" y="20" width="50" height="80" rx="6" fill={primaryColor} opacity="0.6" />
        <rect x="75" y="10" width="40" height="10" rx="4" fill={primaryColor} opacity="0.8" />
        <circle cx="95" cy="50" r="8" fill="white" opacity="0.9" />
        <path d="M90 50 L93 53 L100 46" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
        
        {/* Package 3 - Premium */}
        <rect x="140" y="30" width="50" height="70" rx="6" fill={gold} opacity="0.4" />
        <rect x="145" y="20" width="40" height="10" rx="4" fill={gold} opacity="0.6" />
        <circle cx="165" cy="55" r="6" fill={gold} />
        <circle cx="165" cy="35" r="3" fill={gold} opacity="0.6" />
        <circle cx="165" cy="75" r="3" fill={gold} opacity="0.6" />
      </g>
      
      {/* Sparkles */}
      <g>
        <path d="M50 60 L52 66 L58 68 L52 70 L50 76 L48 70 L42 68 L48 66 Z" fill={gold} opacity="0.6" />
        <path d="M180 140 L182 144 L186 146 L182 148 L180 152 L178 148 L174 146 L178 144 Z" fill={primaryColor} opacity="0.5" />
      </g>
    </svg>
  );
}

/**
 * Slide 4: Get Started Illustration
 * AZ: Başlayaq illüstrasiyası
 */
export function StartIllustration({ className = '', isDark = false }: IllustrationProps) {
  const primaryColor = '#10B981';
  const accentColor = '#8B5CF6';
  
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Get started illustration"
    >
      {/* Background circles */}
      <circle cx="120" cy="120" r="100" fill={accentColor} opacity="0.1" />
      <circle cx="120" cy="120" r="70" fill={primaryColor} opacity="0.1" />
      
      {/* Rocket/Arrow up */}
      <g transform="translate(105, 60)">
        {/* Rocket body */}
        <ellipse cx="15" cy="80" rx="20" ry="25" fill={primaryColor} />
        <rect x="5" y="55" width="20" height="50" fill={primaryColor} />
        
        {/* Rocket top */}
        <path d="M15 45 L30 55 L15 40 L0 55 Z" fill={accentColor} />
        
        {/* Window */}
        <circle cx="15" cy="65" r="8" fill="white" opacity="0.9" />
        <circle cx="15" cy="65" r="5" fill={accentColor} opacity="0.3" />
        
        {/* Fins */}
        <path d="M0 80 L0 100 L10 90 Z" fill={primaryColor} opacity="0.7" />
        <path d="M30 80 L30 100 L20 90 Z" fill={primaryColor} opacity="0.7" />
        
        {/* Flames */}
        <ellipse cx="15" cy="108" rx="8" ry="12" fill="#F59E0B" opacity="0.6" />
        <ellipse cx="15" cy="112" rx="5" ry="8" fill="#EF4444" opacity="0.5" />
      </g>
      
      {/* Stars */}
      <circle cx="50" cy="80" r="3" fill={primaryColor} opacity="0.6" />
      <circle cx="190" cy="100" r="4" fill={accentColor} opacity="0.5" />
      <circle cx="70" cy="160" r="2" fill={primaryColor} opacity="0.4" />
      <circle cx="170" cy="140" r="3" fill={accentColor} opacity="0.6" />
      
      {/* Trajectory lines */}
      <path 
        d="M120 140 Q100 160 90 180" 
        stroke={primaryColor} 
        strokeWidth="2" 
        strokeDasharray="4 4" 
        opacity="0.3"
        fill="none"
      />
    </svg>
  );
}

/**
 * Get illustration component by type
 * AZ: Növə görə illüstrasiya komponenti
 */
export function getIllustration(
  type: 'learning' | 'exam' | 'packages' | 'start',
  props: IllustrationProps = {}
): React.ReactElement {
  const illustrations = {
    learning: LearningIllustration,
    exam: ExamIllustration,
    packages: PackagesIllustration,
    start: StartIllustration,
  };
  
  const Component = illustrations[type];
  return <Component {...props} />;
}
