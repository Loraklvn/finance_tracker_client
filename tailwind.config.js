/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'the-gray': '#F4F5F6',
        primary: '#F13C45',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
