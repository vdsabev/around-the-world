const parseSafely = (string) => {
  try {
    return JSON.parse(string)
  } catch (error) {
    console.error(error)
  }
}

const settings = {
  GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY,
  GOOGLE_SHEETS_SHEET_ID: process.env.GOOGLE_SHEETS_SHEET_ID,
  GOOGLE_SHEETS_SHEET_RANGE: process.env.GOOGLE_SHEETS_SHEET_RANGE,
  GOOGLE_SHEETS_SHEET_COLUMNS: parseSafely(
    process.env.GOOGLE_SHEETS_SHEET_COLUMNS
  ),
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  MONGO_DB_COLLECTION: process.env.MONGO_DB_COLLECTION,
  PEOPLE_DATASOURCE: process.env.PEOPLE_DATASOURCE,
}

module.exports = settings
