const http = require('./src/http')
const people = require('./src/people')

exports.handler = http.function(async (request) => {
  const data = await people.find(request.query)

  // TODO: Introduce slight random variations in the output coordinates

  return {
    body: data,
  }
})
