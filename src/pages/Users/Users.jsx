import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { getUsers, addUser, updateUser, deleteUser } from "../../services/api";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    fullname: "",  // Update from 'username' to 'fullname'
    email: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Ensure to update the user correctly
        await updateUser(editingUser.id, newUser);
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? { ...user, ...newUser } : user
          )
        );
      } else {
        const addedUser = await addUser(newUser);
        setUsers([...users, addedUser]);
      }
      setIsModalOpen(false);
      setNewUser({ fullname: "", email: "", role: "" }); // Reset user fields
      setEditingUser(null); // Reset editingUser
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUser({ ...user }); // Populate form with user data
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>Users Management</h1>
        <button className="add-user-btn" onClick={() => setIsModalOpen(true)}>
          <MdAdd /> Add New User
        </button>
      </div>
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.fullname}</td> {/* Use fullname instead of username */}
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(user)}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label> {/* Update 'name' to 'fullname' */}
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={newUser.fullname} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  {editingUser ? "Update User" : "Add User"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingUser(null);
                    setNewUser({ fullname: "", email: "", role: "" });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
