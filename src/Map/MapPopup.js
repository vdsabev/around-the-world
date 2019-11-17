import { useContext, useEffect, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';

import MapContext from './MapContext';

const MapPopup = ({ children, lngLat }) => {
  const container = useMemo(() => document.createElement('div'), []);
  const map = useContext(MapContext);
  useMapboxPopup(container, map, lngLat);

  return ReactDOM.createPortal(children, container);
};

export default MapPopup;

const useMapboxPopup = (container, map, lngLat) => {
  useEffect(() => {
    if (!map) return;

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    })
      .setDOMContent(container)
      .setLngLat(lngLat)
      .addTo(map);

    return () => {
      popup.remove();
    };
  }, [container, map, lngLat]);
};
