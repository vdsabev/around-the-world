import { useContext, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';

import { useElement } from './hooks';
import MapContext from './MapContext';

const MapMarker = ({
  // Required
  children,
  lngLat,
  // Marker options: https://docs.mapbox.com/mapbox-gl-js/api/#marker
  anchor = 'center',
  color,
  draggable,
  offset,
  // Misc
  tagName = 'div',
  ...props
}) => {
  const element = useElement(tagName, props);
  const map = useContext(MapContext);
  useMapboxMarker(map, element, lngLat, {
    anchor,
    color,
    draggable,
    offset,
  });

  return ReactDOM.createPortal(children, element);
};

export default MapMarker;

const useMapboxMarker = (map, element, lngLat, options) => {
  useEffect(() => {
    if (!map) return;

    const marker = new mapboxgl.Marker({
      ...options,
      element,
    })
      .setLngLat(lngLat)
      .addTo(map);

    return () => {
      marker.remove();
    };
  }, [map, element, lngLat]); // eslint-disable-line react-hooks/exhaustive-deps
};
