module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'prettier',
  ],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-console': 0,
  },
}
