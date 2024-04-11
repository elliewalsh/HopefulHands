import React from 'react';
import './HowItWorks.css';

function HowItWorks() {
  return (
    <div className="how-it-works-container">
      <h1>How Our Donation Website Works</h1>
      <div className="long-underline"></div>
      <p>Welcome to our donation website, where you can easily donate products to those in need and find products donated by others. Here's a step-by-step guide on how our platform works:</p>
      <ol>
        <li>
          <strong>Sign Up or Log In:</strong>
          <ul>
            <li>If you're a new user, click on the "Sign Up" button and fill in the required information, including your name, email address, and password.</li>
            <li>If you already have an account, click on the "Log In" button and enter your email address and password.</li>
          </ul>
        </li>
        <li>
          <strong>Donate Products:</strong>
          <ul>
            <li>Once logged in, click on the "Donate" button to start donating products.</li>
            <li>Fill in the product details, including the product name, description and choose a category.</li>
            <li>Upload a photo of the product to provide visual information to potential recipients.</li>
            <li>Click on the "Submit" button to complete the donation process.</li>
          </ul>
        </li>
        <li>
          <strong>Browse Available Products:</strong>
          <ul>
            <li>Navigate to the "Products" page to view all the products donated by our community.</li>
            <li>Use the search bar or filter options to find specific products based on your preferences.</li>
            <li>Click on a product to view more details, including the product description, photo, and the donator's information.</li>
          </ul>
        </li>
        <li>
          <strong>Contact Donators:</strong>
          <ul>
            <li>If you find a product you're interested in, click on the "Message" button to initiate a conversation with the donator.</li>
            <li>Discuss the product details, pickup or delivery options, and any other relevant information.</li>
            <li>Once you've reached an agreement, arrange the product transfer with the donator.</li>
          </ul>
        </li>
        <li>
          <strong>Leave Feedback:</strong>
          <ul>
            <li>After receiving a product, we encourage you to leave feedback or a testimonial about your experience.</li>
            <li>Your feedback helps us improve our platform and builds trust within our community.</li>
          </ul>
        </li>
      </ol>
      <p>Start making a difference today by donating products you no longer need or finding items that can benefit you. Together, we can create a positive impact and support those in need.</p>
    </div>
  );
}

export default HowItWorks;