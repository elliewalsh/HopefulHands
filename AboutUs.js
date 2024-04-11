import React from 'react';
import './AboutUs.css';
// import missionLogo from '../images/mission-logo.png';
// import impactLogo from '../images/impact-logo.png';
// import communityLogo from '../images/community-logo.png';

function AboutUs() {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <div className="underline"></div>
      <div className="about-us-content">
        <p>
          We are a dedicated team passionate about making a difference in our community through our donation website. Our mission is to connect individuals who have items they no longer need with those who can benefit from them the most.
        </p>
        <p>
          Founded in 2024, our platform has grown to support a wide network of donors and recipients, fostering a sense of community and promoting sustainable living. We believe that by enabling the sharing of resources, we can reduce waste and ensure that valuable items find new homes where they can be appreciated and utilised.
        </p>
        <div className="section-container">
          <div className="section">
            {/* <div className="section-logo" />  */}
            <i className="fa-regular fa-handshake"></i>
            <h2>Our Mission</h2>
            {/* <i className="fa-regular fa-handshake"></i> */}
            <p>
              At Hopeful Hands, our mission is to combat child poverty in the UK by connecting generous donors with families in need. We believe that every child deserves access to essential items and resources necessary for their well-being and development. Through our donation platform, we strive to make a tangible difference in the lives of children affected by poverty.
            </p>
          </div>
          <div className="section">
            {/* <img src={communityLogo} alt="Community Logo" className="section-logo" /> */}
            <i class="fa-solid fa-people-group"></i>
            <h2>Our Community</h2>
            <p>
              At the heart of Hopeful Hands is a vibrant and compassionate community united by a shared commitment to supporting children in need. Our community is made up of donors who believe in the power of collective action to create positive change. We collaborate with the public, local youth clubs and community organisations to identify families in need and ensure that donated items reach those who need them the most.
            </p>
          </div>
          <div className="section">
            {/* <img src={impactLogo} alt="Impact Logo" className="section-logo" /> */}
            <i class="fa-solid fa-bullhorn"></i>
            <h2>Our Impact</h2>
            <p>
              Since our launch, Hopeful Hands has made a significant impact in the fight against child poverty in the UK. We have successfully matched thousands of donated items with grateful recipients, improving the lives of countless children across the country. Our impact goes beyond just providing material goods; we foster a sense of community and empowerment, connecting donors with families in need.
            </p>
          </div>
        </div>
        <p>
          Our dedicated team works tirelessly to ensure a seamless and rewarding experience for both donors and recipients. We are committed to building a strong and compassionate community that values generosity and sustainability.
        </p>
        <p>
          Join us in our mission to make a positive impact, one donation at a time. Together, we can create a brighter future for all.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;