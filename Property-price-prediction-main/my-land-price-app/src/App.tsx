// ---------------- IMPORTS ----------------
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, Home, BedDouble, Bath, TrendingUp } from "lucide-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "./Form.css";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/password";

// ---------------- PREDICTION APP ----------------
function PredictionApp() {
  const [locations, setLocations] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    location: "",
    squareFeet: "",
    bedrooms: "",
    bathrooms: "",
  });
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ---------------- FETCH LOCATIONS ----------------
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/locations")
      .then((res) => setLocations(res.data))
      .catch((err) => console.error("Error fetching locations:", err));
  }, []);

  // ---------------- HANDLE INPUT ----------------
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ---------------- HANDLE PREDICT ----------------
  const handlePredict = () => {
    setIsLoading(true);
    axios
      .post("http://127.0.0.1:5000/api/predict", {
        location: formData.location,
        squareFeet: parseFloat(formData.squareFeet),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
      })
      .then((res) => setPredictedPrice(res.data.predicted_price))
      .catch((err) => console.error("Prediction error:", err))
      .finally(() => setIsLoading(false));
  };

  // ---------------- RENDER ----------------
  return (
    <div className="app-background">
      <div className="app-container">
        <div className="app-card">
          {/* Header */}
          <div className="header">
            <div className="header-icon">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h1 className="header-title">Tierra Analytix</h1>
            <p className="header-sub">Land Price Prediction</p>
          </div>

          {/* Form */}
          <div className="form-section">
            <label className="form-label">
              <MapPin className="icon" />
              Property Location
            </label>
            <select
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="form-input"
            >
              <option value="">Select a location</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc} className="dropdown-option">
                  {loc}
                </option>
              ))}
            </select>

            <div className="grid">
              {/* Square Feet */}
              <div>
                <label className="form-label">
                  <Home className="icon" />
                  Square Feet
                </label>
                <input
                  type="number"
                  value={formData.squareFeet}
                  onChange={(e) =>
                    handleInputChange("squareFeet", e.target.value)
                  }
                  className="form-input"
                />
              </div>

              {/* Bedrooms */}
              <div>
                <label className="form-label">
                  <BedDouble className="icon" />
                  Bedrooms
                </label>
                <input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    handleInputChange("bedrooms", e.target.value)
                  }
                  className="form-input"
                />
              </div>

              {/* Bathrooms */}
              <div>
                <label className="form-label">
                  <Bath className="icon" />
                  Bathrooms
                </label>
                <input
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) =>
                    handleInputChange("bathrooms", e.target.value)
                  }
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handlePredict}
            disabled={isLoading}
            className="predict-btn"
          >
            {isLoading ? "Predicting..." : "Predict Price"}
          </button>

          {/* Result */}
          {predictedPrice !== null && (
            <div className="result">
              <h3>Prediction Result</h3>
              <p>₹{predictedPrice} Lakhs</p>
            </div>
          )}

          <div className="author">
            <p className="header-sub">
              Project Done By: Venu, Sumayya, Sathvika and Naresh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- MAIN APP WITH ROUTES ----------------
function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Forgot Password Page */}
        <Route path="/password" element={<ForgotPassword />} />
         
        {/* Main App (After login) */}
        <Route path="/app" element={<PredictionApp />} />
      </Routes>
    </Router>
  );
}

export default App;
