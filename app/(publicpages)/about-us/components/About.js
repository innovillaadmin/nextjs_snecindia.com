// pages/about.js
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div>
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col text-center">
            <h1 className="display-5 fw-bold">About Us</h1>
            <p className="lead text-muted">
              Empowering Students for a Better Tomorrow
            </p>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-6">
            <img
              src="https://via.placeholder.com/600x400"
              alt="SS National Educational Council"
              className="img-fluid rounded shadow-sm"
            />
          </div>
          <div className="col-md-6">
            <h2 className="h4 fw-semibold">Who We Are</h2>
            <p>
              SS National Educational Council is a pioneering institution
              dedicated to providing high-quality, career-oriented education to
              students across various fields. Our mission is to make skill-based
              learning accessible and affordable, enabling students to build a
              strong foundation for their future.
            </p>
            <p>
              We strive to nurture talent and foster innovation through a
              practical and industry-relevant curriculum. With experienced
              faculty and modern facilities, we ensure every student receives
              the knowledge and confidence they need to succeed.
            </p>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col">
            <h2 className="h4 fw-semibold text-center mb-4">Our Courses</h2>
            <div className="row text-center">
              <div className="col-md-3 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Computer Courses</h5>
                    <p className="card-text">
                      Learn essential computer skills, software development, and
                      IT fundamentals for the modern workforce.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Nursing Courses</h5>
                    <p className="card-text">
                      Build a compassionate healthcare career with hands-on
                      training and theoretical knowledge in nursing.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Paramedical Courses</h5>
                    <p className="card-text">
                      Explore diverse paramedical disciplines and gain practical
                      skills for emergency and diagnostic services.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Veterinary Science</h5>
                    <p className="card-text">
                      Delve into animal health and veterinary practices,
                      preparing for a career in animal care and science.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row text-center">
          <div className="col">
            <h2 className="h4 fw-semibold mb-3">Join Us</h2>
            <p className="mb-4">
              Become part of a growing community focused on excellence in
              education and career development. Your future starts here.
            </p>
            <a href="#" className="btn base-gradient px-4">
              Explore Courses
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
