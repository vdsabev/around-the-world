import settings from './settings'

const services = {
  /** @returns {Promise<import('./types').Person[]>} */
  async getPeople() {
    return fetchJson(`${settings.apiBaseUrl}/getPeople`)
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
