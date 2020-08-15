const settings = {
  GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY,
  GOOGLE_SHEETS_SHEET_ID: process.env.GOOGLE_SHEETS_SHEET_ID,
  GOOGLE_SHEETS_SHEET_RANGE: process.env.GOOGLE_SHEETS_SHEET_RANGE,
  GOOGLE_SHEETS_SHEET_COLUMNS: JSON.parse(
    process.env.GOOGLE_SHEETS_SHEET_COLUMNS
  ),
}

module.exports = settings
