import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import ApplicationForm from "./pages/ApplicationForm";

function App() {
  return (
    <Router>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
        />
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/add"
            element={<ApplicationForm />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
