const http = require('./src/http')

const handlers = {
  url_verification: {
    request: {
      body: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['url_verification'] },
          challenge: { type: 'string' },
        },
        required: ['type', 'challenge'],
      },
    },
    async handler(request) {
      return {
        body: {
          challenge: request.body.challenge,
        },
      }
    },
  },
}

exports.handler = http.function({
  method: 'POST',
  request: {
    body: {
      anyOf: Object.values(handlers).map((handler) => handler.request.body),
    },
  },
  async handler(request) {
    return handlers[request.body.type].handler(request)
  },
})
