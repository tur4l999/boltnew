/**
 * Screenshot Protection Overlay
 * Shows black screen when screenshot is attempted
 */

import React, { useEffect, useState } from 'react';

interface ScreenshotProtectionProps {
  active: boolean;
  onDetected: () => void;
}

export const ScreenshotProtection: React.FC<ScreenshotProtectionProps> = ({
  active,
  onDetected,
}) => {
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  
  useEffect(() => {
    if (!active) return;
    
    let blackoutTimer: NodeJS.Timeout | null = null;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const isScreenshotKey = 
        e.key === 'PrintScreen' ||
        (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) ||
        (e.key === 'S' && e.shiftKey && (e.metaKey || e.ctrlKey));
      
      if (isScreenshotKey) {
        e.preventDefault();
        
        // Dərhal qara ekran göstər
        setShowBlackScreen(true);
        
        // Callback çağır
        onDetected();
        
        // 3 saniyə sonra normal qayıt (istifadəçi görsün ki screenshot işləmədi)
        if (blackoutTimer) clearTimeout(blackoutTimer);
        blackoutTimer = setTimeout(() => {
          setShowBlackScreen(false);
        }, 3000);
      }
    };
    
    // Visibility change detection (potensial screenshot tools)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Qısa müddətə qara ekran
        setShowBlackScreen(true);
        
        if (blackoutTimer) clearTimeout(blackoutTimer);
        blackoutTimer = setTimeout(() => {
          if (!document.hidden) {
            setShowBlackScreen(false);
          }
        }, 500);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (blackoutTimer) clearTimeout(blackoutTimer);
    };
  }, [active, onDetected]);
  
  if (!showBlackScreen) return null;
  
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
        zIndex: 9999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Empty - just black screen */}
    </div>
  );
};

export default ScreenshotProtection;