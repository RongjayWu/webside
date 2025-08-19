// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
      },colors: {
        primary: {
          light: '#3b82f6', // Tailwind blue-500
          DEFAULT: '#2563eb', // Tailwind blue-600
          dark: '#1d4ed8', // Tailwind blue-700
        },
        secondary: {
          light: '#8b5cf6', // Tailwind purple-500
          DEFAULT: '#7c3aed', // Tailwind purple-600
          dark: '#6d28d9', // Tailwind purple-700
        },
      },
      spacing: {
        heroHeight: '80vh', // 可直接使用 h-heroHeight
      },
    },
  },
  plugins: [],
};
