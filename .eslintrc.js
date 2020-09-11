module.exports = {
  extends: 'react-app',
  ignorePatterns: ['build/*'],
  rules: {
    'react/prop-types': 'error',
    'react/forbid-prop-types': 'error',
    'react/no-unused-prop-types': 'error',
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
