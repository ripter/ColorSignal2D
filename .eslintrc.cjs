module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'import/extensions': ['error', 'always'],
    'import/no-named-as-default-member': ['off'],
    'import/prefer-default-export': ['off'],
    'no-bitwise': ['off'],
    'no-continue': ['off'],
    'no-param-reassign': ['off'],
    'no-plusplus': ['off'],
    'no-restricted-syntax': ['off'],
  },
};
