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
            <h1 className="display-5 fw-bold">Result Zone</h1>
            <p className="lead text-muted">
              Check and Download Your Examination Results
            </p>
          </div>
        </div>
        {/* Result Search Form */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="enrollmentNumber" className="form-label">
                      Enrollment Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="enrollmentNumber"
                      placeholder="Enter your enrollment number"
                    />
                  </div>
                  <button type="submit" className="btn base-gradient w-100">
                    Check Result
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Static Result Display (can be dynamically controlled later) */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Result Details</h5>
                <div className="mb-2">
                  <strong>Enrollment Number:</strong>{" "}
                  <span className="text-muted">--</span>
                </div>
                <div className="mb-2">
                  <strong>Name:</strong> <span className="text-muted">--</span>
                </div>
                <div className="mb-2">
                  <strong>Course:</strong>{" "}
                  <span className="text-muted">--</span>
                </div>
                <div className="mb-2">
                  <strong>Result Status:</strong>
                  <span className="badge bg-secondary ms-2">Pending</span>
                </div>
                <div className="mt-3">
                  <a href="#" className="btn btn-success">
                    Download Result
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
