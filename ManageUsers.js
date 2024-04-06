import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageUsers.css';
import DeleteUser from './DeleteUser';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5321/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user._id !== userId));
  };

  const handleUpdate = async (userId, userType) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5321/api/users/${userId}/userType`,
        { userType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh the user list after successful update
      const response = await axios.get('http://localhost:5321/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      console.error('Error updating user type:', err);
      setError('Failed to update user type. Please try again later.');
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text"> Manage Users </div>
        <div className="underline"></div>
        <div className="searchContainerAdmin">
          <input
            type="search"
            placeholder="Search for User"
            className="searchbarforproductsAdmin"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.fname} {user.lname}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.userType}
                    onChange={(e) => handleUpdate(user._id, e.target.value)}
                    className="form-control"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <DeleteUser userId={user._id} onDelete={handleDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;