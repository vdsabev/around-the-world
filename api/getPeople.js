const { get } = require('lodash')
const http = require('./src/http')
const people = require('./src/people')
const { DATA_MAPPING_PEOPLE } = require('./src/settings')

exports.handler = http.function(async (request) => {
  const data = await people.find(request.query)

  return {
    body: data.map((person) =>
      Object.entries(DATA_MAPPING_PEOPLE).reduce(
        (result, [key, value]) => ({ ...result, [key]: get(person, value) }),
        { lngLat: person.aroundTheWorld && person.aroundTheWorld.lngLat }
        // TODO: Introduce slight random variations in the output values of `lngLat`
      )
    ),
  }
})
