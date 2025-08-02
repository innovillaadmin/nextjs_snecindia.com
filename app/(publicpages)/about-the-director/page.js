import React from "react";
import Hero from "./Hero";
import FooterPublic from "@/app/component/FooterPublic";
import Newsletter from "../home/Newsletter";

const page = () => {
  return (
    <div>
      <Hero />
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col text-center">
            <h1 className="display-5 fw-bold">About the Director</h1>
            <p className="lead text-muted">
              Leadership That Drives SSNEC Forward
            </p>
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-md-4 text-center mb-4 mb-md-0">
            <img
              src="https://via.placeholder.com/300x300"
              alt="Director Photo"
              className="img-fluid rounded-circle shadow-sm"
            />
          </div>
          <div className="col-md-8">
            <h2 className="h4 fw-semibold">[Director’s Name]</h2>
            <p>
              [Director&apos;s Name], the Director of SS National Educational
              Council, plays a pivotal role in shaping the institution's
              strategic direction and operational excellence. With a deep
              commitment to quality education and student success, [he/she/they]
              leads with integrity, innovation, and a passion for societal
              upliftment.
            </p>
            <p>
              Under [his/her/their] leadership, SSNEC has expanded its reach and
              upgraded its curriculum to meet modern industry standards.
              [Director’s Name] believes in inclusive education that prepares
              students not only for jobs, but for meaningful careers and lives.
            </p>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col">
            <h3 className="h5 fw-bold mb-3">Director’s Perspective</h3>
            <blockquote className="blockquote p-4 bg-light rounded shadow-sm">
              <p className="mb-2 fst-italic">
                "Our goal is to nurture talent in every student. At SSNEC, we
                ensure every learner has access to tools, knowledge, and
                opportunities that empower them to succeed in a competitive
                world."
              </p>
              <footer className="blockquote-footer mt-2">
                [Director’s Name]
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="row text-center">
          <div className="col">
            <a href="#" className="btn base-gradient px-4">
              Meet Our Team
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
