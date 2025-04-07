module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/styles/globals.css"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
        darkGray: '#657786',
        lightGray: '#AAB8C2',
        extraLightGray: '#E1E8ED',
        bgLight: '#F5F8FA',
        dark: {
          primary: '#1A91DA',
          bg: '#15202B',
          secondary: '#192734',
          text: '#FFFFFF',
          accent: '#1DA1F2',
          border: '#38444D',
          hover: '#22303C'
        },
        'blue-500': '#3B82F6',
        'blue-600': '#2563EB',
        'blue-700': '#1D4ED8',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
    },
  },
  plugins: [],
}