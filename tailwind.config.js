module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        darkGray: '#1F1F1F',
        mutedGray: '#A0A0A0',
        veryDarkGray: '#121212',
        softRed: '#FF5252',
        primary: '#0F4C81',
        secondary: '#53B0AE',
        accent: '#F74371',
      },
      fontFamily: {
        display: 'Libre Baskerville, Arial, sans-serif',
        body: 'Noto Sans JP, Arial, sans-serif',
      },
    },
  },
  content: [
    './components/**/*.jsx', // all components
    './examples/**/*.jsx', // all examples
    './pages/**/*.js', // all pages as well
  ],
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
  ],
};
