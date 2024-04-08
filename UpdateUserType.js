import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

function UpdateUserType() {
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5321/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserType(response.data.userType);
      } catch (err) {
        console.error('Error fetching user type:', err);
        setError('Failed to fetch user type. Please try again later.');
      }
    };
    fetchUserType();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5321/api/users/${userId}/userType`,
        { userType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      history.push('/manage-users');
    } catch (err) {
      console.error('Error updating user type:', err);
      setError('Failed to update user type. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Update User Type</div>
        <div className="underline"></div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            {error && <p className="error-message">{error}</p>}
            <div className="input">
              <label htmlFor="">User Type:</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="form-control"
              >
                <option value="">Select User Type</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="submit-container">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserType;