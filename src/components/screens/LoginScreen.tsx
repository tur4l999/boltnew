import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const { login, isDarkMode } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    
    if (!email) {
      setError('Email daxil edin');
      return;
    }

    setLoading(true);

    try {
      const success = await login({ email, password });
      
      if (success) {
        onLogin();
      } else {
        setError('Giriş uğursuz oldu');
      }
    } catch (err) {
      setError('Xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };

  const handleTestLogin = async () => {
    setEmail('turalqarayev99@gmail.com');
    setPassword('test123');
    setLoading(true);

    try {
      const success = await login({ 
        email: 'turalqarayev99@gmail.com', 
        password: 'test123' 
      });
      
      if (success) {
        onLogin();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
    }`}>
      <div className="w-full max-w-md">
        {/* Logo və Başlıq */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-2xl mb-4">
            <span className="text-4xl">🚗</span>
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            DDA Sürücülük
          </h1>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Sürücülük imtahanına hazırlaşın
          </p>
        </div>

        {/* Login Card */}
        <div className={`rounded-3xl shadow-2xl p-6 ${
          isDarkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-100'
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Daxil ol
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-100 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              disabled={loading}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-emerald-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'
              } ${loading ? 'opacity-50' : ''}`}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Şifrə
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-emerald-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'
              } ${loading ? 'opacity-50' : ''}`}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-lg mb-3 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 active:scale-98'
            }`}
          >
            {loading ? 'Yüklənir...' : 'Daxil ol'}
          </button>

          {/* Test Login Button */}
          <button
            onClick={handleTestLogin}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold transition-all border-2 ${
              loading
                ? 'opacity-50 cursor-not-allowed'
                : isDarkMode
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Test Hesabı (Premium)
          </button>

          {/* Test Account Info */}
          <div className={`mt-6 p-4 rounded-xl ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'
          }`}>
            <div className={`text-xs font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              💎 Test Hesabı:
            </div>
            <div className={`text-xs ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <div className="mb-1">
                📧 <span className="font-mono">turalqarayev99@gmail.com</span>
              </div>
              <div className="mb-1">
                🆔 <span className="font-mono text-[10px]">22de39a3-ad84-427a-bca8-3b79f5610285</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-medium">
                  ✓ Aktiv Paket
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-medium">
                  Premium
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className={`text-xs ${
            isDarkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            © 2025 DDA Sürücülük Məktəbi
          </p>
        </div>
      </div>
    </div>
  );
}
