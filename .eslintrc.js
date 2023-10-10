module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'import'],
  extends: [
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',

    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc' },
        'newlines-between': 'always'
      }
    ],
    'sort-imports': [
      'error',
      { allowSeparatedGroups: true, ignoreDeclarationSort: true }
    ]
  }
}
