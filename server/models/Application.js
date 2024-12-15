const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    applicationDate: {
      type: Date,
      required: true,
    },
    status: { type: String, default: "Applied" },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Application",
  ApplicationSchema
);
