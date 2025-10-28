import React from 'react'
import Slider from '../components/Slider/Slider'
import Facility from '../components/Static/Facility/Facility';
import ShortIntro from '../components/Static/ShortIntro/ShortIntro';
import WhyChoose from '../components/Static/WhyChoose/WhyChoose';
import ContactMessage from '../components/Static/ConatctMessage/ContactMessage';
import PatentReviews from '../components/Static/PatentReviews/PatentReviews';

const Home = () => {
  return (
    <>
    {/* Sliders */}
      <Slider/>
      {/* Facility */}
      <Facility/>
      {/* short hospital intro */}
      <ShortIntro/>
      {/* whu choose page */}
      <WhyChoose/>
      {/* testimonial */}
      <PatentReviews/>
      {/* contact */}
      <ContactMessage/>
    </>
     
  );
};


export default Home