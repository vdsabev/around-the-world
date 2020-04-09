import React, { useContext } from 'react';
import Map from '../Map';
import Person from '../People';

const MapPersonAvatar = ({ onClick, ...props }) => {
  const map = useContext(Map.Context);
  return (
    <Person.Avatar
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
        map.flyTo({
          center: props.person.lngLat,
          zoom: Math.max(map.getZoom(), 6),
          speed: 2,
        });
      }}
      {...props}
    />
  );
};

export default MapPersonAvatar;
