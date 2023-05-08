/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#F05822',
      secondary: '#FFE6DD',
      chatmessage: '#F058224D',
      mychatmessage: '#4C799833',
      chatbox: '#4C799833',
      typo: '#909090',
      customgreen: {
        100: '#DEF7EC',
        200: '#03543F',
        300: '#58E700',
      },
      customBlue: {
        100: '#E1EFFE',
        200: '#1E429F',
      },
    },
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1360px',
      },
    },
    extend: {
      colors: {
        green: {
          500: '#4C7998',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
