import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  // updates
  return (
    <div className="hero-section pt-5 pt-md-2 d-flex flex-column justify-content-center">
      <section className="d-flex align-items-center justify-content-center">
        <video autoPlay loop muted className="custom-video">
          <source src="/assets/vid/vid-3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="container text-center">
            <div className="row align-items-center">
              <div className="col-md-6 text-md-left text-center mb-4 mb-md-0">
                <Image
                  src={"/assets/img/sslogo.png"}
                  width={400}
                  height={400}
                  className="img-fluid rounded-circle border border-white border-2 shadow-lg"
                  alt="SnecIndiaLogo"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                    aspectRatio: "1/1",
                  }}
                />
              </div>
              <div className="col-md-6">
                {/* <h1
                  className={
                    "bebas-neue-regular hero-text-1 font-weight-bold p-0 m-0"
                  }
                ></h1> */}
                <h2 className=" bebas-neue-regular p-0 m-0 font-weight-bold  hero-text-2  text_border">
                  S. S. N. E. C.
                </h2>
                <h3 className=" bebas-neue-regular p-0 m-0  hero-text-4 mt-2">
                  S.S. National
                </h3>
                <h3 className=" bebas-neue-regular p-0 m-0  hero-text-4 mt-2">
                  Educational Council
                </h3>
                {/* <h4 className="bebas-neue-regular p-0 m-0  hero-text-4">
                  Varanasi-India
                </h4> */}

                <div className="d-flex flex-column justify-content-center">
                  {/* <div>
                    <a
                      href={"tel://" + CONTACT_NUMBER}
                      className="btn base-gradient  text-dark rounded-pill border border-dark border-3  mt-3"
                    >
                      Click to Call
                    </a>
                  </div> */}
                  <div className="">
                    <Link
                      href={"/rooms"}
                      className="btn base-gradient text-dark rounded-pill border border-dark border-3  mt-3"
                    >
                      Register Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
