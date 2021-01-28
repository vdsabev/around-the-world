export const lngLat = {
  type: Array,
  required: true,
  validator(value) {
    const [lng, lat] = value || []
    const hasValidLng = -180 <= lng && lng <= 180
    const hasValidLat = -90 <= lat && lat <= 90

    return hasValidLng && hasValidLat
  },
}
