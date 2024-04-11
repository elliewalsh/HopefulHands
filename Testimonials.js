import React from 'react';
import './Testimonials.css';

function Testimonials() {
  return (
    <div className="testimonials-container">
      <h1>What Our Users Say</h1>
      <div className="long-underline"></div>
      <div className="testimonial">
        <p>"I had a great experience donating my old furniture through this website. It was easy to list my items, and I'm glad they found a new home where they'll be appreciated."</p>
        <div className="rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
        <p className="author">- Sarah T.</p>
      </div>
      <div className="testimonial">
        <p>"As a single mother, I've found incredible support from this community. I've received essential items for my children, and it has made a significant difference in our lives. Thank you!"</p>
        <div className="rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
        <p className="author">- Maria R.</p>
      </div>
      <div className="testimonial">
        <p>"I love the concept of this donation platform. It's a win-win situation – I can declutter my space and help someone in need at the same time. The process is straightforward, and the community is fantastic."</p>
        <div className="rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="far fa-star"></i>
        </div>
        <p className="author">- John D.</p>
      </div>
      <div className="testimonial">
        <p>"I recently moved to a new city and didn't have much furniture. Through this website, I found a beautiful couch and dining table donated by kind individuals. It has made my new place feel like home."</p>
        <div className="rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="far fa-star"></i>
        </div>
        <p className="author">- Emily L.</p>
      </div>
      <div className="testimonial">
        <p>"The donation website has been a lifesaver for our family. We've received clothes, toys, and books for our kids, which has helped us save money during tough times. We're grateful for the generosity of the donators."</p>
        <div className="rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
        <p className="author">- Mark and Lisa P.</p>
      </div>
    </div>
  );
}

export default Testimonials;