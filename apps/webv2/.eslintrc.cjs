module.exports = {
  extends: ['../../.eslintrc.cjs', 'plugin:@tanstack/eslint-plugin-query/recommended'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'relay',
    'plugin:tailwindcss/recommended',
    'plugin:relay/recommended',
    'eslint-plugin-react-compiler',
  ],
  settings: {
    tailwindcss: {
      config: 'tailwind.config.js',
    },
  },
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'error',
    'react-compiler/react-compiler': 'error',
  },
};
