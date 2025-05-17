import { SITENAME } from "@/app/config";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div>
      <div
        className="w-100"
        style={{
          backgroundImage: "url(/assets/img/background/bg-4.webp)",
          backgroundAttachment: "fixed",
          backgroundPosition: "bottom center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          color: "#fff",
        }}
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(310deg, rgba(255, 165, 0, 0.8), rgba(255, 200, 0, 0.5))",
          }}
          className="py-5 "
        >
          <div className="container text-center">
            <div className="row align-items-center">
              <div className="col-md-4 text-md-left text-center mb-4 mb-md-0">
                <Image
                  src={"/assets/img/sslogo.png"}
                  width={400}
                  height={400}
                  className="img-fluid w-50 rounded-circle border border-white border-2 shadow-lg"
                  alt="Ganesha"
                  style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
                />
              </div>
              <div className="col-md-8">
                <h1
                  className={
                    "bebas-neue-regular hero-text-5 font-weight-bold p-0 m-0"
                  }
                >
                  {SITENAME}
                </h1>
                <h2 className=" bebas-neue-regular p-0 m-0 font-weight-bold  hero-text-3  text_border">
                  Image Showcase
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
