import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { useApp } from '../../contexts/AppContext';

interface PhoneVerificationScreenProps {
  phone: string;
  onVerified: () => void;
  onBack: () => void;
  onEditPhone?: () => void;
}

export function PhoneVerificationScreen({ phone, onVerified, onBack, onEditPhone }: PhoneVerificationScreenProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { isDarkMode } = useApp();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleVerify = async () => {
    if (code.length !== 6) {
      setError('6 rəqəmli kodu daxil edin');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Demo: accept any 6-digit code
      if (code.length === 6) {
        onVerified();
      } else {
        setError('Yanlış təsdiqləmə kodu');
      }
    }, 1500);
  };

  const handleResend = () => {
    if (!canResend) return;
    
    // Simulate resend
    setResendTimer(60);
    setCanResend(false);
    alert('Yeni SMS göndərildi');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900' 
        : 'bg-gradient-to-b from-gray-50 via-white to-emerald-50/30'
    } pt-11`}>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-1/4 left-1/6 w-64 h-64 rounded-full blur-3xl ${
          isDarkMode ? 'bg-emerald-500/5' : 'bg-emerald-300/20'
        } animate-pulse`} style={{ animationDuration: '4s' }}></div>
        <div className={`absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full blur-3xl ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-200/20'
        } animate-pulse`} style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
      </div>
      
      <div className="w-full max-w-iphone16 relative z-10 animate-fade-in-up">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl shadow-2xl flex items-center justify-center transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600/50' 
              : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200/50'
          }`}>
            <div className="text-4xl">📱</div>
          </div>
          
          <div>
            <h1 className={`text-2xl font-black transition-all duration-300 bg-gradient-to-r ${
              isDarkMode 
                ? 'from-emerald-400 via-green-400 to-emerald-500' 
                : 'from-emerald-600 via-green-600 to-emerald-700'
            } bg-clip-text text-transparent`}>
              Telefon təsdiqi
            </h1>
            <div className={`text-sm font-medium mt-2 px-4 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <p className="mb-2">
                <span className="font-bold">{phone}</span> nömrəsinə göndərilən 6 rəqəmli SMS kodu daxil edin
              </p>
              {onEditPhone && (
                <button
                  onClick={onEditPhone}
                  className={`text-xs underline transition-colors duration-200 ${
                    isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
                  }`}
                >
                  ✏️ Telefon nömrəsini dəyişdir
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Verification Form */}
        <Card className={`p-8 transition-all duration-300 backdrop-blur-lg ${
          isDarkMode 
            ? 'bg-gray-800/90 border-gray-600/30 shadow-2xl' 
            : 'bg-white/95 border-white/50 shadow-xl'
        } hover:shadow-2xl`}>
          <div className="space-y-5">
            <Input
              type="text"
              value={code}
              onChange={(value) => setCode(value.replace(/\D/g, '').slice(0, 6))}
              label="SMS təsdiqləmə kodu"
              placeholder="000000"
              icon="💬"
              error={error}
              required
            />

            {/* Code display */}
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-bold transition-all duration-200 ${
                    code[idx]
                      ? isDarkMode
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-emerald-600 bg-emerald-50 text-emerald-600'
                      : isDarkMode
                      ? 'border-gray-600 bg-gray-700/40 text-gray-500'
                      : 'border-gray-200 bg-white text-gray-400'
                  }`}
                >
                  {code[idx] || '•'}
                </div>
              ))}
            </div>

            <Button
              onClick={handleVerify}
              disabled={isLoading || code.length !== 6}
              className={`w-full py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                isLoading ? 'animate-pulse' : ''
              } bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Təsdiqlənir...
                </div>
              ) : (
                'Təsdiqlə'
              )}
            </Button>

            {/* Resend button */}
            <div className="text-center">
              <button
                onClick={handleResend}
                disabled={!canResend}
                className={`text-sm font-medium transition-colors duration-200 ${
                  canResend
                    ? isDarkMode
                      ? 'text-emerald-400 hover:text-emerald-300'
                      : 'text-emerald-600 hover:text-emerald-700'
                    : isDarkMode
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                {canResend ? 'SMS-i yenidən göndər' : `Yenidən göndər (${resendTimer}s)`}
              </button>
            </div>

            <Button
              onClick={onBack}
              variant="secondary"
              className={`w-full py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700/40 hover:bg-gray-600/40 text-gray-200' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              ← Geri
            </Button>
          </div>
        </Card>

        {/* Info */}
        <div className={`mt-6 text-center text-sm transition-colors duration-200 ${
          isDarkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <div className="flex items-center justify-center gap-2 text-xs">
            <span>ℹ️</span>
            <span>SMS 5 dəqiqə ərzində etibarlıdır</span>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-12 text-center text-sm transition-colors duration-200 ${
          isDarkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <div className="text-xs opacity-70">
            © 2024 Digital Driving Academy • Bütün hüquqlar qorunur
          </div>
        </div>
      </div>
    </div>
  );
}
