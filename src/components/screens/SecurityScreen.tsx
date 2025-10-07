import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Icon } from '../icons/Icon';

export function SecurityScreen() {
  const { goBack, isDarkMode } = useApp();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricSupported, setBiometricSupported] = useState(true);
  const [biometricProcessing, setBiometricProcessing] = useState(false);
  
  // Password change states
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [step, setStep] = useState<'initial' | 'code' | 'newPassword'>('initial');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const userEmail = "tural.qarayev@example.com";
  const correctCode = "123456"; // Demo kod

  // Check if biometric authentication is supported
  React.useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    // Check if Web Authentication API is available
    if (!window.PublicKeyCredential) {
      setBiometricSupported(false);
      return;
    }

    try {
      // Check if platform authenticator (biometric) is available
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      setBiometricSupported(available);
    } catch (error) {
      console.error('Biometric support check failed:', error);
      setBiometricSupported(false);
    }
  };

  const handleBiometricToggle = async () => {
    if (!biometricSupported) {
      alert('❌ Bu cihazda biometrik autentifikasiya dəstəklənmir!');
      return;
    }

    if (biometricEnabled) {
      // Deactivate biometric - just confirm
      if (confirm('Biometrik autentifikasiyanı deaktiv etmək istədiyinizə əminsiniz?')) {
        setBiometricEnabled(false);
        alert('✅ Biometrik autentifikasiya deaktiv edildi');
      }
      return;
    }

    // Activate biometric - request permission
    setBiometricProcessing(true);
    
    try {
      await requestBiometricAuthentication();
      setBiometricEnabled(true);
      alert('✅ Biometrik autentifikasiya uğurla aktivləşdirildi!\n\n🔐 İndi Face ID, Touch ID və ya barmaq izi ilə giriş edə bilərsiniz.');
    } catch (error: any) {
      console.error('Biometric authentication failed:', error);
      
      // User-friendly error messages
      if (error.name === 'NotAllowedError') {
        alert('❌ İcazə verilmədi!\n\nBiometrik autentifikasiya üçün icazə lazımdır.');
      } else if (error.name === 'NotSupportedError') {
        alert('❌ Dəstəklənmir!\n\nBu cihazda biometrik autentifikasiya dəstəklənmir.');
      } else if (error.name === 'SecurityError') {
        alert('❌ Təhlükəsizlik xətası!\n\nHTTPS bağlantısı tələb olunur.');
      } else {
        alert('❌ Xəta baş verdi!\n\nBiometrik autentifikasiya aktivləşdirilə bilmədi.');
      }
      
      setBiometricEnabled(false);
    } finally {
      setBiometricProcessing(false);
    }
  };

  const requestBiometricAuthentication = async () => {
    // Generate a random challenge
    const challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);

    // User information
    const user = {
      id: new Uint8Array(16),
      name: userEmail,
      displayName: 'Tural Qarayev'
    };

    // PublicKeyCredential creation options
    const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
      challenge: challenge,
      rp: {
        name: 'DDA Sürücülük Tədris Mərkəzi',
        id: window.location.hostname
      },
      user: user,
      pubKeyCredParams: [
        {
          type: 'public-key',
          alg: -7 // ES256
        },
        {
          type: 'public-key',
          alg: -257 // RS256
        }
      ],
      authenticatorSelection: {
        authenticatorAttachment: 'platform', // Use platform authenticator (Face ID, Touch ID, etc.)
        userVerification: 'required',
        requireResidentKey: false
      },
      timeout: 60000,
      attestation: 'none'
    };

    try {
      // Request credential creation (this will trigger biometric prompt)
      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
      });

      if (!credential) {
        throw new Error('Credential creation failed');
      }

      // Success - biometric authentication completed
      return credential;
    } catch (error) {
      // Re-throw to be handled by caller
      throw error;
    }
  };

  const handlePasswordChangeClick = () => {
    setShowPasswordChange(true);
    setStep('code');
    setEmailSent(true);
    // Demo: Email göndərildi mesajı
    setTimeout(() => setEmailSent(false), 3000);
  };

  const handleVerifyCode = () => {
    if (verificationCode === correctCode) {
      setStep('newPassword');
    } else {
      alert('❌ Kod yanlışdır! Demo üçün: 123456');
    }
  };

  const handleChangePassword = () => {
    if (newPassword.length < 8) {
      alert('❌ Şifrə ən azı 8 simvol olmalıdır!');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('❌ Şifrələr uyğun gəlmir!');
      return;
    }
    alert('✅ Şifrə uğurla dəyişdirildi!');
    setShowPasswordChange(false);
    setStep('initial');
    setVerificationCode('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleCancel = () => {
    setShowPasswordChange(false);
    setStep('initial');
    setVerificationCode('');
    setNewPassword('');
    setConfirmPassword('');
    setEmailSent(false);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
    } pt-11`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-red-500/5' : 'bg-red-400/10'
        }`}></div>
      </div>

      <div className="relative z-10 p-4 pb-24">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={goBack}
            className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isDarkMode 
                ? 'border-gray-600/50 bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 backdrop-blur-sm' 
                : 'border-gray-300/50 bg-white/80 hover:bg-gray-50/80 text-gray-700 backdrop-blur-sm'
            }`}
          >
            <span className="text-lg">←</span>
          </button>
          <div>
            <h1 className={`text-2xl font-black transition-colors duration-200 bg-gradient-to-r ${
              isDarkMode ? 'from-red-400 to-pink-400' : 'from-red-600 to-pink-600'
            } bg-clip-text text-transparent`}>
              Təhlükəsizlik
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Hesabınızı qoruyun
            </p>
          </div>
        </div>

        {/* Password Section */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-red-600/20' : 'bg-red-100'
            }`}>
              <Icon name="lock" size={20} className={isDarkMode ? 'text-red-400' : 'text-red-600'} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Şifrə
            </h2>
          </div>

          {!showPasswordChange ? (
            <button
              onClick={handlePasswordChangeClick}
              className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200' 
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDarkMode ? 'bg-yellow-600/20' : 'bg-yellow-100'
                }`}>
                  <Icon name="lock" size={20} className={isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} />
                </div>
                <div className="text-left">
                  <div className="font-bold">Şifrəni dəyişdir</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Son dəyişiklik: 30 gün əvvəl
                  </div>
                </div>
              </div>
              <div className="text-2xl">→</div>
            </button>
          ) : (
            <div className="space-y-4">
              {/* Email göndərildi mesajı */}
              {emailSent && (
                <div className={`p-4 rounded-2xl border-2 animate-fadeInUp ${
                  isDarkMode 
                    ? 'border-emerald-500/50 bg-emerald-900/20' 
                    : 'border-emerald-500/50 bg-emerald-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <Icon name="mail" size={24} className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} />
                    <div>
                      <div className={`font-bold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                        ✅ Təsdiqləmə kodu göndərildi
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                        {userEmail} ünvanına kod göndərildi
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Verification Code */}
              {step === 'code' && (
                <div className={`p-4 rounded-2xl border-2 ${
                  isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="mb-4">
                    <label className={`block text-sm font-bold mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Təsdiqləmə kodu
                    </label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="6 rəqəmli kodu daxil edin"
                      maxLength={6}
                      className={`w-full px-4 py-3 rounded-xl border-2 font-mono text-lg text-center transition-all duration-300 ${
                        isDarkMode 
                          ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-500 focus:border-emerald-500' 
                          : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                      } focus:outline-none`}
                    />
                    <div className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      💡 Demo üçün kod: <span className="font-bold">123456</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleVerifyCode}
                      disabled={verificationCode.length !== 6}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${
                        verificationCode.length === 6
                          ? isDarkMode
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : isDarkMode
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Təsdiqlə
                    </button>
                    <button
                      onClick={handleCancel}
                      className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      Ləğv et
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: New Password */}
              {step === 'newPassword' && (
                <div className={`p-4 rounded-2xl border-2 ${
                  isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Yeni şifrə
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Ən azı 8 simvol"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-500 focus:border-emerald-500' 
                            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                        } focus:outline-none`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Şifrəni təsdiqlə
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Şifrəni təkrar daxil edin"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-500 focus:border-emerald-500' 
                            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                        } focus:outline-none`}
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleChangePassword}
                        disabled={newPassword.length < 8 || confirmPassword.length < 8}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${
                          newPassword.length >= 8 && confirmPassword.length >= 8
                            ? isDarkMode
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : isDarkMode
                              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Şifrəni dəyişdir
                      </button>
                      <button
                        onClick={handleCancel}
                        className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                      >
                        Ləğv et
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Two Factor Authentication */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
            }`}>
              <Icon name="shield" size={20} className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              İki faktorlu autentifikasiya
            </h2>
          </div>

          <div className={`p-4 rounded-2xl border-2 mb-4 ${
            twoFactorEnabled
              ? isDarkMode
                ? 'border-emerald-500/50 bg-emerald-900/20'
                : 'border-emerald-500/50 bg-emerald-50'
              : isDarkMode
                ? 'border-gray-700 bg-gray-800/50'
                : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-bold mb-1">SMS təsdiqləmə</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {twoFactorEnabled ? '✓ Aktiv' : 'Deaktiv'}
                </div>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`w-14 h-8 rounded-full transition-all duration-300 ${
                  twoFactorEnabled
                    ? 'bg-emerald-600'
                    : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                  twoFactorEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
            {twoFactorEnabled && (
              <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-100'}`}>
                <div className={`text-sm flex items-center gap-2 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                  <Icon name="phone" size={16} />
                  Təsdiqləmə kodu: +994 XX XXX XX 23
                </div>
              </div>
            )}
          </div>

          <div className={`p-4 rounded-2xl border-2 ${
            biometricEnabled
              ? isDarkMode
                ? 'border-emerald-500/50 bg-emerald-900/20'
                : 'border-emerald-500/50 bg-emerald-50'
              : isDarkMode
                ? 'border-gray-700 bg-gray-800/50'
                : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <div className="font-bold mb-1 flex items-center gap-2">
                  Biometrik autentifikasiya
                  {biometricProcessing && (
                    <div className="animate-spin">⏳</div>
                  )}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {biometricSupported 
                    ? 'Face ID / Touch ID / Barmaq izi'
                    : '❌ Bu cihazda dəstəklənmir'}
                </div>
              </div>
              <button
                onClick={handleBiometricToggle}
                disabled={!biometricSupported || biometricProcessing}
                className={`w-14 h-8 rounded-full transition-all duration-300 ${
                  !biometricSupported || biometricProcessing
                    ? 'opacity-50 cursor-not-allowed bg-gray-400'
                    : biometricEnabled
                      ? 'bg-emerald-600'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                  biometricEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
            
            {biometricEnabled && (
              <div className={`p-3 rounded-xl border ${
                isDarkMode 
                  ? 'bg-emerald-900/30 border-emerald-700/30' 
                  : 'bg-emerald-100 border-emerald-200'
              }`}>
                <div className={`text-sm font-medium flex items-center gap-2 ${
                  isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
                }`}>
                  <Icon name="check" size={16} />
                  <span>Biometrik giriş aktivdir</span>
                </div>
                <div className={`text-xs mt-1 ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  Tətbiqə biometrik məlumatlarınızla giriş edə bilərsiniz
                </div>
              </div>
            )}
            
            {!biometricSupported && (
              <div className={`mt-3 p-3 rounded-xl ${
                isDarkMode ? 'bg-amber-900/20' : 'bg-amber-50'
              }`}>
                <div className={`text-xs flex items-start gap-2 ${
                  isDarkMode ? 'text-amber-300' : 'text-amber-700'
                }`}>
                  <Icon name="warning" size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Bu cihazda biometrik autentifikasiya dəstəklənmir və ya brauzerdə aktiv deyil.</span>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
