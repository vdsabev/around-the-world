const { get } = require('lodash')
const http = require('./src/http')
const people = require('./src/people')
const { DATA_MAPPING_PEOPLE } = require('./src/settings')

exports.handler = http.function(async () => {
  const data = await people.find({ aroundTheWorld: { $exists: true } })

  return {
    body: data.map((person) =>
      Object.entries(DATA_MAPPING_PEOPLE).reduce(
        (result, [key, value]) => ({ ...result, [key]: get(person, value) }),
        { lngLat: person.aroundTheWorld.lngLat },
      ),
    ),
  }
})
