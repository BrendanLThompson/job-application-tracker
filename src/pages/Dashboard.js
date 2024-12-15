import React, {
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [applications, setApplications] =
    useState([]);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const navigate = useNavigate();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Fetch applications from the backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/applications"
        );
        setApplications(response.data);
      } catch (error) {
        console.error(
          "Error fetching applications:",
          error
        );
      }
    };

    fetchApplications();
  }, []);

  // Handle status update
  const handleStatusChange = async (
    id,
    newStatus
  ) => {
    try {
      console.log(
        `Updating status for application ID: ${id} to ${newStatus}`
      );

      const response = await axios.put(
        `http://localhost:5000/api/applications/${id}`,
        {
          status: newStatus,
        }
      );

      console.log(
        "Update response:",
        response.data
      );

      // Update the state to reflect the new status
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === id
            ? {
                ...app,
                status: response.data.status,
              }
            : app
        )
      );
    } catch (error) {
      console.error(
        "Error updating status:",
        error.message
      );
      alert(
        "Failed to update application status."
      );
    }
  };

  // Handle delete application
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/applications/${id}`
      );
      setApplications((prevApplications) =>
        prevApplications.filter(
          (app) => app._id !== id
        )
      );
      console.log("Application deleted:", id);
    } catch (error) {
      console.error(
        "Error deleting application:",
        error
      );
    }
  };

  return (
    <div
      className={`p-6 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          My Job Applications
        </h1>
        <div className="flex space-x-4">
          {/* Add New Application Button */}
          <button
            onClick={() => navigate("/add")}
            className="text-lg bg-blue-300 text-white px-3 py-2 rounded shadow"
          >
            ➕
          </button>
          <button
            onClick={() => {
              fetch(
                "http://localhost:5000/api/applications/sync-to-sheets"
              )
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(
                      `HTTP error! Status: ${response.status}`
                    );
                  }
                  return response.json();
                })
                .then((data) => {
                  alert(data.message); // Show success message
                })
                .catch((err) => {
                  console.error(
                    "Error syncing to Google Sheets:",
                    err.message
                  );
                  alert(
                    "Failed to sync data to Google Sheets"
                  );
                });
            }}
            className="text-lg bg-green-500 text-white px-3 py-2 rounded shadow"
          >
            📃
          </button>
          {/* <button
            onClick={() =>
              fetch(
                "http://localhost:5000/api/applications/sync-from-sheets"
              )
                .then(() =>
                  alert(
                    "Data synced from Google Sheets!"
                  )
                )
                .catch((err) =>
                  alert(
                    "Error syncing from Sheets: " +
                      err.message
                  )
                )
            }
            className="text-lg bg-yellow-500 text-white px-3 py-2 rounded shadow"
          >
            Sync from Sheets
          </button> */}
          {/* <button
            onClick={() =>
              fetch(
                "http://localhost:5000/api/applications/sync-all"
              )
                .then(() =>
                  alert("Full sync completed!")
                )
                .catch((err) =>
                  alert(
                    "Error during full sync: " +
                      err.message
                  )
                )
            }
            className="text-lg bg-blue-500 text-white px-3 py-2 rounded shadow"
          >
            Full Sync
          </button> */}
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className={`text-lg text-white px-3 py-2 rounded shadow ${
              darkMode
                ? "bg-gray-100 text-black"
                : "bg-gray-700 text-white"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className={`shadow-md rounded p-4 relative ${
              darkMode
                ? "bg-gray-700"
                : "bg-white"
            }
            ${
              app.status === "Denied/Rejected"
                ? "border-2 border-red-400"
                : "border"
            }
            ${
              app.status === "Offer"
                ? "border-2 border-green-400"
                : "border"
            }`}
          >
            <h2 className="text-xl font-bold">
              {app.companyName}
            </h2>
            <p className="text-lg">
              {app.jobTitle}
            </p>
            <p className="text-lg">
              Applied on:{" "}
              {new Date(
                app.applicationDate
              ).toLocaleDateString()}
            </p>
            <label className="text-lg">
              Status:
              <select
                value={app.status}
                onChange={(e) =>
                  handleStatusChange(
                    app._id,
                    e.target.value
                  )
                }
                className={`border p-2 rounded w-full mt-2 ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <option value="Applied">
                  Applied
                </option>
                <option value="Interview">
                  Interview
                </option>
                <option value="Offer">
                  Offer
                </option>
                <option value="Denied/Rejected">
                  Denied/Rejected
                </option>
              </select>
            </label>
            <p className="text-sm mt-2">
              {app.notes}
            </p>
            {/* Delete Button */}
            <button
              onClick={() =>
                handleDelete(app._id)
              }
              className="absolute top-2 right-2 text-red-500 bg-transparent text-lg rounded hover:bg-red-400"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
