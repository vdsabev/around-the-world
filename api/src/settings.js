const parseSafely = (string) => {
  try {
    return JSON.parse(string)
  } catch (error) {
    console.error(error)
  }
}

const settings = {
  DATA_MAPPING_PEOPLE: parseSafely(process.env.DATA_MAPPING_PEOPLE),
  JOIN_MESSAGE: process.env.JOIN_MESSAGE,
  LEAVE_MESSAGE: process.env.LEAVE_MESSAGE,

  MAPBOX_ACCESS_TOKEN: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,

  MONGO_DB_COLLECTION: process.env.MONGO_DB_COLLECTION,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  MONGO_DB_URL: process.env.MONGO_DB_URL,

  SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
  SLACK_REQUEST_TOKEN: process.env.SLACK_REQUEST_TOKEN,
}

module.exports = settings
