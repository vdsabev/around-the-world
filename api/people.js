const http = require('./src/http')
const people = require('./src/people')

exports.handler = http.function(async (request) => {
  const response = await people.find(request.query)
  return {
    body: response,
  }
})
