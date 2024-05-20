module.exports = {
  extends: [
    '../../.eslintrc.cjs',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:relay/recommended',
  ],
  plugins: ['relay', 'react-compiler'],
  rules: {
    'react-compiler/react-compiler': 'error',
  },
};
