"use client";
import React from "react";
import HomePageSlider from "./(publicpages)/home/HomePageSlider";
import Welcome from "./(publicpages)/home/Welcome";
import OurRooms from "./(publicpages)/home/OurRooms";
import OurServices from "./(publicpages)/home/OurServices";
import Newsletter from "./(publicpages)/home/Newsletter";
import FooterPublic from "./component/FooterPublic";
import Hero from "./(publicpages)/home/Hero";

const Home = () => {
  return (
    <div className="mh-90">
      <Hero />
      <Welcome />
      <OurRooms />
      <HomePageSlider />
      <OurServices />
      <Newsletter />
      <FooterPublic />
    </div>
  );
};

export default Home;
