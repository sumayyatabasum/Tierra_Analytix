import React, { useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./password.css";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    const resetLink = `${window.location.origin}/reset-password?email=${encodeURIComponent(email)}`;

    setLoading(true);
    try {
      await emailjs.send(
        "service_5bgpuuu", 
        "template_auzsb39", 
        {
          user_name: email.split("@")[0], 
          email: email, 
          reset_link: resetLink, 
        },
        "RFIWmke_2yk_2IlSn" 
      );

      setSuccess("Reset link sent! Check your inbox.");
    } catch (err) {
      console.error("Email send error:", err);
      setError("Failed to send reset link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-container">
      <div className="password-background"></div>

      <div className="password-card">
        <div className="password-header">
          <h2 className="password-title">Reset Password</h2>
          <p className="password-subtitle">
            Enter your email to reset your password
          </p>
        </div>

        <form className="password-form" onSubmit={handleReset}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                className="input-field"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="password-button" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="redirect-text">
            Remember your password?{" "}
            <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
