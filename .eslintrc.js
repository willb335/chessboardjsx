module.exports = {
  env: { browser: true, jest: true, es6: true },
  globals: { module: false, document: false, require: false, __dirname: false },
  extends: ['plugin:react/recommended', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module', // es6 import/export
    ecmaFeatures: {
      jsx: true
    }
  },
  parser: 'babel-eslint', // class properties
  plugins: ['prettier', 'react'],
  rules: { 'no-console': 'off' }
};
