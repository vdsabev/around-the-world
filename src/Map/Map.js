import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import settings from '../settings';
import theme from '../theme';
import MapContext from './MapContext';

const Map = ({ children, ...props }) => {
  const [map, setMap] = useState(null);
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (container && !map) {
      mapboxgl.accessToken = settings.mapbox.accessToken;

      const map = new mapboxgl.Map({ ...settings.mapbox.options, container });
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));
      map.fitBounds(settings.mapbox.bounds);

      setMap(map);
    }
  }, [map]);

  return (
    <>
      <GlobalMapStyle />
      <MapContainer ref={containerRef} {...props}>
        <MapContext.Provider value={map}>{children}</MapContext.Provider>
      </MapContainer>
    </>
  );
};

export default Map;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const GlobalMapStyle = createGlobalStyle`
  .mapboxgl-control-container {
    .mapboxgl-ctrl-top-left,
    .mapboxgl-ctrl-top-right,
    .mapboxgl-ctrl-bottom-right,
    .mapboxgl-ctrl-bottom-left {
      margin: ${theme.space};
    }

    .mapboxgl-ctrl-top-left .mapboxgl-ctrl {
      margin: 0 ${theme.space} ${theme.space} 0;
    }

    .mapboxgl-ctrl-top-right .mapboxgl-ctrl {
      margin: 0 0 ${theme.space} ${theme.space};
    }

    .mapboxgl-ctrl-bottom-right .mapboxgl-ctrl {
      margin: ${theme.space} 0 0 ${theme.space};
    }
  }
`;
