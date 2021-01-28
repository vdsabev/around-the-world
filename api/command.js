const querystring = require('querystring')
const { default: axios } = require('axios')
const { get } = require('lodash')
const { alias, validateRequest, validateHttpMethod } = require('lessttp/middleware')
const { JOIN_MESSAGE, LEAVE_MESSAGE } = require('./src/settings')

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
          request.body = querystring.parse(request.body)
        } catch (error) {
          console.error(error)
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
            user_id: { type: 'string' },
            command: { type: 'string', enum: ['/around_the_world'] },
            text: { type: 'string', enum: ['join', 'leave'] },
            response_url: { type: 'string' },
          },
          required: ['token', 'user_id', 'command', 'text', 'response_url'],
        },
      }),
    ]
  },
  async handler(request) {
    try {
      const user = { id: request.body.user_id }

      if (request.body.text === 'join') {
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

        await people.updateOne({ id: user.id }, { $set: user }, { upsert: true })

        axios.post(request.body.response_url, { text: JOIN_MESSAGE })
      } else {
        await people.deleteOne({ id: user.id })

        axios.post(request.body.response_url, { text: LEAVE_MESSAGE })
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
