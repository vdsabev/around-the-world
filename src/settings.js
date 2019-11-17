const settings = {
  mapbox: {
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    options: {
      style: process.env.REACT_APP_MAPBOX_STYLE_URL,
    },
    bounds: [
      [-180, -30],
      [180, 70],
    ],
  },

  person: {
    size: 64, // in px
  },
};

export default settings;
