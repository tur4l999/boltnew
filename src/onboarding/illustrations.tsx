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
 * Slide 2: Exam Simulator Illustration - Modern Design
 * AZ: İmtahan simulyatoru illüstrasiyası - Modern Dizayn
 */
export function ExamIllustration({ className = '', isDark = false }: IllustrationProps) {
  const primaryColor = '#10B981';
  const accentColor = '#06B6D4';
  const gradientStart = '#10B981';
  const gradientEnd = '#06B6D4';
  
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Exam simulator illustration"
    >
      <defs>
        <linearGradient id="examGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientStart} />
          <stop offset="100%" stopColor={gradientEnd} />
        </linearGradient>
        <filter id="examShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="0" dy="4" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background glow circles */}
      <circle cx="120" cy="120" r="90" fill="url(#examGradient)" opacity="0.08" />
      <circle cx="140" cy="100" r="60" fill={accentColor} opacity="0.05" />
      
      {/* Modern device mockup */}
      <g filter="url(#examShadow)">
        <rect x="70" y="50" width="100" height="140" rx="12" fill="white" stroke={primaryColor} strokeWidth="2.5" />
        
        {/* Screen header */}
        <rect x="70" y="50" width="100" height="30" rx="12" fill="url(#examGradient)" opacity="0.1" />
        
        {/* Timer display */}
        <g transform="translate(120, 70)">
          <circle cx="0" cy="0" r="8" fill="url(#examGradient)" />
          <text x="12" y="4" fontSize="10" fill={primaryColor} fontWeight="600">15:00</text>
        </g>
        
        {/* Progress bar */}
        <rect x="80" y="95" width="80" height="4" rx="2" fill="#E5E7EB" />
        <rect x="80" y="95" width="48" height="4" rx="2" fill="url(#examGradient)" />
        
        {/* Question cards with modern design */}
        <g transform="translate(80, 110)">
          {/* Question 1 - Completed */}
          <rect x="0" y="0" width="80" height="20" rx="6" fill="#ECFDF5" />
          <circle cx="10" cy="10" r="6" fill={primaryColor} />
          <path d="M7 10 L9 12 L13 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="22" y="6" width="50" height="3" rx="1.5" fill={primaryColor} opacity="0.3" />
          <rect x="22" y="11" width="35" height="3" rx="1.5" fill={primaryColor} opacity="0.2" />
          
          {/* Question 2 - Completed */}
          <rect x="0" y="28" width="80" height="20" rx="6" fill="#ECFDF5" />
          <circle cx="10" cy="38" r="6" fill={primaryColor} />
          <path d="M7 38 L9 40 L13 36" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="22" y="34" width="45" height="3" rx="1.5" fill={primaryColor} opacity="0.3" />
          <rect x="22" y="39" width="38" height="3" rx="1.5" fill={primaryColor} opacity="0.2" />
          
          {/* Question 3 - Active */}
          <rect x="0" y="56" width="80" height="20" rx="6" fill="url(#examGradient)" opacity="0.15" />
          <circle cx="10" cy="66" r="6" stroke={accentColor} strokeWidth="2" fill="white" />
          <circle cx="10" cy="66" r="3" fill={accentColor}>
            <animate attributeName="r" values="2;4;2" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <rect x="22" y="62" width="50" height="3" rx="1.5" fill={accentColor} opacity="0.4" />
          <rect x="22" y="67" width="40" height="3" rx="1.5" fill={accentColor} opacity="0.3" />
        </g>
      </g>
      
      {/* Floating success checkmarks */}
      <g opacity="0.6">
        <circle cx="50" cy="80" r="6" fill={primaryColor} opacity="0.3">
          <animate attributeName="cy" values="80;70;80" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="190" cy="120" r="8" fill={accentColor} opacity="0.3">
          <animate attributeName="cy" values="120;110;120" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="160" r="5" fill={primaryColor} opacity="0.3">
          <animate attributeName="cy" values="160;150;160" dur="2.8s" repeatCount="indefinite" />
        </circle>
      </g>
      
      {/* Modern timer badge */}
      <g transform="translate(180, 170)">
        <circle cx="0" cy="0" r="22" fill="url(#examGradient)" opacity="0.15" />
        <circle cx="0" cy="0" r="16" fill="white" filter="url(#examShadow)" />
        <circle cx="0" cy="0" r="14" stroke="url(#examGradient)" strokeWidth="2.5" fill="none" strokeDasharray="60 30" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="3s" repeatCount="indefinite" />
        </circle>
        <path d="M0 -6 L0 0 L4 4" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/**
 * Slide 3: Packages Illustration - Modern Premium Cards
 * AZ: Paketlər illüstrasiyası - Modern Premium Kartlar
 */
export function PackagesIllustration({ className = '', isDark = false }: IllustrationProps) {
  const primaryColor = '#10B981';
  const gold = '#F59E0B';
  const purple = '#8B5CF6';
  
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Package selection illustration"
    >
      <defs>
        <linearGradient id="basicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
        <linearGradient id="standardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <filter id="cardShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
          <feOffset dx="0" dy="6" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.25"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background decorative circles */}
      <circle cx="120" cy="120" r="100" fill={primaryColor} opacity="0.05" />
      <circle cx="80" cy="140" r="40" fill={gold} opacity="0.08" />
      <circle cx="160" cy="100" r="50" fill={purple} opacity="0.06" />
      
      {/* Modern Package Cards */}
      <g transform="translate(30, 60)">
        
        {/* Basic Package - Left */}
        <g filter="url(#cardShadow)">
          <rect x="0" y="40" width="50" height="75" rx="10" fill="white" stroke="url(#basicGradient)" strokeWidth="2" />
          <rect x="0" y="40" width="50" height="20" rx="10" fill="url(#basicGradient)" opacity="0.15" />
          
          {/* Icon */}
          <circle cx="25" cy="50" r="6" stroke="url(#basicGradient)" strokeWidth="2" fill="white" />
          
          {/* Title bar */}
          <rect x="10" y="72" width="30" height="3" rx="1.5" fill="#94A3B8" opacity="0.4" />
          <rect x="10" y="80" width="20" height="2" rx="1" fill="#94A3B8" opacity="0.3" />
          
          {/* Features */}
          <circle cx="12" cy="92" r="2" fill="#94A3B8" opacity="0.5" />
          <circle cx="12" cy="100" r="2" fill="#94A3B8" opacity="0.5" />
        </g>
        
        {/* Standard Package - Center (Elevated & Popular) */}
        <g filter="url(#cardShadow)">
          <rect x="65" y="20" width="55" height="90" rx="12" fill="white" stroke="url(#standardGradient)" strokeWidth="2.5" />
          
          {/* Popular badge */}
          <rect x="75" y="15" width="35" height="14" rx="7" fill="url(#standardGradient)" />
          <text x="92.5" y="24" fontSize="8" fill="white" fontWeight="700" textAnchor="middle">HOT</text>
          
          {/* Gradient header */}
          <rect x="65" y="20" width="55" height="25" rx="12" fill="url(#standardGradient)" opacity="0.2" />
          
          {/* Icon with checkmark */}
          <circle cx="92.5" cy="32.5" r="8" fill="url(#standardGradient)" />
          <path d="M89 32.5 L91.5 35 L96 30.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Title */}
          <rect x="75" y="55" width="40" height="4" rx="2" fill="url(#standardGradient)" opacity="0.6" />
          <rect x="80" y="63" width="30" height="3" rx="1.5" fill="url(#standardGradient)" opacity="0.4" />
          
          {/* Features with checkmarks */}
          <g>
            <circle cx="75" cy="78" r="3" fill={primaryColor} />
            <path d="M73.5 78 L74.5 79 L76.5 77" stroke="white" strokeWidth="1" strokeLinecap="round" />
            <rect x="82" y="76" width="30" height="2" rx="1" fill={primaryColor} opacity="0.3" />
            
            <circle cx="75" cy="88" r="3" fill={primaryColor} />
            <path d="M73.5 88 L74.5 89 L76.5 87" stroke="white" strokeWidth="1" strokeLinecap="round" />
            <rect x="82" y="86" width="25" height="2" rx="1" fill={primaryColor} opacity="0.3" />
            
            <circle cx="75" cy="98" r="3" fill={primaryColor} />
            <path d="M73.5 98 L74.5 99 L76.5 97" stroke="white" strokeWidth="1" strokeLinecap="round" />
            <rect x="82" y="96" width="28" height="2" rx="1" fill={primaryColor} opacity="0.3" />
          </g>
        </g>
        
        {/* Premium Package - Right */}
        <g filter="url(#cardShadow)">
          <rect x="135" y="35" width="52" height="80" rx="11" fill="white" stroke="url(#premiumGradient)" strokeWidth="2.5" />
          <rect x="135" y="35" width="52" height="22" rx="11" fill="url(#premiumGradient)" opacity="0.18" />
          
          {/* Crown icon */}
          <g transform="translate(161, 46)">
            <path d="M0 -6 L-4 -2 L-2 2 L2 2 L4 -2 Z" fill="url(#premiumGradient)" />
            <circle cx="-4" cy="-2" r="1.5" fill={gold} />
            <circle cx="0" cy="-6" r="1.5" fill={gold} />
            <circle cx="4" cy="-2" r="1.5" fill={gold} />
          </g>
          
          {/* Title */}
          <rect x="144" y="63" width="34" height="3.5" rx="1.75" fill="url(#premiumGradient)" opacity="0.5" />
          <rect x="148" y="70" width="26" height="2.5" rx="1.25" fill="url(#premiumGradient)" opacity="0.4" />
          
          {/* Premium features stars */}
          <g fill={gold} opacity="0.7">
            <path d="M147 84 L148 86 L150 86.5 L148 87 L147 89 L146 87 L144 86.5 L146 86 Z" />
            <circle cx="165" cy="84" r="2" />
            <path d="M147 94 L148 96 L150 96.5 L148 97 L147 99 L146 97 L144 96.5 L146 96 Z" />
            <circle cx="170" cy="94" r="1.5" />
            <path d="M147 104 L148 106 L150 106.5 L148 107 L147 109 L146 107 L144 106.5 L146 106 Z" />
          </g>
        </g>
      </g>
      
      {/* Animated sparkles */}
      <g>
        <path d="M45 55 L47 60 L52 62 L47 64 L45 69 L43 64 L38 62 L43 60 Z" fill={gold} opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M195 130 L197 134 L201 136 L197 138 L195 142 L193 138 L189 136 L193 134 Z" fill={primaryColor} opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
        </path>
        <circle cx="60" cy="150" r="3" fill={purple} opacity="0.4">
          <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="185" cy="70" r="2.5" fill={gold} opacity="0.5">
          <animate attributeName="r" values="2;3.5;2" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

/**
 * Slide 4: Get Started Illustration - Modern Success Launch
 * AZ: Başlayaq illüstrasiyası - Modern Uğur Buraxılışı
 */
export function StartIllustration({ className = '', isDark = false }: IllustrationProps) {
  const primaryColor = '#10B981';
  const accentColor = '#8B5CF6';
  const gold = '#F59E0B';
  
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Get started illustration"
    >
      <defs>
        <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="fireGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <radialGradient id="glowGradient">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
        </radialGradient>
        <filter id="rocketShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
          <feOffset dx="0" dy="8" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background orbital rings */}
      <circle cx="120" cy="120" r="95" stroke={primaryColor} strokeWidth="1" opacity="0.1" strokeDasharray="10 5" />
      <circle cx="120" cy="120" r="70" stroke={accentColor} strokeWidth="1" opacity="0.08" strokeDasharray="8 4" />
      <circle cx="120" cy="120" r="110" fill="url(#glowGradient)" />
      
      {/* Modern Rocket */}
      <g transform="translate(100, 50)" filter="url(#rocketShadow)">
        {/* Rocket body */}
        <path d="M20 40 L20 90 Q20 100 15 105 L25 105 Q20 100 20 90 Z" fill="url(#rocketGradient)" />
        <ellipse cx="20" cy="90" rx="15" ry="18" fill="url(#rocketGradient)" />
        
        {/* Rocket nose cone */}
        <path d="M20 30 L8 45 L32 45 Z" fill={accentColor} />
        <path d="M20 30 L12 42 L28 42 Z" fill={accentColor} opacity="0.7" />
        
        {/* Window with reflection */}
        <circle cx="20" cy="60" r="9" fill="white" opacity="0.95" />
        <circle cx="20" cy="60" r="7" fill="#E0F2FE" />
        <circle cx="18" cy="58" r="3" fill="white" opacity="0.8" />
        <path d="M20 60 L23 63" stroke={accentColor} strokeWidth="1" opacity="0.3" />
        
        {/* Body details */}
        <rect x="18" y="70" width="4" height="15" rx="2" fill="white" opacity="0.2" />
        <line x1="10" y1="80" x2="30" y2="80" stroke="white" strokeWidth="1" opacity="0.3" />
        
        {/* Fins */}
        <path d="M5 90 L5 110 L15 100 Z" fill={primaryColor} opacity="0.8" />
        <path d="M35 90 L35 110 L25 100 Z" fill={primaryColor} opacity="0.8" />
        <path d="M7 92 L7 105 L14 98 Z" fill="#059669" opacity="0.6" />
        <path d="M33 92 L33 105 L26 98 Z" fill="#059669" opacity="0.6" />
        
        {/* Animated flames */}
        <g opacity="0.9">
          <ellipse cx="20" cy="110" rx="10" ry="15" fill="url(#fireGradient)">
            <animate attributeName="ry" values="15;18;15" dur="0.3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;1;0.9" dur="0.3s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="20" cy="115" rx="7" ry="12" fill="#EF4444" opacity="0.8">
            <animate attributeName="ry" values="12;15;12" dur="0.4s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="20" cy="120" rx="4" ry="8" fill="#FBBF24" opacity="0.9">
            <animate attributeName="ry" values="8;11;8" dur="0.35s" repeatCount="indefinite" />
          </ellipse>
        </g>
        
        {/* Exhaust particles */}
        <circle cx="15" cy="125" r="2" fill={gold} opacity="0.6">
          <animate attributeName="cy" values="125;135;145" dur="0.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.3;0" dur="0.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="25" cy="128" r="2" fill="#EF4444" opacity="0.6">
          <animate attributeName="cy" values="128;138;148" dur="0.9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.3;0" dur="0.9s" repeatCount="indefinite" />
        </circle>
        <circle cx="20" cy="130" r="1.5" fill="#FBBF24" opacity="0.7">
          <animate attributeName="cy" values="130;140;150" dur="0.7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.3;0" dur="0.7s" repeatCount="indefinite" />
        </circle>
      </g>
      
      {/* Floating stars with animation */}
      <g>
        <path d="M50 70 L52 75 L57 77 L52 79 L50 84 L48 79 L43 77 L48 75 Z" fill={gold} opacity="0.7">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0 50 77" to="360 50 77" dur="20s" repeatCount="indefinite" />
        </path>
        <path d="M185 90 L187 94 L191 96 L187 98 L185 102 L183 98 L179 96 L183 94 Z" fill={primaryColor} opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0 185 96" to="360 185 96" dur="25s" repeatCount="indefinite" />
        </path>
        <path d="M70 150 L72 153 L75 155 L72 157 L70 160 L68 157 L65 155 L68 153 Z" fill={accentColor} opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.2s" repeatCount="indefinite" />
        </path>
        <circle cx="190" cy="140" r="3" fill={gold} opacity="0.5">
          <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="90" r="2.5" fill={primaryColor} opacity="0.4">
          <animate attributeName="r" values="2;3.5;2" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </g>
      
      {/* Trajectory path */}
      <path 
        d="M120 140 Q105 155 95 170" 
        stroke={primaryColor} 
        strokeWidth="2" 
        strokeDasharray="6 4" 
        opacity="0.3"
        fill="none"
        strokeLinecap="round"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
      </path>
      
      {/* Success checkmark badge */}
      <g transform="translate(160, 150)">
        <circle cx="0" cy="0" r="20" fill="white" filter="url(#rocketShadow)" />
        <circle cx="0" cy="0" r="18" fill="url(#rocketGradient)" />
        <path d="M-6 0 L-2 5 L8 -6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
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
