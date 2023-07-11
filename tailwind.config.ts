/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
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
