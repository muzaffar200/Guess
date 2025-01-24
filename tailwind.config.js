/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '450px',
        base: '1139px',
        'max-1024': { 'max': '1024px' } ,
        'max-1278': { 'max': '1278px' } ,
        'max-1085': { 'max': '1085px' } ,
        'max-877': { 'max': '877px' } ,
        'max-768': { 'max': '768px' } ,
        'max-599': { 'max': '599px' } ,
        'max-447': { 'max': '447px' } ,
        'max-386': { 'max': '386px' } ,

      },
    },
    safelist: [
      'hidden',
      'inline',
    ],
    plugins: [],
  }
}