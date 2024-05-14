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
        // LSantos branding
        'branding-green': '#45BB8A',
        'branding-red': '#ED1C24',
        'branding-yellow': '#F3B019', //'#FFD200',
        'branding-blue': '#1A7BC0', //'#00AEEF',
        // backgrounds
        'bg-default': '#000020',
        'bg-logo': '#0b0b20',
        'bg-dark-purple': '#0a0020',
        'bg-mid-purple': '#100523',
        'bg-purple': '#180b2d',
        'bg-black': '#000016',
        // 'background-gradient':
        //   'linear-gradient(135deg, var(--bg-black) 80%, var(--accent-dark-blue))',
        // other
        'accent-dark-blue': '#006dfb',
        'accent-teal': '#00adca',
        'accent-blue': '#0066ff',
        'accent-dark-purple': '#6002fc',
        'accent-pink': '#bb03c9',
        'accent-orange': '#f85400',
        'accent-redish': '#dd2900',
        'accent-red': '#c80000',
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
        // 'fake-border-gradient': 'linear-gradient(to bottom, #04a9cc, #0164fd)',
        // 'slash-gradient': 'linear-gradient(to top, #00aac9, #008ce7)',
        // 'ts-gradient': 'linear-gradient(to bottom, #00aac9 30%, #006bfd)',
      },
    },
    fontFamily: {
      body: ['Roboto', 'ui-sans-serif', 'system-ui'],
      sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
    },
  },
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.js',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  plugins: [require('flowbite/plugin')],
};
