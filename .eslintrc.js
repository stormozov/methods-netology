module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'overrides': [
    {
      'files': ['**/*/*.test.js'],
      'plugins': ['jest'],
      'extends': ['plugin:jest/recommended'],
      'rules': { 'jest/prefer-expect-assertions': 'off' }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'rules': {
    'no-var': 'error',
    'prefer-const': 'error',

    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'arrow-body-style': [
      'error',
      'as-needed'
    ],
    'no-multiple-empty-lines': [
      'error',
      { 'max': 1, 'maxEOF': 1 }
    ],
    'max-len': [
      'error',
      { 'code': 120 }
    ],
    'eol-last': [
      'error',
      'always'
    ]
  }
}
