import React from 'react';
import styled from 'styled-components';

import ErrorBoundary from './ErrorBoundary';
import Map from './Map';
import { Person, useGetPeople } from './People';

const App = () => {
  const people = useGetPeople();
  return (
    <AppContainer>
      <ErrorBoundary>
        <Map>
          {people.map((person, index) => (
            <Map.Marker
              key={index}
              lngLat={[person.longitude, person.latitude]}
            >
              <Person key={index} person={person} />

              <Map.Popup offset={34}>
                <h2>{person.name}</h2>
                <p>{person.about}</p>
              </Map.Popup>
            </Map.Marker>
          ))}
        </Map>
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
