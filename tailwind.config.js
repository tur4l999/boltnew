/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        'iphone16': '393px',
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui', "-apple-system", 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        dmSans: ['DM Sans', 'ui-sans-serif', 'system-ui', "-apple-system", 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fadeInUp': 'fade-in-up 0.6s ease-out',
        'fadeIn': 'fade-in 0.3s ease-out',
        'slideUp': 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(16, 185, 129, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.6), 0 0 30px rgba(16, 185, 129, 0.4)' },
        },
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        'slide-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(100%)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      }
    },
  },
  plugins: [],
};
