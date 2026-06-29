/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F6F1',
        surface: '#FFFFFF',
        sidebar: '#0B1F3A',
        accent: '#C89B3C',
        border: '#E6DFD2',
        text: '#1F2933',
        muted: '#6B7280'
      },
      boxShadow: {
        card: '0 24px 80px rgba(15, 23, 42, 0.08)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
