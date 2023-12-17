const { createGlobPatternsForDependencies } = require('@nx/next/tailwind.js');
const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  content: [
    path.join(__dirname, './src/**/*!(*.stories|*.spec).{js,jsx,ts,tsx,html,css}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
