import React from 'react';
import styled from 'styled-components';

import ErrorBoundary from './ErrorBoundary';
import Map from './Map';

const App = () => {
  return (
    <AppContainer>
      <ErrorBoundary>
        <Map />
      </ErrorBoundary>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
