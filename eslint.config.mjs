import jsPlugin from '@eslint/js';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import unicornPlugin from 'eslint-plugin-unicorn';
import vuePlugin from 'eslint-plugin-vue';
import tsPlugin from 'typescript-eslint';

export default tsPlugin.config(
  {
    ignores: ['dist/'],
  },
  jsPlugin.configs.recommended,
  ...tsPlugin.configs.recommended,
  ...vuePlugin.configs['flat/strongly-recommended'],
  unicornPlugin.configs['flat/all'],
  perfectionistPlugin.configs['recommended-natural'],
  prettierPlugin,
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  },
  {
    rules: {
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            Dir: true,
            dir: true,
            Env: true,
            env: true,
            props: true,
            Props: true,
          },
        },
      ],
    },
  },
);
