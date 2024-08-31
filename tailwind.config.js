module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#224b8a'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
