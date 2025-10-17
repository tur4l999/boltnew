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
  const [step, setStep] = useState<'email' | 'code' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    code?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const { isDarkMode } = useApp();

  const handleSendCode = async () => {
    if (!email.trim()) {
      setErrors({ email: 'E-mail ünvanı daxil edilməlidir' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'E-mail ünvanı düzgün formatda deyil' });
      return;
    }

    setIsLoading(true);
    setErrors({});
    // Simulate sending code
    setTimeout(() => {
      setIsLoading(false);
      setStep('code');
    }, 1500);
  };

  const handleVerifyCode = async () => {
    if (!code.trim()) {
      setErrors({ code: 'Təsdiq kodu daxil edilməlidir' });
      return;
    }
    if (code.length !== 6) {
      setErrors({ code: 'Təsdiq kodu 6 rəqəmli olmalıdır' });
      return;
    }

    setIsLoading(true);
    setErrors({});
    // Simulate code verification
    setTimeout(() => {
      setIsLoading(false);
      setStep('reset');
    }, 1000);
  };

  const handleResetPassword = async () => {
    const newErrors: typeof errors = {};

    if (!newPassword) {
      newErrors.newPassword = 'Yeni şifrə daxil edilməlidir';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Şifrə ən azı 6 simvoldan ibarət olmalıdır';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Şifrə təkrarı daxil edilməlidir';
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
      onSuccess();
    }, 1500);
  };

  const renderEmailStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="text-5xl mb-4">🔑</div>
        <h2 className={`text-xl font-bold transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Şifrəni sıfırla
        </h2>
        <p className={`text-sm transition-colors duration-200 mt-2 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          E-mail ünvanınızı daxil edin, təsdiq kodu göndərək
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
        disabled={!email || isLoading}
        className={`w-full py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
          isLoading ? 'animate-pulse' : ''
        } bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Göndərilir...
          </div>
        ) : (
          'Təsdiq kodu göndər'
        )}
      </Button>
    </div>
  );

  const renderCodeStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="text-5xl mb-4">✉️</div>
        <h2 className={`text-xl font-bold transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Təsdiq kodu
        </h2>
        <p className={`text-sm transition-colors duration-200 mt-2 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {email} ünvanına göndərilən 6 rəqəmli kodu daxil edin
        </p>
      </div>

      <Input
        type="text"
        value={code}
        onChange={setCode}
        label="Təsdiq kodu"
        placeholder="6 rəqəmli kod"
        icon="🔢"
        error={errors.code}
        required
        maxLength={6}
      />

      <Button
        onClick={handleVerifyCode}
        disabled={!code || isLoading}
        className={`w-full py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
          isLoading ? 'animate-pulse' : ''
        } bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Yoxlanılır...
          </div>
        ) : (
          'Təsdiq et'
        )}
      </Button>

      <button
        onClick={() => setStep('email')}
        className={`w-full text-sm font-medium transition-colors duration-200 hover:underline ${
          isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
        }`}
      >
        Kodu yenidən göndər
      </button>
    </div>
  );

  const renderResetStep = () => (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <div className="text-5xl mb-4">🔐</div>
        <h2 className={`text-xl font-bold transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Yeni şifrə
        </h2>
        <p className={`text-sm transition-colors duration-200 mt-2 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Yeni şifrənizi təyin edin
        </p>
      </div>

      <Input
        type={showPassword ? "text" : "password"}
        value={newPassword}
        onChange={setNewPassword}
        label="Yeni şifrə"
        placeholder="Yeni şifrənizi daxil edin (min 6 simvol)"
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
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={setConfirmPassword}
        label="Şifrə təkrarı"
        placeholder="Şifrənizi təkrar daxil edin"
        icon="🔐"
        error={errors.confirmPassword}
        required
        rightElement={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={`text-lg transition-colors duration-200 hover:scale-110 transform ${
              isDarkMode 
                ? 'text-gray-400 hover:text-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </button>
        }
      />

      <Button
        onClick={handleResetPassword}
        disabled={isLoading}
        className={`w-full py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
          isLoading ? 'animate-pulse' : ''
        } bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Yadda saxlanılır...
          </div>
        ) : (
          'Şifrəni yenilə'
        )}
      </Button>
    </div>
  );

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
          <div className={`w-32 h-32 mx-auto mb-6 rounded-3xl shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600/50' 
              : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200/50'
          } backdrop-blur-sm relative overflow-hidden`}>
            <img 
              src="/DDA_logo.png" 
              alt="Digital Driving Academy Logo" 
              className="w-20 h-20 object-contain transition-transform duration-300 hover:scale-110 relative z-10"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="relative z-10 text-center">
                      <div class="text-3xl font-black bg-gradient-to-r ${isDarkMode ? 'from-emerald-400 to-green-400' : 'from-emerald-600 to-green-600'} bg-clip-text text-transparent">DDA</div>
                      <div class="text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1">ACADEMY</div>
                    </div>
                  `;
                }
              }}
            />
          </div>
          
          <div>
            <h1 className={`text-2xl font-black transition-all duration-300 bg-gradient-to-r ${
              isDarkMode 
                ? 'from-emerald-400 via-green-400 to-emerald-500' 
                : 'from-emerald-600 via-green-600 to-emerald-700'
            } bg-clip-text text-transparent`}>
              Digital Driving Academy
            </h1>
          </div>
        </div>

        {/* Form Card */}
        <Card className={`p-8 transition-all duration-300 backdrop-blur-lg ${
          isDarkMode 
            ? 'bg-gray-800/90 border-gray-600/30 shadow-2xl' 
            : 'bg-white/95 border-white/50 shadow-xl'
        } hover:shadow-2xl`}>
          {step === 'email' && renderEmailStep()}
          {step === 'code' && renderCodeStep()}
          {step === 'reset' && renderResetStep()}

          <Button
            onClick={onBack}
            variant="secondary"
            className={`w-full py-3 text-base font-medium rounded-xl transition-all duration-300 mt-4 ${
              isDarkMode 
                ? 'bg-gray-700/40 hover:bg-gray-600/40 text-gray-200' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            ← Geri
          </Button>
        </Card>

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
