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
    'import/prefer-default-export': ['off'],
    'no-continue': ['off'],
    'no-param-reassign': ['off'],
    'no-restricted-syntax': ['off'],
    'import/no-named-as-default-member': ['off'],
  },
};
