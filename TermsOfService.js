import React from 'react';
import './TermsOfService.css';

function TermsOfService() {
  return (
    <div className="terms-container">
      <h1>Terms of Service</h1>
      <div className="long-underline"></div>
      <div className="terms-content">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using our donation website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

        <h2>2. User Responsibilities</h2>
        <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.</p>

        <h2>3. Product Donations</h2>
        <p>By donating products on our website, you represent and warrant that you have the legal right to donate the products and that the products are in good condition and usable by others.</p>

        <h2>4. Prohibited Conduct</h2>
        <p>You agree not to use our website to:</p>
        <ul>
          <li>Violate any applicable laws or regulations.</li>
          <li>Upload, post, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
          <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>The content on our website, including text, graphics, logos, images, and software, is the property of our company and is protected by intellectual property laws.</p>

        <h2>6. Termination</h2>
        <p>We reserve the right to terminate your access to our website at any time, without notice, for any reason, including, but not limited to, breach of these Terms of Service.</p>
      </div>
    </div>
  );
}

export default TermsOfService;