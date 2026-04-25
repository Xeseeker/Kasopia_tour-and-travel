import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f2f8f5',
          100: '#dbeee4',
          200: '#b6dcc9',
          300: '#86c4a5',
          400: '#56a982',
          500: '#2f8c65',
          600: '#257252',
          700: '#1d5840',
          800: '#153c2d',
          900: '#0d2019',
        },
        dusk: '#1f2a37',
        sand: '#f4e4cf',
      },
      boxShadow: {
        soft: '0 20px 45px -25px rgba(15, 23, 42, 0.45)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(125deg, #0f172a 0%, #0b4f3d 45%, #1c1917 100%)',
        'card-overlay': 'linear-gradient(180deg, rgba(15, 23, 42, 0.0) 0%, rgba(15, 23, 42, 0.65) 100%)',
      },
    },
  },
  plugins: [forms, aspectRatio],
};
