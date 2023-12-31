/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1366px',
    },
    colors: {
      'background': '#fcecd4',
      'primary': '#fd510c',
      'blue': '#1fb6ff',
      'rose': '#cc0202',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'black': '#000000',
      'white': '#ffffff',
      'light-gray': '#eeeeee',
      'gray-dark': '#273444',
      'gray-light': '#aaaaaa',
      'transparent': 'transparent'
    },
    fontFamily: {
      sans: ['Satoshi', 'Arial', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      backgroundImage: {
        'address': "url('./src/assets/address-tree.svg')",
        'match': "url('./src/assets/match.svg')"
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

