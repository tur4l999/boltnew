/**
 * Blur Overlay Component
 * Shown when app goes to background or security violation detected
 */

import React from 'react';
import { t, type Language } from '../i18n';

interface BlurOverlayProps {
  visible: boolean;
  reason?: 'background' | 'screenshot' | 'session_revoked' | 'jailbreak';
  onDismiss?: () => void;
  language?: Language;
}

export const BlurOverlay: React.FC<BlurOverlayProps> = ({
  visible,
  reason = 'background',
  onDismiss,
  language = 'az',
}) => {
  if (!visible) return null;
  
  const getMessage = () => {
    switch (reason) {
      case 'screenshot':
        return {
          title: t('screenshotWarning', language),
          message: t('screenshotMessage', language),
          canDismiss: false,
          icon: '⚠️',
        };
      case 'session_revoked':
        return {
          title: t('sessionRevokedWarning', language),
          message: t('sessionRevokedMessage', language),
          canDismiss: false,
          icon: '🔒',
        };
      case 'jailbreak':
        return {
          title: t('jailbreakWarning', language),
          message: t('jailbreakMessage', language),
          canDismiss: false,
          icon: '🛡️',
        };
      case 'background':
      default:
        return {
          title: t('backgroundWarning', language),
          message: t('returnToApp', language),
          canDismiss: true,
          icon: '🔐',
        };
    }
  };
  
  const { title, message, canDismiss, icon } = getMessage();
  
  return (
    <div
      className="blur-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={canDismiss ? onDismiss : undefined}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '400px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>
          {icon}
        </div>
        
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '12px',
          }}
        >
          {title}
        </h2>
        
        <p
          style={{
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.5',
            marginBottom: canDismiss ? '0' : '20px',
          }}
        >
          {message}
        </p>
        
        {!canDismiss && (
          <button
            onClick={() => {
              // Navigate back or close app
              if (onDismiss) {
                onDismiss();
              } else {
                window.history.back();
              }
            }}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '4px',
            }}
          >
            {t('exit', language)}
          </button>
        )}
      </div>
    </div>
  );
};

export default BlurOverlay;