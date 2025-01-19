import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginSuccess } from "../../redux/authReducer"; 
import { addUser, getUsers } from "../../services/api";

const Register = () => {
  const [credentials, setCredentials] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const existingUsers = await getUsers();
      const userExists = existingUsers.some(
        (user) => user.email === credentials.email
      );

      if (userExists) {
        setError("Email already in use. Please log in.");
      } else {
        const newUser = await addUser({
          ...credentials,
          role: "employee"
        });
        
        dispatch(
          loginSuccess({ fullname: newUser.fullname, email: newUser.email }, "employee")
        );
        
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={credentials.fullname}
              onChange={(e) =>
                setCredentials({ ...credentials, fullname: e.target.value })
              }
              required
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={credentials.confirmPassword}
              onChange={(e) =>
                setCredentials({ ...credentials, confirmPassword: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
        </form>
        <div className="alternative-action">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
