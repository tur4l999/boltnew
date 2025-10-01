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
          <p className="opacity-70 mb-3">Kömək lazımdır?</p>
          <div className="flex items-center justify-center gap-3">
            <a 
              href="mailto:info@dda.az" 
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              📧 E-mail
            </a>
            
            <a 
              href="https://wa.me/994512155454?text=Salam,%20Digital%20Driving%20Academy%20ilə%20bağlı%20kömək%20lazımdır"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20' 
                  : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}