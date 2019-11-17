import React, { useContext, useEffect, useMemo, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';

import MapContext from './MapContext';
import MarkerContext from './MarkerContext';

const MapMarker = ({ children, lngLat }) => {
  const container = useMemo(() => document.createElement('div'), []);
  const map = useContext(MapContext);
  const marker = useMapboxMarker(container, map, lngLat);

  return ReactDOM.createPortal(
    <MarkerContext.Provider value={marker}>{children}</MarkerContext.Provider>,
    container
  );
};

export default MapMarker;

const useMapboxMarker = (container, map, lngLat) => {
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!map) return;

    const marker = new mapboxgl.Marker(container, {
      anchor: 'center',
    })
      .setLngLat(lngLat)
      .addTo(map);

    setMarker(marker);

    return () => {
      marker.remove();
    };
  }, [container, map, lngLat]);

  return marker;
};
