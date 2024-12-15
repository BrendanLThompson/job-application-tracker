const express = require("express");
const Application = require("../models/Application");
const googleSheetsService = require("../services/googleSheetsService"); // Google Sheets integration
const router = express.Router();

const SHEET_RANGE = "Applications!A1:E"; // Adjust the range to match your Google Sheets layout

// GET all applications from MongoDB
router.get("/", async (req, res) => {
  try {
    console.log(
      "Fetching applications from MongoDB..."
    );
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    console.error(
      "Error fetching applications:",
      error
    );
    res
      .status(500)
      .json({ error: error.message });
  }
});

// ADD a new application to MongoDB
router.post("/", async (req, res) => {
  try {
    const newApplication = new Application(
      req.body
    );
    const savedApplication =
      await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error(
      "Error adding application:",
      error
    );
    res
      .status(500)
      .json({ error: error.message });
  }
});

// DELETE an application from MongoDB
router.delete("/:id", async (req, res) => {
  try {
    const deletedApplication =
      await Application.findByIdAndDelete(
        req.params.id
      );
    if (!deletedApplication) {
      return res
        .status(404)
        .json({ error: "Application not found" });
    }
    res.json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error(
      "Error deleting application:",
      error
    );
    res
      .status(500)
      .json({ error: error.message });
  }
});

// Sync MongoDB data to Google Sheets
router.get(
  "/sync-to-sheets",
  async (req, res) => {
    try {
      console.log(
        "Fetching data from MongoDB..."
      );
      const applications =
        await Application.find(); // Fetch data from MongoDB

      const values = applications.map((app) => [
        app._id,
        app.companyName,
        app.jobTitle,
        app.applicationDate.toISOString(),
        app.status,
      ]);

      // Add header row for Google Sheets
      values.unshift([
        "ID",
        "Company Name",
        "Job Title",
        "Application Date",
        "Status",
      ]);

      console.log(
        "Sending data to Google Sheets:",
        values
      );
      await googleSheetsService.updateSheetData(
        "Sheet1!A1:E",
        values
      ); // Update Google Sheets
      res.json({
        message:
          "Data successfully synced to Google Sheets",
      });
    } catch (error) {
      console.error(
        "Error syncing to Google Sheets:",
        error.message
      );
      res
        .status(500)
        .json({ error: error.message });
    }
  }
);

// Sync Google Sheets data to MongoDB
router.get(
  "/sync-from-sheets",
  async (req, res) => {
    try {
      console.log(
        "Syncing data from Google Sheets to MongoDB..."
      );
      const rows =
        await googleSheetsService.fetchSheetData(
          SHEET_RANGE
        );

      // Skip header row
      const dataRows = rows.slice(1);

      for (const [
        companyName,
        jobTitle,
        applicationDate,
        status,
      ] of dataRows) {
        await Application.findByIdAndUpdate(
          {
            companyName,
            jobTitle,
            applicationDate: new Date(
              applicationDate
            ),
            status,
          },
          { upsert: true } // Create a new record if it doesn't exist
        );
      }

      res.json({
        message:
          "Data successfully synced from Google Sheets to MongoDB",
      });
    } catch (error) {
      console.error(
        "Error syncing from Google Sheets:",
        error
      );
      res
        .status(500)
        .json({ error: error.message });
    }
  }
);

// Full sync: Ensure MongoDB and Google Sheets are fully in sync
router.get("/sync-all", async (req, res) => {
  try {
    console.log(
      "Performing full sync between MongoDB and Google Sheets..."
    );

    // Fetch rows from Google Sheets
    const rows =
      await googleSheetsService.fetchSheetData(
        SHEET_RANGE
      );
    const dataRows = rows.slice(1); // Skip header row

    // Update MongoDB from Google Sheets
    for (const [
      ID,
      companyName,
      jobTitle,
      applicationDate,
      status,
    ] of dataRows) {
      await Application.findByIdAndUpdate(
        {
          companyName,
          jobTitle,
          applicationDate: new Date(
            applicationDate
          ),
          status,
        },
        { upsert: true }
      );
    }

    // Fetch data from MongoDB
    const applications = await Application.find();
    const values = applications.map((app) => [
      app.companyName,
      app.jobTitle,
      app.applicationDate.toISOString(),
      app.status,
    ]);

    // Add header row and update Google Sheets
    values.unshift([
      "Company Name",
      "Job Title",
      "Application Date",
      "Status",
    ]);
    await googleSheetsService.updateSheetData(
      SHEET_RANGE,
      values
    );

    res.json({
      message:
        "Full synchronization completed successfully",
    });
  } catch (error) {
    console.error(
      "Error during full synchronization:",
      error
    );
    res
      .status(500)
      .json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log(
      `Updating application ID: ${id} with status: ${status}`
    );

    const updatedApplication =
      await Application.findByIdAndUpdate(
        id,
        { status },
        { new: true } // Return the updated document
      );

    if (!updatedApplication) {
      return res
        .status(404)
        .json({ error: "Application not found" });
    }

    res.json(updatedApplication);
  } catch (error) {
    console.error(
      "Error updating application status:",
      error.message
    );
    res
      .status(500)
      .json({ error: error.message });
  }
});

module.exports = router;
