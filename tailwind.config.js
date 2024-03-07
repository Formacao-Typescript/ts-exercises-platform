/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      colors: {
        'trade-light-blue': '#04ABCA',
        'trade-blue': '#0164FE',
        'trade-light-purple': '#B902C6',
        'trade-purple': '#5E00FF',
        'trade-light-red': '#FC5900',
        'trade-red': '#C70100',
        'branding-green': '#45BB8A',
        'branding-red': '#ED1C24',
        'branding-yellow': '#F3B019', //'#FFD200',
        'branding-blue': '#1A7BC0', //'#00AEEF',
      },
      width: {
        300: '300px',
      },
      height: {
        300: '300px',
        600: '600px',
      },
      screens: {
        'dark-mode': { raw: '(prefers-color-scheme: dark)' },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      body: ['Roboto', 'ui-sans-serif', 'system-ui'],
      sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
    },
  },
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  plugins: [require('flowbite/plugin'), require('flowbite-typography')],
};
