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
            <h1 class="display-5 fw-bold">Department of Paramedical</h1>
            <p class="lead text-muted">
              Preparing Skilled Healthcare Professionals for a Healthier
              Tomorrow
            </p>
          </div>
        </div>

        <div class="row mb-5">
          <div class="col">
            <p>
              The Department of Paramedical at SS National Educational Council
              offers a range of practical and in-demand courses designed to
              train students for essential support roles in the healthcare
              industry. With a focus on hands-on learning and ethical practices,
              our department ensures that students graduate with the confidence
              and competence required in real-world medical settings.
            </p>
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="Medical Lab Technician"
              />
              <div class="card-body">
                <h5 class="card-title">
                  Diploma in Medical Lab Technology (DMLT)
                </h5>
                <p class="card-text">
                  Gain expertise in laboratory procedures, sample analysis, and
                  diagnostic techniques to support clinical decisions.
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
                alt="X-Ray Technician"
              />
              <div class="card-body">
                <h5 class="card-title">Diploma in X-Ray Technology</h5>
                <p class="card-text">
                  Learn radiographic techniques, safety procedures, and imaging
                  principles essential to modern diagnostics.
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
                alt="Emergency Medical Technician"
              />
              <div class="card-body">
                <h5 class="card-title">Emergency Medical Technician (EMT)</h5>
                <p class="card-text">
                  Train to provide urgent pre-hospital care during emergencies
                  and become a frontline responder in critical situations.
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
                alt="Operation Theatre Assistant"
              />
              <div class="card-body">
                <h5 class="card-title">Operation Theatre Assistant</h5>
                <p class="card-text">
                  Support surgeons and medical staff by maintaining aseptic
                  conditions and assisting during surgical procedures.
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
                alt="Dialysis Technician"
              />
              <div class="card-body">
                <h5 class="card-title">Diploma in Dialysis Technology</h5>
                <p class="card-text">
                  Master dialysis procedures, equipment handling, and patient
                  care for individuals with kidney-related issues.
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
