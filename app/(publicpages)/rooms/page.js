import React from "react";
import FooterPublic from "@/app/component/FooterPublic";
import Newsletter from "../home/Newsletter";
import Hero from "./Hero";
import RoomSlider1 from "./components/RoomSlider1";
import RoomSlider2 from "./components/RoomSlider3";
import RoomSlider3 from "./components/RoomSlider2";
import RoomSlider4 from "./components/RoomSlider4";
import RoomSlider5 from "./components/RoomSlider5";

const page = () => {
  return (
    <>
      <Hero />
      <RoomSlider1 />
      <RoomSlider2 />
      <RoomSlider3 />
      <RoomSlider4 />
      <RoomSlider5 />
      <Newsletter />
      <FooterPublic />
    </>
  );
};

export default page;
