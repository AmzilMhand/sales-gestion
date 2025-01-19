import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdPerson, MdLock } from "react-icons/md";
import { updateUser } from "../../services/api";
import "./Settings.css";

const Settings = () => {
  const dispatch = useDispatch();
  const { role, user } = useSelector((state) => state.auth); // Ensure 'user' is coming from the Redux store
  const [activeTab, setActiveTab] = useState("profile");
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [profileData, setProfileData] = useState({ fullName: "", email: "" });

  useEffect(() => {
    if (user) {
      console.log("User data loaded:", user);
      setProfileData({
        fullName: user.fullname || "", 
        email: user.email || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileChange = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser(user.id, profileData));
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage("Failed to update profile");
      console.error("Error updating user: ", error);
    }
  };

  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings-container">
        <div className="settings-sidebar">
          <button
            className={`settings-tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => handleTabChange("profile")}
          >
            <MdPerson /> Profile
          </button>
          <button
            className={`settings-tab ${activeTab === "security" ? "active" : ""}`}
            onClick={() => handleTabChange("security")}
          >
            <MdLock /> Security
          </button>
        </div>
        <div className="settings-content">
          {activeTab === "profile" && (
            <div className="settings-section">
              <h2>Profile Settings</h2>
              <form className="settings-form" onSubmit={handleProfileChange}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input type="text" value={role} disabled />
                </div>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </form>
              {message && <p className="message">{message}</p>}
            </div>
          )}

          {activeTab === "security" && (
            <div className="settings-section">
              <h2>Change Password</h2>
              <form className="settings-form">
                <div className="form-group">
                  <label>Old Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="save-btn">
                  Change Password
                </button>
              </form>
              {message && <p className="message">{message}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
