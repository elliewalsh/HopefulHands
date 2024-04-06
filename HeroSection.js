import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

// function HeroSection() {
//   return (
//     <div className='hero-container'>
//       <video src="/videos/video-4.mp4" autoPlay loop muted />
//       <h1>Welcome to Hopeful Hands</h1>
//       <p>Parenting can be overwhelming, especially when uncertainty looms over necessities like nappies, clothes, or a secure sleeping space for your baby.
//       In the aftermath of the Covid-19 pandemic, a growing number of parents are struggling to afford essential supplies. That’s where we come in.
//       Hopeful Hands collects and distributes both used and new donations of clothing, toiletries, toys, and baby equipment. These contributions aim to help struggling families with children aged 16 years and under.
//       </p>
//       <div className="hero-btns">
//         <Button className='btns' buttonStyle='btn--outline'
//         buttonSize='btn--large'>HELP TODAY
//         </Button>
      
//       </div>
//     </div>
//   )
// }

function HeroSection() {
  return (
    <div className='hero-container'>
      <video className='video' src="/videos/video-4.mp4" autoPlay loop muted />
      <div className="overlay"></div>
      <div className="hero-content">
        <h1>Welcome to Hopeful Hands</h1>
        <p>Parenting can be overwhelming, especially when uncertainty looms over necessities like nappies, clothes, or a secure sleeping space for your baby. In the aftermath of the Covid-19 pandemic, a growing number of parents are struggling to afford essential supplies. That’s where we come in. Hopeful Hands collects and distributes both used and new donations of clothing, toiletries, toys, and baby equipment. These contributions aim to help struggling families with children aged 16 years and under.</p>
        <div className="hero-btns">
          <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
            HELP TODAY
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
