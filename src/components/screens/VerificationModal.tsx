import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { useApp } from '../../contexts/AppContext';

interface VerificationModalProps {
  email: string;
  phone: string;
  onVerificationComplete: () => void;
  onBack: () => void;
}

export function VerificationModal({ email, phone, onVerificationComplete, onBack }: VerificationModalProps) {
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);
  const [emailTimer, setEmailTimer] = useState(60);
  const [phoneTimer, setPhoneTimer] = useState(60);
  const [generatedEmailCode] = useState(Math.floor(100000 + Math.random() * 900000).toString());
  const [generatedPhoneCode] = useState(Math.floor(100000 + Math.random() * 900000).toString());
  const { isDarkMode } = useApp();

  // Timer countdown for email
  useEffect(() => {
    if (emailCodeSent && emailTimer > 0 && !emailVerified) {
      const timer = setTimeout(() => setEmailTimer(emailTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [emailTimer, emailCodeSent, emailVerified]);

  // Timer countdown for phone
  useEffect(() => {
    if (phoneCodeSent && phoneTimer > 0 && !phoneVerified) {
      const timer = setTimeout(() => setPhoneTimer(phoneTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [phoneTimer, phoneCodeSent, phoneVerified]);

  const sendEmailCode = () => {
    setEmailCodeSent(true);
    setEmailTimer(60);
    // In production, this would send actual email
    console.log('Email verification code sent:', generatedEmailCode);
    // Show demo code for testing
    setTimeout(() => {
      alert(`Demo rejimi: E-mail təsdiq kodu: ${generatedEmailCode}`);
    }, 500);
  };

  const sendPhoneCode = () => {
    setPhoneCodeSent(true);
    setPhoneTimer(60);
    // In production, this would send actual SMS
    console.log('Phone verification code sent:', generatedPhoneCode);
    // Show demo code for testing
    setTimeout(() => {
      alert(`Demo rejimi: SMS təsdiq kodu: ${generatedPhoneCode}`);
    }, 500);
  };

  const verifyEmail = () => {
    if (emailCode.trim() === generatedEmailCode) {
      setEmailVerified(true);
      setErrors(prev => ({ ...prev, email: undefined }));
    } else {
      setErrors(prev => ({ ...prev, email: 'Təsdiq kodu səhvdir' }));
    }
  };

  const verifyPhone = () => {
    if (phoneCode.trim() === generatedPhoneCode) {
      setPhoneVerified(true);
      setErrors(prev => ({ ...prev, phone: undefined }));
    } else {
      setErrors(prev => ({ ...prev, phone: 'Təsdiq kodu səhvdir' }));
    }
  };

  const handleComplete = async () => {
    if (!emailVerified) {
      setErrors(prev => ({ ...prev, email: 'E-mail təsdiqlənməlidir' }));
      return;
    }
    if (!phoneVerified) {
      setErrors(prev => ({ ...prev, phone: 'Telefon təsdiqlənməlidir' }));
      return;
    }

    setIsVerifying(true);
    // Simulate verification delay
    setTimeout(() => {
      setIsVerifying(false);
      onVerificationComplete();
    }, 1500);
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
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl shadow-2xl flex items-center justify-center transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600/50' 
              : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200/50'
          } backdrop-blur-sm`}>
            <span className="text-5xl">✉️</span>
          </div>
          
          <div>
            <h1 className={`text-2xl font-black transition-all duration-300 bg-gradient-to-r ${
              isDarkMode 
                ? 'from-emerald-400 via-green-400 to-emerald-500' 
                : 'from-emerald-600 via-green-600 to-emerald-700'
            } bg-clip-text text-transparent`}>
              Təsdiqləmə
            </h1>
            <p className={`text-sm font-medium mt-2 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>
              E-mail və telefon nömrənizi təsdiqləyin
            </p>
          </div>
        </div>

        {/* Verification Cards */}
        <div className="space-y-4">
          {/* Email Verification */}
          <Card className={`p-6 transition-all duration-300 backdrop-blur-lg ${
            isDarkMode 
              ? 'bg-gray-800/90 border-gray-600/30 shadow-2xl' 
              : 'bg-white/95 border-white/50 shadow-xl'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    E-mail təsdiqi
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {email}
                  </p>
                </div>
              </div>
              {emailVerified && (
                <span className="text-2xl">✅</span>
              )}
            </div>

            {!emailVerified && (
              <div className="space-y-3">
                {!emailCodeSent ? (
                  <Button
                    onClick={sendEmailCode}
                    className="w-full py-3 text-sm font-medium rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                  >
                    Təsdiq kodu göndər
                  </Button>
                ) : (
                  <>
                    <Input
                      type="text"
                      value={emailCode}
                      onChange={setEmailCode}
                      placeholder="6 rəqəmli kodu daxil edin"
                      error={errors.email}
                      maxLength={6}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={verifyEmail}
                        disabled={emailCode.length !== 6}
                        className="flex-1 py-3 text-sm font-medium rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
                      >
                        Təsdiqlə
                      </Button>
                      {emailTimer === 0 ? (
                        <Button
                          onClick={sendEmailCode}
                          variant="secondary"
                          className={`px-4 py-3 text-sm rounded-xl ${
                            isDarkMode 
                              ? 'bg-gray-700/40 hover:bg-gray-600/40 text-gray-200' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          Yenidən göndər
                        </Button>
                      ) : (
                        <div className={`px-4 py-3 text-sm rounded-xl flex items-center ${
                          isDarkMode ? 'bg-gray-700/40 text-gray-400' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {emailTimer}s
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </Card>

          {/* Phone Verification */}
          <Card className={`p-6 transition-all duration-300 backdrop-blur-lg ${
            isDarkMode 
              ? 'bg-gray-800/90 border-gray-600/30 shadow-2xl' 
              : 'bg-white/95 border-white/50 shadow-xl'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Telefon təsdiqi
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {phone}
                  </p>
                </div>
              </div>
              {phoneVerified && (
                <span className="text-2xl">✅</span>
              )}
            </div>

            {!phoneVerified && (
              <div className="space-y-3">
                {!phoneCodeSent ? (
                  <Button
                    onClick={sendPhoneCode}
                    className="w-full py-3 text-sm font-medium rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                  >
                    SMS göndər
                  </Button>
                ) : (
                  <>
                    <Input
                      type="text"
                      value={phoneCode}
                      onChange={setPhoneCode}
                      placeholder="6 rəqəmli kodu daxil edin"
                      error={errors.phone}
                      maxLength={6}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={verifyPhone}
                        disabled={phoneCode.length !== 6}
                        className="flex-1 py-3 text-sm font-medium rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
                      >
                        Təsdiqlə
                      </Button>
                      {phoneTimer === 0 ? (
                        <Button
                          onClick={sendPhoneCode}
                          variant="secondary"
                          className={`px-4 py-3 text-sm rounded-xl ${
                            isDarkMode 
                              ? 'bg-gray-700/40 hover:bg-gray-600/40 text-gray-200' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          Yenidən göndər
                        </Button>
                      ) : (
                        <div className={`px-4 py-3 text-sm rounded-xl flex items-center ${
                          isDarkMode ? 'bg-gray-700/40 text-gray-400' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {phoneTimer}s
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <Button
            onClick={handleComplete}
            disabled={!emailVerified || !phoneVerified || isVerifying}
            className={`w-full py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
              isVerifying ? 'animate-pulse' : ''
            } bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isVerifying ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Tamamlanır...
              </div>
            ) : (
              'Qeydiyyatı tamamla'
            )}
          </Button>

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

        {/* Info Message */}
        <div className={`mt-6 p-4 rounded-xl ${
          isDarkMode 
            ? 'bg-blue-900/20 border border-blue-800/30' 
            : 'bg-blue-50 border border-blue-200'
        }`}>
          <p className={`text-xs text-center ${
            isDarkMode ? 'text-blue-300' : 'text-blue-800'
          }`}>
            💡 Təsdiq kodları e-mail və SMS vasitəsilə göndərilir. Lütfən, gələn qutuyu yoxlayın.
          </p>
        </div>

        {/* Footer */}
        <div className={`mt-8 text-center text-sm transition-colors duration-200 ${
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
