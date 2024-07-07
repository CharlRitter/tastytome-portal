/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [],
  purge: process.env.NODE_ENV === 'production',
  corePlugins: {
    preflight: false,
    container: false
  },
  output: './public/theme/tailwind.css'
};
