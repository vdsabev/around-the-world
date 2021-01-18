const { get } = require('lodash')
const {
  alias,
  validateRequest,
  validateHttpMethod,
} = require('lessttp/middleware')

const geocoding = require('./src/geocoding')
const http = require('./src/http')
const people = require('./src/people')
const {
  DATA_MAPPING_PEOPLE,
  SLACK_BOT_TOKEN,
  SLACK_REQUEST_TOKEN,
} = require('./src/settings')
const slack = require('./src/slack')

exports.handler = http.function({
  middleware() {
    return [
      alias({ httpMethod: 'method' }),
      validateHttpMethod('POST'),
      async function parseBody(request) {
        try {
          request.body = JSON.parse(
            decodeURIComponent(request.body).replace(/^payload=/, '')
          )
        } catch (error) {
          return {
            statusCode: 400,
            body: 'Invalid request body!',
          }
        }
      },
      validateRequest({
        body: {
          type: 'object',
          properties: {
            token: { type: 'string', enum: [SLACK_REQUEST_TOKEN] },
            type: { type: 'string', enum: ['block_actions'] },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
              },
              required: ['id'],
            },
            actions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  value: { type: 'string', enum: ['join', 'leave'] },
                },
                required: ['value'],
              },
            },
          },
          required: ['token', 'user'],
        },
      }),
    ]
  },
  async handler(request) {
    try {
      const user = { id: request.body.user.id }

      if (request.body.actions[0].value === 'join') {
        const response = await slack.users.profile.get({
          token: SLACK_BOT_TOKEN,
          user: user.id,
        })

        user.profile = response.profile

        const locationFieldPath = DATA_MAPPING_PEOPLE.location
        const location = get(user, locationFieldPath)
        if (location) {
          user.aroundTheWorld = {
            lngLat: await geocoding.forwardGeocode(location),
          }
        }

        await people.insertOne(user)
      } else {
        await people.deleteOne({ id: user.id })
      }
      return {
        statusCode: 204,
      }
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
      }
    }
  },
})
