import FooterPublic from "@/app/component/FooterPublic";
import Partition from "@/app/component/Partition";
import React from "react";

const page = () => {
  return (
    <div>
      <Partition />
      <div className="container py-4">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col text-center">
            <h1 className="display-5 fw-bold">Download ID Card</h1>
            <p className="lead text-muted">
              Enter your enrollment number to download your student ID card
            </p>
          </div>
        </div>

        {/* ID Card Search Form */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-6">
            <div className="card bg-white shadow border-2">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="idEnrollment" className="form-label">
                      Enrollment Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="idEnrollment"
                      placeholder="Enter your enrollment number"
                    />
                  </div>
                  <button type="submit" className="btn base-gradient w-100">
                    Get ID Card
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Static ID Card Display */}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-white shadow border-2">
              <div className="card-body text-center">
                <h5 className="card-title text-primary mb-3">
                  Student ID Card
                </h5>
                <img
                  src="/path-to-student-photo.jpg"
                  alt="Student"
                  className="mb-3 rounded-circle"
                  width="100"
                  height="100"
                />
                <div className="mb-2">
                  <strong>Name:</strong> <span className="text-muted">--</span>
                </div>
                <div className="mb-2">
                  <strong>Enrollment No:</strong>{" "}
                  <span className="text-muted">--</span>
                </div>
                <div className="mb-2">
                  <strong>Course:</strong>{" "}
                  <span className="text-muted">--</span>
                </div>
                <div className="mb-2">
                  <strong>Valid Upto:</strong>{" "}
                  <span className="text-muted">--</span>
                </div>
                <div className="mt-3">
                  <a href="#" className="btn btn-success">
                    Download ID Card
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <FooterPublic />
      </div>
    </div>
  );
};

export default page;
