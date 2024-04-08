import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import '../../App.css';
import './SignUp.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const history = useHistory();

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");
    if (loggedIn && history.location.pathname !== "/login") {
      history.push("/account");
    }
  }, [history]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    fetch("http://localhost:5321/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("Login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          // Redirect to account page
          history.push("/account");

          // Trigger a custom event to notify the Navbar component of login
          window.dispatchEvent(new Event('loginSuccess'));
        } else {
          setLoginError(data.error);
        }
      });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="containerSmall">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <i className="fa-solid fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            {loginError && (
              <p className="error-message">
                <i className="fa-solid fa-circle-xmark"></i> {loginError}
              </p>
            )}
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
            <div className="submit-container">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password">
              {email ? (
                <Link to={`/reset-password?email=${encodeURIComponent(email)}`}>
                  Forgot Password?
                </Link>
              ) : (
                <span onClick={() => alert("Please enter your email address")}>
                  Forgot Password?
                </span>
              )}
            </p>
            <p className="return-signup">
              Return to <a href="/sign-up">Sign Up</a> page
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
