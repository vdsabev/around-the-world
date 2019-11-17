import { useContext, useEffect, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';

import MapContext from './MapContext';

const MapMarker = ({ children, lngLat }) => {
  const container = useMemo(() => document.createElement('div'), []);
  const map = useContext(MapContext);
  useMapboxMarker(container, map, lngLat);

  return ReactDOM.createPortal(children, container);
};

export default MapMarker;

const useMapboxMarker = (container, map, lngLat) => {
  useEffect(() => {
    if (!map) return;

    const marker = new mapboxgl.Marker(container, {
      anchor: 'bottom',
    })
      .setLngLat(lngLat)
      .addTo(map);

    return () => {
      marker.remove();
    };
  }, [container, map, lngLat]);
};
