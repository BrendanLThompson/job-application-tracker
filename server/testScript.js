const {
  fetchSheetData,
  updateSheetData,
} = require("./services/googleSheetsService");

const testGoogleSheetsIntegration = async () => {
  try {
    const range = "Sheet1!A1:E";

    // Fetch data
    console.log(
      "Fetching data from Google Sheets..."
    );
    const data = await fetchSheetData(range);
    console.log(
      "Data fetched from Google Sheets:",
      data
    );

    // Update data
    console.log("Updating Google Sheets...");
    const newValues = [
      ["ID", "Name", "Role"],
      ["1", "Alice", "Engineer"],
      ["2", "Bob", "Designer"],
    ];
    await updateSheetData(range, newValues);
    console.log(
      "Google Sheets updated successfully"
    );
  } catch (error) {
    console.error(
      "Error during Google Sheets integration:",
      error.message
    );
  }
};

testGoogleSheetsIntegration();
