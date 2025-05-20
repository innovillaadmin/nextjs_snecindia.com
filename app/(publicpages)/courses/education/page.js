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
            <h1 class="display-5 fw-bold">Department of Education</h1>
            <p class="lead text-muted">
              Building Foundations for Effective Teaching and Lifelong Learning
            </p>
          </div>
        </div>

        <div class="row mb-5">
          <div class="col">
            <p>
              The Department of Education at SS National Educational Council is
              committed to preparing educators with strong theoretical knowledge
              and practical skills. Our courses are designed to train future
              teachers and education professionals to foster inclusive,
              innovative, and effective learning environments.
            </p>
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="Diploma in Education"
              />
              <div class="card-body">
                <h5 class="card-title">
                  Diploma in Elementary Education (D.El.Ed)
                </h5>
                <p class="card-text">
                  Prepares students to become skilled elementary school teachers
                  with knowledge of child psychology and pedagogy.
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
                alt="Certificate in Early Childhood Education"
              />
              <div class="card-body">
                <h5 class="card-title">
                  Certificate in Early Childhood Education
                </h5>
                <p class="card-text">
                  Focuses on developmental milestones, learning strategies, and
                  creating supportive environments for young children.
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
                alt="Special Education Course"
              />
              <div class="card-body">
                <h5 class="card-title">Certificate in Special Education</h5>
                <p class="card-text">
                  Trains educators to effectively support children with special
                  needs through inclusive teaching methods.
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
