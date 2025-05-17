import React from "react";
import FooterPublic from "@/app/component/FooterPublic";
import Newsletter from "../home/Newsletter";
import Hero from "./Hero";
import About from "./components/About";

const page = () => {
  return (
    <>
      <Hero />
      <About />
      <Newsletter />
      <FooterPublic />
    </>
  );
};

export default page;
