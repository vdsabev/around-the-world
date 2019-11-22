export const toLngLatObject = ({ longitude, latitude, ...object }) => ({
  ...object,
  lngLat: [longitude, latitude],
});
