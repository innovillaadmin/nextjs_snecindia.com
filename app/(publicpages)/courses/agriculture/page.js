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
            <h1 class="display-5 fw-bold">Department of Agriculture</h1>
            <p class="lead text-muted">
              Cultivating Knowledge and Skills for Sustainable Farming and
              Agri-Innovation
            </p>
          </div>
        </div>

        <div class="row mb-5">
          <div class="col">
            <p>
              The Department of Agriculture at SS National Educational Council
              is dedicated to equipping students with practical skills,
              scientific knowledge, and modern agricultural techniques. Our
              programs prepare students to address challenges in food security,
              sustainability, and agri-business through experiential learning
              and field exposure.
            </p>
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="card h-100 shadow-sm">
              <img
                src="https://via.placeholder.com/400x250"
                class="card-img-top"
                alt="Diploma in Agriculture"
              />
              <div class="card-body">
                <h5 class="card-title">Diploma in Agriculture</h5>
                <p class="card-text">
                  Covers fundamentals of soil science, crop production,
                  irrigation methods, and pest management for modern farming.
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
                alt="Organic Farming Course"
              />
              <div class="card-body">
                <h5 class="card-title">Certificate in Organic Farming</h5>
                <p class="card-text">
                  Learn sustainable agricultural practices, composting, natural
                  pest control, and certification procedures.
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
                alt="Agribusiness Management"
              />
              <div class="card-body">
                <h5 class="card-title">
                  Certificate in Agribusiness Management
                </h5>
                <p class="card-text">
                  Explore agricultural marketing, farm economics, and
                  entrepreneurship in the agri-sector.
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
                alt="Horticulture Course"
              />
              <div class="card-body">
                <h5 class="card-title">Diploma in Horticulture</h5>
                <p class="card-text">
                  Focuses on plant cultivation, landscaping, and commercial
                  gardening including fruits, vegetables, and flowers.
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
