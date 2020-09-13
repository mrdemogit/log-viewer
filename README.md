[DEMO](https://condescending-pike-623557.netlify.app/)

---

## Notes

- Every reload of the page are generated: 1000 simulations and 150 scenarios
- API is mocked on Frontend side and handled like API call
- Setup 2 seconds timeout to simulate response time from API
- Simple flat structure with 2 reusable components and 1 page component

## Features

- Own DataTable implementation
- Styled Components + Chakra-UI
- Themeable
- Own hooks for fetching data
- Sorting & Filtering on the client-side
- 90% Test coverage of base components and hooks
- Setup husky, lint-staged, prettier and audit of packages for commit (lint,audit-ci) and push (unit tests)

### Next candidate?

- Sorting & Filtering on server side for processing big data
- Stateful Sorting & Filtering using query paramters
- Real-time streaming with RxJS

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Available Scripts](#available-scripts)
  - [`yarn start`](#yarn-start)
  - [`yarn test`](#yarn-test)
  - [`yarn build`](#yarn-build)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
