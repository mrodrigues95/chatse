module.exports = {
  extends: ['../../.eslintrc.cjs', 'plugin:relay/recommended'],
  plugins: ['relay', 'react-compiler'],
  rules: {
    'react-compiler/react-compiler': 'error',
  },
};
