const settings = {
  apiBaseUrl: '/api',

  infoColumns: JSON.parse(process.env.VUE_APP_INFO_COLUMNS),

  mapbox: {
    accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
    options: {
      style: process.env.VUE_APP_MAPBOX_STYLE_URL,
      bounds: [
        [-180, -50],
        [180, 70],
      ],
    },
  },
}

export default settings
