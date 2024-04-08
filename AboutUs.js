import React from 'react';
import '../../App.css';
import './AboutUs.css';


export default function AboutUs() {
  return (
    <>
      <div className='aboutus-container'>
        <h1 className='aboutus-heading'>About Us</h1>
        <div className="underline"></div>
        <p className='aboutus-text'>
          Parenting can be overwhelming, especially when uncertainty looms over necessities like nappies, clothes, or a secure sleeping space for your baby. In the aftermath of the Covid-19 pandemic, a growing number of parents are struggling to afford essential supplies. That’s where we come in. Hopeful Hands collects and distributes both used and new donations of clothing, toiletries, toys, and baby equipment. These contributions aim to help struggling families with children aged 16 years and under.
        </p>
        <div className="image-container">
          <img src="img-3.jpg" alt="Hopeful Hands" className="aboutus-image" />
        </div>
      </div>
    </>
  );
}