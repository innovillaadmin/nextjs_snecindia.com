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
            <h1 class="display-5 fw-bold">Department of Veterinary Science</h1>
            <p class="lead text-muted">
              Caring for Animal Health Through Quality Education and Training
            </p>
          </div>
        </div>

        <div class="row mb-5">
          <div class="col">
            <p>
              The Department of Veterinary Science at SS National Educational
              Council offers specialized courses focused on animal health,
              disease prevention, and veterinary practices. Our programs aim to
              prepare skilled professionals who contribute to the welfare of
              livestock and pets.
            </p>
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="Diploma in Veterinary Science"
              />
              <div class="card-body">
                <h5 class="card-title">Diploma in Veterinary Science</h5>
                <p class="card-text">
                  Comprehensive training in animal anatomy, physiology, disease
                  management, and veterinary care techniques.
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
                alt="Certificate in Animal Husbandry"
              />
              <div class="card-body">
                <h5 class="card-title">Certificate in Animal Husbandry</h5>
                <p class="card-text">
                  Focuses on breeding, nutrition, and care of farm animals to
                  improve livestock productivity.
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
                alt="Veterinary Pharmacology"
              />
              <div class="card-body">
                <h5 class="card-title">
                  Certificate in Veterinary Pharmacology
                </h5>
                <p class="card-text">
                  Covers medication, drug administration, and treatments used in
                  veterinary medicine.
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
