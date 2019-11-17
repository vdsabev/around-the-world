import { useContext, useEffect, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';

import MarkerContext from './MarkerContext';

const MapPopup = ({ children, lngLat, ...props }) => {
  const container = useMemo(() => document.createElement('div'), []);
  const map = useContext(MarkerContext);
  const marker = useContext(MarkerContext);
  useMapboxPopup(container, { map, marker, lngLat, options: props });

  return ReactDOM.createPortal(children, container);
};

export default MapPopup;

const useMapboxPopup = (container, { map, marker, lngLat, options }) => {
  useEffect(() => {
    const popup = new mapboxgl.Popup(options).setDOMContent(container);
    if (marker) {
      marker.setPopup(popup);
    } else if (map && lngLat) {
      popup.setLngLat(lngLat).addTo(map);
      return () => {
        popup.remove();
      };
    }
  }, [container, map, marker, lngLat]);
};
