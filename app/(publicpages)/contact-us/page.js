import React from "react";
import FooterPublic from "@/app/component/FooterPublic";
import Newsletter from "../home/Newsletter";
import Hero from "./Hero";
import ContactForm from "./ContactForm";

const page = () => {
  return (
    <>
      <Hero />
      <ContactForm />
      <Newsletter />
      <FooterPublic />
    </>
  );
};

export default page;
