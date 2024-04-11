import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory, Link } from 'react-router-dom';
import './ProductInfo.css'; // Import CSS file


function ProductInfo() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [donatorData, setDonatorData] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5321/products/${id}`);
                setProduct(response.data);
                setDonatorData({donatorId: response.data.donatedByContact});
            } catch (err) {
                setError('Failed to fetch product details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);


    const handleMessageClick = (event) => {
        event.stopPropagation();
        history.push({
          pathname: '/chatbox',
          state: {
            donatorId: product.donatedByContact,
          },
        });
      };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <div className="container">
            <h1>{product.product}</h1>
            <div className="product-info-container">
                <img src={`http://localhost:3000/${product?.imageUrls[0]}`} alt={product.product} className="product-info-image" />
                <div className="product-info-details">
                    <h2>Description:</h2>
                    <p>{product.description}</p>
                    <h2>Category:</h2>
                    <p>{product.category}</p>
                    <h2>Donated by:</h2>
                    <p>{product.donatedByName}</p>
                </div>
            </div>
            <div className="product-actions">
                <button className="button button-update">
                    <Link to = {{ pathname: '/chatbox', state: donatorData}}>Message Donator</Link>
                   
                </button>
            </div>
        </div>
    );
}

export default ProductInfo;
