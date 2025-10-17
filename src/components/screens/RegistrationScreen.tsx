import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { useApp } from '../../contexts/AppContext';
import { VerificationModal } from './VerificationModal';

interface RegistrationScreenProps {
  onBack: () => void;
  onRegister: () => void;
}

export function RegistrationScreen({ onBack, onRegister }: RegistrationScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const { isDarkMode } = useApp();

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Ad və soyad daxil edilməlidir';
    }

    if (!email.trim()) {
      newErrors.email = 'E-mail ünvanı daxil edilməlidir';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail ünvanı düzgün formatda deyil';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Telefon nömrəsi daxil edilməlidir';
    }

    if (!password) {
      newErrors.password = 'Şifrə daxil edilməlidir';
    } else if (password.length < 6) {
      newErrors.password = 'Şifrə ən azı 6 simvoldan ibarət olmalıdır';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Şifrə təkrarı daxil edilməlidir';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Şifrələr uyğun gəlmir';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    // Simulate registration delay
    setTimeout(() => {
      setIsLoading(false);
      setShowVerification(true);
    }, 1500);
  };

  const handleVerificationComplete = () => {
    onRegister();
  };

  const handleVerificationBack = () => {
    setShowVerification(false);
  };

  // Show verification modal if verification is needed
  if (showVerification) {
    return (
      <VerificationModal
        email={email}
        phone={phone}
        onVerificationComplete={handleVerificationComplete}
        onBack={handleVerificationBack}
      />
    );
  }

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
              Qeydiyyat
            </h1>
            <p className={`text-sm font-medium mt-2 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>
              Hesab yaradın və təhsilə başlayın
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <Card className={`p-8 transition-all duration-300 backdrop-blur-lg ${
          isDarkMode 
            ? 'bg-gray-800/90 border-gray-600/30 shadow-2xl' 
            : 'bg-white/95 border-white/50 shadow-xl'
        } hover:shadow-2xl`}>
          <div className="space-y-5">
            <Input
              type="text"
              value={fullName}
              onChange={setFullName}
              label="Ad və Soyad"
              placeholder="Adınızı və soyadınızı daxil edin"
              icon="👤"
              error={errors.fullName}
              required
            />
            
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
            
            <Input
              type="tel"
              value={phone}
              onChange={setPhone}
              label="Telefon nömrəsi"
              placeholder="+994 XX XXX XX XX"
              icon="📱"
              error={errors.phone}
              required
            />
            
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={setPassword}
              label="Şifrə"
              placeholder="Şifrənizi daxil edin (min 6 simvol)"
              icon="🔐"
              error={errors.password}
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
              onClick={handleRegister}
              disabled={isLoading}
              className={`w-full py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                isLoading ? 'animate-pulse' : ''
              } bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Qeydiyyat aparılır...
                </div>
              ) : (
                'Qeydiyyatdan keç'
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
