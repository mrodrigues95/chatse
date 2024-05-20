import { type Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  presets: [require('@chatse/toolkit/presets/main.cjs')],
  content: [
    '../../packages/toolkit/src/**/*!(*.stories|*.spec).{js,jsx,ts,tsx,html,css}',
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', ...defaultTheme.fontFamily.sans],
      },
    },
  },
} satisfies Config;
