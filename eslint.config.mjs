import jsPlugin from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import unicornPlugin from 'eslint-plugin-unicorn';
import vuePlugin from 'eslint-plugin-vue';
import globals from 'globals';
import tsPlugin from 'typescript-eslint';

export default tsPlugin.config(
  {
    ignores: ['dist', '.temp', 'node_modules'],
  },
  jsPlugin.configs.recommended,
  ...tsPlugin.configs.recommended,
  ...vuePlugin.configs['flat/strongly-recommended'],
  unicornPlugin.configs.all,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  perfectionistPlugin.configs['recommended-natural'],
  prettierPlugin,
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  },
  {
    rules: {
      'import/no-unresolved': [2, { amd: true, commonjs: true }],
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prefer-global-this': 'off',
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
            utils: true,
            Utils: true,
          },
        },
      ],
    },
  },
);
