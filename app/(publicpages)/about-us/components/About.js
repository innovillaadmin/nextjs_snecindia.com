// pages/about.js
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div>
      <div class="container py-5">
        <div class="row mb-4">
          <div class="col text-center">
            <h1 class="display-5 fw-bold">About Us</h1>
            <p class="lead text-muted">
              Empowering Students for a Better Tomorrow
            </p>
          </div>
        </div>

        <div class="row mb-5">
          <div class="col-md-6">
            <img
              src="https://via.placeholder.com/600x400"
              alt="SS National Educational Council"
              class="img-fluid rounded shadow-sm"
            />
          </div>
          <div class="col-md-6">
            <h2 class="h4 fw-semibold">Who We Are</h2>
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

        <div class="row mb-5">
          <div class="col">
            <h2 class="h4 fw-semibold text-center mb-4">Our Courses</h2>
            <div class="row text-center">
              <div class="col-md-3 mb-4">
                <div class="card h-100 shadow-sm">
                  <div class="card-body">
                    <h5 class="card-title">Computer Courses</h5>
                    <p class="card-text">
                      Learn essential computer skills, software development, and
                      IT fundamentals for the modern workforce.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-3 mb-4">
                <div class="card h-100 shadow-sm">
                  <div class="card-body">
                    <h5 class="card-title">Nursing Courses</h5>
                    <p class="card-text">
                      Build a compassionate healthcare career with hands-on
                      training and theoretical knowledge in nursing.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-3 mb-4">
                <div class="card h-100 shadow-sm">
                  <div class="card-body">
                    <h5 class="card-title">Paramedical Courses</h5>
                    <p class="card-text">
                      Explore diverse paramedical disciplines and gain practical
                      skills for emergency and diagnostic services.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-3 mb-4">
                <div class="card h-100 shadow-sm">
                  <div class="card-body">
                    <h5 class="card-title">Veterinary Science</h5>
                    <p class="card-text">
                      Delve into animal health and veterinary practices,
                      preparing for a career in animal care and science.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row text-center">
          <div class="col">
            <h2 class="h4 fw-semibold mb-3">Join Us</h2>
            <p class="mb-4">
              Become part of a growing community focused on excellence in
              education and career development. Your future starts here.
            </p>
            <a href="#" class="btn base-gradient px-4">
              Explore Courses
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
