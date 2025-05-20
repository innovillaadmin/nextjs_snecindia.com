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
            <h1 class="display-5 fw-bold">Department of Nursing</h1>
            <p class="lead text-muted">
              Training Compassionate and Skilled Nurses for Quality Healthcare
            </p>
          </div>
        </div>

        <div class="row mb-5">
          <div class="col">
            <p>
              The Department of Nursing at SS National Educational Council
              offers comprehensive programs that blend theoretical knowledge
              with practical training. Our mission is to prepare competent
              nurses who provide holistic care and contribute significantly to
              community health.
            </p>
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="General Nursing and Midwifery"
              />
              <div class="card-body">
                <h5 class="card-title">General Nursing and Midwifery (GNM)</h5>
                <p class="card-text">
                  A foundational diploma course focusing on patient care,
                  midwifery, community health nursing, and clinical practice.
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
                alt="Auxiliary Nurse Midwifery"
              />
              <div class="card-body">
                <h5 class="card-title">Auxiliary Nurse Midwifery (ANM)</h5>
                <p class="card-text">
                  Trains students for basic nursing care and maternal health
                  support in rural and urban settings.
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
                alt="Certificate in Nursing Care"
              />
              <div class="card-body">
                <h5 class="card-title">Certificate in Nursing Care</h5>
                <p class="card-text">
                  Focuses on essential nursing skills, patient hygiene,
                  medication administration, and health monitoring.
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
