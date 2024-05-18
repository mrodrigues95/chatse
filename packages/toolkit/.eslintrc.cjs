module.exports = {
  extends: ['../../.eslintrc.js'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['plugin:tailwindcss/recommended'],
  settings: {
    tailwindcss: {
      config: 'tailwind.config.js',
    },
  },
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'error',
  },
};
