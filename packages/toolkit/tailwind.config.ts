import { type Config } from 'tailwindcss';

export default {
  presets: [require('./src/presets/main.cjs')],
  content: ['./src/**/*!(*.stories|*.spec).{js,jsx,ts,tsx,html,css}'],
} satisfies Config;
