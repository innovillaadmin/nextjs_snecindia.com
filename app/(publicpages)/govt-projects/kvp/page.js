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
            <h1 className="display-5 fw-bold">KVP Course</h1>
            <p className="lead text-muted">
              Knowledge, Value, and Progress – Building a Strong Foundation for
              the Future
            </p>
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img
              src="https://via.placeholder.com/600x400"
              alt="KVP Course Image"
              className="img-fluid rounded shadow-sm"
            />
          </div>
          <div className="col-md-6">
            <h2 className="h4 fw-semibold">Course Overview</h2>
            <p>
              The KVP (Knowledge, Value, Progress) course is designed to develop
              essential life and career skills in students. It blends academic
              knowledge with personal development, ethical reasoning, and
              practical problem-solving — forming a well-rounded foundation for
              both higher education and professional life.
            </p>
            <p>
              This course encourages students to think critically, act
              ethically, and grow holistically, in alignment with SSNEC’s
              mission to foster responsible, capable citizens.
            </p>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col">
            <h3 className="h5 fw-bold mb-3">Key Topics Covered</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                ✔️ Communication Skills & Personality Development
              </li>
              <li className="list-group-item">✔️ Basic Computer Literacy</li>
              <li className="list-group-item">
                ✔️ Moral Education & Social Responsibility
              </li>
              <li className="list-group-item">
                ✔️ Goal Setting & Time Management
              </li>
              <li className="list-group-item">
                ✔️ Introduction to Entrepreneurship
              </li>
            </ul>
          </div>
        </div>

        <div className="row text-center">
          <div className="col">
            <a href="#" className="btn base-gradient px-4">
              Apply for KVP
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
