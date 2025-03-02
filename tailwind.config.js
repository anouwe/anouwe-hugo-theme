/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './layouts/**/*.{html,js}',
    './content/**/*.{md,html}',
    './themes/**/*.{html,js}',
    './assets/**/*.{html,js}',
    './src/**/*.{html,js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          'DEFAULT': '#007B79',
          50: '#E6F3F3',
          100: '#CCE8E7',
          200: '#99D1D0',
          300: '#66BAB9',
          400: '#33A3A1',
          500: '#007B79',
          600: '#006261',
          700: '#004A49',
          800: '#003130',
          900: '#001918',
        },
        secondary: {
          'DEFAULT': '#113946',
          50: '#E7EBED',
          100: '#CFD7DC',
          200: '#9FB0B9',
          300: '#708895',
          400: '#406172',
          500: '#113946',
          600: '#0E2E38',
          700: '#0A222A',
          800: '#07171C',
          900: '#030B0E',
        },
      },
      inset: {
        '[1px]': '1px'
      },
      fontFamily: {
        'body': [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
    ],
        'sans': [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
    ]
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('flowbite/plugin')
  ],
}
