const { google } = require('googleapis')
const http = require('./src/http')
const {
  GOOGLE_SHEETS_API_KEY,
  GOOGLE_SHEETS_SHEET_ID,
  GOOGLE_SHEETS_SHEET_RANGE,
  GOOGLE_SHEETS_SHEET_COLUMNS,
} = require('./src/settings')

exports.handler = http.function('GET', async (event, context) => {
  const sheets = google.sheets({ version: 'v4', auth: GOOGLE_SHEETS_API_KEY })
  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_SHEET_ID,
      range: GOOGLE_SHEETS_SHEET_RANGE,
    })
    const [columns, ...rowsOfCells] = result.data.values
    return http.json(
      rowsOfCells
        .map(toRowObject(columns.map(toMappedKey(GOOGLE_SHEETS_SHEET_COLUMNS))))
        .map(toRowWithLngLat)
    )
  } catch (error) {
    return http.error(error, 502)
  }
})

const toRowObject = (/** @type {string[]} */ columns) => (
  /** @type {string[]} */ cells
) => {
  return columns.reduce(
    (row, column, index) => ({ ...row, [column]: parseValue(cells[index]) }),
    {}
  )
}

const parseValue = (value) => {
  const valueAsNumber = Number(value)
  return isNaN(valueAsNumber) ? value : valueAsNumber
}

const toMappedKey = (keyMapping) => (/** @type {string} */ column) => {
  return keyMapping[column]
}

const toRowWithLngLat = ({ longitude, latitude, ...row }) => ({
  ...row,
  lngLat: [longitude, latitude],
})
