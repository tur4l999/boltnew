import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { useApp } from '../../contexts/AppContext';
import { RegistrationScreen } from './RegistrationScreen';
import { ForgotPasswordScreen } from './ForgotPasswordScreen';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const { isDarkMode } = useApp();

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  const handleDemoLogin = () => {
    setEmail('demo@dda.az');
    setPassword('demo123');
    setTimeout(handleLogin, 100);
  };

  // Handle different screen states
  if (showRegister) {
    return (
      <RegistrationScreen 
        onBack={() => setShowRegister(false)}
        onRegister={() => {
          setShowRegister(false);
          alert('Qeydiyyat tamamlandı! İndi hesabınıza daxil ola bilərsiniz.');
        }}
      />
    );
  }

  if (showForgotPassword) {
    return (
      <ForgotPasswordScreen 
        onBack={() => setShowForgotPassword(false)}
        onSuccess={() => {
          setShowForgotPassword(false);
          alert('Şifrəniz uğurla yeniləndi! İndi yeni şifrə ilə daxil ola bilərsiniz.');
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900' 
        : 'bg-gradient-to-b from-gray-50 via-white to-emerald-50/30'
    } pt-11`}>
      {/* Soft, calming background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Gentle floating orbs for psychological comfort */}
        <div className={`absolute top-1/4 left-1/6 w-64 h-64 rounded-full blur-3xl ${
          isDarkMode ? 'bg-emerald-500/5' : 'bg-emerald-300/20'
        } animate-pulse`} style={{ animationDuration: '4s' }}></div>
        <div className={`absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full blur-3xl ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-200/20'
        } animate-pulse`} style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        
        {/* Subtle driving-themed floating elements */}
        <div className="absolute top-16 right-8 opacity-40">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
          } backdrop-blur-sm animate-bounce-subtle`}>
            🚗
          </div>
        </div>
        <div className="absolute bottom-20 left-8 opacity-40">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
          } backdrop-blur-sm animate-bounce-subtle`} style={{ animationDelay: '1s' }}>
            🚦
          </div>
        </div>
        
        {/* Minimalist geometric accent */}
        <div className={`absolute top-1/3 right-1/5 w-1 h-16 ${
          isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-400/30'
        } rounded-full rotate-12`}></div>
      </div>
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Enhanced Logo Section with Digital Driving Academy Branding */}
        <div className="text-center mb-8">
          <div className={`w-32 h-32 mx-auto mb-6 rounded-3xl shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600/50' 
              : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200/50'
          } backdrop-blur-sm relative overflow-hidden`}>
            {/* Driving themed background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-2 left-3 text-2xl">🚗</div>
              <div className="absolute bottom-3 right-2 text-lg">🚦</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl opacity-20">📚</div>
            </div>
            
            <img 
              src="/DDA_logo.png" 
              alt="Digital Driving Academy Logo" 
              className="w-20 h-20 object-contain transition-transform duration-300 hover:scale-110 relative z-10"
              onError={(e) => {
                // Fallback to styled DDA text logo
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
            <p className={`text-sm font-medium mt-2 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>
              Modern texnologiya ilə sürücülük təhsili
            </p>
          </div>
        </div>

        {/* Enhanced Login Form */}
        <Card className={`p-8 transition-all duration-300 backdrop-blur-lg ${
          isDarkMode 
            ? 'bg-gray-800/90 border-gray-600/30 shadow-2xl' 
            : 'bg-white/95 border-white/50 shadow-xl'
        } hover:shadow-2xl`}>
          <div className="space-y-7">
            <div className="text-center mb-7">
              <h2 className={`text-xl font-bold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Xoş gəlmisiniz
              </h2>
              <p className={`text-sm transition-colors duration-200 mt-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Təhsilinizi davam etdirmək üçün daxil olun
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
            
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={setPassword}
              label="Şifrə"
              placeholder="Şifrənizi daxil edin"
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

            {/* Enhanced Remember Me Checkbox */}
            <div className="flex items-center justify-between">
              <div className="flex items-center group">
                <div className="relative">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 text-emerald-600 bg-gray-100 border-2 border-gray-300 rounded-lg focus:ring-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-200"
                  />
                </div>
                <label htmlFor="remember-me" className={`ml-3 text-sm font-medium cursor-pointer transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Yadda saxla
                </label>
              </div>
              <button 
                onClick={() => setShowForgotPassword(true)}
                className={`text-sm font-medium transition-colors duration-200 hover:underline ${
                  isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
                }`}
              >
                Şifrəni unutmusan?
              </button>
            </div>

            <Button
              onClick={handleLogin}
              disabled={!email || !password || isLoading}
              className={`w-full py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                isLoading ? 'animate-pulse' : ''
              } bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Giriş edilir...
                </div>
              ) : (
                'Daxil ol'
              )}
            </Button>

            {/* Enhanced Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full h-px bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-transparent via-gray-600/50 to-transparent' 
                    : 'from-transparent via-gray-200/70 to-transparent'
                }`}></div>
              </div>
              <div className="relative flex justify-center">
                <span className={`px-4 py-1.5 text-xs font-medium rounded-full backdrop-blur-sm transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800/90 text-gray-400 border border-gray-600/30' 
                    : 'bg-white/95 text-gray-500 border border-white/50'
                }`}>və ya</span>
              </div>
            </div>

            {/* Enhanced Social Login Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => alert('Google ilə giriş (demo)')}
                className={`w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-xl transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] group ${
                  isDarkMode 
                    ? 'border-gray-600/30 bg-gray-700/40 hover:bg-gray-600/40 text-gray-200 hover:border-gray-500/50' 
                    : 'border-gray-200/60 bg-white/70 hover:bg-white/90 text-gray-900 hover:border-gray-300/80'
                } backdrop-blur-sm hover:shadow-md`}
              >
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-medium text-sm">Google ilə daxil ol</span>
              </button>
              
              <button
                onClick={() => alert('Apple ilə giriş (demo)')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-800/50 rounded-xl transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] bg-gradient-to-r from-gray-900/90 to-black/90 hover:from-black/95 hover:to-gray-800/95 text-white hover:shadow-md group backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="font-medium text-sm">Apple ilə daxil ol</span>
              </button>
            </div>
            
            <div className="text-center pt-4">
              <button
                onClick={handleDemoLogin}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 transform hover:scale-105 ${
                  isDarkMode 
                    ? 'text-emerald-400 hover:text-emerald-300 bg-emerald-500/8 hover:bg-emerald-500/15 border border-emerald-500/15' 
                    : 'text-emerald-600 hover:text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/60'
                }`}
              >
                <span>✨</span>
                Demo hesabı ilə daxil ol
              </button>
            </div>
          </div>
        </Card>

        {/* Enhanced Additional Options */}
        <div className="mt-10 text-center space-y-4">
          <div className={`text-base transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Hesabın yoxdur?{' '}
            <button 
              onClick={() => setShowRegister(true)}
              className={`font-bold transition-all duration-300 hover:scale-105 inline-block hover:underline ${
                isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
              }`}
            >
              Qeydiyyatdan keç
            </button>
          </div>
        </div>

        {/* Enhanced Footer */}
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