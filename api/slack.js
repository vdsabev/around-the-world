const { get } = require('lodash')
const geocoding = require('./src/geocoding')
const http = require('./src/http')
const people = require('./src/people')
const { DATA_MAPPING_PEOPLE, SLACK_REQUEST_TOKEN } = require('./src/settings')
const slack = require('./src/slack')

const JoinButton = {
  type: 'button',
  text: {
    type: 'plain_text',
    text: '😊 Join the Team',
    emoji: true,
  },
  style: 'primary',
  value: 'join',
}

const LeaveButton = {
  type: 'button',
  text: {
    type: 'plain_text',
    text: '😢 Leave the Team',
    emoji: true,
  },
  style: 'danger',
  value: 'leave',
}

// https://api.slack.com/events/url_verification
const UrlVerification = {
  body: {
    type: 'object',
    properties: {
      token: { type: 'string', enum: [SLACK_REQUEST_TOKEN] },
      type: { type: 'string', enum: ['url_verification'] },
      challenge: { type: 'string' },
    },
    required: ['token', 'type', 'challenge'],
  },
  async handler(request) {
    return {
      body: {
        challenge: request.body.challenge,
      },
    }
  },
}

const EventHandlers = {
  // https://api.slack.com/events/app_home_opened
  app_home_opened: {
    event: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['app_home_opened'] },
        user: { type: 'string' },
        view: { type: 'object' },
      },
      required: ['type', 'user'],
    },
    async handler(request) {
      const { view, user } = request.body.event
      if (!view) {
        await slack.views.publish({
          user,
          view: {
            type: 'home',
            blocks: [
              {
                type: 'actions',
                elements: [JoinButton, LeaveButton],
              },
            ],
          },
        })
      }

      return {
        statusCode: 204,
      }
    },
  },

  // https://api.slack.com/events/user_change
  user_change: {
    event: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['user_change'] },
        user: { type: 'object' },
      },
      required: ['type', 'user'],
    },
    async handler(request) {
      const { user } = request.body.event

      const person = await people.findOne({ id: user.id })
      if (person) {
        // Update location
        const locationFieldPath = DATA_MAPPING_PEOPLE.location
        const newLocation = get(user, locationFieldPath)
        const currentLocation = get(person, locationFieldPath)
        const isNewLocationDifferent = newLocation && newLocation !== currentLocation

        user.aroundTheWorld = {
          ...person.aroundTheWorld,
          lngLat: isNewLocationDifferent
            ? await geocoding.forwardGeocode(newLocation)
            : person.aroundTheWorld.lngLat,
        }

        await people.replaceOne({ id: user.id }, user)
      }

      return {
        statusCode: 204,
      }
    },
  },
}

const Event = {
  properties: {
    token: { type: 'string', enum: [SLACK_REQUEST_TOKEN] },
    team: { type: 'string' },
    api_app_id: { type: 'string' },
    event: {
      anyOf: Object.values(EventHandlers).map((handler) => handler.event),
    },
  },
  required: ['token', 'event'],
}

exports.handler = http.function({
  method: 'POST',
  request: {
    body: {
      anyOf: [UrlVerification.body, Event],
    },
  },
  async handler(request) {
    try {
      if (request.body.type === 'url_verification') {
        const response = await UrlVerification.handler(request)
        return response
      }

      const eventHandler = EventHandlers[(request.body.event || {}).type]
      if (eventHandler) {
        const response = await eventHandler.handler(request)
        return response
      }

      return {
        statusCode: 404,
      }
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
      }
    }
  },
})
