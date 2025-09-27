import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useApp } from '../../contexts/AppContext';
import { EmojiIcon } from '../ui/EmojiIcon';

interface LoginScreenRedesignedProps {
  onLogin: () => void;
}

export function LoginScreenRedesigned({ onLogin }: LoginScreenRedesignedProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isDarkMode } = useApp();

  const handleLogin = async () => {
    setIsLoading(true);
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
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-emerald-50/30'
    }`}>
      
      {/* Modern Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Floating Elements */}
        <div className={`absolute top-20 right-10 w-40 h-40 rounded-full blur-3xl ${
          isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-400/15'
        } animate-float-gentle`}></div>
        <div className={`absolute bottom-32 left-10 w-32 h-32 rounded-full blur-3xl ${
          isDarkMode ? 'bg-blue-500/10' : 'bg-blue-400/15'
        } animate-float-gentle`} style={{ animationDelay: '2s' }}></div>
        
        {/* Decorative Icons */}
        <div className="absolute top-32 left-16 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-green-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10 animate-bounce-subtle">
          🚗
        </div>
        <div className="absolute bottom-48 right-20 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10 animate-bounce-subtle" style={{ animationDelay: '1s' }}>
          🚦
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center content-padding pt-20 relative z-10">
        <div className="w-full max-w-sm space-comfortable-lg">
          
          {/* Hero Logo Section */}
          <div className="text-center mb-12">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl shadow-2xl flex items-center justify-center comfort-hover group ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800/90 to-gray-700/90' 
                : 'bg-gradient-to-br from-white/90 to-gray-50/90'
            } backdrop-blur-xl border border-white/20`}>
              <img 
                src="/DDA_logo.png" 
                alt="DDA.az" 
                className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="visual-hierarchy-1 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">DDA</div>`;
                  }
                }}
              />
            </div>
            
            <h1 className="visual-hierarchy-1 text-comfort-primary mb-3">
              DDA.az
            </h1>
            <p className="text-comfort-secondary visual-hierarchy-3">
              Sürücülük vəsiqəsi hazırlıq platforması
            </p>
          </div>

          {/* Streamlined Login Form */}
          <Card variant="glass" padding="xl" className="mb-8 shadow-2xl">
            <div className="space-comfortable">
              
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail ünvanınız"
                  className={`w-full px-5 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 comfort-surface ${
                    isDarkMode 
                      ? 'text-gray-100 placeholder-gray-400' 
                      : 'text-gray-900 placeholder-gray-500'
                  } text-lg font-medium`}
                />
              </div>
              
              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrəniz"
                  className={`w-full px-5 py-4 pr-14 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 comfort-surface ${
                    isDarkMode 
                      ? 'text-gray-100 placeholder-gray-400' 
                      : 'text-gray-900 placeholder-gray-500'
                  } text-lg font-medium`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg text-comfort-secondary hover:text-comfort-primary button-press focus-ring"
                  aria-label={showPassword ? "Şifrəni gizlət" : "Şifrəni göstər"}
                >
                  <EmojiIcon emoji={showPassword ? '🙈' : '👁️'} size={18} />
                </button>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 rounded-lg border-2 border-gray-300 text-emerald-600 focus:ring-emerald-500 focus:ring-2 transition-all duration-200"
                  />
                  <span className="text-comfort-secondary visual-hierarchy-3 group-hover:text-comfort-primary transition-colors">
                    Yadda saxla
                  </span>
                </label>
                
                <button className="text-emerald-600 visual-hierarchy-3 font-medium hover:text-emerald-700 button-press p-2 rounded-lg focus-ring">
                  Şifrəni unutmusunuz?
                </button>
              </div>

              {/* Login Button */}
              <Button
                onClick={handleLogin}
                disabled={!email || !password || isLoading}
                variant="primary"
                size="lg"
                fullWidth={true}
                loading={isLoading}
                className="visual-hierarchy-2 h-14 shadow-xl"
              >
                {isLoading ? 'Giriş edilir...' : 'Daxil ol'}
              </Button>

            </div>
          </Card>

          {/* Social Login - Simplified */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => alert('Google ilə giriş (demo)')}
              className="w-full flex items-center justify-center gap-4 p-4 rounded-2xl glass-comfort button-press comfort-hover focus-ring group shadow-lg"
              aria-label="Google hesabı ilə daxil ol"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="visual-hierarchy-3 font-semibold text-comfort-primary">Google ilə daxil ol</span>
            </button>
          </div>

          {/* Demo Access */}
          <div className="text-center">
            <button
              onClick={handleDemoLogin}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl visual-hierarchy-3 font-semibold button-press comfort-hover focus-ring shadow-lg border-2 border-dashed ${
                isDarkMode 
                  ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20' 
                  : 'text-emerald-600 border-emerald-300/60 bg-emerald-50/60 hover:bg-emerald-100/60'
              }`}
              aria-label="Demo hesabı ilə daxil ol"
            >
              <EmojiIcon emoji="🚀" size={20} />
              Demo ilə başla
              <EmojiIcon emoji="✨" size={16} />
            </button>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <div className="text-comfort-secondary text-sm">
              Hesabınız yoxdur?{' '}
              <button className="text-emerald-600 font-semibold hover:text-emerald-700 button-press p-1 rounded focus-ring">
                Qeydiyyatdan keçin
              </button>
            </div>
            
            <div className="mt-6 text-xs text-comfort-secondary opacity-75">
              © 2024 DDA.az • Bütün hüquqlar qorunur
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}