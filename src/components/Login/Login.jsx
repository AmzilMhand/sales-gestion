import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginSuccess, loginFailure } from "./../../redux/authReducer";
import { getUsers } from "../../services/api";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const users = await getUsers();
      const user = users.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        dispatch(
          loginSuccess({ username: user.name, email: user.email }, user.role)
        );

        navigate("/dashboard");
      } else {
        dispatch(loginFailure("Invalid credentials"));
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Sales Dashboard</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="alternative-action">
          <p>
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
