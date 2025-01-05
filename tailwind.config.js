/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sap-blue': '#0070f2',
      },
      fontFamily: {
        'sap': ['72', 'system-ui', '-apple-system', 'sans-serif'],
        'vietnamese': ['Be Vietnam Pro', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};