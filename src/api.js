import http from './http'
import settings from './settings'

/** @return {Promise<import('../types').Person[]>} */
export const getPeople = () => {
  return http.getJSON(`${settings.apiBaseUrl}/getPeople`)
}
