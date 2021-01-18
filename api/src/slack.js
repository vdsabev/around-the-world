const { WebClient } = require('@slack/web-api')
const { SLACK_BOT_TOKEN } = require('./settings')

module.exports = new WebClient(SLACK_BOT_TOKEN)
