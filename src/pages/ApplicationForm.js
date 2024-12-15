import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ApplicationForm() {
  const [form, setForm] = useState({
    companyName: "",
    jobTitle: "",
    applicationDate: "",
    status: "Applied",
    notes: "",
  });

  const navigate = useNavigate();

  // Handle changes to form inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form data:", form); // Debug log to check form data
    try {
      const response = await axios.post(
        "http://localhost:5000/api/applications",
        form
      );
      console.log("Response:", response.data);

      // Show success toast
      toast.success(
        "Application submitted successfully!",
        {
          position: "top-right",
          autoClose: 1000,
          theme: "colored",
        }
      );

      // Redirect to dashboard after success
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error(
        "Error submitting application:",
        error.response || error.message
      );

      // Show error toast
      toast.error(
        "Failed to submit application. Please try again.",
        {
          position: "top-right",
          autoClose: 1000,
          theme: "colored",
        }
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Add Job Application
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={form.jobTitle}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <input
          type="date"
          name="applicationDate"
          value={form.applicationDate}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default ApplicationForm;
