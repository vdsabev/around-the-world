const http = require('./src/http')

async function acknowledgeEvent(request) {
  console.log(JSON.stringify(request.body.event, null, 2))
  return {
    statusCode: 204,
  }
}

// https://api.slack.com/events/url_verification
const UrlVerification = {
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
}

const ReactionItem = {
  anyOf: [
    {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['message'] },
        channel: { type: 'string' },
        ts: { type: 'string' },
      },
      required: ['type', 'channel', 'ts'],
    },
    {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['file'] },
        file: { type: 'string' },
      },
      required: ['type', 'file'],
    },
    {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['file_comment'] },
        file_comment: { type: 'string' },
        file: { type: 'string' },
      },
      required: ['type', 'file_comment', 'file'],
    },
  ],
}

const ReactionEvent = {
  type: 'object',
  properties: {
    user: { type: 'string' },
    reaction: { type: 'string' },
    item_user: { type: 'string' },
    item: ReactionItem,
    event_ts: { type: 'string' },
  },
  required: ['type', 'user', 'reaction', 'item', 'event_ts'],
}

const EventHandlers = {
  // https://api.slack.com/events/team_join
  team_join: {
    request: {
      body: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['team_join'] },
          user: { type: 'object' },
        },
        required: ['type', 'user'],
      },
    },
    handler: acknowledgeEvent,
  },

  // https://api.slack.com/events/user_change
  user_change: {
    request: {
      body: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['user_change'] },
          user: { type: 'object' },
        },
        required: ['type', 'user'],
      },
    },
    handler: acknowledgeEvent,
  },

  // https://api.slack.com/events/reaction_added
  reaction_added: {
    request: {
      body: {
        ...ReactionEvent,
        properties: {
          ...ReactionEvent.properties,
          type: { type: 'string', enum: ['reaction_added'] },
        },
      },
    },
    handler: acknowledgeEvent,
  },

  // https://api.slack.com/events/reaction_removed
  reaction_removed: {
    request: {
      body: {
        ...ReactionEvent,
        properties: {
          ...ReactionEvent.properties,
          type: { type: 'string', enum: ['reaction_removed'] },
        },
      },
    },
    handler: acknowledgeEvent,
  },
}

const Event = {
  properties: {
    token: { type: 'string' },
    team: { type: 'string' },
    api_app_id: { type: 'string' },
    event: {
      anyOf: Object.values(EventHandlers).map(
        (handler) => handler.request.body
      ),
    },
  },
}

exports.handler = http.function({
  method: 'POST',
  request: {
    body: {
      anyOf: [UrlVerification.request.body, Event],
    },
  },
  async handler(request) {
    try {
      if (request.body.type === 'url_verification') {
        return UrlVerification.handler(request)
      }

      const eventHandler = EventHandlers[(request.body.event || {}).type]
      if (eventHandler) {
        return eventHandler.handler(request)
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
