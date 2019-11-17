import React, { useState } from 'react';
import styled from 'styled-components';

import ErrorBoundary from './ErrorBoundary';
import Map from './Map';
import Person, { useGetPeople } from './People';
import settings from './settings';

const App = () => {
  const people = useGetPeople();
  const [selectedPerson, setSelectedPerson] = useState(null);
  return (
    <AppContainer>
      <ErrorBoundary>
        <Map>
          {people.map((person, index) => (
            <Map.Marker
              key={index}
              lngLat={[person.longitude, person.latitude]}
            >
              <Person.Avatar
                key={index}
                person={person}
                onMouseEnter={() => setSelectedPerson(person)}
                onMouseLeave={() => setSelectedPerson(null)}
              />
            </Map.Marker>
          ))}

          {selectedPerson && (
            <Map.Popup
              lngLat={[selectedPerson.longitude, selectedPerson.latitude]}
              offset={settings.person.border + settings.person.size / 2}
            >
              <Person.Info person={selectedPerson} />
            </Map.Popup>
          )}
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
