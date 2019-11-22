import { useMemo } from 'react';
import mapboxgl from 'mapbox-gl';

export const useBounds = (coordinates, minCoordinates = 2) => {
  const bounds = useMemo(() => {
    if (!(coordinates && coordinates.length > minCoordinates)) return null;

    const bounds = new mapboxgl.LngLatBounds();
    coordinates.forEach((coordinate) => bounds.extend(coordinate));
    return bounds;
  }, [coordinates, minCoordinates]);

  return bounds;
};
