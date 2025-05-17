import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

const BookARoomCta = () => {
  return (
    <div>
      <div className="pt-3 pb-0">
        <div className="container base-gradient rounded p-1"></div>
        <div className="row g-0 m-0 mt-5">
          <div className="mt-2 col-md-6 bg-dark d-flex align-items-center">
            <div className="p-5">
              <h6 className="section-title text-start text-white text-uppercase mb-3">
                Luxury Living
              </h6>
              <h1 className="text-white mb-4">
                Discover A Brand Luxurious home stay
              </h1>
              <p className="text-white mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <a
                href=""
                className="btn base-gradient text-white py-md-3 px-md-5 me-3"
              >
                Our Rooms
              </a>
              <a href="" className="btn btn-light py-md-3 px-md-5">
                Book A Room
              </a>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </div>
  );
};

export default BookARoomCta;
