import { useContext, useEffect, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';

import MapContext from './MapContext';

const MapPopup = ({ children, lngLat, ...props }) => {
  const container = useMemo(() => document.createElement('div'), []);
  const map = useContext(MapContext);
  useMapboxPopup(container, map, lngLat, props);

  return ReactDOM.createPortal(children, container);
};

export default MapPopup;

const useMapboxPopup = (container, map, lngLat, options) => {
  useEffect(() => {
    if (!map) return;

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      ...options,
    })
      .setDOMContent(container)
      .setLngLat(lngLat)
      .addTo(map);

    return () => {
      popup.remove();
    };
  }, [container, map, lngLat]); // eslint-disable-line react-hooks/exhaustive-deps
};
