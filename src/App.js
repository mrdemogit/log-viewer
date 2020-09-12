import React, { lazy, Suspense } from 'react';
import { Route, Router } from 'react-router-dom';
import * as routes from '@routes';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core';
import history from './browserHistory';
import { createGlobalStyle } from 'styled-components';
import { AppLayout } from '@layouts';

const HomePage = lazy(() =>
  import(/* webpackChunkName: "HomePage" */ '@pages/Home'),
);

const GlobalStyle = createGlobalStyle`
  html {
    background: ${(props) => props.bg};
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <GlobalStyle bg={theme.colors.gray[100]} />
      <Router history={history}>
        <Suspense fallback={<div></div>}>
          <AppLayout>
            <Route path={routes.HOME} exact>
              <HomePage />
            </Route>
          </AppLayout>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
