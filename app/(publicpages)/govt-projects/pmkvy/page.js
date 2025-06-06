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
            <h1 className="display-5 fw-bold">PMKVY Course</h1>
            <p className="lead text-muted">
              Pradhan Mantri Kaushal Vikas Yojana – Government-Certified Skill
              Development
            </p>
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img
              src="https://via.placeholder.com/600x400"
              alt="PMKVY Course Image"
              className="img-fluid rounded shadow-sm"
            />
          </div>
          <div className="col-md-6">
            <h2 className="h4 fw-semibold">Course Overview</h2>
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

        <div className="row mb-5">
          <div className="col">
            <h3 className="h5 fw-bold mb-3">Available Sectors & Job Roles</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                ✔️ Healthcare – Nursing Assistant, Medical Lab Technician
              </li>
              <li className="list-group-item">
                ✔️ IT/ITeS – Data Entry Operator, Web Developer
              </li>
              <li className="list-group-item">
                ✔️ Electronics – Repair Technician, Assembly Operator
              </li>
              <li className="list-group-item">
                ✔️ Agriculture – Veterinary Worker, Farm Technician
              </li>
              <li className="list-group-item">
                ✔️ Beauty & Wellness – Assistant Beautician, Hair Stylist
              </li>
            </ul>
          </div>
        </div>

        <div className="row text-center">
          <div className="col">
            <a href="#" className="btn base-gradient px-4">
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
