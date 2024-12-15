const { google } = require("googleapis");
require("dotenv").config();

const credentials = JSON.parse(
  process.env.GOOGLE_SERVICE_ACCOUNT_JSON
);

const range = "Sheet1!A1:E";

const SPREADSHEET_ID =
  "YOUR SPREADSHEET ID HERE";

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

async function fetchSheetData(range) {
  try {
    console.log(
      "Fetching data from Google Sheets for range:",
      range
    );

    const response =
      await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range,
      });

    return response.data.values || [];
  } catch (error) {
    console.error(
      "Error fetching data from Google Sheets:",
      error.message
    );
    throw error; // Throw the error instead of calling the function recursively
  }
}

async function updateSheetData(range, values) {
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });
    console.log(
      "Google Sheets updated successfully"
    );
  } catch (error) {
    console.error(
      "Error updating Google Sheets:",
      error
    );
    throw error;
  }
}

module.exports = {
  fetchSheetData,
  updateSheetData,
};
