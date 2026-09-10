/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCFA',
          100: '#FAF8F5',
          200: '#F5F1EB',
          300: '#ECE5DC',
          400: '#DFD5C7',
          500: '#C8BAA6',
        },
        nude: {
          50: '#FAF4F0',
          100: '#F4ECE6',
          200: '#EADCD2',
          300: '#DDC5B5',
          400: '#C7A793',
          500: '#A9846E',
          600: '#89644F',
          700: '#684838',
        },
        taupe: {
          300: '#B8ADA6',
          400: '#9E928B',
          500: '#83766E',
          600: '#665B54',
          700: '#4E443E',
          800: '#38302B',
          900: '#26201D',
        },
        charcoal: {
          800: '#2A2523',
          900: '#1C1817',
          950: '#120F0E',
        },
        rosegold: {
          DEFAULT: '#D4A392',
          light: '#E8C5B8',
          dark: '#B87F6D',
        },
        champagne: {
          DEFAULT: '#E6D7C3',
          light: '#F4ECE0',
          dark: '#C8B296',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Didot', 'Bodoni MT', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        'widest-plus': '0.25em',
        'super-wide': '0.35em',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
