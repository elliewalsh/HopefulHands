import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Products.css';
import DeleteDonation from './DeleteDonation';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5321/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product._id !== productId));
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct(product.product);
    setUpdatedDescription(product.description);
    setUpdatedCategory(product.category);
  };

  const handleUpdateSubmit = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5321/api/donations/${productId}`,
        {
          product: updatedProduct,
          description: updatedDescription,
          category: updatedCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedProduct(null);
      setUpdatedProduct('');
      setUpdatedDescription('');
      setUpdatedCategory('');
      // Refresh the product list after successful update
      const response = await axios.get('http://localhost:5321/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product. Please try again later.');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.product.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="text">Manage Products</div>
        <div className="underline"></div>
        <div className="searchContainerAdmin">
          <input
            type="search"
            placeholder="Search for Product"
            className="searchbarforproductsAdmin"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  {selectedProduct && selectedProduct._id === product._id ? (
                    <input
                      type="text"
                      value={updatedProduct}
                      onChange={(e) => setUpdatedProduct(e.target.value)}
                    />
                  ) : (
                    product.product
                  )}
                </td>
                <td>
                  {selectedProduct && selectedProduct._id === product._id ? (
                    <input
                      type="text"
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td>
                  {selectedProduct && selectedProduct._id === product._id ? (
                    <select
                      value={updatedCategory}
                      onChange={(e) => setUpdatedCategory(e.target.value)}
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
                  ) : (
                    product.category
                  )}
                </td>
                <td>
                  {product.imageUrls && product.imageUrls.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={`http://localhost:3000/${imageUrl}`}
                      alt={product.product}
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  ))}
                </td>
                <td>
                  {selectedProduct && selectedProduct._id === product._id ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handleUpdateSubmit(product._id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => handleUpdateClick(product)}
                    >
                      Update
                    </button>
                  )}
                  <DeleteDonation productId={product._id} onDelete={handleDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;