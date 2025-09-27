import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useApp } from '../../contexts/AppContext';
import { EmojiIcon } from '../ui/EmojiIcon';

interface LoginScreenBeautifulProps {
  onLogin: () => void;
}

export function LoginScreenBeautiful({ onLogin }: LoginScreenBeautifulProps) {
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
      
      {/* Stunning Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full ${
          isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-400/20'
        } blur-3xl animate-float-beautiful`}></div>
        <div className={`absolute bottom-0 left-0 w-80 h-80 rounded-full ${
          isDarkMode ? 'bg-blue-500/10' : 'bg-blue-400/15'
        } blur-3xl animate-float-beautiful`} style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-16 w-16 h-16 rounded-2xl beautiful-gradient-primary/20 flex items-center justify-center backdrop-blur-sm animate-float-beautiful">
          <EmojiIcon emoji="🚗" size={24} />
        </div>
        <div className="absolute bottom-32 right-16 w-12 h-12 rounded-xl beautiful-gradient-accent-blue/20 flex items-center justify-center backdrop-blur-sm animate-float-beautiful" style={{ animationDelay: '1s' }}>
          <EmojiIcon emoji="🚦" size={18} />
        </div>
        <div className="absolute top-1/2 right-20 w-10 h-10 rounded-lg beautiful-gradient-accent-purple/20 flex items-center justify-center backdrop-blur-sm animate-float-beautiful" style={{ animationDelay: '3s' }}>
          <EmojiIcon emoji="📚" size={16} />
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center beautiful-container pt-16 relative z-10">
        <div className="w-full max-w-sm beautiful-space-y-xl animate-fade-in-beautiful">
          
          {/* Hero Brand Section */}
          <div className="text-center beautiful-space-y">
            
            {/* Logo */}
            <div className="relative group">
              <div className={`w-24 h-24 mx-auto rounded-3xl beautiful-glass shadow-2xl flex items-center justify-center beautiful-hover-glow group-hover:scale-105 transition-all duration-500`}>
                <img 
                  src="/DDA_logo.png" 
                  alt="DDA.az" 
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="beautiful-title">DDA</div>`;
                    }
                  }}
                />
              </div>
              
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
            
            {/* Brand Text */}
            <div>
              <h1 className="beautiful-title mb-2">DDA.az</h1>
              <p className="beautiful-body beautiful-text-secondary">
                Sürücülük vəsiqəsi üçün ən yaxşı hazırlıq platforması
              </p>
            </div>
            
          </div>

          {/* Login Form */}
          <div className="beautiful-glass p-8 shadow-2xl beautiful-hover-lift">
            <div className="beautiful-space-y">
              
              {/* Form Title */}
              <div className="text-center mb-6">
                <div className="beautiful-heading beautiful-text-primary mb-2">Xoş gəlmisiniz</div>
                <div className="beautiful-caption beautiful-text-secondary">Hesabınıza daxil olun</div>
              </div>
              
              {/* Email Input */}
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail ünvanınız"
                  className={`w-full px-5 py-4 border-2 rounded-2xl beautiful-focus transition-all duration-300 beautiful-body ${
                    isDarkMode 
                      ? 'bg-gray-800/50 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-emerald-400' 
                      : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                  } group-hover:border-emerald-400/60`}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              {/* Password Input */}
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrəniz"
                  className={`w-full px-5 py-4 pr-14 border-2 rounded-2xl beautiful-focus transition-all duration-300 beautiful-body ${
                    isDarkMode 
                      ? 'bg-gray-800/50 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-emerald-400' 
                      : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                  } group-hover:border-emerald-400/60`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg beautiful-text-secondary hover:beautiful-text-primary beautiful-focus transition-colors duration-200"
                  aria-label={showPassword ? "Şifrəni gizlət" : "Şifrəni göstər"}
                >
                  <EmojiIcon emoji={showPassword ? '🙈' : '👁️'} size={18} />
                </button>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Options Row */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 rounded-lg border-2 border-gray-300 text-emerald-600 beautiful-focus transition-all duration-200"
                  />
                  <span className="beautiful-caption beautiful-text-secondary group-hover:beautiful-text-primary transition-colors">
                    Yadda saxla
                  </span>
                </label>
                
                <button className="beautiful-caption beautiful-text-accent hover:underline beautiful-focus p-1 rounded transition-all duration-200">
                  Şifrəni unutmusunuz?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={!email || !password || isLoading}
                className={`beautiful-button beautiful-button-primary w-full h-14 beautiful-ripple ${
                  isLoading ? 'animate-shimmer-beautiful' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Giriş edilir...
                  </div>
                ) : (
                  <>
                    <EmojiIcon emoji="🚀" size={18} />
                    Daxil ol
                  </>
                )}
              </button>

            </div>
          </div>

          {/* Social Login */}
          <div className="beautiful-space-y">
            
            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full h-px ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-transparent via-gray-600 to-transparent' 
                    : 'bg-gradient-to-r from-transparent via-gray-300 to-transparent'
                }`}></div>
              </div>
              <div className="relative flex justify-center">
                <span className="beautiful-glass px-4 py-2 beautiful-caption beautiful-text-secondary">
                  və ya
                </span>
              </div>
            </div>
            
            {/* Social Buttons */}
            <div className="beautiful-space-y">
              <button
                onClick={() => alert('Google ilə giriş (demo)')}
                className="beautiful-button beautiful-button-secondary w-full beautiful-ripple"
                aria-label="Google hesabı ilə daxil ol"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google ilə daxil ol
              </button>
              
              <button
                onClick={() => alert('Apple ilə giriş (demo)')}
                className="beautiful-button w-full bg-gradient-to-r from-gray-900 to-black text-white beautiful-ripple hover:from-black hover:to-gray-800"
                aria-label="Apple hesabı ilə daxil ol"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple ilə daxil ol
              </button>
            </div>
            
          </div>

          {/* Demo Access */}
          <div className="text-center">
            <button
              onClick={handleDemoLogin}
              className={`beautiful-button border-2 border-dashed beautiful-ripple ${
                isDarkMode 
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' 
                  : 'border-emerald-300/60 bg-emerald-50/60 text-emerald-600 hover:bg-emerald-100/60'
              }`}
              aria-label="Demo hesabı ilə daxil ol"
            >
              <EmojiIcon emoji="✨" size={18} />
              Demo ilə başla
              <EmojiIcon emoji="🚀" size={16} />
            </button>
          </div>

          {/* Footer */}
          <div className="text-center beautiful-space-y">
            <div className="beautiful-caption beautiful-text-secondary">
              Hesabınız yoxdur?{' '}
              <button className="beautiful-text-accent font-semibold hover:underline beautiful-focus p-1 rounded">
                Qeydiyyatdan keçin
              </button>
            </div>
            
            <div className="beautiful-caption beautiful-text-secondary opacity-60">
              © 2024 DDA.az • Bütün hüquqlar qorunur
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}