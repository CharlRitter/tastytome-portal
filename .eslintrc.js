module.exports = {
  env: {
    node: true,
    browser: true,
    es2022: true,
    jest: true
  },
  ignorePatterns: ['next.config.js'],
  parser: '@typescript-eslint/parser',
  extends: [
    'next',
    'airbnb',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier', 'import'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  settings: { 'import/resolver': { typescript: { project: './tsconfig.json' } } },
  rules: {
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/jsx-props-no-spreading': 'warn',
    'import/prefer-default-export': 'off',
    'eslintimport/prefer-default-export': 'off',
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true
      }
    ],
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Built-in imports (come from NodeJS native) go first
          'external', // <- External imports
          'internal', // <- Absolute imports
          ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
          'index', // <- index imports
          'unknown' // <- unknown
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  }
};
