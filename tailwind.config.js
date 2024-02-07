/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      screens: {
        'dark-mode': { raw: '(prefers-color-scheme: dark)' },
      },
    },
  },
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  plugins: [require('flowbite/plugin'), require('flowbite-typography')],
};
