import React, { lazy, Suspense } from 'react';
import { Route, Router } from 'react-router-dom';
import * as routes from '@routes';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core';
import history from './browserHistory';

const HomePage = lazy(() =>
  import(/* webpackChunkName: "HomePage" */ '@pages/Home'),
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Router history={history}>
        <Suspense fallback={<div></div>}>
          <Route path={routes.HOME} exact>
            <HomePage />
          </Route>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
