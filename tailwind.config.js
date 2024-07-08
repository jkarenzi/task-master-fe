/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    extend: {
      colors:{
        custom:{
          bgBlack: '#131415',
          drawerBlack: '#1A1C1E',
          blue: '#586AEA',
          activeBlue: 'rgba(88, 106, 234, 0.9)',
          borderGrey: '#666666',
          drawerBorder: '#272727',
          drawerIconInactive: '#26292C'

        }
      },
      fontFamily:{
        outfit:['Outfit','sans-serif'],
        chococooky:['Chococooky', 'sans-serif']
      }
    },
  },
  plugins: [],
}

