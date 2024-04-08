import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import './Donation.css';
import useUser from "../../hooks/useUser"; // Import the useUser hook

function CreateDonation() {
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [error, setError] = useState("");
  const history = useHistory();
  const userData = useUser(); // Use the useUser hook to get user data

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = window.localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing. Redirecting to login page.");
      window.location.href = "/login";
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("product", product);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("productImages", image);
      formData.append("donatedByContact", userData.email); // Add this line
      formData.append("donatedByName", userData.fname + " " + userData.lname);
  
      const response = await axios.post(
        "http://localhost:5321/createProduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Created Product:", response.data);
      history.push("/productdisplay");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="containerSmall">
      <div className="header">
        {isLoggedIn ? (
          <>
            <div className="text"> Donate </div>
            <div className="underline"></div>
            <form onSubmit={handleSubmit}>
              <div className="inputs">
                <h2>Add Product</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="input">
                  <label htmlFor="">Product:</label>
                  <input
                    type="text"
                    placeholder="Enter Product"
                    className="form-control"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                  />
                </div>
                <div className="input">
                  <label htmlFor="">Description:</label>
                  <input
                    type="text"
                    placeholder="Enter Description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="input">
                  <label htmlFor="">Category:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control"
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
                <div className="input">
                  <label htmlFor="">Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="submit-container">
                  <button type="submit" className="btn btn-primary">
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div>
            <p>
              You are not logged in. Please log in <Link to="/login">here</Link>
            </p>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default CreateDonation;
