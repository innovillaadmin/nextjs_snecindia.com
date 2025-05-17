import React from "react";
import style from "./footer.module.css";
import { AiFillHeart } from "react-icons/ai";

import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const Footer = () => {
  return (
    <div className={[style.footer, "shadow p-1  text-center"].join(" ")}>
      Made with <AiFillHeart className="text-danger" /> by{" "}
      <a href="https://innovilla.in">Innovilla</a>
    </div>
  );
};

export default Footer;
