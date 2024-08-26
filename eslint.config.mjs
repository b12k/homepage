import jsPlugin from '@eslint/js';
import importPlugin from 'eslint-plugin-import-x';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import unicornPlugin from 'eslint-plugin-unicorn';
import vuePlugin from 'eslint-plugin-vue';
import globals from 'globals';
import tsPlugin from 'typescript-eslint';

export default tsPlugin.config(
  jsPlugin.configs.recommended,
  ...tsPlugin.configs.recommended,
  ...vuePlugin.configs['flat/strongly-recommended'],
  unicornPlugin.configs['flat/all'],
  perfectionistPlugin.configs['recommended-natural'],
  prettierPlugin,
  {
    ignores: ['dist/'],
  },
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  },
  {
    files: ['*.js', '*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: 'vue-eslint-parser',
    },
    plugins: {
      'import-x': importPlugin,
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
