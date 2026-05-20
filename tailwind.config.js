/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0EA5E9',
        accent: '#06B6D4',
        dark: '#0A0F2C',
        'dark-card': '#0F1A35',
        'card-bg': '#F0F9FF',
        'text-main': '#1E293B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at 60% 50%, rgba(6,182,212,0.15) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0A0F2C 0%, #0F1A35 100%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(6,182,212,0.3)',
        'cyan-glow-lg': '0 0 40px rgba(6,182,212,0.4)',
        'card-hover': '0 20px 40px rgba(14,165,233,0.2)',
      },
    },
  },
  plugins: [],
};
