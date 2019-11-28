import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ErrorBoundary from './Components/ErrorBoundary';
import GlobalStyle from './GlobalStyle';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ErrorBoundary>
    <GlobalStyle />
    <App />
  </ErrorBoundary>,
  document.querySelector('main')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
