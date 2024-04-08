import React from 'react';
import axios from 'axios';

const DeleteDonation = ({ productId, onDelete }) => {
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
      
        if (confirmDelete) {
          try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5321/api/products/${productId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            onDelete(productId); // Call onDelete with productId after successful deletion
          } catch (err) {
            console.error('Error deleting product:', err);
            // Handle error (e.g., show an error message)
          }
        }
      };

  return <button className="btn btn-danger" onClick={handleDelete}>Delete</button>;
};

export default DeleteDonation;
