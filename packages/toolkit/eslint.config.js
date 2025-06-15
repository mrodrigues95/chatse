import storybook from 'eslint-plugin-storybook';
import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  ...storybook.configs['flat/recommended'],
  {
    ignores: ['!.storybook']
  }
];
