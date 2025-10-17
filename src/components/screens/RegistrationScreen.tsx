import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { useApp } from '../../contexts/AppContext';

interface RegistrationScreenProps {
  onBack: () => void;
  onRegister: (data: { email: string; phone: string }) => void;
}

export function RegistrationScreen({ onBack, onRegister }: RegistrationScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    gender?: string;
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
      onRegister({ email, phone });
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

        {/* Registration Form - Single Page */}
        <Card className={`p-6 transition-all duration-300 backdrop-blur-lg ${
          isDarkMode 
            ? 'bg-gray-800/90 border-gray-600/30 shadow-2xl' 
            : 'bg-white/95 border-white/50 shadow-xl'
        } hover:shadow-2xl`}>
          <div className="space-y-4">
            {/* Basic Info */}
            <div>
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
            </div>

            {/* Contact - Compact */}
            <div className="grid grid-cols-1 gap-4">
              <Input
                type="email"
                value={email}
                onChange={setEmail}
                label="E-mail"
                placeholder="email@example.com"
                icon="📧"
                error={errors.email}
                required
              />
              
              <Input
                type="tel"
                value={phone}
                onChange={setPhone}
                label="Telefon"
                placeholder="+994 XX XXX XX XX"
                icon="📱"
                error={errors.phone}
                required
              />
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 gap-4">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={setPassword}
                label="Şifrə"
                placeholder="Min 6 simvol"
                icon="🔐"
                error={errors.password}
                required
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`text-lg transition-colors duration-200 ${
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
                    className={`text-lg transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                }
              />
            </div>

            {/* Optional Personal Info - Collapsed by default */}
            <div className={`border-t pt-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                type="button"
                onClick={() => setShowOptionalFields(!showOptionalFields)}
                className={`w-full flex items-center justify-between py-2 text-sm font-medium transition-colors ${
                  isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>Əlavə məlumatlar</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                  }`}>İstəyə bağlı</span>
                </span>
                <span className="text-lg">{showOptionalFields ? '▲' : '▼'}</span>
              </button>
              
              {showOptionalFields && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Doğum tarixi
                      </label>
                      <Input
                        type="date"
                        value={birthDate}
                        onChange={setBirthDate}
                        icon="🎂"
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Cins
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setGender('male')}
                          className={`flex-1 p-2 rounded-lg border transition-all duration-200 ${
                            gender === 'male'
                              ? isDarkMode
                                ? 'border-emerald-500 bg-emerald-500/10'
                                : 'border-emerald-600 bg-emerald-50'
                              : isDarkMode
                              ? 'border-gray-600 bg-gray-700/40 hover:border-gray-500'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="text-xl">👨</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setGender('female')}
                          className={`flex-1 p-2 rounded-lg border transition-all duration-200 ${
                            gender === 'female'
                              ? isDarkMode
                                ? 'border-emerald-500 bg-emerald-500/10'
                                : 'border-emerald-600 bg-emerald-50'
                              : isDarkMode
                              ? 'border-gray-600 bg-gray-700/40 hover:border-gray-500'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="text-xl">👩</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
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
              ← Girişə qayıt
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
