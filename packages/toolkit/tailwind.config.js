/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*!(*.stories|*.spec).{js,jsx,ts,tsx,html,css}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require('tailwindcss-react-aria-components'),
  ],
};
