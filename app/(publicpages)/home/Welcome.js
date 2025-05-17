import Image from "next/image";
import Link from "next/link";
import React from "react";

const Welcome = () => {
  return (
    <div>
      <div className="w-100 py-2">
        <div className="container">
          <div className="row g-5 m-0 align-items-center">
            <div className="col-lg-6">
              <h1
                className="mb-4 text-dark text-uppercase bebas-neue-regular text-justify"
                style={{ fontSize: 30 }}
              >
                Empower Your Future with India's Leading Institute for Certified
                Courses
              </h1>
              <p className="mb-4 text-justify">
                Immerse yourself in quality education and skill development at
                Varanasi’s leading institute, where certified courses and expert
                guidance pave the way for a successful future.
              </p>
              <div className="row g-3 pb-4">
                <div className="col-sm-4" data-bs-wow-delay="0.1s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center py-4 px-1">
                      <i className="fa fa-hotel fa-2x text-primary mb-2"></i>
                      <h2
                        className="m-0 mb-1 fs-3 text-center"
                        data-toggle="counter-up"
                      >
                        KVP
                      </h2>
                      <p className="mb-0">Know More</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4" data-bs-wow-delay="0.3s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center py-4 px-1">
                      <i className="fa fa-users-cog fa-2x text-primary mb-2"></i>
                      <h2
                        className="m-0 mb-1 fs-3 text-center"
                        data-toggle="counter-up"
                      >
                        PMKVY
                      </h2>
                      <p className="mb-0">Know More</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4" data-bs-wow-delay="0.5s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center  py-4 px-1">
                      <i className="fa fa-users fa-2x text-primary mb-2"></i>
                      <h2
                        className="m-0 mb-1 fs-3 text-center"
                        data-toggle="counter-up"
                      >
                        Skill India
                      </h2>
                      <p className="mb-0">Know More</p>
                    </div>
                  </div>
                </div>
              </div>
              <Link href={"/rooms"}>
                <button
                  type="submit"
                  className="btn base-gradient text-dark fs-4 rounded-pill px-4 border-dark border-2"
                >
                  Explore All
                </button>
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-end">
                  <Image
                    className="img-fluid rounded w-75 border"
                    src="/assets/img/nursing.jpg"
                    style={{ marginTop: "25%" }}
                    width={150}
                    height={150}
                  />
                </div>
                <div className="col-6 text-start ">
                  <Image
                    className="img-fluid rounded w-100 h-100 object-fit-cover border"
                    src="/assets/img/pmkvy.jpg"
                    width={150}
                    height={150}
                  />
                </div>
                <div className="col-6 text-end ">
                  <Image
                    className="img-fluid rounded w-50 border"
                    src="/assets/img/computer.png"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="col-6 text-start">
                  <Image
                    className="img-fluid rounded w-75 border"
                    src="/assets/img/skillindia.jpg"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
