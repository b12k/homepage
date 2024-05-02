module.exports = {
  plugins: [
    'import',
    'unicorn',
    'promise',
    'prettier',
    'unused-imports',
    'simple-import-sort',
  ],
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['webpack/*'],
      },
    ],
    'unicorn/import-style': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          acc: true,
          env: true,
          arg: true,
          args: true,
          prop: true,
          props: true,
          param: true,
          params: true,
          Env: true,
          Props: true,
        },
      },
    ],
  },
  ignorePatterns: ['dist'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript/base',
        'prettier',
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        'typescript-eslint/prefer-namespace-keyword': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: ['webpack/*'],
          },
        ],
      },
    },
    {
      files: ['**/*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      extends: [
        'plugin:vue/vue3-recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        'prettier',
      ],
      rules: {
        'prettier/prettier': 'error',
        'vue/require-name-property': 'error',
      },
    },
  ],
};
