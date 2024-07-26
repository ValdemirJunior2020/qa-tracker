const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost'
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

async function getSheetData(spreadsheetId, range) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error;
  }
}

function checkStrikes(data) {
  const strikes = {};
  data.slice(1).forEach((row) => {
    const agent = row[1]; // Column C
    const feedbackType = row[2]; // Column D
    if (feedbackType && feedbackType.toLowerCase() === 'corrective') {
      if (!strikes[agent]) {
        strikes[agent] = 0;
      }
      strikes[agent]++;
    }
  });
  return strikes;
}

module.exports = {
  getSheetData,
  checkStrikes,
};
