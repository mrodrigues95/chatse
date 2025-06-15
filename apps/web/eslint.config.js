import relay from 'eslint-plugin-relay';
import reactCompiler from 'eslint-plugin-react-compiler';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  reactCompiler.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    plugins: {
      relay,
      'react-compiler': reactCompiler,
    },
    rules: {
      ...relay.configs.recommended.rules,
      'react-compiler/react-compiler': 'error',
    },
  },
];
