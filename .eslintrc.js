module.exports = {
  extends: 'react-app',
  ignorePatterns: ['build/*'],
  rules: {
    'react/prop-types': 'warn',
    'react/forbid-prop-types': 'warn',
    'react/no-unused-prop-types': 'warn',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
};
