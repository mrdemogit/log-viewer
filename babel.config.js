module.exports = {
  presets: ['react-app'],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-syntax-export-default-from',
    'babel-plugin-styled-components',
    [
      'react-intl',
      {
        messagesDir: './build/messages/',
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@api': './src/api',
          '@pages': './src/pages',
        },
      },
    ],
  ],
};