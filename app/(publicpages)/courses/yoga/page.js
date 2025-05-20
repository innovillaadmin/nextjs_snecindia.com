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
            <h1 class="display-5 fw-bold">Department of Yoga</h1>
            <p class="lead text-muted">
              Promoting Health and Wellness Through Traditional Yoga Practices
            </p>
          </div>
        </div>

        <div class="row mb-5">
          <div class="col">
            <p>
              The Department of Yoga at SS National Educational Council offers
              comprehensive courses aimed at physical fitness, mental
              well-being, and spiritual growth. Our programs combine ancient
              yogic wisdom with modern scientific approaches to wellness.
            </p>
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="Yoga Instructor Course"
              />
              <div class="card-body">
                <h5 class="card-title">Certified Yoga Instructor Course</h5>
                <p class="card-text">
                  Training for teaching yoga postures, breathing techniques, and
                  meditation practices to beginners and advanced students.
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
                alt="Yoga Therapy Certificate"
              />
              <div class="card-body">
                <h5 class="card-title">Certificate in Yoga Therapy</h5>
                <p class="card-text">
                  Focuses on the therapeutic applications of yoga for managing
                  stress, pain, and chronic diseases.
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
                alt="Advanced Yoga Practices"
              />
              <div class="card-body">
                <h5 class="card-title">Advanced Yoga Practices</h5>
                <p class="card-text">
                  Designed for practitioners who want to deepen their knowledge
                  of advanced asanas, pranayama, and meditation.
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
