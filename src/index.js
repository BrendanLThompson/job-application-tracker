import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Import global CSS (e.g., Tailwind setup)
import App from "./App"; // Main App component
import reportWebVitals from "./reportWebVitals"; // Optional: For performance monitoring

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals(); // Optional: For web vitals logging
