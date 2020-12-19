const http = require('./src/http')

const ReactionItem = {
  type: 'object',
  properties: {
    anyOf: [
      {
        type: { type: 'string', enum: ['message'] },
        channel: { type: 'string' },
        ts: { type: 'string' },
      },
      {
        type: { type: 'string', enum: ['message'] },
        file: { type: 'string' },
      },
      {
        type: { type: 'string', enum: ['message'] },
        file_comment: { type: 'string' },
        file: { type: 'string' },
      },
    ],
  },
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

const handlers = {
  // https://api.slack.com/events/url_verification
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
    async handler(request) {
      console.log(request.body)
      return {
        statusCode: 204,
      }
    },
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
    async handler(request) {
      console.log(request.body)
      return {
        statusCode: 204,
      }
    },
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
    async handler(request) {
      console.log(request.body)
      return {
        statusCode: 204,
      }
    },
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
    async handler(request) {
      console.log(request.body)
      return {
        statusCode: 204,
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
