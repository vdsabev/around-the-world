export const toObjectWithRenamedKeys = (keyMapping) => (object) =>
  Object.keys(keyMapping).reduce((objectWithRenamedKeys, originalKey) => {
    const renamedKey = keyMapping[originalKey];
    return {
      ...objectWithRenamedKeys,
      [renamedKey]: object[originalKey],
    };
  }, {});

export const toObjectWithLngLat = ({ longitude, latitude, ...object }) => ({
  ...object,
  lngLat: [longitude, latitude],
});
