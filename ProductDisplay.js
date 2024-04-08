import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import "./ProductDisplay.css";

function ProductDisplay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5321/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on category if provided
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  // Filter products based on search query
  const filteredProductsSearch = filteredProducts.filter((product) =>
    product.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMessageClick = (event) => {
    event.stopPropagation();
    history.push("/chatbox");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text"> Products </div>
        <div className="underline"></div>
        <div className="searchContainer">
          <input
            type="search"
            placeholder="Search for Product"
            className="searchbarforproducts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className="product-grid">
        {filteredProductsSearch.map((product) => (
          <Link
            key={product._id}
            to={`/productinfo/${product._id}`}
            className={`product-card ${product.isDonated ? "donated" : ""}`}
          >
            <div className="product-image">
              {product.imageUrls && product.imageUrls.map((imageUrl, index) => (
                <img
                  key={index}
                  src={`http://localhost:3000/${imageUrl}`}
                  alt={product.product}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              ))}
            </div>
            <div className="product-details">
              <h3>{product.product}</h3>
              <p>{product.description}</p>
              <p>{product.category}</p>
              <div className="product-actions">
                <button onClick={handleMessageClick} className="button button-update">
                  Message Donator
                </button>
              </div>
            </div>
            {product.isDonated && (
              <div className="blur-cover">
                <span>Donated</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductDisplay;
