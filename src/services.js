import settings from './settings'

/** @typedef {{ name: string, location: string, pictureUrl: string, about: string, title: string, lngLat: [number, number] }} Person */

const services = {
  /** @returns {Promise<Person[]>} */
  async getPeople() {
    return fetchJson(`${settings.apiBaseUrl}/people`)
  },
}

export default services

const fetchJson = (
  /** @type {RequestInfo} */ input,
  /** @type {RequestInit?} */ init
) => {
  return fetch(input, init).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}
