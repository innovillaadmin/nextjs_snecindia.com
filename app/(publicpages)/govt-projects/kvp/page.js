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
            <h1 class="display-5 fw-bold">KVP Course</h1>
            <p class="lead text-muted">
              Knowledge, Value, and Progress – Building a Strong Foundation for
              the Future
            </p>
          </div>
        </div>

        <div class="row align-items-center mb-5">
          <div class="col-md-6">
            <img
              src="https://via.placeholder.com/600x400"
              alt="KVP Course Image"
              class="img-fluid rounded shadow-sm"
            />
          </div>
          <div class="col-md-6">
            <h2 class="h4 fw-semibold">Course Overview</h2>
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

        <div class="row mb-5">
          <div class="col">
            <h3 class="h5 fw-bold mb-3">Key Topics Covered</h3>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                ✔️ Communication Skills & Personality Development
              </li>
              <li class="list-group-item">✔️ Basic Computer Literacy</li>
              <li class="list-group-item">
                ✔️ Moral Education & Social Responsibility
              </li>
              <li class="list-group-item">✔️ Goal Setting & Time Management</li>
              <li class="list-group-item">
                ✔️ Introduction to Entrepreneurship
              </li>
            </ul>
          </div>
        </div>

        <div class="row text-center">
          <div class="col">
            <a href="#" class="btn base-gradient px-4">
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
