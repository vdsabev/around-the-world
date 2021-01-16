const geocodingClient = require('@mapbox/mapbox-sdk/services/geocoding')
const { MAPBOX_ACCESS_TOKEN } = require('./settings')

const geocodingService = geocodingClient({ accessToken: MAPBOX_ACCESS_TOKEN })

module.exports = {
  /** @type {(query: string) => Promise<[lng: number, lat: number]} */
  async forwardGeocode(query) {
    const response = await geocodingService
      .forwardGeocode({ query, limit: 1 })
      .send()

    return response.body.features[0].center
  },
}
