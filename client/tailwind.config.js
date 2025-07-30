/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f1f1f',
        secondary: '#262626',
        highlight: '#ec4899',
        gradientFrom: '#1f1f1f',
        gradientVia: '#262626',
        gradientTo: '#1f1f1f',
      },
      backgroundImage: {
        'main-gradient': "linear-gradient(to bottom, #1f2937, #000, #1f2937)",
        'blur-gradient': "linear-gradient(to bottom right, #1f1f1f99, #26262699, #1f1f1f99)",
        'loading-bar': "linear-gradient(to right, #9333ea, #ec4899)",
      },
      keyframes: {
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        gradientSlow: 'gradientShift 8s ease infinite',
      },
    },
  },
  plugins: [],
};
