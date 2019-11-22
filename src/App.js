import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';

import { usePromise } from './hooks';
import services from './services';
import settings from './settings';

import Map, { useBounds } from './Map';
import Person from './People';

const App = () => {
  const people = usePromise(services.getPeople, []);
  const coordinates = useMemo(() => people.map((person) => person.lngLat), [
    people,
  ]);
  const bounds = useBounds(coordinates);
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <AppContainer>
      <Map bounds={bounds}>
        {people.map((person, index) => (
          <Map.Marker key={index} lngLat={person.lngLat}>
            <PersonAvatar
              person={person}
              onMouseEnter={() => setSelectedPerson(person)}
              onMouseLeave={() => setSelectedPerson(null)}
              onClick={() => setSelectedPerson(person)}
            />
          </Map.Marker>
        ))}

        {selectedPerson && (
          <Map.Popup
            lngLat={selectedPerson.lngLat}
            offset={settings.person.size / 2}
          >
            <Person.Info person={selectedPerson} />
          </Map.Popup>
        )}
      </Map>
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

// NOTE: We need this as a separate component to access the map context
const PersonAvatar = ({ onClick, ...props }) => {
  const map = useContext(Map.Context);
  return (
    <Person.Avatar
      onClick={(e) => {
        onClick(e);
        map.flyTo({ center: props.person.lngLat, zoom: 6, speed: 2 });
      }}
      {...props}
    />
  );
};
