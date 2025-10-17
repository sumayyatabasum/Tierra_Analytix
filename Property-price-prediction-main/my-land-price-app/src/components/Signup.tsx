import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./signup.css";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      
      await emailjs.send(
        "service_5bgpuuu",      
        "template_991bnx5",     
        {
          user_name: name,
          email: email,
          subject: "Welcome to TIERRA ANALYTIX,",
          message: `
Dear ${name},

Welcome to the Tierra family!

We're excited to have you on board.

Your account has been successfully created. 🎉

Best regards,
The Tierra Team
          `,
        },
        "RFIWmke_2yk_2IlSn"       
      );

      alert("✅ Account created! Please check your email for a welcome message.");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("❌ Email failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-background"></div>

      <div className="signup-card">
        <div className="signup-header">
          <h2 className="signup-title">Tierra Analytix</h2>
          <p className="signup-subtitle">Create your account</p>
        </div>

        <form className="signup-form" onSubmit={handleSignup}>
          {/* Full Name */}
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                className="input-field"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <EyeOff
                  size={18}
                  className="eye-icon"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  size={18}
                  className="eye-icon"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                className="input-field"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Sign Up Button */}
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>

          {/* Redirect */}
          <p className="redirect-text">
            Already have an account?{" "}
            <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
