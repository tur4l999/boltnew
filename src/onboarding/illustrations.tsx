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
 * Slide 4: Get Started Illustration - Modern Trophy Achievement
 * AZ: Başlayaq illüstrasiyası - Modern Kubok Nailiyyəti
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
        <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gold} />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <radialGradient id="glowGradient">
          <stop offset="0%" stopColor={gold} stopOpacity="0.4" />
          <stop offset="100%" stopColor={gold} stopOpacity="0" />
        </radialGradient>
        <filter id="trophyShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
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
      
      {/* Background glow and circles */}
      <circle cx="120" cy="120" r="110" fill="url(#glowGradient)" />
      <circle cx="120" cy="120" r="95" stroke={gold} strokeWidth="2" opacity="0.1" strokeDasharray="10 5">
        <animateTransform attributeName="transform" type="rotate" from="0 120 120" to="360 120 120" dur="30s" repeatCount="indefinite" />
      </circle>
      <circle cx="120" cy="120" r="70" stroke={primaryColor} strokeWidth="1.5" opacity="0.08" strokeDasharray="8 4">
        <animateTransform attributeName="transform" type="rotate" from="360 120 120" to="0 120 120" dur="25s" repeatCount="indefinite" />
      </circle>
      
      {/* Main Trophy - Enhanced and Perfectly Centered */}
      <g transform="translate(120, 75)" filter="url(#trophyShadow)">
        {/* Trophy cup body - symmetrical and polished */}
        <path d="M-28 15 Q-28 6 -22 2 L22 2 Q28 6 28 15 L28 42 Q28 52 18 58 L-18 58 Q-28 52 -28 42 Z" 
              fill="url(#trophyGradient)" />
        
        {/* Trophy inner shine/highlight */}
        <path d="M-22 10 Q-20 7 -16 7 L16 7 Q20 7 22 10 L22 40 Q22 48 16 52 L-16 52 Q-22 48 -22 40 Z" 
              fill={gold} opacity="0.25" />
        
        {/* Vertical shine line */}
        <rect x="-3" y="8" width="6" height="44" rx="3" fill="white" opacity="0.15" />
        
        {/* Trophy handles - perfectly symmetrical */}
        <path d="M-28 12 Q-38 12 -42 20 Q-42 28 -34 32 L-28 32 Z" 
              fill="url(#trophyGradient)" opacity="0.95" />
        <path d="M-28 12 Q-36 12 -39 20 Q-39 27 -32 30 L-28 30 Z" 
              fill={gold} opacity="0.3" />
        
        <path d="M28 12 Q38 12 42 20 Q42 28 34 32 L28 32 Z" 
              fill="url(#trophyGradient)" opacity="0.95" />
        <path d="M28 12 Q36 12 39 20 Q39 27 32 30 L28 30 Z" 
              fill={gold} opacity="0.3" />
        
        {/* Trophy rim/top edge - cleaner */}
        <ellipse cx="0" cy="2" rx="28" ry="7" fill={gold} />
        <ellipse cx="0" cy="2" rx="25" ry="5" fill="#FCD34D" opacity="0.9" />
        <ellipse cx="0" cy="1" rx="20" ry="3" fill="white" opacity="0.4" />
        
        {/* Trophy base/stand - more elegant */}
        <rect x="-20" y="58" width="40" height="8" rx="3" fill={gold} opacity="0.95" />
        <rect x="-24" y="66" width="48" height="7" rx="3" fill="url(#trophyGradient)" />
        <ellipse cx="0" cy="66" rx="24" ry="2" fill="white" opacity="0.2" />
        <rect x="-16" y="73" width="32" height="5" rx="2" fill={gold} />
        
        {/* Star emblem on trophy - PERFECTLY centered */}
        <g transform="translate(0, 30)">
          {/* Background glow circles - perfectly aligned with center */}
          <circle cx="0" cy="0" r="15" fill="white" opacity="0.2" />
          <circle cx="0" cy="0" r="11" fill={gold} opacity="0.15" />
          
          {/* Main star - perfectly centered and proportional */}
          <path d="M0 -7.5 L2.3 -2.3 L8 -1.4 L3.8 2.8 L4.8 8.5 L0 5.7 L-4.8 8.5 L-3.8 2.8 L-8 -1.4 L-2.3 -2.3 Z" 
                fill="white" opacity="0.98" stroke={gold} strokeWidth="0.8">
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="12s" repeatCount="indefinite" />
          </path>
          
          {/* Inner star glow - perfectly aligned */}
          <path d="M0 -4.8 L1.5 -1.5 L5.2 -0.9 L2.4 1.8 L2.9 5.5 L0 3.8 L-2.9 5.5 L-2.4 1.8 L-5.2 -0.9 L-1.5 -1.5 Z" 
                fill={gold} opacity="0.6">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
          </path>
        </g>
        
        {/* Decorative trim on trophy body */}
        <rect x="-24" y="20" width="48" height="2" rx="1" fill={gold} opacity="0.4" />
        <rect x="-24" y="45" width="48" height="2" rx="1" fill={gold} opacity="0.4" />
      </g>
      
      {/* Floating confetti - balanced and colorful */}
      <g>
        {/* Left side confetti */}
        <rect x="45" y="50" width="5" height="10" rx="1.5" fill={primaryColor} opacity="0.75">
          <animate attributeName="y" values="50;190;50" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.75;0.2;0.75" dur="3.5s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0 47.5 55" to="360 47.5 55" dur="2.5s" repeatCount="indefinite" />
        </rect>
        <circle cx="65" cy="85" r="4" fill={gold} opacity="0.7">
          <animate attributeName="cy" values="85;200;85" dur="3.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3.8s" repeatCount="indefinite" />
        </circle>
        <rect x="52" y="130" width="6" height="6" rx="1.5" fill={accentColor} opacity="0.65">
          <animate attributeName="y" values="130;210;130" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.65;0.2;0.65" dur="3.2s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0 55 133" to="360 55 133" dur="2.8s" repeatCount="indefinite" />
        </rect>
        
        {/* Right side confetti */}
        <rect x="185" y="65" width="7" height="5" rx="1.5" fill={gold} opacity="0.8">
          <animate attributeName="y" values="65;195;65" dur="3.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3.3s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0 188.5 67.5" to="360 188.5 67.5" dur="2.3s" repeatCount="indefinite" />
        </rect>
        <circle cx="175" cy="110" r="3.5" fill="#EF4444" opacity="0.7">
          <animate attributeName="cy" values="110;205;110" dur="3.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3.6s" repeatCount="indefinite" />
        </circle>
        <rect x="192" y="140" width="5" height="8" rx="1.5" fill={primaryColor} opacity="0.7">
          <animate attributeName="y" values="140;215;140" dur="3.1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3.1s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0 194.5 144" to="360 194.5 144" dur="2.6s" repeatCount="indefinite" />
        </rect>
        
        {/* Top confetti */}
        <circle cx="120" cy="30" r="3" fill={accentColor} opacity="0.6">
          <animate attributeName="cy" values="30;180;30" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="4s" repeatCount="indefinite" />
        </circle>
      </g>
      
      {/* Shining stars - symmetrically distributed */}
      <g>
        {/* Top left star */}
        <path d="M40 75 L42.5 81 L49 83 L42.5 85 L40 91 L37.5 85 L31 83 L37.5 81 Z" fill={gold} opacity="0.85">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0 40 83" to="360 40 83" dur="20s" repeatCount="indefinite" />
        </path>
        
        {/* Top right star */}
        <path d="M200 75 L202.5 81 L209 83 L202.5 85 L200 91 L197.5 85 L191 83 L197.5 81 Z" fill={primaryColor} opacity="0.8">
          <animate attributeName="opacity" values="0.4;0.95;0.4" dur="2.5s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0 200 83" to="360 200 83" dur="25s" repeatCount="indefinite" />
        </path>
        
        {/* Bottom left star */}
        <path d="M55 165 L57 170 L62 172 L57 174 L55 179 L53 174 L48 172 L53 170 Z" fill={accentColor} opacity="0.75">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.2s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0 55 172" to="360 55 172" dur="18s" repeatCount="indefinite" />
        </path>
        
        {/* Bottom right star */}
        <path d="M185 165 L187 170 L192 172 L187 174 L185 179 L183 174 L178 172 L183 170 Z" fill={gold} opacity="0.7">
          <animate attributeName="opacity" values="0.4;0.85;0.4" dur="2.4s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0 185 172" to="360 185 172" dur="22s" repeatCount="indefinite" />
        </path>
        
        {/* Small accent stars */}
        <circle cx="75" cy="50" r="3" fill={accentColor} opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="165" cy="50" r="2.5" fill={gold} opacity="0.65">
          <animate attributeName="opacity" values="0.35;0.85;0.35" dur="2.1s" repeatCount="indefinite" />
          <animate attributeName="r" values="2;3;2" dur="2.1s" repeatCount="indefinite" />
        </circle>
      </g>
      
      {/* Success ribbons - flowing elegantly */}
      <g transform="translate(120, 153)">
        {/* Left ribbon */}
        <path d="M-18 0 L-24 45 L-18 39 L-12 45 L-10 8 Z" fill="url(#ribbonGradient)" opacity="0.92">
          <animate attributeName="d" 
                   values="M-18 0 L-24 45 L-18 39 L-12 45 L-10 8 Z;M-18 0 L-26 45 L-18 38 L-10 45 L-10 8 Z;M-18 0 L-24 45 L-18 39 L-12 45 L-10 8 Z" 
                   dur="2.5s" repeatCount="indefinite" />
        </path>
        <path d="M-18 0 L-22 45 L-18 40 L-14 45 L-12 8 Z" fill={primaryColor} opacity="0.3">
          <animate attributeName="d" 
                   values="M-18 0 L-22 45 L-18 40 L-14 45 L-12 8 Z;M-18 0 L-24 45 L-18 39 L-12 45 L-12 8 Z;M-18 0 L-22 45 L-18 40 L-14 45 L-12 8 Z" 
                   dur="2.5s" repeatCount="indefinite" />
        </path>
        
        {/* Right ribbon */}
        <path d="M18 0 L24 45 L18 39 L12 45 L10 8 Z" fill="url(#ribbonGradient)" opacity="0.92">
          <animate attributeName="d" 
                   values="M18 0 L24 45 L18 39 L12 45 L10 8 Z;M18 0 L26 45 L18 38 L10 45 L10 8 Z;M18 0 L24 45 L18 39 L12 45 L10 8 Z" 
                   dur="2.5s" repeatCount="indefinite" />
        </path>
        <path d="M18 0 L22 45 L18 40 L14 45 L12 8 Z" fill={primaryColor} opacity="0.3">
          <animate attributeName="d" 
                   values="M18 0 L22 45 L18 40 L14 45 L12 8 Z;M18 0 L24 45 L18 39 L12 45 L12 8 Z;M18 0 L22 45 L18 40 L14 45 L12 8 Z" 
                   dur="2.5s" repeatCount="indefinite" />
        </path>
      </g>
      
      {/* Success checkmark badge */}
      <g transform="translate(168, 168)">
        <circle cx="0" cy="0" r="20" fill="white" filter="url(#trophyShadow)" />
        <circle cx="0" cy="0" r="18" fill="url(#ribbonGradient)" />
        <circle cx="0" cy="0" r="15" fill={primaryColor} opacity="0.3">
          <animate attributeName="r" values="15;17;15" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <path d="M-6 0 L-2 5 L7 -6" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
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
