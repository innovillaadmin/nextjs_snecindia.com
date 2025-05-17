import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const OurRooms = () => {
  return (
    <div>
      <div className="container pt-5 pb-5">
        <div className="base-gradient rounded p-1"></div>
        <div className="text-center mt-4 pt-4" data-bs-wow-delay="0.1s">
          <h1 className="mb-3 bebas-neue-regular">EXPLORE COURSES</h1>
        </div>
        <div className="row ">
          <div className="col-lg-4 col-md-6 mt-4" data-bs-wow-delay="0.1s">
            <div className="room-item shadow rounded overflow-hidden">
              <div className="position-relative">
                <Image
                  className="img-fluid w-100"
                  src="/assets/img/computer-science.jpg"
                  alt="room-1"
                  width={150}
                  height={150}
                />
                <img />
                <small className="border border-dark shadow position-absolute start-0 top-100 translate-middle-y base-gradient text-dark text-dark rounded py-1 px-3 ms-4">
                  Department of Computer Science
                </small>
              </div>
              <div className="p-4 mt-2">
                <p className="text-body mb-3">
                  Offers essential training in programming, software, and modern
                  tech to prepare students for careers in the IT industry.
                </p>
                <div className="">
                  <Link href="/courses">
                    <button
                      type="button"
                      className="btn base-gradient border border-dark"
                    >
                      View Courses
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-4" data-bs-wow-delay="0.1s">
            <div className="room-item shadow rounded overflow-hidden">
              <div className="position-relative">
                <Image
                  className="img-fluid w-100"
                  src="/assets/img/paramedical.jpg"
                  alt="room-2"
                  width={150}
                  height={150}
                />
                <img />
                <small className="border border-dark shadow position-absolute start-0 top-100 translate-middle-y base-gradient text-dark text-dark rounded py-1 px-3 ms-4">
                  Department of Paramedical Science
                </small>
              </div>
              <div className="p-4 mt-2">
                <p className="text-body mb-3">
                  Equips students with practical skills for supporting medical
                  teams in diagnostics and patient care.
                </p>
                <div>
                  <Link href="/courses">
                    <button
                      type="button"
                      className="btn base-gradient border border-dark"
                    >
                      View Courses
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-4" data-bs-wow-delay="0.1s">
            <div className="room-item shadow rounded overflow-hidden">
              <div className="position-relative">
                <Image
                  className="img-fluid w-100"
                  src="/assets/img/nursing-2.jpg"
                  alt="room-3"
                  width={200}
                  height={200}
                />
                <img />
                <small className="border border-dark shadow position-absolute start-0 top-100 translate-middle-y base-gradient text-dark text-dark rounded py-1 px-3 ms-4">
                  Department of Nursing
                </small>
              </div>
              <div className="p-4 mt-2">
                <p className="text-body mb-3">
                  Prepares students for professional nursing roles through
                  hands-on clinical and theoretical training.
                </p>
                <div>
                  <Link href="/courses">
                    <button
                      type="button"
                      className="btn base-gradient border border-dark"
                    >
                      View Courses
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurRooms;
