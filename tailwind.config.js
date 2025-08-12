/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      keyframes: {
        shuffle: {
          '0%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
          '25%': { transform: 'translateX(20px) rotate(5deg)', opacity: '0.7' },
          '50%': { transform: 'translateX(-20px) rotate(-5deg)', opacity: '0.5' },
          '75%': { transform: 'translateX(10px) rotate(2deg)', opacity: '0.7' },
          '100%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          'from': { transform: 'translateX(-100%)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)' },
        },
      },
      animation: {
        'shuffle': 'shuffle 0.6s ease-in-out',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
    },
  },
  plugins: [],
}

