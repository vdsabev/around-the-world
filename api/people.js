const { PEOPLE_DATASOURCE } = require('./src/settings')
const datasource = require(`./src/datasources/${PEOPLE_DATASOURCE}`)
const http = require('./src/http')

exports.handler = http.function(async (request) => {
  const response = await datasource(request.query)
  return {
    body: response,
  }
})
