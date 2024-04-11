import React, { useState } from "react";
import "./FAQs.css";

function FAQs() {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="faqs-container">
      <h1>FAQs</h1>
      <div className="underline"></div>
      <div className={`faq ${activeFAQ === 0 ? "active" : ""}`}>
        <h3 onClick={() => toggleFAQ(0)}>
          Q: How do I create an account?
          <i className="fa-solid fa-chevron-down"></i>
        </h3>
        <p>
          A: To create an account, click on the "Sign Up" button and fill in the required information, including your name, email address, and password. Once submitted, you'll receive a confirmation email to verify your account.
        </p>
      </div>
      <div className={`faq ${activeFAQ === 1 ? "active" : ""}`}>
        <h3 onClick={() => toggleFAQ(1)}>
          Q: Is it free to donate products?
          <i className="fa-solid fa-chevron-down"></i>
        </h3>
        <p>
          A: Yes, donating products on our website is completely free. We don't charge any fees for donating or receiving products.
        </p>
      </div>
      <div className={`faq ${activeFAQ === 2 ? "active" : ""}`}>
        <h3 onClick={() => toggleFAQ(2)}>
          Q: Can I donate any type of product?
          <i className="fa-solid fa-chevron-down"></i>
        </h3>
        <p>
          A: We accept a wide range of products, including clothing, furniture, electronics, books, and more. However, please ensure that the products are in good condition and usable by others.
        </p>
      </div>
      <div className={`faq ${activeFAQ === 3 ? "active" : ""}`}>
        <h3 onClick={() => toggleFAQ(3)}>
          Q: How do I contact a donator?
          <i className="fa-solid fa-chevron-down"></i>
        </h3>
        <p>
          A: To contact a donator, navigate to the product page and click on the "Message" button. This will open a messaging interface where you can communicate with the donator directly.
        </p>
      </div>
      <div className={`faq ${activeFAQ === 4 ? "active" : ""}`}>
        <h3 onClick={() => toggleFAQ(4)}>
          Q: Are the products on the website new or used?
          <i className="fa-solid fa-chevron-down"></i>
        </h3>
        <p>
          A: The products on our website are primarily used items donated by individuals. However, the condition of each product is mentioned in the product description.
        </p>
      </div>
      <div className={`faq ${activeFAQ === 5 ? "active" : ""}`}>
        <h3 onClick={() => toggleFAQ(5)}>
          Q: How do I arrange the pickup or delivery of a product?
          <i className="fa-solid fa-chevron-down"></i>
        </h3>
        <p>
          A: The pickup or delivery arrangement is discussed and agreed upon between the donator and the recipient. We recommend using secure and mutually convenient methods for the product transfer.
        </p>
      </div>
      <div className={`faq ${activeFAQ === 6 ? "active" : ""}`}>
        <h3 onClick={() => toggleFAQ(6)}>
          Q: What if I have an issue with a received product?
          <i className="fa-solid fa-chevron-down"></i>
        </h3>
        <p>
          A: If you encounter any issues with a received product, we recommend first contacting the donator to discuss and resolve the matter. If the issue persists, please contact our support team for assistance.
        </p>
      </div>
    </div>
  );
}

export default FAQs;