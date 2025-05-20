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
            <h1 class="display-5 fw-bold">Department of Computer</h1>
            <p class="lead text-muted">
              Empowering the Digital Generation Through Practical IT Education
            </p>
          </div>
        </div>

        <div class="row mb-5">
          <div class="col">
            <p>
              The Department of Computer at SS National Educational Council
              offers a variety of IT and computer-related courses aimed at
              preparing students for careers in software development, data
              management, office applications, and emerging technologies. We
              combine theory with hands-on lab work to foster both foundational
              knowledge and real-world proficiency.
            </p>
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="DCA Course"
              />
              <div class="card-body">
                <h5 class="card-title">
                  Diploma in Computer Applications (DCA)
                </h5>
                <p class="card-text">
                  Covers office tools, internet basics, MS Office, email
                  communication, and basic computer operations.
                </p>
                <a href="#" class="btn base-gradient btn-sm">
                  View Details
                </a>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="ADCA Course"
              />
              <div class="card-body">
                <h5 class="card-title">
                  Advanced Diploma in Computer Applications (ADCA)
                </h5>
                <p class="card-text">
                  Includes programming (C, Java), Tally with GST, database
                  management, and web design concepts.
                </p>
                <a href="#" class="btn base-gradient btn-sm">
                  View Details
                </a>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="Web Design"
              />
              <div class="card-body">
                <h5 class="card-title">Certificate in Web Designing</h5>
                <p class="card-text">
                  Teaches HTML, CSS, JavaScript, and responsive design
                  principles for building modern websites.
                </p>
                <a href="#" class="btn base-gradient btn-sm">
                  View Details
                </a>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="Python Programming"
              />
              <div class="card-body">
                <h5 class="card-title">Python Programming Course</h5>
                <p class="card-text">
                  Covers basics to intermediate Python, including logic
                  building, functions, OOP, and real-life project work.
                </p>
                <a href="#" class="btn base-gradient btn-sm">
                  View Details
                </a>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="Data Entry Operator"
              />
              <div class="card-body">
                <h5 class="card-title">Certificate in Data Entry</h5>
                <p class="card-text">
                  Designed to develop speed and accuracy in handling office data
                  and using common digital tools.
                </p>
                <a href="#" class="btn base-gradient btn-sm">
                  View Details
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
