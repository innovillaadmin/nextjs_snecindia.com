import React from "react";
import Hero from "./Hero";
import FooterPublic from "@/app/component/FooterPublic";
import Newsletter from "../home/Newsletter";

const page = () => {
  return (
    <div>
      <Hero />
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col text-center">
            <h1 className="display-5 fw-bold">About SSNEC</h1>
            <p className="lead text-muted">
              SS National Educational Council – Committed to Quality Education
              and Skill Development
            </p>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-7">
            <h2 className="h4 fw-semibold">Our Vision</h2>
            <p>
              To be a leading educational council delivering skill-based,
              job-oriented training programs that empower youth, promote
              self-reliance, and support national development.
            </p>

            <h2 className="h4 fw-semibold mt-4">Our Mission</h2>
            <ul className="list-unstyled">
              <li>
                ✔️ Provide accessible and affordable vocational education.
              </li>
              <li>
                ✔️ Encourage hands-on learning through practical exposure.
              </li>
              <li>
                ✔️ Bridge the gap between academic knowledge and real-world
                skills.
              </li>
              <li>
                ✔️ Uplift underprivileged communities through education and
                training.
              </li>
            </ul>
            <h2 className="h4 fw-semibold">Our Commitment</h2>
            <p>
              We are dedicated to creating inclusive learning opportunities that
              cater to diverse backgrounds and learning needs. By collaborating
              with industry partners, government bodies, and community
              organizations, we aim to ensure our programs remain relevant,
              impactful, and scalable. Through continuous innovation and quality
              assurance, we strive to build a skilled workforce that contributes
              meaningfully to society and drives sustainable national growth.
            </p>
          </div>
          <div className="col-md-5">
            <img
              src="/assets/img/sslogo.png"
              alt="SSNEC Vision"
              className="img-fluid"
            />
          </div>
        </div>

        <div className="row mb-5">
          <div className="col text-center">
            <h2 className="h4 fw-semibold mb-3">Our Impact</h2>
            <p className="mb-4">
              Since its inception, SSNEC has trained thousands of students
              across rural and urban areas, helping them build careers in
              healthcare, technology, and animal sciences. Our certified
              programs open doors to both employment and entrepreneurship.
            </p>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="border rounded py-4 px-3 shadow-sm h-100">
              <h5 className="fw-bold">10,000+ Students Trained</h5>
              <p className="text-muted">
                Across computer, nursing, paramedical, and veterinary
                disciplines.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="border rounded py-4 px-3 shadow-sm h-100">
              <h5 className="fw-bold">Statewide Reach</h5>
              <p className="text-muted">
                Programs conducted in multiple districts and remote locations.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="border rounded py-4 px-3 shadow-sm h-100">
              <h5 className="fw-bold">100+ Certified Trainers</h5>
              <p className="text-muted">
                Qualified professionals guiding students through each course.
              </p>
            </div>
          </div>
        </div>

        <div className="row mt-5 text-center">
          <div className="col">
            <h2 className="h4 fw-semibold mb-3">Why Choose SSNEC?</h2>
            <p className="mb-4">
              Government-recognized programs, industry-relevant curriculum, and
              a strong placement support system.
            </p>
            <a href="#" className="btn base-gradient px-4">
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <Newsletter />
      <FooterPublic />
    </div>
  );
};

export default page;
