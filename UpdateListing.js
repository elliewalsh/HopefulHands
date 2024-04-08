import React, { useState } from "react";
import axios from "axios";

const UpdateListing = ({ listing, onUpdateSuccess }) => {
  const [product, setProduct] = useState(listing.product);
  const [description, setDescription] = useState(listing.description);
  const [category, setCategory] = useState(listing.category);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("product", product);
      formData.append("description", description);
      formData.append("category", category);
      if (image) {
        formData.append("productImage", image);
      }

      await axios.put(`http://localhost:5321/api/listings/${listing._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onUpdateSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="update-form">
      <div className="update-field">
        <label htmlFor="product">Product Name:</label>
        <input
          type="text"
          id="product"
          placeholder="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
      </div>
      <div className="update-field">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="update-field">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Baby Clothing">Baby Clothing</option>
          <option value="Feeding and Nursing">Feeding and Nursing</option>
          <option value="Nappies and Changing">Nappies and Changing</option>
          <option value="Baby Equipment">Baby Equipment</option>
          <option value="Nursery Furniture and Decor">Nursery Furniture and Decor</option>
          <option value="Health and Safety">Health and Safety</option>
          <option value="Toys">Toys</option>
          <option value="Bathing and Skincare">Bathing and Skincare</option>
        </select>
      </div>
      <div className="update-field">
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button type="submit" className="button">Update</button>
    </form>
  );
};

export default UpdateListing;
