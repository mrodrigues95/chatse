import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import jsxa11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tailwindcss from 'eslint-plugin-tailwindcss';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettier,
  reactHooks.configs['recommended-latest'],
  tailwindcss.configs['flat/recommended'],
  jsxa11y.flatConfigs.recommended,
  react.configs.flat['jsx-runtime'],
  { ...react.configs.flat.recommended, settings: { react: { version: 'detect' } } },
  // {
  //   files: ['**/*.{js,jsx,ts,tsx}'],
  //   plugins: { react: react.configs.recommended },
  // },
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '**/routeTree.gen.ts',
      '**/__generated__/**',
      '**/bin/**',
      '**/obj/**',
    ],
  },
);
