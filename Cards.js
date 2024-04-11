import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out more below! </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-1.jpg'
              text='You can donate new essential hygiene items and pre-loved stuff here'
              label='DONATE'
              path='/create'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Find out more about the products available here'
              label='PRODUCTS'
              path='/productdisplay'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-8.jpg'
              text='Check out more about our mission'
              label='ABOUT US'
              path='/aboutus'
            />
            <CardItem
              src='images/img-6.jpg'
              text='Discover the services we provide'
              label='SERVICES'
              path='/services'
            />
            <CardItem
              src='images/img-5.jpg'
              text='Sign up today and get involved'
              label='SIGN UP'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;