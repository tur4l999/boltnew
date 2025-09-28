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
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                🔑
              </div>
              <h2 className={`text-xl font-bold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Şifrəni unutmusan?
              </h2>
              <p className={`text-sm transition-colors duration-200 mt-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Narahat olma! E-mail ünvanını daxil et, şifrə bərpa linki göndərəcəyik.
              </p>
            </div>

            <Input
              type="email"
              value={email}
              onChange={setEmail}
              label="E-mail ünvanı"
              placeholder="ornek@email.com"
              icon="📧"
              error={errors.email}
              required
            />

            <Button
              onClick={handleSendCode}
              loading={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? 'Göndərilir...' : 'Bərpa kodu göndər'}
            </Button>
          </div>
        );

      case 'code':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-2xl">
                💬
              </div>
              <h2 className={`text-xl font-bold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Kodu daxil et
              </h2>
              <p className={`text-sm transition-colors duration-200 mt-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span className="font-semibold">{email}</span> ünvanına göndərilən 6 rəqəmli kodu daxil et.
              </p>
            </div>

            <Input
              value={code}
              onChange={setCode}
              label="Təsdiq kodu"
              placeholder="123456"
              icon="🔢"
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
                className={`text-sm font-medium transition-colors duration-200 hover:underline ${
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl">
                🔐
              </div>
              <h2 className={`text-xl font-bold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Yeni şifrə təyin et
              </h2>
              <p className={`text-sm transition-colors duration-200 mt-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Hesabın üçün güclü və unudulmaz şifrə seç.
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
              size="lg"
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
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    } pt-11`}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/10' : 'bg-blue-400/20'
        }`}></div>
        <div className={`absolute bottom-32 right-16 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-purple-500/10' : 'bg-purple-400/15'
        }`} style={{ animationDelay: '1s' }}></div>
        
        {/* Floating icons */}
        <div className="absolute top-20 right-20 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-xl backdrop-blur-sm border border-white/10 animate-bounce-subtle">
          🔑
        </div>
        <div className="absolute bottom-40 left-16 w-10 h-10 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-xl flex items-center justify-center text-lg backdrop-blur-sm border border-white/10 animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
          💬
        </div>
      </div>
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={onBack}
              className={`p-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-800/80 text-gray-200 hover:bg-gray-700/80' 
                  : 'bg-white/80 text-gray-700 hover:bg-gray-50/80'
              } backdrop-blur-sm shadow-lg`}
            >
              ←
            </button>
            
            <div className="flex-1">
              <h1 className={`text-lg font-black transition-all duration-300 bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-blue-400 via-purple-400 to-blue-500' 
                  : 'from-blue-600 via-purple-600 to-blue-700'
              } bg-clip-text text-transparent`}>
                Digital Driving Academy
              </h1>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className={`p-8 transition-all duration-300 backdrop-blur-lg ${
          isDarkMode 
            ? 'bg-gray-800/80 border-gray-600/50 shadow-2xl' 
            : 'bg-white/80 border-gray-200/50 shadow-2xl'
        }`}>
          {renderStepContent()}
        </Card>

        {/* Help text */}
        <div className={`mt-6 text-center text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p>Kömək lazımdır? Bizə müraciət edin:</p>
          <a 
            href="mailto:support@dda.az" 
            className={`font-medium transition-colors duration-200 hover:underline ${
              isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            support@dda.az
          </a>
        </div>
      </div>
    </div>
  );
}