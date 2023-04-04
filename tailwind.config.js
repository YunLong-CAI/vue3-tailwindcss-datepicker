module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '999': '999'
      },
      width: {
        '210px': '210px',
        '26px': '26px',
        '1000px': '1000px'
      },
      height: {
        '38px': '38px',
        '30px': '30px',
        '40px': '40px',
        '32px': '32px',
        '22px': '22px',
        '26px': '26px'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
