const settings = {
  apiBaseUrl: '/api',

  mapbox: {
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    options: {
      style: process.env.REACT_APP_MAPBOX_STYLE_URL,
      bounds: [[-180, -50], [180, 70]],
    },
  },

  person: {
    size: 64, // in px
  },
}

export default settings
