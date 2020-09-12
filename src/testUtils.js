import React from 'react';
import { theme, ThemeProvider } from '@chakra-ui/core';
import { render as baseRender } from '@testing-library/react';

export const render = (element) =>
  baseRender(<ThemeProvider theme={theme}>{element}</ThemeProvider>);
