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
            <h1 class="display-5 fw-bold">Skill India Course</h1>
            <p class="lead text-muted">
              Empowering Youth Through Industry-Focused Skill Development
            </p>
          </div>
        </div>

        <div class="row align-items-center mb-5">
          <div class="col-md-6">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Skill India Training"
              class="img-fluid rounded shadow-sm"
            />
          </div>
          <div class="col-md-6">
            <h2 class="h4 fw-semibold">Course Overview</h2>
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

        <div class="row mb-5">
          <div class="col">
            <h3 class="h5 fw-bold mb-3">Program Highlights</h3>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                ✔️ Government-recognized skill certification
              </li>
              <li class="list-group-item">
                ✔️ Hands-on training with industry tools and techniques
              </li>
              <li class="list-group-item">
                ✔️ Sector-specific skill modules (IT, Health, Retail, Auto,
                etc.)
              </li>
              <li class="list-group-item">
                ✔️ Placement support and entrepreneurship guidance
              </li>
              <li class="list-group-item">
                ✔️ Special focus on rural and underprivileged youth
              </li>
            </ul>
          </div>
        </div>

        <div class="row text-center">
          <div class="col">
            <a href="#" class="btn btn-warning text-dark px-4">
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
