import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");

    fetch("http://localhost:5321/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Password reset successful");
          history.push("/login");
        } else {
          alert("Password reset failed");
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="containerSmall">
      <div className="header">
        <div className="text">Reset Password</div>
        <div className="underline"></div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input">
              <i className="fa-solid fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>

            <div className="input">
              <i className="fa-solid fa-lock"></i>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <i
                className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={toggleConfirmPasswordVisibility}
              ></i>
            </div>
            {passwordError && (
              <p className="error-message">
                <i className="fa-solid fa-circle-xmark"></i> {passwordError}
              </p>
            )}

            <div className="submit-container">
              <button type="submit" className="btn btn-primary">
                Reset Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;