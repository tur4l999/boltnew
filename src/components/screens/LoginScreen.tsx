import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-white shadow-lg flex items-center justify-center">
            <img 
              src="/DDA_logo.png" 
              alt="DDA.az Logo" 
              className="w-16 h-16 object-contain"
              onError={(e) => {
                // Fallback to text logo if image fails
                (e.target as HTMLImageElement).style.display = 'none';
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  parent.innerHTML = '<div class="text-2xl font-black text-emerald-600">DDA</div>';
                }
              }}
            />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">DDA.az</h1>
          <p className="text-gray-600">Sürücülük vəsiqəsi üçün hazırlıq</p>
        </div>

        {/* Login Form */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail ünvanınızı daxil edin"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şifrə
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrənizi daxil edin"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <Button
              onClick={handleLogin}
              disabled={!email || !password || isLoading}
              className="w-full"
            >
              {isLoading ? 'Giriş edilir...' : 'Daxil ol'}
            </Button>

            <div className="text-center">
              <button
                onClick={handleDemoLogin}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Demo hesabı ilə daxil ol
              </button>
            </div>
          </div>
        </Card>

        {/* Additional Options */}
        <div className="mt-6 text-center space-y-3">
          <button className="text-sm text-gray-600 hover:text-gray-800">
            Şifrəni unutmusan?
          </button>
          <div className="text-sm text-gray-500">
            Hesabın yoxdur?{' '}
            <button className="text-emerald-600 hover:text-emerald-700 font-medium">
              Qeydiyyatdan keç
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          © 2024 DDA.az - Bütün hüquqlar qorunur
        </div>
      </div>
    </div>
  );
}