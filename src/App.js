import React from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import theme from './theme';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  return (
    <AppContainer>
      <ErrorBoundary>
        <AppHeader>
          <AppLogo src={logo} alt="logo" />

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </AppHeader>
      </ErrorBoundary>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  text-align: center;
`;

const AppLogo = styled.img`
  height: 40vmin;
`;

const AppHeader = styled.header`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  min-height: 100vh;
  background: ${theme.primary.main};
  color: ${theme.primary.inverse};
  font-size: calc(10px + 2vmin);
`;
