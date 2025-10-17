import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Icon } from '../icons/Icon';
import { useApp } from '../../contexts/AppContext';

interface RegistrationData {
  fullName?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  password?: string;
  confirmPassword?: string;
}

interface RegistrationScreenProps {
  onBack: () => void;
  onRegister: (data: { email: string; phone: string; fullData: RegistrationData }) => void;
  initialData?: RegistrationData;
}

export function RegistrationScreen({ onBack, onRegister, initialData }: RegistrationScreenProps) {
  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [birthDate, setBirthDate] = useState(initialData?.birthDate || '');
  const [gender, setGender] = useState(initialData?.gender || '');
  const [password, setPassword] = useState(initialData?.password || '');
  const [confirmPassword, setConfirmPassword] = useState(initialData?.confirmPassword || '');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(initialData?.email ? 4 : 1); // If editing, go to step 4 (contact)
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

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName || '');
      setEmail(initialData.email || '');
      setPhone(initialData.phone || '');
      setBirthDate(initialData.birthDate || '');
      setGender(initialData.gender || '');
      setPassword(initialData.password || '');
      setConfirmPassword(initialData.confirmPassword || '');
      if (initialData.email) setStep(4); // Go to contact step (now step 4) when editing
    }
  }, [initialData]);

  const validateStep = () => {
    const newErrors: typeof errors = {};

    if (step === 1) {
      if (!fullName.trim()) {
        newErrors.fullName = 'Ad və soyad daxil edilməlidir';
      }
    } else if (step === 2) {
      if (!birthDate) {
        newErrors.birthDate = 'Doğum tarixini seçin';
      }
      if (!gender) {
        newErrors.gender = 'Cinsinizi seçin';
      }
    } else if (step === 3) {
      // Step 3 is now PASSWORD
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
    } else if (step === 4) {
      // Step 4 is now CONTACT
      if (!email.trim()) {
        newErrors.email = 'E-mail ünvanı daxil edilməlidir';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'E-mail ünvanı düzgün formatda deyil';
      }
      if (!phone.trim()) {
        newErrors.phone = 'Telefon nömrəsi daxil edilməlidir';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < 4) setStep((step + 1) as 1 | 2 | 3 | 4);
  };

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as 1 | 2 | 3 | 4);
  };

  const handleRegister = async () => {
    if (!validateStep()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onRegister({ 
        email, 
        phone,
        fullData: {
          fullName,
          email,
          phone,
          birthDate,
          gender,
          password,
          confirmPassword
        }
      });
    }, 1500);
  };

  return (
    <div className={`min-h-screen flex items-start justify-center p-4 pt-6 relative transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900' 
        : 'bg-gradient-to-b from-gray-50 via-white to-emerald-50/30'
    }`}>
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
        <div className="text-center mb-4">
          <div className={`w-20 h-20 mx-auto mb-3 rounded-2xl shadow-lg flex items-center justify-center transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600/50' 
              : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200/50'
          } backdrop-blur-sm`}>
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
            <h1 className={`text-xl font-bold transition-all duration-300 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Qeydiyyat
            </h1>
          </div>
        </div>

        {/* Beautiful Progress Indicator */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                s < step
                  ? 'bg-emerald-500 text-white shadow-lg scale-110'
                  : s === step
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-xl scale-125 ring-4 ring-emerald-200/50'
                  : isDarkMode
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {s < step ? '✓' : s}
              </div>
              {s < 4 && (
                <div className={`h-0.5 w-12 transition-all duration-300 ${
                  s < step
                    ? 'bg-emerald-500'
                    : isDarkMode
                    ? 'bg-gray-700'
                    : 'bg-gray-300'
                }`} style={{ position: 'absolute', left: 'calc(50% + 20px)', top: '20px' }} />
              )}
            </div>
          ))}
        </div>

        {/* Registration Form */}
        <Card className={`p-6 transition-all duration-300 backdrop-blur-lg ${
          isDarkMode 
            ? 'bg-gray-800/90 border-gray-600/30 shadow-2xl' 
            : 'bg-white/95 border-white/50 shadow-xl'
        } hover:shadow-2xl min-h-[360px]`}>
          <div className="space-y-5">
            {/* Step 1: Name */}
            {step === 1 && (
              <div className="animate-fade-in space-y-5">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'
                  }`}>
                    <Icon name="user" size={32} className="text-emerald-600" />
                  </div>
                  <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Tanış olaq
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Adınızı və soyadınızı daxil edin
                  </p>
                </div>
                
                <Input
                  type="text"
                  value={fullName}
                  onChange={setFullName}
                  label="Ad və Soyad"
                  placeholder="Məsələn: Əli Məmmədov"
                  error={errors.fullName}
                  required
                />

                <div className="pt-2">
                  <Button
                    onClick={handleNext}
                    className="w-full py-3.5 text-base font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl"
                  >
                    Davam et →
                  </Button>
                  <Button
                    onClick={onBack}
                    variant="secondary"
                    className={`w-full mt-2 py-3 text-sm font-medium rounded-xl ${
                      isDarkMode ? 'bg-gray-700/40 hover:bg-gray-600/40 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    ← Girişə qayıt
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Birth Date & Gender */}
            {step === 2 && (
              <div className="animate-fade-in space-y-5">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'
                  }`}>
                    <Icon name="calendar" size={32} className="text-emerald-600" />
                  </div>
                  <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Bir az tanış olaq
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Doğum tarixiniz və cinsiniz
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Doğum tarixi <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={birthDate}
                    onChange={setBirthDate}
                    error={errors.birthDate}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Cins <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                        gender === 'male'
                          ? isDarkMode
                            ? 'border-emerald-500 bg-emerald-500/20 shadow-lg scale-105'
                            : 'border-emerald-600 bg-emerald-50 shadow-lg scale-105'
                          : isDarkMode
                          ? 'border-gray-600 bg-gray-700/40 hover:border-gray-500 hover:scale-105'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:scale-105'
                      }`}
                    >
                      <Icon name="user" size={32} className={gender === 'male' ? 'text-emerald-600' : isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                      <div className={`font-bold text-lg mt-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        Kişi
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                        gender === 'female'
                          ? isDarkMode
                            ? 'border-emerald-500 bg-emerald-500/20 shadow-lg scale-105'
                            : 'border-emerald-600 bg-emerald-50 shadow-lg scale-105'
                          : isDarkMode
                          ? 'border-gray-600 bg-gray-700/40 hover:border-gray-500 hover:scale-105'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:scale-105'
                      }`}
                    >
                      <Icon name="user" size={32} className={gender === 'female' ? 'text-emerald-600' : isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                      <div className={`font-bold text-lg mt-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        Qadın
                      </div>
                    </button>
                  </div>
                  {errors.gender && <p className="mt-2 text-sm text-red-500">{errors.gender}</p>}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleBack}
                    variant="secondary"
                    className={`flex-1 py-4 text-base font-medium rounded-xl ${
                      isDarkMode ? 'bg-gray-700/40 hover:bg-gray-600/40 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    ← Geri
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-[2] py-4 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl"
                  >
                    Davam et →
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Password (swapped with step 4) */}
            {step === 3 && (
              <div className="animate-fade-in space-y-5">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'
                  }`}>
                    <Icon name="lock" size={32} className="text-emerald-600" />
                  </div>
                  <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Təhlükəsiz şifrə
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Hesabınızı qorumaq üçün şifrə yaradın
                  </p>
                </div>
                
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={setPassword}
                  label="Şifrə"
                  placeholder="Ən azı 6 simvol"
                  error={errors.password}
                  required
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} />
                    </button>
                  }
                />
                
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  label="Şifrə təkrarı"
                  placeholder="Şifrənizi təkrar daxil edin"
                  error={errors.confirmPassword}
                  required
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} />
                    </button>
                  }
                />

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleBack}
                    variant="secondary"
                    className={`flex-1 py-3 text-sm font-medium rounded-xl ${
                      isDarkMode ? 'bg-gray-700/40 hover:bg-gray-600/40 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    ← Geri
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-[2] py-3 text-base font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl"
                  >
                    Davam et →
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Contact (swapped with step 3) */}
            {step === 4 && (
              <div className="animate-fade-in space-y-5">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'
                  }`}>
                    <Icon name="smartphone" size={32} className="text-emerald-600" />
                  </div>
                  <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Əlaqə məlumatları
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Təsdiqləmə üçün lazım olacaq
                  </p>
                </div>

                <Input
                  type="email"
                  value={email}
                  onChange={setEmail}
                  label="E-mail ünvanı"
                  placeholder="email@example.com"
                  error={errors.email}
                  required
                />
                
                <Input
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  label="Telefon nömrəsi"
                  placeholder="+994 XX XXX XX XX"
                  error={errors.phone}
                  required
                />

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleBack}
                    variant="secondary"
                    className={`flex-1 py-3 text-sm font-medium rounded-xl ${
                      isDarkMode ? 'bg-gray-700/40 hover:bg-gray-600/40 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    ← Geri
                  </Button>
                  <Button
                    onClick={handleRegister}
                    disabled={isLoading}
                    className={`flex-[2] py-3 text-base font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                      isLoading ? 'animate-pulse' : ''
                    } bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Qeydiyyat...
                      </div>
                    ) : (
                      'Qeydiyyatdan keç'
                    )}
                  </Button>
                </div>
              </div>
            )}
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
