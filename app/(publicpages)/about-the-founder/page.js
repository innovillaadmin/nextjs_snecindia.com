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
            <h1 className="display-5 fw-bold">About the Founder</h1>
            <p className="lead text-muted">
              The Visionary Behind SS National Educational Council
            </p>
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-md-4 text-center mb-4 mb-md-0">
            <img
              src="https://via.placeholder.com/300x300"
              alt="Founder Photo"
              className="img-fluid rounded-circle shadow-sm"
            />
          </div>
          <div className="col-md-8">
            <h2 className="h4 fw-semibold">[Founder’s Name]</h2>
            <p>
              [Founder’s Name], the founder of SS National Educational Council,
              is a dedicated educationist and social reformer committed to
              empowering youth through quality vocational training. With a
              vision to bridge the skills gap in India, [he/she/they] laid the
              foundation of SSNEC to offer job-ready education in fields like
              computer science, healthcare, and veterinary science.
            </p>
            <p>
              With over [X] years of experience in the education sector,
              [Founder’s Name] has helped thousands of students gain meaningful
              employment and independence through skill-based learning.
            </p>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col">
            <h3 className="h5 fw-bold mb-3">Founder’s Message</h3>
            <blockquote className="blockquote p-4 bg-light rounded shadow-sm">
              <p className="mb-2 fst-italic">
                "Education is not just about literacy; it's about building
                skills, confidence, and the courage to stand independently in
                the world. At SSNEC, we are not just teaching — we are
                transforming lives."
              </p>
              <footer className="blockquote-footer mt-2">
                [Founder’s Name]
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="row text-center">
          <div className="col">
            <a href="#" className="btn base-gradient px-4">
              Learn More About SSNEC
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
