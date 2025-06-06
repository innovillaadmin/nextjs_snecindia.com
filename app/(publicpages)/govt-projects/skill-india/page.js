import React from "react";
import Hero from "../Hero";
import FooterPublic from "@/app/component/FooterPublic";
import Newsletter from "../../home/Newsletter";

const page = () => {
  return (
    <div>
      <Hero />
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col text-center">
            <h1 className="display-5 fw-bold">Skill India Course</h1>
            <p className="lead text-muted">
              Empowering Youth Through Industry-Focused Skill Development
            </p>
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Skill India Training"
              className="img-fluid rounded shadow-sm"
            />
          </div>
          <div className="col-md-6">
            <h2 className="h4 fw-semibold">Course Overview</h2>
            <p>
              The Skill India program, a major initiative under the Ministry of
              Skill Development and Entrepreneurship (MSDE), aims to train over
              40 crore people in various skills by 2025. SSNEC is a proud
              contributor to this mission, offering certified training programs
              that match current industry requirements.
            </p>
            <p>
              These programs are designed to boost employment opportunities,
              enhance productivity, and build a competent workforce for India's
              growing economy.
            </p>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col">
            <h3 className="h5 fw-bold mb-3">Program Highlights</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                ✔️ Government-recognized skill certification
              </li>
              <li className="list-group-item">
                ✔️ Hands-on training with industry tools and techniques
              </li>
              <li className="list-group-item">
                ✔️ Sector-specific skill modules (IT, Health, Retail, Auto,
                etc.)
              </li>
              <li className="list-group-item">
                ✔️ Placement support and entrepreneurship guidance
              </li>
              <li className="list-group-item">
                ✔️ Special focus on rural and underprivileged youth
              </li>
            </ul>
          </div>
        </div>

        <div className="row text-center">
          <div className="col">
            <a href="#" className="btn btn-warning text-dark px-4">
              Join Skill India Program
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
