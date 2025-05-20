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
            <h1 class="display-5 fw-bold">PMKVY Course</h1>
            <p class="lead text-muted">
              Pradhan Mantri Kaushal Vikas Yojana – Government-Certified Skill
              Development
            </p>
          </div>
        </div>

        <div class="row align-items-center mb-5">
          <div class="col-md-6">
            <img
              src="https://via.placeholder.com/600x400"
              alt="PMKVY Course Image"
              class="img-fluid rounded shadow-sm"
            />
          </div>
          <div class="col-md-6">
            <h2 class="h4 fw-semibold">Course Overview</h2>
            <p>
              The PMKVY (Pradhan Mantri Kaushal Vikas Yojana) course offered by
              SSNEC is part of a flagship initiative by the Government of India
              to provide industry-relevant skill training. It is aimed at
              increasing the employability of youth through recognized
              certification and practical knowledge.
            </p>
            <p>
              As a PMKVY training partner, SSNEC ensures quality training in
              diverse sectors aligned with NSDC standards, helping students gain
              meaningful employment or start their own ventures.
            </p>
          </div>
        </div>

        <div class="row mb-5">
          <div class="col">
            <h3 class="h5 fw-bold mb-3">Available Sectors & Job Roles</h3>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                ✔️ Healthcare – Nursing Assistant, Medical Lab Technician
              </li>
              <li class="list-group-item">
                ✔️ IT/ITeS – Data Entry Operator, Web Developer
              </li>
              <li class="list-group-item">
                ✔️ Electronics – Repair Technician, Assembly Operator
              </li>
              <li class="list-group-item">
                ✔️ Agriculture – Veterinary Worker, Farm Technician
              </li>
              <li class="list-group-item">
                ✔️ Beauty & Wellness – Assistant Beautician, Hair Stylist
              </li>
            </ul>
          </div>
        </div>

        <div class="row text-center">
          <div class="col">
            <a href="#" class="btn base-gradient px-4">
              Enroll in PMKVY Course
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
