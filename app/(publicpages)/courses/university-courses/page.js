import React from "react";
import Hero from "../Hero";
import FooterPublic from "@/app/component/FooterPublic";
import Newsletter from "../../home/Newsletter";

const page = () => {
  return (
    <div>
      <Hero />
      <div class="container py-5">
        <div class="row mb-4">
          <div class="col text-center">
            <h1 class="display-5 fw-bold">University Courses</h1>
            <p class="lead text-muted">
              Explore a Wide Range of Accredited University-Level Programs
            </p>
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="Bachelor of Science (B.Sc)"
              />
              <div class="card-body">
                <h5 class="card-title">Bachelor of Science (B.Sc)</h5>
                <p class="card-text">
                  A three-year undergraduate program offering specializations in
                  Physics, Chemistry, Mathematics, and Biology.
                </p>
                <a href="#" class="btn base-gradient btn-sm">
                  Learn More
                </a>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="Bachelor of Commerce (B.Com)"
              />
              <div class="card-body">
                <h5 class="card-title">Bachelor of Commerce (B.Com)</h5>
                <p class="card-text">
                  Designed for students interested in finance, accounting,
                  economics, and business management.
                </p>
                <a href="#" class="btn base-gradient btn-sm">
                  Learn More
                </a>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="Bachelor of Arts (B.A)"
              />
              <div class="card-body">
                <h5 class="card-title">Bachelor of Arts (B.A)</h5>
                <p class="card-text">
                  Offers a broad range of humanities subjects including History,
                  Literature, Political Science, and Sociology.
                </p>
                <a href="#" class="btn base-gradient btn-sm">
                  Learn More
                </a>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="Bachelor of Computer Applications (BCA)"
              />
              <div class="card-body">
                <h5 class="card-title">
                  Bachelor of Computer Applications (BCA)
                </h5>
                <p class="card-text">
                  An IT-focused program covering software development,
                  networking, databases, and programming languages.
                </p>
                <a href="#" class="btn base-gradient btn-sm">
                  Learn More
                </a>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="Bachelor of Business Administration (BBA)"
              />
              <div class="card-body">
                <h5 class="card-title">
                  Bachelor of Business Administration (BBA)
                </h5>
                <p class="card-text">
                  Focuses on management principles, organizational behavior,
                  marketing, and entrepreneurship.
                </p>
                <a href="#" class="btn base-gradient btn-sm">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
      <FooterPublic />
    </div>
  );
};

export default page;
