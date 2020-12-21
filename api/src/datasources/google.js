const { google } = require('googleapis')
const {
  GOOGLE_SHEETS_API_KEY,
  GOOGLE_SHEETS_SHEET_ID,
  GOOGLE_SHEETS_SHEET_RANGE,
  GOOGLE_SHEETS_SHEET_COLUMNS,
} = require('../settings')

module.exports = async () => {
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEETS_SHEET_ID,
    range: GOOGLE_SHEETS_SHEET_RANGE,
  })

  const [columns, ...rowsOfCells] = result.data.values

  return rowsOfCells
    .map(toRowObject(columns.map(toMappedKey(GOOGLE_SHEETS_SHEET_COLUMNS))))
    .map(toRowWithLngLat)
}

const sheets = google.sheets({
  version: 'v4',
  auth: GOOGLE_SHEETS_API_KEY,
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
