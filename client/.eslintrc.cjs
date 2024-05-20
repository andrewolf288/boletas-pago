module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    quotes: ['error', 'single'],
    indent: ['error', 2],
    eqeqeq: 'off',
    'no-unused-vars': 'warn',
    'no-multi-spaces': ['warn'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-deprecated': 'off',
    camelcase: 'off'
  }
}
