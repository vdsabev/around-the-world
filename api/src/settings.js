const parseSafely = (string) => {
  try {
    return JSON.parse(string)
  } catch (error) {
    console.error(error)
  }
}

const settings = {
  INFO_COLUMNS: parseSafely(process.env.REACT_APP_INFO_COLUMNS),

  MAPBOX_ACCESS_TOKEN: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,

  MONGO_DB_URL: process.env.MONGO_DB_URL,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  MONGO_DB_COLLECTION: process.env.MONGO_DB_COLLECTION,

  SLACK_TOKEN: process.env.SLACK_TOKEN,
}

module.exports = settings
