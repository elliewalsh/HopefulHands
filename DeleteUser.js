import React from 'react';
import axios from 'axios';

const DeleteUser = ({ userId, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5321/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onDelete(userId);
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteUser;