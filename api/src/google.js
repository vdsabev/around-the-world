const { google } = require('googleapis')
const { GOOGLE_SHEETS_API_KEY } = require('./settings')

exports.sheets = google.sheets({
  version: 'v4',
  auth: GOOGLE_SHEETS_API_KEY,
})
