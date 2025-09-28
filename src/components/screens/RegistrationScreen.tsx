import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { useApp } from '../../contexts/AppContext';

interface RegistrationData {
  firstName: string;
  lastName: string;
  fatherName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'male' | 'female' | '';
}

interface RegistrationScreenProps {
  onBack: () => void;
  onRegister: () => void;
}

export function RegistrationScreen({ onBack, onRegister }: RegistrationScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    fatherName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: ''
  });
  const [errors, setErrors] = useState<Partial<RegistrationData>>({});
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const { isDarkMode } = useApp();

  const totalSteps = 3;

  const updateField = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<RegistrationData> = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'Ad mütləqdir';
      if (!formData.lastName.trim()) newErrors.lastName = 'Soyad mütləqdir';
      if (!formData.fatherName.trim()) newErrors.fatherName = 'Ata adı mütləqdir';
    } else if (step === 2) {
      if (!formData.email.trim()) newErrors.email = 'E-mail mütləqdir';
      if (!formData.phone.trim()) newErrors.phone = 'Telefon nömrəsi mütləqdir';
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Düzgün e-mail ünvanı daxil edin';
      }
    } else if (step === 3) {
      if (!formData.birthDate) newErrors.birthDate = 'Doğum tarixi mütləqdir';
      if (!formData.gender) newErrors.gender = 'Cins mütləqdir';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleRegister();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSendCode = () => {
    if (!formData.phone.trim()) {
      setErrors(prev => ({ ...prev, phone: 'Telefon nömrəsi mütləqdir' }));
      return;
    }
    setShowCodeInput(true);
    // Simulate SMS sending
    setTimeout(() => {
      alert('SMS kodu göndərildi: 123456 (demo)');
    }, 500);
  };

  const handleVerifyCode = () => {
    if (verificationCode === '123456') {
      setPhoneVerified(true);
      setShowCodeInput(false);
      alert('Telefon nömrəsi təsdiqləndi!');
    } else {
      alert('Səhv kod! Demo üçün 123456 daxil edin.');
    }
  };

  const handleRegister = async () => {
    if (!phoneVerified) {
      alert('Zəhmət olmasa telefon nömrənizi təsdiqləyin');
      return;
    }
    
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      onRegister();
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className={`text-xl font-bold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Şəxsi məlumatlar
              </h2>
              <p className={`text-sm transition-colors duration-200 mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Zəhmət olmasa adınızı və soyadınızı daxil edin
              </p>
            </div>

            <Input
              value={formData.firstName}
              onChange={(value) => updateField('firstName', value)}
              label="Ad"
              placeholder="Adınızı daxil edin"
              icon="👤"
              error={errors.firstName}
              required
            />

            <Input
              value={formData.lastName}
              onChange={(value) => updateField('lastName', value)}
              label="Soyad"
              placeholder="Soyadınızı daxil edin"
              icon="👤"
              error={errors.lastName}
              required
            />

            <Input
              value={formData.fatherName}
              onChange={(value) => updateField('fatherName', value)}
              label="Ata adı"
              placeholder="Ata adınızı daxil edin"
              icon="👨‍👦"
              error={errors.fatherName}
              required
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className={`text-xl font-bold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Əlaqə məlumatları
              </h2>
              <p className={`text-sm transition-colors duration-200 mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                E-mail və telefon nömrənizi daxil edin
              </p>
            </div>

            <Input
              type="email"
              value={formData.email}
              onChange={(value) => updateField('email', value)}
              label="E-mail ünvanı"
              placeholder="ornek@email.com"
              icon="📧"
              error={errors.email}
              required
            />

            <div className="space-y-4">
              <Input
                type="tel"
                value={formData.phone}
                onChange={(value) => updateField('phone', value)}
                label="Telefon nömrəsi"
                placeholder="+994 XX XXX XX XX"
                icon="📱"
                error={errors.phone}
                required
                rightElement={
                  phoneVerified ? (
                    <span className="text-green-500 text-lg">✅</span>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleSendCode}
                      className="text-xs px-3 py-1"
                    >
                      Kod göndər
                    </Button>
                  )
                }
              />

              {showCodeInput && !phoneVerified && (
                <div className="space-y-3">
                  <Input
                    value={verificationCode}
                    onChange={setVerificationCode}
                    label="SMS kodu"
                    placeholder="6 rəqəmli kodu daxil edin"
                    icon="💬"
                  />
                  <Button
                    size="sm"
                    onClick={handleVerifyCode}
                    className="w-full"
                  >
                    Təsdiq et
                  </Button>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className={`text-xl font-bold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Əlavə məlumatlar
              </h2>
              <p className={`text-sm transition-colors duration-200 mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Doğum tarixi və cinsinizi seçin
              </p>
            </div>

            <Input
              type="date"
              value={formData.birthDate}
              onChange={(value) => updateField('birthDate', value)}
              label="Doğum tarixi"
              icon="📅"
              error={errors.birthDate}
              required
            />

            <div className="space-y-3">
              <label className={`block text-sm font-semibold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Cins <span className="text-red-500">*</span>
              </label>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => updateField('gender', 'male')}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    formData.gender === 'male'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : isDarkMode
                        ? 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                        : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  <div className="text-2xl mb-2">👨</div>
                  <div className={`font-medium ${
                    formData.gender === 'male' 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Kişi
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => updateField('gender', 'female')}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    formData.gender === 'female'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : isDarkMode
                        ? 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                        : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  <div className="text-2xl mb-2">👩</div>
                  <div className={`font-medium ${
                    formData.gender === 'female' 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Qadın
                  </div>
                </button>
              </div>
              
              {errors.gender && (
                <p className="text-sm text-red-500 font-medium flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.gender}
                </p>
              )}
            </div>
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
        : 'bg-gradient-to-br from-emerald-50 via-white to-green-50'
    } pt-11`}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-400/20'
        }`}></div>
        <div className={`absolute bottom-32 right-16 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/10' : 'bg-blue-400/15'
        }`} style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={handleBack}
              className={`p-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-800/80 text-gray-200 hover:bg-gray-700/80' 
                  : 'bg-white/80 text-gray-700 hover:bg-gray-50/80'
              } backdrop-blur-sm shadow-lg`}
            >
              ←
            </button>
            
            <div className="flex-1">
              <h1 className={`text-2xl font-black transition-all duration-300 bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-emerald-400 via-green-400 to-emerald-500' 
                  : 'from-emerald-600 via-green-600 to-emerald-700'
              } bg-clip-text text-transparent`}>
                Qeydiyyat
              </h1>
              <p className={`text-sm font-medium transition-colors duration-200 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-600'
              }`}>
                Digital Driving Academy
              </p>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i + 1 === currentStep
                    ? 'bg-emerald-500 text-white scale-110'
                    : i + 1 < currentStep
                      ? 'bg-emerald-400 text-white'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-200 text-gray-500'
                }`}>
                  {i + 1 < currentStep ? '✓' : i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`w-8 h-1 mx-1 rounded-full transition-colors duration-300 ${
                    i + 1 < currentStep 
                      ? 'bg-emerald-400' 
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className={`p-8 transition-all duration-300 backdrop-blur-lg ${
          isDarkMode 
            ? 'bg-gray-800/80 border-gray-600/50 shadow-2xl' 
            : 'bg-white/80 border-gray-200/50 shadow-2xl'
        }`}>
          {renderStepContent()}

          <div className="flex gap-4 mt-8">
            <Button
              onClick={handleBack}
              variant="secondary"
              className="flex-1"
            >
              Geri
            </Button>
            
            <Button
              onClick={handleNext}
              loading={isLoading}
              className="flex-1"
            >
              {currentStep === totalSteps ? 'Qeydiyyatı tamamla' : 'Növbəti'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}