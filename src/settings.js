const settings = {
  mapbox: {
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    options: {
      style: process.env.REACT_APP_MAPBOX_STYLE_URL,
      center: [0, 30],
      zoom: 1.5,
    },
  },
};

export default settings;
