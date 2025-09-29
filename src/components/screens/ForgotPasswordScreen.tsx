import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { useApp } from '../../contexts/AppContext';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function ForgotPasswordScreen({ onBack, onSuccess }: ForgotPasswordScreenProps) {
  const [step, setStep] = useState<'email' | 'code' | 'newPassword'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    code?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const { isDarkMode } = useApp();

  const handleSendCode = async () => {
    if (!email.trim()) {
      setErrors({ email: 'E-mail ünvanı mütləqdir' });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Düzgün e-mail ünvanı daxil edin' });
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    // Simulate sending email
    setTimeout(() => {
      setIsLoading(false);
      setStep('code');
      alert('Şifrə bərpa kodu e-mailinizə göndərildi! Demo üçün kodu: 123456');
    }, 1500);
  };

  const handleVerifyCode = () => {
    if (!code.trim()) {
      setErrors({ code: 'Təsdiq kodu mütləqdir' });
      return;
    }

    if (code !== '123456') {
      setErrors({ code: 'Səhv kod! Demo üçün 123456 daxil edin.' });
      return;
    }

    setErrors({});
    setStep('newPassword');
  };

  const handleResetPassword = async () => {
    const newErrors: typeof errors = {};

    if (!newPassword.trim()) {
      newErrors.newPassword = 'Yeni şifrə mütləqdir';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Şifrə ən azı 6 simvoldan ibarət olmalıdır';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Şifrə təsdiqi mütləqdir';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Şifrələr uyğun gəlmir';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      alert('Şifrəniz uğurla yeniləndi!');
      onSuccess();
    }, 1500);
  };

  const renderStepContent = () => {
    switch (step) {
      case 'email':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className={`text-lg font-bold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Şifrəni unutmusan?
              </h2>
              <p className={`text-sm transition-colors duration-200 mt-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                E-mail ünvanını daxil et, bərpa linki göndərəcəyik
              </p>
            </div>

            <Input
              type="email"
              value={email}
              onChange={setEmail}
              label="E-mail ünvanı"
              placeholder="E-poçtunuzu daxil edin"
              icon="📧"
              error={errors.email}
              required
            />

            <Button
              onClick={handleSendCode}
              loading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Göndərilir...' : 'Bərpa kodu göndər'}
            </Button>
          </div>
        );

      case 'code':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className={`text-lg font-bold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Təsdiq kodu
              </h2>
              <p className={`text-sm transition-colors duration-200 mt-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span className="font-medium">{email}</span> ünvanına göndərilən kodu daxil et
              </p>
            </div>

            <Input
              value={code}
              onChange={setCode}
              label="Təsdiq kodu"
              placeholder="6 rəqəmli kod"
              icon="💬"
              error={errors.code}
              required
            />

            <div className="flex gap-3">
              <Button
                onClick={() => setStep('email')}
                variant="secondary"
                className="flex-1"
              >
                Geri
              </Button>
              <Button
                onClick={handleVerifyCode}
                className="flex-1"
              >
                Təsdiq et
              </Button>
            </div>

            <div className="text-center">
              <button
                onClick={handleSendCode}
                className={`text-xs font-medium transition-colors duration-200 hover:underline opacity-70 hover:opacity-100 ${
                  isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
                }`}
              >
                Kodu yenidən göndər
              </button>
            </div>
          </div>
        );

      case 'newPassword':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className={`text-lg font-bold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Yeni şifrə
              </h2>
              <p className={`text-sm transition-colors duration-200 mt-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Hesabın üçün yeni şifrə təyin et
              </p>
            </div>

            <Input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={setNewPassword}
              label="Yeni şifrə"
              placeholder="Ən azı 6 simvol"
              icon="🔐"
              error={errors.newPassword}
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`text-lg transition-colors duration-200 hover:scale-110 transform ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              }
            />

            <Input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={setConfirmPassword}
              label="Şifrəni təsdiqlə"
              placeholder="Şifrəni təkrar daxil et"
              icon="🔒"
              error={errors.confirmPassword}
              required
            />

            <Button
              onClick={handleResetPassword}
              loading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Yenilənir...' : 'Şifrəni yenilə'}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900' 
        : 'bg-gradient-to-b from-gray-50 via-white to-blue-50/30'
    } pt-11`}>
      {/* Soft, calming background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Gentle floating orbs */}
        <div className={`absolute top-1/4 left-1/6 w-64 h-64 rounded-full blur-3xl ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-300/20'
        } animate-pulse`} style={{ animationDuration: '4s' }}></div>
        <div className={`absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full blur-3xl ${
          isDarkMode ? 'bg-purple-500/5' : 'bg-purple-200/20'
        } animate-pulse`} style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        
        {/* Subtle themed elements */}
        <div className="absolute top-16 right-8 opacity-30">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
          } backdrop-blur-sm animate-bounce-subtle`}>
            🔑
          </div>
        </div>
        <div className="absolute bottom-20 left-8 opacity-30">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
          } backdrop-blur-sm animate-bounce-subtle`} style={{ animationDelay: '1s' }}>
            💬
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80' 
                  : 'bg-white/90 text-gray-600 hover:bg-white/95'
              } backdrop-blur-sm shadow-md hover:shadow-lg`}
            >
              ← Geri
            </button>
          </div>
          
          <div className="space-y-2">
            <h1 className={`text-xl font-black transition-all duration-300 bg-gradient-to-r ${
              isDarkMode 
                ? 'from-emerald-400 via-green-400 to-emerald-500' 
                : 'from-emerald-600 via-green-600 to-emerald-700'
              } bg-clip-text text-transparent`}>
              Digital Driving Academy
            </h1>
            <p className={`text-sm font-medium transition-colors duration-200 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>
              Şifrə bərpası
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className={`p-8 transition-all duration-300 backdrop-blur-lg ${
          isDarkMode 
            ? 'bg-gray-800/90 border-gray-600/30 shadow-2xl' 
            : 'bg-white/95 border-white/50 shadow-xl'
        } hover:shadow-2xl`}>
          {renderStepContent()}
        </Card>

        {/* Help text */}
        <div className={`mt-8 text-center text-sm ${
          isDarkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <p className="opacity-70">Kömək lazımdır?</p>
          <a 
            href="mailto:support@dda.az" 
            className={`font-medium transition-colors duration-200 hover:underline ${
              isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
            }`}
          >
            support@dda.az
          </a>
        </div>
      </div>
    </div>
  );
}