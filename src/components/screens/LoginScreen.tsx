import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useApp } from '../../contexts/AppContext';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  return (
    <div className={`min-h-screen flex items-center justify-center content-padding relative overflow-hidden transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-emerald-50/80 via-white to-green-50/80'
    } pt-16`}>
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Animated gradient orbs */}
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-400/20'
        }`}></div>
        <div className={`absolute bottom-32 right-16 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/10' : 'bg-blue-400/15'
        }`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute top-1/2 left-1/4 w-24 h-24 rounded-full blur-2xl animate-pulse ${
          isDarkMode ? 'bg-purple-500/10' : 'bg-purple-400/15'
        }`} style={{ animationDelay: '2s' }}></div>
        
        {/* Traffic Signs with enhanced styling */}
        <div className="absolute top-20 right-20 w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-2xl flex items-center justify-center text-xl backdrop-blur-sm border border-white/10 animate-bounce-subtle">
          🚗
        </div>
        <div className="absolute bottom-40 left-16 w-10 h-10 bg-gradient-to-br from-blue-400/20 to-blue-500/20 rounded-xl flex items-center justify-center text-lg backdrop-blur-sm border border-white/10 animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
          🚦
        </div>
        <div className="absolute top-1/3 left-8 w-8 h-8 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-lg flex items-center justify-center text-sm backdrop-blur-sm border border-white/10 animate-bounce-subtle" style={{ animationDelay: '1.5s' }}>
          📚
        </div>
        
        {/* Geometric shapes */}
        <div className={`absolute top-1/4 right-1/4 w-16 h-16 rotate-45 ${
          isDarkMode ? 'bg-gradient-to-br from-emerald-500/5 to-green-500/5' : 'bg-gradient-to-br from-emerald-400/10 to-green-400/10'
        } rounded-lg backdrop-blur-sm`}></div>
        <div className={`absolute bottom-1/3 left-1/3 w-12 h-12 rotate-12 ${
          isDarkMode ? 'bg-gradient-to-br from-blue-500/5 to-purple-500/5' : 'bg-gradient-to-br from-blue-400/10 to-purple-400/10'
        } rounded-full backdrop-blur-sm`}></div>
      </div>
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Enhanced Logo Section */}
        <div className="text-center mb-10 space-comfortable">
          <div className={`w-32 h-32 mx-auto mb-6 rounded-3xl shadow-2xl flex items-center justify-center transition-all duration-300 comfort-hover group ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-800/80 to-gray-700/80 border border-gray-600/30' 
              : 'bg-gradient-to-br from-white/90 to-gray-50/90 border border-gray-200/30'
          } backdrop-blur-lg`}>
            <img 
              src="/DDA_logo.png" 
              alt="DDA.az Logo" 
              className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                // Fallback to text logo if image fails
                (e.target as HTMLImageElement).style.display = 'none';
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  parent.innerHTML = `<div class="text-4xl font-black bg-gradient-to-r ${isDarkMode ? 'from-emerald-400 to-green-400' : 'from-emerald-600 to-green-600'} bg-clip-text text-transparent">DDA</div>`;
                }
              }}
            />
          </div>
          <h1 className={`visual-hierarchy-1 mb-4 transition-all duration-300 bg-gradient-to-r ${
            isDarkMode 
              ? 'from-white via-gray-100 to-gray-200' 
              : 'from-gray-900 via-gray-800 to-gray-700'
          } bg-clip-text text-transparent`}>DDA.az</h1>
          <p className="visual-hierarchy-3 text-comfort-secondary mb-4">
            Sürücülük vəsiqəsi üçün hazırlıq
          </p>
          <div className={`w-20 h-1.5 mx-auto rounded-full bg-gradient-to-r shadow-sm ${
            isDarkMode ? 'from-emerald-400 to-green-400' : 'from-emerald-500 to-green-500'
          }`}></div>
        </div>

        {/* Enhanced Login Form */}
        <Card 
          variant="glass" 
          padding="xl"
          className="shadow-2xl transition-all duration-300 hover:scale-[1.01]"
        >
          <div className="space-comfortable">
            <div className="space-y-3">
              <label className="block visual-hierarchy-3 text-comfort-primary font-semibold">
                E-mail
              </label>
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail ünvanınızı daxil edin"
                  className={`w-full px-5 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 comfort-surface ${
                    isDarkMode 
                      ? 'text-gray-100 placeholder-gray-400 hover:border-gray-500' 
                      : 'text-gray-900 placeholder-gray-500 hover:border-gray-400'
                  } group-hover:border-emerald-400 high-contrast-text`}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/8 to-green-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block visual-hierarchy-3 text-comfort-primary font-semibold">
                Şifrə
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrənizi daxil edin"
                  className={`w-full px-5 py-4 pr-14 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 comfort-surface ${
                    isDarkMode 
                      ? 'text-gray-100 placeholder-gray-400 hover:border-gray-500' 
                      : 'text-gray-900 placeholder-gray-500 hover:border-gray-400'
                  } group-hover:border-emerald-400 high-contrast-text`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-200 focus-ring ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-600/30' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
                  }`}
                  aria-label={showPassword ? "Şifrəni gizlət" : "Şifrəni göstər"}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/8 to-green-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Enhanced Remember Me Checkbox */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center group">
                <div className="relative">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 text-emerald-600 comfort-surface border-2 border-gray-300 rounded-lg focus:ring-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-200 focus-ring"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-500/12 to-green-500/12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                </div>
                <label htmlFor="remember-me" className="ml-3 visual-hierarchy-3 font-medium cursor-pointer text-comfort-primary">
                  Yadda saxla
                </label>
              </div>
              <button className={`visual-hierarchy-3 font-medium transition-all duration-200 comfort-hover p-2 rounded-lg focus-ring ${
                isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
              }`}>
                Şifrəni unutmusan?
              </button>
            </div>

            <Button
              onClick={handleLogin}
              disabled={!email || !password || isLoading}
              variant="primary"
              size="lg"
              fullWidth={true}
              loading={isLoading}
              className="visual-hierarchy-2 shadow-xl"
            >
              {isLoading ? 'Giriş edilir...' : 'Daxil ol'}
            </Button>

            {/* Enhanced Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full h-px bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-transparent via-gray-600/60 to-transparent' 
                    : 'from-transparent via-gray-300/60 to-transparent'
                }`}></div>
              </div>
              <div className="relative flex justify-center">
                <span className={`px-6 py-2 visual-hierarchy-3 font-medium rounded-full glass-comfort transition-all duration-200 ${
                  isDarkMode 
                    ? 'text-gray-300' 
                    : 'text-gray-600'
                } shadow-sm`}>və ya</span>
              </div>
            </div>

            {/* Enhanced Social Login Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => alert('Google ilə giriş (demo)')}
                className={`w-full flex items-center justify-center gap-4 px-6 py-4 border-2 rounded-2xl button-press comfort-hover focus-ring group glass-comfort ${
                  isDarkMode 
                    ? 'hover:border-gray-500/60 text-gray-200' 
                    : 'hover:border-gray-300/60 text-gray-900'
                } shadow-lg`}
                aria-label="Google hesabı ilə daxil ol"
              >
                <svg className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="visual-hierarchy-3 font-semibold">Google ilə daxil ol</span>
              </button>
              
              <button
                onClick={() => alert('Apple ilə giriş (demo)')}
                className="w-full flex items-center justify-center gap-4 px-6 py-4 border-2 border-gray-800/80 rounded-2xl button-press comfort-hover focus-ring bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-800 text-white shadow-lg group"
                aria-label="Apple hesabı ilə daxil ol"
              >
                <svg className="w-6 h-6 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="visual-hierarchy-3 font-semibold">Apple ilə daxil ol</span>
              </button>
            </div>
            
            <div className="text-center pt-6">
              <button
                onClick={handleDemoLogin}
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-full visual-hierarchy-3 font-semibold button-press comfort-hover focus-ring shadow-md ${
                  isDarkMode 
                    ? 'text-emerald-400 hover:text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30' 
                    : 'text-emerald-600 hover:text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/50'
                }`}
                aria-label="Demo hesabı ilə daxil ol"
              >
                <span className="text-lg">✨</span>
                Demo hesabı ilə daxil ol
              </button>
            </div>
          </div>
        </Card>

        {/* Enhanced Additional Options */}
        <div className="mt-10 text-center space-comfortable">
          <div className="visual-hierarchy-3 text-comfort-secondary">
            Hesabın yoxdur?{' '}
            <button className={`font-semibold transition-all duration-300 comfort-hover p-1 rounded focus-ring ${
              isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
            }`}>
              Qeydiyyatdan keç
            </button>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="mt-12 text-center text-sm text-comfort-secondary space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`}></div>
            <span className="font-medium">© 2024 DDA.az</span>
            <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`}></div>
          </div>
          <div className="text-xs opacity-75">Bütün hüquqlar qorunur</div>
        </div>
      </div>
    </div>
  );
}